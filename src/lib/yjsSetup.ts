import * as Y from 'yjs'
import { Awareness } from 'y-protocols/awareness'

export const localDoc = new Y.Doc()
export const sharedDoc = new Y.Doc()
export const awareness = new Awareness(localDoc)
export const undoManager = new Y.UndoManager(localDoc.getText('codemirror'), {
  trackedOrigins: new Set([null]),
})
