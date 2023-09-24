import { atom } from "jotai"
import { BackgroundClient } from "../backgroundInterface/BackgroundClient"
import { ConfigValues } from "../backgroundInterface/types"

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
