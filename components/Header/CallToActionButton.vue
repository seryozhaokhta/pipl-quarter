<template>
  <button class="bg-transparent rounded-full flex items-center">
    <span class="text-[14px] sm:text-[15px] md:text-[16px] font-normal leading-none text-black sm:text-white">
      {{ label }}
    </span>
  </button>
</template>

<script setup lang="ts">
defineProps<{ label: string }>();
</script>
