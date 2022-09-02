import { badRequest, serverSuccess } from '../../helpers/http/http-helpers'
import { CreatePerson } from '../../../domain/useCases/person/create-person'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'

export class CreatePersonController implements Controller {
    private readonly validations: Validation
    private readonly createPerson: CreatePerson

    constructor(createPerson: CreatePerson, validations: Validation) {
        this.createPerson = createPerson
        this.validations = validations
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validations.validate(httpRequest.body)

            if (error) return badRequest(error)

            const { cpf, name } = httpRequest.body
            const person = await this.createPerson.create({ cpf, name })

            return serverSuccess(person)
        } catch (error) {
            return badRequest(error)
        }
    }
}
