<template>
    <div class="flex flex-col gap-1 px-4 py-3 md:px-8 md:border-r border-[#28252529]">
        <label class="text-xs md:text-sm text-[#282525A6]">{{ label }}</label>

        <Select v-model="model" class="w-full">
            <SelectTrigger class="w-full bg-transparent p-0 text-lg md:text-2xl outline-none">
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                <SelectItem v-for="opt in options" :key="opt" :value="opt" class="cursor-pointer">
                    {{ opt }}
                </SelectItem>
            </SelectContent>
        </Select>
    </div>
</template>

<script setup lang="ts">

defineProps<{ label: string; options: string[] }>()
const model = defineModel<string>()
</script>
