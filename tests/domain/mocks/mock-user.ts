import { UserEntity } from '@infra/database/entities'

export const mockedUserEntity = (): UserEntity => ({
	id: 1,
	name: 'USER',
	created_at: new Date('2022-08-30 16:32:02'),
	updated_at: new Date('2022-08-30 16:32:02'),
})