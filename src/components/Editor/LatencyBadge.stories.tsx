import type { Meta, StoryObj } from '@storybook/react'
import { LatencyBadge } from './LatencyBadge'

const meta: Meta<typeof LatencyBadge> = {
  component: LatencyBadge,
  title: 'Editor/LatencyBadge',
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof LatencyBadge>
export const Default: Story = {}
