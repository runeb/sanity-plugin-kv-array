import {defineType} from 'sanity'
import { CustomArray } from '../components/CustomArray'
import type {KeyValueObject} from '../types'

const keyValueArray = defineType({
  type: 'array',
  of: [{type: 'keyValue'}],
  name: 'keyValueArray',
  components: {
    input: CustomArray,
  },
  validation: (Rule) =>
    Rule.custom((keyValues: KeyValueObject[]) => {
      let keyValuePaths: {name: string, _key: string}[] = []
      const paths: ({_key: string} | string)[][] = []

      if (!keyValues || keyValues.length === 0) return true

      // Detect duplicate key names
      keyValues.forEach((keyValue, index) => {
        const {name} = keyValue
        const existingRow = keyValuePaths.find((kvp) => kvp.name === name)
        if (existingRow) {
          // Highlight those two rows as having validation errors.
          // Editor should pick one of them and change key name, then both
          // error indicators will disappear.
          paths.push([{_key: keyValue._key}, 'name'])
          paths.push([{_key: existingRow._key}, 'name'])
        }
        keyValuePaths.push({name, _key: keyValue._key})
      })

      return paths.length === 0
        ? true
        : {
            message: 'Key names must be unique in this list',
            paths,
          }
    }),
})

export default keyValueArray
