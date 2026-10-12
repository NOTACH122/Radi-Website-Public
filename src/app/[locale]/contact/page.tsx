import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/ContactForm";
import { SITE_PHOTOS } from "@/lib/photos";

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <img
            src={SITE_PHOTOS.equipmentRoom}
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

      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-8">
            <ContactForm />
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold">{t("detailsTitle")}</h2>
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-secondary">
                    {t("phoneLabel")}
                  </dt>
                  <dd className="mt-1 text-sm">
                    <a
                      href={`tel:${t("phone").replace(/\s+/g, "")}`}
                      className="hover:text-accent"
                    >
                      {t("phone")}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-secondary">
                    {t("emailLabel")}
                  </dt>
                  <dd className="mt-1 text-sm">
                    <a
                      href={`mailto:${t("email")}`}
                      className="block hover:text-accent"
                    >
                      {t("email")}
                    </a>
                    <a
                      href={`mailto:${t("email2")}`}
                      className="mt-0.5 block hover:text-accent"
                    >
                      {t("email2")}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-secondary">
                    {t("addressLabel")}
                  </dt>
                  <dd className="mt-1 text-sm">{t("address")}</dd>
                </div>
              </dl>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
                {t("mapLabel")}
              </p>
              <div className="relative mt-3 h-56 overflow-hidden rounded-2xl border border-border">
                <img
                  src={SITE_PHOTOS.waitingRoom}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent-dark/70 via-accent-dark/20 to-transparent mix-blend-multiply" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 22s7-7.58 7-13a7 7 0 10-14 0c0 5.42 7 13 7 13z"
                      stroke="white"
                      strokeWidth="1.5"
                      fill="rgba(0,0,0,0.15)"
                    />
                    <circle cx="12" cy="9" r="2.5" stroke="white" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
