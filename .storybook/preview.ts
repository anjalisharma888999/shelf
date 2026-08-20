import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { defineComponent, h } from 'vue'
import '../assets/css/main.css'

setup((app) => {
  app.component(
    'NuxtLink',
    defineComponent({
      name: 'NuxtLink',
      props: {
        to: {
          type: [String, Object],
          required: true,
        },
      },
      setup(props, { slots }) {
        return () =>
          h(
            'a',
            { href: typeof props.to === 'string' ? props.to : '#' },
            slots.default?.(),
          )
      },
    }),
  )
})

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
}

export default preview
