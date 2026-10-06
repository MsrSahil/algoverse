import apiClient from '../config/apiClient.js'

const getErrorMessage = (error, fallbackMessage) =>
  error.response?.data?.message || error.message || fallbackMessage

export const progressService = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/progress')
      return response.data
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Unable to load progress. Please try again.'))
    }
  },

  complete: async (algorithmSlug, timeSpent = 0) => {
    try {
      const response = await apiClient.post(`/progress/${algorithmSlug}/complete`, { timeSpent })
      return response.data
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Unable to save completion. Please try again.'))
    }
  },

  update: async (algorithmSlug, progress) => {
    try {
      const response = await apiClient.patch(`/progress/${algorithmSlug}`, progress)
      return response.data
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Unable to update progress. Please try again.'))
    }
  }
}

export default progressService
