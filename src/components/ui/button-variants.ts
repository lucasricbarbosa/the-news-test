import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground border border-border hover:bg-muted',
        ghost: 'text-muted-foreground hover:bg-muted',
        outlineDanger: 'border-2 border-destructive text-destructive bg-transparent hover:bg-destructive/10',
      },
      size: {
        sm: 'h-9 px-3 text-body-sm rounded-input',
        md: 'h-11 px-4 text-body-sm rounded-input',
        lg: 'h-12 w-full px-5 text-body rounded-input',
        icon: 'h-11 w-11 rounded-pill',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)
