import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { SUPPORTED_LOCALES } from "./i18n/utils";
import {
  getProxyCookie,
  setProxyCookie,
} from "./utils/cookies/server/cookiesServer";

const intlMiddleware = createMiddleware(routing);

const redis = Redis.fromEnv();

function getLimiter(path: string) {
  if (path.startsWith("/api/auth/"))
    return new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "10 s"),
    });

  if (path.startsWith("/api/"))
    return new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, "1 m"),
    });

  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(60, "1 m"),
  });
}

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const ip = getProxyCookie(req, "user_ip") || "127.0.0.1";

  let res: NextResponse = NextResponse.next();

  const isApiRoute = pathname.startsWith("/api/");

  const isTesting = process.env.NEXT_PUBLIC_TESTING_MODE === "true";

  if (isApiRoute) {
    const shouldLimit = isTesting
      ? pathname.startsWith("/api/auth/testing-mode")
      : true;

    if (shouldLimit) {
      const limiter = getLimiter(pathname);
      const key = `${pathname}-${ip}`;
      const { success } = await limiter.limit(key);

      if (!success)
        return NextResponse.json(
          { error: "TOO_MANY_REQUESTS" },
          { status: 429 }
        );
    }
  } else {
    res = intlMiddleware(req);

    const pathLocale = pathname.split("/")[1];
    const preferredLocale = getProxyCookie(req, "preferred_locale");

    if (
      pathLocale &&
      (SUPPORTED_LOCALES as readonly string[]).includes(pathLocale) &&
      preferredLocale &&
      pathLocale !== preferredLocale
    ) {
      setProxyCookie(res, "locale_mismatch", pathLocale, {
        httpOnly: false,
      });
    }

    const isAuthorized = getProxyCookie(req, "isAuthorized");
    if (
      isTesting &&
      !pathname.endsWith("/auth-testing-mode") &&
      !isAuthorized
    ) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/auth-testing-mode";
      return NextResponse.redirect(redirectUrl);
    }

    if (
      (!isTesting || isAuthorized) &&
      pathname.endsWith("/auth-testing-mode")
    ) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/";
      return NextResponse.redirect(redirectUrl);
    }

    const hasPreferredLocale = getProxyCookie(req, "preferred_locale");
    if (!hasPreferredLocale) {
      const acceptLang = req.headers.get("accept-language");
      const browserLocale = acceptLang?.split(",")[0]?.split("-")[0]?.trim();
      const isSupportedLocale =
        browserLocale &&
        (SUPPORTED_LOCALES as readonly string[]).includes(browserLocale);
      if (isSupportedLocale)
        setProxyCookie(res, "preferred_locale", browserLocale);
    }
  }

  return res;
}

export const config = {
  matcher: ["/api/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
