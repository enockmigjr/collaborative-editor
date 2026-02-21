import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { UserCard } from './UserCard'

describe('UserCard Component', () => {
  it('renders without crashing', () => {
    const dummyUser = { id: '1', name: 'Moi', color: '#000', avatar: '', isLocal: true }
    const { container } = render(<UserCard user={dummyUser} />)
    expect(container).toBeDefined()
  })
})
