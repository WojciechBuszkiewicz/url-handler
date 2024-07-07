export type SerachParams = Record<
  string,
  string[] | "number" | "string" | "boolean"
>;

export type ParseSearchParams<P extends SerachParams> = {
  [G in keyof P]: GetSearchParam<P[G]>;
};

type GetSearchParam<T extends string[] | "number" | "string" | "boolean"> =
  T extends "string"
    ? string
    : T extends "number"
      ? number
      : T extends "boolean"
        ? boolean
        : T[number];

export class RouteSearchParams<const T extends SerachParams> {
  constructor(private readonly settings: T) {}

  createSearchParams(data: Partial<ParseSearchParams<T>>) {
    return Object.entries(data)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  }

  getSearchParamKey(key: keyof T) {
    return key;
  }

  repalceSearchParams(
    searchParams: string,
    newSearchParams: Partial<ParseSearchParams<T>>,
  ) {
    const searchParamsData = new URLSearchParams(searchParams);

    Object.entries(newSearchParams).forEach(([key, value]) => {
      searchParamsData.set(key, value);
    });

    return searchParamsData.toString();
  }

  parseSearchParamsFromString(searchParams: string) {
    const searchParamsData = new URLSearchParams(searchParams);

    return Object.fromEntries(
      Object.entries(this.settings).map(([key, value]) => {
        const data = searchParamsData.get(key);

        if (data && value === "string") {
          return [key, data];
        } else if (data && value === "number" && !isNaN(Number(data))) {
          return [key, Number(data)];
        } else if (
          data &&
          value === "boolean" &&
          ["true", "false"].includes(data)
        ) {
          return [key, data === "true"];
        } else if (data && Array.isArray(value) && value.includes(data)) {
          return [key, data];
        }

        return [key, null];
      }),
    ) as {
      [P in keyof T]: T[P] | null;
    };
  }
}
