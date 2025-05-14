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
import Select from '~/components/ui/select/Select.vue'
import SelectTrigger from '~/components/ui/select/SelectTrigger.vue'
import SelectContent from '~/components/ui/select/SelectContent.vue'
import SelectItem from '~/components/ui/select/SelectItem.vue'
import SelectValue from '~/components/ui/select/SelectValue.vue'

defineProps<{ label: string; options: string[] }>()
const model = defineModel<string>()
</script>
