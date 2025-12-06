import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/api/auth.api";

export const useAuth = () => {
  const router = useRouter();

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch (e) {
      console.error("Logout failed", e);
    } finally {
      router.refresh();
    }
  }, [router]);

  return {
    logout,
  };
};
