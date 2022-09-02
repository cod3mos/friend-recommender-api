import { FindPerson } from '../../../domain/useCases/person/find-person'
import { PersonNotFound } from '../../../domain/exceptions/person-not-found'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'
import { badRequest, notFound, serverSuccess } from '../../helpers/http/http-helpers'

export class FindPersonController implements Controller {
    private readonly findPerson: FindPerson
    private readonly validations: Validation

    constructor(findPerson: FindPerson, validations: Validation) {
        this.findPerson = findPerson
        this.validations = validations
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validations.validate(httpRequest.params)

            if (error) return badRequest(error)

            const { cpf } = httpRequest.params
            const person = await this.findPerson.find(cpf)

            return serverSuccess(person)
        } catch (error) {
            if (error instanceof PersonNotFound) return notFound(error)

            return badRequest(error)
        }
    }
}
