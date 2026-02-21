import { memo, useEffect, useState } from 'react'
import type { User } from '@/types'
import { Pencil } from 'lucide-react'
import { useLogsStore } from '@/store/useLogsStore'
import { awareness } from '@/lib/yjsSetup'

interface UserCardProps {
  user: User
}

export const UserCard = memo(({ user }: UserCardProps) => {
  const opCount = useLogsStore((state) => state.userOps[user.id] || 0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const checkTyping = () => {
      const states = Array.from(awareness.getStates().values())
      const state = states.find((s) => s.user && s.user.id === user.id)
      setIsTyping(!!state?.isTyping)
    }

    checkTyping()
    awareness.on('update', checkTyping)
    return () => awareness.off('update', checkTyping)
  }, [user.id])
  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-vercel-gray-light transition-colors group">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full bg-vercel-gray border border-vercel-border"
          />
          <div
            className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-vercel-black"
            style={{ backgroundColor: user.color }}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-vercel-text">
            <span translate="no">{user.name}</span>{' '}
            {user.isLocal && <span className="text-vercel-muted text-xs font-normal">(Vous)</span>}
          </span>
          <span className="text-xs text-vercel-muted flex items-center gap-1">
            {isTyping ? (
              <span className="flex items-center gap-1 text-vercel-accent animate-pulse">
                <Pencil className="w-3 h-3" /> en train de taper...
              </span>
            ) : (
              'Actif'
            )}
          </span>
        </div>
      </div>
      <div className="text-xs text-vercel-muted hidden sm:block">
        <span translate="no">{opCount}</span> op(s)
      </div>
    </div>
  )
})
UserCard.displayName = 'UserCard'
