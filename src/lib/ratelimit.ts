import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * VULN-06 — Redis-backed rate limiter (multi-instance safe).
 *
 * Replaces the previous in-process Map cache which reset independently on
 * each server instance and therefore provided no protection in serverless or
 * auto-scaled deployments.
 *
 * Requires env vars:
 *   UPSTASH_REDIS_REST_URL   – REST endpoint from Upstash console
 *   UPSTASH_REDIS_REST_TOKEN – read/write token from Upstash console
 *
 * Fail-open: if either env var is absent (e.g. local dev without Redis) the
 * limiter returns { success: true } unconditionally so development is not
 * blocked. A warning is emitted to the server log.
 */

const hasRedisConfig =
  !!process.env.UPSTASH_REDIS_REST_URL &&
  !!process.env.UPSTASH_REDIS_REST_TOKEN;

// Lazy-initialise so the module can be imported without crashing when env
// vars are absent.
let _redis: Redis | null = null;
function getRedis(): Redis {
  if (!_redis) {
    _redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
  }
  return _redis;
}

/**
 * Creates a sliding-window rate limiter for a given endpoint.
 *
 * @param limit   Maximum number of requests allowed within the window.
 * @param window  Time window as a duration string, e.g. "1 m", "10 s".
 */
function createLimiter(
  limit: number,
  window: Parameters<typeof Ratelimit.slidingWindow>[1]
) {
  if (!hasRedisConfig) {
    return null;
  }
  return new Ratelimit({
    redis: getRedis(),
    limiter: Ratelimit.slidingWindow(limit, window),
    analytics: false,
    prefix: "entephoto_rl",
  });
}

// Singleton instances — one per endpoint so limits are tracked independently.
const _rsvpLimiter = createLimiter(5, "1 m");  // 5 requests per minute
const _wishLimiter = createLimiter(10, "1 m"); // 10 requests per minute

type RateLimitResult = { success: boolean; remaining?: number };

/**
 * Check the RSVP rate limit for a given identifier (typically the client IP).
 * Returns { success: true } when the request is allowed.
 * Returns { success: false } when the limit is exceeded.
 */
export async function checkRsvpRateLimit(
  identifier: string
): Promise<RateLimitResult> {
  if (!_rsvpLimiter) {
    if (process.env.NODE_ENV !== "test") {
      console.warn(
        "[ratelimit] UPSTASH_REDIS_REST_URL / TOKEN not set — " +
          "rate limiting is DISABLED (fail-open). Set these env vars in production."
      );
    }
    return { success: true };
  }
  const result = await _rsvpLimiter.limit(`rsvp:${identifier}`);
  return { success: result.success, remaining: result.remaining };
}

/**
 * Check the Guest Wish rate limit for a given identifier (typically the client IP).
 */
export async function checkWishRateLimit(
  identifier: string
): Promise<RateLimitResult> {
  if (!_wishLimiter) {
    if (process.env.NODE_ENV !== "test") {
      console.warn(
        "[ratelimit] UPSTASH_REDIS_REST_URL / TOKEN not set — " +
          "rate limiting is DISABLED (fail-open). Set these env vars in production."
      );
    }
    return { success: true };
  }
  const result = await _wishLimiter.limit(`wish:${identifier}`);
  return { success: result.success, remaining: result.remaining };
}
