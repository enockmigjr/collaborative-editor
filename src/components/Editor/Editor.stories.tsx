import type { Meta, StoryObj } from '@storybook/react'
import { Editor } from './Editor'

const meta = {
  title: 'Components/Editor',
  component: Editor,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Editor>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ height: '500px', display: 'flex', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
}
