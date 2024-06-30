export const mockRequest = (data?: Partial<HttpRequest>): HttpRequest => {
  const req = {
    body: {},
    params: {},
    query: {},
    headers: {},
    ...data,
  } as HttpRequest;
  return req;
};
