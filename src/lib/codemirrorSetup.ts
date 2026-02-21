import { basicSetup } from 'codemirror'
import { EditorState, Extension } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { yCollab } from 'y-codemirror.next'
import { localDoc, awareness, undoManager } from '@/lib/yjsSetup'

export const createEditorState = (extensions: Extension[] = []) => {
  const ytext = localDoc.getText('codemirror')

  return EditorState.create({
    doc: ytext.toString(),
    extensions: [
      basicSetup,
      EditorView.lineWrapping,
      yCollab(ytext, awareness, { undoManager }),
      ...extensions,
    ],
  })
}
