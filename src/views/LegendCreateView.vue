<template>
    <div class="container mx-auto p-6">
        <div class="mb-8 text-center">
            <h1 class="text-3xl font-bold text-gray-800">
                Crear Nueva Leyenda
            </h1>
            <p class="text-gray-600 mt-2">Complete todos los campos requeridos</p>
        </div>

        <LegendForm :loading="store.isLoading" @submit="handleSubmit" @cancel="router.push('/legends')" />
        <Toast />
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useLegendsStore } from '../stores/legends'
import { useToast } from 'primevue/usetoast'
import LegendForm from '../components/legends/LegendForm.vue';

const router = useRouter()
const store = useLegendsStore()

const toast = useToast()

const handleSubmit = async (formData) => {
    try {
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
    }

}

</script>