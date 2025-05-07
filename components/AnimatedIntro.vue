<template>
  <section class="relative w-full h-screen overflow-hidden">
    <div class="relative w-full h-full overflow-hidden">

      <img src="/hero/bg.jpg" class="absolute inset-0 w-full h-full object-cover" alt="" aria-hidden="true" />

      <div ref="headline"
        class="headline absolute top-[55%] sm:top-[70%] left-0 w-full flex justify-center -translate-y-1/2 z-20 opacity-0 translate-x-[-80px]">
        <img src="/hero/title.svg" class="w-[95%] max-w-none select-none pointer-events-none"
          alt="Жилой квартал Пипл" />
      </div>

      <div v-for="n in 6" :key="n" class="mask-bar absolute top-0 h-full z-10"
        :style="{ backgroundImage: `url(/hero/slide-${n}.png)` }" :ref="(el) => setMask(el, n - 1)" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onBeforeUnmount } from "vue"
import type { ComponentPublicInstance } from "vue"
import gsap from "gsap"

const NUM = 6
const SPEED = 0.75
const MAX_W = 30
const MIN_W = 0

const maskRefs = ref<(HTMLElement | null)[]>(Array(NUM).fill(null))
const headline = ref<HTMLElement | null>(null)

function setMask(el: Element | ComponentPublicInstance | null, idx: number) {
  maskRefs.value[idx] = (el as HTMLElement) || null
}

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
function dynamicWidth(center: number) {
  const d = Math.abs(center - 50)
  const t = clamp(1 - d / 50, 0, 1)
  return MIN_W + (MAX_W - MIN_W) * Math.sin(t * Math.PI * 0.5)
}

let groupX = 0
let widths = Array(NUM).fill(MIN_W)
let frozen = false
let headlineShown = false

onMounted(async () => {
  document.body.style.overflowY = "hidden"
  await nextTick()

  const setters = maskRefs.value.map((el) => ({
    setL: gsap.quickSetter(el!, "left", "vw"),
    setW: gsap.quickSetter(el!, "width", "vw"),
  }))

  const update = (delta = 1) => {
    const dx = SPEED * delta

    let curX = groupX
    for (let i = 0; i < NUM; i++) {
      widths[i] = dynamicWidth(curX + widths[i] * 0.5)
      curX += widths[i]
    }

    const total = widths.reduce((s, w) => s + w, 0)
    if (!frozen) {
      if (groupX + total + 0.001 < 100) {
        groupX += dx
      } else {
        groupX = 100 - total
        frozen = true
      }
    }

    curX = groupX
    for (let i = 0; i < NUM; i++) {
      const left = Math.round(curX * 1000) / 1000
      const width = Math.round(widths[i] * 1000) / 1000
      setters[i].setL(left)
      setters[i].setW(width)
      curX += widths[i]
    }

    if (frozen && !headlineShown && headline.value) {
      headlineShown = true
      gsap.to(headline.value, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      })
    }
  }

  gsap.ticker.add(update)

  onBeforeUnmount(() => {
    gsap.ticker.remove(update)
    document.body.style.overflowY = "auto"
  })
})
</script>

<style scoped>
.mask-bar {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  will-change: left, width;
  pointer-events: none;
  max-width: 100vw;
}
</style>
