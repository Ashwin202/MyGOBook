## Example
```go
package main

import (
	"fmt"
	"strconv"
)

// FancyNumber struct
type FancyNumber struct {
	n string
}

// Value method for FancyNumber
func (i FancyNumber) Value() string {
	return i.n
}

// FancyNumberBox interface
type FancyNumberBox interface {
	Value() string
}

// ExtractFancyNumber should return the integer value for a FancyNumber
// and 0 if any other FancyNumberBox is supplied.
func ExtractFancyNumber(fnb FancyNumberBox) int {
	// Check if fnb is of type FancyNumber
	if fn, ok = fnb.(FancyNumber); ok {
		// Convert the string value to an integer
		if value, err := strconv.Atoi(fn.Value()); err == nil {
			return value
		}
	}
	return 0
}

// Example implementation of another type that implements FancyNumberBox
type AnotherFancyNumber struct {
	n string
}

// Value method for AnotherFancyNumber
func (i AnotherFancyNumber) Value() string {
	return i.n
}

func main() {
	fmt.Println(ExtractFancyNumber(FancyNumber{"10"}))       // Output: 10
	fmt.Println(ExtractFancyNumber(AnotherFancyNumber{"4"})) // Output: 0
}

```

### Type Assertion

A type assertion is used to retrieve the dynamic type of an interface value. If you have an interface value and you want to access the underlying concrete type, you use a type assertion. The syntax for a type assertion is:

```go
value, ok := interfaceValue.(ConcreteType)
```

Here’s what each part means:
- `interfaceValue`: The value of the interface type you have.
- `ConcreteType`: The specific type you believe `interfaceValue` holds.
- `value`: The variable to which the underlying concrete value is assigned if the assertion succeeds.
- `ok`: A boolean that indicates whether the assertion was successful (`true` if the type assertion succeeded, `false` otherwise).

### Applying it to Your Example

In the function `ExtractFancyNumber`, we want to check if the `FancyNumberBox` is actually a `FancyNumber`. If it is, we extract its value and convert it to an integer. If it is not, we return 0.

Here’s the `ExtractFancyNumber` function explained step-by-step:

1. **Defining the Function:**
   ```go
   func ExtractFancyNumber(fnb FancyNumberBox) int {
   ```
   This function takes an argument `fnb` which is of the interface type `FancyNumberBox` and returns an `int`.

2. **Type Assertion:**
   ```go
   if fn, ok := fnb.(FancyNumber); ok {
   ```
   Here:
   - `fnb.(FancyNumber)`: This tries to assert that `fnb` is of type `FancyNumber`.
   - `fn`: This is the variable where the value will be stored if the assertion succeeds.
   - `ok`: This is a boolean that will be `true` if `fnb` is indeed of type `FancyNumber`, and `false` otherwise.

3. **Checking the Assertion:**
   ```go
   if ok {
   ```
   If `ok` is `true`, it means `fnb` was of type `FancyNumber`.

4. **Extracting and Converting the Value:**
   ```go
   if value, err := strconv.Atoi(fn.Value()); err == nil {
       return value
   }
   ```
   - `fn.Value()`: Calls the `Value` method on `fn`, which is a `FancyNumber`, to get the string value.
   - `strconv.Atoi(fn.Value())`: Converts the string value to an integer.
   - If the conversion is successful (`err == nil`), it returns the integer value.

5. **Returning 0 for Other Types:**
   ```go
   return 0
   ```
   If `fnb` is not of type `FancyNumber` or if the string to integer conversion fails, the function returns 0.

### Complete Function

Here is the complete function with comments for clarity:

```go
package main

import (
	"fmt"
	"strconv"
)

// FancyNumber struct
type FancyNumber struct {
	n string
}

// Value method for FancyNumber
func (i FancyNumber) Value() string {
	return i.n
}

// FancyNumberBox interface
type FancyNumberBox interface {
	Value() string
}

// ExtractFancyNumber should return the integer value for a FancyNumber
// and 0 if any other FancyNumberBox is supplied.
func ExtractFancyNumber(fnb FancyNumberBox) int {
	// Check if fnb is of type FancyNumber
	if fn, ok := fnb.(FancyNumber); ok {
		// Convert the string value to an integer
		if value, err := strconv.Atoi(fn.Value()); err == nil {
			return value
		}
	}
	return 0
}

// Example implementation of another type that implements FancyNumberBox
type AnotherFancyNumber struct {
	n string
}

// Value method for AnotherFancyNumber
func (i AnotherFancyNumber) Value() string {
	return i.n
}

func main() {
	fmt.Println(ExtractFancyNumber(FancyNumber{"10"}))       // Output: 10
	fmt.Println(ExtractFancyNumber(AnotherFancyNumber{"4"})) // Output: 0
}
```

### Summary
- **Type Assertion**: Used to check if an interface value holds a specific type.
- **Usage in `ExtractFancyNumber`**: To determine if `FancyNumberBox` is a `FancyNumber` and extract its integer value.
- **Fallback to 0**: If the type assertion fails or the conversion fails, return 0.

# Questions:

### 1. What is a Dynamic Type?

In Go, an interface can hold any value that implements the interface. The dynamic type of an interface is the actual type of the value that the interface holds at runtime.

**Example:**

```go
var i interface{}
i = 42              // Dynamic type is int
fmt.Println(i)      // Output: 42

i = "hello"         // Dynamic type is string
fmt.Println(i)      // Output: hello
```

Here, `i` is an empty interface (`interface{}`), which means it can hold any type. The dynamic type changes from `int` to `string`.

### 2. Where Are Dynamic Types Used?

Dynamic types are used when you want to write functions that can work with values of any type, typically through interfaces.

**Example:**

The `fmt.Print` function can accept any value because it uses an empty interface:

```go
fmt.Println(42)     // int
fmt.Println("hi")   // string
fmt.Println(true)   // bool
```

### 3. When to Use Interfaces

Use interfaces when you want to define behavior (methods) that multiple types can implement.

**Example:**

You might have different types that represent different kinds of shapes, but they all have an area:

```go
type Shape interface {
    Area() float64
}

type Circle struct {
    Radius float64
}

func (c Circle) Area() float64 {
    return math.Pi * c.Radius * c.Radius
}

type Rectangle struct {
    Width, Height float64
}

func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}
```

Now, you can write a function that works with any `Shape`:

```go
func PrintArea(s Shape) {
    fmt.Println(s.Area())
}
```

### 4. Where Should We Use Type Assertion in Real-Life Example?

Type assertions are used when you have an interface value and you need to access the underlying concrete value.

**Example:**

Suppose you have a function that takes an `interface{}` and you want to perform different actions based on the actual type:

```go
func Describe(i interface{}) {
    switch v := i.(type) {
    case int:
        fmt.Printf("Twice %v is %v\n", v, v*2)
    case string:
        fmt.Printf("%q is %v bytes long\n", v, len(v))
    default:
        fmt.Printf("I don't know about type %T!\n", v)
    }
}

Describe(21)          // Output: Twice 21 is 42
Describe("hello")     // Output: "hello" is 5 bytes long
Describe(true)        // Output: I don't know about type bool!
```

### 5. How Can a Parameter Be of Type FancyNumberBox Which Is an Interface?

In Go, an interface type parameter can hold any value that implements the interface.

**Example:**

```go
type FancyNumberBox interface {
    Value() string
}

type FancyNumber struct {
    n string
}

func (i FancyNumber) Value() string {
    return i.n
}

func ExtractFancyNumber(fnb FancyNumberBox) int {
    if fn, ok := fnb.(FancyNumber); ok {
        value, _ := strconv.Atoi(fn.Value())
        return value
    }
    return 0
}
```

Here, `ExtractFancyNumber` takes a parameter of type `FancyNumberBox`. `FancyNumber` implements `FancyNumberBox`, so you can pass a `FancyNumber` to `ExtractFancyNumber`.

### Summary

- **Dynamic Type**: The actual type of a value held by an interface at runtime.
- **Use of Dynamic Types**: In functions that need to work with values of any type.
- **When to Use Interfaces**: When you want to define behavior that multiple types can implement.
- **Use of Type Assertion**: When you need to access the concrete value stored in an interface.
- **Interface as Parameter**: An interface type parameter can hold any value that implements the interface.

These concepts are essential for designing flexible and reusable code in Go.