
type CreditsDb = Record<string, CreditsSection>;

type CreditsSection = {
  weight: number;
  title: string;
  titleColor?: string;
  entries?: Record<string, CreditsEntry>;
}

type CreditsEntry = {
  displayName: string;
  displayNameColor?: string;
  imageUrl?: string;
  meta?: string;
  subtitle?: string;
  subtitleColor?: string;
}