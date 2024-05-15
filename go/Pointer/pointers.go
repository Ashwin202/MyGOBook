package pointers
import "fmt"

func BasicPointers() {
    testVar := 10

    // Another way to declare
    // var testPointer *int
    // testPointer = &testVar

    testPointer := &testVar // combined declaration

    fmt.Println(testPointer) //0xc000180000
}

