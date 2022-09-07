import { PostTypes } from './post-model'

export type CommentModel = {
  post_id: number
  username: string
  comment: string
  type: PostTypes
  created_at: string
  updated_at: string
}