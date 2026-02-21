import { useState, useEffect, useRef, memo } from 'react'
import { sharedDoc } from '@/lib/yjsSetup'
import { useNetworkSim } from '@/hooks/useNetworkSim'
import type { User } from '@/types'

type ChatMessage = { id: string; text: string; user: string; time: string }

const ChatItem = memo(
  ({ message }: { message: ChatMessage }) => {
    return (
      <div className="flex flex-col">
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-sm text-vercel-text">
            <span translate="no">{message.user}</span>
          </span>
          <span className="text-xs text-vercel-muted">{message.time}</span>
        </div>
        <div className="text-sm bg-vercel-gray-light p-2 rounded-md mt-1 self-start max-w-[90%] wrap-break-word">
          {message.text}
        </div>
      </div>
    )
  },
  (prev, next) => prev.message.id === next.message.id
)
ChatItem.displayName = 'ChatItem'

export function Chat({ currentUser }: { currentUser: User }) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const { status } = useNetworkSim()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ychat = sharedDoc.getArray<ChatMessage>('chat')
    const updateMessages = () => {
      setMessages(ychat.toArray())
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    updateMessages()
    ychat.observe(updateMessages)
    return () => ychat.unobserve(updateMessages)
  }, [])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || status === 'disconnected') return

    const ychat = sharedDoc.getArray<ChatMessage>('chat')
    ychat.push([
      {
        id: Math.random().toString(),
        text: input.trim(),
        user: currentUser.name,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      },
    ])
    setInput('')
  }

  return (
    <div className="flex flex-col h-full overflow-hidden min-h-0">
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin min-h-0">
        {messages.length === 0 ? (
          <div className="text-center text-sm text-vercel-muted mt-10">Aucun message.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {messages.map((m) => (
              <ChatItem key={m.id} message={m} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      <form onSubmit={handleSend} className="p-3 border-t border-vercel-border flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Envoyer un message..."
          disabled={status === 'disconnected'}
          className="flex-1 bg-vercel-gray border border-vercel-border rounded-md px-3 py-2 text-sm text-vercel-text focus:outline-none focus:border-vercel-accent transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || status === 'disconnected'}
          className="bg-vercel-accent text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          Envoyer
        </button>
      </form>
    </div>
  )
}
