"use client";
import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { useParams, usePathname, useRouter } from "next/navigation";
import { getPublicRoute } from "@/routes/utils";
import { useAuth } from "@/modules/auth/hooks";
import { useToast } from "@/shared/hooks";
import { cn, fallbackAvatar, capitalize } from "@/shared/utils";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/shared/components/dropdown";
import { DropdownMenuSub, DropdownMenuSubContent, DropdownMenuPortal } from "@/shared/components/dropdown";
import { DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSubTrigger } from "@/shared/components/dropdown";
import { P, DropdownMenu, Avatar, Icon, DropdownMenuTrigger, Badge } from "@/shared/components";
import { SwitcherSkeleton } from "@/modules/private/components";
import { OrganizationLogo } from "@/modules/organization/components";
import { trpc } from "@/trpc/client";

interface MenuAccountProps {
  className?: string;
}

/* prettier-ignore */
export const MenuAccount = ({ className }: MenuAccountProps) => {
  const t = useTranslations("menu.switcher");
  const toast = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const { organization } = useParams<{ organization: string }>();
  const { user, isPending, logOut, refetch } = useAuth();
  const avatarUrl = user?.image || fallbackAvatar(user?.name || (user?.email as string));

  const { data: allOrganizations } = trpc.organization.getAll.useQuery();
  const { mutateAsync: setActive } = trpc.organization.makeAsDefault.useMutation();
  const selected = allOrganizations?.data?.find((o) => o.id === organization) ?? allOrganizations?.data?.[0] ?? null;

  const handleLogOut = async () => {
    await logOut().then(() => {
      router.push(getPublicRoute("sign_in"));
    });
  };

  const handleSelect = useCallback(
    async (orgId: string) => {
      if (orgId === selected?.id) return;
      const { data, message, status } = await setActive({ param: orgId });

      if (status === "error" && message) {
        toast({ message, type: "error" });
        return;
      }

      /* redirect to the private route of selected organization */
      const redirectTo = pathname.replace(`/${selected?.id}`, `/${data?.id}`);
      router.push(redirectTo, { scroll: false });
      refetch();
    },
    [selected?.id, setActive, router]
  );

  if (isPending) return <SwitcherSkeleton />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={cn("text-2xs hover:bg-accent mt-auto flex h-fit w-full items-center justify-normal gap-2 rounded-md p-2", className )}>
          <Avatar url={avatarUrl} size="sm" />
          <div className="flex flex-col items-start">
            <P className="text-accent-foreground text-2xs font-medium">{user?.name}</P>
            <span className="text-3xs text-muted-foreground -mt-0.5">{user?.email}</span>
          </div>
          <Icon name="chevron_expand" className="text-muted-foreground ml-auto size-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72 min-w-56 rounded-md py-2">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <div className="flex flex-col justify-center gap-1">
              <P className="text-3xs ml-0.5">{t("current")}</P>
              <div className="flex w-full flex-row gap-2 py-1">
                <OrganizationLogo url={selected?.logo as string} />
                <div className="flex w-full flex-col items-start gap-1 text-start">
                  <p className="max-w-[17ch] truncate text-xs leading-none font-semibold">{selected?.name}</p>
                  <span className="text-muted-foreground text-3xs -mt-0.5">
                    {t("role", {
                      role: capitalize(selected?.role as string) as string,
                      count: selected?.members as number,
                    })}
                  </span>
                </div>
              </div>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="w-fit min-w-56 rounded-md py-2">
                  <DropdownMenuRadioGroup value={selected?.id} onValueChange={handleSelect}>
                    {allOrganizations?.data?.map((org) => {
                      return (
                        <DropdownMenuRadioItem key={org.id} value={org.id} className="group hover:bg-accent">
                          <div className="flex h-full w-full items-center gap-2">
                            <OrganizationLogo url={org?.logo as string} className="size-6" />
                            <P className="text-foreground text-2xs">{org.name}</P>
                            {org.role !== "owner" && (
                              <Badge variant="outline" className="text-3xs w-fit px-2">
                                {t("invited")}
                              </Badge>
                            )}
                          </div>
                        </DropdownMenuRadioItem>
                      );
                    })}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </div>
          </DropdownMenuSubTrigger>
        </DropdownMenuSub>

        <DropdownMenuSeparator className="bg-accent" />
        <DropdownMenuItem onClick={handleLogOut} className="text-2xs flex h-10 w-full items-center gap-2 px-3 py-2">
          <Icon name="logout" className="size-4" />
          {t("logOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
