import { getTranslations } from "next-intl/server";
import { SITE_PHOTOS } from "@/lib/photos";
import ExpandableItemList from "@/components/ExpandableItemList";

interface ServiceItem {
  label: string;
  description: string;
}

export default async function ServicesPage() {
  const t = await getTranslations("services");
  const otherServicesPhone = t("otherServices.phone");
  const equipment = t.raw("compliance.equipment") as ServiceItem[];
  const premises = t.raw("compliance.premises") as ServiceItem[];
  const shieldingItems = t.raw("shielding.items") as ServiceItem[];
  const consultancyItems = t.raw("consultancy.items") as ServiceItem[];

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <img
            src={SITE_PHOTOS.servicesCtMachine}
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

      <div className="mx-auto max-w-6xl space-y-14 px-6 py-14">
        <section>
          <div className="flex items-baseline gap-3">
            <span className="text-sm font-semibold text-accent">01</span>
            <h2 className="text-2xl font-semibold">{t("compliance.title")}</h2>
          </div>
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold">
                {t("compliance.equipmentTitle")}
              </h3>
              <p className="mt-1 text-sm text-secondary">
                {t("compliance.equipmentIntro")}
              </p>
              <p className="mt-1 text-xs text-secondary">
                {t("clickToExpand")}
              </p>
              <ExpandableItemList items={equipment} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {t("compliance.premisesTitle")}
              </h3>
              <p className="mt-1 text-sm text-secondary">
                {t("compliance.premisesIntro")}
              </p>
              <p className="mt-1 text-xs text-secondary">
                {t("clickToExpand")}
              </p>
              <ExpandableItemList items={premises} />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <div className="flex items-baseline gap-3">
            <span className="text-sm font-semibold text-accent">02</span>
            <h2 className="text-2xl font-semibold">{t("shielding.title")}</h2>
          </div>
          <p className="mt-3 leading-relaxed text-secondary">
            {t("shielding.description")}
          </p>
          <p className="mt-4 text-sm font-medium">{t("shielding.itemsIntro")}</p>
          <ExpandableItemList items={shieldingItems} variant="outline" />
          <p className="mt-4 leading-relaxed text-secondary">
            {t("shielding.closing")}
          </p>
        </section>

        <section>
          <div className="flex items-baseline gap-3">
            <span className="text-sm font-semibold text-accent">03</span>
            <h2 className="text-2xl font-semibold">{t("consultancy.title")}</h2>
          </div>
          <p className="mt-3 leading-relaxed text-secondary">
            {t("consultancy.description")}
          </p>
          <ExpandableItemList items={consultancyItems} />
        </section>

        <section className="rounded-2xl bg-accent-wash p-6 sm:p-8">
          <div className="flex items-baseline gap-3">
            <span className="text-sm font-semibold text-accent-dark dark:text-accent">
              04
            </span>
            <h2 className="text-2xl font-semibold text-accent-dark dark:text-accent">
              {t("safetyPlans.title")}
            </h2>
          </div>
          <p className="mt-3 leading-relaxed text-foreground">
            {t("safetyPlans.description")}
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <div className="flex items-baseline gap-3">
            <span className="text-sm font-semibold text-accent">05</span>
            <h2 className="text-2xl font-semibold">
              {t("otherServices.title")}
            </h2>
          </div>
          <p className="mt-3 leading-relaxed text-secondary">
            {t("otherServices.description")}
          </p>
          <a
            href={`tel:${otherServicesPhone.replace(/\s+/g, "")}`}
            className="mt-2 inline-block text-xl font-semibold text-accent hover:text-accent-dark dark:hover:text-accent"
          >
            {otherServicesPhone}
          </a>
        </section>
      </div>
    </div>
  );
}
