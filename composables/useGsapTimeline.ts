import gsap from 'gsap'
import { onUnmounted } from 'vue'

export function useGsapTimeline(config: gsap.TimelineVars = {}) {
    const tl = gsap.timeline({ paused: true, ...config })
    onUnmounted(() => tl.kill())
    return tl
}