# geocaching-base-converter

Encode or decode geocaching ID (base31 or base16)

This package is available on npmjs.com: [geocaching-base-converter](https://www.npmjs.com/package/geocaching-base-converter)

#### Includes characters

`0123456789ABCDEFGHJKMNPQRTVWXYZ`

#### Excludes characters

`ILOSU`

## Installation

```bash
npm install geocaching-base-converter
```

## Usage

```javascript
import { encode, decode } from "geocaching-base-converter"

// Encode a number with a prefix
let encodedValue = encode(1220432, "PR") // "PR1QQQP"

// Decode a geocaching reference code
let decodedValue = decode("PR1QQQP") // 1220432

// Works with GC codes too
let gcEncoded = encode(1585032, "GC") // "GC25050"
let gcDecoded = decode("GC2SOSO") // 1585032 (handles S→5, O→0 substitution)
```

## Testing

This project uses [TAP (Test Anything Protocol)](https://node-tap.org/) for testing.

### Run all tests

```bash
npm test
```

### Run a specific test file

```bash
npx tap test/convert.test.js
```

### Run tests with coverage

```bash
npx tap test/*.js --coverage
```

### Test coverage report

TAP automatically generates coverage reports. You can view detailed coverage information in the `.tap/coverage/` directory after running tests.

## Development

### Code Quality

The project uses:
- **Biome** for additional linting and formatting

### Scripts

```bash
# Install dependencies
npm install

# Run tests
npm test

# Format code with Biome
npx @biomejs/biome format --write .

# Lint code with Biome
npx @biomejs/biome lint .
```
