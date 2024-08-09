# C++ Programming Basics: Task 1

## Introduction to Variables and Basic Input/Output

In this task, you'll learn about the basic structure of a C++ program, how to declare variables, and how to perform simple input and output operations.

### Concepts Covered:
1. Basic program structure
2. Variables and data types
3. cout for output
4. cin for input

### Example Code:

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    // Declaring variables
    int age;
    double height;
    string name;

    // Prompting user for input
    cout << "Enter your name: ";
    getline(cin, name);

    cout << "Enter your age: ";
    cin >> age;

    cout << "Enter your height in meters: ";
    cin >> height;

    // Displaying the input
    cout << "Hello, " << name << "! You are " << age << " years old and "
         << height << " meters tall." << endl;

    return 0;
}
```

### Explanation:
- `#include <iostream>` includes the input/output stream library.
- `#include <string>` includes the string library for string manipulation.
- `using namespace std;` allows us to use cout and cin without std:: prefix.
- `int main()` is the main function where the program execution begins.
- We declare three variables: `name` (string), `age` (integer), and `height` (double).
- `cout <<` is used to display text and prompt the user.
- `cin >>` is used to read input from the user.
- `getline(cin, name);` is used to read a full line of text, including spaces.

### Your Task:
Modify the program to also ask for and display the user's favorite color. Use a string to store the color.

### Hints:
1. Declare a string variable for the color.
2. Use `getline(cin, color);` to read the color, as it might contain spaces.
3. Remember to clear the input buffer before using getline after cin >>.

### Auto-coding Feature:
To get started, here's a template for your modified program:

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    int age;
    double height;
    string name, color;

    cout << "Enter your name: ";
    getline(cin, name);

    cout << "Enter your age: ";
    cin >> age;

    cout << "Enter your height in meters: ";
    cin >> height;

    // TODO: Clear the input buffer here

    // TODO: Prompt for and read the user's favorite color

    // TODO: Display all the information including the favorite color

    return 0;
}
```

Complete the TODOs to finish the task. Good luck!
