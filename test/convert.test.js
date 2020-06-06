import * as t from "tap"
import { encode, decode } from "../index.js"

// Base 31
t.equal(encode(1220432, "PR"), "PR1QQQP")
t.equal(decode("PR1qqqp"), 1220432)
t.equal(decode("GC10000"), 512401)

// Base 16
t.equal(encode(1, "PR"), "PR1")
t.equal(encode(2000, "PR"), "PR8192")
t.equal(decode("GCZZZZ"), 512400)
t.equal(decode("PR2000"), 8192)

// special cases
t.equal(encode(1585032, "GC"), "GC25050")
t.equal(decode("GC2SOSO"), 1585032)
t.equal(decode("GCG000"), 65536)

// with an empty string prefix
t.equal(encode(1, ""), "1")

// negative int
t.throws(() => encode(-1, "PR"), new Error("Value passed is not a non-negative safe integer."))

// not a string
t.throws(() => decode(-11111), new Error("Value passed is not a string."))
t.throws(() => decode(1), new Error("Value passed is not a string."))
t.throws(() => decode(0xffff), new Error("Value passed is not a string."))
t.throws(() => decode("1"), new Error("Invalid value."))

// not a character from the base 31
t.throws(() => decode("GC2ILOSU"), new Error("Value 'U' passed is not a valid Base31 string."))

// without prefix
t.throws(() => encode(1), new Error("Value passed is not a string."))

// with numeric prefix
t.throws(() => encode(1, 1), new Error("Value passed is not a string."))

// without args
t.throws(() => encode(), new Error("Value passed is not a non-negative safe integer."))
t.throws(() => decode(), new Error("Value passed is not a string."))
