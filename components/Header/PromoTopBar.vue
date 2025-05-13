<template>
  <div v-if="visible" ref="bar"
    class="fixed top-0 left-0 w-full bg-[#F1F1ED] text-black h-[42px] flex items-center z-40 border-b overflow-hidden px-[20px] sm:px-[32px] md:px-[40px]">

    <div class="flex items-center w-full md:hidden">
      <UiBadge class="text-[10px] sm:text-[11px] font-normal">Акция</UiBadge>
      <div class="flex-1 flex justify-center">
        <span class="text-[12px] sm:text-[13px] font-normal relative link-wrapper mr-[30px]" @mouseenter="underlineIn"
          @mouseleave="underlineOut">
          Квартиры месяца со скидкой -30%
          <span ref="underlineBar" class="underline-bar" />
        </span>
      </div>
    </div>

    <div class="hidden md:flex items-center gap-[20px] leading-none justify-center w-full">
      <UiBadge class="text-[10px] sm:text-[11px] md:text-[12px] font-normal">Акция</UiBadge>
      <span class="text-[12px] sm:text-[13px] md:text-[14px] font-normal relative link-wrapper"
        @mouseenter="underlineIn" @mouseleave="underlineOut">
        Квартиры месяца со скидкой -30%
        <span ref="underlineBar" class="underline-bar" />
      </span>
    </div>

    <button aria-label="Закрыть"
      class="absolute right-[20px] sm:right-[32px] md:right-[40px] top-1/2 -translate-y-1/2 w-[22px] h-[22px] flex items-center justify-center text-gray-500 hover:text-black"
      @click="closeBar" @mouseenter="icon?.hoverIn()" @mouseleave="icon?.hoverOut()">
      <IconClose ref="icon" />
    </button>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import UiBadge from "~/components/ui/UiBadge.vue";
import IconClose from "~/components/Icons/IconClose.vue";

const visible = ref(true);
const bar = ref<HTMLElement | null>(null);
const icon = ref();

function closeBar() {
  if (!bar.value) return;
  gsap.to(bar.value, {
    height: 0,
    y: -20,
    paddingTop: 0,
    paddingBottom: 0,
    duration: 0.45,
    ease: "power2.inOut",
    onComplete: () => {
      visible.value = false;
    },
  });
}

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
  background-color: black;
  transform: scaleX(0);
  transform-origin: left;
  pointer-events: none;
}
</style>