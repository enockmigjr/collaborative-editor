import type { Meta, StoryObj } from '@storybook/react'
import { RightPanel } from './RightPanel'

// Utilisateur factice
const dummyUser = { id: '1', name: 'Moi', color: '#000', avatar: '', isLocal: true }

const meta: Meta<typeof RightPanel> = {
  component: RightPanel,
  title: 'RightPanel/RightPanel',
  parameters: { layout: 'centered' }
}
export default meta

type Story = StoryObj<typeof RightPanel>

export const Default: Story = {
  args: {
    currentUser: dummyUser
  }
}
