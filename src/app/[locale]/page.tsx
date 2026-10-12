import { getTranslations } from "next-intl/server";
import localFont from "next/font/local";
import { Link } from "@/i18n/navigation";
import ClientCarousel from "@/components/ClientCarousel";
import WhyUsSection from "@/components/sections/WhyUsSection";
import TeamSection from "@/components/sections/TeamSection";
import {
  SHOW_CLIENT_CAROUSEL,
  SHOW_CLINIC_PORTAL_LINK,
} from "@/lib/feature-flags";
import { SITE_PHOTOS } from "@/lib/photos";

const bpgNinoMtavruli = localFont({
  src: "../../fonts/BPGNinoMtavruli.ttf",
  variable: "--font-bpg-nino",
  display: "swap",
});

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path
        d="M4 10H16M16 10L11 5M16 10L11 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function HomePage() {
  const t = await getTranslations("home");
  const nav = await getTranslations("nav");
  const clients = t.raw("clients") as string[];
  const highlights = t.raw("highlights") as { title: string; description: string }[];

  const quickLinks = [
    { key: "services", href: "/services", external: false },
    ...(SHOW_CLINIC_PORTAL_LINK
      ? [{ key: "clinicPortal", href: "https://clinics.radi.ge", external: true }]
      : []),
    { key: "contact", href: "/contact", external: false },
  ] as const;

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <img
            src={SITE_PHOTOS.heroCtRoom}
            alt=""
            className="h-full w-full scale-110 object-cover opacity-50 blur-md dark:opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-accent-wash/60 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-accent-wash px-3 py-1 text-xs font-semibold text-accent-dark dark:text-accent">
              {t("heroEyebrow")}
            </span>
            <h1
              className={`${bpgNinoMtavruli.className} mt-6 text-4xl font-semibold sm:text-5xl`}
            >
              {t("heroTitle")}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-secondary">
              {t("heroSubtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/request-inspection"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
              >
                {t("ctaPrimary")}
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-border-strong px-6 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
              >
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {SHOW_CLIENT_CAROUSEL && (
        <section className="border-y border-border bg-surface-muted py-12">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-center text-xs font-semibold uppercase tracking-wider text-secondary">
              {t("trustedEyebrow")}
            </p>
            <h2 className="mt-2 text-center text-lg font-medium">
              {t("trustedTitle")}
            </h2>
            <div className="mt-8">
              <ClientCarousel clients={clients} />
            </div>
          </div>
        </section>
      )}

      <WhyUsSection />
      <TeamSection />

      <section className="relative overflow-hidden border-y border-border bg-surface-muted py-24">
        <div className="absolute inset-0" aria-hidden>
          <img
            src={SITE_PHOTOS.waitingRoom}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-20 blur-md dark:opacity-10"
          />
          <div className="absolute inset-0 bg-surface-muted/85" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6">
          <h2 className="text-center text-2xl font-semibold sm:text-3xl">
            {t("highlightsTitle")}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-wash text-accent-dark">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 10.5L8 14.5L16 5.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 font-semibold">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary">
                  {h.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div
          className={`mx-auto grid max-w-4xl gap-6 px-6 ${
            quickLinks.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
          }`}
        >
          {quickLinks.map((item) => {
            const content = (
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-wash text-accent-dark transition-colors group-hover:bg-accent group-hover:text-white">
                  <ArrowIcon />
                </span>
                <span className="font-medium">{nav(item.key)}</span>
              </>
            );
            const className =
              "group flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-6 text-center transition-colors hover:border-accent";

            return item.external ? (
              <a key={item.key} href={item.href} className={className}>
                {content}
              </a>
            ) : (
              <Link key={item.key} href={item.href} className={className}>
                {content}
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
