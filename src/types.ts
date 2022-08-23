import type {FieldDefinition} from 'sanity'

export type ValueType = FieldDefinition & {
  validation?: (val: any) => string | true
}

export type KeyValueObject = Record<string, any> & {
  _type: 'keyValue'
  _key: string
  type: string
  name: string
}
