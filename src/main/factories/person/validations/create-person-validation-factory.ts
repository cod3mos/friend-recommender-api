import { Validation } from '../../../../presentation/protocols/validator'
import { CpfLengthValidator } from '../../../../presentation/helpers/validators/cpf-length-validator'
import { ValidationComposite } from '../../../../presentation/helpers/validators/validation-composite'
import { RequiredFieldValidation } from '../../../../presentation/helpers/validators/required-field-validation'

export const makeCreatePersonValidation = (): ValidationComposite => {
    const validations: Validation[] = []

    for (const field of ['cpf', 'name']) {
        validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new CpfLengthValidator())

    return new ValidationComposite(validations)
}
