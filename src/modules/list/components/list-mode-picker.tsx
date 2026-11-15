"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Icon, IconName, P, CheckboxCard } from "@/shared/components";

interface ModePickerProps {
  value: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const ModePicker = ({ value = "PERSONAL", onChange }: ModePickerProps) => {
  const [selected, setSelected] = useState<string>(value);
  const t = useTranslations("lists.mode");

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange!(value);
  };

  const modes = [
    {
      name: "PERSONAL",
      icon: "person",
      label: t("personal.label"),
      description: t("personal.description"),
    },
    {
      name: "STUDENT",
      icon: "student",
      label: t("student.label"),
      description: t("student.description"),
    },
    {
      name: "DEV",
      icon: "dev",
      label: t("dev.label"),
      description: t("dev.description"),
    },
  ];

  return (
    <div className="mt-0.5 grid w-full grid-cols-3 gap-4">
      {modes.map(({ name, icon, label, description }) => (
        <CheckboxCard
          key={name}
          value={name}
          checked={selected === name}
          onCheckedChange={(checked) => {
            return checked ? handleSelect(name) : handleSelect("");
          }}
        >
          <div className="border-input flex h-24 w-full flex-col items-center justify-center gap-1 rounded-lg border p-2">
            <Icon name={icon as IconName} className="text-foreground mt-2 size-5 shrink-0" />
            <div className="grid w-full flex-1 text-center">
              <P className="text-accent-foreground text-3xs font-medium">{label}</P>
              <span className="text-4xs text-foreground/70 max-sm:line-clamp-2">{description}</span>
            </div>
          </div>
        </CheckboxCard>
      ))}
    </div>
  );
};
