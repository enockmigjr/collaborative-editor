import { DocumentTitle } from './DocumentTitle'
import { ConnectionStatus } from './ConnectionStatus'
import { UndoRedo } from './UndoRedo'
import { useUIStore } from '@/store/useUIStore'
import { Moon, Sun } from 'lucide-react'

export function Header() {
  const { isDarkMode, toggleDarkMode } = useUIStore()

  return (
    <header className="flex items-center justify-between px-4 h-14 border-b border-vercel-border bg-vercel-black shrink-0">
      <DocumentTitle />
      <div className="flex items-center gap-4">
        <ConnectionStatus />
        <UndoRedo />
        <button
          onClick={toggleDarkMode}
          className="p-1.5 text-vercel-muted hover:text-vercel-text hover:bg-vercel-gray-light rounded-md transition-colors"
          title={isDarkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  )
}
