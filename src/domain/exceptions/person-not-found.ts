export class PersonNotFound extends Error {
    constructor() {
        super(`person-not-found`)
        this.name = 'PersonNotFound'
    }
}
