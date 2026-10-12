"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  DAP_TO_MSV_UNITS,
  RADIOGRAPH_COEFFICIENTS,
  formatResult,
} from "@/lib/dose-calculators";

export default function DapToDoseCalculator() {
  const t = useTranslations("calculators.common");
  const tTypes = useTranslations("calculators.radiographTypes");
  const unitKeys = useMemo(() => Object.keys(DAP_TO_MSV_UNITS), []);
  const typeKeys = useMemo(() => Object.keys(RADIOGRAPH_COEFFICIENTS), []);

  const [unit, setUnit] = useState(unitKeys[0]);
  const [type, setType] = useState(typeKeys[0]);
  const [value, setValue] = useState("1");

  const result = useMemo(() => {
    const numeric = parseFloat(value);
    if (!Number.isFinite(numeric)) return null;
    const unitMultiplier = DAP_TO_MSV_UNITS[unit];
    const coefficient = RADIOGRAPH_COEFFICIENTS[type];
    if (unitMultiplier === undefined || coefficient === undefined) return null;
    return numeric * unitMultiplier * coefficient;
  }, [value, unit, type]);

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
        <label className="text-sm font-medium">{t("radiographType")}</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-border-strong bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
        >
          {typeKeys.map((key) => (
            <option key={key} value={key}>
              {tTypes(key)}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2 rounded-xl bg-accent-wash px-5 py-4">
        <p className="text-sm font-medium text-accent-dark dark:text-accent">
          {t("effectiveDose")}
        </p>
        <p className="mt-1 text-2xl font-semibold text-accent-dark dark:text-accent">
          {result === null ? "—" : `${formatResult(result)} mSv`}
        </p>
      </div>
    </div>
  );
}
