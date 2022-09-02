import { CleanAllData } from '../../domain/useCases/clean-all-data'
import { Controller, HttpRequest, HttpResponse } from '../protocols'
import { badRequest, serverSuccess } from '../helpers/http/http-helpers'

export class CleanAllDataController implements Controller {
    private readonly cleanPerson: CleanAllData
    private readonly cleanRelationship: CleanAllData

    constructor(cleanPerson: CleanAllData, cleanRelationship: CleanAllData) {
        this.cleanPerson = cleanPerson
        this.cleanRelationship = cleanRelationship
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            await this.cleanPerson.cleanAllData()
            await this.cleanRelationship.cleanAllData()

            return serverSuccess({ message: 'All data in memory has been removed' })
        } catch (error) {
            return badRequest(error)
        }
    }
}
