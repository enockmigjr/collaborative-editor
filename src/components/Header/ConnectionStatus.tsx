import { useNetworkSim } from '@/hooks/useNetworkSim'
import { Wifi, WifiOff, Loader2 } from 'lucide-react'

export function ConnectionStatus() {
  const { status, latencyMs } = useNetworkSim()

  return (
    <div className="flex items-center gap-2 text-sm">
      {status === 'connected' && <Wifi className="w-4 h-4 text-green-500" />}
      {status === 'disconnected' && <WifiOff className="w-4 h-4 text-red-500" />}
      {status === 'syncing' && <Loader2 className="w-4 h-4 text-vercel-accent animate-spin" />}

      <span className="text-vercel-muted capitalize hidden sm:inline">{status}</span>
      {status === 'connected' && (
        <span className="text-xs text-vercel-muted hidden sm:inline">(<span translate="no">{latencyMs}</span>ms)</span>
      )}
    </div>
  )
}
