export function parseJwt(token) {
  if (!token) return null
  try {
    const payload = token.split('.')[1]
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const json = decodeURIComponent(atob(base64).split('').map(c => '%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)).join(''))
    return JSON.parse(json)
  } catch {
    return null
  }
}

export function getRoleFromToken(token) {
  const p = parseJwt(token)
  if (!p) return null
  // Ajusta según el claim que devuelva tu backend
  // Puede ser p.role, p.roles, p['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'], etc.
  const role = p.role || p.roles || p.roleName || p.rol || null
  return role
}

export function isTokenExpired(token) {
  const p = parseJwt(token)
  if (!p) return true
  if (!p.exp) return false
  // exp is in seconds
  const now = Math.floor(Date.now() / 1000)
  return p.exp < now
}
