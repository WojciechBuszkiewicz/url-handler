type GetLiteralValues<T, Values = undefined> = T extends `${infer P},${infer T}`
  ? GetLiteralValues<T, P | Values>
  : T extends string
  ? Exclude<T | Values, undefined>
  : never;

type GetSearchParamType<T> = T extends "string"
  ? string
  : T extends "number"
  ? number
  : GetLiteralValues<T>;

type SplitSearchParamKeyAndValue<
  T,
  P = {},
> = T extends `${infer Key}=${infer Value}`
  ? P & { [Type in Key]: GetSearchParamType<Value> }
  : never;

export type SearchParams<
  T extends string,
  Params = {},
> = T extends `${infer P}&${infer K}`
  ? SearchParams<K, SplitSearchParamKeyAndValue<P> & Params>
  : T extends string
  ? SplitSearchParamKeyAndValue<T> & Params
  : never;

export class RouteSearchParams<T extends string> {
  constructor(private readonly settings: T) {}

  createSearchParams(data: Partial<SearchParams<T>>) {
    return Object.entries(data)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  }

  getSearchParamKey(key: keyof SearchParams<T>) {
    return key;
  }

  repalceSearchParams(
    searchParams: string,
    newSearchParams: Partial<SearchParams<T>>,
  ) {
    const searchParamsData = new URLSearchParams(searchParams);

    Object.entries(newSearchParams).forEach(([key, value]) => {
      searchParamsData.set(key, value);
    });

    return searchParamsData.toString();
  }

  parseSearchParamsFromString(searchParams: string) {
    const searchParamsData = new URLSearchParams(searchParams);
    const splittedSettings = this.settings.split("&");

    return Object.fromEntries(
      splittedSettings.map((val) => {
        const [key, value] = val.split("=");
        const data = searchParamsData.get(key);

        if (data && value === "string") {
          return [key, data];
        } else if (value === "number" && data && !isNaN(Number(data))) {
          return [key, Number(data)];
        } else if (data && value.split(",").includes(data)) {
          return [key, data];
        }
        return [key, null];
      }),
    ) as {
      [P in keyof SearchParams<T>]: SearchParams<T>[P] | null;
    };
  }
}
