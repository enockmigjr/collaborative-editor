import { useEffect, useRef } from 'react'
import { EditorView } from '@codemirror/view'
import { createEditorState } from '@/lib/codemirrorSetup'
import { LatencyBadge } from './LatencyBadge'

export function Editor() {
  const editorRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)

  useEffect(() => {
    if (!editorRef.current) return

    const state = createEditorState()

    const view = new EditorView({
      state,
      parent: editorRef.current,
    })

    viewRef.current = view

    return () => {
      view.destroy()
      viewRef.current = null
    }
  }, []) // les dépendances vides : configuration unique

  return (
    <div className="relative flex-1 h-full overflow-hidden bg-vercel-black">
      {/* Le badge de latence */}
      <LatencyBadge />

      {/* Le conteneur CodeMirror */}
      <div ref={editorRef} className="w-full h-full text-base" style={{ fontSize: '14px' }} />
    </div>
  )
}
