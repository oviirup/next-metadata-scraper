import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '~/lib/utils'
import { Tooltip } from './tooltip'
import type { VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap focus-ring transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  // prettier-ignore
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-fg hover:bg-primary/90',
        destructive: 'text-destructive-fg bg-destructive hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-fg',
        secondary: 'bg-secondary text-secondary-fg hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-fg',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> &
  React.RefAttributes<HTMLButtonElement> & {
    icon?: boolean
    tooltip?: string
    tooltipPosition?: 'top' | 'bottom' | 'left' | 'right'
    tooltipOffset?: number
    asChild?: boolean
  }

function Button({
  icon,
  variant,
  size,
  asChild = false,
  tooltip,
  tooltipPosition,
  tooltipOffset,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  props.type ??= 'button'
  props.className = cn(
    buttonVariants({ variant, size }),
    icon ? 'aspect-square p-0' : undefined,
    props.className,
  )

  return tooltip ? (
    <Tooltip delayDuration={100}>
      <Tooltip.Trigger asChild>
        <Comp {...props} />
      </Tooltip.Trigger>
      <Tooltip.Content side={tooltipPosition} sideOffset={tooltipOffset}>
        {tooltip}
      </Tooltip.Content>
    </Tooltip>
  ) : (
    <Comp {...props} />
  )
}

namespace Button {
  export type Props = ButtonProps
}

export { Button, buttonVariants }
