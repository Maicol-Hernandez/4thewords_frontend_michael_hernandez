<template>
    <div class="container mx-auto p-6">
        <div class="mb-8 text-center">
            <h1 class="text-3xl font-bold text-gray-800">
                Editar Leyenda
            </h1>
            <p class="text-gray-600 mt-2">Complete todos los campos requeridos</p>
        </div>

        <div v-if="store.isLoading || !store.currentLegend" class="flex justify-center items-center"
            style="min-height: 300px">
            <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="4" fill="#EEEEEE" animationDuration=".5s" />
        </div>
        <div v-else>
            <LegendForm :loading="store.isLoading" :legend="store.currentLegend" @submit="handleSubmit"
                @cancel="router.push('/legends')" />
        </div>

        <Toast />
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useLegendsStore } from '../stores/legends'
import { useToast } from 'primevue/usetoast'
import LegendForm from '../components/legends/LegendForm.vue';


const router = useRouter()
const store = useLegendsStore()
const toast = useToast()

const props = defineProps({
    id: String
})

onMounted(async () => {
    try {
        if (!props.id) throw new Error('ID inválido')

        await store.showLegend(props.id)

        if (!store.currentLegend) {
            throw new Error('Leyenda no encontrada')
        }
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
            life: 3000
        })
        router.push('/legends')
    }
})

const handleSubmit = async (formData) => {
    try {
        if (props.id) {
            await store.updateLegend(props.id, formData)
        } else {
            throw Error('Ocurrió un error al guardar')
        }

        router.push('/legends')
        toast.add({
            severity: 'success',
            summary: 'Éxito',
            detail: `Leyenda actualizada correctamente`,
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