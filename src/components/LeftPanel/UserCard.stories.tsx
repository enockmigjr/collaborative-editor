import type { Meta, StoryObj } from '@storybook/react'
import { UserCard } from './UserCard'

const meta = {
  title: 'Components/UserCard',
  component: UserCard,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof UserCard>

export default meta
type Story = StoryObj<typeof meta>

const mockUser = {
  id: '1',
  name: 'John Doe',
  color: '#D946EF',
  avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
  isLocal: false,
}

export const Default: Story = {
  args: {
    user: mockUser,
  },
}


export const Local: Story = {
  args: {
    user: { ...mockUser, name: 'Moi', isLocal: true },
  },
}
