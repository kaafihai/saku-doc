import { defineConfig } from "tsup";

export default defineConfig({
  entry: { cli: "lib/cli.ts" },
  splitting: false,
  outDir: "dist",
  format: ["esm"],
  platform: "node",
  publicDir: "astro",
  cjsInterop: true,
  banner: { js: "#!/usr/bin/env node" },
});
