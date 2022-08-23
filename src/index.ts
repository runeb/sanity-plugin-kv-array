import {createPlugin} from 'sanity'
import defineKeyValue from './schema/keyValue'
import keyValueArray from './schema/keyValueArray'
import {ValueType} from './types'

interface KeyValueArrayPluginConfig {
  /**
   The unique set of types to support in this keyValue array The `type` can be
   repeated, such as multiple different possible references, but the `name` must
   be unique. Just like a normal Sanity schema.  The field name should be
   something you know about, so that you later know which property to pick the
   value from.
  
   This means that instead of using a type of "reference", which could be hard
   to determine what property name the reference is in, you should rather define
   a custom type and use that:

   const heroReference = {
     type: "reference",
     name: "heroReference",
     to: [{ type: "hero" }],
   };

   And use this in your 'valueTypes'. Then you can rely on having every name for
   the field be `${type}Value}` and you know that your hero reference is found
   in `heroReferenceValue`:

  {
    _key: "eedead07fdea",
    _type: "keyValue",
    name: "heroBanner",
    type: "heroReference",
    heroReferenceValue: {
      _type: "heroReference",
      _ref: "936f3f88-497e-41b8-80b6-24b4d1afb134",
    },
  };
  */
  valueTypes?: ValueType[],
  mutableTypes?: boolean,
  mutableKeys?: boolean,
}

/**
 * ## Usage in sanity.config.ts (or .js)
 *
 * ```
 * import {createConfig} from 'sanity'
 * import {keyValueArrayPlugin} from 'sanity-plugin-kv-array'
 *
 * export const createConfig({
 *     /...
 *     plugins: [
 *       keyValueArrayPlugin({
 *         valueTypes: [
 *           {
 *             type: "string",
 *             name: "stringValue"
 *           },
 *           {
 *             type: "text",
 *             name: "textValue"
 *           },
 *           {
 *             type: "datetime",
 *             name: "datetimeValue"
 *           }
 *         ]
 *       })
 *     ]
 * })
 * ```
 */
export const keyValueArrayPlugin = createPlugin<KeyValueArrayPluginConfig | void>((config = {}) => {
  return {
    name: 'sanity-plugin-kv-array',
    schema: {
      types: [defineKeyValue(config?.valueTypes || [], config?.mutableTypes, config?.mutableKeys), keyValueArray],
    },
  }
})