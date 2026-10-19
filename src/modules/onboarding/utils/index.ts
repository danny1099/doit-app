import { OnboardingAnswers, StepConfig, StepName, STEPS_ORDER } from "@/modules/onboarding/types";

export const FLOW_STEPS: Partial<Record<StepName, StepConfig>> = {
  information: {
    name: "information",
    title: "steps.account.title",
    description: "steps.account.subtitle",
  },
  workspace: {
    name: "workspace",
    title: "steps.brand.title",
    description: "steps.brand.subtitle",
  },
  finish: {
    name: "finish",
    title: "steps.finish.title",
    description: "steps.finish.subtitle",
  },
};

export function getVisibleSteps(answers: OnboardingAnswers): StepName[] {
  return STEPS_ORDER.filter((step) => {
    const isVisible = FLOW_STEPS[step]?.isVisible;
    return isVisible ? isVisible(answers) : true;
  });
}

export function getNextStep(current: StepName, answers: OnboardingAnswers): StepName | null {
  const visible = getVisibleSteps(answers);
  const idx = visible.indexOf(current);
  return visible[idx + 1] ?? null;
}

export function getPrevStep(current: StepName, answers: OnboardingAnswers): StepName | null {
  const visible = getVisibleSteps(answers);
  const idx = visible.indexOf(current);
  return idx > 0 ? visible[idx - 1] : null;
}
