import { parseArgs } from "node:util";

import { $ } from "bun";

const { values } = parseArgs({
    args: Bun.argv,
    options: {
        start: {
            type: "boolean",
        },
        create: {
            type: "boolean",
        },
        generate: {
            type: "boolean",
        },
        build: {
            type: "boolean",
        },
        stop: {
            type: "boolean",
        },
        deploy: {
            type: "boolean",
        },
        frontend: {
            type: "boolean",
        },
        backend: {
            type: "boolean",
        },
    },
    strict: true,
    allowPositionals: true,
});

/* -------------------------------------------------------------------------- */

/**
 * Start a clean replica of the local network.
 */
if (values.start) {
    await $`dfx start --clean`;
}

/**
 * Create a new backend canister, if it doesn't exist.
 */
if (values.create) {
    await $`dfx canister create backend`;
}

/**
 * Generate the code declarations for interacing with the canister.
 * While we're at it, update the environment variables to make Next.js aware of the canister.
 */
if (values.generate) {
    await $`dfx generate backend`;
}

/**
 * Update the environment variables and build the frontend.
 */
if (values.build) {
    await $`bun run build`;
}

/**
 * Selectively stop the frontend or backend.
 * If no option is provided, stop the entire project and the local replica.
 */
if (values.stop) {
    if (values.frontend) {
        await $`dfx canister stop frontend`;
    } else if (values.backend) {
        await $`dfx canister stop backend`;
    } else {
        await $`dfx stop`;
    }
}

/**
 * Selectively deploy the frontend or backend to the local replica.
 * If no option is provided, deploy the entire project.
 */
if (values.deploy) {
    if (values.frontend) {
        await $`dfx canister install frontend`;
    } else if (values.backend) {
        await $`dfx canister install backend`;
    } else {
        await $`dfx deploy`;
    }
}
