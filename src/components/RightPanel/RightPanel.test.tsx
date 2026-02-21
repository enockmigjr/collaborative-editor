import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { RightPanel } from './RightPanel'

describe('RightPanel Component', () => {
  it('renders without crashing', () => {
    const dummyUser = { id: '1', name: 'Moi', color: '#000', avatar: '', isLocal: true }
    const { container } = render(<RightPanel currentUser={dummyUser} />)
    expect(container).toBeDefined()
  })
})
