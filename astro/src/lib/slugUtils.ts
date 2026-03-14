/** Convert a content entry ID to a URL slug for the given nav section base. */
export function entryToSlug(entryId: string, base: string): string {
  const entryPath = entryId.replace(/\.(md|mdoc)$/, "");
  return entryPath === "index" ? base : `${base}/${entryPath}`;
}

/** Convert a filename/path segment to a human-readable label. */
export function segmentToLabel(segment: string): string {
  return segment
    .split("/")
    .pop()!
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
