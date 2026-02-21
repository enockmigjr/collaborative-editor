import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Header } from './Header'

describe('Header Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Header />)
    expect(container).toBeDefined()
  })
})
