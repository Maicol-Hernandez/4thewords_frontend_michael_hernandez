import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from '@/api/axios'

export const useLegendsStore = defineStore('legends', () => {
    const legends = ref([])
    const filters = ref({
        name: '',
        category: '',
        province: '',
        canton: '',
        district: '',
        date: ''
    })
    const isLoading = ref(false)
    const error = ref(null)
    const locations = ref(/* Datos de provincias */)

    const filteredLegends = computed(() => {
        return legends.value.filter(legend => {
            return Object.entries(filters.value).every(([key, value]) => {
                if (!value) return true
                return String(legend[key]).toLowerCase().includes(value.toLowerCase())
            })
        })
    })

    const fetchLegends = async () => {
        const { data } = await axios.get('/legends')
        legends.value = data
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
        legends,
        filteredLegends,
        filters,
        isLoading,
        error,
        fetchLegends,
        uploadImage,
        deleteLegend,
        setFilters,
    }
})