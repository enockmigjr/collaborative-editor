import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { ConnectionStatus } from './ConnectionStatus'

describe('ConnectionStatus Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<ConnectionStatus />)
    expect(container).toBeDefined()
  })
})
