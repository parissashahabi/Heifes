// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import {BrowserTracing} from "@sentry/nextjs/dist/index.client";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN || 'https://0464fa9fc618480cbab4892ada1ba7cd@o968579.ingest.sentry.io/6448079',
  tracesSampleRate: 1.0,
  maxBreadcrumbs: 50,
  debug: true,
  integrations: [new BrowserTracing()],
  tracesSampler: samplingContext => {
  }
});
