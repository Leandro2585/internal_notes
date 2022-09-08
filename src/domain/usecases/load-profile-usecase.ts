import { ProfileModel } from '@domain/models'

export interface LoadProfileUseCase {
  execute(input: LoadProfileUseCase.Input): Promise<LoadProfileUseCase.Output>
}

export namespace LoadProfileUseCase {
  export type Input = {
    user_id: number
    page?: number
  }

  export type Output = {
    profile: ProfileModel
  }
}