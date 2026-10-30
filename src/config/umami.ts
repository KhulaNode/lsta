const websiteIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function getUmamiConfig() {
  const rawUrl = process.env.NEXT_PUBLIC_UMAMI_URL?.trim();
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID?.trim();

  if (!rawUrl && !websiteId) return null;
  if (!rawUrl || !websiteId || !websiteIdPattern.test(websiteId)) {
    throw new Error("Umami requires a valid NEXT_PUBLIC_UMAMI_URL and NEXT_PUBLIC_UMAMI_WEBSITE_ID.");
  }

  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new Error("NEXT_PUBLIC_UMAMI_URL must be a valid HTTPS origin.");
  }

  if (url.protocol !== "https:" || url.pathname !== "/" || url.search || url.hash || url.username || url.password) {
    throw new Error("NEXT_PUBLIC_UMAMI_URL must be an HTTPS origin without a path or credentials.");
  }

  return { origin: url.origin, websiteId };
}
