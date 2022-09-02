import { PersonModel } from '../../../domain/models/person'
import { CleanAllData } from '../../../domain/useCases/clean-all-data'
import { CreatePerson, FindPerson } from '../../../domain/useCases/person'
import { PersonNotFound } from '../../../domain/exceptions/person-not-found'
import { PersonAlreadyExist } from '../../../domain/exceptions/person-already-exist'

let listOfPeople: PersonModel[] = []

export class PersonLocalStorageRepository implements CreatePerson, FindPerson, CleanAllData {
    async create(person: PersonModel): Promise<PersonModel> {
        const alreadyExist = listOfPeople.map(item => item.cpf).includes(person.cpf)

        if (alreadyExist) throw new PersonAlreadyExist()

        listOfPeople.push(person)

        return person
    }

    async find(cpf: string): Promise<PersonModel> {
        const personModel = listOfPeople.find(item => item.cpf === cpf)

        if (!personModel) throw new PersonNotFound()

        return personModel
    }

    async cleanAllData(): Promise<void> {
        listOfPeople = []
    }
}
