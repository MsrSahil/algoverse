import ApiError from '../utils/ApiError.js'
import { SUPPORTED_ALGORITHM_SLUGS } from '../constants/algorithmSlugs.js'

const ALGORITHM_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const MAX_TIME_SPENT_SECONDS = 365 * 24 * 60 * 60

export const validateAlgorithmSlug = (algorithmSlug) => {
  if (typeof algorithmSlug !== 'string' || !ALGORITHM_SLUG_PATTERN.test(algorithmSlug)) {
    throw new ApiError(400, 'A valid algorithm slug is required')
  }

  if (!SUPPORTED_ALGORITHM_SLUGS.has(algorithmSlug)) {
    throw new ApiError(404, 'Algorithm not found')
  }

  return algorithmSlug
}

const validateTimeSpent = (timeSpent) => {
  if (timeSpent === undefined) return

  if (
    typeof timeSpent !== 'number' ||
    !Number.isFinite(timeSpent) ||
    timeSpent < 0 ||
    timeSpent > MAX_TIME_SPENT_SECONDS
  ) {
    throw new ApiError(400, 'timeSpent must be a non-negative number of seconds')
  }
}

const getProgressMap = (user) => {
  if (!user.progress) {
    user.progress = new Map()
  }

  return user.progress
}

const serializeProgress = (algorithmSlug, entry = {}) => ({
  algorithmSlug,
  viewed: Boolean(entry.viewed),
  completed: Boolean(entry.completed),
  timeSpent: Number(entry.timeSpent || 0),
  completedAt: entry.completedAt || null
})

export const getAllProgress = (user) => {
  const progress = []

  for (const [algorithmSlug, entry] of getProgressMap(user).entries()) {
    progress.push(serializeProgress(algorithmSlug, entry))
  }

  return progress.sort((left, right) => {
    const leftTime = left.completedAt ? new Date(left.completedAt).getTime() : 0
    const rightTime = right.completedAt ? new Date(right.completedAt).getTime() : 0
    return rightTime - leftTime
  })
}

export const updateProgress = async (user, algorithmSlug, payload) => {
  validateAlgorithmSlug(algorithmSlug)

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new ApiError(400, 'Progress data must be a JSON object')
  }

  const allowedFields = ['viewed', 'completed', 'timeSpent']
  const unknownFields = Object.keys(payload).filter((field) => !allowedFields.includes(field))
  if (unknownFields.length > 0) {
    throw new ApiError(400, `Unsupported progress field: ${unknownFields[0]}`)
  }

  if (Object.keys(payload).length === 0) {
    throw new ApiError(400, 'At least one progress field is required')
  }

  if (payload.viewed !== undefined && typeof payload.viewed !== 'boolean') {
    throw new ApiError(400, 'viewed must be a boolean')
  }

  if (payload.completed !== undefined && typeof payload.completed !== 'boolean') {
    throw new ApiError(400, 'completed must be a boolean')
  }

  validateTimeSpent(payload.timeSpent)

  const progressMap = getProgressMap(user)
  const current = progressMap.get(algorithmSlug) || {}
  const next = {
    viewed: payload.viewed ?? Boolean(current.viewed),
    completed: payload.completed ?? Boolean(current.completed),
    timeSpent: payload.timeSpent ?? Number(current.timeSpent || 0),
    completedAt: current.completedAt || null
  }

  if (next.completed && !next.completedAt) {
    next.completedAt = new Date()
  }

  if (payload.completed === false) {
    next.completedAt = null
  }

  progressMap.set(algorithmSlug, next)
  await user.save()

  return serializeProgress(algorithmSlug, progressMap.get(algorithmSlug))
}

export const completeProgress = async (user, algorithmSlug, payload = {}) => {
  validateAlgorithmSlug(algorithmSlug)

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new ApiError(400, 'Progress data must be a JSON object')
  }

  const unknownFields = Object.keys(payload).filter((field) => field !== 'timeSpent')
  if (unknownFields.length > 0) {
    throw new ApiError(400, `Unsupported progress field: ${unknownFields[0]}`)
  }

  validateTimeSpent(payload.timeSpent)

  const progressMap = getProgressMap(user)
  const current = progressMap.get(algorithmSlug) || {}
  const alreadyCompleted = Boolean(current.completed)
  const next = {
    viewed: true,
    completed: true,
    timeSpent: payload.timeSpent ?? Number(current.timeSpent || 0),
    completedAt: current.completedAt || new Date()
  }

  progressMap.set(algorithmSlug, next)
  await user.save()

  return {
    progress: serializeProgress(algorithmSlug, progressMap.get(algorithmSlug)),
    alreadyCompleted
  }
}
