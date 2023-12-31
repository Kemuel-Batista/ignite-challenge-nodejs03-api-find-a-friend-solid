import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsByStateAndCityUseCase } from '../pets/fetch-pets-by-state-and-city'

export function makeFetchPetsByStateAndCityUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new FetchPetsByStateAndCityUseCase(
    orgsRepository,
    petsRepository,
  )

  return useCase
}
