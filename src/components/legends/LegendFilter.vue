<!-- components/legends/LegendFilter.vue -->
<script setup>
import { ref, watch } from 'vue'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'

const props = defineProps({
    modelValue: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['update:modelValue'])

const filters = ref({ ...props.modelValue })

watch(filters, (newVal) => {
    emit('update:modelValue', newVal)
}, { deep: true })
</script>

<template>
    <div class="bg-white p-4 rounded-lg shadow mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Nombre</label>
                <InputText v-model="filters.name" />
            </div>

            <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Fecha</label>
                <Calendar v-model="filters.date" dateFormat="dd/mm/yy" />
            </div>

            <!-- Agregar más filtros según necesidad -->
        </div>
    </div>
</template>