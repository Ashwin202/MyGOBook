package arrays

import "fmt"

func ArrayFn() {
    // Declaring an array
    var dummyArray [5]int // initialise all values as 0
    for i := 0; i < 5; i++ {
        dummyArray[i] = i
    }
    fmt.Println(dummyArray)
}