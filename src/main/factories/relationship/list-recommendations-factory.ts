import { Controller } from '../../../presentation/protocols'
import { makeDefaultValidation } from '../default-validation-factory'
import { ListRecommendationsController } from '../../../presentation/controllers/relationship/list-recommendations-controller'
import { RelationshipLocalStorageRepository } from '../../../infra/localStorage/relationship/relationship-local-storage-repository'

export const makeListRecommendationsController = (): Controller => {
    const relationshipLocalStorageRepository = new RelationshipLocalStorageRepository()
    return new ListRecommendationsController(relationshipLocalStorageRepository, makeDefaultValidation())
}
