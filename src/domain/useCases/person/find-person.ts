import { PersonModel } from '../../models/person'

export interface FindPerson {
    find(cpf: string): Promise<PersonModel>
}
