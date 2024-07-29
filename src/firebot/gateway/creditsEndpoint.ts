import { credits } from "@/main";

export const CreditsEndpoint: ApiEndpoint = [
  "",
  "GET",
  async (_req: HttpRequest, res: HttpResponse) => {
    const creditsHtml = await credits.html.getCurrentCredits();

    try {
      res.status(200).send(`
        <html>
          <head>
            <title>Custom Credits (by Oceanity)</title>
          </head>
          <body>
            ${creditsHtml}
          </body>
        </html>
      `);
    } catch (error) {
      res.status(400).send({
        status: 400,
        message: error instanceof Error ? error.message : (error as string),
      });
    }
  },
];
