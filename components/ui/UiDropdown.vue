<template>
    <div>
        <label v-if="label" class="block mb-1 text-xs md:text-sm text-[#282525A6]">{{ label }}</label>
        <Select :model-value="modelValue" class="w-full" @update:model-value="handleUpdate">
            <SelectTrigger class="w-full bg-transparent p-0 text-lg md:text-2xl outline-none">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem v-for="option in options" :key="option" :value="option" class="cursor-pointer">
                    {{ option }}
                </SelectItem>
            </SelectContent>
        </Select>
    </div>
</template>

<script setup lang="ts">
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '~/components/ui/select'

const props = defineProps<{
    label?: string
    options: (string | number)[]
    modelValue: string | number
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void
}>()

function handleUpdate(value: unknown) {
    if (typeof value === 'string' || typeof value === 'number') {
        emit('update:modelValue', value)
    } else if (value === null) {
        emit('update:modelValue', props.options[0] ?? '')
    }
    // Если value оказался объектом — просто fallback, эмитим первый элемент
    else if (typeof value === 'object' && value !== null) {
        emit('update:modelValue', props.options[0] ?? '')
    }
}
</script>
