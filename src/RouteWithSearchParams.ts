import { Route, type RouteParams } from "./Route";
import { RouteSearchParams, type SearchParams } from "./RouteSearchParams";

export class RouteWithSearchParams<
  T extends `/${string}`,
  P extends string,
> extends Route<T> {
  searchParams;

  constructor(route: T, searchParams: P) {
    super(route);
    this.searchParams = new RouteSearchParams(searchParams);
  }

  getSearchParams() {
    return this.searchParams;
  }

  getLinkWithSearchParams(
    params: RouteParams<T>,
    searchParams: Partial<SearchParams<P>>,
  ) {
    return `${this.createLink(params)}?${this.searchParams.createSearchParams(
      searchParams,
    )}`;
  }
}
