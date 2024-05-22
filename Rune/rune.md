# Rune Type in Go

## Introduction
The `rune` type in Go is an alias for `int32`. Given this underlying `int32` type, the `rune` type holds a signed 32-bit integer value. However, unlike an `int32` type, the integer value stored in a `rune` type represents a single Unicode character.

## Unicode and Unicode Code Points
Unicode is a superset of ASCII that represents characters by assigning a unique number to every character. This unique number is called a Unicode code point. Unicode aims to represent all the world's characters including various alphabets, numbers, symbols, and even emoji as Unicode code points.

In Go, the `rune` type represents a single Unicode code point.

The following table contains example Unicode characters along with their Unicode code point and decimal values:

| Unicode Character | Unicode Code Point | Decimal Value |
|-------------------|---------------------|---------------|
| 0                 | U+0030              | 48            |
| A                 | U+0041              | 65            |
| a                 | U+0061              | 97            |
| ¿                 | U+00BF              | 191           |
| π                 | U+03C0              | 960           |
| 🧠                | U+1F9E0             | 129504        |

## UTF-8
UTF-8 is a variable-width character encoding that is used to encode every Unicode code point as 1, 2, 3, or 4 bytes. Since a Unicode code point can be encoded as a maximum of 4 bytes, the `rune` type needs to be able to hold up to 4 bytes of data. That is why the `rune` type is an alias for `int32` as an `int32` type is capable of holding up to 4 bytes of data.

Go source code files are encoded using UTF-8.

## Using Runes
Variables of type `rune` are declared by placing a character inside single quotes:

```go
myRune := '¿'
```
Since rune is just an alias for int32, printing a rune's type will yield int32:
```go
myRune := '¿'
fmt.Printf("myRune type: %T\n", myRune)
// Output: myRune type: int32
```

Similarly, printing a rune's value will yield its integer (decimal) value:
```go
myRune := '¿'
fmt.Printf("myRune value: %v\n", myRune)
// Output: myRune value: 191
```
To print the Unicode character represented by the rune, use the %c formatting verb
```go
myRune := '¿'
fmt.Printf("myRune Unicode character: %c\n", myRune)
// Output: myRune Unicode character: ¿
```

To print the Unicode code point represented by the rune, use the %U formatting verb:
```go
myRune := '¿'
fmt.Printf("myRune Unicode code point: %U\n", myRune)
// Output: myRune Unicode code point: U+00BF
```

## Runes and Strings
Strings in Go are encoded using UTF-8 which means they contain Unicode characters. Since the rune type represents a Unicode character, a string in Go is often referred to as a sequence of runes. However, runes are stored as 1, 2, 3, or 4 bytes depending on the character. Due to this, strings are really just a sequence of bytes. In Go, slices are used to represent sequences and these slices can be iterated over using range.

Even though a string is just a slice of bytes, the range keyword iterates over a string's runes, not its bytes. In this example, the index variable represents the starting index of the current rune's byte sequence and the char variable represents the current rune:

```go
myString := "❗hello"
for index, char := range myString {
  fmt.Printf("Index: %d\tCharacter: %c\t\tCode Point: %U\n", index, char, char)
}
// Output:
// Index: 0	Character: ❗		Code Point: U+2757
// Index: 3	Character: h		Code Point: U+0068
// Index: 4	Character: e		Code Point: U+0065
// Index: 5	Character: l		Code Point: U+006C
// Index: 6	Character: l		Code Point: U+006C
// Index: 7	Character: o		Code Point: U+006F

```



# Understanding Slices and Runes in Go

## Why are the slice values like `[67 104 101 99 107 105 110 103 32 116 104 101 32 119 101 97 116 104 101 114 32 9728]`?

```go
    log := "Checking the weather ☀"
	// Convert the string to a slice of runes
	runes := []rune(log)
    // OUTPUT [67 104 101 99 107 105 110 103 32 116 104 101 32 119 101 97 116 104 101 114 32 9728]
```

When you convert a string to a slice of runes, you get a slice where each element represents a Unicode code point of the characters in the string. Each number in the slice is the Unicode code point (or the ASCII value for characters in the ASCII range) of the corresponding character in the string.

For example, if the string is `"Checking the weather ☀"`, converting it to a slice of runes would give you the Unicode code points for each character:
- 'C' is `67` (ASCII value and Unicode code point)
- 'h' is `104`
- 'e' is `101`
- 'c' is `99`
- 'k' is `107`
- 'i' is `105`
- 'n' is `110`
- 'g' is `103`
- ' ' (space) is `32`
- 't' is `116`
- 'h' is `104`
- 'e' is `101`
- ' ' (space) is `32`
- 'w' is `119`
- 'e' is `101`
- 'a' is `97`
- 't' is `116`
- 'h' is `104`
- 'e' is `101`
- 'r' is `114`
- ' ' (space) is `32`
- '☀' (the sun symbol) is `9728` (Unicode code point)

## What is each digit?

Each digit represents the Unicode code point of a character in the string. These code points are numerical representations of characters defined by the Unicode standard.

## Why are they like that even though the log is a string?

In Go, a string is essentially a sequence of bytes. When you convert a string to a slice of runes (`[]rune`), each rune represents a Unicode code point. This conversion ensures that each character, regardless of its byte length in UTF-8 encoding, is properly represented as a single element in the slice.

## What is a rune?

A `rune` in Go is an alias for `int32` and represents a Unicode code point. The term "rune" is used to emphasize that this type is meant to represent characters, not just integer values.

## Why are they used?

Runes are used to handle characters in a way that supports Unicode, ensuring that you can work with a wide range of characters from different languages and symbol sets. By using runes, you can:
- Accurately represent and manipulate individual characters, even those that require more than one byte in UTF-8.
- Iterate over characters in a string, rather than bytes, ensuring correct handling of multi-byte characters.

## Example: Working with Runes in Go

Let's go through an example to see how strings, runes, and slices interact in Go:

```go
package main

import (
	"fmt"
)

func main() {
	// Define a string containing both ASCII and non-ASCII characters
	log := "Checking the weather ☀"

	// Convert the string to a slice of runes
	runes := []rune(log)

	// Print the slice of runes
	fmt.Println("Runes:", runes)

	// Print each rune with its character and Unicode code point
	for _, r := range runes {
		fmt.Printf("Character: %c, Unicode: %U\n", r, r)
	}
}
