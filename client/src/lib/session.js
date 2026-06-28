export const getSessionUser = () => {
  try {
    const raw = localStorage.getItem('student_session')
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed?.user || null
  } catch {
    return null
  }
}

export const getSessionToken = () => {
  try {
    const raw = localStorage.getItem('student_session')
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed?.token || null
  } catch {
    return null
  }
}

export const saveSession = (payload) => {
  localStorage.setItem('student_session', JSON.stringify(payload))
}

export const clearSession = () => {
  localStorage.removeItem('student_session')
}
