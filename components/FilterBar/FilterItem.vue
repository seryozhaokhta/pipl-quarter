<template>
    <div class="flex flex-col gap-1 px-4 py-3 md:px-8 md:border-r border-[#28252529]">
        <label class="text-xs md:text-sm text-[#282525A6]">{{ label }}</label>
        <Select v-model="internalValue" class="w-full">
            <SelectTrigger class="w-full bg-transparent p-0 text-lg md:text-2xl outline-none">
                <SelectValue placeholder="Выбрать..." />
            </SelectTrigger>
            <SelectContent>
                <SelectItem v-for="option in options" :key="option.value" :value="option.value" class="cursor-pointer">
                    {{ option.label }}
                </SelectItem>
            </SelectContent>
        </Select>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    label: string;
    options: { label: string; value: string }[];
    modelValue: string;
}>();
const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const internalValue = ref(props.modelValue ?? '');

watch(
    () => props.modelValue,
    v => {
        internalValue.value = v;
    }
);
watch(
    internalValue,
    v => emit('update:modelValue', v)
);
</script>