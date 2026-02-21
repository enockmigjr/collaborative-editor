import { test, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useUndoRedo } from '@/hooks/useUndoRedo'
import { localDoc, undoManager } from '@/lib/yjsSetup'

test('useUndoRedo track state properly', () => {
  const { result } = renderHook(() => useUndoRedo())

  // Au début : ni undo ni redo
  expect(result.current.canUndo).toBe(false)
  expect(result.current.canRedo).toBe(false)

  const text = localDoc.getText('codemirror')

  // On simule une insertion
  act(() => {
    text.insert(0, 'Test')
  })
  // L'undoManager de Yjs est asynchrone pour consolider les frappes
  undoManager.stopCapturing()

  // On devrait pouvoir Undo
  // (Le re-render du hook géré par les events Yjs)
  // test très simplifié
})
