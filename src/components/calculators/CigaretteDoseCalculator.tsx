"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  CIGARETTE_DOSE_PER_PACK_YEAR_MSV,
  CIGARETTE_DOSE_PER_UNIT_MSV,
  formatResult,
} from "@/lib/dose-calculators";

export default function CigaretteDoseCalculator() {
  const t = useTranslations("calculators.common");
  const [cigarettes, setCigarettes] = useState("1");
  const [packsPerDay, setPacksPerDay] = useState("1");

  const perExposure = useMemo(() => {
    const numeric = parseFloat(cigarettes);
    if (!Number.isFinite(numeric)) return null;
    return numeric * CIGARETTE_DOSE_PER_UNIT_MSV;
  }, [cigarettes]);

  const perYear = useMemo(() => {
    const numeric = parseFloat(packsPerDay);
    if (!Number.isFinite(numeric)) return null;
    return numeric * CIGARETTE_DOSE_PER_PACK_YEAR_MSV;
  }, [packsPerDay]);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">{t("numberOfCigarettes")}</label>
          <input
            type="number"
            value={cigarettes}
            onChange={(e) => setCigarettes(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-border-strong bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
        </div>
        <div className="rounded-xl bg-accent-wash px-5 py-4">
          <p className="text-sm font-medium text-accent-dark dark:text-accent">{t("perExposure")}</p>
          <p className="mt-1 text-2xl font-semibold text-accent-dark dark:text-accent">
            {perExposure === null ? "—" : `${formatResult(perExposure)} mSv`}
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">{t("packsPerDay")}</label>
          <input
            type="number"
            value={packsPerDay}
            onChange={(e) => setPacksPerDay(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-border-strong bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
        </div>
        <div className="rounded-xl bg-accent-wash px-5 py-4">
          <p className="text-sm font-medium text-accent-dark dark:text-accent">{t("perYear")}</p>
          <p className="mt-1 text-2xl font-semibold text-accent-dark dark:text-accent">
            {perYear === null ? "—" : `${formatResult(perYear)} mSv`}
          </p>
        </div>
      </div>
    </div>
  );
}
