import { badRequest, serverSuccess } from '../../helpers/http/http-helpers'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'
import { ListRecommendations } from '../../../domain/useCases/relationship/recommendations'

export class ListRecommendationsController implements Controller {
    private readonly validations: Validation
    private readonly listRecommendations: ListRecommendations

    constructor(listRecommendations: ListRecommendations, validations: Validation) {
        this.validations = validations
        this.listRecommendations = listRecommendations
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validations.validate(httpRequest.params)

            if (error) return badRequest(error)

            const { cpf } = httpRequest.params
            const list = await this.listRecommendations.listRecommendations(cpf)

            return serverSuccess(list)
        } catch (error) {
            return badRequest(error)
        }
    }
}
