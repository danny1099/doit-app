"use client";
import { useState } from "react";
import { cn } from "@/shared/utils";
import { Input, Button } from "@/shared/components";

interface Props {
  placeholder?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  value?: string;
}

export const SearchBox = ({ placeholder, className, onChange, defaultValue, value }: Props) => {
  return (
    <div className="flex h-fit w-full flex-row items-center">
      <Input
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        slot="end"
        sizes="md"
        icon="search"
        variant="accent"
        className={cn("w-full md:w-96", className)}
      />
    </div>
  );
};

export const SearchBoxMobile = ({ placeholder, className, onChange, defaultValue, value }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-fit w-fit flex-row items-center gap-1">
      <Button variant="ghost" icon="search" size="icon" onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <Input
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          sizes="sm"
          variant="ghost"
          className={cn("h-7 w-68", isOpen ? "bg-muted block" : "hidden", className)}
        />
      )}
    </div>
  );
};
