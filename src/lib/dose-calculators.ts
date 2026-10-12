// Coefficient sources:
// - HPA-CRCE-028 (2011): DAP-to-effective-dose coefficients for radiography
// - AAPM Report No. 96 (2008, Table 3, corrected per the April 3, 2008 erratum):
//   DLP-to-effective-dose k-factors by age and body region
// - CDC / NCRP Report 160: polonium-210 / lead-210 radiation dose from tobacco
// - FAA CARI dose model / Health Physics Society: average cosmic radiation dose
//   rate during commercial flight
// - Consensus CBCT FOV-based DAP-to-effective-dose k-factors (dental/
//   maxillofacial cone-beam CT dosimetry literature)

export type UnitTable = Record<string, number>;

// Normalized to Gy.cm2 = 1.0
export const DAP_UNITS: UnitTable = {
  "uGy.cm2": 0.000001,
  "mGy.cm2": 0.001,
  "cGy.cm2": 0.01,
  "dGy.cm2": 0.1,
  "Gy.cm2": 1.0,
  "uGy.m2": 0.01,
  "mGy.m2": 10,
  "Gy.m2": 10000,
};

// Subset used by the DAP-to-dose calculator, also normalized to Gy.cm2 = 1.0
export const DAP_TO_MSV_UNITS: UnitTable = {
  "Gy.cm2": 1.0,
  "mGy.cm2": 0.001,
  "cGy.cm2": 0.01,
  "dGy.cm2": 0.1,
  "uGy.m2": 0.01,
  "Gy.m2": 10000,
};

// mSv per Gy.cm2, source: HPA-CRCE-028 (2011)
export const RADIOGRAPH_COEFFICIENTS: Record<string, number> = {
  chestPA: 0.16,
  chestLat: 0.13,
  cervicalSpineAP: 0.19,
  cervicalSpineLat: 0.12,
  headAP: 0.058,
  headPA: 0.034,
  headLat: 0.037,
  shoulderAP: 0.064,
  shoulderAxial: 0.046,
  thoracicSpineAP: 0.24,
  thoracicSpineLat: 0.091,
  lumbarSpineAP: 0.22,
  lumbarSpineLat: 0.092,
  lumbosacralJointLat: 0.078,
  abdomenAP: 0.18,
  pelvisAP: 0.14,
  singleHipAP: 0.13,
  bothHipsAP: 0.13,
  femurAP: 0.036,
  femurLat: 0.0034,
  kneeAP: 0.0034,
  kneeLat: 0.003,
  footDorsiPlantar: 0.0032,
  footOblique: 0.0032,
};

// Normalized to Gy.cm = 1.0 (the cm and m sub-families are internally
// consistent: 1 m = 100 cm is already baked into each multiplier)
export const DLP_UNITS: UnitTable = {
  "mGy.cm": 0.001,
  "cGy.cm": 0.01,
  "dGy.cm": 0.1,
  "Gy.cm": 1.0,
  "uGy.m": 0.0001,
  "mGy.m": 0.1,
  "cGy.m": 1.0,
  "dGy.m": 10,
  "Gy.m": 100,
};

// Subset used by the DLP-to-dose calculator, normalized to mGy.cm = 1.0
export const DLP_TO_MSV_UNITS: UnitTable = {
  "Gy.cm": 1000,
  "dGy.cm": 100,
  "cGy.cm": 10,
  "mGy.cm": 1.0,
  "uGy.cm": 0.001,
};

export const AGE_GROUPS = ["age0", "age1", "age5", "age10", "ageAdult"] as const;
export type AgeGroup = (typeof AGE_GROUPS)[number];

export const BODY_REGIONS = [
  "headNeck",
  "head",
  "neck",
  "chest",
  "abdomenPelvis",
  "trunk",
] as const;
export type BodyRegion = (typeof BODY_REGIONS)[number];

// k (mSv per mGy.cm), AAPM Report No. 96, Table 3
export const DLP_TO_DOSE_COEFFICIENTS: Record<BodyRegion, Record<AgeGroup, number>> = {
  headNeck: { age0: 0.013, age1: 0.0085, age5: 0.0057, age10: 0.0042, ageAdult: 0.0031 },
  head: { age0: 0.011, age1: 0.0067, age5: 0.004, age10: 0.0032, ageAdult: 0.0021 },
  neck: { age0: 0.017, age1: 0.012, age5: 0.011, age10: 0.0079, ageAdult: 0.0059 },
  chest: { age0: 0.039, age1: 0.026, age5: 0.018, age10: 0.013, ageAdult: 0.014 },
  abdomenPelvis: { age0: 0.049, age1: 0.03, age5: 0.02, age10: 0.015, ageAdult: 0.015 },
  trunk: { age0: 0.044, age1: 0.028, age5: 0.019, age10: 0.014, ageAdult: 0.015 },
};

// Values represent "units of that type per 1 mGy/s" (inverse convention —
// see UnitConverter's `unitsPerBase` mode)
export const DOSE_RATE_UNITS: UnitTable = {
  "uGy/s": 1000,
  "uGy/m": 60000,
  "uGy/h": 3600000,
  "mGy/s": 1.0,
  "mGy/m": 60,
  "mGy/h": 3600,
};

// Subset used by the CBCT dose calculator, normalized to mGy.cm2 = 1.0
export const CBCT_DAP_UNITS: UnitTable = {
  "Gy.cm2": 1000,
  "cGy.cm2": 10,
  "mGy.cm2": 1.0,
  "uGy.cm2": 0.001,
};

export const FOV_CATEGORIES = ["small", "medium", "large"] as const;
export type FovCategory = (typeof FOV_CATEGORIES)[number];

// k (uSv per mGy.cm2), consensus CBCT FOV-based conversion factors
export const CBCT_K_FACTORS: Record<FovCategory, number> = {
  small: 0.129,
  medium: 0.111,
  large: 0.074,
};

export const FLIGHT_DOSE_PER_HOUR_MSV = 0.004;
export const CIGARETTE_DOSE_PER_UNIT_MSV = 0.00005;
export const CIGARETTE_DOSE_PER_PACK_YEAR_MSV = 0.36;

export function formatResult(value: number): string {
  if (!Number.isFinite(value)) return "—";
  if (value === 0) return "0";
  const abs = Math.abs(value);
  if (abs < 0.0001 || abs >= 1_000_000) {
    return value.toExponential(4);
  }
  return parseFloat(value.toFixed(6)).toString();
}
