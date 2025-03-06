<template>
    <Card class="shadow-lg hover:shadow-xl transition-all duration-300 group relative rounded-xl overflow-hidden">
        <template #header>
            <div class="relative h-48 bg-gray-100 overflow-hidden">
                <img :src="legend.image_url || '/placeholder-legend.jpg'" :alt="'Imagen de ' + legend.name"
                    class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    loading="lazy" />
                <Tag :value="legend.category" severity="info"
                    class="absolute top-2 right-2 backdrop-blur-sm bg-primary-500/90 border-0" />
            </div>
        </template>

        <template #title>
            <div class="flex justify-between items-center text-xl font-bold text-gray-800 mb-2">
                <span class="truncate">{{ legend.name }}</span>
                <div class="flex space-x-2">
                    <Button icon="pi pi-pencil" severity="secondary" text rounded aria-label="Editar"
                        @click.stop="$emit('edit', legend.id)" />
                    <Button icon="pi pi-trash" severity="danger" text rounded aria-label="Eliminar"
                        @click.stop="$emit('delete', legend.id)" />
                </div>
            </div>
        </template>

        <template #subtitle>
            <div class="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                <i class="pi pi-map-marker text-primary-500"></i>
                <span>{{ legend.province }} > {{ legend.canton }} > {{ legend.district }}</span>
            </div>
        </template>

        <template #content>
            <div class="space-y-3">
                <div class="text-gray-700 text-sm line-clamp-3 hover:line-clamp-none transition-all cursor-default">
                    {{ legend.description }}
                </div>

                <div class="flex items-center space-x-2 text-sm text-gray-600">
                    <i class="pi pi-clock text-primary-500"></i>
                    <time :datetime="legend.created_at" class="font-medium">
                        {{ formatDate(legend.created_at) }}
                        <span class="text-xs ml-2">{{ absoluteDate(legend.created_at) }}</span>
                    </time>
                </div>
            </div>
        </template>

        <template #footer>
            <div class="flex justify-end">
                <Tag :value="absoluteDate(legend.created_at)" icon="pi pi-calendar" severity="info"
                    class="bg-white/80 backdrop-blur-sm border-0" />
            </div>
        </template>
    </Card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { formatDistanceToNow, format } from 'date-fns';
import { es } from 'date-fns/locale';

const props = defineProps({
    legend: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['delete', 'edit']);

const formatDate = (dateString) => {
    return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: es
    });
};

const absoluteDate = (dateString) => {
    return format(new Date(dateString), "dd MMM yyyy '•' HH:mm", { locale: es });
};
</script>

<style scoped>
.line-clamp-3 {
    display: -webkit-box;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>