<template>
    <div class="container mx-auto p-6">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-4xl font-bold text-primary-600">Leyendas Costarricenses</h1>
            <Button label="Nueva Leyenda" icon="pi pi-plus" @click="router.push('/crear')" />
        </div>

        <LegendFilter v-model="store.filters" />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <LegendCard v-for="legend in filteredLegends" :key="legend.id" :legend="legend" @edit="handleEdit"
                @delete="handleDelete" />
        </div>

        <!-- <ConfirmDialog /> -->
    </div>
</template>

<script setup>
import { useLegendsStore } from '../stores/legends'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import LegendCard from '../components/legends/LegendCard.vue'
import ConfirmDialog from '../components/ui/ConfirmDialog.vue'
import LegendFilter from '../components/legends/LegendFilter.vue'

const store = useLegendsStore()
const { filteredLegends } = storeToRefs(store)

const handleDelete = async (id) => {
    await store.deleteLegend(id)
}

const handleEdit = (id) => {
    // router.push(`/editar/${id}`)
}

onMounted(() => {
    store.fetchLegends()
})
</script>