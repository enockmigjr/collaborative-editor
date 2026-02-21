import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { UndoRedo } from './UndoRedo'

describe('UndoRedo Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<UndoRedo />)
    expect(container).toBeDefined()
  })
})
