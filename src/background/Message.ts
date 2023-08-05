import { ObjectUtil } from "../util/ObjectUtil"

const isMessage =
  <T>(method: string) =>
  (o: unknown): o is T =>
    ObjectUtil.isRecord(o) && o["method"] === method

type Shift = {
  method: "Shift"
}

const isShift = isMessage<Shift>("Shift")

const shift = (): Shift => ({ method: "Shift" })

export type PageInfo = {
  url: string
  title: string
}

export type Message = Shift

export const MessageUtil = {
  isShift,
  shift
}
