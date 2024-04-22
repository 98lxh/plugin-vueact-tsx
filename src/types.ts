type BasicProps = {
  ref?: any
}

type FcOptions<Emits> = {
  expose: any,
  emit: Emits,
  slots: any
}

export interface FC<Props = any, Emits = any> {
  (props: Props & BasicProps, options: FcOptions<Emits>): any
}

