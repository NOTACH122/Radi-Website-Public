import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Logo from "./Logo";
import { SHOW_CLINIC_PORTAL_LINK } from "@/lib/feature-flags";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0b100e] text-[#d7ded9]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div
          className={`grid gap-10 sm:grid-cols-2 ${
            SHOW_CLINIC_PORTAL_LINK ? "lg:grid-cols-4" : "lg:grid-cols-3"
          }`}
        >
          <div>
            <Logo size={32} wordmarkClassName="text-base font-semibold text-white" />
            <p className="mt-3 text-sm leading-relaxed text-[#9aa39e]">
              {t("tagline")}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">{t("phoneLabel")}</p>
            <a
              href={`tel:${t("phone").replace(/\s+/g, "")}`}
              className="mt-2 block text-sm text-[#9aa39e] hover:text-accent"
            >
              {t("phone")}
            </a>
            <p className="mt-4 text-sm font-semibold text-white">
              {t("emailLabel")}
            </p>
            <a
              href={`mailto:${t("email")}`}
              className="mt-2 block text-sm text-[#9aa39e] hover:text-accent"
            >
              {t("email")}
            </a>
            <a
              href={`mailto:${t("email2")}`}
              className="mt-1 block text-sm text-[#9aa39e] hover:text-accent"
            >
              {t("email2")}
            </a>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              {t("addressLabel")}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#9aa39e]">
              {t("address")}
            </p>
          </div>

          {SHOW_CLINIC_PORTAL_LINK && (
            <div>
              <p className="text-sm font-semibold text-white">
                {nav("clinicPortal")}
              </p>
              <a
                href="https://clinics.radi.ge"
                className="mt-3 inline-block rounded-full border border-[#2a322f] px-4 py-2 text-sm font-medium text-[#d7ded9] transition-colors hover:border-accent hover:text-accent"
              >
                {t("clinicCta")}
              </a>
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[#232b28] pt-6 text-xs text-[#7e8883] sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} Radi Inspection Services. {t("rights")}
          </span>
          <Link href="/request-inspection" className="hover:text-accent">
            {nav("requestInspection")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
