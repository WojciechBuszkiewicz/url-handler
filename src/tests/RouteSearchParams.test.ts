import { RouteSearchParams } from "../RouteSearchParams";

describe("RouteSearchParams", () => {
  it("should create a query string from an object", () => {
    const searchParams = new RouteSearchParams(
      "page=number&category=category-1,category-2&search=string",
    );

    expect(searchParams.createSearchParams({ page: 5 })).toBe("page=5");
    expect(searchParams.createSearchParams({ search: "test" })).toBe(
      "search=test",
    );
    expect(
      searchParams.createSearchParams({ page: 5, category: "category-1" }),
    ).toBe("page=5&category=category-1");
    expect(searchParams.createSearchParams({ page: 5, search: "test" })).toBe(
      "page=5&search=test",
    );
    expect(
      searchParams.createSearchParams({
        page: 5,
        search: "test",
        category: "category-1",
      }),
    ).toBe("page=5&search=test&category=category-1");
  });

  it("should return passed query key", () => {
    const searchParams = new RouteSearchParams(
      "page=number&category=category-1,category-2&search=string",
    );

    expect(searchParams.getSearchParamKey("category")).toBe("category");
  });

  it("should parse queries from a string to an object", () => {
    const searchParams = new RouteSearchParams(
      "page=number&category=category-1,category-2&search=string",
    );

    expect(
      searchParams.parseSearchParamsFromString(
        "category=category-1&page=5&search=test",
      ),
    ).toMatchObject({ category: "category-1", page: 5, search: "test" });
    expect(
      searchParams.parseSearchParamsFromString("category=category-5&page=5"),
    ).toMatchObject({ category: null, page: 5, search: null });
  });

  it("should replace old queries with new ones", () => {
    const searchParams = new RouteSearchParams(
      "page=number&category=category-1,category-2&search=string",
    );

    expect(
      searchParams.repalceSearchParams(
        "category=category-1&page=5&search=test",
        { category: "category-2" },
      ),
    ).toBe("category=category-2&page=5&search=test");
    expect(
      searchParams.repalceSearchParams("category=category-2&page=5", {
        page: 7,
      }),
    ).toBe("category=category-2&page=7");
    expect(
      searchParams.repalceSearchParams("category=category-5&page=5", {
        search: "test",
      }),
    ).toBe("category=category-5&page=5&search=test");
  });
});
