import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html style="overflow: hidden;">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Chris Barton | Full stack software engineer, Frontend engineer</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body style="overflow: hidden; margin: 0; padding: 0;">
        <Component />
      </body>
    </html>
  );
}
