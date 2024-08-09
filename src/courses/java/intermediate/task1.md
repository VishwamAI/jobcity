# Java Programming Intermediate: Task 1

## Introduction to Java Collections Framework: ArrayList and HashMap

In this task, you'll learn about two important classes from the Java Collections Framework: ArrayList and HashMap. These classes provide dynamic data structures that are widely used in Java programming.

### Concepts Covered:
1. ArrayList: Dynamic array implementation
2. HashMap: Key-value pair storage
3. Basic operations on ArrayList and HashMap
4. Iterating through collections

### Example Code:

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class CollectionsExample {
    public static void main(String[] args) {
        // ArrayList example
        ArrayList<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");

        System.out.println("Fruits in the list:");
        for (String fruit : fruits) {
            System.out.println(fruit);
        }

        // HashMap example
        HashMap<String, Integer> fruitInventory = new HashMap<>();
        fruitInventory.put("Apple", 50);
        fruitInventory.put("Banana", 30);
        fruitInventory.put("Orange", 40);

        System.out.println("\nFruit inventory:");
        for (Map.Entry<String, Integer> entry : fruitInventory.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}
```

### Explanation:
- We create an `ArrayList` of strings to store fruit names.
- We use the `add()` method to add elements to the ArrayList.
- We iterate through the ArrayList using a for-each loop.
- We create a `HashMap` to store fruit names as keys and their quantities as values.
- We use the `put()` method to add key-value pairs to the HashMap.
- We iterate through the HashMap using its `entrySet()` and a for-each loop.

### Your Task:
Modify the program to add a new fruit to the ArrayList and update its quantity in the HashMap. Then, remove a fruit from both collections.

### Hints:
1. Use `ArrayList.add()` to add a new fruit and `HashMap.put()` to add or update its quantity.
2. Use `ArrayList.remove()` to remove a fruit by its name (string).
3. Use `HashMap.remove()` to remove a fruit from the inventory by its key (fruit name).

### Auto-coding Feature:
To get started, here's a template for your modified program:

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class CollectionsExample {
    public static void main(String[] args) {
        ArrayList<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");

        HashMap<String, Integer> fruitInventory = new HashMap<>();
        fruitInventory.put("Apple", 50);
        fruitInventory.put("Banana", 30);
        fruitInventory.put("Orange", 40);

        // TODO: Add a new fruit to the ArrayList and HashMap

        // TODO: Remove a fruit from both the ArrayList and HashMap

        // TODO: Print the updated ArrayList and HashMap
    }
}
```

Complete the TODOs to finish the task. Good luck!
