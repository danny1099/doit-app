"use client";
import { SerwistProvider } from "@serwist/turbopack/react";
import { PwaUpdatePrompt } from "@/shared/components";

export const PwaProvider = ({ children }: Children) => {
  return (
    <SerwistProvider swUrl="/api/serwist/sw.js" disable={process.env.NODE_ENV === "development"}>
      <PwaUpdatePrompt />
      {children}
    </SerwistProvider>
  );
};
