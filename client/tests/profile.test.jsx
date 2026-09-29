import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Profile from '../src/pages/Profile/index.jsx'
import { useAuth } from '../src/context/AuthContext.jsx'
import { progressService } from '../src/services/progressService.js'
import { favoriteService } from '../src/services/favoriteService.js'

vi.mock('../src/context/AuthContext.jsx', () => ({
  useAuth: vi.fn()
}))

vi.mock('../src/services/progressService.js', () => ({
  progressService: {
    getAll: vi.fn()
  }
}))

vi.mock('../src/services/favoriteService.js', () => ({
  favoriteService: {
    getAll: vi.fn()
  }
}))

const renderProfile = () => render(
  <MemoryRouter>
    <Profile />
  </MemoryRouter>
)

describe('Profile page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAuth.mockReturnValue({
      user: {
        fullName: 'Ada Lovelace',
        username: 'ada',
        email: 'ada@example.com',
        avatar: null
      },
      authLoading: false,
      isAuthenticated: true,
      loading: false,
      logout: vi.fn()
    })
    progressService.getAll.mockResolvedValue({
      data: {
        progress: [
          {
            algorithmSlug: 'bubble-sort',
            viewed: true,
            completed: true,
            completedAt: '2026-09-30T12:00:00.000Z'
          }
        ]
      }
    })
    favoriteService.getAll.mockResolvedValue({
      data: { favorites: ['selection-sort', 'merge-sort'] }
    })
  })

  it('renders authenticated user details, initials, and live statistics', async () => {
    renderProfile()

    expect(screen.getByText('AL')).toBeInTheDocument()
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument()
    expect(screen.getByText('ada')).toBeInTheDocument()
    expect(screen.getByText('ada@example.com')).toBeInTheDocument()
    expect(await screen.findByText('1', { selector: 'p' })).toBeInTheDocument()
    expect(screen.getByText('7%')).toBeInTheDocument()
    expect(screen.getByText('2', { selector: 'p' })).toBeInTheDocument()
  })

  it('renders an avatar image when the authenticated user has one', async () => {
    useAuth.mockReturnValue({
      user: {
        fullName: 'Grace Hopper',
        username: 'grace',
        email: 'grace@example.com',
        avatar: 'https://example.com/grace.png'
      },
      authLoading: false,
      isAuthenticated: true,
      loading: false,
      logout: vi.fn()
    })

    renderProfile()

    expect(await screen.findByAltText('Grace Hopper profile avatar')).toHaveAttribute(
      'src',
      'https://example.com/grace.png'
    )
  })

  it('shows a loading state while progress and favorites load', async () => {
    progressService.getAll.mockReturnValue(new Promise(() => {}))
    favoriteService.getAll.mockReturnValue(new Promise(() => {}))

    renderProfile()

    expect(await screen.findByText('Loading profile statistics...')).toBeInTheDocument()
    expect(screen.getAllByText('...')).toHaveLength(3)
  })

  it('shows an error when profile statistics cannot be loaded', async () => {
    favoriteService.getAll.mockRejectedValue(new Error('Network failure'))

    renderProfile()

    expect(await screen.findByText('Unable to load profile statistics. Please try again.')).toBeInTheDocument()
  })

  it('logs out through the existing authentication context', async () => {
    const logout = vi.fn().mockResolvedValue(undefined)
    useAuth.mockReturnValue({
      user: { fullName: 'Ada Lovelace', username: 'ada', email: 'ada@example.com' },
      authLoading: false,
      isAuthenticated: true,
      loading: false,
      logout
    })

    renderProfile()
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Logout' }))

    await waitFor(() => expect(logout).toHaveBeenCalledTimes(1))
  })
})
