# sanity-plugin-kv-array

## Installation

This module is not published. Vendor in the plugin or copy code for
experimentation for now.

## Usage
```
  import {createConfig} from 'sanity'
  import {keyValueArrayPlugin} from 'sanity-plugin-kv-array'
 
  export const createConfig({
      //...
      plugins: [
        keyValueArrayPlugin({
          valueTypes: [
            {
              type: "string",
              name: "stringValue"
            },
            {
              type: "text",
              name: "textValue"
            },
            {
              type: "datetime",
              name: "datetimeValue"
            }
          ]
        })
      ]
  })
```

## License

MIT © Rune Botten
See LICENSE