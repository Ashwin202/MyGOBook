package projects

import (
	"fmt"
	"time"
)

func calculateAge(birthDate time.Time) int {
	currentDate := time.Now()
	yearVal := currentDate.Year() - birthDate.Year()
	if currentDate.Month() < birthDate.Month() {
		yearVal = yearVal - 1
	}
	return yearVal
}

func CliApp() {
	var dob string
	p := fmt.Println
	pf := fmt.Printf
	p("Enter your date of birth in yyyy-mm-dd format")
	fmt.Scanln(&dob)
	date, err := time.Parse("2006-01-02", dob)
	if err != nil {
		panic(err)
	}
	age := calculateAge(date)
	pf("Your Age is : %v", age)

}
