import { siteConfig } from "@/config/site";

/** Live site URL for admin preview links — localhost uses current origin. */
export function getPublicSiteUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return siteConfig.url;
}
