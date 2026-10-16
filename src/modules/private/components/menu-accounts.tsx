"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { getPublicRoute } from "@/routes/utils";
import { useAuth } from "@/modules/auth/hooks";
import { cn, fallbackAvatar } from "@/shared/utils";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/dropdown";
import { P, DropdownMenu, Avatar, Icon } from "@/shared/components";
import { SwitcherSkeleton } from "@/modules/private/components";

interface MenuAccountProps {
  className?: string;
}

/* prettier-ignore */
export const MenuAccount = ({ className }: MenuAccountProps) => {
  const t = useTranslations("menu");
  const router = useRouter();
  const { user, isPending, logOut  } = useAuth();
  const avatarUrl = user?.image || fallbackAvatar(user?.name || user?.email as string)

  const handleLogOut = async () => {
    await logOut().then(() => {
      router.push(getPublicRoute("sign_in"));
    });
  };

  if (isPending) return <SwitcherSkeleton />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={cn("text-2xs hover:bg-accent mt-auto flex h-fit w-full items-center justify-normal gap-2 rounded-md p-2", className)}>
          <Avatar url={avatarUrl} size="sm" />
          <div className="flex flex-col items-start">
            <P className="text-accent-foreground text-2xs font-medium">{user?.name}</P>
            <span className="text-3xs text-muted-foreground -mt-0.5">{user?.email}</span>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-72 min-w-56 rounded-md py-2">
        <DropdownMenuItem onClick={handleLogOut}  className="text-2xs flex items-center gap-2 h-8 px-3 py-2 w-full">
          <Icon name="logout" className="size-4" />
          {t("logOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
