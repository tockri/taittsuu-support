type Filter<T> = (t: T) => T

const pipe =
  <T>(...funcs: Array<Filter<T>>): Filter<T> =>
  (s: T) =>
    funcs.reduce((acc, func) => func(acc), s)

export const FpUtil = {
  pipe
}
