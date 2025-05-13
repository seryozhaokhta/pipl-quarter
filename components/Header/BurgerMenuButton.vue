<template>
  <div class="relative sm:static">

    <button class="w-10 h-[24px] relative z-50" aria-label="Меню" @mouseenter="animateLines" @click="toggleMenu">
      <span ref="lineTop" class="line"><span class="bar" /></span>
      <span ref="lineBottom" class="line"><span class="bar" /></span>
    </button>

    <div ref="menu"
      class="fixed top-0 right-0 h-full w-[260px] bg-white text-black flex flex-col gap-6 pt-[80px] pr-6 pl-6 pb-10 z-40 shadow-xl sm:hidden"
      style="transform: translateX(100%)">
      <CallToActionButton label="Заказать звонок" />
      <SelectApartmentButton label="Выбрать квартиру" />
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import CallToActionButton from '~/components/Header/CallToActionButton.vue'
import SelectApartmentButton from '~/components/Header/SelectApartmentButton.vue'

const isOpen = ref(false)
const lineTop = ref<HTMLElement | null>(null)
const lineBottom = ref<HTMLElement | null>(null)
const menu = ref<HTMLElement | null>(null)

function animateLines() {
  if (isOpen.value) return

  const lines = [lineTop.value, lineBottom.value]
  lines.forEach((el, i) => {
    const bar = el?.querySelector('.bar') as HTMLElement | null
    if (!bar) return

    gsap.fromTo(
      bar,
      { width: '40px', right: '0px' },
      {
        width: '0px',
        duration: 0.35,
        delay: i * 0.08,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.set(bar, { right: 'auto', left: '0px', width: '0px' })
          gsap.to(bar, {
            width: '40px',
            duration: 0.4,
            ease: 'power3.inOut',
            onComplete: () => {
              gsap.set(bar, { right: '0px', left: 'auto' })
            },
          })
        },
      }
    )
  })
}

function toggleMenu() {
  isOpen.value = !isOpen.value

  const bars = [
    lineTop.value?.querySelector('.bar'),
    lineBottom.value?.querySelector('.bar'),
  ]

  if (!lineTop.value || !lineBottom.value || !menu.value) return

  if (isOpen.value) {
    gsap.to(lineTop.value, { rotation: 45, y: 6, transformOrigin: 'center', duration: 0.3 })
    gsap.to(lineBottom.value, { rotation: -45, y: -6, transformOrigin: 'center', duration: 0.3 })

    if (window.innerWidth < 640) {
      bars.forEach(bar => bar?.classList.add('dark'))
    }

    gsap.to(menu.value, {
      x: 0,
      duration: 0.4,
      ease: 'power2.out',
    })
  } else {
    gsap.to(lineTop.value, { rotation: 0, y: 0, duration: 0.3 })
    gsap.to(lineBottom.value, { rotation: 0, y: 0, duration: 0.3 })

    bars.forEach(bar => bar?.classList.remove('dark'))

    gsap.to(menu.value, {
      x: '100%',
      duration: 0.4,
      ease: 'power2.in',
    })
  }
}
</script>

<style scoped>
.line {
  position: absolute;
  left: 0;
  width: 40px;
  height: 1px;
  background-color: transparent;
  transform-origin: center;
}

.line:nth-of-type(1) {
  top: 5px;
}

.line:nth-of-type(2) {
  bottom: 5px;
}

.bar {
  position: absolute;
  right: 0;
  top: 0;
  height: 1px;
  width: 40px;
  background-color: white;
  transition: background-color 0.3s ease;
  pointer-events: none;
}

.bar.dark {
  background-color: #282525;
}
</style>
