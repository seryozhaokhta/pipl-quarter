<template>
    <div v-if="!loading && !error && filters.houses.length" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1131px] bg-white z-30
             shadow-xl overflow-hidden flex md:flex-row flex-col items-stretch
             h-auto md:h-[80px] px-[8px] sm:px-[16px] md:px-0">
        <FilterItem v-model="selected.house" label="Дом" :options="filters.houses" class="w-full md:w-1/4" />
        <FilterItem v-model="selected.room" label="Комнатность" :options="filters.rooms" class="w-full md:w-1/4" />
        <FilterItem v-model="selected.area" label="Площадь" :options="filters.areas" class="w-full md:w-1/4" />
        <FlatCounterButton :count="filters.count" class="w-full md:w-1/4" />
    </div>
    <div v-else class="text-center text-sm py-4 text-gray-500">
        Загрузка фильтров...
    </div>
</template>

<script setup lang="ts">
type FilterOption = { label: string; value: string };
type ApiFiltersResponse = {
    houses: string[];
    rooms: string[];
    areas: string[];
    count: number;
};
type FiltersData = {
    houses: FilterOption[];
    rooms: FilterOption[];
    areas: FilterOption[];
    count: number;
};

function mapArray(arr: string[], category: 'houses' | 'rooms' | 'areas'): FilterOption[] {
    if (category === 'houses') {
        return arr.map((item, idx) => ({
            label: item,
            value: idx === 0 ? 'all' : idx.toString(),
        }));
    }
    if (category === 'rooms') {
        return arr.map((item, idx) => ({
            label: item,
            value: item.match(/\d+/)?.[0] ?? (idx === 2 ? '3+' : (idx + 1).toString()),
        }));
    }
    if (category === 'areas') {
        return arr.map((item, idx) => ({
            label: item,
            value: idx === 0 ? '30-40' : idx === 1 ? '40-60' : '60+',
        }));
    }
    return arr.map(item => ({ label: item, value: item }));
}

const { data: apiData, pending, error } = useFetch<ApiFiltersResponse>('/api/filters');

const defaultFilters: FiltersData = {
    houses: mapArray(['Все дома', 'Корпус 1', 'Корпус 2'], 'houses'),
    rooms: mapArray(['1 комната', '2 комнаты', '3+ комнат'], 'rooms'),
    areas: mapArray(['30–40 м²', '40–60 м²', '60+ м²'], 'areas'),
    count: 126,
};

const filters = computed<FiltersData>(() => {
    const d = apiData.value;
    if (d && d.houses && d.rooms && d.areas) {
        return {
            houses: mapArray(d.houses, 'houses'),
            rooms: mapArray(d.rooms, 'rooms'),
            areas: mapArray(d.areas, 'areas'),
            count: d.count,
        };
    }
    return defaultFilters;
});
const loading = computed(() => pending.value);

const selected = reactive({
    house: filters.value.houses[0]?.value || '',
    room: filters.value.rooms[0]?.value || '',
    area: filters.value.areas[0]?.value || '',
});

watch(
    filters,
    (newFilters) => {
        if (newFilters.houses?.length && !newFilters.houses.find(x => x.value === selected.house)) {
            selected.house = newFilters.houses[0].value;
        }
        if (newFilters.rooms?.length && !newFilters.rooms.find(x => x.value === selected.room)) {
            selected.room = newFilters.rooms[0].value;
        }
        if (newFilters.areas?.length && !newFilters.areas.find(x => x.value === selected.area)) {
            selected.area = newFilters.areas[0].value;
        }
    },
    { immediate: true }
);

</script>

<style scoped>
:deep([role="combobox"]) {
    border: none !important;
    box-shadow: none !important;
}
</style>
