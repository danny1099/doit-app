import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type StepName, type OnboardingAnswers, STEPS_ORDER } from "@/modules/onboarding/types";
import { getNextStep, getPrevStep } from "@/modules/onboarding/utils";

interface OnboardingState {
  name: string;
  avatar: string;
  workspace: string;
  logoUrl: string | undefined;
  processor: "STRIPE";
  currentStep: StepName;
  answers: OnboardingAnswers;
}

interface OnboardingActions {
  setName: (name: string) => void;
  setAvatar: (avatar: string) => void;
  setWorkspace: (workspace: string) => void;
  setLogoUrl: (logoUrl: string) => void;
  setProcessor: (processor: "STRIPE") => void;
  reset: () => void;
  nextStep: (data?: Partial<OnboardingAnswers>) => void;
  prevStep: () => void;
}

type OnboardingStore = OnboardingState & OnboardingActions;

const initialState: OnboardingState = {
  name: "",
  avatar: "",
  workspace: "",
  logoUrl: undefined,
  processor: "STRIPE",
  currentStep: STEPS_ORDER[0],
  answers: {},
};

export const useOnboardingStore = create<OnboardingStore>()(
  devtools((set, get) => ({
    ...initialState,

    setName: (name: string) => set({ name }),
    setAvatar: (avatar: string) => set({ avatar }),
    setWorkspace: (workspace: string) => set({ workspace }),
    setLogoUrl: (logoUrl: string) => set({ logoUrl }),
    setProcessor: (processor: "STRIPE") => set({ processor }),
    reset: () => set(initialState),

    /* handle next and prev step */
    nextStep: (data?: Partial<OnboardingAnswers>) => {
      const { currentStep, answers } = get();
      const updatedAnswers = { ...answers, ...data };

      set({ answers: updatedAnswers });
      const next = getNextStep(currentStep, updatedAnswers);
      if (next) set({ currentStep: next });
    },

    prevStep: () => {
      const { currentStep, answers } = get();
      const prev = getPrevStep(currentStep, answers);
      if (prev) set({ currentStep: prev });
    },
  }))
);
