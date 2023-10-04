type MergeIfNotUndefined<
  Value,
  ValueToMerge extends string,
> = Value extends Record<infer P, string>
  ? Record<P | ValueToMerge, string>
  : Record<ValueToMerge, string>;

export type RouteParams<
  T extends string,
  Params = undefined,
> = T extends `/:${infer A}/${infer B}`
  ? RouteParams<`/${B}`, MergeIfNotUndefined<Params, A>>
  : T extends `/:${infer C}`
  ? MergeIfNotUndefined<Params, C>
  : T extends `/${string}/${infer D}`
  ? RouteParams<`/${D}`, Params>
  : Params;

export class Route<T extends `/${string}`> {
  constructor(private readonly path: T) {}

  createLink(params: RouteParams<T>) {
    if (!params) {
      return this.path;
    }

    const paramRegex = /:[A-Za-z0-9_-]+/g;

    const replacedUrl = this.path.replace(paramRegex, (match) => {
      const paramKey = match.slice(1) as keyof typeof params;

      const replacementValue = params[paramKey] || match;

      return replacementValue;
    });

    return replacedUrl;
  }

  isCurrentPage(currentPath: string) {
    const splitedPath = this.path.split("/");
    const currentSplittedPath = currentPath.split("?")[0].split("/");

    if (splitedPath.length !== currentSplittedPath.length) {
      return false;
    }

    return splitedPath.every((slice, index) => {
      if (
        (slice.startsWith(":") && currentSplittedPath[index]) ||
        slice === currentSplittedPath[index]
      ) {
        return true;
      }
      return false;
    });
  }

  createSublink<P extends `/${string}`>(subPath: P): `${T}${P}` {
    return `${this.path}${subPath}`;
  }
}
