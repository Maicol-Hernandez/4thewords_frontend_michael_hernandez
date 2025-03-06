<template>
    <div class="container mx-auto p-6">
        <div class="mb-8 text-center">
            <h1 class="text-3xl font-bold text-gray-800">
                {{ isEditing ? 'Editar Leyenda' : 'Crear Nueva Leyenda' }}
            </h1>
            <p class="text-gray-600 mt-2">Complete todos los campos requeridos</p>
        </div>

        <LegendForm :loading="isSubmitting" @submit="handleSubmit" @cancel="router.push('/legends')" />
        <Toast />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLegendsStore } from '../stores/legends'
import { useToast } from 'primevue/usetoast'
import LegendForm from '../components/legends/LegendForm.vue';


const router = useRouter()
const store = useLegendsStore()
const isSubmitting = ref(false)

const props = defineProps({
    id: String
})

const toast = useToast()
const isEditing = computed(() => !!props.id)

// Cargar datos si estamos editando
const currentLegend = ref(null)
if (isEditing.value) {
    currentLegend.value = store.legends.find(l => l.id === props.id)
}

// Manejar el submit del formulario
const handleSubmit = async (formData) => {
    try {
        isSubmitting.value = true

        await store.createLegend(formData)
        router.push('/legends')
        toast.add({
            severity: 'success',
            summary: 'Éxito',
            detail: `Leyenda ${isEditing.value ? 'actualizada' : 'creada'} correctamente`,
            life: 3000
        })

    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message || 'Ocurrió un error al guardar',
            life: 3000
        })
    } finally {
        isSubmitting.value = false
    }
}

</script>