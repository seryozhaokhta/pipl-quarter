<template>
    <button class="bg-transparent rounded-full flex items-center gap-[6px] sm:gap-[8px]">
        <span
            class="relative link-wrapper inline-block text-[14px] sm:text-[15px] md:text-[16px] font-normal leading-none text-black sm:text-white"
            @mouseenter="underlineIn" @mouseleave="underlineOut">
            {{ label }}
            <span ref="underlineBar" class="underline-bar" />
        </span>
        <IconArrow class="w-4 h-4 text-black sm:text-white" />
    </button>
</template>

<script setup lang="ts">
import gsap from 'gsap';

defineProps<{ label: string }>();

const underlineBar = ref<HTMLElement | null>(null);

function underlineIn() {
    if (!underlineBar.value) return;
    gsap.to(underlineBar.value, {
        scaleX: 1,
        transformOrigin: "left",
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
    });
}

function underlineOut() {
    if (!underlineBar.value) return;
    gsap.to(underlineBar.value, {
        scaleX: 0,
        transformOrigin: "right",
        duration: 0.35,
        ease: "power2.in",
        overwrite: "auto",
    });
}
</script>

<style scoped>
.link-wrapper {
    cursor: pointer;
    display: inline-block;
}

.underline-bar {
    position: absolute;
    left: 0;
    bottom: -3px;
    height: 1px;
    width: 100%;
    background-color: currentColor;
    transform: scaleX(0);
    pointer-events: none;
}
</style>
