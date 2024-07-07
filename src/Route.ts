type LinkSplit<T extends string> = T extends `${infer Slug}/${infer RestLink}`
  ? [Slug, ...LinkSplit<RestLink>]
  : [T];

type LinkParams<T extends string> = T extends `:${infer P}` ? P : never;

export type LinkParamsData<T extends string> = {
  [A in LinkParams<LinkSplit<T>[number]>]: string;
};

export class Route<T extends `/${string}`> {
  constructor(private readonly path: T) {}

  createLink(params: LinkParamsData<T>) {
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
}
