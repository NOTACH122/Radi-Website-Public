import { getTranslations } from "next-intl/server";
import CalculatorsShell from "@/components/calculators/CalculatorsShell";
import { SITE_PHOTOS } from "@/lib/photos";

export default async function CalculatorsPage() {
  const t = await getTranslations("calculators");

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <img
            src={SITE_PHOTOS.facilityHallway}
            alt=""
            className="h-full w-full scale-110 object-cover opacity-50 blur-md dark:opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-16">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-accent-wash px-3 py-1 text-xs font-semibold text-accent-dark dark:text-accent">
              {t("eyebrow")}
            </span>
            <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-secondary">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-14">
        <CalculatorsShell />
        <p className="mt-8 text-xs leading-relaxed text-secondary">
          {t("disclaimer")}
        </p>
      </div>
    </div>
  );
}
