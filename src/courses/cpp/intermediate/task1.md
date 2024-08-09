# C++ Programming Intermediate: Task 1

## Introduction to Object-Oriented Programming: Classes and Objects

In this task, you'll learn about the fundamental concepts of object-oriented programming in C++, focusing on classes and objects.

### Concepts Covered:
1. Class definition
2. Object creation
3. Member functions
4. Access specifiers (public and private)

### Example Code:

```cpp
#include <iostream>
#include <string>
using namespace std;

class Student {
private:
    string name;
    int age;
    double gpa;

public:
    // Constructor
    Student(string n, int a, double g) : name(n), age(a), gpa(g) {}

    // Member functions
    void displayInfo() {
        cout << "Name: " << name << endl;
        cout << "Age: " << age << endl;
        cout << "GPA: " << gpa << endl;
    }

    void updateGPA(double newGPA) {
        gpa = newGPA;
        cout << "GPA updated to " << gpa << endl;
    }
};

int main() {
    // Creating an object of the Student class
    Student student1("Alice", 20, 3.8);

    // Calling member functions
    student1.displayInfo();
    student1.updateGPA(3.9);

    return 0;
}
```

### Explanation:
- We define a `Student` class with private member variables and public member functions.
- The constructor initializes the object's attributes.
- `displayInfo()` function prints the student's information.
- `updateGPA()` function allows updating the student's GPA.
- In `main()`, we create a `Student` object and call its member functions.

### Your Task:
Modify the `Student` class to include a new attribute `studentID` (string) and a method `changeID(string newID)` to update it. Also, update the constructor and `displayInfo()` method to include this new attribute.

### Hints:
1. Add `studentID` as a private member variable in the `Student` class.
2. Modify the constructor to accept and initialize `studentID`.
3. Create a new public method `changeID(string newID)` to update the `studentID`.
4. Update the `displayInfo()` method to also display the `studentID`.

### Auto-coding Feature:
To get started, here's a template for your modified `Student` class:

```cpp
class Student {
private:
    string name;
    int age;
    double gpa;
    // TODO: Add studentID member variable

public:
    // TODO: Update constructor to include studentID

    void displayInfo() {
        // TODO: Update to display studentID
    }

    void updateGPA(double newGPA) {
        gpa = newGPA;
        cout << "GPA updated to " << gpa << endl;
    }

    // TODO: Add changeID method
};
```

Complete the TODOs to finish the task. Remember to update the `main()` function to test your new functionality. Good luck!
