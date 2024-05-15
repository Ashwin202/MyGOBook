package maps

import "fmt"

func Maps() { // They are similar to objects in js
    // Declaring map
    // var myMap map[string]int
    myMap := make(map[string]int) //key string and value int. make us used to initialize a map. Without map we can use:
    // myMap := map[string]int{
    //     "one": 1,
    // }
    myMap["one"] = 1
    myMap["two"] = 2

    delete(myMap, "one")
    val, isFound := myMap["one"] //To find whether the valueis present or not. isFound is a boolean

    fmt.Println(myMap)
    fmt.Println(myMap["one"], val, isFound) //0 0 false


    //  Loops in map
    for key, value := range myMap {
        fmt.Println(key, value)
    }

    // map with no value:

    mapStruct := map[string]struct{}{"s1":{}, "s2":{}, "s3":{}, "s4":{}}
    _, ok := mapStruct["s1"] // lookup speed of this is very fast comapred to slice of ["s1", "s2", "s3", "s4"]
    fmt.Println(mapStruct, ok)
}