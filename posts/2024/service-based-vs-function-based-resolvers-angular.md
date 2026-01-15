---
title: "Service-based VS Function-based Resolvers in Angular"
date: "2024-06-21"
author: "Volodymyr Loban"
---

In this article, we will compare two different approaches to creating resolvers in Angular using the management of meta tags as our example. Managing meta tags in Angular is essential for enhancing SEO and improving user experience. Meta tags help search engines understand your content and improve site visibility in search results. Angular offers multiple ways to handle meta tags, and in this article, we'll compare two approaches: a service-based resolver and a function-based resolver. We'll discuss their advantages, disadvantages, and use cases, providing practical insights to help you choose the best method for your application.

## 1. Service-based Resolver

```typescript
@Injectable({
  providedIn: 'root'
})
export class MetaTagsResolverService implements Resolve<any> {
  constructor(private meta: Meta, private title: Title) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const metaTags = route.data.meta || {};
    this.updateMetaTags(metaTags);
    return of(true);
  }

  updateMetaTags(metaTags: { [key: string]: string }) {
    if (metaTags.title) {
      this.title.setTitle(metaTags.title);
    }
    Object.keys(metaTags).forEach(key => {
      if (key !== 'title') {
        this.meta.updateTag({ name: key, content: metaTags[key] });
      }
    });
  }
}
```

## 2. Function-based Resolver

```typescript
export function metaTagsResolver(route: ActivatedRouteSnapshot): Observable<boolean> {
  const titleService = inject(Title);
  const metaTagService = inject(Meta);
  const title: string | undefined = route.data['title'];
  const keywords: MetaDefinition | undefined = route.data['keywords'];

  if (title) {
      titleService.setTitle(title);
  }
  if (keywords) {
      metaTagService.updateTag(keywords);
  }
  return of(true);
}
```

## Comparison

### Service-based Resolver

**Advantages:**

- **Encapsulation:** The logic for updating meta tags is encapsulated within a dedicated service, making it easy to manage and test.
- **Dependency Injection:** Angular's dependency injection system is used to inject the Meta and Title services.
- **Extensibility:** The service can be easily extended with additional methods or functionality as needed.
- **Readability:** Clear separation of concerns with a dedicated class for handling meta tags.

**Disadvantages:**

- **Boilerplate:** Slightly more boilerplate code compared to the function-based resolver.
- **Singleton:** The service is a singleton, which might not be necessary for simple meta tag updates.

### Function-based Resolver

**Advantages:**

- **Simplicity:** The function-based resolver is more concise and involves less boilerplate code.
- **Direct Injection:** Uses the `inject` function to directly obtain the services, making the code shorter and more straightforward.

**Disadvantages:**

- **Limited Extensibility:** Adding additional functionality or methods might make the function more complex and harder to manage.
- **Testability:** Testing might be slightly more challenging since the logic is not encapsulated within a class.

## Use Cases

**Service-based Resolver:** This approach is better if you need a more structured and scalable solution. It is especially useful if the logic for meta tag updates might grow or if you plan to reuse the service in multiple places.

**Function-based Resolver:** This approach is suitable for simpler applications where you need a quick and straightforward solution. It's ideal for scenarios where the logic is unlikely to grow significantly.

## Conclusion

Both approaches are valid and can be used effectively depending on the complexity and requirements of your application. If you prefer a more structured and extensible approach, go with the service-based resolver. If you prefer a simpler and more concise solution, the function-based resolver is a good choice.
