import { Button, Separator } from "@/shared/components/ui";

export const FormAuthOauth = () => {
  return (
    <div className="flex h-fit w-full flex-col items-center gap-y-3 py-2">
      <Button icon="google" variant="accent" place="start" className="w-full">
        Google
      </Button>
      <Button icon="microsoft" variant="accent" place="start" className="w-full">
        Microsoft
      </Button>
      <Separator className="my-3 w-full" text="or" />
    </div>
  );
};
