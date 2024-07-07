import { RouteWithSearchParams } from "../RouteWithSearchParams";

describe("RouteWithSearchParams.test", () => {
  it("should create a link from objects", () => {
    const routeWithSearchParams = new RouteWithSearchParams(
      "/:lang/organizations/:organization-id",
      { page: "number", category: ["category-1"] },
    );

    expect(
      routeWithSearchParams.createLinkWithSearchParams(
        {
          lang: "en",
          "organization-id": "organization-1",
        },
        { page: 5, category: "category-1" },
      ),
    ).toBe("/en/organizations/organization-1?page=5&category=category-1");
  });
});
