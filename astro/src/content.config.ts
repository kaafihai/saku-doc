import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { resolve } from "path";
import { getConfigEnv } from "./lib/env";

const cwd = process.env.SAKU_CWD ?? process.cwd();

const config = getConfigEnv();

const collections: Record<string, ReturnType<typeof defineCollection>> = {};

config.nav.forEach((n, i) => {
  if (n.type === "docs") {
    collections[`docs_${i}`] = defineCollection({
      loader: glob({
        pattern: "**/*.{md,mdoc}",
        base: resolve(cwd, n.dir),
      }),
    });
  }

  if (n.type === "blog") {
    collections[`blog_${i}`] = defineCollection({
      loader: glob({
        pattern: "**/*.{md,mdoc}",
        base: resolve(cwd, n.dir),
      }),
    });
  }
});

export { collections };
