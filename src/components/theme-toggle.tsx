'use client'

import * as React from 'react'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Switch } from '~/components/ui/switch'

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = React.useState(false)

  React.useLayoutEffect(() => {
    if (!resolvedTheme) return
    setIsDarkMode(resolvedTheme === 'dark')
  }, [resolvedTheme])

  const toggleTheme = React.useCallback(
    (state: boolean) => setTheme(state ? 'dark' : 'light'),
    [setTheme],
  )

  return (
    <div>
      <div className="relative inline-grid h-7 grid-cols-[1fr_1fr] items-center text-sm font-medium">
        <Switch
          checked={isDarkMode}
          onCheckedChange={toggleTheme}
          className="peer absolute inset-0 -inset-x-px h-[inherit] w-auto border border-border [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:border [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full"
        />
        <span className="pointer-events-none relative ms-0.5 flex min-w-6 items-center justify-center text-center text-muted-fg transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full peer-data-[state=unchecked]:rtl:-translate-x-full">
          <MoonIcon size={16} aria-hidden="true" />
        </span>
        <span className="pointer-events-none relative me-0.5 flex min-w-6 items-center justify-center text-center text-muted-fg transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:-translate-x-full peer-data-[state=checked]:text-background peer-data-[state=unchecked]:invisible peer-data-[state=checked]:rtl:translate-x-full">
          <SunIcon size={16} aria-hidden="true" />
        </span>
      </div>
      <span className="sr-only">Labeled switch</span>
    </div>
  )
}

export { ThemeToggle }
