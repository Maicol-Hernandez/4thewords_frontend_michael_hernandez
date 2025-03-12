<template>
    <Card
        class="shadow-lg hover:shadow-xl transition-all duration-300 group relative rounded-xl overflow-hidden flex flex-col h-full">
        <template #header>
            <div class="relative h-36 sm:h-48 bg-gray-100 overflow-hidden">
                <img :src="legend.image_url || '/placeholder-legend.jpg'" :alt="'Imagen de ' + legend.name"
                    class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    loading="lazy" width="400" height="300" />
                <div
                    class="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                </div>
                <Tag :value="legend.category" severity="info"
                    class="absolute top-2 right-2 backdrop-blur-sm bg-primary-500/90 border-0 text-xs sm:text-sm" />
            </div>
        </template>

        <template #title>
            <div class="flex justify-between items-start sm:items-center gap-2 mb-1 sm:mb-2">
                <h3 class="text-base sm:text-xl font-bold text-gray-800 truncate mr-2">{{ legend.name }}</h3>
                <div class="flex space-x-1 sm:space-x-2 shrink-0">
                    <Button icon="pi pi-pencil" severity="secondary" text rounded aria-label="Editar"
                        @click.stop="$emit('edit', legend.id)" class="w-8 h-8 sm:w-10 sm:h-10" />
                    <Button icon="pi pi-trash" severity="danger" text rounded aria-label="Eliminar"
                        @click.stop="$emit('delete', legend.id)" class="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
            </div>
        </template>

        <template #subtitle>
            <div
                class="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 overflow-hidden">
                <i class="pi pi-map-marker text-primary-500"></i>
                <span class="truncate">{{ locationDisplay }}</span>
            </div>
        </template>

        <template #content>
            <div class="space-y-2 sm:space-y-3 flex-grow">
                <p
                    class="text-gray-700 text-xs sm:text-sm leading-relaxed line-clamp-3 hover:line-clamp-none transition-all duration-300 cursor-default">
                    {{ legend.description }}
                </p>

                <div class="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600 mt-auto pt-2">
                    <i class="pi pi-clock text-primary-500"></i>
                    <time :datetime="legend.created_at" class="font-medium">
                        {{ formatDate(legend.created_at) }}
                    </time>
                </div>
            </div>
        </template>

        <template #footer>
            <div class="flex justify-between items-center pt-2 border-t border-gray-100 mt-2">
                <span class="text-xs text-gray-500">ID: {{ truncatedId }}</span>
                <Tag :value="shortDate" icon="pi pi-calendar" severity="info"
                    class="bg-white/80 backdrop-blur-sm border-0 text-xs" />
            </div>
        </template>
    </Card>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';
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

const shortDate = computed(() => {
    return format(new Date(props.legend.created_at), "dd MMM yyyy", { locale: es });
});

const locationDisplay = computed(() => {
    return [props.legend.province, props.legend.canton, props.legend.district]
        .filter(Boolean)
        .join(' > ');
});

const truncatedId = computed(() => {
    return props.legend.id?.toString().slice(0, 8) || '';
});
</script>

<style scoped>
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.hover\:line-clamp-none:hover {
    -webkit-line-clamp: unset;
}
</style>