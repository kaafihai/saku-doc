import { SakuConfig } from "./schema";

export const ENV_CONFIG_KEY = "SAKU_CONFIG";

const DEFAULT_CONFIG = {
  site: "https://example.com",
  nav: [],
} satisfies SakuConfig;

export function getConfigEnv(): SakuConfig {
  const defaultConfig = JSON.stringify(DEFAULT_CONFIG);
  return JSON.parse(process.env[ENV_CONFIG_KEY] ?? defaultConfig);
}

export function setConfigEnv(config: SakuConfig) {
  process.env[ENV_CONFIG_KEY] = JSON.stringify(config);
}
