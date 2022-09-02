import { InvalidParamError } from '../../errors'
import { Validation } from '../../protocols/validator'

export class CpfLengthValidator implements Validation {
    constructor(private readonly fieldName?: string) {}

    validate(input: any): Error {
        const field = this.fieldName ? this.fieldName : 'cpf'

        if (input[field].length !== 11) {
            return new InvalidParamError(field)
        }
    }
}
