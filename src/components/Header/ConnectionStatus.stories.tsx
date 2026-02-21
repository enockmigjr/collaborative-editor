import type { Meta, StoryObj } from '@storybook/react'
import { ConnectionStatus } from './ConnectionStatus'

const meta: Meta<typeof ConnectionStatus> = {
  component: ConnectionStatus,
  title: 'Header/ConnectionStatus',
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof ConnectionStatus>
export const Default: Story = {}
