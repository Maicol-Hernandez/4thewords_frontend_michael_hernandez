import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { Legend, LegendFilters } from '@/types/legend'


export const useLegendsStore = defineStore('legends', () => {
  const legends = ref<Legend[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null);

  // Filtros reactivos
  const filters = reactive<LegendFilters>({
    name: '',
    category: '',
    province: '',
    canton: '',
    district: '',
    date: ''
  });

  // Computed: Filtered legends
  const filteredLegends = computed(() => {
    return legends.value.filter(legend => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;

        const legendValue = legend[key as keyof Legend];

        // Special handling for dates
        if (key === 'date') {
          const legendDate = new Date(legend.created_at).toISOString().split('T')[0];
          return legendDate === value;
        }

        // Case-insensitive search for text
        return String(legendValue).toLowerCase().includes(value.toLowerCase());
      });
    });
  });


  // Action to fetch legends from the API
  const fetchLegends = async () => {
    try {
      isLoading.value = true;
      const { data } = await axios.get<Legend[]>('/api/legends');
      legends.value = data;
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      isLoading.value = false;
    }
  };
})

