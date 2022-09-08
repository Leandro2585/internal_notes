import { PostModel } from './post-model'

export type ProfileModel = {
  username: string
  created_at: string
  total_posts: number
  recent_posts: PostModel[] 
}