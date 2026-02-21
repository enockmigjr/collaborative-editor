import { useNetworkSim } from '@/hooks/useNetworkSim'

export function LatencyBadge() {
  const { latencyMs } = useNetworkSim()

  return (
    <div className="absolute top-4 right-4 z-10 pointer-events-none">
      <div className="px-2.5 py-1 text-xs font-mono rounded-full bg-vercel-gray border border-vercel-border text-vercel-muted shadow-lg">
        <span translate="no">{latencyMs}</span>ms
      </div>
    </div>
  )
}
