import { atom } from "jotai"
import { BackgroundClient } from "../background/BackgroundClient"
import { ConfigValues } from "../background/Message"

const mainAtom = atom(
  async () => {
    return BackgroundClient.getConfig()
  },
  (get, set, newValue: Partial<ConfigValues>) => {
    BackgroundClient.setConfig(newValue).then()
  }
)

export const ConfigState = {
  atom: mainAtom
}
