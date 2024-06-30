import { CreditsService } from ".";

export class CreditsDbService {
  private readonly credits: CreditsService;

  constructor(credits: CreditsService) {
    this.credits = credits;
  }

  public async addCreditEntry(_creditEntry: CreditEntry) {}
}
