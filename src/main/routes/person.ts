import { Router } from 'express'
import { adapterRouter } from '../adapters/express-route-adapter'
import { makeFindPersonController } from '../factories/person/find-person-factory'
import { makeCreatePersonController } from '../factories/person/create-person-factory'

export default async (router: Router): Promise<void> => {
    router.post('/person', adapterRouter(makeCreatePersonController()))
    router.get('/person/:cpf', adapterRouter(makeFindPersonController()))
}
