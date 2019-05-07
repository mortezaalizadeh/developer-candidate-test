export default class HttpResponse {
  status = statusCode => {
    this.statusCode = statusCode;

    return this;
  };

  send = content => {
    this.content = content;

    return this;
  };
}

test('To avoid jest error...', () => {});
