import { PostTypes } from '@domain/models'
import { PostEntity } from '@infra/database/entities'

export const emptyPostEntity = (): PostEntity => ({
	id: 0,
	user_id: 0,
	description: '',
	type: PostTypes.ORIGINAL,
	created_at: new Date(),
	updated_at: new Date()
})