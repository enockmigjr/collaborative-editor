import { ActivityLog } from './ActivityLog'
import { Chat } from './Chat'
import { useUIStore } from '@/store/useUIStore'
import clsx from 'clsx'
import type { User } from '@/types'

export function RightPanel({ currentUser }: { currentUser: User }) {
  const { activeTab, setActiveTab } = useUIStore()

  return (
    <aside className="w-full lg:w-72 border-t lg:border-t-0 lg:border-l border-vercel-border bg-vercel-black flex-col shrink-0 flex h-full">
      <div className="flex items-center border-b border-vercel-border h-11 shrink-0">
        <button
          onClick={() => setActiveTab('journal')}
          className={clsx(
            'flex-1 h-full text-xs font-semibold uppercase tracking-wider transition-colors border-b-2',
            activeTab === 'journal'
              ? 'text-vercel-text border-vercel-text'
              : 'text-vercel-muted border-transparent hover:text-vercel-text hover:bg-vercel-gray-light/50'
          )}
        >
          Journal
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={clsx(
            'flex-1 h-full text-xs font-semibold uppercase tracking-wider transition-colors border-b-2',
            activeTab === 'chat'
              ? 'text-vercel-text border-vercel-text'
              : 'text-vercel-muted border-transparent hover:text-vercel-text hover:bg-vercel-gray-light/50'
          )}
        >
          Chat
        </button>
      </div>
      {activeTab === 'journal' ? <ActivityLog /> : <Chat currentUser={currentUser} />}
    </aside>
  )
}
