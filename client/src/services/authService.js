import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const authService = {
  register: async (fullName, username, email, password, confirmPassword) => {
    try {
      const response = await apiClient.post('/auth/register', {
        fullName,
        username,
        email,
        password,
        confirmPassword
      })
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed'
      console.error('Registration error:', { 
        status: error.response?.status,
        message: errorMessage,
        data: error.response?.data 
      })
      throw new Error(errorMessage)
    }
  },

  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password
      })
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed'
      console.error('Login error:', { 
        status: error.response?.status,
        message: errorMessage,
        data: error.response?.data 
      })
      throw new Error(errorMessage)
    }
  },

  logout: async () => {
    try {
      await apiClient.post('/auth/logout')
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Logout failed'
      console.error('Logout error:', { 
        status: error.response?.status,
        message: errorMessage,
        data: error.response?.data 
      })
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/auth/me')
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch user'
      console.error('Get user error:', { 
        status: error.response?.status,
        message: errorMessage,
        data: error.response?.data 
      })
      throw new Error(errorMessage)
    }
  }
}

export default apiClient
