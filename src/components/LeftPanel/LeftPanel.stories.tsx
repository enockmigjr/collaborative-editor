import type { Meta, StoryObj } from '@storybook/react'
import { LeftPanel } from './LeftPanel'

const meta = {
  title: 'Components/LeftPanel',
  component: LeftPanel,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof LeftPanel>

export default meta
type Story = StoryObj<typeof meta>

const mockUser = {
  id: '1',
  name: 'John Doe',
  color: '#D946EF',
  avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
  isLocal: true,
}

export const Default: Story = {
  args: {
    currentUser: mockUser,
  },
  decorators: [
    (Story) => (
      <div style={{ height: '500px', display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
}
