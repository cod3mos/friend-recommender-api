import { Controller } from '../../../presentation/protocols'
import { makeRelationshipValidation } from './validations/relationship-validation-factory'
import { CreateRelationshipController } from '../../../presentation/controllers/relationship/create-relationship-controller'
import { RelationshipLocalStorageRepository } from '../../../infra/localStorage/relationship/relationship-local-storage-repository'

export const makeCreateRelationshipController = (): Controller => {
    const relationshipLocalStorageRepository = new RelationshipLocalStorageRepository()
    return new CreateRelationshipController(relationshipLocalStorageRepository, makeRelationshipValidation())
}
