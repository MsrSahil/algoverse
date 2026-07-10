import validator from 'validator'

export const validateEmail = (email) => {
  return validator.isEmail(email)
}

export const validateUsername = (username) => {
  return username && username.length >= 3 && username.length <= 30 && /^[a-zA-Z0-9_-]+$/.test(username)
}

export const validatePassword = (password) => {
  // Min 8 chars, uppercase, lowercase, number, special char
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/
  return regex.test(password)
}

export const validateFullName = (fullName) => {
  return fullName && fullName.trim().length >= 2 && fullName.trim().length <= 100
}

export const passwordsMatch = (password, confirmPassword) => {
  return password === confirmPassword
}
