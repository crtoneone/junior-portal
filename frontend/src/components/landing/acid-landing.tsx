'use client';

import Link from 'next/link';
import { ArrowUpRight, ArrowUpLeft, Asterisk, Globe, Mail, Folder } from 'lucide-react';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { DuoPhoto } from './duo-photo';
import { useLandingData, NAV, STEPS, FEATURES, TYPES, PHOTOS } from './shared';

export type AcidVariant = 'acid' | 'acid-paper';

/**
 * Acid / anti-design plagáty („Design Trends 2026"):
 *  acid       – čierna, krémový kondenzovaný titulok, wireframe glóbus, limetkové nálepky, čiarový kód
 *  acid-paper – krémový papier, fialová duotone fotka s limetkovou nálepkou, „key idea" tabuľka, páska
 */
export function AcidLanding({ variant }: { variant: AcidVariant }) {
  const { jobs, stats } = useLandingData(variant);
  return variant === 'acid' ? <DarkLayout jobs={jobs} stats={stats} /> : <PaperLayout jobs={jobs} stats={stats} />;
}

type Props = { jobs: ReturnType<typeof useLandingData>['jobs']; stats: ReturnType<typeof useLandingData>['stats'] };

/* ---------- spoločné kúsky ---------- */
function Crosshair({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <path d="M12 0v5M12 19v5M0 12h5M19 12h5" />
    </svg>
  );
}

function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`w-5 h-5 ${className}`} fill="currentColor" aria-hidden>
      <path d="M12 0c.6 7 5 11.4 12 12-7 .6-11.4 5-12 12-.6-7-5-11.4-12-12 7-.6 11.4-5 12-12z" />
    </svg>
  );
}

/** Wireframe glóbus ako v referencii */
function WireGlobe({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="0.8" aria-hidden>
      <circle cx="100" cy="100" r="96" />
      {[20, 45, 70].map((rx) => <ellipse key={rx} cx="100" cy="100" rx={rx} ry="96" />)}
      {[20, 45, 70].map((ry) => <ellipse key={ry} cx="100" cy="100" rx="96" ry={ry} />)}
      <line x1="4" y1="100" x2="196" y2="100" /><line x1="100" y1="4" x2="100" y2="196" />
    </svg>
  );
}

function Barcode({ className = '' }: { className?: string }) {
  return <div className={`barcode h-8 w-40 ${className}`} aria-hidden />;
}

function Nav({ dark }: { dark: boolean }) {
  return (
    <header className="flex items-center justify-between gap-4 px-5 sm:px-8 h-16 border-b border-[var(--jp-border)]">
      <Link href="/" className="acid-display text-2xl">DajFlek<span style={{ color: 'var(--jp-lime)' }}>.</span></Link>
      <nav className="hidden md:flex items-center gap-6 acid-mono text-[11px]">
        {NAV.map((n) => <Link key={n.href} href={n.href} className="hover:text-[var(--jp-lime)] transition-colors">{n.label}</Link>)}
      </nav>
      <div className="flex items-center gap-3">
        <ThemeSwitcher />
        <Link href="/auth/register" className="hidden sm:inline-flex h-[42px] items-center px-4 acid-mono text-[11px] font-bold" style={{ background: 'var(--jp-lime)', color: '#0b0b0b' }}>
          Registrácia
        </Link>
      </div>
    </header>
  );
}

/* =====================================================================
   1) ACID DARK — čierny plagát
   ===================================================================== */
function DarkLayout({ jobs, stats }: Props) {
  return (
    <div className="min-h-screen bg-[var(--jp-bg)] text-[var(--jp-text)]" style={{ fontFamily: 'var(--jp-font)' }}>
      <Nav dark />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[var(--jp-border)]">
        <WireGlobe className="absolute -right-24 -bottom-32 w-[560px] h-[560px] lg:w-[720px] lg:h-[720px] text-[var(--jp-text)] opacity-80" />
        <div className="relative px-5 sm:px-8 pt-12 pb-20 lg:pt-16 lg:pb-28">
          <div className="flex items-start justify-between">
            <div className="acid-mono text-[11px] text-[var(--jp-muted)]">Vol.01 — pre juniorov</div>
            <div className="flex flex-col items-end gap-1" style={{ color: 'var(--jp-lime)' }}>
              <Crosshair />
              <span className="acid-mono text-lg">{new Date().getFullYear()}</span>
            </div>
          </div>
          <h1 className="acid-display mt-8 text-[22vw] sm:text-[15vw] lg:text-[11rem] max-w-[10ch]">
            Prvá<br />práca
          </h1>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-end">
            <div>
              <p className="text-lg sm:text-xl max-w-xs leading-snug">
                Čo ďalej<br />formuje tvoju<br />kariéru v IT.
              </p>
              <Link href="/jobs" className="mt-8 inline-flex w-12 h-12 items-center justify-center border" style={{ borderColor: 'var(--jp-lime)', color: 'var(--jp-lime)' }}>
                <ArrowUpRight className="w-6 h-6" />
              </Link>
            </div>
            <Link href="/auth/register" className="inline-flex items-center px-8 py-5 rounded-full text-base font-semibold leading-tight text-center max-w-[220px] hover:scale-105 transition-transform" style={{ background: 'var(--jp-lime)', color: '#0b0b0b' }}>
              budúcnosť<br />je juniorská.
            </Link>
          </div>
          <div className="mt-14 flex items-end justify-between acid-mono text-[10px] text-[var(--jp-muted)]">
            <div><Barcode className="mb-2 text-[var(--jp-text)]" />DF 26</div>
            <div>Vol.01</div>
          </div>
        </div>
      </section>

      {/* SEARCH STRIP */}
      <section className="border-b border-[var(--jp-border)]">
        <form action="/jobs" method="GET" className="grid grid-cols-1 md:grid-cols-[1fr_auto]">
          <input name="search" type="text" placeholder="Hľadaj pozíciu, technológiu, mesto…"
            className="acid-mono h-16 px-5 sm:px-8 bg-transparent text-sm placeholder-[var(--jp-muted)] focus:outline-none border-b md:border-b-0 md:border-r border-[var(--jp-border)]" />
          <button type="submit" className="acid-mono h-16 px-10 text-sm font-bold" style={{ background: 'var(--jp-lime)', color: '#0b0b0b' }}>Hľadať ↗</button>
        </form>
      </section>

      {/* VISION nálepka + zoznam */}
      <section className="border-b border-[var(--jp-border)] px-5 sm:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="relative">
          <div className="p-6 sm:p-8 -rotate-1" style={{ background: 'var(--jp-lime)', color: '#0b0b0b' }}>
            <div className="acid-mono text-3xl sm:text-5xl leading-none">Vízia<br />2030</div>
            <ul className="mt-6 acid-mono text-[11px] space-y-1">
              {STEPS.map((s, i) => <li key={i}>0{i + 1} _ {s.title}</li>)}
              <li>04 _ & viac</li>
            </ul>
            <Globe className="absolute right-6 bottom-6 w-8 h-8" strokeWidth={1} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--jp-border)]">
          {STEPS.map((s, i) => (
            <div key={i} className="bg-[var(--jp-bg)] p-6 flex flex-col gap-6">
              <span className="acid-mono text-[11px]" style={{ color: 'var(--jp-lime)' }}>0{i + 1} _</span>
              <div>
                <h3 className="acid-display text-2xl">{s.title}</h3>
                <p className="mt-2 text-sm text-[var(--jp-muted)] leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS — hologram kruh + čísla */}
      <section className="border-b border-[var(--jp-border)] grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className={`p-6 sm:p-8 ${i < 3 ? 'lg:border-r' : ''} ${i % 2 === 0 ? 'border-r lg:border-r' : ''} ${i < 2 ? 'border-b lg:border-b-0' : ''} border-[var(--jp-border)]`}>
            <div className="acid-display text-5xl sm:text-6xl" style={{ color: i === 3 ? 'var(--jp-violet)' : undefined }}>{s.value}</div>
            <div className="mt-2 acid-mono text-[10px] text-[var(--jp-muted)]">{s.label}</div>
          </div>
        ))}
      </section>

      {/* PONUKY — lístky */}
      <section className="border-b border-[var(--jp-border)] px-5 sm:px-8 py-16">
        <div className="flex items-center justify-between">
          <h2 className="acid-display text-5xl sm:text-7xl">Ponuky</h2>
          <Link href="/jobs" className="acid-mono text-[11px] hover:text-[var(--jp-lime)]">Všetky ↗</Link>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.map((job, i) => (
            <Link key={i} href={job.href} className="group border border-[var(--jp-border)] p-6 flex flex-col gap-10 hover:border-[var(--jp-lime)] transition-colors">
              <div className="flex items-center justify-between acid-mono text-[10px] text-[var(--jp-muted)]">
                <span>{job.company}</span><span>Frame 0{i + 1}</span>
              </div>
              <h3 className="acid-display text-3xl group-hover:text-[var(--jp-lime)] transition-colors">{job.title}</h3>
              <div className="flex items-end justify-between">
                <div className="acid-mono text-[10px] text-[var(--jp-muted)]">{job.type}<br />{job.location}</div>
                <div className="acid-mono text-sm" style={{ color: 'var(--jp-lime)' }}>{job.salary}</div>
              </div>
              <Barcode className="text-[var(--jp-muted)] w-full" />
            </Link>
          ))}
        </div>
      </section>

      {/* PÁSKA CTA */}
      <section className="px-5 sm:px-8 py-20 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center">
        <div className="relative p-8 sm:p-12 rotate-[-1.5deg]" style={{ background: 'var(--jp-violet)', color: '#0b0b0b' }}>
          <h2 className="acid-display text-4xl sm:text-6xl">Prejav sa.<br />Neohromuj.</h2>
          <p className="mt-4 acid-mono text-[11px] max-w-xs">Žiadne pravidlá, len zámer. Registrácia je zadarmo.</p>
          <Asterisk className="absolute top-4 right-4 w-8 h-8" style={{ color: 'var(--jp-lime)' }} />
        </div>
        <div className="flex flex-col items-start gap-6">
          <Link href="/auth/register" className="relative inline-flex items-center justify-center w-40 h-40 rounded-full acid-display text-5xl hover:rotate-6 transition-transform" style={{ background: 'conic-gradient(from 90deg, #d9d9ff, #b8f5e6, #ffd6f2, #d9d9ff)', color: '#0b0b0b' }}>
            26
          </Link>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <Link key={t.key} href={`/jobs?type=${t.key}`} className="acid-mono text-[10px] border border-[var(--jp-border)] px-3 py-2 hover:bg-[var(--jp-text)] hover:text-[var(--jp-bg)] transition-colors">{t.label}</Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--jp-border)] px-5 sm:px-8 py-6 flex flex-wrap items-center justify-between gap-4 acid-mono text-[10px] text-[var(--jp-muted)]">
        <span>Design is thinking made visual.</span>
        <div className="flex items-center gap-5 text-[var(--jp-text)]"><Folder className="w-5 h-5" strokeWidth={1} /><Globe className="w-5 h-5" strokeWidth={1} /><Mail className="w-5 h-5" strokeWidth={1} /></div>
        <span>© {new Date().getFullYear()} DajFlek — Global edition</span>
      </footer>
    </div>
  );
}

/* =====================================================================
   2) ACID PAPER — krémový plagát s fialovou fotkou
   ===================================================================== */
function PaperLayout({ jobs, stats }: Props) {
  return (
    <div className="min-h-screen bg-[var(--jp-bg)] text-[var(--jp-text)]" style={{ fontFamily: 'var(--jp-font)' }}>
      <Nav dark={false} />

      {/* HERO — titulok vľavo, fotka vpravo, nálepka cez ňu */}
      <section className="border-b border-[var(--jp-border)] px-5 sm:px-8 pt-12 pb-16 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10">
        <div className="flex flex-col justify-between gap-10">
          <div>
            <h1 className="acid-display text-[20vw] sm:text-[13vw] lg:text-[9.5rem]">Nová<br />vlna</h1>
            <div className="mt-6 text-lg leading-snug">
              nová estetika.<br />nové pravidlá.<br /><span style={{ color: 'var(--jp-violet)' }}>nová práca.</span>
            </div>
          </div>
          <div className="relative">
            <div className="p-6 sm:p-8 rotate-[-1deg] flex flex-col sm:flex-row gap-8 sm:items-end" style={{ background: 'var(--jp-lime)', color: '#0b0b0b' }}>
              <div className="acid-mono text-3xl sm:text-4xl leading-none">Štart<br />{new Date().getFullYear()}</div>
              <ul className="acid-mono text-[11px] space-y-1">
                {STEPS.map((s, i) => <li key={i}>0{i + 1} _ {s.title}</li>)}
                <li>04 _ & viac</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-3 right-0 text-[var(--jp-text)]"><Sparkle /></div>
          <DuoPhoto src={PHOTOS[1]} tint="var(--jp-violet)" className="aspect-[4/5] w-full max-w-md ml-auto" base="#8c6fe6" />
          <div className="absolute right-4 top-1/3 w-24 h-24 rounded-full blur-[2px]" style={{ background: 'var(--jp-lime)' }} />
          <div className="absolute left-4 bottom-4 acid-mono text-[11px] text-white">DF__<br />junior<br />shift <span style={{ color: 'var(--jp-violet)' }}>●</span></div>
          <div className="mt-4 flex items-center justify-between acid-mono text-[10px]">
            <Barcode className="text-[var(--jp-text)]" />
            <span>Update<br />_01/26</span>
          </div>
        </div>
      </section>

      {/* KEY IDEA tabuľka + hľadanie */}
      <section className="border-b border-[var(--jp-border)] grid grid-cols-1 lg:grid-cols-[auto_1fr]">
        <div className="p-6 sm:p-8 lg:border-r border-b lg:border-b-0 border-[var(--jp-border)]">
          <div className="inline-block px-2 py-1 acid-mono text-[10px]" style={{ background: 'var(--jp-violet)', color: '#0b0b0b' }}>kľúčová idea</div>
          <ul className="mt-2 border border-[var(--jp-border)] w-56 text-sm font-semibold">
            {['odvážne', 'autentické', 'bez filtra', 'ľudské'].map((w) => <li key={w} className="px-3 py-2 border-b last:border-b-0 border-[var(--jp-border)]">{w}</li>)}
          </ul>
        </div>
        <div className="p-6 sm:p-8 flex flex-col justify-between gap-8">
          <form action="/jobs" method="GET" className="flex border border-[var(--jp-border)]">
            <input name="search" type="text" placeholder="Hľadaj pozíciu, technológiu…" className="acid-mono flex-1 h-14 px-4 bg-transparent text-sm placeholder-[var(--jp-muted)] focus:outline-none" />
            <button type="submit" className="acid-mono h-14 px-6 text-sm font-bold bg-[var(--jp-text)] text-[var(--jp-bg)]">Hľadať</button>
          </form>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="acid-display text-4xl sm:text-5xl">{s.value}</div>
                <div className="mt-1 acid-mono text-[10px] text-[var(--jp-muted)]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PONUKY — 3 nálepky */}
      <section className="border-b border-[var(--jp-border)] px-5 sm:px-8 py-16">
        <div className="flex items-end justify-between">
          <h2 className="acid-display text-5xl sm:text-7xl">Pohyb<br />je všetko</h2>
          <div className="acid-mono text-[11px] text-right">motion<br />creates<br />meaning.</div>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.map((job, i) => (
            <Link key={i} href={job.href} className={`group p-6 flex flex-col gap-8 transition-transform hover:-translate-y-1 ${i % 2 === 0 ? 'rotate-[0.6deg]' : 'rotate-[-0.6deg]'}`} style={{ background: i === 1 ? 'var(--jp-violet)' : i === 2 ? 'var(--jp-lime)' : 'var(--jp-text)', color: i === 0 ? 'var(--jp-bg)' : '#0b0b0b' }}>
              <div className="flex items-center justify-between acid-mono text-[10px] opacity-80">
                <span>{job.company}</span><ArrowUpLeft className="w-5 h-5" />
              </div>
              <h3 className="acid-display text-3xl">{job.title}</h3>
              <div className="acid-mono text-[11px]">{job.type} · {job.location}<br /><b>{job.salary}</b></div>
            </Link>
          ))}
        </div>
      </section>

      {/* PREČO + CTA */}
      <section className="border-b border-[var(--jp-border)] grid grid-cols-1 lg:grid-cols-2">
        <div className="p-6 sm:p-8 lg:border-r border-[var(--jp-border)]">
          <div className="grid grid-cols-2 gap-px bg-[var(--jp-border)] border border-[var(--jp-border)]">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-[var(--jp-bg)] p-5">
                <div className="acid-mono text-[10px]" style={{ color: 'var(--jp-violet)' }}>0{i + 1}</div>
                <h3 className="mt-2 acid-display text-xl">{f.title}</h3>
                <p className="mt-1 text-xs text-[var(--jp-muted)]">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 sm:p-8 flex flex-col justify-between gap-8 bg-[var(--jp-surface)]">
          <div className="flex items-start justify-between">
            <span className="acid-mono text-[10px] text-[var(--jp-muted)]">Be in flow. // 24fps</span>
            <Asterisk className="w-8 h-8" style={{ color: 'var(--jp-lime)' }} />
          </div>
          <div className="relative self-end p-6 w-56 h-40 flex flex-col justify-between" style={{ background: 'var(--jp-lime)', color: '#0b0b0b' }}>
            <span className="acid-mono text-lg self-end">26</span>
            <ArrowUpLeft className="w-16 h-16" strokeWidth={1.5} />
          </div>
          <Link href="/auth/register" className="acid-mono inline-flex items-center justify-center h-16 text-sm font-bold bg-[var(--jp-text)] text-[var(--jp-bg)] hover:bg-[var(--jp-violet)] hover:text-[#0b0b0b] transition-colors">
            Registrovať sa zadarmo ↗
          </Link>
        </div>
      </section>

      <footer className="px-5 sm:px-8 py-6 acid-mono text-[10px]">
        <div className="flex flex-wrap items-center gap-6 border-b border-[var(--jp-border)] pb-4">
          <span>Reálni ľudia</span><Sparkle className="w-3 h-3" /><span>Reálne ponuky</span><Sparkle className="w-3 h-3" /><span>Reálny dopad</span>
        </div>
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-[var(--jp-muted)]">
          <span>© {new Date().getFullYear()}</span><span>DajFlek — report pre juniorov</span><span>Global edition</span>
        </div>
      </footer>
    </div>
  );
}
