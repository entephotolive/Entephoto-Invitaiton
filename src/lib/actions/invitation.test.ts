import { describe, test, expect } from "bun:test";
import { getInvitationAction } from "./invitation";

describe("VULN-04 NoSQL Injection & Input Validation in getInvitationAction", () => {
  test("rejects non-string raw object payload ({ '$ne': null }) with Invalid identifier error", async () => {
    // @ts-expect-error Testing runtime payload type evasion
    const res = await getInvitationAction({ "$ne": null });
    expect(res.success).toBe(false);
    expect(res.error).toBe("Invalid identifier");
  });

  test("rejects malformed operator string ($ne) with Invalid identifier format error", async () => {
    const res = await getInvitationAction("$ne");
    expect(res.success).toBe(false);
    expect(res.error).toBe("Invalid identifier format");
  });

  test("rejects malformed payload string with special chars ({})", async () => {
    const res = await getInvitationAction("{}");
    expect(res.success).toBe(false);
    expect(res.error).toBe("Invalid identifier format");
  });

  test("rejects SQL/NoSQL injection string payload (' OR 1=1 --')", async () => {
    const res = await getInvitationAction("' OR 1=1 --");
    expect(res.success).toBe(false);
    expect(res.error).toBe("Invalid identifier format");
  });
});
