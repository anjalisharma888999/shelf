import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/vue3-vite'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ['../components/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: '@storybook/vue3-vite',
  async viteFinal(config) {
    config.resolve ??= {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '~': path.resolve(dirname, '..'),
      '@': path.resolve(dirname, '..'),
    }
    return config
  },
}

export default config
