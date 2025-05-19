<template>
  <section class="relative w-full h-screen overflow-hidden">
    <div class="relative w-full h-full overflow-hidden">

      <img src="/hero/bg.jpg" class="absolute inset-0 w-full h-full object-cover" alt="" aria-hidden="true">

      <div class="absolute inset-0 w-full h-full z-0">
        <img v-for="n in 6" :key="n" :ref="(el) => setImage(el, n - 1)" :src="`/hero/slide-${n}.png`"
          :style="{ clipPath: `inset(0 100% 0 0)` }" class="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true">
      </div>

      <div ref="headline"
        class="headline absolute top-[55%] sm:top-[70%] left-0 w-full flex justify-center -translate-y-1/2 z-20 opacity-1">
        <img src="/hero/title.svg" class="w-[95%] max-w-none select-none pointer-events-none headline-mask"
          alt="Жилой квартал Пипл">
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from 'gsap'

const NUM = 6
let SPEED = 0.75
const MAX_W = 35
const MIN_W = 0

const imgRefs = ref<(HTMLElement | null)[]>(Array(NUM).fill(null))
const headline = ref<HTMLElement | null>(null)

function setImage(el: Element | ComponentPublicInstance | null, idx: number) {
  imgRefs.value[idx] = (el as HTMLElement) || null
}

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
function dynamicWidth(center: number) {
  const d = Math.abs(center - 50)
  const t = clamp(1 - d / 50, 0, 1)
  return MIN_W + (MAX_W - MIN_W) * Math.pow(Math.sin(t * Math.PI * 0.5), 1.5)
}

let groupX = 0
const widths = Array(NUM).fill(MIN_W)
let frozen = false
let headlineMasked = false
let animationProgress = 0

onMounted(async () => {
  document.body.style.overflowY = 'hidden'
  await nextTick()

  const screenW = window.innerWidth
  SPEED = screenW > 1440 ? 0.4 : screenW > 1024 ? 0.6 : 0.75

  const setters = imgRefs.value.map((el) => {
    if (!el) return { setClip: () => { } }
    return {
      setClip: (left: number, width: number) => {
        const right = 100 - (left + width)
        el.style.clipPath = `inset(0 ${right}vw 0 ${left}vw)`
      },
    }
  })

  if (headline.value) {
    const maskImg = headline.value.querySelector('.headline-mask') as HTMLElement | null
    if (maskImg) {
      maskImg.style.clipPath = "inset(0 100% 0 0)"
    }
  }

  const update = (delta = 1) => {
    animationProgress = clamp(animationProgress + delta * 0.01, 0, 1)
    const dx = SPEED * delta * animationProgress

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
      setters[i].setClip(left, width)
      curX += widths[i]
    }

    if (frozen && !headlineMasked && headline.value) {
      headlineMasked = true
      const maskImg = headline.value.querySelector('.headline-mask') as HTMLElement | null
      if (maskImg) {
        gsap.to(maskImg, {
          clipPath: "inset(0 0% 0 0)",
          duration: 1,
          ease: "power2.out"
        })
      }
    }
  }

  gsap.ticker.add(update)

  onBeforeUnmount(() => {
    gsap.ticker.remove(update)
    document.body.style.overflowY = 'auto'
  })
})
</script>

<style scoped>
.headline {
  will-change: transform, opacity;
}

.headline-mask {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 1s cubic-bezier(0.33, 1, 0.68, 1);
  will-change: clip-path;
}
</style>
