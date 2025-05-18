<template>
  <div v-if="!loading && !error" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1131px] bg-white z-30
           shadow-xl overflow-hidden flex md:flex-row flex-col items-stretch
           h-auto md:h-[80px] px-[8px] sm:px-[16px] md:px-0">
    <BaseFilter v-model="selectedHouse" label="Дом" :options="filters.houses" class="w-full md:w-1/4" />
    <BaseFilter v-model="selectedRoom" label="Комнатность" :options="filters.rooms" class="w-full md:w-1/4" />
    <BaseFilter v-model="selectedArea" label="Площадь" :options="filters.areas" class="w-full md:w-1/4" />
    <FlatCounterButton :count="filters.count" class="w-full md:w-1/4" />
  </div>

  <div v-else class="text-center text-sm py-4 text-gray-500">
    Загрузка фильтров...
  </div>
</template>

<script setup lang="ts">
import BaseFilter from './BaseFilter.vue'
import FlatCounterButton from './FlatCounterButton.vue'

interface FiltersData {
  houses: string[]
  rooms: string[]
  areas: string[]
  count: number
}

const props = defineProps<{ filters?: FiltersData }>()
const emit = defineEmits<{ (e: 'update:filters', value: FiltersData): void }>()

const { data: apiData, pending, error } = useFetch<FiltersData>('/api/filters')

const defaultFilters: FiltersData = {
  houses: ['Все дома', 'Корпус 1', 'Корпус 2'],
  rooms: ['1 комната', '2 комнаты', '3+ комнат'],
  areas: ['30–40 м²', '40–60 м²', '60+ м²'],
  count: 126,
}

const filters = computed(() => props.filters ?? apiData.value ?? defaultFilters)
const loading = computed(() => pending.value && !props.filters)

const selectedHouse = ref(filters.value.houses[0])
const selectedRoom = ref(filters.value.rooms[0])
const selectedArea = ref(filters.value.areas[0])

watchEffect(() => {
  emit('update:filters', {
    houses: filters.value.houses,
    rooms: filters.value.rooms,
    areas: filters.value.areas,
    count: filters.value.count,
  })
})
</script>

<style scoped>
:deep([role="combobox"]) {
  border: none !important;
  box-shadow: none !important;
}
</style>
