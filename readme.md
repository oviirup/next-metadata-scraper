# Next.js Metadata Scraper

A Simple tool to parse website metadata on server-side using `puppeteer`.

## Requirements

To perform metadata scraping in a serverless environment (e.g., Vercel), two key libraries are used:

- [`puppeteer-core`](https://www.npmjs.com/package/puppeteer-core): The core API of Puppeteer, distributed without a bundled Chromium binary. This allows us to manage and deploy our own Chromium binary, which is essential in constrained environments like serverless functions.

- [`@sparticuz/chromium-min`](https://www.npmjs.com/package/@sparticuz/chromium-min): A lightweight Chromium binary optimized for serverless environments. It is a smaller fork of `chrome-aws-lambda`, designed specifically to comply with size limitations (e.g., the 50 MB unzipped limit imposed by platforms like Vercel).

### Why `@sparticuz/chromium-min`?

Some serverless platforms, such as Vercel, restrict the maximum size of files within the deployment package. `@sparticuz/chromium-min` provides a trimmed-down Chromium binary that can be hosted externally (e.g., via a CDN) to keep deployment packages within acceptable limits.

In this setup, the Chromium binary is hosted on GitHub. While its not ideal, it serves as a free and functional CDN alternative for development and low-traffic use cases.

> **Note:** Ensure that the version of `puppeteer-core` used matches the version of Chromium provided by `@sparticuz/chromium-min` to avoid compatibility issues.
