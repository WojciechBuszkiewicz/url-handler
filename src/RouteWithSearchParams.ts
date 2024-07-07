import { type LinkParamsData, Route } from "./Route";
import {
  RouteSearchParams,
  type SerachParams,
  type ParseSearchParams,
} from "./RouteSearchParams";

export class RouteWithSearchParams<
  T extends `/${string}`,
  const P extends SerachParams,
> extends Route<T> {
  searchParams;

  constructor(route: T, searchParams: P) {
    super(route);
    this.searchParams = new RouteSearchParams(searchParams);
  }

  getSearchParams() {
    return this.searchParams;
  }

  createLinkWithSearchParams(
    params: LinkParamsData<T>,
    searchParams: Partial<ParseSearchParams<P>>,
  ) {
    return `${this.createLink(params)}?${this.searchParams.createSearchParams(
      searchParams,
    )}`;
  }
}
