import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon, MinusIcon } from 'lucide-react'
import { cn } from '~/lib/utils'

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root>
function Checkbox({ className, ref, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        'size-5 shrink-0 cursor-pointer rounded border border-input leading-none focus-ring transition-[color,box-shadow] focus-visible:border-muted-fg disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-fg data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-fg',
        className,
      )}
      {...props}>
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        {props.checked === 'indeterminate' ? (
          <MinusIcon size={14} strokeWidth={2.5} aria-hidden="true" />
        ) : (
          <CheckIcon size={14} strokeWidth={2.5} aria-hidden="true" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

namespace Checkbox {
  export type Ref = React.ComponentRef<typeof CheckboxPrimitive.Root>
  export type Props = CheckboxProps
}

export { Checkbox }
