# Python Programming Basics: Task 1

## Introduction to Variables and Basic Input/Output

In this task, you'll learn about the basic structure of a Python program, how to declare variables, and how to perform simple input and output operations.

### Concepts Covered:
1. Variables and data types
2. Print() function for output
3. Input() function for input
4. Basic string formatting

### Example Code:

```python
# Getting user input
name = input("Enter your name: ")
age = int(input("Enter your age: "))
height = float(input("Enter your height in meters: "))

# Displaying the input
print(f"Hello, {name}! You are {age} years old and {height:.2f} meters tall.")
```

### Explanation:
- We use `input()` to get user input as a string.
- `int()` and `float()` are used to convert the input to the appropriate data type.
- The `f"..."` syntax is an f-string, which allows us to embed variables directly in the string.
- `.2f` in the f-string formats the float to display only 2 decimal places.

### Your Task:
Modify the program to also ask for and display the user's favorite color. Then, create a sentence using all the information collected.

### Hints:
1. Use another `input()` call to get the favorite color.
2. You can use multiple `print()` statements or combine all the information into one f-string.
3. Remember that input() always returns a string, so you don't need to convert the color.

### Auto-coding Feature:
To get started, here's a template for your modified program:

```python
# TODO: Get user input for name, age, height, and favorite color

# TODO: Create a sentence using all the collected information

# TODO: Print the sentence
```

Complete the TODOs to finish the task. Good luck!
