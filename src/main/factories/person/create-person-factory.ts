import { Controller } from '../../../presentation/protocols'
import { makeCreatePersonValidation } from './validations/create-person-validation-factory'
import { CreatePersonController } from '../../../presentation/controllers/person/create-person-controller'
import { PersonLocalStorageRepository } from '../../../infra/localStorage/person/person-local-storage-repository'

export const makeCreatePersonController = (): Controller => {
    const personLocalStorageRepository = new PersonLocalStorageRepository()
    return new CreatePersonController(personLocalStorageRepository, makeCreatePersonValidation())
}
