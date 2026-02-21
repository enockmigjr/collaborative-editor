import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { LatencyBadge } from './LatencyBadge'

describe('LatencyBadge Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<LatencyBadge />)
    expect(container).toBeDefined()
  })
})
