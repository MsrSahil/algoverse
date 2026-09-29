import request from 'supertest'
import { vi } from 'vitest'

const store = vi.hoisted(() => ({ users: new Map(), nextId: 1 }))

vi.mock('../src/models/User.js', () => {
  class InMemoryUser {
    constructor(data) {
      this._id = `test-user-${store.nextId++}`
      this.fullName = data.fullName
      this.username = data.username
      this.email = data.email
      this.password = data.password
      this.provider = data.provider || 'email'
      this.role = data.role || 'user'
      this.progress = new Map()
      this.favorites = []
      this.isActive = true
      this.lastLogin = null
    }

    static async create(data) {
      const user = new InMemoryUser(data)
      store.users.set(user._id, user)
      return user
    }

    static findOne(query) {
      let user
      if (query.$or) {
        user = [...store.users.values()].find(
          (candidate) => query.$or.some((condition) =>
            Object.entries(condition).every(([key, value]) => candidate[key] === value)
          )
        )
      } else {
        user = [...store.users.values()].find((candidate) =>
          Object.entries(query).every(([key, value]) => candidate[key] === value)
        )
      }

      const result = Promise.resolve(user)
      result.select = async () => user
      return result
    }

    static async findById(id) {
      return store.users.get(String(id)) || null
    }

    async save() {
      store.users.set(this._id, this)
      return this
    }

    async matchPassword(enteredPassword) {
      return enteredPassword === this.password
    }

    toJSON() {
      return {
        _id: this._id,
        fullName: this.fullName,
        username: this.username,
        email: this.email,
        provider: this.provider,
        role: this.role,
        progress: this.progress,
        favorites: this.favorites,
        isActive: this.isActive,
        lastLogin: this.lastLogin
      }
    }
  }

  return {
    default: InMemoryUser,
    resetUsers: () => {
      store.users.clear()
      store.nextId = 1
    }
  }
})

import app from '../src/app.js'
import { resetUsers } from '../src/models/User.js'

let userCounter = 0

const createUserPayload = () => {
  userCounter += 1
  return {
    fullName: 'Test Learner',
    username: `learner_${userCounter}`,
    email: `learner_${userCounter}@example.com`,
    password: 'TestPass1!',
    confirmPassword: 'TestPass1!'
  }
}

const registerUser = (agent, overrides = {}) => {
  const payload = { ...createUserPayload(), ...overrides }
  return agent.post('/api/auth/register').send(payload)
}

describe('authentication and progress API', () => {
  beforeEach(() => {
    resetUsers()
  })

  it('registers a valid user and authenticates the session cookie', async () => {
    const agent = request.agent(app)
    const registration = await registerUser(agent)

    expect(registration.status).toBe(201)
    expect(registration.headers['set-cookie'][0]).toContain('accessToken=')
    expect(registration.body.data.user.email).toContain('@example.com')
    expect(registration.body.data.user.password).toBeUndefined()

    const session = await agent.get('/api/auth/me')
    expect(session.status).toBe(200)
    expect(session.body.data.user.username).toBe(registration.body.data.user.username)
  })

  it('rejects duplicate email and username registrations', async () => {
    const first = createUserPayload()
    const agent = request.agent(app)
    await agent.post('/api/auth/register').send(first).expect(201)

    await agent.post('/api/auth/register')
      .send({ ...createUserPayload(), email: first.email })
      .expect(400)
      .expect((response) => expect(response.body.message).toBe('Email already exists'))

    await agent.post('/api/auth/register')
      .send({ ...createUserPayload(), username: first.username })
      .expect(400)
      .expect((response) => expect(response.body.message).toBe('Username already exists'))
  })

  it('logs in with valid credentials and rejects invalid credentials', async () => {
    const payload = createUserPayload()
    const agent = request.agent(app)
    await agent.post('/api/auth/register').send(payload).expect(201)
    await agent.post('/api/auth/logout').expect(200)

    const login = await agent.post('/api/auth/login')
      .send({ email: payload.email, password: payload.password })
      .expect(200)
    expect(login.headers['set-cookie'][0]).toContain('accessToken=')

    await agent.post('/api/auth/logout').expect(200)
    await agent.post('/api/auth/login')
      .send({ email: payload.email, password: 'WrongPass1!' })
      .expect(401)
  })

  it('rejects unauthenticated access to progress', async () => {
    await request(app).get('/api/progress').expect(401)
  })

  it('starts with empty progress and updates a valid record', async () => {
    const agent = request.agent(app)
    await registerUser(agent).expect(201)

    const empty = await agent.get('/api/progress').expect(200)
    expect(empty.body.data.progress).toEqual([])

    const updated = await agent.patch('/api/progress/bubble-sort')
      .send({ viewed: true, timeSpent: 42 })
      .expect(200)

    expect(updated.body.data.progress).toMatchObject({
      algorithmSlug: 'bubble-sort',
      viewed: true,
      completed: false,
      timeSpent: 42,
      completedAt: null
    })

    const fetched = await agent.get('/api/progress').expect(200)
    expect(fetched.body.data.progress).toHaveLength(1)
    expect(fetched.body.data.progress[0].algorithmSlug).toBe('bubble-sort')
  })

  it('rejects invalid time, malformed slugs, and unknown algorithms', async () => {
    const agent = request.agent(app)
    await registerUser(agent).expect(201)

    await agent.patch('/api/progress/bubble-sort')
      .send({ timeSpent: -1 })
      .expect(400)

    await agent.patch('/api/progress/not_valid!')
      .send({ viewed: true })
      .expect(400)

    await agent.patch('/api/progress/not-an-algorithm')
      .send({ viewed: true })
      .expect(404)
  })

  it('completes an algorithm, stores completedAt, and is idempotent', async () => {
    const agent = request.agent(app)
    await registerUser(agent).expect(201)

    const first = await agent.post('/api/progress/bubble-sort/complete')
      .send({ timeSpent: 120 })
      .expect(200)

    expect(first.body.data.progress).toMatchObject({
      algorithmSlug: 'bubble-sort',
      viewed: true,
      completed: true,
      timeSpent: 120
    })
    expect(first.body.data.progress.completedAt).toEqual(expect.any(String))
    expect(first.body.data.alreadyCompleted).toBe(false)

    const completedAt = first.body.data.progress.completedAt
    const second = await agent.post('/api/progress/bubble-sort/complete')
      .send({ timeSpent: 121 })
      .expect(200)

    expect(second.body.data.alreadyCompleted).toBe(true)
    expect(second.body.data.progress.completedAt).toBe(completedAt)

    const fetched = await agent.get('/api/progress').expect(200)
    expect(fetched.body.data.progress).toHaveLength(1)
    expect(fetched.body.data.progress[0].completed).toBe(true)
  })
})
