import { credits } from "@/main";
import { Firebot } from "@crowbartools/firebot-custom-scripts-types";
import { EffectScope } from "@crowbartools/firebot-custom-scripts-types/types/effects";

type EffectParams = {
  sectionId: string;
  sectionWeight: number;
  sectionName: string;
  hasCustomSectionHeaderColor: boolean;
  sectionHeaderColor: string;
  sectionSubtitleFormat: string;
  username: string;
  userDisplayName: string;
  hasCustomDisplayNameColor: boolean;
  displayNameColor: string;
  userImageUrl: string;
  userMeta: string;
  subtitle: string;
  hasCustomSubtitleColor: boolean;
  subtitleColor: string;
};

export const AddCreditsEntryEffect: Firebot.EffectType<EffectParams> = {
  definition: {
    id: "add-credit-entry",
    name: "Add Entry",
    description: "Adds an entry to the credits list",
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
    <eos-container header="Credits Section" pad-top="true">
      <div style="display: flex; flex-direction: column; gap: 15px">
        <div class="input-group pb-0">
          <span class="input-group-addon">Id</span>
          <input
            class="form-control"
            type="text"
            placeholder="Id for grouping, \`Clear Credits\` if you change this!"
            ng-model="effect.sectionId"
            style="width: 360px"
          />
          <span class="input-group-addon">Position</span>
          <input
            class="form-control"
            type="number"
            min="0"
            placeholder="0"
            ng-model="effect.sectionWeight"
            style="width: 80px"
          />
        </div>
        <firebot-input
          model="effect.sectionName"
          name="sectionName"
          input-title="Title"
          placeholder-text="Section Name"
          menu-position="under"
          type="text" />
        <label class="control-fb control--checkbox" style="margin: 0"> Custom Title Color
          <input type="checkbox" ng-model="effect.hasCustomSectionHeaderColor">
          <div class="control__indicator"></div>
        </label>
        <firebot-input
          ng-if="effect.hasCustomSectionHeaderColor"
          model="effect.sectionHeaderColor"
          input-title="Title Color (valid CSS color)"
          placeholder-text="#ffffff"
          type="color" />
      </div>
    </eos-container>
    <eos-container header="User Details" pad-top="true">
      <div style="display: flex; flex-direction: column; gap: 15px">
        <firebot-input
          model="effect.username"
          name="userDisplayName"
          input-title="Username"
          placeholder-text="Username"
          type="text" />
        <firebot-input
          model="effect.userDisplayName"
          name="userDisplayName"
          input-title="Display Name"
          placeholder-text="User display name"
          type="text" />
        <label class="control-fb control--checkbox" style="margin: 0"> Custom Name Color
          <input type="checkbox" ng-model="effect.hasCustomDisplayNameColor">
          <div class="control__indicator"></div>
        </label>
        <firebot-input
          ng-if="effect.hasCustomDisplayNameColor"
          model="effect.displayNameColor"
          input-title="Name Color (valid CSS color)"
          placeholder-text="#ffffff"
          type="color" />
        <firebot-input
          model="effect.userImageUrl"
          name="userImageUrl"
          input-title="Image Url"
          placeholder-text="User image url, leave blank for no image"
          type="text" />
        <firebot-input
          model="effect.userMeta"
          name="userMeta"
          input-title="Metadata"
          placeholder-text="Metadata stored in entry, good for amount of bits, sub tier, etc."
          type="text" />
        <firebot-input
          model="effect.sectionSubtitleFormat"
          name="sectionSubtitleFormat"
          input-title="Entry Subtitle"
          placeholder-text="What is displayed under user's name, leave blank for none"
          type="text" />
        <p class="muted ng-binding ng-scope" style="font-size:12px; padding-top: 3px; margin: -15px 0 0">Available tags: {metadata}</p>
        <label class="control-fb control--checkbox" style="margin: 0"> Custom Subtitle Color
          <input type="checkbox" ng-model="effect.hasCustomSubtitleColor">
          <div class="control__indicator"></div>
        </label>
        <firebot-input
          ng-if="effect.hasCustomSubtitleColor"
          model="effect.subtitleColor"
          input-title="Subtitle Color (valid CSS color)"
          placeholder-text="#ffffff"
          type="color" />
      </div>
    </eos-container>
  `,

  optionsController: ($scope: EffectScope<EffectParams>) => {
    if (!$scope.effect.sectionHeaderColor) {
      $scope.effect.sectionHeaderColor = "#ffffff";
    }

    if (!$scope.effect.displayNameColor) {
      $scope.effect.displayNameColor = "#ffffff";
    }
  },

  optionsValidator: (effect) => {
    const errors = [];
    if (!effect.sectionId) {
      errors.push("Credit Section Id is required!");
    }
    if (!effect.sectionName) {
      errors.push("Credit Section is required!");
    }
    if (!effect.hasCustomDisplayNameColor && !effect.displayNameColor) {
      errors.push("Name Color is required if custom colors is enabled!");
    }
    return errors;
  },

  onTriggerEvent: async (event) => {
    const {
      sectionId,
      sectionWeight,
      sectionName,
      hasCustomSectionHeaderColor,
      sectionHeaderColor,
      sectionSubtitleFormat,
      username,
      userDisplayName,
      hasCustomDisplayNameColor,
      displayNameColor,
      userImageUrl,
      userMeta,
      hasCustomSubtitleColor,
      subtitleColor,
    } = event.effect;

    try {
      await credits.db.saveCreditsSection(sectionId, {
        weight: sectionWeight,
        title: sectionName,
        titleColor: hasCustomSectionHeaderColor
          ? sectionHeaderColor
          : undefined,
      });

      await credits.db.addCreditEntry(
        sectionId,
        username,
        {
          displayName: userDisplayName,
          displayNameColor: hasCustomDisplayNameColor
            ? displayNameColor
            : undefined,
          imageUrl: userImageUrl,
          meta: userMeta,
          subtitle: sectionSubtitleFormat
            ? sectionSubtitleFormat
                .replace("{metadata}", userMeta)
            : undefined,
          subtitleColor: hasCustomSubtitleColor
            ? subtitleColor
            : undefined,
        },
      );
    } catch (error) {}
  },
};
