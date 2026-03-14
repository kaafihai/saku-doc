import z from "zod";

export const SAKU_CONFIG_SCHEMA = z.object({
  title: z.string().optional(),
  site: z.url(),
  imageUrl: z.url().optional(),
  faviconUrl: z.url().optional(),
  nav: z.array(
    z.discriminatedUnion("type", [
      z.object({
        type: z.literal("docs"),
        label: z.string(),
        dir: z.string(),
      }),
      z.object({
        type: z.literal("blog"),
        label: z.string(),
        dir: z.string(),
      }),
      z.object({
        type: z.literal("openapi"),
        label: z.string(),
        spec: z.string().or(z.url()),
      }),
      z.object({
        type: z.literal("ghLink"),
        href: z.string(),
        label: z.string().optional(),
      }),
    ]),
  ),
});

export type SakuConfig = z.infer<typeof SAKU_CONFIG_SCHEMA>;
