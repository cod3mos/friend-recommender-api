import { readdirSync } from 'fs'
import { Router, Express } from 'express'

export default (app: Express): void => {
    const routes = Router()

    app.use(routes)

    // TODO: Implementado recuperação de rotas dinâmica.
    readdirSync(`${String(__dirname)}/../routes`).map(async file => {
        if (!file.endsWith('.map')) (await import(`../routes/${file}`)).default(routes)
    })
}
