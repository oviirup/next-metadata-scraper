'use client'

import * as React from 'react'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRightIcon, Link2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Skeleton } from '~/components/ui/skeleton'
import { isEmpty } from '~/lib/assertions'
import { Metadata } from '~/lib/scraper/types'
import { zUrlSchema } from '~/lib/scraper/utils'

const zFormSchema = z.object({
  url: zUrlSchema,
})
type FormSchema = z.infer<typeof zFormSchema>

type ScraperProps = {
  initialUrl?: string
  initialMetadata?: Metadata
  getMetadataAction: (url: string) => Promise<Metadata>
}

function Scraper({
  initialUrl = '',
  initialMetadata = {},
  getMetadataAction,
}: ScraperProps) {
  const [metadata, setMetadata] = React.useState(initialMetadata)

  const form = useForm<FormSchema>({
    mode: 'onChange',
    resolver: zodResolver(zFormSchema),
    defaultValues: { url: initialUrl },
  })

  const handleFormSubmit = async (data: FormSchema) => {
    setMetadata({})
    try {
      const metadata = await getMetadataAction(data.url)
      if (isEmpty(metadata) || !metadata.title) {
        form.setError('url', {
          type: 'manual',
          message: 'No metadata found for the provided URL.',
        })
      } else {
        setMetadata(metadata)
      }
    } catch {
      // TODO handle error properly
    }
  }

  return (
    <div className="mb-6 flex w-full max-w-md flex-col items-start gap-10">
      <form
        className="w-full max-w-md"
        noValidate
        onSubmit={form.handleSubmit(handleFormSubmit)}>
        <Label htmlFor="url" className="ml-1">
          Enter a URL
        </Label>
        <div className="mb-1 flex w-full items-center gap-2">
          <Input
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
            <ArrowRightIcon size={16} />
          </Button>
        </div>
        <div className="flex min-h-5">
          <p className="mx-1 text-sm leading-snug text-destructive">
            {form.formState.errors.url?.message}
          </p>
        </div>
      </form>
      <div className="flex w-full max-w-md flex-col gap-2">
        <div className="flex flex-1 flex-col gap-4">
          {metadata.image ? (
            <Image
              src={metadata.image}
              alt={metadata.title || 'Preview image'}
              width={448}
              height={252}
              unoptimized
              className="aspect-video w-full rounded-md bg-input object-cover ring ring-border"
            />
          ) : (
            <Skeleton className="aspect-video bg-input" />
          )}
          <div className="*:leading-slug flex flex-col">
            {metadata.title ? (
              <h4 className="mx-1 line-clamp-2 text-base font-medium">
                {metadata.title}
              </h4>
            ) : (
              <Skeleton className="my-1 h-4 w-[78%] bg-input" />
            )}
            {metadata.description ? (
              <p className="mx-1 line-clamp-3 text-sm text-muted-fg">
                {metadata.description}
              </p>
            ) : (
              <>
                <Skeleton className="my-1 h-4 w-[51%] bg-input" />
                <Skeleton className="my-1 h-4 w-[44%] bg-input" />
              </>
            )}
          </div>
          {metadata.url ? (
            <div className="flex items-center gap-1 text-muted-fg">
              {metadata.icon ? (
                <Image
                  src={metadata.icon}
                  alt="Website icon"
                  width={20}
                  height={20}
                  unoptimized
                  className="size-5 rounded-xs object-cover"
                />
              ) : (
                <span className="inline-flex size-5 items-center justify-center">
                  <Link2Icon size={16} />
                </span>
              )}
              <span className="mx-1 line-clamp-1 text-sm">
                {metadata.url?.replace(/^https?:\/+/, '').replace(/\/$/, '')}
              </span>
            </div>
          ) : (
            <Skeleton className="my-1 h-4 w-[78%] bg-input" />
          )}
        </div>
      </div>
    </div>
  )
}

export { Scraper }
