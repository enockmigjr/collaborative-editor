import { useUndoRedo } from '@/hooks/useUndoRedo'
import { Undo2, Redo2 } from 'lucide-react'

export function UndoRedo() {
  const { canUndo, canRedo, undo, redo } = useUndoRedo()

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={undo}
        disabled={!canUndo}
        aria-label="Undo"
        className="p-1.5 rounded-md text-vercel-muted hover:text-vercel-text hover:bg-vercel-gray-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Undo2 className="w-4 h-4" />
      </button>
      <button
        onClick={redo}
        disabled={!canRedo}
        aria-label="Redo"
        className="p-1.5 rounded-md text-vercel-muted hover:text-vercel-text hover:bg-vercel-gray-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Redo2 className="w-4 h-4" />
      </button>
    </div>
  )
}
