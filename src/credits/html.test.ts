import { CreditsService } from ".";
import { CreditsHtmlService } from "./html";

describe("Credits Html Service", () => {
  let credits: CreditsService;
  let html: CreditsHtmlService;

  beforeEach(() => {
    credits = new CreditsService();
    html = new CreditsHtmlService(credits);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("getSection", () => {
    it("returns expected section for follows", async () => {
      expect(await html.getSection("follow")).toContain("<h1>Followers</h1>");
    });

    it("returns expected section for subs", async () => {
      expect(await html.getSection("sub")).toContain("<h1>Subscribers</h1>");
    });
  });
});
