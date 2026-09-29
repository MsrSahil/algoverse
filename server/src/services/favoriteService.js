import ApiError from '../utils/ApiError.js'
import { validateAlgorithmSlug } from './progressService.js'

const getFavoriteSlugs = (user) => {
  if (!Array.isArray(user.favorites)) {
    user.favorites = []
  }

  return user.favorites
}

export const getFavorites = (user) => {
  return [...new Set(getFavoriteSlugs(user))]
}

export const addFavorite = async (user, algorithmSlug) => {
  validateAlgorithmSlug(algorithmSlug)

  const favorites = getFavoriteSlugs(user)
  const alreadyFavorited = favorites.includes(algorithmSlug)

  if (!alreadyFavorited) {
    favorites.push(algorithmSlug)
    await user.save()
  }

  return { algorithmSlug, alreadyFavorited, favorites: getFavorites(user) }
}

export const removeFavorite = async (user, algorithmSlug) => {
  validateAlgorithmSlug(algorithmSlug)

  const favorites = getFavoriteSlugs(user)
  const wasFavorited = favorites.includes(algorithmSlug)
  user.favorites = favorites.filter((favorite) => favorite !== algorithmSlug)

  if (wasFavorited) {
    await user.save()
  }

  return { algorithmSlug, wasFavorited, favorites: getFavorites(user) }
}
