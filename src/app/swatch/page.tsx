import { ThemeToggle } from "./theme-toggle";

/** Throwaway proof page for P0.4: every colour, font, radius and shadow below is
 *  drawn from a semantic token via a Tailwind utility, so the whole page follows
 *  the light/dark toggle with no per-element theme logic. */

interface Token {
  name: string;
  className: string;
}

const surfaces: Token[] = [
  { name: "ground", className: "bg-ground" },
  { name: "ground-2", className: "bg-ground-2" },
  { name: "surface", className: "bg-surface" },
  { name: "surface-2", className: "bg-surface-2" },
  { name: "accent-soft", className: "bg-accent-soft" },
  { name: "glow", className: "bg-glow" },
];

const accents: Token[] = [
  { name: "accent", className: "bg-accent" },
  { name: "accent-ink", className: "bg-accent-ink" },
  { name: "warm", className: "bg-warm" },
];

const tints: Token[] = [
  { name: "tint-pleasant", className: "bg-tint-pleasant" },
  { name: "tint-neutral", className: "bg-tint-neutral" },
  { name: "tint-heavier", className: "bg-tint-heavier" },
];

const inkLevels: Token[] = [
  { name: "ink", className: "text-ink" },
  { name: "ink-soft", className: "text-ink-soft" },
  { name: "ink-faint", className: "text-ink-faint" },
];

const radii: Token[] = [
  { name: "rounded-sm", className: "rounded-sm" },
  { name: "rounded-md", className: "rounded-md" },
  { name: "rounded-lg", className: "rounded-lg" },
];

function Swatch({ name, className }: Token) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`h-16 rounded-md border border-edge ${className}`} />
      <span className="text-ink-soft text-xs">{name}</span>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-serif text-ink text-lg">{title}</h2>
      {children}
    </section>
  );
}

export default function SwatchPage() {
  return (
    <main className="mx-auto flex max-w-[720px] flex-col gap-10 px-5 py-8">
      <header className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2.5 font-serif text-ink text-xl">
          <span
            className="size-4 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 34% 30%, var(--warm), var(--accent) 78%)",
              boxShadow: "0 0 0 4px var(--accent-soft)",
            }}
          />
          Inner DAVE · tokens
        </span>
        <ThemeToggle />
      </header>

      <Section title="Surfaces & grounds">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
          {surfaces.map((token) => (
            <Swatch key={token.name} {...token} />
          ))}
        </div>
      </Section>

      <Section title="Edges">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <div className="h-16 rounded-md border-2 border-edge bg-surface" />
            <span className="text-ink-soft text-xs">edge</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-16 rounded-md border-2 border-edge-strong bg-surface" />
            <span className="text-ink-soft text-xs">edge-strong</span>
          </div>
        </div>
      </Section>

      <Section title="Accent & warm">
        <div className="grid grid-cols-3 gap-4">
          {accents.map((token) => (
            <Swatch key={token.name} {...token} />
          ))}
        </div>
      </Section>

      <Section title="Valence tints">
        <div className="grid grid-cols-3 gap-4">
          {tints.map((token) => (
            <Swatch key={token.name} {...token} />
          ))}
        </div>
      </Section>

      <Section title="Ink / text">
        <div className="flex flex-col gap-1 rounded-md border border-edge bg-surface p-5">
          {inkLevels.map((token) => (
            <p key={token.name} className={`text-base ${token.className}`}>
              {token.name} - the quiet weather of an ordinary day
            </p>
          ))}
        </div>
      </Section>

      <Section title="Type">
        <div className="flex flex-col gap-4 rounded-md border border-edge bg-surface p-5">
          <p className="font-serif text-ink text-2xl">
            Serif - Iowan Old Style
            <span className="block text-ink-faint text-sm">
              headings & wordmark
            </span>
          </p>
          <p className="font-rounded text-ink text-2xl">
            Rounded - SF Pro Rounded
            <span className="block text-ink-faint text-sm">body default</span>
          </p>
        </div>
      </Section>

      <Section title="Radii">
        <div className="grid grid-cols-3 gap-4">
          {radii.map((token) => (
            <div key={token.name} className="flex flex-col gap-2">
              <div
                className={`h-16 border border-edge bg-accent-soft ${token.className}`}
              />
              <span className="text-ink-soft text-xs">{token.name}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Shadows">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <div className="h-20 rounded-md bg-surface shadow-elevated" />
            <span className="text-ink-soft text-xs">shadow-elevated</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-20 rounded-md bg-surface shadow-soft" />
            <span className="text-ink-soft text-xs">shadow-soft</span>
          </div>
        </div>
      </Section>
    </main>
  );
}
