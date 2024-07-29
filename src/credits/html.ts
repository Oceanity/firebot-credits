import { CreditsService } from ".";

export class CreditsHtmlService {
  private readonly credits: CreditsService;

  constructor(credits: CreditsService) {
    this.credits = credits;
  }


  public async getCurrentCredits() {
    const credits = await this.credits.db.getCreditsArray();

    const creditsHtml = credits.map(section =>`
      <div class="credits-section" id="credits-section-${section.id}">
        <h1 class="credits-header"${section.titleColor ? ` style="color: ${section.titleColor}"` : ""}>${section.title}</h1>
        <ul class="credits-entries">
          ${Object.values(section.entries ?? {}).map(entry => `
            <li class="credits-entry">
              <div class="credits-entry-image">${entry.imageUrl ? `<img src="${entry.imageUrl}" />` : ""}</div>
              <div class="credits-entry-info">
                <div class="credits-entry-name"${entry.displayNameColor ? ` style="color: ${entry.displayNameColor}"` : ""}>${entry.displayName}</div>
                ${entry.subtitle ? `<div class="credits-entry-subtitle"${entry.subtitleColor ? ` style="color: ${entry.subtitleColor}"` : ""}>${entry.subtitle}</div>` : ""}
              </div>
            </li>
          `).join("")}
      </div>
    `);

    return creditsHtml.join("");
  }
}
