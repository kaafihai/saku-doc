// Shared OpenAPI types and utilities

export type SchemaObject = Record<string, unknown>;

export type ParameterObject = {
    name: string;
    in: string;
    required?: boolean;
    description?: string;
    schema?: SchemaObject;
};

export type RequestBodyObject = {
    description?: string;
    required?: boolean;
    content?: Record<string, unknown>;
};

export type ResponseObject = {
    description?: string;
    content?: Record<string, unknown>;
};

export type OperationObject = {
    summary?: string;
    description?: string;
    operationId?: string;
    tags?: string[];
    parameters?: ParameterObject[];
    requestBody?: RequestBodyObject;
    responses?: Record<string, ResponseObject>;
};

export type OpenApiSpec = {
    info: { title: string; description?: string; version: string };
    tags?: { name: string; description?: string }[];
    paths?: Record<string, Record<string, OperationObject>>;
};

export type OperationEntry = {
    method: string;
    path: string;
    summary?: string;
    tags?: string[];
    slug: string;
};

export type OperationDetail = OperationEntry & {
    description?: string;
    operationId?: string;
    parameters?: ParameterObject[];
    requestBody?: RequestBodyObject;
    responses?: Record<string, ResponseObject>;
};

export const HTTP_METHODS = [
    "get",
    "post",
    "put",
    "patch",
    "delete",
    "head",
    "options",
    "trace",
];

export const METHOD_COLORS: Record<string, string> = {
    get: "success",
    post: "primary",
    put: "warning",
    patch: "info",
    delete: "danger",
    head: "secondary",
    options: "secondary",
    trace: "secondary",
};

export const STATUS_COLORS: Record<string, string> = {
    "2": "success",
    "3": "info",
    "4": "warning",
    "5": "danger",
};

export function statusColor(code: string): string {
    return STATUS_COLORS[code[0]] ?? "secondary";
}

export function operationToSlug(
    method: string,
    path: string,
    operationId?: string,
): string {
    if (operationId) {
        return operationId
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
    }
    const pathSlug = path
        .replace(/^\//, "")
        .replace(/\{([^}]+)\}/g, "$1")
        .replace(/\//g, "-")
        .replace(/[^a-z0-9-]/gi, "")
        .toLowerCase()
        .replace(/^-|-$/g, "");
    return `${method.toLowerCase()}-${pathSlug || "root"}`;
}

export async function fetchSpec(spec: string): Promise<OpenApiSpec> {
    const isUrl =
        spec.startsWith("http://") || spec.startsWith("https://");
    if (isUrl) {
        const res = await fetch(spec);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    } else {
        const { readFileSync } = await import("fs");
        const { resolve } = await import("path");
        const cwd = process.env.SAKU_CWD ?? process.cwd();
        return JSON.parse(readFileSync(resolve(cwd, spec), "utf-8"));
    }
}

export function schemaToString(schema: unknown, depth = 0): string {
    if (!schema || typeof schema !== "object") return String(schema ?? "");
    const s = schema as SchemaObject;
    if (s.type === "array" && s.items)
        return `${schemaToString(s.items, depth)}[]`;
    if (s.type) return String(s.type);
    if (s.$ref) return String(s.$ref).split("/").pop()!;
    if (s.oneOf || s.anyOf) {
        const variants = ((s.oneOf ?? s.anyOf) as unknown[]).map((v) =>
            schemaToString(v, depth),
        );
        return variants.join(" | ");
    }
    return "object";
}

/** Extract all operations from a spec into a flat list with pre-computed slugs. */
export function collectOperations(spec: OpenApiSpec): OperationEntry[] {
    const ops: OperationEntry[] = [];
    if (!spec.paths) return ops;
    for (const [path, pathItem] of Object.entries(spec.paths)) {
        for (const method of HTTP_METHODS) {
            const op = pathItem[method];
            if (!op) continue;
            ops.push({
                method,
                path,
                summary: op.summary,
                tags: op.tags,
                slug: operationToSlug(method, path, op.operationId),
            });
        }
    }
    return ops;
}
