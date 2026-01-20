export function getEmailProvider(email?: string) {
  if (!email) return null;

  const domainParts = email.split("@")[1]?.toLowerCase().split(".");
  if (!domainParts || domainParts.length < 2) return null;

  const tld = domainParts.slice(1).join(".");
  const providerName = domainParts[0];

  const map: Record<
    string,
    { name: string; url?: string; getUrl?: (tld: string) => string }
  > = {
    gmail: { name: "Gmail", url: "https://mail.google.com" },
    yahoo: {
      name: "Yahoo Mail",
      getUrl: (tld) => `https://mail.yahoo.${tld}`,
    },
    hotmail: { name: "Outlook", url: "https://outlook.live.com" },
    outlook: { name: "Outlook", url: "https://outlook.live.com" },
    live: { name: "Outlook", url: "https://outlook.live.com" },
    icloud: { name: "iCloud Mail", url: "https://www.icloud.com/mail" },
    orange: {
      name: "Orange Mail",
      getUrl: (tld) => `https://messagerie.orange.${tld}`,
    },
    sfr: { name: "SFR Mail", getUrl: (tld) => `https://webmail.sfr.${tld}` },
    laposte: {
      name: "La Poste Mail",
      url: "https://www.laposte.net/accueil",
    },
    free: {
      name: "Free Mail",
      getUrl: (tld) => `https://webmail.free.${tld}`,
    },
    proton: {
      name: "Proton Mail",
      url: "https://account.proton.me/",
    },
  };

  const provider = map[providerName];
  if (!provider) return null;

  return {
    name: provider.name,
    url: provider.getUrl ? provider.getUrl(tld) : provider.url!,
  };
}