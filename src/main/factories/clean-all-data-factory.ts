import { Controller } from '../../presentation/protocols'
import { CleanAllDataController } from '../../presentation/controllers/clean-all-data-controller'
import { PersonLocalStorageRepository } from '../../infra/localStorage/person/person-local-storage-repository'
import { RelationshipLocalStorageRepository } from '../../infra/localStorage/relationship/relationship-local-storage-repository'

export const makeCleanAllDataController = (): Controller => {
    const personLocalStorageRepository = new PersonLocalStorageRepository()
    const relationshipLocalStorageRepository = new RelationshipLocalStorageRepository()
    
    return new CleanAllDataController(personLocalStorageRepository, relationshipLocalStorageRepository)
}
