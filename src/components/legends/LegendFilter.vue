<script setup>
import { ref, watch, defineEmits } from 'vue'
import InputText from 'primevue/inputtext'

const props = defineProps({
    modelValue: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['update:modelValue'])

const filters = ref({ ...props.modelValue })
const isExpanded = ref(false)

watch(filters, (newVal) => {
    emit('update:modelValue', newVal)
}, { deep: true })

const clearFilters = () => {
    Object.keys(filters.value).forEach(key => {
        filters.value[key] = null
    })
}
</script>

<template>
    <div class="bg-white p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6">
        <div class="flex items-center justify-between mb-3 sm:mb-4">
            <h3 class="text-sm font-semibold text-gray-700">Filtros</h3>
            <div class="flex gap-2">
                <Button v-if="Object.values(filters).some(val => val)" icon="pi pi-filter-slash" severity="secondary"
                    text size="small" @click="clearFilters" aria-label="Limpiar filtros" />
                <Button icon="pi pi-angle-down" :class="{ 'rotate-180': isExpanded }" severity="secondary" text
                    size="small" @click="isExpanded = !isExpanded" class="sm:hidden transition-transform duration-200"
                    aria-label="Expandir filtros" />
            </div>
        </div>

        <div :class="{ 'hidden sm:grid': !isExpanded, 'grid': isExpanded }"
            class="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <div class="space-y-1 sm:space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700">Nombre</label>
                <InputText v-model="filters.name" placeholder="Nombre" class="w-full text-sm" />
            </div>

            <div class="space-y-1 sm:space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700">Fecha de creación</label>
                <DatePicker v-model="filters.created_at" dateFormat="dd/mm/yy" :maxDate="new Date()" placeholder="Fecha"
                    class="w-full" />
            </div>

            <div class="space-y-1 sm:space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700">Categoría</label>
                <InputText v-model="filters.category" placeholder="Categoría" class="w-full text-sm" />
            </div>

            <div class="space-y-1 sm:space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700">Provincia</label>
                <InputText v-model="filters.province" placeholder="Provincia" class="w-full text-sm" />
            </div>

            <div class="space-y-1 sm:space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700">Cantón</label>
                <InputText v-model="filters.canton" placeholder="Cantón" class="w-full text-sm" />
            </div>

            <div class="space-y-1 sm:space-y-2">
                <label class="block text-xs sm:text-sm font-medium text-gray-700">Distrito</label>
                <InputText v-model="filters.district" placeholder="Distrito" class="w-full text-sm" />
            </div>
        </div>
    </div>
</template>