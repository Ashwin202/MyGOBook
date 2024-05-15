package loops

import "fmt"

func BasicLoops() {
    // Normal for loop
	for i := 0; i < 10; i++ { 
		fmt.Println(i)
	}

    // While loop
    j:=0
    for j<10{
        fmt.Println(j)
        j++
    }
}
