export const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE_URL || '/api'
export const API_ENDPOINTS = {
  REQUEST: `${API_BASE_URL}/request`,
} as const
