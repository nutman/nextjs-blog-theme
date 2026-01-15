---
title: "My Experience with CQRS and Node.js: What I Learned Building Scalable APIs"
date: "2025-01-15"
author: "Volodymyr Loban"
---

When I first heard of CQRS (Command–Query Responsibility Segregation), it sounded like another one of those architectural buzzwords developers throw around in system design interviews. But after hitting limitations in a growing Node.js project — especially around scaling, performance bottlenecks, and messy service logic — I decided to give CQRS a serious try.

What followed was a deep learning curve, a few frustrations, and eventually, a more maintainable and scalable backend. In this post, I'll share my experience implementing CQRS in a Node.js microservice, what worked, what didn't, and why I would (or wouldn't) recommend it.

![CQRS](/assets/CQRS.png)

## What Is CQRS in Simple Terms?

At its core, CQRS separates the read and write operations in your application into two distinct models:

- **Commands** mutate state — e.g., "CreateOrder", "UpdateProfile".
- **Queries** only read data — e.g., "GetOrderDetails", "ListProducts".

The idea is that reads and writes often have very different performance, scalability, and business logic requirements, so separating them helps you optimize each path independently.

This is not the same as CRUD — with CQRS, you explicitly model intent and responsibility, not just data operations.

## Why I Decided to Try CQRS in Node.js

The project was a moderately complex e-commerce API using Express and MongoDB. As new features piled on (discounts, promo codes, inventory management), we started facing issues:

- Controllers were bloated, mixing business logic, validation, and DB access.
- Read queries were slowing down as the schema got more complicated.
- Tests were brittle, since commands and queries were tightly coupled.

I had heard that CQRS improves testability, scalability, and clarity, so I decided to refactor a few key modules (starting with the Orders module) using this pattern.

## How I Structured CQRS in Node.js

I chose a clean folder structure that made the separation obvious:

```
/orders
  /commands
    - createOrderCommand.js
    - cancelOrderCommand.js
  /queries
    - getOrderByIdQuery.js
    - listOrdersByUserQuery.js
  /handlers
    - createOrderHandler.js
    - getOrderHandler.js
  order.controller.js
```

Each command and query had:

- **A DTO or payload:** just the data.
- **A handler:** the business logic.
- **A controller:** where the API receives the request and dispatches it to the correct handler.

The command handlers had full access to validation, events, and database writes. Query handlers used optimized read models (sometimes separate Mongo collections for views).

## Example: CreateOrder Command

### createOrderCommand.js

```javascript
class CreateOrderCommand {
  constructor({ userId, items, paymentMethod }) {
    this.userId = userId;
    this.items = items;
    this.paymentMethod = paymentMethod;
  }
}

module.exports = CreateOrderCommand;
```

### createOrderHandler.js

```javascript
import Order from '../models/Order';
import CreateOrderCommand from '../commands/createOrderCommand';

async function createOrderHandler(command = new CreateOrderCommand()) {
  // Validate input
  if (!command.userId || !command.items?.length) {
    throw new Error("Invalid order");
  }

  // Create and save order
  const order = new Order({
    userId: command.userId,
    items: command.items,
    status: 'pending',
    paymentMethod: command.paymentMethod
  });
  await order.save();
  return order;
}

module.exports = createOrderHandler;
```

### controller.js

```javascript
import CreateOrderCommand from './commands/createOrderCommand';
import createOrderHandler from './handlers/createOrderHandler';

app.post('/orders', async (req, res) => {
  const command = new CreateOrderCommand(req.body);
  const result = await createOrderHandler(command);
  res.status(201).json(result);
});
```

## Benefits I Noticed

### 1. Separation of concerns

Write logic (commands) and read logic (queries) were completely separate. This made the code more focused and much easier to test.

### 2. Faster read performance

I created denormalized read models (e.g., user order summaries) in separate collections — improving read performance by avoiding joins or aggregations.

### 3. Testability

Each command/query handler was a pure function (mostly). This made unit testing a breeze without spinning up the whole app or mocking HTTP.

### 4. Flexibility

Later on, I introduced message queues (RabbitMQ) to handle some commands asynchronously — CQRS made that transition smooth.

## Challenges and Trade-offs

❌ **More boilerplate**

Instead of one controller function, I had to create command classes, handlers, and routes separately. This was extra work for small features.

❌ **Overkill for simple modules**

For basic CRUD services (like managing product tags), CQRS felt like unnecessary complexity.

❌ **Debugging flow took longer**

It took new team members some time to get used to "where the logic lives" since things were now spread across handlers and folders.

## Tips for Using CQRS in Node.js

- **Don't go full CQRS on day one.** Start small — refactor one module (like Orders or Payments) to see the value.
- **Use dependency injection for your handlers** if your app is growing. It'll help with testing and maintainability.
- **Async commands love queues** — you can combine CQRS with messaging (e.g., Kafka, RabbitMQ) for more scalable event-driven systems.
- **Pair with event sourcing carefully.** CQRS ≠ event sourcing, but they can work well together — if you're ready for that level of complexity.

## Final Thoughts

Using CQRS in my Node.js project wasn't just a fun experiment — it was a real shift in how I thought about designing backend systems. It made our codebase cleaner, our services more scalable, and our development process more maintainable.

That said, CQRS is not a silver bullet. For simple APIs or CRUD-heavy apps, it's probably overkill. But for complex domains with lots of business logic, scaling needs, and multiple read/write paths, CQRS can be a game-changer.

👉 Have you tried CQRS with Node.js? Curious about combining it with event sourcing or microservices? Let me know in the comments!
