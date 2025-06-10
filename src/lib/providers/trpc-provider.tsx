"use client";
import React, { useState } from "react";
import { httpBatchStreamLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { api, createQueryClient } from "@/trpc/client";
import { absoluteUrl } from "@/shared/utils";
import { type AppRouter } from "@/trpc/router";
import SuperJSON from "superjson";

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
  if (typeof window === "undefined") {
    return createQueryClient();
  }
  return (clientQueryClientSingleton ??= createQueryClient());
};

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export const TrpcProvider = ({ children }: Children) => {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchStreamLink({
          transformer: SuperJSON,
          url: absoluteUrl("/api/trpc"),
          headers: () => {
            const headers = new Headers();
            headers.set("x-trpc-source", "rsc");
            return headers;
          },
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </api.Provider>
    </QueryClientProvider>
  );
};
