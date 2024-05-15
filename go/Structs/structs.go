package structs

import "fmt"

type Student struct {
    name string
    age int
    marks struct {
        math int
        english int}
}

func (s Student) calcTotalMarks() int { // receiver function. Attaching func to a struct
    return s.marks.math + s.marks.english
}

func Structs() {

    var s Student
    s.name = "John"
    s.age = 24
    s.marks.math = 90
    s.marks.english = 95
    fmt.Println(s.calcTotalMarks())

}
