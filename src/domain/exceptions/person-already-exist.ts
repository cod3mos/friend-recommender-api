export class PersonAlreadyExist extends Error {
    constructor() {
        super(`person-already-exist`)
        this.name = 'PersonAlreadyExist'
    }
}
