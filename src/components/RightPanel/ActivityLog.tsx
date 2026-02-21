import { useLogsStore } from '@/store/useLogsStore'
import { format } from 'date-fns'
import { memo } from 'react'
import type { LogEntry } from '@/types'

const LogItem = memo(({ log }: { log: LogEntry }) => {
  return (
    <div className="flex gap-3 text-sm">
      <div className="text-vercel-muted text-xs shrink-0 pt-0.5 w-12 truncate">
        {format(log.timestamp, 'HH:mm:ss')}
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: log.userColor }}
          />
          <span className="font-semibold text-vercel-text">
            <span translate="no">{log.userName}</span>
          </span>
        </div>
        <div className="text-vercel-muted mt-0.5 wrap-break-word">{log.details}</div>
      </div>
    </div>
  )
})
LogItem.displayName = 'LogItem'

export function ActivityLog() {
  const logs = useLogsStore((state) => state.logs)

  return (
    <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
      {logs.length === 0 ? (
        <div className="text-center text-sm text-vercel-muted mt-10">Aucune activité récente.</div>
      ) : (
        <div className="flex flex-col gap-3">
          {logs.map((log) => (
            <LogItem key={log.id} log={log} />
          ))}
        </div>
      )}
    </div>
  )
}
