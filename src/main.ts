import { Firebot } from "@crowbartools/firebot-custom-scripts-types";
import { AllEndpoints } from "./firebot/gateway";
import * as packageJson from "../package.json";
import { AllEffects } from "./firebot/effects";
import { Effects } from "@crowbartools/firebot-custom-scripts-types/types/effects";

export const { name: namespace, version } = packageJson;
export const commandPrefix: string = "Credits (by Oceanity)";

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
    const { httpServer, effectManager } = runRequest.modules;

    // Register all endpoints
    for (const endpoint of AllEndpoints) {
      const [path, method, handler] = endpoint;
      httpServer.registerCustomRoute(namespace, path, method, handler);
    }

    // Register all effects
    for (const effect of AllEffects) {
      effectManager.registerEffect(
        effect as Effects.EffectType<{ [key: string]: any }>
      );
    }
  },
};

export default script;
