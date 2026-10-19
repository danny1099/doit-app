"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage, Button } from "@/shared/components";
import { paymentProcessorSchema, type PaymentProcessorSchema } from "@/modules/onboarding/schema";
import { useOnboardingStore } from "@/modules/onboarding/store";
import { PaymentProcessor } from "@/modules/onboarding/components";

export const FormPaymentProcessor = () => {
  const store = useOnboardingStore((state) => state);
  const t = useTranslations("onboarding");

  const form = useForm<PaymentProcessorSchema>({
    resolver: zodResolver(paymentProcessorSchema),
    defaultValues: {
      processor: store.processor || "",
    },
  });

  const onSubmit = async (data: PaymentProcessorSchema) => {
    store.setProcessor(data.processor);
    store.nextStep();
  };

  useEffect(() => {
    if (store.processor) form.setValue("processor", store.processor);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 flex h-fit w-full flex-col max-sm:px-4 md:w-110">
        <div className="flex h-fit w-full flex-col gap-2">
          <FormField
            control={form.control}
            name="processor"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PaymentProcessor value={field.value as string} onChange={field.onChange} />
                </FormControl>
                {form.formState.errors["processor"] && <FormMessage />}
              </FormItem>
            )}
          />
        </div>
        <footer className="mt-5 flex w-full flex-col gap-2">
          <Button type="submit" className="mt-5 w-full" icon="arrow_right" disabled={!form.formState.isValid}>
            {t("form.continue")}
          </Button>
          <Button type="reset" variant="outline" onClick={store.prevStep} className="w-full">
            {t("form.previous")}
          </Button>
        </footer>
      </form>
    </Form>
  );
};
