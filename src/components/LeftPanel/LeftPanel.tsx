import { useState, useEffect } from 'react'
import { awareness } from '@/lib/yjsSetup'
import type { User } from '@/types'
import { UserCard } from './UserCard'
export function LeftPanel() {
  const [activeUsers, setActiveUsers] = useState<User[]>([])

  useEffect(() => {
    const updateUsers = () => {
      const states = Array.from(awareness.getStates().values())
      const users = states.map((state) => state.user as User).filter(Boolean)
      
      setActiveUsers((prev) => {
        if (prev.length !== users.length) return users
        const isSame = prev.every((p, i) => p.id === users[i].id)
        return isSame ? prev : users
      })
    }

    updateUsers()
    awareness.on('update', updateUsers)
    return () => awareness.off('update', updateUsers)
  }, [])

  return (
    <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-vercel-border bg-vercel-black flex-col shrink-0 flex h-full">
      <div className="px-4 py-3 border-b border-vercel-border shrink-0">
        <h2 className="text-xs font-semibold text-vercel-muted uppercase tracking-wider">
          Utilisateurs Actifs (<span translate="no">{activeUsers.length}</span>)
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
        <div className="flex flex-col gap-1">
          {activeUsers.map((user) => (
            <UserCard 
              key={user.id} 
              user={user} 
            />
          ))}
        </div>
      </div>
    </aside>
  )
}
