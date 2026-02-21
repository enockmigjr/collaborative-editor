import { useConnectionStore } from '@/store/useConnectionStore'

export const useNetworkSim = () => {
  const latencyMs = useConnectionStore((state) => state.latencyMs)
  const status = useConnectionStore((state) => state.status)

  return { latencyMs, status }
}
