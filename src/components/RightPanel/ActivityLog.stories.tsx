import type { Meta, StoryObj } from '@storybook/react'
import { ActivityLog } from './ActivityLog'

const meta = {
  title: 'Components/RightPanel/ActivityLog',
  component: ActivityLog,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ActivityLog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '300px', height: '500px', border: '1px solid #333' }}>
        <Story />
      </div>
    ),
  ],
}
