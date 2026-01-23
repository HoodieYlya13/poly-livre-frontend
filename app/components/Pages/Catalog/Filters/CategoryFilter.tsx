"use client";

import { cn } from "@/utils/styles.utils";
import { useTranslations } from "next-intl";

interface CategoryFilterProps {
  styles: string[];
  selectedStyles: string[];
  onChange: (styles: string[]) => void;
}

export default function CategoryFilter({
  styles,
  selectedStyles,
  onChange,
}: CategoryFilterProps) {
  const t = useTranslations("CATALOG_PAGE.FILTERS");

  const toggleStyle = (style: string) => {
    if (selectedStyles.includes(style)) {
      onChange(selectedStyles.filter((s) => s !== style));
    } else {
      onChange([...selectedStyles, style]);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text-lg">{t("CATEGORY")}</h3>
      <div className="flex flex-col gap-2">
        {styles.map((style) => {
          const isSelected = selectedStyles.includes(style);
          return (
            <button
              key={style}
              onClick={() => toggleStyle(style)}
              className={cn(
                "text-left px-3 py-2 rounded-lg text-sm transition-all duration-200",
                isSelected
                  ? "bg-primary text-primary-foreground font-medium"
                  : "hover:bg-gray-100 text-gray-600",
              )}
            >
              {style}
            </button>
          );
        })}
      </div>
    </div>
  );
}
