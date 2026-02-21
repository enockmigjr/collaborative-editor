import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { DocumentTitle } from './DocumentTitle'

describe('DocumentTitle Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<DocumentTitle />)
    expect(container).toBeDefined()
  })
})
