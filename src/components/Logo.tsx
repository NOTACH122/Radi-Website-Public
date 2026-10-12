export default function Logo({
  size = 36,
  withWordmark = true,
  wordmarkClassName = "text-lg font-semibold",
}: {
  size?: number;
  withWordmark?: boolean;
  wordmarkClassName?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.svg" alt="Radi" width={size} height={size} className="shrink-0" />
      {withWordmark && (
        <span className={wordmarkClassName}>Radi</span>
      )}
    </div>
  );
}
