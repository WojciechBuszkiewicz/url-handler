import { Route } from "../Route";

describe("Route", () => {
  it("should create a link from an object", () => {
    const route = new Route("/:lang/organizations/:organization-id");

    expect(
      route.createLink({ lang: "en", "organization-id": "organization-1" }),
    ).toBe("/en/organizations/organization-1");
  });

  it("should check if a passed route is active", () => {
    const route = new Route("/:lang/organizations/:organization-id");

    expect(route.isCurrentPage("/en/organizations/organization-1")).toBe(true);
    expect(
      route.isCurrentPage("/en/organizations/organization-1/settings"),
    ).toBe(false);
    expect(route.isCurrentPage("/en/organizations")).toBe(false);
  });
});
