import { CommentEntity } from '@infra/database/entities'

export const mockedCommentEntity = (): CommentEntity => ({
	id: 1,
	user_id: 1,
	post_id: 1,
	comment: 'any_comment',
	created_at: new Date('2022-08-30 16:32:02'),
	updated_at: new Date('2022-08-30 16:32:02'),
})