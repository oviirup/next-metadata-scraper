'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { Icon } from '~/components/ui/icon'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Skeleton } from '~/components/ui/skeleton'

const zFormSchema = z.object({
  url: z.string().url('Invalid URL, please enter a valid URL'),
})
type FormSchema = z.infer<typeof zFormSchema>

export default function HomePage() {
  const form = useForm<FormSchema>({
    mode: 'onBlur',
    resolver: zodResolver(zFormSchema),
    defaultValues: { url: '' },
  })

  return (
    <main className="container mx-auto flex grow flex-col items-center justify-center gap-12">
      <hgroup className="text-center text-2xl md:text-3xl">
        <h1 className="font-bold">Metadata Toolkit</h1>
        <p className="max-w-sm text-[0.625em] text-balance text-muted-fg">
          Parse, preview, & generate metadata on serverless
        </p>
      </hgroup>

      <form className="w-full max-w-md" noValidate>
        <Label htmlFor="url" className="ml-1">
          Enter a URL
        </Label>
        <div className="mb-1 flex w-full items-center gap-2">
          <Input
            type="url"
            id="url"
            className="w-full pr-12"
            placeholder="https://example.com/"
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="off"
            {...form.register('url')}
          />
          <Button
            icon
            variant="default"
            className="top-0 right-0"
            type="submit"
            tabIndex={-1}>
            <span className="sr-only">Parse</span>
            <Icon name="arrow-right" size={18} />
          </Button>
        </div>
        <div>
          {form.formState.errors.url && (
            <p className="mx-1 text-sm text-destructive">
              {form.formState.errors.url.message}
            </p>
          )}
        </div>
      </form>

      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="flex-1 space-y-2">
          <Skeleton className="aspect-video bg-input" />
          <Skeleton className="h-4 w-[78%] bg-input" />
          <Skeleton className="h-4 w-[51%] bg-input" />
          <Skeleton className="h-4 w-[44%] bg-input" />
        </div>
      </div>
    </main>
  )
}
