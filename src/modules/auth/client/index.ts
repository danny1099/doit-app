import { createAuthClient } from "better-auth/react";
import { emailOTPClient, inferAdditionalFields, lastLoginMethodClient } from "better-auth/client/plugins";
import type { auth as authConfig } from "@/modules/auth/config";

export const auth = createAuthClient({
  plugins: [emailOTPClient(), lastLoginMethodClient(), inferAdditionalFields<typeof authConfig>()],
});
