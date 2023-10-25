import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { FetchPetsByStateAndCityUseCase } from './fetch-pets-by-state-and-city'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: FetchPetsByStateAndCityUseCase

describe('Fetch Pets By State and City', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FetchPetsByStateAndCityUseCase(orgsRepository, petsRepository)

    await orgsRepository.create({
      id: 'org-id',
      name: 'Caoguia',
      email: 'caoguia@gmail.com',
      whatsapp: '41989548587',
      cep: '78954456',
      estado: 'PR',
      cidade: 'Curitiba',
      endereco: 'Rua deputado leopoldo',
      password_hash: await hash('123456', 6),
    })

    await orgsRepository.create({
      id: 'org-id-2',
      name: 'Caoguia',
      email: 'caoguia@gmail.com',
      whatsapp: '41989548587',
      cep: '78954456',
      estado: 'PR',
      cidade: 'Curitiba',
      endereco: 'Rua deputado leopoldo',
      password_hash: await hash('123456', 6),
    })
  })

  it('should be able to fetch pets by state and city without other filters', async () => {
    await petsRepository.create({
      name: 'Toby',
      about: 'Um poodle com 2 anos de idade',
      age: '2',
      ambience: '2',
      energy_level: '1',
      size: 'plus',
      level_independence: '1',
      org_id: 'org-id',
    })

    await petsRepository.create({
      name: 'Max',
      about: 'Um poodle com 2 anos de idade',
      age: '2',
      ambience: '2',
      energy_level: '1',
      size: 'plus',
      level_independence: '1',
      org_id: 'org-id-2',
    })

    const { pets } = await sut.execute({
      state: 'PR',
      city: 'Curitiba',
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Toby' }),
        expect.objectContaining({ name: 'Max' }),
      ]),
    )
  })

  it('should be able to fetch pets by state and city with other filters', async () => {
    await petsRepository.create({
      name: 'Toby',
      about: 'Um poodle com 2 anos de idade',
      age: '2',
      ambience: '2',
      energy_level: '1',
      size: 'plus',
      level_independence: '1',
      org_id: 'org-id',
    })

    await petsRepository.create({
      name: 'Max',
      about: 'Um poodle com 2 anos de idade',
      age: '2',
      ambience: '2',
      energy_level: '1',
      size: 'plus',
      level_independence: '1',
      org_id: 'org-id-2',
    })

    const { pets } = await sut.execute({
      state: 'PR',
      city: 'Curitiba',
      filters: {
        age: '2',
        ambience: '2',
      },
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Toby' }),
        expect.objectContaining({ name: 'Max' }),
      ]),
    )
  })
})
