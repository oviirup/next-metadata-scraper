import * as React from 'react'
import { cn } from '~/lib/utils'

type InputProps = React.HTMLProps<HTMLInputElement>

function Input({ className, type = 'text', ref, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        'relative flex h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm leading-relaxed text-foreground focus-ring transition-[color,box-shadow] placeholder:text-muted-fg/60 user-invalid:border-destructive focus:z-1 focus-visible:z-10 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 not-focus-visible:aria-invalid:border-destructive',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}

namespace Input {
  export type Props = InputProps
  export type Ref = HTMLInputElement
}

export { Input }
