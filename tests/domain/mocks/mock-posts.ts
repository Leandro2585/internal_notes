import { PostModel, PostTypes } from '@domain/models'
import { PostEntity } from '@infra/database/entities'

export const mockedPostEntity = (): PostEntity => ({
	id: 1,
	user_id: 1,
	description: 'any_description',
	type: PostTypes.ORIGINAL,
	created_at: new Date('2022-08-30 16:32:02'),
	updated_at: new Date('2022-08-30 16:32:02'),
})

export const mockedPostModel = (): PostModel => ({
	id: 1,
	user_id: 1,
	description: 'any_description',
	type: PostTypes.ORIGINAL,
	created_at: new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date('2022-08-30 16:32:02')),
	updated_at: new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date('2022-08-30 16:32:02')),
})