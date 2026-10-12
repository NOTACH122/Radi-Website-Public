import { getTranslations } from "next-intl/server";

export default async function RequestInspectionPage() {
  const t = await getTranslations("requestInspection");
  const phone = t("phone");

  return (
    <div className="mx-auto max-w-6xl px-6 py-32 text-center">
      <h1 className="text-3xl font-semibold sm:text-4xl">{t("title")}</h1>
      <p className="mt-4 text-secondary">{t("subtitle")}</p>
      <a
        href={`tel:${phone.replace(/\s+/g, "")}`}
        className="mt-4 inline-block text-2xl font-semibold text-accent hover:text-accent-dark dark:hover:text-accent"
      >
        {phone}
      </a>
    </div>
  );
}
