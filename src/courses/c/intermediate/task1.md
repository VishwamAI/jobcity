# C Programming Intermediate: Task 1

## Working with Arrays and Functions

In this task, you'll learn about arrays in C and how to use functions to manipulate them. We'll also touch on basic memory management concepts.

### Concepts Covered:
1. Array declaration and initialization
2. Passing arrays to functions
3. Dynamic memory allocation (malloc and free)
4. Pointer arithmetic

### Example Code:

```c
#include <stdio.h>
#include <stdlib.h>

// Function to find the maximum element in an array
int findMax(int arr[], int size) {
    int max = arr[0];
    for (int i = 1; i < size; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

int main() {
    int size;
    printf("Enter the size of the array: ");
    scanf("%d", &size);

    // Dynamically allocate memory for the array
    int *arr = (int *)malloc(size * sizeof(int));
    if (arr == NULL) {
        printf("Memory allocation failed\n");
        return 1;
    }

    // Input array elements
    printf("Enter %d integers:\n", size);
    for (int i = 0; i < size; i++) {
        scanf("%d", &arr[i]);
    }

    // Find and print the maximum element
    int max = findMax(arr, size);
    printf("The maximum element is: %d\n", max);

    // Free the dynamically allocated memory
    free(arr);

    return 0;
}
```

### Explanation:
- We define a function `findMax` that takes an array and its size as parameters.
- In `main`, we dynamically allocate memory for an array using `malloc`.
- We use a loop to input elements into the array.
- We call `findMax` to find the maximum element in the array.
- Finally, we free the dynamically allocated memory using `free`.

### Your Task:
Modify the program to find both the maximum and minimum elements in the array. Create a new function called `findMinMax` that takes the array, its size, and two pointers (for storing the min and max values) as parameters.

### Hints:
1. The `findMinMax` function should have the following prototype:
   ```c
   void findMinMax(int arr[], int size, int *min, int *max);
   ```
2. Use pointer dereferencing to update the min and max values in the function.
3. Remember to pass the addresses of your min and max variables when calling the function.

### Auto-coding Feature:
To get started, here's a template for your modified program:

```c
#include <stdio.h>
#include <stdlib.h>

// TODO: Implement the findMinMax function

int main() {
    int size;
    printf("Enter the size of the array: ");
    scanf("%d", &size);

    int *arr = (int *)malloc(size * sizeof(int));
    if (arr == NULL) {
        printf("Memory allocation failed\n");
        return 1;
    }

    printf("Enter %d integers:\n", size);
    for (int i = 0; i < size; i++) {
        scanf("%d", &arr[i]);
    }

    int min, max;
    // TODO: Call the findMinMax function

    // TODO: Print both the minimum and maximum elements

    free(arr);
    return 0;
}
```

Complete the TODOs to finish the task. Good luck!