'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowUpRight, MapPin, Search } from 'lucide-react';
import { useTheme, type ThemeName } from '@/lib/theme';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { api } from '@/lib/api';
import { formatSalary, getJobTypeLabel, formatDate } from '@/lib/utils';

export type BrutalVariant = Extract<ThemeName, 'brutal' | 'brutal-dark' | 'brutal-signal'>;

/**
 * Tri iterácie brutalistickej landing page (inšpirácia: BRUTAL® — grid, mono popisky,
 * signálna oranžová, obrovský titulok, číslovaný zoznam so šípkami, tmavý panel).
 *
 *  brutal        – svetlosivé plátno, biely rám, 1px linky, hero 2 stĺpce
 *  brutal-dark   – čierne plátno, svetlé linky, titulok cez celú šírku, ticker
 *  brutal-signal – oranžové plátno, 2px linky, čierny hero blok, zoznam 2×2
 */
export function BrutalLanding({ variant }: { variant: BrutalVariant }) {
  const { setTheme } = useTheme();
  const [jobs, setJobs] = useState<any[]>([]);
  const [stats, setStats] = useState(JOB_STATS);
  const [clock, setClock] = useState('00:00:00');

  const isDark = variant === 'brutal-dark';
  const isSignal = variant === 'brutal-signal';

  useEffect(() => {
    setTheme(variant);
  }, [variant, setTheme]);

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString('sk-SK', { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

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

  const Square = () => <span className="inline-block w-2.5 h-2.5 bg-[var(--jp-accent)] shrink-0" />;

  /* ---------- NAV ---------- */
  const nav = (
    <header className="bl-bb sticky top-0 z-50 bg-[var(--jp-bg)]">
      <div className="grid grid-cols-[1fr_auto] items-stretch">
        <Link href="/" className="flex items-center px-5 sm:px-7 h-[72px] font-black text-2xl tracking-tighter uppercase text-[var(--jp-text)]" style={{ fontFamily: 'var(--jp-display-font)' }}>
          DajFlek<span className="text-[var(--jp-accent)]">®</span>
        </Link>
        <div className="flex items-stretch">
          <nav className="hidden md:flex items-stretch">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="bl-bl flex items-center px-6 text-xs font-semibold uppercase tracking-wide text-[var(--jp-text)] hover:bg-[var(--jp-accent)] hover:text-[var(--jp-accent-contrast)] transition-colors">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="bl-bl flex items-center px-3 gap-2">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );

  /* ---------- HERO ---------- */
  const searchForm = (
    <form action="/jobs" method="GET" className="bl-cell flex">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--jp-muted)]" />
        <input name="search" type="text" placeholder="Pozícia, technológia…"
          className="bl-mono w-full h-12 pl-9 pr-3 bg-transparent text-[13px] text-[var(--jp-text)] placeholder-[var(--jp-muted)] focus:outline-none" />
      </div>
      <button type="submit" className="bl-bl bl-mono h-12 px-5 text-[12px] font-bold bg-[var(--jp-text)] text-[var(--jp-bg)] hover:bg-[var(--jp-accent)] hover:text-[var(--jp-accent-contrast)] transition-colors">
        Hľadať
      </button>
    </form>
  );

  const heroTagline = (
    <div className="flex items-start gap-3">
      <span className="mt-1"><Square /></span>
      <div className="bl-mono text-[12px] leading-5 text-[var(--jp-text)]">
        Portál pre juniorov,<br />stážistov a absolventov<br />v IT — bez seniorských BS
      </div>
    </div>
  );

  const heroMeta = (
    <div className="grid grid-cols-3 gap-4 bl-mono text-[12px] leading-5">
      <div>Sídlo<br /><span className="text-[var(--jp-muted)]">Bratislava, SK</span></div>
      <div>Ponuky<br /><span className="text-[var(--jp-muted)]">Celé Slovensko + remote</span></div>
      <div className="flex items-start gap-2"><span className="mt-1"><Square /></span><span suppressHydrationWarning>{clock}</span></div>
    </div>
  );

  const heroCta = (
    <Link href="/jobs" className="group bl-mono inline-flex items-center justify-between gap-6 w-full sm:w-auto min-w-[320px] bg-[var(--jp-accent)] text-[var(--jp-accent-contrast)] text-[13px] font-bold px-6 h-14 hover:bg-[var(--jp-accent-hover)] transition-colors">
      Nájsť prvú prácu <ArrowUpRight className="bl-arrow w-5 h-5" />
    </Link>
  );

  const hero = isDark ? (
    /* Dark: titulok cez celú šírku, meta pod ním ako 4 bunky */
    <section className="bl-bb">
      <div className="px-5 sm:px-7 pt-10 pb-8">
        {heroTagline}
        <h1 className="bl-display mt-10 text-[15vw] sm:text-[11vw] lg:text-[9.5rem] text-[var(--jp-text)]">
          Práca,<br />ktorá robí<br /><span className="text-[var(--jp-accent)]">hluk.</span>
        </h1>
      </div>
      <div className="bl-bt grid grid-cols-1 md:grid-cols-4">
        <div className="p-6 md:bl-br">{heroMeta}</div>
        <div className="bl-bt md:border-t-0 md:bl-br p-6 bl-mono text-[13px] leading-6 text-[var(--jp-muted)] md:col-span-2">
          Pomáhame juniorom dostať sa k reálnej práci — overené firmy, jasné požiadavky, odpoveď do 48 hodín. Žiadne „5 rokov skúseností na junior pozíciu“.
        </div>
        <div className="bl-bt md:border-t-0 p-6 flex flex-col gap-3">
          {heroCta}
          {searchForm}
        </div>
      </div>
    </section>
  ) : isSignal ? (
    /* Signal: čierny hero blok, titulok vpravo, meta vľavo */
    <section className="bl-bb bg-[var(--jp-ink)] text-[var(--jp-ink-text)]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr]">
        <div className="p-6 sm:p-8 flex flex-col justify-between gap-10 lg:border-r-2 border-[var(--jp-ink-text)]">
          <div className="flex items-start gap-3">
            <span className="mt-1 inline-block w-2.5 h-2.5 bg-[var(--jp-signal)]" />
            <div className="bl-mono text-[12px] leading-5">
              Portál pre juniorov,<br />stážistov a absolventov<br />v IT
            </div>
          </div>
          <div className="bl-mono text-[12px] leading-5 space-y-4">
            <div>Sídlo<br /><span className="opacity-60">Bratislava, SK</span></div>
            <div>Ponuky<br /><span className="opacity-60">Celé Slovensko + remote</span></div>
            <div className="flex items-center gap-2"><span className="inline-block w-2.5 h-2.5 bg-[var(--jp-signal)]" /><span suppressHydrationWarning>{clock}</span></div>
          </div>
        </div>
        <div className="p-6 sm:p-8 border-t-2 lg:border-t-0 border-[var(--jp-ink-text)]">
          <h1 className="bl-display text-[16vw] sm:text-[11vw] lg:text-[8.5rem]">
            Práca,<br />ktorá robí<br /><span className="text-[var(--jp-signal)]">hluk.</span>
          </h1>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <p className="bl-mono text-[13px] leading-6 opacity-80">
              Overené firmy, jasné požiadavky, odpoveď do 48 hodín. Žiadne „5 rokov skúseností na junior pozíciu“.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/jobs" className="group bl-mono inline-flex items-center justify-between gap-6 bg-[var(--jp-signal)] text-[var(--jp-ink)] text-[13px] font-bold px-6 h-14 hover:bg-[var(--jp-ink-text)] transition-colors">
                Nájsť prvú prácu <ArrowUpRight className="bl-arrow w-5 h-5" />
              </Link>
              <form action="/jobs" method="GET" className="flex border-2 border-[var(--jp-ink-text)]">
                <input name="search" type="text" placeholder="Pozícia, technológia…"
                  className="bl-mono flex-1 h-12 px-4 bg-transparent text-[13px] placeholder:opacity-60 focus:outline-none" />
                <button type="submit" className="bl-mono h-12 px-5 text-[12px] font-bold bg-[var(--jp-ink-text)] text-[var(--jp-ink)] hover:bg-[var(--jp-signal)] transition-colors">
                  Hľadať
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    /* Brutal: verná 2-stĺpcová verzia referencie */
    <section className="bl-bb grid grid-cols-1 lg:grid-cols-[1.3fr_1fr]">
      <div className="p-6 sm:p-8 lg:bl-br">
        {heroTagline}
        <h1 className="bl-display mt-12 text-[15vw] sm:text-[10vw] lg:text-[7.5rem] text-[var(--jp-text)]">
          Práca,<br />ktorá robí<br />hluk.
        </h1>
      </div>
      <div className="bl-bt lg:border-t-0 p-6 sm:p-8 flex flex-col justify-between gap-12">
        {heroMeta}
        <div className="space-y-5">
          <p className="bl-mono text-[13px] leading-6 text-[var(--jp-text)] max-w-md">
            Pomáhame juniorom dostať sa k reálnej práci — overené firmy, jasné požiadavky, odpoveď do 48 hodín.
          </p>
          {heroCta}
          {searchForm}
        </div>
      </div>
    </section>
  );

  /* ---------- SLUŽBY + PANEL ---------- */
  const servicesList = (
    <div className="p-6 sm:p-8">
      <div className="flex items-center gap-3 bl-mono text-[12px] pb-4 bl-bb">
        <Square /> Čo ponúkame
      </div>
      {isSignal ? (
        <div className="bl-grid grid-cols-2 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8">
          {SERVICES.map((s, i) => (
            <Link key={s.href} href={s.href} className="group flex flex-col justify-between gap-8 p-6 sm:p-8 bg-[var(--jp-bg)] hover:bg-[var(--jp-signal)] transition-colors">
              <span className="bl-display text-5xl">{String(i + 1).padStart(2, '0')}</span>
              <span className="flex items-end justify-between gap-2 text-sm font-bold uppercase tracking-tight">
                {s.label} <ArrowUpRight className="bl-arrow w-5 h-5 shrink-0" />
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <ul>
          {SERVICES.map((s, i) => (
            <li key={s.href}>
              <Link href={s.href} className="group flex items-center gap-6 py-5 bl-bb hover:pl-2 transition-all">
                <span className="bl-display text-4xl w-16">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1 text-base font-semibold uppercase tracking-tight">{s.label}</span>
                <ArrowUpRight className="bl-arrow w-5 h-5" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const panelBg = isDark ? 'bg-[var(--jp-accent)] text-[var(--jp-accent-contrast)]' : isSignal ? 'bg-[var(--jp-signal)] text-[var(--jp-ink)]' : 'bg-[var(--jp-ink)] text-[var(--jp-ink-text)]';
  const panel = (
    <div className={`relative overflow-hidden p-6 sm:p-8 min-h-[420px] flex flex-col justify-between ${panelBg}`}>
      <p className="relative z-10 text-2xl sm:text-3xl font-bold uppercase leading-tight tracking-tight max-w-xs">
        Dobrá práca nie je len o plate.<br />Je o štarte.
      </p>
      <Link href="/jobs" className="group relative z-10 bl-mono inline-flex items-center justify-between gap-6 w-64 text-[13px] font-bold pb-2 border-b-2 border-current">
        Pozrieť ponuky <ArrowUpRight className="bl-arrow w-5 h-5" />
      </Link>
      {/* geometrická „betónová“ hrana namiesto fotky */}
      <svg aria-hidden className="absolute right-0 bottom-0 w-[70%] h-[85%] opacity-90" viewBox="0 0 400 400" preserveAspectRatio="xMaxYMax slice">
        <polygon points="400,400 130,400 260,60" fill="currentColor" opacity="0.14" />
        <polygon points="400,400 260,60 400,110" fill="currentColor" opacity="0.28" />
        <polygon points="400,400 130,400 260,60 400,110" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line key={i} x1={260 + i * 23} y1={60 + i * 8} x2={130 + i * 45} y2={400} stroke="currentColor" strokeWidth="1" opacity="0.35" />
        ))}
      </svg>
    </div>
  );

  const servicesSection = (
    <section className="bl-bb grid grid-cols-1 lg:grid-cols-[1fr_1.3fr]">
      <div className="lg:bl-br">{servicesList}</div>
      {panel}
    </section>
  );

  /* ---------- STATS ---------- */
  const statsSection = (
    <section className="bl-bb bl-grid grid-cols-2 md:grid-cols-4">
      {stats.map((s, i) => (
        <div key={i} className="p-6 sm:p-8 bg-[var(--jp-bg)]">
          <div className="bl-display text-4xl sm:text-5xl text-[var(--jp-accent)]">{s.value}</div>
          <div className="bl-mono mt-3 text-[11px] text-[var(--jp-muted)]">{s.label}</div>
        </div>
      ))}
    </section>
  );

  /* ---------- JOBS ---------- */
  const jobsSection = (
    <section className="bl-bb">
      <div className="bl-bb flex items-center justify-between px-6 sm:px-8 py-5">
        <div className="flex items-center gap-3 bl-mono text-[12px]"><Square /> Najnovšie ponuky</div>
        <Link href="/jobs" className="group bl-mono inline-flex items-center gap-2 text-[12px] font-bold hover:text-[var(--jp-accent)] transition-colors">
          Všetky <ArrowUpRight className="bl-arrow w-4 h-4" />
        </Link>
      </div>
      <div className="bl-grid grid-cols-1 md:grid-cols-3">
        {jobs.length > 0
          ? jobs.map((job: any, i: number) => (
              <Link key={job.id} href={`/jobs/${job.id}`} className="group flex flex-col justify-between gap-8 p-6 sm:p-8 min-h-[240px] bg-[var(--jp-bg)] hover:bg-[var(--jp-accent)] hover:text-[var(--jp-accent-contrast)] transition-colors">
                <div>
                  <div className="bl-mono text-[11px] opacity-70">{String(i + 1).padStart(2, '0')} / {job.employer?.companyName}</div>
                  <h3 className="mt-3 text-xl sm:text-2xl font-bold uppercase leading-tight tracking-tight">{job.title}</h3>
                  <div className="bl-mono mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] opacity-80">
                    <span>{getJobTypeLabel(job.type)}</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                    {job.isRemote && <span>Remote</span>}
                  </div>
                </div>
                <div className="flex items-end justify-between bl-mono text-[12px]">
                  <span className="font-bold">{formatSalary(job.minSalary, job.maxSalary, job.currency)}</span>
                  <span className="inline-flex items-center gap-2 opacity-70">{formatDate(job.createdAt)} <ArrowUpRight className="bl-arrow w-4 h-4" /></span>
                </div>
              </Link>
            ))
          : PLACEHOLDER_JOBS.map((job, i) => (
              <Link key={i} href="/jobs" className="group flex flex-col justify-between gap-8 p-6 sm:p-8 min-h-[240px] bg-[var(--jp-bg)] hover:bg-[var(--jp-accent)] hover:text-[var(--jp-accent-contrast)] transition-colors">
                <div>
                  <div className="bl-mono text-[11px] opacity-70">{String(i + 1).padStart(2, '0')} / {job.company}</div>
                  <h3 className="mt-3 text-xl sm:text-2xl font-bold uppercase leading-tight tracking-tight">{job.title}</h3>
                  <div className="bl-mono mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] opacity-80">
                    <span>{job.type}</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                  </div>
                </div>
                <div className="flex items-end justify-between bl-mono text-[12px]">
                  <span className="font-bold">{job.salary}</span>
                  <ArrowUpRight className="bl-arrow w-4 h-4 opacity-70" />
                </div>
              </Link>
            ))}
      </div>
    </section>
  );

  /* ---------- TYPY + CTA ---------- */
  const typesCtaSection = (
    <section className="bl-bb grid grid-cols-1 lg:grid-cols-2">
      <div className="p-6 sm:p-8 lg:bl-br">
        <div className="flex items-center gap-3 bl-mono text-[12px] pb-4 bl-bb"><Square /> Typy pozícií</div>
        <div className="flex flex-wrap gap-2 pt-6">
          {TYPES.map((t) => (
            <Link key={t.key} href={`/jobs?type=${t.key}`} className="bl-cell bl-mono px-4 py-2.5 text-[12px] font-bold hover:bg-[var(--jp-text)] hover:text-[var(--jp-bg)] transition-colors">
              {t.label}
            </Link>
          ))}
        </div>
      </div>
      <div className={`bl-bt lg:border-t-0 p-6 sm:p-8 flex flex-col justify-between gap-8 ${isSignal ? 'bg-[var(--jp-ink)] text-[var(--jp-ink-text)]' : ''}`}>
        <h2 className="bl-display text-4xl sm:text-6xl">
          Pripravený<br />na <span className="text-[var(--jp-accent)]" style={isSignal ? { color: 'var(--jp-signal)' } : undefined}>prvý krok?</span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/auth/register" className="group bl-mono inline-flex items-center justify-between gap-6 flex-1 bg-[var(--jp-accent)] text-[var(--jp-accent-contrast)] text-[13px] font-bold px-6 h-14 hover:bg-[var(--jp-accent-hover)] transition-colors" style={isSignal ? { background: 'var(--jp-signal)', color: 'var(--jp-ink)' } : undefined}>
            Registrovať sa zadarmo <ArrowUpRight className="bl-arrow w-5 h-5" />
          </Link>
          <Link href="/pricing" className="group bl-mono inline-flex items-center justify-between gap-6 flex-1 border-2 border-current text-[13px] font-bold px-6 h-14 hover:opacity-70 transition-opacity">
            Pre firmy <ArrowUpRight className="bl-arrow w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );

  /* ---------- FOOTER ---------- */
  const footer = (
    <footer className="grid grid-cols-1 md:grid-cols-[1fr_auto] bl-mono text-[11px]">
      <div className="p-6 sm:px-8 flex flex-wrap gap-x-8 gap-y-2 items-center">
        <span className="font-bold">DajFlek® {new Date().getFullYear()}</span>
        <Link href="/jobs" className="hover:text-[var(--jp-accent)]">Ponuky</Link>
        <Link href="/cv" className="hover:text-[var(--jp-accent)]">CV Builder</Link>
        <Link href="/pricing" className="hover:text-[var(--jp-accent)]">Cenník</Link>
        <Link href="/contact" className="hover:text-[var(--jp-accent)]">Kontakt</Link>
      </div>
      <div className="bl-bt md:border-t-0 md:bl-bl p-6 sm:px-8 flex items-center gap-3 text-[var(--jp-muted)]">
        <Square /> Bratislava, SK — info@dajflek.sk
      </div>
    </footer>
  );

  /* ---------- TICKER (len dark) ---------- */
  const ticker = isDark ? (
    <div className="overflow-hidden whitespace-nowrap bg-[var(--jp-accent)] text-[var(--jp-accent-contrast)] bl-mono text-[11px] font-bold">
      <div className="inline-flex py-2" style={{ animation: 'bl-ticker 24s linear infinite' }}>
        {[...TICKER, ...TICKER].map((t, i) => (
          <span key={i} className="px-6">{t} <span className="ml-6">■</span></span>
        ))}
      </div>
    </div>
  ) : null;

  return (
    <div className="min-h-screen bg-[var(--jp-canvas)] text-[var(--jp-text)] px-3 py-3 sm:px-6 sm:py-6 lg:px-10 lg:py-10" style={{ fontFamily: 'var(--jp-font)' }}>
      <div className="bl-cell bg-[var(--jp-bg)] mx-auto max-w-[1400px]">
        {ticker}
        {nav}
        {hero}
        {servicesSection}
        {statsSection}
        {jobsSection}
        {typesCtaSection}
        {footer}
      </div>
      <div className="mx-auto max-w-[1400px] flex justify-between pt-4 bl-mono text-[11px] text-[var(--jp-muted)]" style={isSignal ? { color: 'var(--jp-ink)' } : undefined}>
        <span>DajFlek — práca pre juniorov</span>
        <span className="hidden sm:inline">{VARIANT_LABEL[variant]}</span>
      </div>
    </div>
  );
}

const VARIANT_LABEL: Record<BrutalVariant, string> = {
  brutal: 'Iterácia 01 / Brutal',
  'brutal-dark': 'Iterácia 02 / Brutal Dark',
  'brutal-signal': 'Iterácia 03 / Brutal Signal',
};

const NAV = [
  { href: '/jobs', label: 'Ponuky' },
  { href: '/cv', label: 'CV' },
  { href: '/pricing', label: 'Firmy' },
  { href: '/contact', label: 'Kontakt' },
  { href: '/auth/register', label: 'Registrácia' },
];

const SERVICES = [
  { label: 'Ponuky pre juniorov', href: '/jobs' },
  { label: 'CV Builder', href: '/cv' },
  { label: 'Skill matching', href: '/auth/register' },
  { label: 'Overené firmy', href: '/pricing' },
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

const PLACEHOLDER_JOBS = [
  { company: 'Studio Nula', title: 'Junior Frontend Developer', type: 'Plný úväzok', location: 'Bratislava', salary: '1 400 – 1 800 EUR' },
  { company: 'Kajam Labs', title: 'QA Stážista', type: 'Stáž', location: 'Košice / Remote', salary: '700 EUR' },
  { company: 'Betonová s.r.o.', title: 'Junior Backend (Node)', type: 'Živnosť', location: 'Remote', salary: 'Dohodou' },
];

const TICKER = [
  'Práca pre juniorov',
  'Stáže',
  'Iba overené firmy',
  'Odpoveď do 48 hodín',
  'CV Builder',
  'Registrácia zdarma',
];
