import { Command } from "commander";
import packageJson from "../package.json";
import { AstroInlineConfig, build, dev } from "astro";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import { SAKU_CONFIG_SCHEMA, SakuConfig } from "../astro/src/lib/schema";
import sitemap from "@astrojs/sitemap";
import z from "zod";
import { setConfigEnv } from "../astro/src/lib/env";

const ASTRO_ROOT = fileURLToPath(new URL(".", import.meta.url));

const program = new Command();

program
  .name("saku-docs")
  .description("Efficient documentation generator written with Astro!")
  .version(packageJson.version);

const DEFAULT_OUTPUT_DIR = "./build";

function resolveConfig(
  inputPath: string,
  outputPath: string,
): AstroInlineConfig {
  const directory = resolve(inputPath);
  const configPath = resolve(directory, "saku.config.json");
  const config = JSON.parse(readFileSync(configPath, "utf-8"));

  console.log(`Running saku-docs in  ${ASTRO_ROOT}`);

  const result = z.safeParse(SAKU_CONFIG_SCHEMA, config);
  if (!result.success) {
    console.error("Invalid saku.config.json:\n" + result.error.message);
    process.exit(1);
  }

  process.env.SAKU_CWD = directory;
  setConfigEnv(result.data);

  return {
    root: ASTRO_ROOT,
    output: "static",
    outDir: resolve(outputPath ?? DEFAULT_OUTPUT_DIR),
    publicDir: resolve(directory, "public"),
    integrations: [sitemap()],
  } satisfies AstroInlineConfig;
}

program
  .command("build")
  .description("Build docs")
  .option("-d, --directory <directory>", "documentation directory", ".")
  .option("--output <directory>", "output directory", DEFAULT_OUTPUT_DIR)
  .action(async (options) => {
    await build(resolveConfig(options.directory, options.output));
  });

program
  .command("develop")
  .description("Run dev server for docs")
  .option("-d, --directory <directory>", "documentation directory", ".")
  .option("--output <directory>", "output directory", DEFAULT_OUTPUT_DIR)
  .action(async (options) => {
    await dev(resolveConfig(options.directory, options.output));
  });

program.parse();
