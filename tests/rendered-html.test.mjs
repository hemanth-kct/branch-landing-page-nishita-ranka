import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function renderPath(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "test",
    String(process.pid) + "-" + String(Date.now()) + "-" + pathname,
  );
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost" + pathname, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the brand landing page", async () => {
  const response = await renderPath("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Skin, Hair &amp; Aesthetic Care in Hyderabad/i);
  assert.match(
    html,
    /Dermatology, Hair &amp; Aesthetic Care in Banjara Hills, Hyderabad/i,
  );
  assert.match(html, /Real results for skin and hair\. Designed for you\./i);
  assert.match(html, /Tell us what you&#x27;d like help with\./i);
  assert.match(html, /Primary concern/i);
  assert.match(html, /Hair &amp; Scalp/i);
  assert.match(html, /Expertise across the concerns that bring you here/i);
  assert.match(html, /Start with the concern\. Build the right plan\./i);
  assert.match(html, /What would you like to address\?/i);
  assert.match(
    html,
    /You don&#x27;t need to choose a treatment before you arrive\./i,
  );
  assert.match(html, /What treatments are available at Dr\. Nishita&#x27;s Clinic\?/i);
  assert.match(html, /Request a consultation/i);
  assert.match(html, /Privacy notice/i);
  assert.match(html, /Results vary/i);
});

test("keeps only the brand route and form systems", async () => {
  const [pageSource, styles] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(pageSource, /brand_consultation/);
  assert.match(pageSource, /sticky-consultation/);
  assert.match(pageSource, /consultation_form_submit/);
  assert.match(pageSource, /aria-haspopup="listbox"/);
  assert.match(styles, /\.page-brand \.hero-media/);
  assert.match(styles, /\.brand-care-section/);
  assert.match(styles, /\.treatment-choice-section/);
});
