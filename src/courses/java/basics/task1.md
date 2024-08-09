# Java Programming Basics: Task 1

## Introduction to Variables and Basic Input/Output

In this task, you'll learn about the basic structure of a Java program, how to declare variables, and how to perform simple input and output operations.

### Concepts Covered:
1. Basic program structure
2. Variables and data types
3. System.out.println() for output
4. Scanner class for input

### Example Code:

```java
import java.util.Scanner;

public class BasicInputOutput {
    public static void main(String[] args) {
        // Creating a Scanner object for input
        Scanner scanner = new Scanner(System.in);

        // Declaring variables
        int age;
        double height;

        // Prompting user for input
        System.out.print("Enter your age: ");
        age = scanner.nextInt();

        System.out.print("Enter your height in meters: ");
        height = scanner.nextDouble();

        // Displaying the input
        System.out.printf("You are %d years old and %.2f meters tall.%n", age, height);

        // Close the scanner
        scanner.close();
    }
}
```

### Explanation:
- `import java.util.Scanner;` imports the Scanner class for input.
- `public class BasicInputOutput` defines the class containing our main method.
- `public static void main(String[] args)` is the main method where program execution begins.
- We create a `Scanner` object to read input from the user.
- We declare two variables: `age` (int) and `height` (double).
- `System.out.print()` is used to display text and prompt the user.
- `scanner.nextInt()` and `scanner.nextDouble()` are used to read input from the user.
- `System.out.printf()` is used for formatted output.
- We close the scanner at the end to free up resources.

### Your Task:
Modify the program to also ask for and display the user's name. Use a String to store the name.

### Hints:
1. Declare a String variable for the name.
2. Use `scanner.nextLine()` to read a full line of text for the name.
3. Be careful when mixing `nextInt()` or `nextDouble()` with `nextLine()`. You might need an extra `nextLine()` to consume the newline character.

### Auto-coding Feature:
To get started, here's a template for your modified program:

```java
import java.util.Scanner;

public class BasicInputOutput {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int age;
        double height;
        String name;

        // TODO: Prompt for and read the user's name

        System.out.print("Enter your age: ");
        age = scanner.nextInt();

        System.out.print("Enter your height in meters: ");
        height = scanner.nextDouble();

        // TODO: Display all the information including the name

        scanner.close();
    }
}
```

Complete the TODOs to finish the task. Good luck!
