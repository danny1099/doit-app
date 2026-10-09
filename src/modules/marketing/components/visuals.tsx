import { Icon, IconName } from "@/shared/components";
import { cn } from "@/shared/utils";

interface IconChipProps {
  name: IconName;
  className?: string;
}

/* Small square icon holder used across the marketing sections. */
export const IconChip = ({ name, className }: IconChipProps) => (
  <span className={cn("border-border/60 bg-muted/40 flex size-9 items-center justify-center rounded-xl border", className)}>
    <Icon name={name} className="text-tertiary size-4" />
  </span>
);

/* Abstract mini-visuals: they hint at the product without faking screenshots. */

export const CapturePreview = ({ className }: { className?: string }) => (
  <div className={cn("border-border/60 bg-background/60 rounded-xl border p-3", className)}>
    <div className="space-y-1.5">
      <div className="bg-foreground/10 h-1.5 w-full rounded-full" />
      <div className="bg-foreground/10 h-1.5 w-4/5 rounded-full" />
      <div className="bg-foreground/10 h-1.5 w-2/3 rounded-full" />
    </div>
    <div className="mt-3 flex items-center justify-between">
      <span className="bg-tertiary/10 text-tertiary flex h-5 items-center gap-1 rounded-full px-2 text-3xs font-medium">
        <span className="bg-tertiary size-1.5 rounded-full" />
        AI
      </span>
      <span className="bg-action flex size-5 items-center justify-center rounded-full">
        <Icon name="arrow_up" className="text-action-foreground size-3" />
      </span>
    </div>
  </div>
);

const rowWidths = ["w-24", "w-16", "w-20"];
const tagStyles = ["w-8 bg-tertiary/15", "w-6 bg-foreground/10", "w-10 bg-tertiary/15"];

export const OrganizePreview = ({ className }: { className?: string }) => (
  <div className={cn("flex flex-col gap-1.5", className)}>
    {rowWidths.map((width, index) => (
      <div
        key={width}
        className="border-border/60 bg-background/60 flex items-center gap-2 rounded-lg border p-2"
      >
        <span className="border-border/60 flex size-4 items-center justify-center rounded-xs border">
          <Icon name="check" className="text-tertiary size-2.5" />
        </span>
        <span className={cn("bg-foreground/10 h-1.5 rounded-full", width)} />
        <span className={cn("ml-auto h-3 rounded-full", tagStyles[index])} />
      </div>
    ))}
  </div>
);

const focusItems = [0, 1, 2];

export const FocusPreview = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center gap-4", className)}>
    <div className="relative grid size-14 shrink-0 place-items-center">
      <svg viewBox="0 0 36 36" aria-hidden className="size-14 -rotate-90">
        <circle cx="18" cy="18" r="15.5" fill="none" strokeWidth="2" className="stroke-muted" />
        <circle
          cx="18"
          cy="18"
          r="15.5"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="97.4"
          strokeDashoffset="29"
          className="stroke-tertiary"
        />
      </svg>
      <span className="text-foreground absolute text-2xs font-semibold tabular-nums">4</span>
    </div>
    <div className="flex-1 space-y-2">
      {focusItems.map((item) => (
        <div key={item} className="flex items-center gap-2">
          <span className="border-border/60 flex size-4 items-center justify-center rounded-full border">
            <Icon name="check" className="text-tertiary size-2.5" />
          </span>
          <span className={cn("bg-foreground/10 h-1.5 rounded-full", item === 0 ? "w-20" : item === 1 ? "w-14" : "w-16")} />
        </div>
      ))}
    </div>
  </div>
);
