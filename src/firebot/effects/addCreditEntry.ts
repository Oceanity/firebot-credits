import { Firebot } from "@crowbartools/firebot-custom-scripts-types";
import { namespace } from "@/main";
import { commandPrefix } from "@/main";

export const AddCreditsEntryEffect: Firebot.EffectType<{
  type: [CreditEntryType, string];
}> = {
  definition: {
    id: `${namespace}:add-credit-entry`,
    name: `${commandPrefix}: Change Playback Volume`,
    description: "Changes playback volume of active Spotify device",
    icon: "fas fa-list-alt",
    categories: ["integrations"],
    //@ts-expect-error ts2353
    outputs: [
      {
        label: "Volume was changed",
        description:
          "Will be true if the playback volume was changed successfully, false if not.",
        defaultName: "volumeChanged",
      },
      {
        label: "Error Message",
        description:
          "If the playback volume was not changed successfully, will contain an error message.",
        defaultName: "error",
      },
    ],
  },

  optionsTemplate: `
    <eos-container header="Credit Details" pad-top="true">
      <div class="btn-group">
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="list-effect-type">{{effect.type ? effect.type[1] : 'Type...'}}</span> <span class="caret"></span>
        </button>
        <ul class="dropdown-menu">
          <li ng-click="effect.repeatState = ['follow', 'Follow']">
            <a href>Follow</a>
          </li>
          <li ng-click="effect.repeatState = ['sub', 'Sub']">
            <a href>Sub</a>
          </li>
          <li ng-click="effect.repeatState = ['other', 'Other']">
            <a href>Other</a>
          </li>
        </ul>
      </div>
    </eos-container>
  `,

  // @ts-expect-error ts6133: Variables must be named consistently
  optionsController: ($scope: any, backendCommunicator: any, $q: any) => {},

  optionsValidator: (effect) => {
    const errors = [];
    if (!effect.type) {
      errors.push("Credit Entry Type is required!");
    }
    return errors;
  },

  onTriggerEvent: async (event) => {
    const { type } = event.effect;

    try {
      switch (type) {
        default:
          return;
      }
    } catch (error) {}
  },
};
