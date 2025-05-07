<template>
    <button ref="button" class="fixed 
           bottom-[285px] right-[12px]
           lg:bottom-20 lg:right-10
           w-[52px] h-[52px] rounded-full flex items-center justify-center z-50" @mouseenter="animateIn"
        @mouseleave="animateOut" aria-label="Позвонить">

        <div ref="pulse" class="absolute w-[52px] h-[52px] rounded-full bg-[#FDC300]/20 z-[-1]" />

        <div class="w-[52px] h-[52px] rounded-full bg-[#FDC300] flex items-center justify-center shadow-lg">
            <img src="/phoneIcon.svg" alt="Phone Icon" class="w-6 h-6" />
        </div>
    </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import gsap from 'gsap'

const pulse = ref<HTMLElement | null>(null)

function animateIn() {
    if (!pulse.value) return
    gsap.to(pulse.value, {
        scale: 1.5,
        duration: 0.6,
        ease: 'power2.out',
    })
}

function animateOut() {
    if (!pulse.value) return
    gsap.to(pulse.value, {
        scale: 1,
        duration: 0.4,
        ease: 'power2.inOut',
    })
}
</script>

<style scoped>
button {
    transform-origin: center;
}
</style>
