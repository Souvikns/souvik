import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExperienceRole {
  company: string;
  href: string;
  title: string;
  location: string;
  type: string;
  range: string;
  span: string;
  current: boolean;
  points: string[];
}

interface ExperienceCardProps {
  label: string;
  moreLabel: string;
  summary: string;
  roles: ExperienceRole[];
}

export default function ExperienceCard({ label, moreLabel, summary, roles }: ExperienceCardProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  }

  return (
    <article className="rounded-3xl border border-border bg-card p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-muted px-3.5 py-1.5 text-sm font-medium">{label}</span>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls={panelId}
          className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {moreLabel}
          <ChevronDown className="size-4" aria-hidden />
        </button>
      </div>

      <ol className="mt-6 ml-1.5 flex flex-col gap-5 border-l-2 border-border pl-5">
        {roles.map((role) => (
          <li key={role.company} className="relative">
            <span
              aria-hidden
              className={cn(
                "absolute -left-[1.6rem] top-1.5 size-3 rounded-full ring-2 ring-card",
                role.current ? "bg-brand" : "bg-foreground",
              )}
            />
            <p className="text-lg font-medium leading-snug">
              {role.title} at {role.company}
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {role.span} · {role.location}
            </p>
          </li>
        ))}
      </ol>

      {open && (
        <div className="absolute -inset-3.5 z-20">
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close experience details"
            onClick={close}
            className="absolute inset-0 size-full cursor-zoom-out rounded-[2.5rem] bg-background/70 backdrop-blur-md animate-in fade-in-0 duration-200 motion-reduce:animate-none"
          />
          <div
            id={panelId}
            role="dialog"
            aria-modal="false"
            aria-labelledby={titleId}
            className="relative mx-auto max-w-5xl rounded-4xl border border-border bg-card px-5 pt-6 pb-2 shadow-2xl animate-in fade-in-0 zoom-in-[0.98] slide-in-from-bottom-3 duration-300 motion-reduce:animate-none sm:px-9 sm:pt-7"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <h2 id={titleId} className="rounded-full bg-muted px-3.5 py-1.5 text-sm font-medium">
                  {label}
                </h2>
                <span className="font-mono text-sm text-muted-foreground">{summary}</span>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close"
                className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="size-4.5" aria-hidden />
              </button>
            </div>

            <ol className="mt-4">
              {roles.map((role) => (
                <li
                  key={role.company}
                  className="flex flex-wrap gap-x-10 gap-y-4 border-t border-border py-7"
                >
                  <div className="min-w-0 max-w-sm flex-[1_1_16rem]">
                    <div className="flex items-center gap-2.5">
                      <span
                        aria-hidden
                        className={cn("size-3 rounded-full", role.current ? "bg-brand" : "bg-foreground")}
                      />
                      <span className="font-mono text-sm text-muted-foreground">{role.range}</span>
                    </div>
                    <a
                      href={role.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 inline-flex items-center gap-1.5 text-2xl font-semibold tracking-tight hover:text-brand-foreground transition-colors"
                    >
                      {role.company}
                      <ArrowUpRight className="size-4.5" aria-hidden />
                    </a>
                    <p className="mt-0.5 text-lg font-medium">{role.title}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                        {role.location}
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-xs font-medium",
                          role.current ? "bg-brand-soft text-brand-foreground" : "bg-muted text-muted-foreground",
                        )}
                      >
                        {role.type}
                      </span>
                    </div>
                  </div>
                  <ul className="flex min-w-0 flex-[2_1_26rem] flex-col gap-3.5">
                    {role.points.map((point) => (
                      <li key={point} className="flex gap-3.5 text-base leading-relaxed text-foreground/85 sm:text-lg">
                        <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-xs bg-brand" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </article>
  );
}
