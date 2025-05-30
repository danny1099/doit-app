import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

/* Request path i18n config */
const i18nPath = "./src/lib/i18n/core/request.ts";
const withNextIntl = createNextIntlPlugin(i18nPath);

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
