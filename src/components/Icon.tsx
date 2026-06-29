import { icons, type IconName } from '@/lib/icons'

export interface IconProps {
  name: IconName
  size?: number
  className?: string
  strokeWidth?: number
  fill?: string
  'aria-hidden'?: boolean
  'aria-label'?: string
}

export function Icon({ name, size = 20, strokeWidth = 2, ...props }: IconProps) {
  const LucideIcon = icons[name]
  return <LucideIcon size={size} strokeWidth={strokeWidth} aria-hidden {...props} />
}
