export const mockResponse = (): HttpResponse => {
  const res = {} as HttpResponse;
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};
