import { describe, test, expect } from "bun:test";
import { POST } from "./route";
import { NextRequest } from "next/server";

describe("POST /api/expand-map-url SSRF Security Tests", () => {
  async function makeRequest(urlPayload: unknown) {
    const req = new NextRequest("http://localhost:3000/api/expand-map-url", {
      method: "POST",
      body: JSON.stringify({ url: urlPayload }),
    });
    return await POST(req);
  }

  test("rejects AWS metadata endpoint SSRF payload with HTTP 400", async () => {
    const res = await makeRequest("http://169.254.169.254/latest/meta-data/?goo.gl");
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Only HTTPS URLs are allowed");
  });

  test("rejects plain non-HTTPS URL with HTTP 400", async () => {
    const res = await makeRequest("http://maps.app.goo.gl/sample-link");
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Only HTTPS URLs are allowed");
  });

  test("rejects lookalike domain bypass attempt (goo.gl.attacker.com) with HTTP 400", async () => {
    const res = await makeRequest("https://goo.gl.attacker.com/bypass");
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Not a valid Google Maps host");
  });

  test("accepts valid HTTPS Google Maps shortlink hostname", async () => {
    // Valid host check passes (even if external fetch fails/times out, status shouldn't be 400 for hostname violation)
    const res = await makeRequest("https://maps.app.goo.gl/validShortLink");
    expect(res.status).not.toBe(400);
  });
});
