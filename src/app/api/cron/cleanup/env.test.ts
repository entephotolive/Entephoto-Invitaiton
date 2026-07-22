import { describe, test, expect } from "bun:test";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

describe("VULN-03 Environment Configuration Security Audit", () => {
  const rootDir = resolve(__dirname, "../../../../../");

  test(".env.example exists and contains all process.env variables referenced in code", () => {
    const examplePath = resolve(rootDir, ".env.example");
    expect(existsSync(examplePath)).toBe(true);

    const exampleContent = readFileSync(examplePath, "utf-8");
    const requiredVars = [
      "MONGODB_URI",
      "NEXT_PUBLIC_GOOGLE_CLIENT_ID",
      "GOOGLE_CLIENT_ID",
      "JWT_SECRET",
      "CRON_SECRET",
      "UPLOADTHING_TOKEN",
      "UPLOADTHING_SECRET",
    ];

    for (const v of requiredVars) {
      expect(exampleContent).toContain(`${v}=`);
    }
  });

  test(".env.example contains dummy/placeholder values and no real secrets", () => {
    const exampleContent = readFileSync(resolve(rootDir, ".env.example"), "utf-8");
    expect(exampleContent).not.toContain("cluster0.qimfzzm.mongodb.net");
    expect(exampleContent).not.toContain("sk_live_");
  });
});
