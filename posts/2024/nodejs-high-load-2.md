---
title: "Node.js and High Load (Part 2)"
date: "2022-03-20"
author: "Volodymyr Loban"
---
In the previous [article](https://medium.com/@vloban/node-js-and-high-load-part-1-ba023806e72d), I provided an overview
of how high-load works in general. Now, we will take a closer look at how it looks when using Node.js. I will keep the
same sequence of chapters.

## Application Architecture:

It is important to use specific tools for specific tasks, such as using a screwdriver or saw for construction jobs
instead of a Swiss army knife. Let’s create a dedicated microservice using Node.js:

```typescript
// Import required modules
const express = require('express');

// Create an instance of Express
const app = express();

// Define a route for the microservice
app.get('/microservice', (req, res) => {
// Perform some logic for the microservice
  const data = {
    message: 'Response from the dedicated microservice',
    timestamp: new Date()
  };

  // Send the response
  res.json(data);
});

// Define the port number
const port = process.env.PORT || 4000;

// Start the server
app.listen(port, () => {
  console.log(`Microservice is running on port ${port}`);
});
```

We can create as many microservices as needed, and each one will be responsible for specific tasks.Now that we have the tools, who will use them ? Our construction worker, also known as the server, will use them:

```typescript
// Import required modules
const express = require('express');
const axios = require('axios');

// Create an instance of Express (like we did it before)
const app = express();

// Define routes where we will use microservice
app.get('/microservice-route', (req, res) => {
// Call Microservice
  axios.get('http://localhost:4000/microservice')
    .then(response => {
// Handle response from Microservice 1
      res.send(response.data);
    })
    .catch(error => {
// Handle error
      console.error('Error calling Microservice', error);
      res.status(500).send('Error calling Microservice');
    });
});

// Define a main route just to have it like general entrance
app.get('/', (req, res) => {
  res.send('Welcome to the server');
});

// Define the port number
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

We can now easily expand the app without worrying about any complex calculations that could potentially cause the main
server to stop working. Even if some operations fail, the main server will keep functioning. It’s worth noting that we
have a more affordable version of a separate microservice, such as a lambda function, worker, or cluster. Each option is
suitable for specific use cases.

## Load Balancing

This section is not about Node.js. Instead, we will run multiple instances of our Node.js application, configure Nginx
as a reverse proxy, configure load balancing in Nginx, and that’s it:

```typescript
http
{
  upstream
  nodejs_servers
  {
    server
    localhost:3000;
    server
    localhost:3001;
  }

  server
  {
    listen
    80;

    location / {
      proxy_pass http
  ://nodejs_servers;
    proxy_http_version
    1.1;
    proxy_set_header
    Upgrade
    $http_upgrade;
    proxy_set_header
    Connection
    'upgrade';
    proxy_set_header
    Host
    $host;
    proxy_cache_bypass
    $http_upgrade;
  }
  }
}
```

upstream nodejs_servers — defines a group of backend Node.js servers.
proxy_pass http://nodejs_servers — forwards incoming requests to one of the backend servers defined in the upstream
block.

## Horizontal Scaling

Horizontal scaling in Node.js involves adding more instances of your Node.js application across multiple servers to
handle increased traffic, improve performance, and ensure high availability. There are two main points to consider when
scaling horizontally in Node.js:

Stateless Architecture: The design of your Node.js application should be stateless or manage state externally. This
ensures that requests can be routed to any instance without relying on session affinity. External resources will be
needed for storing and managing stateful data.
Performance Optimization: It is essential to identify performance bottlenecks in your application and optimize them.
This may involve optimizing database queries, reducing I/O operations, caching frequently accessed data, or using
asynchronous operations to handle concurrency efficiently.

## Optimized Networking

“Optimized Networking” does not only refer to Node.js being used in high load scenarios. Although Node.js is efficient
at handling networking tasks, optimizing networking involves many aspects beyond just the Node.js application layer.

Optimized networking includes all the components and configurations involved in communication between different parts of
your application, external services, and end-users.

## Memory Caching

Caching is a useful method to improve performance and reduce latency for frequently accessed data. There are various
tools available for caching like npm modules or third-party solutions such as Redis or Memcached. For instance, Redis
can be used to cache data:

```typescript
// Import required modules
const express = require('express');
const redis = require('redis');

// Create an instance of Express
const app = express();

// Create a Redis client
const redisClient = redis.createClient({
  host: 'localhost', // Redis server host
  port: 6379, // Redis server port
// Add other Redis client options as needed
});

// Middleware to handle caching
const cacheMiddleware = (req, res, next) => {
  const userId = req.params.id;

  // Check if data is present in Redis cache
  redisClient.get(userId, (err, cachedData) => {
    if (err) {
      console.error('Error fetching from Redis cache:', err);
      return next();
    }

    if (cachedData !== null) {
      // Data found in cache, return cached data
      console.log('Data found in Redis cache:', cachedData);
      return res.json(JSON.parse(cachedData));
    }

    // Data not found in cache, continue to next middleware
    next();
  });
};

// Define a route to fetch user data
app.get('/user/:id', cacheMiddleware, (req, res) => {
  const userId = req.params.id;

  // Simulate fetching user data from a database or external API
  // For demonstration, generate mock user data
  const userData = {
    id: userId,
    name: `User ${userId}`,
    email: `user${userId}@example.com`
  };

  // Store fetched data in Redis cache with a TTL (time-to-live) of 5 minutes
  redisClient.setex(userId, 300, JSON.stringify(userData));

  // Return fetched user data
  console.log('Data not found in cache, fetching from source:', userData);
  res.json(userData);
});

// Define the port number
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

## Database Optimization

From a Node.js perspective, I would like to list some options for optimizing the database:

Optimize database queries by identifying slow ones with tools like query analyzers or ORMs and ensuring they utilize
indexes effectively.
Implementing connection pooling can improve database connection efficiency by reducing overhead of establishing and
tearing down connections for each request thereby reducing latency and increasing throughput.
Group multiple database operations into a single transaction or batch to minimize round-trips and improve efficiency.
It is recommended to use asynchronous database drivers or libraries in Node.js applications to handle database
operations asynchronously. This allows the application to continue processing other tasks while waiting for database
responses, thereby improving concurrency and performance.
It is recommended to utilize asynchronous database drivers or libraries in Node.js applications to handle database
operations asynchronously. Doing so allows the application to continue processing other tasks while waiting for database
responses, thereby improving concurrency and performance.

Non-Optimized Query:

```sql
SELECT *
FROM users
WHERE username = 'example_user';
```

Optimized Query:

```sql
SELECT id, username, email
FROM users
WHERE username = 'example_user';
```

In this optimized query, we have specified only the essential columns (id, username, email) from the users table that
need to be retrieved. By selecting only the necessary columns, we can reduce the amount of data that needs to be
transferred between the database and the application. As a result, this improves the query performance significantly.

## Performance Optimization

In my experience, optimizing performance depends on the unique case at hand. However, there are some general steps that
can be taken to avoid mistakes. Firstly, use efficient data structures and algorithms to minimize time and space
complexity. Secondly, profile your code to identify performance bottlenecks and optimize critical sections. Thirdly,
always check the dependencies you are using. Fourthly, review and optimize middleware functions to minimize overhead and
improve performance. Lastly, monitor memory usage and avoid memory leaks by properly managing resources, closing
connections, and releasing memory when it is no longer needed.

## Asynchronous Processing

In handling high-load scenarios in Node.js, it’s crucial to employ a combination of approaches for asynchronous
processing. Utilize event-driven architecture, leveraging Node.js’s EventEmitter or frameworks like Socket.IO or
RabbitMQ for efficient event-based communication. Opt for non-blocking I/O operations to prevent event loop blockages,
while embracing Promises and async/await syntax for more readable asynchronous code. Implement concurrency control
mechanisms such as connection pooling and request throttling, and break down tasks for parallel processing using
Node.js’s cluster module or worker threads. Integrate a message queue system like RabbitMQ or Kafka for queue-based
processing, prioritizing tasks and managing retries. Offload long-running tasks to background jobs or worker processes
with tools like Bull or Agenda, and ensure robust error handling and monitoring for graceful error recovery and scaling
decisions based on performance metrics.

And some code with RabbitMQ usage to reflect the slide:

Send to the queue:

```typescript
import amqp from 'amqplib/callback_api';

amqp.connect('amqp://localhost', (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }
    const queue = 'hello';
    const msg = 'Hello World!';
    channel.assertQueue(queue, {
      durable: false
    });
    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
});
```

Receive from the queue:

```typescript
import * as amqp from 'amqplib/callback_api';

amqp.connect('amqp://localhost', (error0: Error, connection: amqp.Connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1: Error, channel: amqp.Channel) {
    if (error1) {
      throw error1;
    }
    const queue = 'hello';
    channel.assertQueue(queue, {
      durable: false
    });
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    channel.consume(queue, (msg: amqp.Message) => {
      console.log(" [x] Received %s", msg.content.toString());
    }, {
      noAck: true
    });
  });
});
```

## Monitoring and Alerting

To effectively monitor a high-load Node.js application, it is important to collect key metrics such as CPU usage, memory
consumption, and response times. You can use tools such as Prometheus or New Relic to gather these metrics. It is also
recommended to implement structured logging for detailed event capture, and send logs to platforms such as
Elasticsearch. To visualize the collected metrics, you can set up real-time dashboards using Grafana. Additionally, it
is important to define alerting rules for timely issue detection via Slack or email. Conducting performance profiling
can help you identify bottlenecks, while integrating error tracking with tools like Sentry can aid in analysis.

```typescript
const prometheus = require('prom-client');

// Enable collection of default metrics
prometheus.collectDefaultMetrics();

function metricsMiddleware(req, res, next) {
  if (req.path === '/metrics') {
    res.set('Content-Type', prometheus.register.contentType);
    return res.end(prometheus.register.metrics());
  }
  next();
}
```

Don’t forget to set up the alerting system. I decided not to bother you with the .yml configuration file.

## Security and Compliance

Securing a Node.js application involves implementing measures such as authentication, input validation, security
headers, dependency updates, data encryption, incident response, and continuous improvement to ensure compliance with
security standards.

And some code examples.

Authorization:

```typescript
import jwt from 'jsonwebtoken';

const secret = "secret";

function authorize(req: any, res: any, next: any) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({message: 'Access denied. No token provided.'});
  }
  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({message: 'Invalid token.'});
    }
    req.user = decoded;
    next();
  });
}

export default authorize;
```

Validation:

```typescript
import { Request, Response, NextFunction } from 'express';
import { validationResult, Result } from 'express-validator';

function validateInputs(req: Request, res: Response, next: NextFunction): void {
  const errors: Result = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  next();
}

export default validateInputs;
```

Encryption:

```typescript
const crypto = require('crypto');
const encryptionKey = 'encryptionKey';

// Function to encrypt data
function encryptData(data) {
  const cipher = crypto.createCipher('aes-256-cbc', encryptionKey);
  let encryptedData = cipher.update(data, 'utf8', 'hex');
  encryptedData += cipher.final('hex');
  return encryptedData;
}

// Function to decrypt data
function decryptData(encryptedData) {
  const decipher = crypto.createDecipher('aes-256-cbc', encryptionKey);
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
}

// Example usage
const sensitiveData = 'This is my sensitive data';
const encrypted = encryptData(sensitiveData);
console.log('Encrypted:', encrypted);

const decrypted = decryptData(encrypted);
// Check result of encryption
console.log('Decrypted:', decrypted);
```

Conclusion:

Here is an overview of the technical aspects related to Node.js. When discussing performance and efficiency, it can be
challenging because it depends not only on the requests per second (RPS), but also on the number of connections and
latency. Additionally, the unique business logic of each project can also impact the performance of our high load
system. For now, I will not combine everything together, but I may do so in the next chapter.
