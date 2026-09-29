import ApiResponse from '../utils/ApiResponse.js'
import asyncHandler from '../utils/asyncHandler.js'
import {
  addFavorite,
  getFavorites,
  removeFavorite
} from '../services/favoriteService.js'

export const getFavoriteAlgorithms = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(200, { favorites: getFavorites(req.user) }, 'Favorites retrieved successfully')
  )
})

export const createFavorite = asyncHandler(async (req, res) => {
  const result = await addFavorite(req.user, req.params.algorithmSlug)

  res.status(result.alreadyFavorited ? 200 : 201).json(
    new ApiResponse(
      result.alreadyFavorited ? 200 : 201,
      {
        algorithmSlug: result.algorithmSlug,
        alreadyFavorited: result.alreadyFavorited,
        favorites: result.favorites
      },
      result.alreadyFavorited ? 'Algorithm is already favorited' : 'Algorithm added to favorites'
    )
  )
})

export const deleteFavorite = asyncHandler(async (req, res) => {
  const result = await removeFavorite(req.user, req.params.algorithmSlug)

  res.status(200).json(
    new ApiResponse(
      200,
      {
        algorithmSlug: result.algorithmSlug,
        wasFavorited: result.wasFavorited,
        favorites: result.favorites
      },
      result.wasFavorited ? 'Algorithm removed from favorites' : 'Algorithm was not favorited'
    )
  )
})
