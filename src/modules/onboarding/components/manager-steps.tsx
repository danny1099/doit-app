"use client";
import { useTranslations } from "next-intl";
import { AnimatedContent, P, Heading } from "@/shared/components";
import { useOnboardingStore } from "@/modules/onboarding/store";
import { FormInfo, FormWorkspace, FormFinish } from "@/modules/onboarding/components";
import { FLOW_STEPS } from "@/modules/onboarding/utils";
import { StepConfig } from "@/modules/onboarding/types";

export const OnboardingWizard = () => {
  const t = useTranslations("onboarding");
  const store = useOnboardingStore((state) => state);
  const currentStep = FLOW_STEPS[store.currentStep] as StepConfig;

  return (
    <section className="flex size-full flex-col items-center">
      <div className="mt-5 flex w-full flex-col max-sm:px-4 md:w-110">
        <Heading type="h1" className="text-2xl">
          {t(currentStep.title)}
        </Heading>
        <P className="text-pretty">{t(currentStep.description)}</P>
      </div>
      <AnimatedContent className="flex h-full w-full flex-col items-center">
        {currentStep.name === "information" && <FormInfo />}
        {currentStep.name === "workspace" && <FormWorkspace />}
        {currentStep.name === "finish" && <FormFinish />}
      </AnimatedContent>
    </section>
  );
};
