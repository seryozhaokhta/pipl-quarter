<template>
  <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1131px] bg-white z-30 shadow-xl overflow-hidden
               flex md:flex-row flex-col items-stretch h-auto md:h-[80px] px-[8px] sm:px-[16px] md:px-0">
    <HouseSelector v-model="selectedHouse" :options="houses" class="w-full md:w-1/4 border-b md:border-b-0" />
    <RoomSelector v-model="selectedRoom" :options="rooms" class="w-full md:w-1/4 border-b md:border-b-0" />
    <AreaSelector v-model="selectedArea" :options="areas" class="w-full md:w-1/4 border-b md:border-b-0" />
    <FlatCounterButton :count="flatsCount" class="w-full md:w-1/4" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import HouseSelector from './HouseSelector.vue';
import RoomSelector from './RoomSelector.vue';
import AreaSelector from './AreaSelector.vue';
import FlatCounterButton from './FlatCounterButton.vue';

const houses = ['Все дома', 'Корпус 1', 'Корпус 2'];
const rooms = ['1 комната', '2 комнаты', '3+ комнат'];
const areas = ['30–40 м²', '40–60 м²', '60+ м²'];

const selectedHouse = ref(houses[0]);
const selectedRoom = ref(rooms[0]);
const selectedArea = ref(areas[0]);

const flatsCount = computed(() => 126);
</script>