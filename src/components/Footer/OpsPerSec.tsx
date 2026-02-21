import { useEffect, useState } from 'react'
import { useLogsStore } from '@/store/useLogsStore'

export function OpsPerSec() {
  const [opsPerSec, setOpsPerSec] = useState(0)
  
  useEffect(() => {
    let lastOps = useLogsStore.getState().totalOps
    const interval = setInterval(() => {
      const currentOps = useLogsStore.getState().totalOps
      setOpsPerSec(currentOps - lastOps)
      lastOps = currentOps
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="hidden md:inline">
      ops/sec: <span translate="no">{opsPerSec}</span>
    </span>
  )
}
