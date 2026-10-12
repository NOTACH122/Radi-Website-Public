import { getTranslations } from "next-intl/server";
import ClientCarousel from "@/components/ClientCarousel";
import { SHOW_CLIENT_CAROUSEL } from "@/lib/feature-flags";
import { SITE_PHOTOS } from "@/lib/photos";

export default async function WhyUsSection() {
  const t = await getTranslations("whyUs");
  const accreditations = t.raw("accreditations") as string[];
  const stats = t.raw("stats") as { value: string; label: string }[];
  const clients = t.raw("clients") as string[];

  return (
    <section
      id="why-us"
      className="scroll-mt-24 border-y border-border bg-surface-muted py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-accent-wash px-3 py-1 text-xs font-semibold text-accent-dark dark:text-accent">
              {t("eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-secondary">
              {t("subtitle")}
            </p>
          </div>
          <div className="relative h-56 overflow-hidden rounded-3xl shadow-sm sm:h-72">
            <img
              src={SITE_PHOTOS.doctorPatientConsult}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-accent-dark/70 via-accent-dark/10 to-transparent mix-blend-multiply" />
          </div>
        </div>

        <div className="mt-14">
          <h3 className="text-lg font-semibold">
            {t("accreditationsTitle")}
          </h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {accreditations.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-wash text-accent-dark">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 10.5L8 14.5L16 5.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm leading-relaxed text-secondary">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-semibold">{t("statsTitle")}</h3>
          <div className="mt-5 grid grid-cols-1 items-start gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex min-w-0 flex-col justify-center rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent"
              >
                <div className="break-words text-2xl font-semibold leading-tight text-accent">
                  {s.value}
                </div>
                <div className="mt-1 break-words text-sm text-secondary">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {SHOW_CLIENT_CAROUSEL && (
          <div className="mt-20">
            <h3 className="text-center text-lg font-medium">
              {t("clientsTitle")}
            </h3>
            <div className="mt-8">
              <ClientCarousel clients={clients} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
