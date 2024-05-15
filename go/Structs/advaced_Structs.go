package structs

import "fmt"

// start of embedded Struct
type Dog struct {
    Animal Animal
}

type Animal struct {
    Name string
    Origin string
    Color string
}
// end of embedded Struct part

func AdvacedStructs() {
    anonymousStruct := struct {
		name string
		age  int
	}{}

//  alterantive
    // anonymousStruct := struct {
	// 	name string
	// 	age  int
	// }{
    //     name: "John",
    //     age:  24,
    // }

    // alternetaive way other that short hand method

	// var anonymousStruct struct {
	// 	name string
	// 	age  int
	// }

	anonymousStruct.name = "John"
	anonymousStruct.age = 24
	fmt.Println(anonymousStruct) //{John 24}


    // Embedded Structs

    d := Dog{}
    d.Animal.Name = "Tommy"

    fmt.Println(d)



}
