import { PostModel } from '@domain/models'

export const mockedPost = (): PostModel => ({
	id: 1,
	description: 'any_post',
	created_at: '2022-08-30 16:32:02',
	updated_at: '2022-08-30 16:34:02',
})