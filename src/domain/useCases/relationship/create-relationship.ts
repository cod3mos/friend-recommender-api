import { AddRelationshipModel } from "./add-relationship-model";

export interface CreateRelationship {
    createRelationship(params: AddRelationshipModel): Promise<void>
}