<template>
  <div class="relative">
    <PromoTopBar />
    <AppHeader />
    <AnimatedIntro />
    <BottomFilterBar />
    <FloatingCallButton />
  </div>
</template>

<script setup lang="ts">
import PromoTopBar from "~/components/Header/PromoTopBar.vue";
import AppHeader from "~/components/Header/AppHeader.vue";
import AnimatedIntro from "~/components/AnimatedIntro.vue";
import BottomFilterBar from "~/components/FilterBar/BottomFilterBar.vue";
import FloatingCallButton from "~/components/FloatingCallButton.vue";
</script>
