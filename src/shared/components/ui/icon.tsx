import { cn } from "@/shared/utils";

interface Props {
  name: string;
  className?: string;
}

export const Icon = ({ name, className = "h-4 w-4" }: Props) => {
  return (
    <svg className={cn("bi", className)} fill="currentColor">
      <use xlinkHref={`/images/img-icons-sprite.svg#${name}`} />
    </svg>
  );
};
