import invariant from "invariant";
import { convertQuery } from "helpers/query";

export class BaseURLScheme {
  constructor(base) {
    this.getBaseURL = base;
  }

  join(options, ...segments) {
    const base = this.getBaseURL(options);
    const [before, after] = base.slice(-1) === "/" ? ['', '/'] : ['/', ''];
    return segments.reduce((url, segment) => `${url}${before}${segment}${after}`, base);
  }
}

export class SingleURLScheme extends BaseURLScheme {
  static fromString(base) {
    return new SingleURLScheme(() => base);
  }

  getDetails(id, options) {
    invariant(id === '', `SingleURLScheme expects empty ID not ${id}`);
    return this.getBaseURL(options);
  }

  getList(options, query) {
    throw new Error('List is not implemented');
  }
}

export class URLScheme extends BaseURLScheme {
  static fromString(base) {
    return new URLScheme(() => base);
  }

  getDetails(id, options) {
    invariant(id, `URLScheme expects ID not ${id}`);
    return this.join(options, id);
  }

  getList(options, query=null) {
    if(query) {
      query = typeof query === "string" ? query : convertQuery(query);
    }
    return `${this.getBaseURL(options)}${query ? `?${query}` : ''}`;
  }
}
