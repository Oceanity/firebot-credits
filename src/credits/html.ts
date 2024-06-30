import { CreditsService } from ".";

export class CreditsHtmlService {
  private readonly credits: CreditsService;

  constructor(credits: CreditsService) {
    this.credits = credits;
  }

  public async getSection(type: CreditEntryType) {
    switch (type) {
      case "follow":
        return "<h1>Followers</h1>";
      case "sub":
        return "<h1>Subscribers</h1>";
      case "cheer":
        return "<h1>Cheers</h1>";
      case "tip":
        return "<h1>Tips</h1>";
      case "other":
        return "<h1>Other</h1>";
      default:
        return "";
    }
  }
}
