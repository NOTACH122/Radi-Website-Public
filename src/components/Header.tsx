"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";
import {
  SHOW_CLINIC_PORTAL_LINK,
  SHOW_HEADER_REQUEST_BUTTON,
} from "@/lib/feature-flags";

const SECTION_IDS = ["why-us", "team"] as const;

const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/#why-us", key: "whyUs", sectionId: "why-us" },
  { href: "/#team", key: "employees", sectionId: "team" },
  { href: "/services", key: "services" },
  { href: "/calculators", key: "calculators" },
  { href: "/contact", key: "contact" },
] as const;

// Home / Why Us / Team are sections of one merged page, so they share a
// single sliding underline instead of each fading in/out independently.
const MERGED_KEYS = ["home", "whyUs", "employees"];

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    visible: false,
  });

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const targets = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(visible.target.id);
        } else if (window.scrollY < 200) {
          setActiveSection(null);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const el = document.getElementById(hash);
    if (!el) return;
    requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth" }));
    setActiveSection(hash);
  }, [pathname]);

  function handleNavClick(
    item: (typeof NAV_ITEMS)[number],
    e: React.MouseEvent<HTMLAnchorElement>
  ) {
    if (!("sectionId" in item) || pathname !== "/") return;
    e.preventDefault();
    document
      .getElementById(item.sectionId)
      ?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}#${item.sectionId}`
    );
    setActiveSection(item.sectionId);
  }

  function isActive(item: (typeof NAV_ITEMS)[number]) {
    if ("sectionId" in item) {
      return pathname === "/" && activeSection === item.sectionId;
    }
    if (item.href === "/") {
      return pathname === "/" && !activeSection;
    }
    return pathname.startsWith(item.href);
  }

  useEffect(() => {
    function measure() {
      const activeMerged = NAV_ITEMS.find(
        (item) => MERGED_KEYS.includes(item.key) && isActive(item)
      );
      const navEl = navRef.current;
      const targetEl = activeMerged ? itemRefs.current[activeMerged.key] : null;

      if (!navEl || !targetEl) {
        setIndicator((prev) => ({ ...prev, visible: false }));
        return;
      }

      const navRect = navEl.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      setIndicator({
        left: targetRect.left - navRect.left + 12,
        width: targetRect.width - 24,
        visible: true,
      });
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, activeSection]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <nav ref={navRef} className="relative hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item);
            const merged = MERGED_KEYS.includes(item.key);
            return (
              <div
                key={item.href}
                ref={(el) => {
                  if (merged) itemRefs.current[item.key] = el;
                }}
              >
                <Link
                  href={item.href}
                  scroll={!("sectionId" in item)}
                  onClick={(e) => handleNavClick(item, e)}
                  className={`relative block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "text-accent"
                      : "text-secondary hover:text-foreground"
                  }`}
                >
                  {t(item.key)}
                  {!merged && (
                    <span
                      className="pointer-events-none absolute inset-x-3 -bottom-[1px] h-0.5 rounded-full"
                      style={{
                        backgroundColor: active
                          ? "var(--accent)"
                          : "var(--border-strong)",
                        opacity: active ? 1 : 0,
                        transition: active
                          ? "background-color 150ms ease-out, opacity 150ms ease-out"
                          : "background-color 150ms ease-out, opacity 650ms ease-out 100ms",
                      }}
                    />
                  )}
                </Link>
              </div>
            );
          })}

          <span
            className="pointer-events-none absolute -bottom-[1px] h-0.5 rounded-full bg-accent"
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: `${indicator.width}px`,
              opacity: indicator.visible ? 1 : 0,
              transition:
                "transform 400ms ease, width 400ms ease, opacity 200ms ease",
            }}
          />
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
          {SHOW_CLINIC_PORTAL_LINK && (
            <a
              href="https://clinics.radi.ge"
              className="rounded-full border border-border-strong px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent"
            >
              {t("clinicPortal")}
            </a>
          )}
          {SHOW_HEADER_REQUEST_BUTTON && (
            <Link
              href="/request-inspection"
              className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              {t("requestInspection")}
            </Link>
          )}
        </div>

        <button
          type="button"
          className="lg:hidden flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            {open ? (
              <path d="M3 3L15 15M15 3L3 15" strokeLinecap="round" />
            ) : (
              <path d="M2 5H16M2 9H16M2 13H16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-surface px-6 py-4">
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  scroll={!("sectionId" in item)}
                  onClick={(e) => {
                    handleNavClick(item, e);
                    setOpen(false);
                  }}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-500 ${
                    active
                      ? "bg-accent-wash text-accent-dark dark:text-accent"
                      : "text-secondary hover:bg-surface-muted hover:text-foreground"
                  }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 flex items-center justify-between gap-3">
            <LanguageSwitcher />
            {SHOW_CLINIC_PORTAL_LINK && (
              <a
                href="https://clinics.radi.ge"
                className="rounded-full border border-border-strong px-4 py-2 text-sm font-medium text-secondary"
              >
                {t("clinicPortal")}
              </a>
            )}
          </div>
          {SHOW_HEADER_REQUEST_BUTTON && (
            <Link
              href="/request-inspection"
              onClick={() => setOpen(false)}
              className="mt-3 block rounded-full bg-accent px-4 py-2 text-center text-sm font-semibold text-white"
            >
              {t("requestInspection")}
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
