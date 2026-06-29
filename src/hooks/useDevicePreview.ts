import { useMemo, useState } from 'react'
import type { DeviceId } from '@/types'
import { DEVICES } from '@/lib/constants'

export function useDevicePreview(initial: DeviceId = 'phone') {
  const [device, setDevice] = useState<DeviceId>(initial)

  const preset = useMemo(() => DEVICES.find((d) => d.id === device) ?? DEVICES[1], [device])

  return { device, setDevice, preset }
}
