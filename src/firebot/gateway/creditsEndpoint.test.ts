import { CreditsEndpoint } from "./creditsEndpoint";
import { mockRequest } from "@/mocks/api/httpRequest";
import { mockResponse } from "@/mocks/api/httpResponse";

describe("Gateway: GET /oceanity-credits", () => {
  const [path, method, handler] = CreditsEndpoint;
  let request: HttpRequest;
  let response: HttpResponse;
  let expectedCredits: string = "<html><body><h1>Credits</h1></body></html>";

  beforeEach(() => {
    request = mockRequest();
    response = mockResponse();
    response.status(200).send(expectedCredits);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("has proper path and method", () => {
    expect(path).toBe("");
    expect(method).toBe("GET");
  });

  it("should return credits page when called successfully", async () => {
    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledWith(expectedCredits);
  });
});
