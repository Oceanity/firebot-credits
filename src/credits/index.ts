import { CreditsDbService } from "./db";
import { CreditsHtmlService } from "./html";

export class CreditsService {
  public readonly db: CreditsDbService;
  public readonly html: CreditsHtmlService;

  constructor() {
    this.db = new CreditsDbService(this);
    this.html = new CreditsHtmlService(this);
  }
}
