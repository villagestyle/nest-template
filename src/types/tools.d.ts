export type ParamsOf<Fn extends (...args: any[]) => any> = Fn extends (
  args: infer T,
) => any
  ? T
  : never;
