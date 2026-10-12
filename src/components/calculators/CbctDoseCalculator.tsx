"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  CBCT_DAP_UNITS,
  CBCT_K_FACTORS,
  FovCategory,
  FOV_CATEGORIES,
  formatResult,
} from "@/lib/dose-calculators";

export default function CbctDoseCalculator() {
  const t = useTranslations("calculators.common");
  const tFov = useTranslations("calculators.fovCategories");
  const unitKeys = useMemo(() => Object.keys(CBCT_DAP_UNITS), []);

  const [unit, setUnit] = useState(unitKeys[0]);
  const [fov, setFov] = useState<FovCategory>("medium");
  const [value, setValue] = useState("1");

  const result = useMemo(() => {
    const numeric = parseFloat(value);
    if (!Number.isFinite(numeric)) return null;
    const unitMultiplier = CBCT_DAP_UNITS[unit];
    const kFactor = CBCT_K_FACTORS[fov];
    if (unitMultiplier === undefined || kFactor === undefined) return null;
    const dapInMGyCm2 = numeric * unitMultiplier;
    return dapInMGyCm2 * kFactor;
  }, [value, unit, fov]);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className="text-sm font-medium">{t("value")}</label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-border-strong bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
      </div>
      <div>
        <label className="text-sm font-medium">{t("from")}</label>
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-border-strong bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
        >
          {unitKeys.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="text-sm font-medium">{t("fovCategory")}</label>
        <select
          value={fov}
          onChange={(e) => setFov(e.target.value as FovCategory)}
          className="mt-1.5 w-full rounded-lg border border-border-strong bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
        >
          {FOV_CATEGORIES.map((key) => (
            <option key={key} value={key}>
              {tFov(key)}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2 rounded-xl bg-accent-wash px-5 py-4">
        <p className="text-sm font-medium text-accent-dark dark:text-accent">
          {t("effectiveDose")}
        </p>
        <p className="mt-1 text-2xl font-semibold text-accent-dark dark:text-accent">
          {result === null ? "—" : `${formatResult(result)} µSv`}
        </p>
      </div>
    </div>
  );
}
