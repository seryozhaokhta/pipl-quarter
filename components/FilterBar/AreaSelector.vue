<template>
  <div class="flex flex-col justify-between h-full py-2 md:py-3 px-4 md:px-8 md:border-r"
    style="border-color: #28252529;">
    <label class="text-[12px] sm:text-[13px] md:text-[14px] font-normal text-[#282525A6] leading-none">
      Площадь
    </label>
    <div class="relative flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <select v-model="model" ref="selectRef" @click="toggleSelect"
        class="appearance-none bg-transparent pr-0 sm:pr-8 pl-0 text-[14px] sm:text-[16px] md:text-[24px] font-normal outline-none h-[28px] md:h-[32px] w-full text-left leading-none">
        <option v-for="opt in options" :key="opt" :value="opt">{{ opt }}</option>
      </select>
      <IconArrowDown ref="iconRef" :is-open="isOpen"
        class="w-[16px] h-[16px] sm:w-4 sm:h-4 pointer-events-none sm:absolute sm:right-2 sm:top-1/2 sm:-translate-y-1/2 mt-[4px] sm:mt-0" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import IconArrowDown from '~/components/Icons/IconArrowDown.vue';

const model = defineModel<string>();
defineProps<{ options: string[] }>();

const selectRef = ref<HTMLSelectElement | null>(null);
const iconRef = ref<{ toggleRotate: () => void } | null>(null);
const isOpen = ref(false);

function toggleSelect() {
  isOpen.value = !isOpen.value;
  iconRef.value?.toggleRotate();
}
</script>