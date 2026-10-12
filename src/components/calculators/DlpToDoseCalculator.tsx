"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  AgeGroup,
  AGE_GROUPS,
  BodyRegion,
  BODY_REGIONS,
  DLP_TO_DOSE_COEFFICIENTS,
  DLP_TO_MSV_UNITS,
  formatResult,
} from "@/lib/dose-calculators";

export default function DlpToDoseCalculator() {
  const t = useTranslations("calculators.common");
  const tAge = useTranslations("calculators.ageGroups");
  const tRegion = useTranslations("calculators.bodyRegions");
  const unitKeys = useMemo(() => Object.keys(DLP_TO_MSV_UNITS), []);

  const [unit, setUnit] = useState(unitKeys[0]);
  const [age, setAge] = useState<AgeGroup>("ageAdult");
  const [region, setRegion] = useState<BodyRegion>("chest");
  const [value, setValue] = useState("1");

  const result = useMemo(() => {
    const numeric = parseFloat(value);
    if (!Number.isFinite(numeric)) return null;
    const unitMultiplier = DLP_TO_MSV_UNITS[unit];
    const k = DLP_TO_DOSE_COEFFICIENTS[region]?.[age];
    if (unitMultiplier === undefined || k === undefined) return null;
    const dlpInMGyCm = numeric * unitMultiplier;
    return dlpInMGyCm * k;
  }, [value, unit, age, region]);

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
      <div>
        <label className="text-sm font-medium">{t("patientAge")}</label>
        <select
          value={age}
          onChange={(e) => setAge(e.target.value as AgeGroup)}
          className="mt-1.5 w-full rounded-lg border border-border-strong bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
        >
          {AGE_GROUPS.map((a) => (
            <option key={a} value={a}>
              {tAge(a)}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm font-medium">{t("bodyRegion")}</label>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value as BodyRegion)}
          className="mt-1.5 w-full rounded-lg border border-border-strong bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
        >
          {BODY_REGIONS.map((r) => (
            <option key={r} value={r}>
              {tRegion(r)}
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
