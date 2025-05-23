import * as React from 'react'
import { cn } from '~/lib/utils'

type LabelProps = React.HTMLProps<HTMLLabelElement>
const Label = ({ className, ref, ...props }: LabelProps) => (
  <label
    ref={ref}
    className={cn(
      'text-sm leading-none text-muted-fg peer-disabled:cursor-not-allowed peer-disabled:opacity-70 after:opacity-75 data-[required]:after:content-["_*"]',
      className,
    )}
    {...props}
  />
)

namespace Label {
  export type Props = LabelProps
  export type Ref = HTMLLabelElement
}

export { Label }
