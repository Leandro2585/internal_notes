import { CommentModel } from '@domain/models'

export interface CreateCommentUseCase {
  execute(input: CreateCommentUseCase.Input): Promise<CreateCommentUseCase.Output>
}

export namespace CreateCommentUseCase {
  export type Input = {
    comment: string
    user_id: number
    post_id: number
  }

  export type Output = {
    comment: CommentModel
  }
}