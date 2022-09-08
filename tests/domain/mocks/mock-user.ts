import { formatDate } from '@domain/helpers'
import { ProfileModel } from '@domain/models'
import { UserEntity } from '@infra/database/entities'
import { mockedPostModel } from './mock-posts'

export const mockedUserEntity = (): UserEntity => ({
	id: 1,
	name: 'USER',
	created_at: new Date('2022-08-30 16:32:02'),
	updated_at: new Date('2022-08-30 16:32:02'),
})

export const mockedProfileModel = (): ProfileModel => ({
	username: 'USER',
	total_posts: 10,
	created_at: formatDate(new Date('2022-08-30 16:32:02')),
	recent_posts: [mockedPostModel(), mockedPostModel(), mockedPostModel(), mockedPostModel(), mockedPostModel()],
})