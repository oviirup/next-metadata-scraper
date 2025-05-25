'use client'

import * as React from 'react'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { getSiteMetadata } from '~/actions/scraper'
import { ThemeToggle } from '~/components/theme-toggle'
import { Button } from '~/components/ui/button'
import { Icon } from '~/components/ui/icon'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Skeleton } from '~/components/ui/skeleton'

const zFormSchema = z.object({
  url: z.string().url('Invalid URL, please enter a valid URL'),
})
type FormSchema = z.infer<typeof zFormSchema>

const zMetadata = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  image: z.string().url().optional(),
  url: z.string().url().optional(),
})
type Metadata = z.infer<typeof zMetadata>

export default function HomePage() {
  const [metadata, setMetadata] = React.useState<Metadata>({})

  const form = useForm<FormSchema>({
    mode: 'onBlur',
    resolver: zodResolver(zFormSchema),
    defaultValues: { url: '' },
  })

  const handleFormSubmit = async (data: FormSchema) => {
    setMetadata({})
    // Handle form submission
    console.log('Form submitted:', data)
    const res = await getSiteMetadata(data.url)
    if (!res.error) {
      const parsedMetadata = zMetadata.safeParse(res)
      if (parsedMetadata.success) {
        setMetadata(parsedMetadata.data)
      } else {
        console.error('Error parsing metadata:', parsedMetadata.error)
      }
    }
  }

  return (
    <div className="container mx-auto flex min-h-svh flex-col">
      <div className="flex h-16 items-center justify-between px-4">
        <div></div>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
      <main className="flex grow flex-col items-center justify-center gap-12">
        <hgroup className="text-center text-2xl md:text-3xl">
          <h1 className="font-bold">Metadata Toolkit</h1>
          <p className="max-w-sm text-[0.625em] text-balance text-muted-fg">
            Parse, preview, & generate metadata on serverless
          </p>
        </hgroup>
        <form
          className="w-full max-w-md"
          noValidate
          onSubmit={form.handleSubmit(handleFormSubmit)}>
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
            {metadata.image ? (
              <Image
                src={metadata.image}
                alt={metadata.title || 'Preview image'}
                width={448}
                height={252}
                unoptimized
                className="aspect-video w-full rounded-md border bg-input object-cover"
              />
            ) : (
              <Skeleton className="aspect-video bg-input" />
            )}
            {metadata.title ? (
              <h4 className="mx-1 text-base font-medium">{metadata.title}</h4>
            ) : (
              <Skeleton className="line-clamp-2 h-4 w-[78%] bg-input" />
            )}
            {metadata.description ? (
              <p className="mx-1 line-clamp-3 text-sm">
                {metadata.description}
              </p>
            ) : (
              <>
                <Skeleton className="h-4 w-[51%] bg-input" />
                <Skeleton className="h-4 w-[44%] bg-input" />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
