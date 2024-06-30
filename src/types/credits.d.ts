type CreditEntryType = "follow" | "sub" | "cheer" | "tip" | "other";

type BaseCreditEntry = {
  type: CreditEntryType;
  user: {
    id: string;
    displayName: string;
    profileImageUrl: string;
  };
};

type CreditEntry =
  | (BaseCreditEntry & { type: "follow"; timestamp: number })
  | (BaseCreditEntry & { type: "sub"; tier: number; timestamp: number })
  | (BaseCreditEntry & { type: "cheer"; amount: number; timestamp: number })
  | (BaseCreditEntry & { type: "tip"; amount: number; timestamp: number })
  | (BaseCreditEntry & { type: "other"; timestamp: number });
