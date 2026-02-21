import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { LeftPanel } from './LeftPanel'

describe('LeftPanel Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<LeftPanel />)
    expect(container).toBeDefined()
  })
})
