<template>
    <div class="container mx-auto p-6">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-4xl font-bold text-primary-600">Leyendas Costarricenses</h1>
            <Button label="Nueva Leyenda" icon="pi pi-plus" @click="router.push({ name: 'legend-create' })" />
        </div>

        <LegendFilter v-model="store.filters" />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <LegendCard v-for="legend in filteredLegends" :key="legend.id" :legend="legend" @edit="handleEdit"
                @delete="handleDelete" />
        </div>

        <ConfirmDialog />
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'

import { useLegendsStore } from '../stores/legends'

import LegendCard from '../components/legends/LegendCard.vue'
import LegendFilter from '../components/legends/LegendFilter.vue'
import ConfirmDialog from '../components/ui/ConfirmDialog.vue'


const deleteId = ref(null)

const store = useLegendsStore()
const { filteredLegends } = storeToRefs(store)

const router = useRouter()
const confirm = useConfirm()
const toast = useToast()


const handleDelete = async (id) => {
    deleteId.value = id

    confirm.require({
        message: '¿Estás seguro de que deseas eliminar esta leyenda?',
        header: 'Confirmar Eliminación',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Eliminar',
        rejectLabel: 'Cancelar',
        accept: async () => {
            try {
                await store.deleteLegend(deleteId.value)
                toast.add({
                    severity: 'success',
                    summary: 'Eliminado',
                    detail: 'La leyenda se eliminó correctamente',
                    life: 3000
                })
            } catch (error) {
                toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: error.message || 'Ocurrió un error al eliminar la leyenda',
                    life: 3000
                })
            } finally {
                deleteId.value = null
            }
        },
        reject: () => {
            toast.add({
                severity: 'info',
                summary: 'Cancelado',
                detail: 'La eliminación se canceló',
                life: 3000
            })
        }
    })
}

const handleEdit = (id) => {
    router.push({
        name: 'legend-edit',
        params: { id }
    })
}

onMounted(() => {
    store.fetchLegends()
})
</script>