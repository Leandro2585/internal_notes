import { UserEntity } from '@infra/database/entities'

export interface LoadUserByIdRepository {
  loadById(input: LoadUserByIdRepository.Input): Promise<LoadUserByIdRepository.Output>
}
export namespace LoadUserByIdRepository {
  export type Input = { user_id: number }

  export type Output = { user: UserEntity | undefined }
}
