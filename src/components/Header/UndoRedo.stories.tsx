import type { Meta, StoryObj } from '@storybook/react'
import { UndoRedo } from './UndoRedo'

const meta: Meta<typeof UndoRedo> = {
  component: UndoRedo,
  title: 'Header/UndoRedo',
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof UndoRedo>
export const Default: Story = {}
