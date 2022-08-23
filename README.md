# sanity-plugin-kv-array

## Installation

```
npm install --save sanity-plugin-kv-array
```

or

```
yarn add sanity-plugin-kv-array
```

## Usage
Add it as a plugin in sanity.config.ts (or .js):

```
 import {createConfig} from 'sanity'
 import {myPlugin} from 'sanity-plugin-kv-array'

 export const createConfig({
     /...
     plugins: [
         myPlugin({})
     ]
 })
```
## License

MIT © Rune Botten
See LICENSE