import { CreditsService } from ".";

describe("Credits Service: Base Class", () => {
  let credits: CreditsService;

  beforeEach(() => {
    credits = new CreditsService();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("has expected child classes", () => {
    expect(credits).toHaveProperty("db");
    expect(credits).toHaveProperty("html");
  });
});
