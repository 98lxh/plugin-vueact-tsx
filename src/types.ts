type BasicProps = {
  ref?: any
} & Record<string, any>

type FcOptions<Emits> = {
  emit: Emits,
  expose: any,
  slots: any
}

export interface FC<Props = any, Emits = any> {
  (props: Props & BasicProps, options: FcOptions<Emits>): any
}

export type ParserValue = {
  resolved: string;
  unresolved: string
} | null
