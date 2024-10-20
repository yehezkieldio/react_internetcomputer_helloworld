import { createReactor } from "@ic-reactor/react";
import { backend, canisterId, createActor as createLocalActor, idlFactory } from "#/icp";

export function createBackendActor() {
    return createLocalActor(canisterId, {
        agentOptions: {
            host: process.env.IC_HOST,
        },
    });
}

type Actor = typeof backend;

export const { useActorStore, useAuth, useQueryCall } = createReactor<Actor>({
    canisterId,
    idlFactory,
    host: process.env.IC_HOST,
});
