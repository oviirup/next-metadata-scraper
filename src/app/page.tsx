import { Scraper } from '~/components/scraper'
import { ThemeToggle } from '~/components/theme-toggle'
import { Anchor } from '~/components/ui/anchor'
import { getMetadata } from '~/lib/scraper/scraper'

async function getMetadataAction(url: string) {
  'use server'
  return getMetadata(url)
}

async function HomePage() {
  const initialUrl = 'https://leerob.io'
  const initialMetadata = await getMetadataAction(initialUrl)

  return (
    <div className="container mx-auto flex min-h-svh flex-col">
      <div
        className="pointer-events-none absolute top-0 left-1/2 -z-10 ml-[-38rem] h-100 w-325 overflow-hidden mask-[linear-gradient(white,transparent)]"
        aria-hidden>
        <div className="absolute inset-0 bg-linear-to-r from-sky-500 to-teal-500 mask-[radial-gradient(farthest-side_at_top,white,transparent)] opacity-25">
          <svg className="absolute inset-x-0 inset-y-[-50%] h-[200%] w-full skew-y-[-18deg] fill-current/40 stroke-current/75 mix-blend-overlay">
            <defs>
              <pattern
                id="checker_board"
                width="72"
                height="56"
                patternUnits="userSpaceOnUse">
                <path d="M.5 56V.5H72" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#checker_board)" />
            <rect width="73" height="57" x="288" y="168" />
            <rect width="73" height="57" x="144" y="56" />
            <rect width="73" height="57" x="504" y="168" />
            <rect width="73" height="57" x="720" y="336" />
          </svg>
        </div>
      </div>
      <div className="flex h-16 items-center justify-between px-4">
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
      <main className="my-6 flex grow flex-col items-center justify-center gap-10">
        <hgroup className="text-center text-2xl md:text-3xl">
          <h1 className="font-bold">Metadata Toolkit</h1>
          <p className="max-w-sm text-[0.625em] text-balance text-muted-fg">
            Parse, preview, & generate metadata on serverless
          </p>
        </hgroup>
        <Scraper {...{ initialUrl, initialMetadata, getMetadataAction }} />
      </main>
      <div className="flex items-center justify-between py-4 text-center text-sm text-muted-fg">
        <Anchor
          href="//github.com/oviirup/next-metadata-scraper"
          external
          className="underline underline-offset-4 transition-all hocus:text-primary">
          Source Code
        </Anchor>
        <span>
          A project by{' '}
          <Anchor
            href="//x.com/oviirup"
            external
            className="underline underline-offset-4 transition-all hocus:text-primary">
            Avirup
          </Anchor>
        </span>
      </div>
    </div>
  )
}

export default HomePage
