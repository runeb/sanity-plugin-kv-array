import {defineType, ValidationError} from 'sanity'
import type {KeyValueObject, ValueType} from '../types'

const defineKeyValue = (valueTypes: ValueType[], mutableTypes = false, mutableKeys = false) => {
  const keyValue = defineType({
    type: 'object',
    name: 'keyValue',
    fieldsets: [{name: 'typ', options: {columns: 2}}],
    fields: [
      {
        type: 'string',
        fieldset: 'typ',
        description: 'Name of the value key',
        title: 'Key name',
        readOnly: !mutableKeys,
        name: 'name',
      },
      {
        type: 'string',
        fieldset: 'typ',
        name: 'type',
        readOnly: !mutableTypes,
        description: 'Which type this value should be',
        options: {
          list: valueTypes.map((vt) => ({
            value: vt.type,
            title: vt.title || vt.type,
          })),
        },
      },
    ],
    // This is a custom way of running the simple valueType validations We need to
    // do it in this way, since if we define them as normal schema validations,
    // they will still run if the particluar field is hidden.
    validation: (Rule) =>
      Rule.custom<KeyValueObject>((value, context) => {
        const {type} = value
        const valueType = valueTypes.find((vt) => vt.type === type)
        if (valueType?.validation) {
          const result = valueType.validation(value[valueType.name])
          if (result === true) return true
          const err: ValidationError = {
            message: result,
            paths: [[valueType.name]],
          }
          return err
        }
        return true
      }),
    preview: {
      select: {
        title: 'name',
        subtitle: 'type',
      },
    },
  })

  // Dynamically add the configured fields, without their validation since we
  // handle that centrally on the keyValue object. See comment above.
  valueTypes.forEach((type) => {
    const {validation, ...restOfType} = type
    keyValue.fields.push({
      ...restOfType,
      title: 'Value',
      description: 'A value for the key name, corresponding to the type',
      hidden: ({parent}) => parent?.type !== type.type,
    })
  })

  return keyValue
}

export default defineKeyValue
