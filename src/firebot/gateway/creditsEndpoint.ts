export const CreditsEndpoint: ApiEndpoint = [
  "",
  "GET",
  async (_req: HttpRequest, res: HttpResponse) => {
    try {
      res.status(200).send(`
        <html>
          <head>
            <title>Credits</title>
          </head>
          <body>
            <h1>Credits</h1>
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
