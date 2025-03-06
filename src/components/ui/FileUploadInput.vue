<template>
    <div>
        <FileUpload mode="basic" accept="image/*" chooseLabel="Seleccionar imagen" customUpload auto
            @select="handleSelect" />
        <div v-if="preview" class="mt-4 relative">
            <img :src="preview" alt="Vista previa" class="border rounded-lg w-full h-48 object-cover" />
            <Button v-if="existing" icon="pi pi-refresh" label="Restaurar original" severity="secondary"
                class="mt-2 p-button-text p-button-sm" @click="restore" />
        </div>
    </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'
import FileUpload from 'primevue/fileupload'
import Button from 'primevue/button'

const props = defineProps({
    modelValue: {
        type: [File, String, null],
        default: null
    },
    existing: {
        type: String,
        default: null
    }
})
const emit = defineEmits(['update:modelValue'])

const preview = ref(null)

// Si modelValue es una URL, mostrarla inicialmente en la preview
if (typeof props.modelValue === 'string') {
    preview.value = props.modelValue
}

const handleSelect = (e) => {
    if (e && e.files && e.files[0]) {
        const file = e.files[0]
        preview.value = URL.createObjectURL(file)
        emit('update:modelValue', file)
    }
}

const restore = () => {
    preview.value = props.existing
    emit('update:modelValue', props.existing)
}

// Actualiza la preview si modelValue cambia desde afuera
watch(() => props.modelValue, (newVal) => {
    if (typeof newVal === 'string') {
        preview.value = newVal
    }
})
</script>
