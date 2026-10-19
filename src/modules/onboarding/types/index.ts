import type { useTranslations } from "next-intl";
import type { IconName } from "@/shared/components";

export const brandIcons: IconName[] = [
  "app",
  "apple",
  "anthropic",
  "alexa",
  "coin",
  "cup",
  "feather",
  "fire",
  "flower",
  "lightning",
];

/* types i18n translation for onboarding module */
export type OnboardingT = ReturnType<typeof useTranslations<"onboarding">>;
export type OnboardingKey = Parameters<OnboardingT>[0];
export type StepName = "information" | "workspace" | "payment_processor" | "finish";

export interface OnboardingAnswers {
  [key: string]: unknown;
}

export interface StepComponentProps {
  answers: OnboardingAnswers;
  onNext: (data?: Partial<OnboardingAnswers>) => void;
  onBack: () => void;
}

export interface StepConfig {
  name: StepName;
  title: OnboardingKey;
  description: OnboardingKey;
  isVisible?: (answers: OnboardingAnswers) => boolean;
}

export const STEPS_ORDER: StepName[] = ["information", "workspace", "finish"];
