---
title: "Clustering in Node.js"
date: "2024-09-22"
author: "Volodymyr Loban"
---

Clustering in Node.js allows you to create multiple child processes (workers) that share the same server port, enabling you to fully utilize a machine's CPU cores. By default, Node.js is single-threaded, which means it runs on a single CPU core. Clustering provides a way to run multiple instances of a Node.js application, distributing the load across all available CPU cores and improving the application's scalability and performance.

## How Clustering Works

- **Master Process:** The main Node.js process (master) forks multiple child processes (workers), each running a copy of the Node.js application.
- **Worker Processes:** Each worker process runs independently and has its own event loop. They share the same server port, and the operating system manages incoming connections, distributing them among the workers.
- **Inter-Process Communication:** The master process can communicate with workers via message passing, enabling the coordination of tasks and resource sharing.

## Use Case

Clustering is useful when you have a high number of incoming HTTP requests or other I/O-bound tasks. By leveraging multiple CPU cores, clustering helps handle more traffic and improves the throughput of the application.

## Basic Clustering Example

Here's a simple example that demonstrates how to set up clustering in a Node.js application:

### Example: Creating a Simple HTTP Server with Clustering

```javascript
const cluster = require('cluster');
const http = require('http');
const os = require('os');

if (cluster.isMaster) {
  // Get the number of CPU cores available
  const numCPUs = os.cpus().length;
  console.log(`Master process PID: ${process.pid}`);
  console.log(`Forking ${numCPUs} workers...`);
  
  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  // Listen for worker exit events
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Forking a new worker...`);
    cluster.fork();
  });
} else {
  // Worker processes handle incoming HTTP requests
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Handled by worker process PID: ${process.pid}\n`);
  }).listen(3000);
  
  console.log(`Worker process PID: ${process.pid} is running`);
}
```

## How This Code Works

### Master Process:

- Checks if the current process is the master using `cluster.isMaster`.
- Uses `os.cpus().length` to determine the number of CPU cores available.
- Forks workers equal to the number of CPU cores.
- Listens for the `exit` event to handle worker crashes, and forks a new worker if needed.

### Worker Process:

- Each worker runs an HTTP server that listens on port 3000.
- When a request is received, it responds with the PID of the worker handling the request.

## Running the Example

Run this code using:

```bash
node your-file-name.js
```

Open your browser and navigate to `http://localhost:3000`. Each time you refresh, you'll notice that different worker processes handle the request, as indicated by the PID displayed in the response.

## Important Points

- **Shared State:** Workers don't share memory. They run in separate processes, so you need to use inter-process communication (IPC) if you want to share state between them.
- **Sticky Sessions:** For applications requiring sticky sessions (e.g., WebSocket connections or sessions tied to a specific worker), additional setup is needed to ensure requests from the same client are handled by the same worker.
- **Fault Tolerance:** If a worker crashes, the master process can detect this and create a new worker, ensuring the application remains available.

## Advanced Example: Using Express with Clustering

Here's how you can implement clustering with an Express application:

### Clustering with Express

```javascript
const cluster = require('cluster');
const os = require('os');
const express = require('express');

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  console.log(`Master process PID: ${process.pid}`);
  console.log(`Forking ${numCPUs} workers...`);
  
  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Forking a new worker...`);
    cluster.fork();
  });
} else {
  const app = express();
  
  app.get('/', (req, res) => {
    res.send(`Hello from worker process PID: ${process.pid}`);
  });
  
  app.listen(3000, () => {
    console.log(`Worker process PID: ${process.pid} is running`);
  });
}
```

## When to Use Clustering

Clustering is ideal for:

- **CPU-bound tasks:** Applications that benefit from using multiple CPU cores.
- **High-concurrency web servers:** Applications that need to handle many simultaneous requests.

## Limitations

- **Memory Usage:** Each worker is a separate process with its own memory. More workers mean more memory consumption.
- **Not Suitable for CPU-intensive Tasks Alone:** For pure CPU-bound tasks, consider combining clustering with worker threads to offload computations.

![Clustering in Node.js](/assets/Clustering-in-node.js.png)

## Key Differences Between Clustering and Worker Threads

| Feature | Clustering | Worker Threads |
|---------|-----------|----------------|
| **Process Model** | Separate processes | Same process, different threads |
| **Memory** | Isolated memory per process | Shared memory (with SharedArrayBuffer) |
| **Communication** | IPC (Inter-Process Communication) | Message passing or shared memory |
| **Use Case** | I/O-bound tasks, web servers | CPU-intensive computations |
| **Overhead** | Higher (process creation) | Lower (thread creation) |
| **Fault Isolation** | High (process crash doesn't affect others) | Lower (thread crash can affect process) |

## Conclusion

By using clustering, you can significantly enhance the performance and scalability of Node.js applications, making full use of available hardware resources. Clustering is particularly effective for I/O-bound applications and high-concurrency web servers, allowing you to distribute the load across multiple CPU cores and improve overall application throughput.
