"use client";

import Button from "../../../shared/elements/Button";
import { useAuth } from "@/hooks/useAuth";
import Icon from "../../../shared/elements/SVGs/Icon";

export default function Logout() {
  const { logout } = useAuth();

  return <Button onClick={() => logout()} child={<Icon name="logout" />} />;
}
