import { Firebot } from "@crowbartools/firebot-custom-scripts-types";
import { AllEndpoints } from "./firebot/gateway";
import * as packageJson from "../package.json";
import { AllEffects } from "./firebot/effects";
import { Effects } from "@crowbartools/firebot-custom-scripts-types/types/effects";
import { initModules } from "@oceanity/firebot-helpers/firebot";
import { pathExists, copyFile, constants as fsConstants } from "fs-extra";
import { resolve } from "path";
import { CreditsService } from "./credits";

export const {
  name: namespace,
  displayName: commandPrefix,
  version,
} = packageJson;

interface Params {
  currency: "USD";
}

export let credits: CreditsService;

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
  run: async (runRequest) => {
    const { httpServer, effectManager, logger } = runRequest.modules;
    initModules(runRequest.modules);

    credits = new CreditsService();

    // Check if settings exists, if not, copy default
    if (!(await pathExists(resolve(__dirname, "./settings.json")))) {
      logger.info("Copying default settings.json");
      await copyFile(
        resolve(__dirname, "./settings.default.json"),
        resolve(__dirname, "./settings.json"),
        fsConstants.COPYFILE_FICLONE
      );
    }

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
