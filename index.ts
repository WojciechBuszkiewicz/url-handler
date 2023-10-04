import { Route } from "./src/Route";
import { RouteSearchParams } from "./src/RouteSearchParams";
import { RouteWithSearchParams } from "./src/RouteWithSearchParams";

const routeWithSearchParams = new RouteWithSearchParams(
  "/:lang",
  "page=number&search=string&category=category-1,category-2",
);

routeWithSearchParams.getLinkWithSearchParams({ lang: "en" }, { page: 5 });
