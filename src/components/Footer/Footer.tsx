import { SystemStatus } from './SystemStatus'
import { OpsPerSec } from './OpsPerSec'
import { DocSize } from './DocSize'

export function Footer() {
  return (
    <footer className="h-8 border-t border-vercel-border bg-vercel-black flex items-center justify-between px-4 shrink-0 text-xs font-mono text-vercel-muted">
      <div className="flex items-center gap-4">
        <SystemStatus />
        <OpsPerSec />
      </div>
      <div>
        <DocSize />
      </div>
    </footer>
  )
}
