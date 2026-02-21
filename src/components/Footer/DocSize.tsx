import { useEffect, useState } from 'react'
import { localDoc } from '@/lib/yjsSetup'

export function DocSize() {
  const [docSize, setDocSize] = useState(
    () => new Blob([localDoc.getText('codemirror').toString()]).size
  )

  useEffect(() => {
    let timeoutId: number | undefined

    const updateSize = () => {
      if (timeoutId === undefined) {
        timeoutId = window.setTimeout(() => {
          const text = localDoc.getText('codemirror').toString()
          setDocSize(new Blob([text]).size)
          timeoutId = undefined
        }, 1000)
      }
    }

    localDoc.on('update', updateSize)
    return () => {
      localDoc.off('update', updateSize)
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <span>
      doc.size: <span translate="no">{(docSize / 1024).toFixed(2)}</span> KB
    </span>
  )
}
