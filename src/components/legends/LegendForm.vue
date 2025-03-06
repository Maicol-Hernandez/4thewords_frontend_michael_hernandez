<template>
    <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <!-- Formulario de leyenda sin el campo "image" -->
        <Form :initialValues="initialValues" :resolver="legendFormResolver" @submit="onFormSubmit" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Nombre de la leyenda -->
                <FormField name="name" class="flex flex-col gap-1" v-slot="$field">
                    <InputText v-model="$field.value" placeholder="Nombre de la Leyenda" class="p-inputtext-sm" />
                    <Message v-if="$field.invalid" severity="error" size="small" variant="simple">
                        {{ $field.error?.message }}
                    </Message>
                </FormField>

                <!-- Categoría -->
                <FormField name="category" class="flex flex-col gap-1" v-slot="$field">
                    <InputText v-model="$field.value" placeholder="Categoría" class="p-inputtext-sm" />
                    <Message v-if="$field.invalid" severity="error" size="small" variant="simple">
                        {{ $field.error?.message }}
                    </Message>
                </FormField>

                <!-- Descripción -->
                <FormField name="description" class="flex flex-col gap-1" v-slot="$field">
                    <Textarea v-model="$field.value" placeholder="Descripción detallada de la leyenda..."
                        class="p-inputtextarea-sm" rows="4" />
                    <Message v-if="$field.invalid" severity="error" size="small" variant="simple">
                        {{ $field.error?.message }}
                    </Message>
                </FormField>

                <!-- Provincia -->
                <FormField name="province" class="flex flex-col gap-1" v-slot="$field">
                    <InputText v-model="$field.value" placeholder="Provincia" class="p-inputtext-sm" />
                    <Message v-if="$field.invalid" severity="error" size="small" variant="simple">
                        {{ $field.error?.message }}
                    </Message>
                </FormField>

                <!-- Cantón -->
                <FormField name="canton" class="flex flex-col gap-1" v-slot="$field">
                    <InputText v-model="$field.value" placeholder="Cantón" class="p-inputtext-sm" />
                    <Message v-if="$field.invalid" severity="error" size="small" variant="simple">
                        {{ $field.error?.message }}
                    </Message>
                </FormField>

                <!-- Distrito -->
                <FormField name="district" class="flex flex-col gap-1" v-slot="$field">
                    <InputText v-model="$field.value" placeholder="Distrito" class="p-inputtext-sm" />
                    <Message v-if="$field.invalid" severity="error" size="small" variant="simple">
                        {{ $field.error?.message }}
                    </Message>
                </FormField>
            </div>

            <!-- Componente independiente para la imagen -->
            <!-- <FormField name="image" class="flex flex-col gap-1" v-slot="$field">
                <InputText type="file" v-model="$field.value" placeholder="Distrito" class="p-inputtext-sm" />
                <Message v-if="$field.invalid" severity="error" size="small" variant="simple">
                    {{ $field.error?.message }}
                </Message>
            </FormField> -->

            <div class="mt-4">
                <label class="block mb-2 font-semibold">Seleccionar imagen</label>
                <input type="file" accept="image/*" @change="handleFileInput" class="block" />
                <div v-if="imagePreview" class="mt-4">
                    <img :src="imagePreview" alt="Vista previa" class="border rounded-lg w-full h-48 object-cover" />
                </div>
            </div>

            <!-- Botones -->
            <div class="flex justify-end gap-4">
                <Button type="button" label="Cancelar" severity="secondary" class="mt-4 p-button-sm"
                    @click="$emit('cancel')" />
                <Button type="submit" :label="isSubmitting ? 'Cargando...' : 'Enviar'" :disabled="isSubmitting"
                    severity="secondary" class="mt-4 p-button-sm">
                    <template #icon v-if="isSubmitting">
                        <i class="pi pi-spin pi-spinner" />
                    </template>
                </Button>
            </div>
        </Form>
    </div>
</template>

<script setup>
import { ref, reactive, computed, defineProps, defineEmits } from 'vue'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'

import { Form } from '@primevue/forms'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Message from 'primevue/message'

const props = defineProps({
    legend: {
        type: Object,
        default: null
    },
    loading: Boolean
})

const emit = defineEmits(['submit', 'cancel'])


const imagePreview = ref(null)
const selectedImage = ref(null)
const isSubmitting = ref(false)


const initialValues = reactive({
    name: props.legend?.name || '',
    category: props.legend?.category || '',
    description: props.legend?.description || '',
    province: props.legend?.province || '',
    canton: props.legend?.canton || '',
    district: props.legend?.district || '',
    // image: props.legend?.image_url || null
})

const legendSchema = z.object({
    name: z.string()
        .min(3, 'Mínimo 3 caracteres')
        .max(100, 'Máximo 100 caracteres'),
    category: z.string().nonempty('Seleccione una categoría'),
    description: z.string()
        .min(20, 'Mínimo 20 caracteres')
        .max(1000, 'Máximo 1000 caracteres')
        .optional(),
    province: z.string()
        .min(3, 'Mínimo 3 caracteres')
        .max(50, 'Máximo 50 caracteres'),
    canton: z.string()
        .min(3, 'Mínimo 3 caracteres')
        .max(50, 'Máximo 50 caracteres'),
    district: z.string()
        .min(3, 'Mínimo 3 caracteres')
        .max(50, 'Máximo 50 caracteres'),
    // image: z.instanceof(File, { message: 'Seleccione una imagen válida' })
    //     .refine(file => file?.size <= 2000000, 'Máximo 2MB')
    //     .or(z.string().url('URL de imagen inválida'))
    //     .optional()
})

const legendFormResolver = zodResolver(legendSchema)
const submitLabel = computed(() => props.legend ? 'Actualizar' : 'Crear Leyenda')

const handleFileInput = (event) => {
    const file = event.target.files[0]
    if (file) {
        selectedImage.value = file
        imagePreview.value = URL.createObjectURL(file)
    }
}

const onFormSubmit = async ({ values, valid }) => {
    console.log('values :>> ', values, 'valid :>> ', valid)
    if (!valid) return

    try {
        isSubmitting.value = true
        const formData = new FormData()

        const legendData = {
            name: values.name,
            category: values.category,
            description: values.description,
            legend_date: new Date().toISOString().split('T')[0],
            province: values.province,
            canton: values.canton,
            district: values.district
        }

        formData.append('legend_data', JSON.stringify(legendData))

        if (selectedImage.value instanceof File) {
            formData.append('image', selectedImage.value)
        }

        emit('submit', formData)
    } catch (error) {
        console.error('Error en el formulario:', error)
    } finally {
        isSubmitting.value = false
    }
}
</script>
