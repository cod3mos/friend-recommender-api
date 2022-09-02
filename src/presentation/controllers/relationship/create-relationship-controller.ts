import { PersonNotFound } from '../../../domain/exceptions/person-not-found'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'
import { badRequest, notFound, serverSuccess } from '../../helpers/http/http-helpers'
import { CreateRelationship } from '../../../domain/useCases/relationship/create-relationship'

export class CreateRelationshipController implements Controller {
    private readonly validations: Validation
    private readonly createRelationship: CreateRelationship

    constructor(createRelationship: CreateRelationship, validations: Validation) {
        this.validations = validations
        this.createRelationship = createRelationship
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validations.validate(httpRequest.body)

            if (error) return badRequest(error)

            const { cpf1, cpf2 } = httpRequest.body
            await this.createRelationship.createRelationship({ cpf1, cpf2 })

            return serverSuccess({ message: 'Successful relationship' })
        } catch (error) {
            if (error instanceof PersonNotFound) return notFound(error)

            return badRequest(error)
        }
    }
}
