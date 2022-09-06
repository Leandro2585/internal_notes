import { PostTypes } from '@domain/models'
import { PostEntity } from '@infra/database/entities'

export const mockedPost = (): PostEntity => ({
	id: 1,
	user_id: 1,
	description: 'any_description',
	type: PostTypes.ORIGINAL,
	created_at: new Date('2022-08-30 16:32:02'),
	updated_at: new Date('2022-08-30 16:32:02'),
})