import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const USER_CONFIG_FILENAME = "pi-herdr-agents.config.json";

/** Resolve the global agent config directory, respecting PI_CODING_AGENT_DIR. */
export function getAgentConfigDir(): string {
	return process.env.PI_CODING_AGENT_DIR ?? join(homedir(), ".pi", "agent");
}

function userConfigPath(): string {
	return join(getAgentConfigDir(), USER_CONFIG_FILENAME);
}

// The user-level config survives package updates; the package-local path is a
// development-checkout fallback that npm/git updates may overwrite.
export function resolveConfigPath(packagePath: string): string {
	const userPath = userConfigPath();
	return existsSync(userPath) ? userPath : packagePath;
}
