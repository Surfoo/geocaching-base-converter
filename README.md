# geocaching-base-converter [![Build Status](https://travis-ci.org/Surfoo/geocaching-base-converter.svg?branch=master)](https://travis-ci.org/Surfoo/geocaching-base-converter)

Encode or decode geocaching ID (base31 or base16)

This package is available on npmjs.com: [geocaching-base-converter](https://www.npmjs.com/package/geocaching-base-converter)

#### Includes characters

`0123456789ABCDEFGHJKMNPQRTVWXYZ`

#### Excludes characters

`ILOSU`

### Usage

```javascript
const gbc = require("geocaching-base-converter")

let encodedValue = gbc.encode(1220432, "PR") // PR1QQQP
let decodedValue = gbc.decode("PR1QQQP") // 1220432
```
