"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { FLIGHT_DOSE_PER_HOUR_MSV, formatResult } from "@/lib/dose-calculators";

export default function FlightDoseCalculator() {
  const t = useTranslations("calculators.common");
  const [hours, setHours] = useState("1");

  const result = useMemo(() => {
    const numeric = parseFloat(hours);
    if (!Number.isFinite(numeric)) return null;
    return numeric * FLIGHT_DOSE_PER_HOUR_MSV;
  }, [hours]);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className="text-sm font-medium">{t("flightDuration")}</label>
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-border-strong bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
      </div>
      <div className="hidden sm:block" />
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
