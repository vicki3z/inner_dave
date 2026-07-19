import { defineConfig } from "vitest/config";

export default defineConfig({
  // Resolve the `@/*` path alias from tsconfig natively, so tests can import
  // `@/lib/...`. (Vite handles this now - no vite-tsconfig-paths plugin needed.)
  resolve: { tsconfigPaths: true },
  test: {
    environment: "node",
    // Scope discovery to unit tests under src/ only. Playwright E2E specs live
    // under e2e/ as *.spec.ts and must not be picked up here (and vice versa).
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
