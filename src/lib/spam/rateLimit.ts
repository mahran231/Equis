/**
 * Small in-memory sliding-window rate limiter.
 * Note: on serverless hosts each instance keeps its own window, so this is a
 * first line of defence. For stricter limits, put a shared store (e.g. an edge
 * KV) or the host's firewall rules in front of /api/enquiry.
 */
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, number[]>();

  return {
    check(key: string, now = Date.now()) {
      const windowStart = now - windowMs;
      const recent = (hits.get(key) ?? []).filter((t) => t > windowStart);
      const allowed = recent.length < limit;
      if (allowed) recent.push(now);
      hits.set(key, recent);
      // Opportunistic cleanup to keep memory bounded.
      if (hits.size > 5000) {
        for (const [k, v] of hits) if (v.every((t) => t <= windowStart)) hits.delete(k);
      }
      const retryAfterMs = allowed ? 0 : Math.max(0, recent[0] + windowMs - now);
      return { allowed, remaining: Math.max(0, limit - recent.length), retryAfterMs };
    },
    reset() {
      hits.clear();
    },
  };
}

/** Minimum time a human needs to fill the form; faster submissions are treated as bots. */
export const MIN_FILL_MS = 3000;

export function isTooFast(startedAt: number, now = Date.now()) {
  return now - startedAt < MIN_FILL_MS;
}
