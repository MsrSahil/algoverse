import ApiResponse from '../utils/ApiResponse.js'
import asyncHandler from '../utils/asyncHandler.js'
import {
  completeProgress,
  getAllProgress,
  updateProgress,
  validateAlgorithmSlug
} from '../services/progressService.js'

export const getProgress = asyncHandler(async (req, res) => {
  const progress = getAllProgress(req.user)

  res.status(200).json(
    new ApiResponse(200, { progress }, 'Progress retrieved successfully')
  )
})

export const patchProgress = asyncHandler(async (req, res) => {
  const algorithmSlug = validateAlgorithmSlug(req.params.algorithmSlug)
  const progress = await updateProgress(req.user, algorithmSlug, req.body)

  res.status(200).json(
    new ApiResponse(200, { progress }, 'Progress updated successfully')
  )
})

export const markProgressComplete = asyncHandler(async (req, res) => {
  const algorithmSlug = validateAlgorithmSlug(req.params.algorithmSlug)
  const result = await completeProgress(req.user, algorithmSlug, req.body)

  res.status(200).json(
    new ApiResponse(
      200,
      { progress: result.progress, alreadyCompleted: result.alreadyCompleted },
      result.alreadyCompleted ? 'Algorithm was already completed' : 'Algorithm completed successfully'
    )
  )
})
