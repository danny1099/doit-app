export type LegalDocKey = "terms" | "privacy" | "data_usage" | "cookies";

export interface LegalSection {
  id: string;
  title: string;
  paragraphs?: string[];
  list?: string[];
}

export interface LegalContent {
  title: string;
  subtitle: string;
  updated: string;
  sections: LegalSection[];
}
