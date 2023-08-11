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

export type ConfigValues = {
  wideInput?: boolean
  showCharCount?: boolean
  overrideTwitter?: boolean
}

type SetConfig = {
  method: "SetConfig"
  values: Partial<ConfigValues>
}

const isSetConfig = isMessage<SetConfig>("SetConfig")

const setConfig = (values: Partial<ConfigValues>): SetConfig => ({ method: "SetConfig", values })

type GetConfig = {
  method: "GetConfig"
}

const isGetConfig = isMessage<GetConfig>("GetConfig")

const getConfig = (): GetConfig => ({ method: "GetConfig" })

export type Message = Shift | SetConfig | GetConfig

export const MessageUtil = {
  isShift,
  shift,
  isSetConfig,
  setConfig,
  isGetConfig,
  getConfig
}
