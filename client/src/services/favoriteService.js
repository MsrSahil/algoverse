import apiClient from '../config/apiClient.js'

const getErrorMessage = (error, fallbackMessage) =>
  error.response?.data?.message || error.message || fallbackMessage

export const favoriteService = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/favorites')
      return response.data
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Unable to load favorites. Please try again.'))
    }
  },

  add: async (algorithmSlug) => {
    try {
      const response = await apiClient.post(`/favorites/${algorithmSlug}`)
      return response.data
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Unable to save favorite. Please try again.'))
    }
  },

  remove: async (algorithmSlug) => {
    try {
      const response = await apiClient.delete(`/favorites/${algorithmSlug}`)
      return response.data
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Unable to remove favorite. Please try again.'))
    }
  }
}

export default favoriteService
