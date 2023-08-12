import { ObjectUtil } from "../util/ObjectUtil"

type HasMethod = {
  method: string
}

const isMessage =
  <T extends HasMethod>(method: T["method"]) =>
  (o: unknown): o is T =>
    ObjectUtil.isRecord(o) && o["method"] === method

export type PageInfo = {
  url: string
  title: string
}

type GetPageInfo = {
  method: "GetPageInfo"
}

const isGetPageInfo = isMessage<GetPageInfo>("GetPageInfo")

const getPageInfo = (): GetPageInfo => ({ method: "GetPageInfo" })

type SetPageInfo = {
  method: "SetPageInfo"
  info: PageInfo
}

const isSetPageInfo = isMessage<SetPageInfo>("SetPageInfo")

const setPageInfo = (info: PageInfo): SetPageInfo => ({ method: "SetPageInfo", info })

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

export type Message = GetPageInfo | SetConfig | GetConfig | SetPageInfo

export const MessageUtil = {
  isGetPageInfo,
  getPageInfo,
  isSetPageInfo,
  setPageInfo,
  isSetConfig,
  setConfig,
  isGetConfig,
  getConfig
}
