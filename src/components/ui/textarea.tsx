import * as React from 'react'
import { cn } from '~/lib/utils'

type TextareaProps = React.ComponentProps<'textarea'> & { autoHeight?: boolean }

function Textarea({ className, autoHeight = false, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex w-full rounded-md border border-input bg-transparent px-3 py-[calc(var(--spacing)*2+1px)] text-sm leading-tight focus-ring transition-[color,box-shadow] placeholder:text-muted-fg/70 user-invalid:border-destructive focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 not-focus-visible:aria-invalid:border-destructive',
        autoHeight ? 'field-sizing-content resize-none' : 'min-h-20',
        className,
      )}
      {...props}
    />
  )
}
Textarea.displayName = 'Textarea'

namespace Textarea {
  export type Props = TextareaProps
}

export { Textarea }
