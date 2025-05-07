<template>
  <div class="flex flex-col">
    <label v-if="label" class="text-xs text-gray-500 mb-1">{{ label }}</label>
    <select class="border px-4 py-2 rounded">
      <option v-for="option in options" :key="option">{{ option }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string;
  options: string[];
}>();
</script>
