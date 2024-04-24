type BasicProps = {
  ref?: any
} & Record<string, any>

type FcOptions<Emits> = {
  emit: Emits,
  expose: {},
  slots: {}
}

export interface FC<Props = any, Emits = any> {
  (props: Props & BasicProps, options: FcOptions<Emits>): any
}
