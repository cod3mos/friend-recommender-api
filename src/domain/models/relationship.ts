import { PersonModel } from './person'

export interface RelationshipModel {
    person: PersonModel
    friends: string[]
}
