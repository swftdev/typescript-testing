export interface config {
    env: "DEV" | "PROD",
    version: string
}

export function getConfig(options?: Partial<config>): config {
    return {
        env: "DEV",
        version: "1.0.0",
        ...options
    }
}
