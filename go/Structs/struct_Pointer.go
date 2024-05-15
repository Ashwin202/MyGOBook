package structs

import "fmt"

type bankDetails struct {
    bankName string
    accountNumber int
    interestRate float32
}

func calculateInterest(details *bankDetails) {
    details.interestRate += float32(0.02)
}

func StructPointer() {
iciciDetails := bankDetails{
    bankName: "ICICI",
    accountNumber: 123456,
    interestRate: 5,
}
calculateInterest(&iciciDetails)

fmt.Println(iciciDetails)
}
