import { cn } from "@/shared/utils";

interface Props {
  name: IconName;
  className?: string;
}

export const iconName = {
  sun: "sun",
  moon: "moon",
  dot: "dot",
  check: "check2",
  refresh: "arrow-clockwise",
  add: "plus-lg",
  minus: "minus-lg",
  close: "x-lg",
  arrow_right: "arrow-right",
  arrow_left: "arrow-left",
  arrow_up: "arrow-up",
  arrow_down: "arrow-down",
  download: "download",
  upload: "upload",
  ia: "stars",
  star: "star-fill",
  archive: "archive",
  tag: "bookmark",
  system: "laptop",
  translate: "translate",
  email: "envelope",
  password: "lock",
  google: "google",
  microsoft: "microsoft",
};

export type IconName = keyof typeof iconName;

export const Icon = ({ name, className = "h-4 w-4" }: Props) => {
  return (
    <svg className={cn("bi", className)} fill="currentColor">
      <use xlinkHref={`/images/img-icons-sprite.svg#${iconName[name]}`} />
    </svg>
  );
};
