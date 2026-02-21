import { useState } from 'react'

export function DocumentTitle() {
  const [title, setTitle] = useState('Document Sans Titre')

  return (
    <input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="bg-transparent text-vercel-text font-semibold text-sm sm:text-base outline-none max-w-[120px] sm:max-w-xs truncate focus:border-b focus:border-vercel-border transition-colors h-8"
      placeholder="Nom du document"
    />
  )
}
