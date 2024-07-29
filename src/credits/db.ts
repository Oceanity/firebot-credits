import { CreditsService } from ".";
import DbService from "@oceanity/firebot-helpers/db"
import { logger } from "@oceanity/firebot-helpers/firebot";
import { getErrorMessage } from "@oceanity/firebot-helpers/string";

export class CreditsDbService {
  private readonly db: DbService;
  private readonly credits: CreditsService;

  constructor(credits: CreditsService) {
    this.credits = credits;
    this.db = new DbService("./credits", true, true);
  }

  public async getCreditsArray() {
    try {
      const credits = await this.db.getAsync<CreditsDb>("/");

      if (!credits) return [];

      return Object.keys(credits)
        .map((key) => ({ id: key, ...credits[key] }))
        .sort((a, b) => {
          const diff = (a.weight ?? 0) - (b.weight ?? 0)
          logger.info(`${diff}`);
          return diff === 0 ? a.title.localeCompare(b.title) : diff
        });
    } catch (error) {
      logger.error(getErrorMessage(error));
      return [];
    }
  }

  public async saveCreditsSection(sectionId: string, creditsSection: CreditsSection) {
    try {
      return await this.db.pushAsync(`/${sectionId}`, creditsSection, false);
    } catch (error) {
      logger.error(getErrorMessage(error));
      return false;
    }
  }

  public async addCreditEntry(sectionId: string, username: string, creditEntry: CreditsEntry) {
    try {
      return await this.db.pushAsync(`/${sectionId}/entries/${username}`, creditEntry, false);
    } catch (error) {
      logger.error(getErrorMessage(error));
      return false;
    }
  }

  public async clearCredits(sectionId?: string) {
    let credits: CreditsDb | null;
    try {
      credits = await this.db.getAsync<CreditsDb>("/") ?? null;
    } catch (error) {
      logger.error(getErrorMessage(error));
      return false;
    }

    if (!credits || (sectionId && !credits[sectionId])) {
      logger.info("Nothing to clear in Custom Credits");
      return false;
    }

    const sections = sectionId ? [sectionId] : Object.keys(credits);

    for (const section of sections) {
      try {
        await this.db.pushAsync(`/${section}`, undefined, true);
      } catch (error) {
        logger.error(getErrorMessage(error));
      }  
    }

    return true;
  }
}
