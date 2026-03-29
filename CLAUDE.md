# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a geocaching base converter library that encodes/decodes geocaching IDs between base31 and base16 formats. It implements the official Groundspeak API reference for geocaching reference codes.

## Architecture

The project consists of a single main module (`index.js`) that exports two functions:

- `encode(number, prefix)` - Converts a numeric ID to a geocaching reference code
- `decode(str)` - Converts a geocaching reference code back to a numeric ID

### Key Implementation Details

- Uses a custom base31 alphabet: `0123456789ABCDEFGHJKMNPQRTVWXYZ` (excludes `ILOSU`)
- Handles both base16 (≤65535) and base31 (>65535) encoding automatically
- Special handling for "GC" prefixed codes with character substitution (S→5, O→0)
- Uses a magic number (411120) for base31 calculations: `(16 * 31³) - (16⁴)`

## Development Commands

```bash
# Run tests
npm test

# Install dependencies
npm install
```

## Testing

- Uses TAP (Test Anything Protocol) testing framework
- Single test file: `test/convert.test.js`
- Tests cover both encoding/decoding scenarios and error cases
- Run individual test: `npx tap test/convert.test.js`

## Code Quality

- ESLint configuration extends Standard and Prettier
- Prettier integration for consistent formatting
- ES6 modules with `"type": "module"` in package.json
- Comprehensive input validation with descriptive error messages

## Project Structure

```
├── index.js           # Main library implementation
├── test/
│   └── convert.test.js # Comprehensive test suite
├── package.json       # ES module configuration
└── .eslintrc.json     # Standard + Prettier linting
```

## Common Use Cases

When working with this codebase:

1. **Testing new features**: Always add corresponding test cases in `convert.test.js`
2. **Input validation**: Follow existing patterns for type checking and error handling
3. **Base conversion logic**: Understand the base31 magic number calculation before modifying encoding logic
4. **Character handling**: Be aware of the excluded characters (ILOSU) and special GC prefix substitutions

## Dependencies

- **Development only**: biome, codecov, tap
- **Runtime**: No external dependencies (pure JavaScript)