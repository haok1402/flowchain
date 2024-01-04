import { HttpsError } from "firebase-functions/v2/https";
import { CallableRequest, onCall } from "firebase-functions/v2/https";
import puppeteer from "puppeteer";
import { Request, Response } from "@shared/workflow/nodes/source";

export const executeSourceNode = onCall(
  async (request: CallableRequest<Request>): Promise<Response> => {
    const { type, payload } = request.data;
    switch (type) {
      case "document":
        throw new HttpsError(
          "unimplemented",
          "Document source not implemented"
        );
      case "website":
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.goto(payload.url, { waitUntil: "networkidle2" });
        const innerText = await page.evaluate(() => document.body.innerText);
        await browser.close();
        const cleanText = innerText.replace(/\n\s*\n/g, "\n\n").trim();
        return { text: cleanText };
    }
  }
);
