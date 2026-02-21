import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Footer } from './Footer'

describe('Footer Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Footer />)
    expect(container).toBeDefined()
  })
})
