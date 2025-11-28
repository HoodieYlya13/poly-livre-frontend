'use client';

import { setClientCookie } from '@/utils/cookies/client/cookiesClient';
import { setUserIp } from '@/utils/cookies/client/setUserIp';
import { useEffect } from 'react';

export default function GeoFallbackFetcher() {
  useEffect(() => {
    fetch("https://ipinfo.io/json")
      .then((res) => res.json())
      .then((geo) => {
        if (geo?.ip) setUserIp(geo.ip);
        let country = "unknown";
        if (typeof geo?.country === "string" && geo.country.length === 2)
          country = geo.country.toUpperCase();

          setClientCookie("user_country", country, {
            path: "/",
            maxAge: 60 * 60 * 24,
            sameSite: "Lax",
          });
      })
      .catch((err) => {
        console.warn("GeoFallbackFetcher error:", err);
      });
  }, []);

  return null;
}