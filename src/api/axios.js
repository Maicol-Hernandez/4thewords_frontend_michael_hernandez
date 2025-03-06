import axios from 'axios'
// import { useAuthStore } from '@/stores/auth'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // const authStore = useAuthStore()
            // authStore.logout()
            // window.location.href = '/login'
        }

        const errorMessage = error.response?.data?.message ||
            error.message ||
            'Error de conexión'

        return Promise.reject(errorMessage)
    }
)

// Interceptor para agregar token JWT
// api.interceptors.request.use(config => {
//     const authStore = useAuthStore()
//     if (authStore.token) {
//         config.headers.Authorization = `Bearer ${authStore.token}`
//     }
//     return config
// })

export default api