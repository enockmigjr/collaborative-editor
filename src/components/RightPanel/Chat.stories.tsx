import type { Meta, StoryObj } from '@storybook/react'
import { Chat } from './Chat'

const meta = {
  title: 'Components/RightPanel/Chat',
  component: Chat,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Chat>

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
      <div style={{ width: '300px', height: '500px', border: '1px solid #333' }}>
        <Story />
      </div>
    ),
  ],
}
