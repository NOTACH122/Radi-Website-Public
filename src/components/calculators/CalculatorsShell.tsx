"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  DAP_UNITS,
  DLP_UNITS,
  DOSE_RATE_UNITS,
} from "@/lib/dose-calculators";
import UnitConverter from "./UnitConverter";
import DapToDoseCalculator from "./DapToDoseCalculator";
import CbctDoseCalculator from "./CbctDoseCalculator";
import DlpToDoseCalculator from "./DlpToDoseCalculator";
import FlightDoseCalculator from "./FlightDoseCalculator";
import CigaretteDoseCalculator from "./CigaretteDoseCalculator";

const CALCULATOR_KEYS = [
  "dapConverter",
  "dapToDose",
  "cbctDose",
  "dlpConverter",
  "dlpToDose",
  "doseRate",
  "flight",
  "cigarette",
] as const;

type CalculatorKey = (typeof CALCULATOR_KEYS)[number];

export default function CalculatorsShell() {
  const t = useTranslations("calculators.items");
  const [active, setActive] = useState<CalculatorKey>(CALCULATOR_KEYS[0]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {CALCULATOR_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setActive(key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === key
                ? "bg-accent text-white"
                : "border border-border-strong text-secondary hover:border-accent hover:text-accent"
            }`}
          >
            {t(`${key}.name`)}
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <h2 className="text-lg font-semibold">{t(`${active}.name`)}</h2>
        <p className="mt-1 text-sm text-secondary">{t(`${active}.description`)}</p>
        <div className="mt-6">
          {active === "dapConverter" && (
            <UnitConverter units={DAP_UNITS} defaultFrom="Gy.cm2" defaultTo="mGy.cm2" />
          )}
          {active === "dapToDose" && <DapToDoseCalculator />}
          {active === "cbctDose" && <CbctDoseCalculator />}
          {active === "dlpConverter" && (
            <UnitConverter units={DLP_UNITS} defaultFrom="Gy.cm" defaultTo="mGy.cm" />
          )}
          {active === "dlpToDose" && <DlpToDoseCalculator />}
          {active === "doseRate" && (
            <UnitConverter
              units={DOSE_RATE_UNITS}
              convention="unitsPerBase"
              defaultFrom="mGy/s"
              defaultTo="uGy/s"
            />
          )}
          {active === "flight" && <FlightDoseCalculator />}
          {active === "cigarette" && <CigaretteDoseCalculator />}
        </div>
      </div>
    </div>
  );
}
