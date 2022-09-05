import { readdirSync } from 'fs'
import { Router, Express } from 'express'
import { not } from '../../presentation/helpers/functions/helper'

export default (app: Express): void => {
    const routes = Router()

    app.use(routes)

    // TODO: Implementado recuperação de rotas dinâmica.
    readdirSync(`${String(__dirname)}/../routes`).map(async file => {
        if (not(file.endsWith('.map'))) (await import(`../routes/${file}`)).default(routes)
    })
}
