"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { UnitTable, formatResult } from "@/lib/dose-calculators";

interface UnitConverterProps {
  units: UnitTable;
  convention?: "valuePerBase" | "unitsPerBase";
  defaultFrom?: string;
  defaultTo?: string;
}

export default function UnitConverter({
  units,
  convention = "valuePerBase",
  defaultFrom,
  defaultTo,
}: UnitConverterProps) {
  const t = useTranslations("calculators.common");
  const unitKeys = useMemo(() => Object.keys(units), [units]);
  const [from, setFrom] = useState(defaultFrom ?? unitKeys[0]);
  const [to, setTo] = useState(defaultTo ?? unitKeys[1] ?? unitKeys[0]);
  const [value, setValue] = useState("1");

  const result = useMemo(() => {
    const numeric = parseFloat(value);
    if (!Number.isFinite(numeric)) return null;
    const fromMultiplier = units[from];
    const toMultiplier = units[to];
    if (fromMultiplier === undefined || toMultiplier === undefined) return null;
    return convention === "valuePerBase"
      ? (numeric * fromMultiplier) / toMultiplier
      : (numeric * toMultiplier) / fromMultiplier;
  }, [value, from, to, units, convention]);

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
      <div className="hidden sm:block" />
      <div>
        <label className="text-sm font-medium">{t("from")}</label>
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-border-strong bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
        >
          {unitKeys.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm font-medium">{t("to")}</label>
        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-border-strong bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
        >
          {unitKeys.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2 rounded-xl bg-accent-wash px-5 py-4">
        <p className="text-sm font-medium text-accent-dark dark:text-accent">
          {t("result")}
        </p>
        <p className="mt-1 text-2xl font-semibold text-accent-dark dark:text-accent">
          {result === null ? "—" : `${formatResult(result)} ${to}`}
        </p>
      </div>
    </div>
  );
}
