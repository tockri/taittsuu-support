const isRecord = <T = unknown>(o: unknown): o is Record<string, T> => o !== null && typeof o === "object"

export const ObjectUtil = {
  isRecord
}
