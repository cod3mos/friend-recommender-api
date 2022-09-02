import { Router } from 'express'
import { adapterRouter } from '../adapters/express-route-adapter'
import { makeCreateRelationshipController } from '../factories/relationship/create-relationship-factory'
import { makeListRecommendationsController } from '../factories/relationship/list-recommendations-factory'

export default async (router: Router): Promise<void> => {
    router.post('/relationship', adapterRouter(makeCreateRelationshipController()))
    router.get('/recommendations/:cpf', adapterRouter(makeListRecommendationsController()))
}
