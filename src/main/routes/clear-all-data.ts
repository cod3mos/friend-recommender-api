import { Router } from 'express'
import { adapterRouter } from '../adapters/express-route-adapter'
import { makeCleanAllDataController } from '../factories/clean-all-data-factory'

export default async (router: Router): Promise<void> => {
    router.delete('/clean', adapterRouter(makeCleanAllDataController()))
}
