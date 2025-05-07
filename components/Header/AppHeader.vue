<template>
  <header
    class="absolute top-[57px] left-0 w-full z-30 flex justify-between items-center px-[16px] sm:px-[32px] md:px-[40px] py-[12px]">

    <LogoMark class="w-[56px] sm:w-[65px] md:w-[75.5px] h-auto" />

    <div class="flex items-center">
      <div class="hidden sm:flex items-center gap-[12px] sm:gap-[16px] md:gap-[20px]">
        <CallToActionButton label="Заказать звонок" />
        <SelectApartmentButton label="Выбрать квартиру" />
      </div>
      <div class="ml-[0px] sm:ml-[24px] md:ml-[32px]">
        <BurgerMenuButton />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import LogoMark from "~/components/Header/LogoMark.vue";
import CallToActionButton from "~/components/Header/CallToActionButton.vue";
import SelectApartmentButton from "~/components/Header/SelectApartmentButton.vue";
import BurgerMenuButton from "~/components/Header/BurgerMenuButton.vue";
</script>
