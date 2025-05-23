/** React props with children */
type Props<P = {}> = React.PropsWithChildren<P>

/** Page props with dynamic params and search params */
type PageProps<
  Props = {},
  P = Record<string | string[]> | undefined,
  S = Record<string | string[]> | undefined,
> = Props & {
  params?: Promise<P>
  searchParams?: Promise<S>
}
