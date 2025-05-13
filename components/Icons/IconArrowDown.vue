<template>
    <svg class="w-[18px] sm:w-[20px] md:w-[22px] h-[18px] sm:h-[20px] md:h-[22px] pointer-events-none"
        viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="0.5" width="21" height="21" rx="3.5" stroke="#282525" stroke-opacity="0.4" />
        <g ref="arrow" class="arrow">
            <path d="M15.75 9.24268L11.5074 13.4853L7.26472 9.24268" stroke="#282525" />
        </g>
    </svg>
</template>

<script setup lang="ts">
import gsap from 'gsap';

defineProps<{ isOpen: boolean }>();

const arrow = ref<SVGGElement | null>(null);
const rotation = ref(0);

function toggleRotate() {
    rotation.value = rotation.value === 0 ? 180 : 0;
    if (!arrow.value) return;
    gsap.to(arrow.value, {
        rotate: rotation.value,
        transformOrigin: 'center',
        duration: 0.3,
        ease: 'power2.out',
    });
}

watch(() => rotation.value, (newVal) => {
    if (!arrow.value) return;
    gsap.to(arrow.value, {
        rotate: newVal,
        transformOrigin: 'center',
        duration: 0.3,
        ease: 'power2.out',
    });
});

defineExpose({ toggleRotate });
</script>