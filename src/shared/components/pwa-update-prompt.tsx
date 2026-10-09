"use client";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { sileo } from "sileo";
import { useSerwist } from "@serwist/turbopack/react";

export const PwaUpdatePrompt = () => {
  const { serwist } = useSerwist();
  const t = useTranslations("pwa");
  const refreshRequested = useRef(false);

  useEffect(() => {
    if (!serwist) return;

    const handleWaiting = () => {
      sileo.show({
        title: t("update_available.title"),
        description: t("update_available.content"),
        type: "action",
        duration: null,
        button: {
          title: t("update_available.action"),
          onClick: () => {
            refreshRequested.current = true;
            serwist.messageSkipWaiting();
          },
        },
      });
    };

    const handleControlling = () => {
      if (refreshRequested.current) window.location.reload();
    };

    serwist.addEventListener("waiting", handleWaiting);
    serwist.addEventListener("controlling", handleControlling);

    return () => {
      serwist.removeEventListener("waiting", handleWaiting);
      serwist.removeEventListener("controlling", handleControlling);
    };
  }, [serwist, t]);

  return null;
};
