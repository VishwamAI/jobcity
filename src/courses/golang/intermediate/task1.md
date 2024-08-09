# Golang Intermediate: Task 1

## Introduction to Concurrency with Goroutines and Channels

In this task, you'll learn about Go's powerful concurrency features: goroutines and channels. These concepts are fundamental to writing efficient, concurrent programs in Go.

### Concepts Covered:
1. Goroutines
2. Channels
3. Basic synchronization
4. Select statement

### Example Code:

```go
package main

import (
    "fmt"
    "time"
)

func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        fmt.Printf("Worker %d started job %d\n", id, j)
        time.Sleep(time.Second) // Simulate work
        fmt.Printf("Worker %d finished job %d\n", id, j)
        results <- j * 2
    }
}

func main() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)

    // Start three worker goroutines
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }

    // Send 5 jobs
    for j := 1; j <= 5; j++ {
        jobs <- j
    }
    close(jobs)

    // Collect results
    for a := 1; a <= 5; a++ {
        <-results
    }
}
```

### Explanation:
- We define a `worker` function that takes an ID, a channel for receiving jobs, and a channel for sending results.
- In `main`, we create buffered channels for jobs and results.
- We start three worker goroutines using the `go` keyword.
- We send 5 jobs to the `jobs` channel and then close it.
- We collect the results from the `results` channel.

### Your Task:
Modify the program to calculate the sum of all results returned by the workers. Use a separate goroutine to perform this calculation concurrently.

### Hints:
1. Create a new function to sum the results.
2. Use a `for` loop with a `select` statement to receive results and detect when all results have been processed.
3. Use a `done` channel to signal when the summing is complete.

### Auto-coding Feature:
To get started, here's a template for your modified program:

```go
package main

import (
    "fmt"
    "time"
)

func worker(id int, jobs <-chan int, results chan<- int) {
    // ... (keep the existing worker function)
}

// TODO: Implement a new function to sum the results

func main() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)
    // TODO: Create a 'done' channel

    // Start worker goroutines (keep existing code)

    // Send jobs (keep existing code)

    // TODO: Start a new goroutine to sum the results

    // TODO: Wait for the summing to complete and print the total
}
```

Complete the TODOs to finish the task. Good luck!
