import { Request, RequestHandler, Response } from 'express'
import { Controller, HttpRequest } from '../../presentation/protocols'

export const adapterRouter = (controller: Controller): RequestHandler => {
    return async (req: Request, res: Response) => {
        const httpRequest: HttpRequest = { body: req.body }

        if (req.params) {
            httpRequest.params = req.params
        }

        const httpResponse = await controller.handle(httpRequest)

        if (httpResponse.statusCode === 200) {
            res.status(httpResponse.statusCode).json(httpResponse.body)
        } else {
            res.status(httpResponse.statusCode).json({ error: httpResponse.body.message })
        }
    }
}
