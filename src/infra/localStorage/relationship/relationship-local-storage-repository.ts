import { CleanAllData } from '../../../domain/useCases/clean-all-data'
import { first } from '../../../presentation/helpers/functions/helper'
import { RelationshipModel } from '../../../domain/models/relationship'
import { PersonLocalStorageRepository } from '../person/person-local-storage-repository'
import { ListRecommendations } from '../../../domain/useCases/relationship/recommendations'
import { CreateRelationship } from '../../../domain/useCases/relationship/create-relationship'
import { AddRelationshipModel } from '../../../domain/useCases/relationship/add-relationship-model'

let listOfRelationships: RelationshipModel[] = []

export class RelationshipLocalStorageRepository
    implements CreateRelationship, CleanAllData, ListRecommendations
{
    async createRelationship(params: AddRelationshipModel): Promise<void> {
        const users = Object.keys(params)
        const fisrtRelationship = (cpf: string) =>
            listOfRelationships.map(item => item.person.cpf).includes(cpf)

        for (const user of users) {
            const person = await new PersonLocalStorageRepository().find(params[user])
            const friends = users.map(item => (item !== user ? params[item] : null)).filter(Boolean)

            if (!fisrtRelationship(person.cpf)) {
                listOfRelationships.push({ person, friends: friends })
            } else {
                const index = listOfRelationships.map(item => item.person.cpf).indexOf(person.cpf)
                const oldFriends = listOfRelationships[index].friends

                listOfRelationships[index].friends = [...new Set(oldFriends.concat(friends))]
            }
        }
    }

    async listRecommendations(cpf: string): Promise<string[]> {
        const recommendations: string[] = []
        const listRecommendations: string[] = []
        const sortResult = (arr: any, val: any) => ({ ...arr, [val]: (arr[val] | 0) + 1 })
        const relationship = first(listOfRelationships.filter(item => item.person.cpf === cpf))

        if (relationship) {
            for (const friend of relationship.friends) {
                const list = first(listOfRelationships.filter(item => item.person.cpf === friend))

                list.friends.forEach((friend: string) => {
                    if (friend !== cpf) {
                        listRecommendations.push(friend)
                    }
                })
            }

            const resultSort = listRecommendations.reduce(sortResult, {})

            Object.keys(resultSort).forEach(key => recommendations.push(key))

            return recommendations
        }

        return []
    }

    async cleanAllData(): Promise<void> {
        listOfRelationships = []
    }
}
