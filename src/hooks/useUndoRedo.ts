import { useEffect, useState } from 'react'
import { undoManager } from '@/lib/yjsSetup'

export const useUndoRedo = () => {
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)

  useEffect(() => {
    const updateState = () => {
      setCanUndo(undoManager.undoStack.length > 0)
      setCanRedo(undoManager.redoStack.length > 0)
    }

    // Initialiser le check
    updateState()

    // Écouter les changements
    undoManager.on('stack-item-added', updateState)
    undoManager.on('stack-item-popped', updateState)

    return () => {
      undoManager.off('stack-item-added', updateState)
      undoManager.off('stack-item-popped', updateState)
    }
  }, [])

  const undo = () => {
    if (canUndo) undoManager.undo()
  }

  const redo = () => {
    if (canRedo) undoManager.redo()
  }

  return { canUndo, canRedo, undo, redo }
}
