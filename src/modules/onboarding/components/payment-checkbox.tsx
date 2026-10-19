"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { P, CheckboxCard } from "@/shared/components";
import { cn } from "@/shared/utils";

interface PaymentProcessorProps {
  value: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const PaymentProcessor = ({ value, onChange }: PaymentProcessorProps) => {
  const [selected, setSelected] = useState<string>(value);
  const t = useTranslations("onboarding.steps.connect");

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange!(value);
  };

  const paymentProcessors = [
    {
      name: "STRIPE",
      label: t("picker.stripe.label"),
      description: t("picker.stripe.desc"),
      className: "h-7 w-auto",
    },
  ];

  return (
    <div className="flex size-full flex-col gap-2 md:grid md:grid-cols-2">
      {paymentProcessors.map(({ name, label, description, className }) => (
        <CheckboxCard
          key={name}
          value={name}
          checked={selected === name}
          onCheckedChange={(checked) => {
            return checked ? handleSelect(name) : handleSelect("");
          }}
        >
          <div className="border-border size-full flex-col rounded-md border p-4 text-left">
            <div className="mb-4 flex">
              <img
                src={`/images/logo-${name.toLowerCase()}.svg`}
                alt={label}
                className={cn("shrink-0 object-cover", className)}
              />
            </div>
            <div className="mt-auto flex flex-col">
              <span className="text-foreground flex items-center gap-2 text-xs font-medium">{label}</span>
              <P className="text-2xs text-muted-foreground">{description}</P>
            </div>
          </div>
        </CheckboxCard>
      ))}
    </div>
  );
};
