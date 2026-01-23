"use client";

import React, { useState } from "react";
import Input from "../../../UI/shared/elements/Input";
import { useTranslations } from "next-intl";

interface PriceFilterProps {
  min: number;
  max: number;
  minVal: number;
  maxVal: number;
  onChange: (min: number, max: number) => void;
}

export default function PriceFilter({
  min,
  max,
  minVal,
  maxVal,
  onChange,
}: PriceFilterProps) {
  const t = useTranslations("CATALOG_PAGE.FILTERS");

  const [localMin, setLocalMin] = useState(minVal);
  const [localMax, setLocalMax] = useState(maxVal);

  const [prevMinVal, setPrevMinVal] = useState(minVal);
  const [prevMaxVal, setPrevMaxVal] = useState(maxVal);

  if (minVal !== prevMinVal) {
    setPrevMinVal(minVal);
    setLocalMin(minVal);
  }

  if (maxVal !== prevMaxVal) {
    setPrevMaxVal(maxVal);
    setLocalMax(maxVal);
  }

  const handleBlur = () => {
    let newMin = localMin;
    let newMax = localMax;

    if (newMin < min) newMin = min;
    if (newMax > max) newMax = max;
    if (newMin > newMax) {
      const temp = newMin;
      newMin = newMax;
      newMax = temp;
    }

    setLocalMin(newMin);
    setLocalMax(newMax);
    onChange(newMin, newMax);
  };

  return (
    <div className="flex gap-4 w-full items-center">
      <div className="w-full">
        <Input
          id="min-price"
          label={t("MIN")}
          type="number"
          value={localMin}
          onChange={(e) => setLocalMin(Number(e.target.value))}
          onBlur={handleBlur}
          secondary
          min={min}
          max={max}
        />
      </div>
      <span className="text-gray-500">-</span>
      <div className="w-full">
        <Input
          id="max-price"
          label={t("MAX")}
          type="number"
          value={localMax}
          onChange={(e) => setLocalMax(Number(e.target.value))}
          onBlur={handleBlur}
          secondary
          min={min}
          max={max}
        />
      </div>
    </div>
  );
}
