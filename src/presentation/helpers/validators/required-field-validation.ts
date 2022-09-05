import { MissingParamError } from '../../errors'
import { Validation } from '../../protocols/validator'
import { not } from '../functions/helper'

export class RequiredFieldValidation implements Validation {
    constructor(private readonly fieldName: string) {}

    validate(input: any): Error {
        if (not(input[this.fieldName])) {
            return new MissingParamError(this.fieldName)
        }
    }
}
