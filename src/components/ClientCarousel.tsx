function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ClientCarousel({ clients }: { clients: string[] }) {
  const track = [...clients, ...clients];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="animate-carousel flex w-max gap-4">
        {track.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex shrink-0 items-center gap-3 rounded-xl border border-border bg-surface px-5 py-4 shadow-sm"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-wash text-sm font-bold text-accent-dark dark:text-accent">
              {initials(name)}
            </span>
            <span className="whitespace-nowrap text-sm font-medium text-secondary">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
