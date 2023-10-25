import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, Org } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetPetDetailsUseCaseRequest {
  pet_id: string
}

interface GetPetDetailsUseCaseResponse {
  pet: Pet
  org: Org
}

export class GetPetDetailsUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    pet_id,
  }: GetPetDetailsUseCaseRequest): Promise<GetPetDetailsUseCaseResponse> {
    const pet = await this.petsRepository.findById(pet_id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    const org = await this.orgsRepository.findById(pet.org_id)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
      org,
    }
  }
}
