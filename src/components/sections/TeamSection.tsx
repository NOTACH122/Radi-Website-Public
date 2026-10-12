import { getTranslations } from "next-intl/server";
import { SITE_PHOTOS } from "@/lib/photos";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

type Person = { name: string; role: string; credentials: string };

function TeamCard({
  person,
  featured = false,
}: {
  person: Person;
  featured?: boolean;
}) {
  return (
    <div
      className={`relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-surface text-center transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-lg ${
        featured
          ? "max-w-[16.5rem] border-[3px] border-accent p-7 shadow-sm"
          : "max-w-[15.5rem] border-2 border-accent/45 p-6"
      }`}
    >
      <img
        src={SITE_PHOTOS.equipmentRoom}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.13] grayscale dark:opacity-[0.16]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface/65 via-surface/90 to-surface/65" />
      <div className="relative flex flex-col items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-wash text-xl font-bold text-accent-dark">
          {initials(person.name)}
        </div>
        <h3 className="mt-4 text-lg font-bold">{person.name}</h3>
        {person.role && (
          <p className="mt-1.5 text-sm font-semibold text-accent-dark dark:text-accent">
            {person.role}
          </p>
        )}
        {person.credentials && (
          <p className="mt-2 text-sm leading-relaxed text-secondary">
            {person.credentials}
          </p>
        )}
      </div>
    </div>
  );
}

export default async function TeamSection({
  standalone = false,
}: {
  standalone?: boolean;
} = {}) {
  const t = await getTranslations("employees");
  const team = t.raw("team") as Person[];
  const Heading = standalone ? "h1" : "h2";
  const [founder, ...topRest] = team.slice(0, 3);
  const topRow = [topRest[0], founder, topRest[1]];
  const middleRow = team.slice(3, 5);
  const bottomRow = team.slice(5, 8);

  return (
    <section id="team" className="scroll-mt-24 relative overflow-hidden bg-background py-24">
      <div className="absolute inset-0" aria-hidden>
        <img
          src={SITE_PHOTOS.teamCorridor}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-40 blur-sm dark:opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/75 to-background" />
      </div>
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full bg-accent-wash px-3 py-1 text-xs font-semibold text-accent-dark dark:text-accent">
            {t("eyebrow")}
          </span>
          <Heading className="mt-4 text-3xl font-semibold sm:text-4xl">
            {t("title")}
          </Heading>
          <p className="mt-4 text-lg leading-relaxed text-secondary">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-6">
          {topRow.map((person) => (
            <TeamCard
              key={person.name}
              person={person}
              featured={person.name === founder.name}
            />
          ))}
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-6">
          {middleRow.map((person) => (
            <TeamCard key={person.name} person={person} />
          ))}
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-6">
          {bottomRow.map((person) => (
            <TeamCard key={person.name} person={person} />
          ))}
        </div>
      </div>
    </section>
  );
}
