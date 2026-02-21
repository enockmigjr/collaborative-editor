import { useUIStore } from '@/store/useUIStore'
import { Code2, Users, MessageSquare } from 'lucide-react'
import clsx from 'clsx'

export function MobileNav() {
  const { activeMobileTab, setActiveMobileTab } = useUIStore()

  const tabs = [
    { id: 'users', label: 'Utilisateurs', icon: Users },
    { id: 'editor', label: 'Éditeur', icon: Code2 },
    { id: 'activity', label: 'Activité', icon: MessageSquare },
  ] as const

  return (
    <nav className="lg:hidden flex border-t border-vercel-border bg-vercel-black h-14 shrink-0 justify-around items-center px-1 pb-safe">
      {tabs.map((tab) => {
        const isActive = activeMobileTab === tab.id
        const Icon = tab.icon
        return (
          <button
            key={tab.id}
            onClick={() => setActiveMobileTab(tab.id)}
            className={clsx(
              'flex flex-col items-center justify-center w-full h-full gap-1 transition-colors',
              isActive
                ? 'text-vercel-text'
                : 'text-vercel-muted hover:text-vercel-text hover:bg-vercel-gray-light'
            )}
          >
            <Icon size={20} />
            <span className="text-[10px] font-medium tracking-wide">{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
