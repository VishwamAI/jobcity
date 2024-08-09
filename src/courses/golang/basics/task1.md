# Golang Programming Basics: Task 1

## Introduction to Variables and Basic Input/Output

In this task, you'll learn about the basic structure of a Go program, how to declare variables, and how to perform simple input and output operations.

### Concepts Covered:
1. Basic program structure
2. Variables and data types
3. Fmt package for input/output
4. Basic error handling

### Example Code:

```go
package main

import (
    "fmt"
    "bufio"
    "os"
    "strconv"
    "strings"
)

func main() {
    // Creating a scanner for user input
    scanner := bufio.NewScanner(os.Stdin)

    // Declaring variables
    var age int
    var height float64

    // Prompting user for input
    fmt.Print("Enter your age: ")
    scanner.Scan()
    age, _ = strconv.Atoi(scanner.Text())

    fmt.Print("Enter your height in meters: ")
    scanner.Scan()
    height, _ = strconv.ParseFloat(scanner.Text(), 64)

    // Displaying the input
    fmt.Printf("You are %d years old and %.2f meters tall.\n", age, height)
}
```

### Explanation:
- `package main` declares the package name.
- We import necessary packages for input/output and conversions.
- `func main()` is the main function where the program execution begins.
- We use a `bufio.Scanner` to read user input.
- `strconv.Atoi()` converts a string to an integer.
- `strconv.ParseFloat()` converts a string to a float64.
- `fmt.Print()` is used to display text and prompt the user.
- `fmt.Printf()` is used for formatted output.

### Your Task:
Modify the program to also ask for and display the user's name. Use a string to store the name.

### Hints:
1. Use a string variable to store the name.
2. You can use `scanner.Scan()` followed by `scanner.Text()` to read a string input.
3. Use `fmt.Printf()` with `%s` format specifier to print the name.

### Auto-coding Feature:
To get started, here's a template for your modified program:

```go
package main

import (
    "fmt"
    "bufio"
    "os"
    "strconv"
)

func main() {
    scanner := bufio.NewScanner(os.Stdin)

    var age int
    var height float64
    var name string

    // TODO: Prompt for and read the user's name

    fmt.Print("Enter your age: ")
    scanner.Scan()
    age, _ = strconv.Atoi(scanner.Text())

    fmt.Print("Enter your height in meters: ")
    scanner.Scan()
    height, _ = strconv.ParseFloat(scanner.Text(), 64)

    // TODO: Display all the information including the name
}
```

Complete the TODOs to finish the task. Good luck!
