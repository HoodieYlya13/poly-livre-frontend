"use client";

import { verifyMagicLink } from "@/utils/auth/verifyMagicLink";
import Link from "next/link";
import { useEffect, useState } from "react";

interface MagicLinkProps {
  token: string;
}

export default function MagicLink({ token }: MagicLinkProps) {
  const [status, setStatus] = useState<"loading" | "error">(() =>
    token ? "loading" : "error"
  );

  useEffect(() => {
    if (!token) return;

    verifyMagicLink(token).then((result) => {
      if (result && !result.success) setStatus("error");
    });
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      {status === "loading" ? (
        <p>Verifying your magic link...</p>
      ) : (
        <div className="text-center">
          <h1 className="text-xl font-bold text-red-500 mb-2">
            Verification Failed
          </h1>
          <p>The magic link is invalid or has expired.</p>
          <Link
            href="/auth"
            className="text-blue-500 hover:underline mt-4 block"
          >
            Back to Login
          </Link>
        </div>
      )}
    </div>
  );
}