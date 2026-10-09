import { Badge, P, Reveal, Title } from "@/shared/components";
import { cn } from "@/shared/utils";

interface Props {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

/* prettier-ignore */
export const SectionHeading = ({ eyebrow, title, subtitle, align = "center", className }: Props) => {
  const centered = align === "center";

  return (
    <Reveal className={cn("flex flex-col", centered ? "items-center text-center" : "items-start text-left", className)}>
      <Badge variant="outline" className="text-2xs bg-background font-medium">{eyebrow}</Badge>
      <Title type="h2" className="mt-4 max-w-2xl text-3xl leading-[1.05] tracking-tighter text-balance md:text-5xl">
        {title}
      </Title>
      {subtitle && (
        <P className={cn("mt-4 max-w-xl leading-relaxed text-pretty md:text-sm", centered && "mx-auto")}>{subtitle}</P>
      )}
    </Reveal>
  );
};
