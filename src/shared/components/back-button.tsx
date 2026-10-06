"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components";
import { cn } from "@/shared/utils";

interface BackButtonProps {
  redirectTo?: string;
  className?: string;
}

export const BackButton = ({ className, redirectTo }: BackButtonProps) => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      icon="chevron_left"
      onClick={() => (redirectTo ? router.push(redirectTo) : router.back())}
      className={cn("hover:bg-secondary absolute top-6 left-6 shrink-0", className)}
    >
      <span className="sr-only">go back</span>
    </Button>
  );
};
