import jwt from 'jsonwebtoken'

export const generateAccessToken = (userId, rememberMe = false) => {
  // If Remember Me is true: 30 days. Otherwise: 1 day (session-like)
  const expiresIn = rememberMe ? '30d' : '1d';
  
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn
  })
}

export const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '30d'
  })
}

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
}
