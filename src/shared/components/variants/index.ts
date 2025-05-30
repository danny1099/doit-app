import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center border-transparent rounded-sm border p-2 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        tertiary: "bg-tertiary text-tertiary-foreground",
        outline: "text-foreground border border-border bg-background",
        accent: "bg-accent text-accent-foreground",
        custom: "border-none bg-background text-foreground",
      },
      size: {
        sm: "h-6 px-2 py-1",
        md: "h-8 px-3 py-2",
        lg: "h-10 px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export const ctaVariants = cva(
  "inline-flex items-center gap-x-2 justify-center whitespace-nowrap rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-80",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        tertiary: "bg-tertiary text-tertiary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "bg-background text-foreground border border-border",
        accent: "bg-accent text-accent-foreground border border-border",
        ghost: "bg-transparent border-none text-foreground",
      },
      size: {
        md: "h-10 rounded-md px-4 py-1",
        sm: "h-8 rounded-md px-3",
        lg: "h-12 rounded-md px-8",
        icon: "h-8 w-8 rounded-sm p-0.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export const inputVariants = cva("w-56 flex items-center gap-1 px-2 rounded-md autofill:bg-transparent", {
  variants: {
    variant: {
      ghost: "bg-transparent text-foreground",
      outline: "border border-input bg-background text-foreground",
      accent: "bg-accent text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground",
    },
    sizes: {
      sm: "h-8",
      md: "h-10",
      lg: "h-12",
    },
  },
  defaultVariants: {
    variant: "outline",
    sizes: "md",
  },
});

export const avatarVariants = cva(
  "relative inline-flex items-center justify-center bg-secondary text-secondary-foreground ring-offset-1 transition-colors ring-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        rounded: "rounded-full",
        squared: "rounded-md",
      },
      size: {
        md: "h-9 w-9",
        sm: "h-6 w-6",
        lg: "h-12 w-12",
      },
      ring: {
        white: "ring-white",
        black: "ring-black",
        blue: "ring-blue-500",
        red: "ring-red-500",
        green: "ring-green-500",
        yellow: "ring-yellow-500",
        purple: "ring-purple-500",
        pink: "ring-pink-500",
        gray: "bg-gray-400",
      },
    },
    defaultVariants: {
      variant: "rounded",
      size: "md",
      ring: "white",
    },
  }
);

export const dotVariants = cva(
  "absolute -bottom-0.5 right-0 h-2 w-2 rounded-full ring-1 ring-white ring-offset-1",
  {
    variants: {
      radius: {
        full: "rounded-full",
        md: "rounded-md",
        sm: "rounded-sm",
      },
      size: {
        md: "h-3 w-3",
        sm: "h-2 w-2",
        lg: "h-5 w-5",
      },
      color: {
        white: "bg-white",
        black: "bg-black",
        blue: "bg-blue-500",
        red: "bg-red-500",
        green: "bg-green-500",
        yellow: "bg-yellow-500",
        purple: "bg-purple-500",
        pink: "bg-pink-500",
        gray: "bg-gray-400",
      },
    },
    defaultVariants: {
      radius: "full",
      size: "sm",
      color: "black",
    },
  }
);

export const sheetVariants = cva(
  "fixed z-50 gap-2 bg-background p-2 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-5/6 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-5/6 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

export const dividerVariants = cva("bg-border", {
  variants: {
    type: {
      vertical: "w-[1px] h-6",
      horizontal: "h-[1px] w-6",
    },
  },
  defaultVariants: {
    type: "vertical",
  },
});
