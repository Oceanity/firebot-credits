import { Firebot } from "@crowbartools/firebot-custom-scripts-types";

export const AddCreditsEntryEffect: Firebot.EffectType<{
  type: [CreditEntryType, string];
}> = {
  definition: {
    id: "add-credit-entry",
    name: "Add Entry",
    description: "Adds an entry to the credits list",
    icon: "fad align-center",
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
