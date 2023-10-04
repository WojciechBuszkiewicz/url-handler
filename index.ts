import { Route } from "./src/Route";

const route = new Route("/:lang/organization/:organizationId");

route.createLink({ lang: "en", organizationId: "123" });
