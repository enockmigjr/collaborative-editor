import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { ActivityLog } from './ActivityLog'

describe('ActivityLog Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<ActivityLog />)
    expect(container).toBeDefined()
  })
})
