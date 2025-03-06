<!-- components/legends/LegendFilter.vue -->
<script setup>
import { ref, watch, defineEmits } from 'vue'
import InputText from 'primevue/inputtext'
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
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Nombre</label>
                <InputText v-model="filters.name" placeholder="Ingrese un nombre" />
            </div>

            <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Fecha de creación</label>
                <Calendar v-model="filters.created_at" dateFormat="dd/mm/yy" :maxDate="new Date()"
                    placeholder="Seleccione una fecha" />
            </div>

            <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Categoria</label>
                <InputText v-model="filters.category" placeholder="Seleccione una categoría" />
            </div>

            <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Provincia</label>
                <InputText v-model="filters.province" placeholder="Seleccione una provincia" />
            </div>

            <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Cantón</label>
                <InputText v-model="filters.canton" placeholder="Seleccione un cantón" />
            </div>

            <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Distrito</label>
                <InputText v-model="filters.district" placeholder="Seleccione un distrito" />
            </div>

        </div>
    </div>
</template>