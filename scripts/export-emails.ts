#!/usr/bin/env npx tsx
/**
 * Export emails from Cloudflare KV
 * Usage: npx tsx scripts/export-emails.ts
 *
 * Requires: wrangler login first
 */

import { execSync } from "child_process";

const KV_NAMESPACE_ID = process.env.KV_NAMESPACE_ID || "diy_kiosk_WAITLIST";

interface EmailData {
  email: string;
  subscribedAt: string;
  ip: string;
  userAgent: string;
}

async function exportEmails() {
  console.log("Fetching email list from KV...\n");

  try {
    // List all keys
    const keysOutput = execSync(
      `wrangler kv:key list --namespace-id=${KV_NAMESPACE_ID}`,
      { encoding: "utf-8" }
    );

    const keys = JSON.parse(keysOutput) as { name: string }[];

    if (keys.length === 0) {
      console.log("No emails found.");
      return;
    }

    console.log(`Found ${keys.length} email(s):\n`);
    console.log("Email,Subscribed At,IP");
    console.log("---");

    for (const key of keys) {
      const valueOutput = execSync(
        `wrangler kv:key get "${key.name}" --namespace-id=${KV_NAMESPACE_ID}`,
        { encoding: "utf-8" }
      );

      try {
        const data: EmailData = JSON.parse(valueOutput);
        console.log(`${data.email},${data.subscribedAt},${data.ip}`);
      } catch {
        // If not JSON, just print the email (key)
        console.log(`${key.name},-,-`);
      }
    }
  } catch (error) {
    console.error("Error:", error);
    console.log("\nMake sure you have:");
    console.log("1. Run 'wrangler login' first");
    console.log("2. Set KV_NAMESPACE_ID environment variable or update the script");
  }
}

exportEmails();
