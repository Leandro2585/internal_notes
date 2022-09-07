import { CommentEntity } from '@infra/database/entities'

export interface CreateCommentRepository {
  create(input: CreateCommentRepository.Input): Promise<CreateCommentRepository.Output>
}

export namespace CreateCommentRepository {
  export type Input = { 
    comment: string
    user_id: number
    post_id: number
  }

  export type Output = {
    comment: CommentEntity
  }
}
