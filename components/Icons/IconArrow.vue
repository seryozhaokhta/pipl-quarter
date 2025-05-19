<template>
    <div class="w-[22px] h-[22px] bg-[#FDC300] rounded-[4px] flex items-center justify-center"
        @mouseenter="animateArrow">
        <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg" class="block">
            <path ref="head" d="M7.53369 4.8501L11.0342 8.3001L7.53369 11.7501" :stroke="color" stroke-width="1"
                fill="none" stroke-linecap="round" stroke-linejoin="round" />
            <path ref="body" d="M10.9327 8.3H3.96606C2.30921 8.3 0.966064 6.95685 0.966064 5.3V0.25" :stroke="color"
                stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'

const props = defineProps({
    color: { type: String, default: '#282525' },
    stroke: { type: Number, default: 1 },
    duration: { type: Number, default: 0.4 },
    delayBetween: { type: Number, default: 0.1 },
})

const head = ref<SVGPathElement | null>(null)
const body = ref<SVGPathElement | null>(null)
let alreadyAnimated = false

function animateArrow() {
    if (alreadyAnimated) return
    alreadyAnimated = true

    const paths = [body.value, head.value]
    paths.forEach((el, i) => {
        if (!el) return
        const length = el.getTotalLength()
        gsap.fromTo(
            el,
            { strokeDasharray: length, strokeDashoffset: 0 },
            {
                strokeDashoffset: length,
                duration: props.duration,
                delay: i * props.delayBetween,
                ease: 'power2.in',
                onComplete: () => {
                    gsap.set(el, { strokeDashoffset: -length })
                    gsap.to(el, {
                        strokeDashoffset: 0,
                        duration: props.duration,
                        ease: 'power2.out',
                        delay: 0.05,
                        onComplete: () => {
                            alreadyAnimated = false
                        },
                    })
                },
            }
        )
    })
}

onMounted(() => {
    [body.value, head.value].forEach((el) => {
        if (!el) return
        const length = el.getTotalLength()
        el.style.strokeDasharray = `${length}`
        el.style.strokeDashoffset = '0'
    })
})
</script>
