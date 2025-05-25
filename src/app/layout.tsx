import { ThemeProvider } from 'next-themes'
import { cn } from '~/lib/utils'
import { code, sans } from '~/styles/fonts'
import '~/styles/globals.css'

export { metadata, viewport } from './metadata'

export default function RootLayout({ children }: Props) {
  const fontVariables = [sans.className, sans.variable, code.variable]
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body className={cn(fontVariables, 'flex min-h-svh antialiased')}>
        <ThemeProvider defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
