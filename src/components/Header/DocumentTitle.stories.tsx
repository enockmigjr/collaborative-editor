import type { Meta, StoryObj } from '@storybook/react'
import { DocumentTitle } from './DocumentTitle'

const meta: Meta<typeof DocumentTitle> = {
  component: DocumentTitle,
  title: 'Header/DocumentTitle',
  parameters: {
    layout: 'centered',
  }
}
export default meta

type Story = StoryObj<typeof DocumentTitle>
export const Default: Story = {}
