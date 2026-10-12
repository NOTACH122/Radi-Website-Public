"use client";

import { useState } from "react";

interface Item {
  label: string;
  description: string;
}

export default function ExpandableItemList({
  items,
  variant = "solid",
}: {
  items: Item[];
  variant?: "solid" | "outline";
}) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  function toggle(i: number) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  }

  return (
    <div className="mt-4 grid items-start gap-3 sm:grid-cols-2">
      {items.map((item, i) => {
        const isOpen = openItems.has(i);
        return (
          <div
            key={item.label}
            className={`overflow-hidden rounded-xl border transition-colors ${
              variant === "solid"
                ? "border-border bg-surface"
                : "border-border-strong bg-background"
            } ${isOpen ? "border-accent" : ""}`}
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-semibold"
              aria-expanded={isOpen}
            >
              <span>{item.label}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className={`shrink-0 text-secondary transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-accent" : ""
                }`}
              >
                <path
                  d="M2 5L7 10L12 5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {isOpen && (
              <div className="border-t border-border px-4 py-3 text-sm leading-relaxed text-secondary">
                {item.description}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
