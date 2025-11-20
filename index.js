// Official documentation
// https://api.groundspeak.com/documentation#referencecodes

const alphabet = "0123456789ABCDEFGHJKMNPQRTVWXYZ"
const base = alphabet.length

// (16 * 31 * 31 * 31) - (16 * 16 * 16 * 16)
const BASE31_MAGIC_NUMBER = 411120

const BASE16_MAX = 0xffff

// Create a lookup table to fetch character index
const alphabetLookup = [...alphabet].reduce((lookup, char, index) => {
    lookup[char] = index
    return lookup
}, {})

const assertNonNegativeSafeInteger = (val) => {
    if (
        typeof val !== "number" ||
        Number.isNaN(val) ||
        val < 0 ||
        val > Number.MAX_SAFE_INTEGER ||
        Math.floor(val) !== val
    ) {
        throw new Error("Value passed is not a non-negative safe integer.")
    }
}

const assertString = (str) => {
    if (typeof str !== "string") {
        throw new Error("Value passed is not a string.")
    }
}

const assertBase31Character = (character) => {
    if (typeof alphabetLookup[character] === "undefined") {
        throw new Error(`Value '${character}' passed is not a valid Base31 string.`)
    }
}

export const encode = (number, prefix) => {
    assertNonNegativeSafeInteger(number)
    assertString(prefix)

    if (number <= BASE16_MAX) {
        return prefix + Number.parseInt(number, 16)
    }

    let str = ""
    let modulus
    number = Number(number + BASE31_MAGIC_NUMBER)
    while (number >= base) {
        modulus = number % base
        str = alphabet[modulus] + str
        number = Math.floor(number / base)
    }

    return prefix + alphabet[number] + str
}

export const decode = (str) => {
    assertString(str)

    str = str.toUpperCase()

    if (str.substr(0, 2) === "GC") {
        const replaceChars = { S: 5, O: 0 }
        str = str.replace(/[SO]/g, (m) => replaceChars[m])
    }

    str = str.substr(2)

    if (str === "") {
        throw new Error("Invalid value.")
    }

    if (str.length >= 5 || "0123456789ABCDEF".indexOf(str.charAt(0)) === -1) {
        return (
            [...str].reverse().reduce((num, character, index) => {
                assertBase31Character(character)
                return num + alphabetLookup[character] * base ** index
            }, 0) - BASE31_MAGIC_NUMBER
        )
    }

    return Number.parseInt(str, 16)
}
