# Url-handler

The "url-handler" project was written to create type-safe links. It allows to handle paths with params and queries.

## Route usage/examples

```typescript
const route = new Route("/:lang/organizations/:organization-id");

route.createLink({ lang: "en", "organization-id": "organization-1" });

route.isCurrentPage("/test");
```

![alt route](https://raw.githubusercontent.com/WojciechBuszkiewicz/url-handler/main/assets/route.JPG)

## Search params usage/examples

```typescript
const searchParams = new RouteSearchParams({
  page: "number",
  category: ["category-1", "category-2"],
  search: "string",
});

searchParams.parseSearchParamsFromString(
  "category=category-1&page=5&search=test",
);

searchParams.repalceSearchParams("category=category-1&page=5&search=test", {
  category: "category-2",
});
```

![alt search-params](https://raw.githubusercontent.com/WojciechBuszkiewicz/url-handler/main/assets/search-params.JPG)

## Route with search param usage/examples

```typescript
const routeWithSearchParams = new RouteWithSearchParams(
  "/:lang/organizations/:organization-id",
  { page: "number", category: ["category-1"] },
);

routeWithSearchParams.createLinkWithSearchParams(
  {
    lang: "en",
    "organization-id": "organization-1",
  },
  { page: 5, category: "category-1" },
);
```

![alt route-with-search-params](https://github.com/WojciechBuszkiewicz/url-handler/blob/main/assets/route-with-search-params.JPG)
