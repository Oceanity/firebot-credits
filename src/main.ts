import { Firebot } from "@crowbartools/firebot-custom-scripts-types";
import { AllEndpoints } from "./firebot/gateway";
import * as packageJson from "../package.json";
import { AllEffects } from "./firebot/effects";
import { Effects } from "@crowbartools/firebot-custom-scripts-types/types/effects";

export const {
  name: namespace,
  displayName: commandPrefix,
  version,
} = packageJson;

interface Params {
  currency: "USD";
}

const script: Firebot.CustomScript<Params> = {
  getScriptManifest: () => {
    return {
      name: "Browser Source Credits",
      description:
        "A credits plugin that operates through a browser source in OBS",
      author: "Oceanity",
      version,
      firebotVersion: "5",
    };
  },
  getDefaultParameters: () => {
    return {
      currency: {
        type: "string",
        default: "USD",
        description: "Currency",
        options: ["USD"],
      },
    };
  },
  run: (runRequest) => {
    const { httpServer, effectManager, logger } = runRequest.modules;

    logger.info(`Running ${commandPrefix} [${namespace}] v${version}`);

    // Register all endpoints
    for (const endpoint of AllEndpoints) {
      const [path, method, handler] = endpoint;
      httpServer.registerCustomRoute(namespace, path, method, handler);
    }

    // Register all effects
    for (const effect of AllEffects) {
      effect.definition.id = `${namespace}:${effect.definition.id}`;
      effect.definition.name = `${commandPrefix}: ${effect.definition.name}`;
      effectManager.registerEffect(
        effect as Effects.EffectType<{ [key: string]: any }>
      );
    }
  },
};

export default script;
