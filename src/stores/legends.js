import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from '@/api/axios'

export const useLegendsStore = defineStore('legends', () => {
    const currentLegend = ref(null)
    const legends = ref([])
    const filters = ref({
        name: '',
        created_at: '',
        category: '',
        province: '',
        canton: '',
        district: null,
    })

    const isLoading = ref(false)
    const error = ref(null)
    const locations = ref(/* Datos de provincias */)

    const filteredLegends = computed(() => {
        return legends.value.filter(legend => {
            return Object.entries(filters.value).every(([key, value]) => {
                if (!value) return true

                if (key === 'created_at') {
                    const legendDate = new Date(legend.created_at).toISOString().split('T')[0]
                    const filterDate = new Date(value).toISOString().split('T')[0]
                    return legendDate === filterDate
                }

                return String(legend[key]).toLowerCase().includes(value.toLowerCase())
            })
        })
    })

    const fetchLegends = async () => {
        const { data } = await axios.get('/legends')
        legends.value = data
    }

    const showLegend = async (legendId) => {
        try {
            isLoading.value = true
            const { data } = await axios.get(`/legends/${legendId}`)
            currentLegend.value = data
            return data
        } catch (err) {
            error.value = 'Error al obtener la leyenda'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    const updateLegend = async (id, formData) => {
        try {
            isLoading.value = true
            const { data } = await axios.put(`/legends/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            const index = legends.value.findIndex(l => l.id === id)
            if (index !== -1) {
                legends.value.splice(index, 1, data)
            }
            currentLegend.value = data
            return data
        } finally {
            isLoading.value = false
        }
    }

    const createLegend = async (legend) => {
        try {
            isLoading.value = true
            const { data } = await axios.post('/legends', legend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            legends.value.push(data)
        } catch (error) {
            throw new Error('Error al crear la leyenda')
        } finally {
            isLoading.value = false
        }
    }

    const uploadImage = async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        const { data } = await axios.post('/upload', formData)
        return data.url
    }

    const deleteLegend = async (id) => {
        try {
            isLoading.value = true
            await axios.delete(`/legends/${id}`)
            legends.value = legends.value.filter(l => l.id !== id)
        } catch (error) {
            throw new Error('Error al eliminar la leyenda')
        } finally {
            isLoading.value = false
        }
    }

    const setFilters = (newFilters) => {
        filters.value = { ...filters.value, ...newFilters }
    }

    return {
        currentLegend,
        legends,
        filteredLegends,
        filters,
        isLoading,
        error,
        fetchLegends,
        showLegend,
        updateLegend,
        createLegend,
        uploadImage,
        deleteLegend,
        setFilters,
    }
})