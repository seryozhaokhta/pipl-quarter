<template>
  <svg ref="icon" class="w-[22px] h-[22px] pointer-events-none" viewBox="0 0 22 22" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="21" height="21" rx="3.5" stroke="#282525" stroke-opacity="0.4" />
    <g ref="cross" class="cross">
      <path d="M15.6924 6.40332L6.5 15.5957" stroke="#282525" />
      <path d="M6.30761 6.40332L15.5 15.5957" stroke="#282525" />
    </g>
  </svg>
</template>

<script setup lang="ts">
import gsap from 'gsap';

const cross = ref<SVGGElement | null>(null);

function hoverIn() {
  if (!cross.value) return;
  gsap.to(cross.value, {
    scale: 1.2,
    transformOrigin: 'center',
    duration: 0.25,
    ease: 'power2.out',
  });
}

function hoverOut() {
  if (!cross.value) return;
  gsap.to(cross.value, {
    scale: 1,
    transformOrigin: 'center',
    duration: 0.25,
    ease: 'power2.in',
  });
}

defineExpose({ hoverIn, hoverOut });
</script>