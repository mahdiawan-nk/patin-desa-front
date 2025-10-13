// middleware/auth.ts
import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const token = localStorage.getItem('token')
    if (!token) {
      return navigateTo('/panel')
    }
  }
})
