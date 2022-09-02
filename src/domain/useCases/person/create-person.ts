import { PersonModel } from '../../models/person'

export interface CreatePerson {
    create(person: PersonModel): Promise<PersonModel>
}
