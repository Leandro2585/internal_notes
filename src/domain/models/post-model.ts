export type PostModel = {
  id: number
  user_id: number
  type: PostTypes
  description: string
  created_at: string
  updated_at: string
}

export enum PostTypes {
  ORIGINAL = 'original',
  REPOST = 'repost'
}