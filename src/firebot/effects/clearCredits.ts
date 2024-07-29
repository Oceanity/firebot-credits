import { credits } from "@/main";
import { Firebot } from "@crowbartools/firebot-custom-scripts-types";
import { EffectScope } from "@crowbartools/firebot-custom-scripts-types/types/effects";

type EffectParams = {
  sectionId: string;
};

export const ClearCreditsEffect: Firebot.EffectType<EffectParams> = {
  definition: {
    id: "clear-credits",
    name: "Clear Credits",
    description: "Clears either entire Credits list or a specific section",
    icon: "fad fa-align-center",
    categories: ["integrations"],
    //@ts-expect-error ts2353
    outputs: [
      {
        label: "Entry Added",
        description:
          "Will be true if the entry was added successfully, false if not.",
        defaultName: "entryAdded",
      },
      {
        label: "Error Message",
        description:
          "If the entry was not changed successfully, will contain an error message.",
        defaultName: "error",
      },
    ],
  },

  optionsTemplate: `
    <eos-container header="Credit Entry Section" pad-top="true">
      <firebot-input
        model="effect.sectionId"
        name="sectionId"
        input-title="Section"
        placeholder-text="Section Id to clear, leave empty to clear entire list"
        type="text" />
    </eos-container>
  `,

  // @ts-expect-error ts6133: Variables must be named consistently
  optionsController: ($scope: EffectScope<EffectParams>) => {
  },

  optionsValidator: (_effect) => [] as string[],

  onTriggerEvent: async (event) => {
    const { sectionId } = event.effect;

    try {
      await credits.db.clearCredits(sectionId);
    } catch (error) {}
  },
};
