import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Button, Divider } from "@/shared/components";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "@/shared/components/dropdown";
import { cn } from "@/shared/utils";

export const buttonGroupVariants = cva(
  "has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md flex w-fit items-stretch *:focus-visible:z-10 *:focus-visible:relative [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          "[&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-md! [&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical:
          "[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-md! flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

export function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}

export function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={cn(
        "bg-muted flex items-center gap-2 rounded-md border px-2 text-xs font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

export function ButtonGroupSeparator({ className, type = "vertical", ...props }: React.ComponentProps<typeof Divider>) {
  return (
    <Divider
      data-slot="button-group-separator"
      type={type}
      className={cn(
        "bg-input relative self-stretch data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto",
        className
      )}
      {...props}
    />
  );
}

interface ButtonGroupProps extends React.ComponentProps<typeof Button> {
  items?: ItemButtonDropdown[];
}

export interface ItemButtonDropdown {
  name: string;
  component?: React.ReactNode;
}

export const ButtonDropdown = ({ children, items, variant, className, ...props }: ButtonGroupProps) => {
  return (
    <ButtonGroup>
      <Button {...props} variant={variant} className={cn("text-2xs", className)}>
        {children}
      </Button>
      {variant !== "outline" && <ButtonGroupSeparator className="h-auto" />}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} icon="chevron_down" size="icon" className={cn("shrink-0", className)} />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="flex w-fit">
          <DropdownMenuGroup className="flex w-fit flex-col">
            {items?.map((item) => (
              <DropdownMenuItem key={item.name} className="h-fit w-fit gap-2 p-0.5">
                {item.component}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
};
