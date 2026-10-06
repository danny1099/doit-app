## Variables de entorno

## Tipado de variables

Environment variables are typed using the library (`@t3-oss/env-nextjs`) on both the client and server, and the exported `env` object must be used to access each variable.

```typescript
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    APP_URL: z.string(),
    ENCRYPTION_KEY: z.string(),
    AUTH_GOOGLE_ID: z.string(),
    AUTH_GOOGLE_SECRET: z.string(),
    AUTH_SECRET: z.string(),
    RESEND_API_KEY: z.string(),
    RESEND_SENDER_NAME: z.string(),
    RESEND_FROM_EMAIL: z.string(),
    DATABASE_URL: z.string(),
    CLOUDINARY_NAME: z.string(),
    CLOUDINARY_API_KEY: z.string(),
    CLOUDINARY_SECRET: z.string(),
    STRIPE_CLIENT_ID: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
    MODEL_AI_API_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_STRIPE_CONNECT_CLIENT_ID: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    APP_URL: process.env.APP_URL,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    AUTH_SECRET: process.env.AUTH_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_SENDER_NAME: process.env.RESEND_SENDER_NAME,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    DATABASE_URL: process.env.DATABASE_URL,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
    STRIPE_CLIENT_ID: process.env.STRIPE_CLIENT_ID,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    MODEL_AI_API_KEY: process.env.MODEL_AI_API_KEY,
  },
  emptyStringAsUndefined: true,
});
```
