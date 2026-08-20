import type { Preview } from '@storybook/vue3'
import '../assets/css/main.css'

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    layout: 'padded',
  },
  decorators: [
    () => ({
      template: '<div style="max-width: 320px;"><story /></div>',
    }),
  ],
  setup(app) {
    app.component('NuxtLink', {
      props: {
        to: { type: [String, Object], required: true },
      },
      template: '<a :href="typeof to === \'string\' ? to : `#`"><slot /></a>',
    })
  },
}

export default preview
