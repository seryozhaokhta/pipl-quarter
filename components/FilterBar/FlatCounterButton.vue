<template>
  <button
    class="bg-black text-white h-full flex items-center gap-2 px-3 sm:px-4 md:px-6 py-2 md:py-0 justify-center rounded-none">
    <span class="text-[14px] sm:text-[16px] md:text-[24px] font-normal leading-none">
      {{ count }} квартир
    </span>
    <IconArrow />
  </button>
</template>

<script setup lang="ts">
defineProps<{ count: number }>();
import IconArrow from '~/components/Icons/IconArrow.vue';
</script>