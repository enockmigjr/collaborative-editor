import { useNetworkSim } from '@/hooks/useNetworkSim'

export function SystemStatus() {
  const { status, latencyMs } = useNetworkSim()
  return (
    <>
      <span>
        sys.status: <span translate="no">{status}</span>
      </span>
      <span className="hidden sm:inline">
        sys.latency: <span translate="no">{latencyMs}</span>ms
      </span>
    </>
  )
}
