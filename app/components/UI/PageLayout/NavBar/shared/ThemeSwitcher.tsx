"use client";

import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import Switcher from "./Switcher";
import Icon from "../../../shared/elements/SVGs/Icon";
import { IconName } from "../../../shared/elements/SVGs/IconRegistry";
import { Theme } from "../../../../../../utils/theme.utils";

const renderIcon = (t: IconName) => (
  <div className="rounded-full hover:bg-background/10 transition-colors">
    <Icon name={t} className="size-8" />
  </div>
);

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Switcher
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      currentElement={renderIcon(theme)}
      activeKey={theme}
      elements={["light", "dark"].map((t) => ({
        key: t,
        content: renderIcon(t as IconName),
        onClick: () => setTheme(t as Theme),
      }))}
    />
  );
}
