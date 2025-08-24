export class RequestElement {
  url: string;

  method: string;

  static create(reqInfo: string): RequestElement {
    const elements = reqInfo.split('#');

    if (elements.length != 2) {
      throw new Error('url format error correct format is path#method : ex test.com#post');
    }

    const url = elements[0];
    const method = elements[1];

    return new RequestElement(url, method);
  }

  private constructor(url: string, method: string) {
    this.url = url;
    this.method = method;
  }
}
