import { createConfigForNuxt } from '@nuxt/eslint-config'

export default createConfigForNuxt({
    rules: {
        'vue/require-direct-export': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
    },
})
    .append({
        files: ['**/*.vue'],
        rules: {
            'vue/first-attribute-linebreak': 'off',
        },
    })
