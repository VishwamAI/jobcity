# C Programming Basics: Task 1

## Introduction to Variables and Basic Input/Output

In this task, you'll learn about the basic structure of a C program, how to declare variables, and how to perform simple input and output operations.

### Concepts Covered:
1. Basic program structure
2. Variables and data types
3. Printf() function for output
4. Scanf() function for input

### Example Code:

```c
#include <stdio.h>

int main() {
    // Declaring variables
    int age;
    float height;

    // Prompting user for input
    printf("Enter your age: ");
    scanf("%d", &age);

    printf("Enter your height in meters: ");
    scanf("%f", &height);

    // Displaying the input
    printf("You are %d years old and %.2f meters tall.\n", age, height);

    return 0;
}
```

### Explanation:
- `#include <stdio.h>` includes the standard input/output library.
- `int main()` is the main function where the program execution begins.
- We declare two variables: `age` (integer) and `height` (float).
- `printf()` is used to display text and prompt the user.
- `scanf()` is used to read input from the user.
- `%d` is the format specifier for integers, and `%f` is for floats.
- The `&` symbol before variables in `scanf()` is the address-of operator.

### Your Task:
Modify the program to also ask for and display the user's name. Use a character array (string) to store the name.

### Hints:
1. Declare a character array like this: `char name[50];`
2. Use `%s` as the format specifier for strings in `scanf()` and `printf()`.
3. When using `scanf()` for strings, you don't need the `&` symbol.

### Auto-coding Feature:
To get started, here's a template for your modified program:

```c
#include <stdio.h>

int main() {
    int age;
    float height;
    char name[50];

    // TODO: Prompt for and read the user's name

    printf("Enter your age: ");
    scanf("%d", &age);

    printf("Enter your height in meters: ");
    scanf("%f", &height);

    // TODO: Display all the information including the name

    return 0;
}
```

Complete the TODOs to finish the task. Good luck!
