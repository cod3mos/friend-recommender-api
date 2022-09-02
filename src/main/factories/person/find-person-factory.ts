import { Controller } from '../../../presentation/protocols'
import { makeDefaultValidation } from '../default-validation-factory'
import { FindPersonController } from '../../../presentation/controllers/person/find-person-controller'
import { PersonLocalStorageRepository } from '../../../infra/localStorage/person/person-local-storage-repository'

export const makeFindPersonController = (): Controller => {
    const personLocalStorageRepository = new PersonLocalStorageRepository()
    return new FindPersonController(personLocalStorageRepository, makeDefaultValidation())
}
