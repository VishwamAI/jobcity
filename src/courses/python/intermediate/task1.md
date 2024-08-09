# Python Programming Intermediate: Task 1

## Working with Data Structures: Lists, Dictionaries, and Set Operations

In this task, you'll learn about some of Python's built-in data structures and how to perform operations on them.

### Concepts Covered:
1. Lists and list comprehensions
2. Dictionaries and their methods
3. Set operations
4. Basic data manipulation

### Example Code:

```python
# List operations
numbers = [1, 2, 3, 4, 5]
squared = [x**2 for x in numbers]  # List comprehension
print("Squared numbers:", squared)

# Dictionary operations
student = {"name": "Alice", "age": 20, "grade": "A"}
student["course"] = "Python"  # Adding a new key-value pair
print("Student info:", student)

# Set operations
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}
union = set1.union(set2)
intersection = set1.intersection(set2)
print("Union:", union)
print("Intersection:", intersection)
```

### Explanation:
- We create a list `numbers` and use a list comprehension to create `squared`.
- We create a dictionary `student` and demonstrate how to add a new key-value pair.
- We create two sets and perform union and intersection operations on them.

### Your Task:
Create a program that manages a simple inventory system using a dictionary. The program should:
1. Initialize an inventory dictionary with at least 3 items and their quantities.
2. Allow the user to add a new item or update the quantity of an existing item.
3. Allow the user to remove an item from the inventory.
4. Display the current inventory.

### Hints:
1. Use a dictionary to store items as keys and their quantities as values.
2. Use the `input()` function to get user input for actions and item details.
3. Remember to handle cases where an item doesn't exist in the inventory.

### Auto-coding Feature:
To get started, here's a template for your program:

```python
def display_inventory(inventory):
    # TODO: Implement this function to display the inventory

def add_or_update_item(inventory, item, quantity):
    # TODO: Implement this function to add a new item or update an existing item's quantity

def remove_item(inventory, item):
    # TODO: Implement this function to remove an item from the inventory

# Initialize the inventory
inventory = {"apple": 5, "banana": 10, "orange": 7}

# Main program loop
while True:
    # TODO: Implement the main program loop to handle user input and call appropriate functions

    # TODO: Add option to exit the program
```

Complete the TODOs to finish the task. Good luck!
