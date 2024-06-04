---
title: "Multithreading in Node.js"
date: "2022-06-04"
author: "Volodymyr Loban"
---
Multithreading in Node.js is an interesting topic because Node.js is traditionally single-threaded, using
an event-driven, non-blocking I/O model. However, Node.js does provide ways to utilize multiple threads for concurrent
processing. Here are the primary methods for achieving multithreading in Node.js:

## 1. Worker Threads

Node.js introduced **worker_threads** in version 10.5.0 as an experimental feature and made it stable in version 12.0.0.
The
**worker_threads** module enables the use of threads that execute JavaScript in parallel, which is useful for
CPU-intensive
operations.

Here’s a basic example of how to use Worker Threads:

```typescript

// main.js
const {Worker} = require('worker_threads');

function runService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', {workerData});
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

runService('some data')
  .then(result => console.log(result))
  .catch(err => console.error(err));

// worker.js
const {parentPort, workerData} = require('worker_threads');

// Perform some CPU-intensive task
const result = heavyComputation(workerData);

parentPort.postMessage(result);

function heavyComputation(data) {
// Simulate heavy computation
  return data.split('').reverse().join('');
}

```

## 2. Clustering

The **cluster** module allows you to create child processes (workers) that share the same server port, enabling you to
distribute the load across multiple processes. This is especially useful for web servers.

Here’s an example of using the **cluster** module:

```typescript
// master.js
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

// Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
// Workers can share any TCP connection
// In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
```

## 3. Child Processes

The **child_process** module allows you to spawn new processes and communicate with them. This can be used for parallel
execution of tasks.

Here’s an example of using the typescript **child_process** module:

```typescript
const {fork} = require('child_process');

const forked = fork('child.js');

forked.on('message', (msg) => {
  console.log('Message from child', msg);
});

forked.send({hello: 'world'});

// child.js
process.on('message', (msg) => {
  console.log('Message from parent:', msg);
  process.send({foo: 'bar'});
});
```

## Choosing the Right Approach

- **Worker Threads:** Best for CPU-intensive tasks that can be executed in parallel.
- **Clustering:** Suitable for scaling web servers across multiple CPU cores.
- **Child Processes:** Useful for parallel execution of separate programs or scripts.

Each of these methods has its own use cases and performance characteristics, so the right choice depends on the specific
requirements of your application.






