'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, MapPin, Search } from 'lucide-react';
import { useTheme, type ThemeName } from '@/lib/theme';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { api } from '@/lib/api';
import { formatSalary, getJobTypeLabel, formatDate } from '@/lib/utils';

export type BauhausVariant = Extract<ThemeName, 'bauhaus-primar' | 'bauhaus-poster'>;

/**
 * Dve Bauhaus témy s rozdielnym layoutom:
 *  bauhaus-primar – klasika: biela, červená/žltá/modrá, kruh–štvorec–trojuholník,
 *                   hrubé čierne linky, vertikálny tok sekcií v mriežke
 *  bauhaus-poster – plagát: krémový papier, zvislý bočný pás, schodovitý titulok,
 *                   farebné pruhy, posunuté bloky, kruhový CTA
 */
export function BauhausLanding({ variant }: { variant: BauhausVariant }) {
  const { setTheme } = useTheme();
  const [jobs, setJobs] = useState<any[]>([]);
  const [stats, setStats] = useState(JOB_STATS);
  const isPoster = variant === 'bauhaus-poster';

  useEffect(() => {
    setTheme(variant);
  }, [variant, setTheme]);

  useEffect(() => {
    api
      .get('/jobs?limit=3&status=ACTIVE')
      .then((data) => setJobs(data.jobs || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    api
      .get<{ pagination: { total: number } }>('/jobs?limit=1')
      .then((data) => {
        const total = data.pagination?.total;
        if (typeof total === 'number' && total > 0) {
          setStats([
            { value: String(total).padStart(2, '0'), label: 'Aktívnych ponúk' },
            { value: String(Math.max(500, total * 3)), label: 'Juniorov v databáze' },
            { value: '10+', label: 'Overených firiem' },
            { value: '94%', label: 'Spokojnosť' },
          ]);
        }
      })
      .catch(() => {});
  }, []);

  const jobList = jobs.length > 0
    ? jobs.map((j: any) => ({
        href: `/jobs/${j.id}`,
        company: j.employer?.companyName ?? '',
        title: j.title,
        type: getJobTypeLabel(j.type),
        location: j.isRemote ? `${j.location} / Remote` : j.location,
        salary: formatSalary(j.minSalary, j.maxSalary, j.currency),
        date: formatDate(j.createdAt),
      }))
    : PLACEHOLDER_JOBS;

  return isPoster ? (
    <PosterLayout stats={stats} jobs={jobList} />
  ) : (
    <PrimarLayout stats={stats} jobs={jobList} />
  );
}

/* =====================================================================
   Spoločné kúsky
   ===================================================================== */
type Stat = { value: string; label: string };
type JobRow = { href: string; company: string; title: string; type: string; location: string; salary: string; date: string };

const COLORS = ['var(--jp-red)', 'var(--jp-yellow)', 'var(--jp-blue)', 'var(--jp-text)'];
const ON_COLOR = ['#ffffff', '#111111', '#ffffff', '#ffffff'];

/** Kandinského tri tvary — kruh, štvorec, trojuholník */
function Shape({ kind, color, size = 16, className = '' }: { kind: 'circle' | 'square' | 'triangle'; color: string; size?: number; className?: string }) {
  if (kind === 'circle') return <span className={`inline-block rounded-full shrink-0 ${className}`} style={{ width: size, height: size, background: color }} />;
  if (kind === 'square') return <span className={`inline-block shrink-0 ${className}`} style={{ width: size, height: size, background: color }} />;
  return (
    <span className={`inline-block shrink-0 ${className}`} style={{ width: 0, height: 0, borderLeft: `${size / 2}px solid transparent`, borderRight: `${size / 2}px solid transparent`, borderBottom: `${size}px solid ${color}` }} />
  );
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="flex items-center gap-1">
        <Shape kind="circle" color="var(--jp-red)" size={14} />
        <Shape kind="square" color="var(--jp-blue)" size={14} />
        <Shape kind="triangle" color="var(--jp-yellow)" size={14} />
      </span>
      <span className="text-xl tracking-tighter uppercase" style={{ fontFamily: 'var(--jp-display-font)' }}>DajFlek</span>
    </Link>
  );
}

function SearchForm({ buttonBg = 'var(--jp-yellow)', buttonColor = '#111111', className = '' }: { buttonBg?: string; buttonColor?: string; className?: string }) {
  return (
    <form action="/jobs" method="GET" className={`bl-cell flex bg-[var(--jp-bg)] ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--jp-muted)]" />
        <input name="search" type="text" placeholder="Akú pozíciu hľadáš?"
          className="w-full h-16 pl-12 pr-4 bg-transparent text-base font-medium text-[var(--jp-text)] placeholder-[var(--jp-muted)] focus:outline-none" />
      </div>
      <button type="submit" className="bl-bl h-16 px-8 text-sm font-black uppercase tracking-wide hover:opacity-90 transition-opacity" style={{ background: buttonBg, color: buttonColor }}>
        Hľadať
      </button>
    </form>
  );
}

/* =====================================================================
   1) BAUHAUS PRIMÁR — mriežka, tvary, primárne farby
   ===================================================================== */
function PrimarLayout({ stats, jobs }: { stats: Stat[]; jobs: JobRow[] }) {
  return (
    <div className="min-h-screen bg-[var(--jp-bg)] text-[var(--jp-text)]" style={{ fontFamily: 'var(--jp-font)' }}>
      {/* NAV */}
      <header className="bl-bb sticky top-0 z-50 bg-[var(--jp-bg)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-[76px] flex items-center justify-between gap-4">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
            {NAV.map((n) => <Link key={n.href} href={n.href} className="hover:text-[var(--jp-red)] transition-colors">{n.label}</Link>)}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <Link href="/auth/register" className="hidden sm:inline-flex h-[42px] items-center px-5 bg-[var(--jp-text)] text-white text-xs font-black uppercase tracking-wide hover:bg-[var(--jp-red)] transition-colors">Registrovať</Link>
          </div>
        </div>
      </header>

      {/* HERO — text vľavo, geometrická kompozícia vpravo */}
      <section className="bl-bb">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 py-16 lg:py-24 lg:pr-12">
            <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--jp-sec-font)' }}>
              <Shape kind="square" color="var(--jp-red)" size={10} /> Portál pre juniorov · 2026
            </div>
            <h1 className="mt-8 text-[13vw] sm:text-[9vw] lg:text-[5rem] leading-[0.9] uppercase" style={{ fontFamily: 'var(--jp-display-font)', letterSpacing: '-0.03em' }}>
              Prvá<br />
              <span className="text-[var(--jp-red)]">práca.</span><br />
              Bez<br />
              <span className="text-[var(--jp-blue)]">kompromisov.</span>
            </h1>
            <p className="mt-8 text-lg max-w-md text-[var(--jp-muted)] leading-relaxed">
              Overené firmy, jasné požiadavky a odpoveď do 48 hodín. Pre juniorov, stážistov a absolventov v IT.
            </p>
            <SearchForm className="mt-10 max-w-xl" />
          </div>
          <div className="lg:col-span-5 lg:bl-bl relative min-h-[360px] lg:min-h-0 overflow-hidden bg-[var(--jp-surface)]">
            <Composition />
          </div>
        </div>
      </section>

      {/* STATS — štyri farebné bloky */}
      <section className="bl-bb bl-grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className="p-8 lg:p-10" style={{ background: COLORS[i], color: ON_COLOR[i] }}>
            <div className="text-5xl lg:text-6xl leading-none" style={{ fontFamily: 'var(--jp-display-font)' }}>{s.value}</div>
            <div className="mt-3 text-[11px] font-bold uppercase tracking-widest opacity-90" style={{ fontFamily: 'var(--jp-sec-font)' }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* KROKY — kruh / štvorec / trojuholník */}
      <section className="bl-bb">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <SectionTitle n="01" title="Ako to" accent="funguje" accentColor="var(--jp-red)" />
          <div className="mt-12 bl-grid grid-cols-1 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={i} className="bg-[var(--jp-bg)] p-8 lg:p-10 flex flex-col gap-8">
                <div className="flex items-center justify-between">
                  <Shape kind={SHAPES[i]} color={COLORS[i]} size={56} />
                  <span className="text-6xl leading-none text-[var(--jp-surface)]" style={{ fontFamily: 'var(--jp-display-font)', WebkitTextStroke: '2px #111' }}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">{step.title}</h3>
                  <p className="mt-3 text-[var(--jp-muted)] leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PONUKY — riadky s farebnou značkou */}
      <section className="bl-bb bg-[var(--jp-surface)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle n="02" title="Najnovšie" accent="ponuky" accentColor="var(--jp-blue)" />
            <Link href="/jobs" className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-[var(--jp-red)] transition-colors">
              Všetky ponuky <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="mt-12 bl-bt">
            {jobs.map((job, i) => (
              <Link key={i} href={job.href} className="group bl-bb grid grid-cols-[auto_1fr_auto] items-center gap-6 py-6 hover:bg-[var(--jp-bg)] transition-colors">
                <Shape kind={SHAPES[i % 3]} color={COLORS[i % 3]} size={28} />
                <div className="min-w-0">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[var(--jp-muted)]" style={{ fontFamily: 'var(--jp-sec-font)' }}>{job.company} · {job.type} · {job.location}</div>
                  <h3 className="mt-1 text-xl sm:text-3xl font-black uppercase tracking-tight truncate group-hover:text-[var(--jp-red)] transition-colors">{job.title}</h3>
                </div>
                <div className="text-right">
                  <div className="text-sm sm:text-lg font-black">{job.salary}</div>
                  <div className="text-[11px] text-[var(--jp-muted)]" style={{ fontFamily: 'var(--jp-sec-font)' }}>{job.date}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PREČO MY — 2×2 farebné */}
      <section className="bl-bb">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <SectionTitle n="03" title="Prečo" accent="DajFlek" accentColor="var(--jp-yellow)" />
          <div className="mt-12 bl-grid grid-cols-1 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <div key={i} className="p-8 lg:p-10 min-h-[220px] flex flex-col justify-between gap-6" style={{ background: i === 0 ? 'var(--jp-yellow)' : i === 3 ? 'var(--jp-text)' : 'var(--jp-bg)', color: i === 3 ? '#fff' : '#111' }}>
                <span className="text-[11px] font-bold uppercase tracking-widest opacity-70" style={{ fontFamily: 'var(--jp-sec-font)' }}>0{i + 1}</span>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">{f.title}</h3>
                  <p className="mt-2 leading-relaxed opacity-80">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TYPY */}
      <section className="bl-bb">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex flex-wrap items-center gap-3">
          <span className="text-[11px] font-bold uppercase tracking-widest mr-4" style={{ fontFamily: 'var(--jp-sec-font)' }}>Typy pozícií</span>
          {TYPES.map((t, i) => (
            <Link key={t.key} href={`/jobs?type=${t.key}`} className="bl-cell inline-flex items-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-wide hover:bg-[var(--jp-text)] hover:text-white transition-colors">
              <Shape kind={SHAPES[i % 3]} color={COLORS[i % 3]} size={10} /> {t.label}
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--jp-text)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-12">
          <h2 className="text-5xl sm:text-7xl leading-[0.9] uppercase" style={{ fontFamily: 'var(--jp-display-font)', letterSpacing: '-0.03em' }}>
            Pripravený<br />na <span className="text-[var(--jp-yellow)]">prvý krok?</span>
          </h2>
          <Link href="/auth/register" className="group inline-flex items-center justify-center w-48 h-48 rounded-full bg-[var(--jp-red)] text-white text-center text-sm font-black uppercase tracking-wide hover:scale-105 transition-transform">
            Registrovať<br />zadarmo <ArrowUpRight className="w-5 h-5 ml-1 inline" />
          </Link>
        </div>
      </section>

      <FooterBar />
    </div>
  );
}

/** Geometrická kompozícia pre hero (SVG) */
function Composition() {
  return (
    <svg viewBox="0 0 500 500" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect x="0" y="0" width="500" height="500" fill="var(--jp-surface)" />
      <line x1="0" y1="250" x2="500" y2="250" stroke="#111" strokeWidth="3" />
      <line x1="250" y1="0" x2="250" y2="500" stroke="#111" strokeWidth="3" />
      <rect x="250" y="250" width="250" height="250" fill="var(--jp-blue)" />
      <circle cx="250" cy="250" r="150" fill="var(--jp-red)" />
      <polygon points="60,440 250,120 440,440" fill="var(--jp-yellow)" opacity="0.95" />
      <circle cx="250" cy="250" r="150" fill="none" stroke="#111" strokeWidth="3" />
      <rect x="40" y="40" width="80" height="80" fill="#111" />
      <circle cx="420" cy="80" r="28" fill="#111" />
    </svg>
  );
}

function SectionTitle({ n, title, accent, accentColor }: { n: string; title: string; accent: string; accentColor: string }) {
  return (
    <div className="flex items-start gap-6">
      <span className="text-[11px] font-bold tracking-widest pt-2" style={{ fontFamily: 'var(--jp-sec-font)' }}>{n}</span>
      <h2 className="text-4xl sm:text-6xl leading-[0.9] uppercase" style={{ fontFamily: 'var(--jp-display-font)', letterSpacing: '-0.03em' }}>
        {title} <span style={{ color: accentColor }}>{accent}</span>
      </h2>
    </div>
  );
}

function FooterBar() {
  return (
    <footer className="bl-bt bg-[var(--jp-bg)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-wrap items-center justify-between gap-6 text-[11px] font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--jp-sec-font)' }}>
        <Logo />
        <div className="flex flex-wrap gap-6">
          {NAV.map((n) => <Link key={n.href} href={n.href} className="hover:text-[var(--jp-red)]">{n.label}</Link>)}
        </div>
        <span className="text-[var(--jp-muted)]">© {new Date().getFullYear()} DajFlek · Bratislava</span>
      </div>
    </footer>
  );
}

/* =====================================================================
   2) BAUHAUS POSTER — bočný pás, schody, pruhy, kruhový CTA
   ===================================================================== */
function PosterLayout({ stats, jobs }: { stats: Stat[]; jobs: JobRow[] }) {
  return (
    <div className="min-h-screen bg-[var(--jp-bg)] text-[var(--jp-text)] lg:grid lg:grid-cols-[64px_1fr]" style={{ fontFamily: 'var(--jp-font)' }}>
      {/* Zvislý bočný pás */}
      <aside className="hidden lg:flex sticky top-0 h-screen bl-br bg-[var(--jp-red)] text-white flex-col items-center justify-between py-6">
        <Shape kind="circle" color="#fff" size={18} />
        <span className="text-[11px] font-bold uppercase tracking-[0.3em] whitespace-nowrap" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: 'var(--jp-sec-font)' }}>
          DajFlek — portál pre juniorov — {new Date().getFullYear()}
        </span>
        <Shape kind="triangle" color="#fff" size={18} />
      </aside>

      <div className="min-w-0">
        {/* NAV */}
        <header className="bl-bb sticky top-0 z-50 bg-[var(--jp-bg)]">
          <div className="px-4 sm:px-8 h-[72px] flex items-center justify-between gap-4">
            <Logo />
            <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
              {NAV.map((n) => <Link key={n.href} href={n.href} className="hover:text-[var(--jp-red)] transition-colors">{n.label}</Link>)}
            </nav>
            <ThemeSwitcher />
          </div>
        </header>

        {/* HERO — schodovitý titulok, farebné pruhy vpravo */}
        <section className="bl-bb relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 hidden md:grid grid-cols-3 w-[28%]">
            <div className="bg-[var(--jp-red)]" />
            <div className="bg-[var(--jp-yellow)]" />
            <div className="bg-[var(--jp-blue)]" />
          </div>
          <div className="absolute -right-10 -bottom-20 hidden md:block w-[420px] h-[420px] rounded-full bg-[var(--jp-text)]" />
          <div className="relative px-4 sm:px-8 py-16 lg:py-24">
            <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--jp-sec-font)' }}>
              <span className="text-5xl leading-none text-[var(--jp-red)]" style={{ fontFamily: 'var(--jp-display-font)' }}>01</span>
              <span>Portál pre juniorov,<br />stážistov a absolventov v IT</span>
            </div>
            <h1 className="mt-10 uppercase leading-[0.88]" style={{ fontFamily: 'var(--jp-display-font)', letterSpacing: '-0.03em' }}>
              <span className="block text-[14vw] sm:text-[9vw] lg:text-[7.5rem]">Nájdi</span>
              <span className="block text-[14vw] sm:text-[9vw] lg:text-[7.5rem] ml-[8vw] lg:ml-24">svoju</span>
              <span className="block text-[14vw] sm:text-[9vw] lg:text-[7.5rem] ml-[16vw] lg:ml-48 text-[var(--jp-red)]">prvú</span>
              <span className="block text-[14vw] sm:text-[9vw] lg:text-[7.5rem] ml-[24vw] lg:ml-72 bg-[var(--jp-yellow)] px-3 inline-block">prácu.</span>
            </h1>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end max-w-3xl">
              <p className="text-lg text-[var(--jp-muted)] leading-relaxed max-w-sm">
                Overené firmy, jasné požiadavky a odpoveď do 48 hodín. Žiadne „junior s 5 rokmi praxe“.
              </p>
              <Link href="/jobs" className="group inline-flex items-center gap-3 bg-[var(--jp-text)] text-white h-16 px-8 text-sm font-black uppercase tracking-wide hover:bg-[var(--jp-blue)] transition-colors">
                Prezrieť ponuky <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <SearchForm className="mt-6 max-w-3xl" buttonBg="var(--jp-red)" buttonColor="#fff" />
          </div>
        </section>

        {/* Pás tvarov */}
        <div className="bl-bb overflow-hidden whitespace-nowrap py-3 bg-[var(--jp-bg)]">
          <div className="inline-flex items-center gap-8" style={{ animation: 'bl-ticker 30s linear infinite' }}>
            {Array.from({ length: 24 }).map((_, i) => (
              <span key={i} className="inline-flex items-center gap-8">
                <Shape kind={SHAPES[i % 3]} color={COLORS[i % 3]} size={22} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--jp-sec-font)' }}>{TICKER[i % TICKER.length]}</span>
              </span>
            ))}
          </div>
        </div>

        {/* STATS + KROKY (schody) */}
        <section className="bl-bb grid grid-cols-1 lg:grid-cols-[320px_1fr]">
          <div className="lg:bl-br bl-bb lg:border-b-0 bl-grid grid-cols-2 lg:grid-cols-1">
            {stats.map((s, i) => (
              <div key={i} className="p-6 lg:p-8 bg-[var(--jp-bg)]">
                <div className="text-4xl lg:text-5xl leading-none" style={{ fontFamily: 'var(--jp-display-font)', color: COLORS[i] }}>{s.value}</div>
                <div className="mt-2 text-[11px] font-bold uppercase tracking-widest text-[var(--jp-muted)]" style={{ fontFamily: 'var(--jp-sec-font)' }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div className="px-4 sm:px-8 py-16">
            <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--jp-sec-font)' }}>
              <span className="text-5xl leading-none" style={{ fontFamily: 'var(--jp-display-font)' }}>02</span> Ako to funguje
            </div>
            <div className="mt-10 space-y-4">
              {STEPS.map((step, i) => (
                <div key={i} className="bl-cell p-6 sm:p-8 flex items-start gap-6 max-w-2xl" style={{ marginLeft: `${i * 8}%`, background: COLORS[i], color: ON_COLOR[i] }}>
                  <span className="text-5xl leading-none shrink-0" style={{ fontFamily: 'var(--jp-display-font)' }}>{i + 1}</span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">{step.title}</h3>
                    <p className="mt-2 opacity-85 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PONUKY — striedavé riadky */}
        <section className="bl-bb">
          <div className="px-4 sm:px-8 py-10 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--jp-sec-font)' }}>
              <span className="text-5xl leading-none" style={{ fontFamily: 'var(--jp-display-font)' }}>03</span> Najnovšie ponuky
            </div>
            <Link href="/jobs" className="text-xs font-black uppercase tracking-widest underline underline-offset-4 hover:text-[var(--jp-red)]">Všetky ponuky</Link>
          </div>
          <div className="bl-bt">
            {jobs.map((job, i) => (
              <Link key={i} href={job.href} className={`group bl-bb grid grid-cols-[auto_1fr_auto] items-center gap-6 px-4 sm:px-8 py-8 transition-colors ${i % 2 === 1 ? 'bg-[var(--jp-text)] text-white hover:bg-[var(--jp-blue)]' : 'hover:bg-[var(--jp-yellow)]'}`}>
                <span className="text-4xl sm:text-6xl leading-none" style={{ fontFamily: 'var(--jp-display-font)', color: i % 2 === 1 ? 'var(--jp-yellow)' : 'var(--jp-red)' }}>{String(i + 1).padStart(2, '0')}</span>
                <div className="min-w-0">
                  <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight truncate">{job.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-x-4 text-[11px] font-bold uppercase tracking-widest opacity-70" style={{ fontFamily: 'var(--jp-sec-font)' }}>
                    <span>{job.company}</span><span>{job.type}</span><span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base sm:text-xl font-black">{job.salary}</div>
                  <ArrowUpRight className="w-6 h-6 ml-auto mt-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* PREČO + TYPY */}
        <section className="bl-bb grid grid-cols-1 lg:grid-cols-2">
          <div className="lg:bl-br px-4 sm:px-8 py-16">
            <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--jp-sec-font)' }}>
              <span className="text-5xl leading-none" style={{ fontFamily: 'var(--jp-display-font)' }}>04</span> Prečo DajFlek
            </div>
            <ul className="mt-10 bl-bt">
              {FEATURES.map((f, i) => (
                <li key={i} className="bl-bb py-6 flex items-start gap-5">
                  <Shape kind={SHAPES[i % 3]} color={COLORS[i % 4]} size={22} className="mt-1" />
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight">{f.title}</h3>
                    <p className="mt-1 text-[var(--jp-muted)] leading-relaxed">{f.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bl-bt lg:border-t-0 px-4 sm:px-8 py-16 bg-[var(--jp-surface)]">
            <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--jp-sec-font)' }}>
              <span className="text-5xl leading-none" style={{ fontFamily: 'var(--jp-display-font)' }}>05</span> Typy pozícií
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {TYPES.map((t, i) => (
                <Link key={t.key} href={`/jobs?type=${t.key}`} className="bl-cell inline-flex items-center gap-3 px-6 py-4 text-sm font-black uppercase tracking-wide hover:bg-[var(--jp-text)] hover:text-white transition-colors">
                  <Shape kind={SHAPES[i % 3]} color={COLORS[i % 3]} size={12} /> {t.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA — veľký kruh */}
        <section className="bl-bb relative overflow-hidden px-4 sm:px-8 py-24 min-h-[520px] flex items-center">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] sm:w-[560px] sm:h-[560px] rounded-full bg-[var(--jp-yellow)]" />
          <div className="absolute right-[8%] top-10 w-24 h-24 bg-[var(--jp-blue)] hidden sm:block" />
          <div className="absolute left-[6%] bottom-10 hidden sm:block"><Shape kind="triangle" color="var(--jp-red)" size={110} /></div>
          <div className="relative mx-auto text-center">
            <h2 className="text-5xl sm:text-7xl leading-[0.9] uppercase" style={{ fontFamily: 'var(--jp-display-font)', letterSpacing: '-0.03em' }}>
              Pripravený<br />na prvý<br />krok?
            </h2>
            <Link href="/auth/register" className="mt-8 inline-flex items-center gap-3 bg-[var(--jp-text)] text-white h-14 px-8 text-sm font-black uppercase tracking-wide hover:bg-[var(--jp-red)] transition-colors">
              Registrovať zadarmo <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        <FooterBar />
      </div>
    </div>
  );
}

/* =====================================================================
   Dáta
   ===================================================================== */
const SHAPES: Array<'circle' | 'square' | 'triangle'> = ['circle', 'square', 'triangle'];

const NAV = [
  { href: '/jobs', label: 'Ponuky' },
  { href: '/cv', label: 'CV' },
  { href: '/pricing', label: 'Cenník' },
  { href: '/contact', label: 'Kontakt' },
];

const STEPS = [
  { title: 'Vytvor profil', description: 'Zaregistruj sa, pridaj skills, vzdelanie a svoje preferencie. Trvá to 5 minút.' },
  { title: 'Prezeraj ponuky', description: 'Filtruj podľa lokality, tech stacku a typu úväzku. Nájdi si tú svoju.' },
  { title: 'Nastúp do práce', description: 'Pošli prihlášku jedným klikom a odpoveď očakávaj do 48 hodín.' },
];

const FEATURES = [
  { title: 'Len pre juniorov', description: 'Všetky ponuky sú overené a vhodné pre začiatočníkov.' },
  { title: 'Overené firmy', description: 'Každá firma je skontrolovaná pred zverejnením ponuky.' },
  { title: 'CV Builder', description: 'Vytvor si profesionálne CV priamo v portáli.' },
  { title: 'Skill Matching', description: 'Odporúčania na mieru podľa tvojich zručností.' },
];

const TYPES = [
  { key: 'FULL_TIME', label: 'Plný úväzok' },
  { key: 'PART_TIME', label: 'Skrátený úväzok' },
  { key: 'INTERNSHIP', label: 'Stáž' },
  { key: 'JUNIOR', label: 'Junior' },
  { key: 'CONTRACT', label: 'Živnosť' },
];

const JOB_STATS = [
  { value: '2 400+', label: 'Aktívnych ponúk' },
  { value: '850+', label: 'Juniorov v databáze' },
  { value: '120+', label: 'Overených firiem' },
  { value: '94%', label: 'Spokojnosť' },
];

const PLACEHOLDER_JOBS: JobRow[] = [
  { href: '/jobs', company: 'Studio Nula', title: 'Junior Frontend Developer', type: 'Plný úväzok', location: 'Bratislava', salary: '1 400 – 1 800 EUR', date: 'Dnes' },
  { href: '/jobs', company: 'Kajam Labs', title: 'QA Stážista', type: 'Stáž', location: 'Košice / Remote', salary: '700 EUR', date: 'Včera' },
  { href: '/jobs', company: 'Betonová s.r.o.', title: 'Junior Backend (Node)', type: 'Živnosť', location: 'Remote', salary: 'Dohodou', date: 'Pred 3 dňami' },
];

const TICKER = ['Práca pre juniorov', 'Stáže', 'Overené firmy', 'Odpoveď do 48 hodín', 'CV Builder', 'Registrácia zdarma'];
