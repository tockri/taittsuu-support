import { PostContent } from "./Message"

const store: Array<PostContent> = []

export const PostContentStore = {
  push: (c: PostContent) => {
    store.push(c)
  },
  pop: (): PostContent | undefined => store.shift()
}
