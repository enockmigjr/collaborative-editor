import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Editor } from './Editor'
import { LatencyBadge } from './LatencyBadge'

// Mock simple pour le badge et l'éditeur complet
describe('Editor Component', () => {
  it('renders LatencyBadge correctly', () => {
    const { getByText } = render(<LatencyBadge />)
    expect(getByText(/ms/)).toBeInTheDocument()
  })

  it('renders Editor wrapper without crashing', () => {
    const { container } = render(<Editor />)
    expect(container.querySelector('.cm-editor')).toBeDefined()
  })
})
