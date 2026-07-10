import User from '../models/User.js'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'
import asyncHandler from '../utils/asyncHandler.js'
import { generateAccessToken } from '../services/tokenService.js'
import {
  validateEmail,
  validateUsername,
  validatePassword,
  validateFullName,
  passwordsMatch
} from '../validators/authValidator.js'

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'Lax',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
}

export const register = asyncHandler(async (req, res, next) => {
  const { fullName, username, email, password, confirmPassword } = req.body

  // Validation
  if (!fullName?.trim()) {
    throw new ApiError(400, 'Full name is required')
  }
  if (!validateFullName(fullName)) {
    throw new ApiError(400, 'Full name must be between 2 and 100 characters')
  }

  if (!username?.trim()) {
    throw new ApiError(400, 'Username is required')
  }
  if (!validateUsername(username)) {
    throw new ApiError(400, 'Username must be 3-30 characters and contain only letters, numbers, hyphens, and underscores')
  }

  if (!email?.trim()) {
    throw new ApiError(400, 'Email is required')
  }
  if (!validateEmail(email)) {
    throw new ApiError(400, 'Please enter a valid email address')
  }

  if (!password) {
    throw new ApiError(400, 'Password is required')
  }
  if (!validatePassword(password)) {
    throw new ApiError(400, 'Password must be at least 8 characters with uppercase, lowercase, number, and special character')
  }

  if (!confirmPassword) {
    throw new ApiError(400, 'Please confirm your password')
  }
  if (!passwordsMatch(password, confirmPassword)) {
    throw new ApiError(400, 'Passwords do not match')
  }

  // Check for existing user
  const existingUser = await User.findOne({
    $or: [{ email: email.toLowerCase() }, { username }]
  })

  if (existingUser) {
    if (existingUser.email === email.toLowerCase()) {
      throw new ApiError(400, 'Email already exists')
    }
    throw new ApiError(400, 'Username already exists')
  }

  // Create user
  const user = await User.create({
    fullName: fullName.trim(),
    username,
    email: email.toLowerCase(),
    password,
    provider: 'email'
  })

  // Generate token
  const accessToken = generateAccessToken(user._id)

  // Set cookie
  res.cookie('accessToken', accessToken, COOKIE_OPTIONS)

  const userResponse = user.toJSON()

  res.status(201).json(
    new ApiResponse(201, { user: userResponse, accessToken }, 'User registered successfully')
  )
})

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  // Validation
  if (!email?.trim()) {
    throw new ApiError(400, 'Email is required')
  }
  if (!validateEmail(email)) {
    throw new ApiError(400, 'Please enter a valid email address')
  }

  if (!password) {
    throw new ApiError(400, 'Password is required')
  }

  // Find user and include password field
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password')

  if (!user) {
    throw new ApiError(401, 'Invalid email or password')
  }

  // Check if provider is email
  if (user.provider !== 'email') {
    throw new ApiError(400, `This account was registered with ${user.provider}. Please use that method to login.`)
  }

  // Verify password
  const isPasswordValid = await user.matchPassword(password)

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password')
  }

  // Update last login
  user.lastLogin = new Date()
  await user.save()

  // Generate token
  const accessToken = generateAccessToken(user._id)

  // Set cookie
  res.cookie('accessToken', accessToken, COOKIE_OPTIONS)

  const userResponse = user.toJSON()

  res.status(200).json(
    new ApiResponse(200, { user: userResponse, accessToken }, 'Logged in successfully')
  )
})

export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie('accessToken')
  res.status(200).json(
    new ApiResponse(200, {}, 'Logged out successfully')
  )
})

export const getCurrentUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id)

  res.status(200).json(
    new ApiResponse(200, { user }, 'User retrieved successfully')
  )
})
