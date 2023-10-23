import { ObjectUtil } from "../util/ObjectUtil"

type HasMethod = {
  method: string
}

const isMessage =
  <T extends HasMethod>(method: T["method"]) =>
  (o: unknown): o is T =>
    ObjectUtil.isRecord(o) && o["method"] === method

export type PostContent = {
  url: string
  body: string
}

type GetPostContent = {
  method: "GetPostContent"
}

const isGetPostContent = isMessage<GetPostContent>("GetPostContent")

const getPostContent = (): GetPostContent => ({ method: "GetPostContent" })

type SetPostContent = {
  method: "SetPostContent"
  content: PostContent
}

const isSetPostContent = isMessage<SetPostContent>("SetPostContent")

const setPostContent = (content: PostContent): SetPostContent => ({ method: "SetPostContent", content })

export type ConfigValues = {
  wideInput?: boolean
  showCharCount?: boolean
  loadTimelineAutomatically?: boolean
  overrideTwitter?: boolean
  linkOnNoticeUser?: boolean
  inputPagePath?: "home" | "publictimeline"
  modifyHeader?: boolean
  disablePostLink?: boolean
  hideFavRet?: boolean
  focusOnTaiitsuInput?: boolean
  submitByKeyboard?: boolean
  refineSearchBox?: boolean
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

export type ConfigChanged = {
  method: "ConfigChanged"
  values: ConfigValues
}

const isConfigChanged = isMessage<ConfigChanged>("ConfigChanged")

const configChanged = (values: ConfigValues): ConfigChanged => ({ method: "ConfigChanged", values })

export type Message = GetPostContent | SetConfig | GetConfig | SetPostContent | ConfigChanged

export const MessageUtil = {
  isMessage,
  isGetPostContent,
  getPostContent,
  isSetPostContent,
  setPostContent,
  isSetConfig,
  setConfig,
  isGetConfig,
  getConfig,
  isConfigChanged,
  configChanged
}
