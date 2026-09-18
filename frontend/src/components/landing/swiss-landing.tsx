'use client';

import Link from 'next/link';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { DuoPhoto } from './duo-photo';
import { useLandingData, NAV, STEPS, FEATURES, TYPES, PHOTOS } from './shared';

export type SwissVariant = 'swiss' | 'swiss-arc';

/**
 * Swiss editorial („UI. Beginner's"):
 *  swiss     – biela, zvislý fialový pás cez ČB fotku, wordmark „DF.", otočený text, tenké šípky, čierne tlačidlá
 *  swiss-arc – stories layout: veľký oblúk U, plné fialové plochy s bielymi bodkami, kruhové fotky, pás kariet
 */
export function SwissLanding({ variant }: { variant: SwissVariant }) {
  const { jobs, stats } = useLandingData(variant);
  return variant === 'swiss' ? <BarLayout jobs={jobs} stats={stats} /> : <ArcLayout jobs={jobs} stats={stats} />;
}

type Props = { jobs: ReturnType<typeof useLandingData>['jobs']; stats: ReturnType<typeof useLandingData>['stats'] };

const VI = 'var(--jp-violet)';
const VD = 'var(--jp-violet-deep)';
const wordmark = { fontFamily: 'var(--jp-display-font)', letterSpacing: '-0.04em' };
const mono = { fontFamily: 'var(--jp-sec-font)', textTransform: 'uppercase' as const, letterSpacing: '0.16em' };
const caps = { textTransform: 'uppercase' as const, letterSpacing: '0.12em' };

function Wordmark({ className = '' }: { className?: string }) {
  return <Link href="/" className={`text-4xl ${className}`} style={wordmark}>DF<span style={{ color: VI }}>.</span></Link>;
}

function BlackButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center h-11 px-6 bg-[#111] text-white text-[10px] font-bold hover:bg-[var(--jp-violet)] hover:text-[#111] transition-colors" style={mono}>
      {children}
    </Link>
  );
}

function Nav() {
  return (
    <header className="flex items-center justify-between gap-4 px-5 sm:px-10 h-20">
      <Wordmark />
      <nav className="hidden md:flex items-center gap-8 text-[10px] font-bold" style={mono}>
        {NAV.map((n) => <Link key={n.href} href={n.href} className="hover:text-[var(--jp-violet)] transition-colors">{n.label}</Link>)}
      </nav>
      <div className="flex items-center gap-3">
        <ThemeSwitcher />
        <span className="hidden sm:inline-flex"><BlackButton href="/auth/register">Registrácia</BlackButton></span>
      </div>
    </header>
  );
}

/* =====================================================================
   1) SWISS — zvislý pás cez fotku
   ===================================================================== */
function BarLayout({ jobs, stats }: Props) {
  return (
    <div className="min-h-screen bg-[var(--jp-bg)] text-[var(--jp-text)]" style={{ fontFamily: 'var(--jp-font)' }}>
      <Nav />

      {/* HERO: fialový pás + ČB fotka vľavo, text vpravo, zvislý popis */}
      <section className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] min-h-[680px] overflow-hidden">
        <div className="absolute left-[7%] top-0 bottom-0 w-[22%] hidden lg:block" style={{ background: VI }} />
        <div className="absolute left-4 top-8 w-6 h-6 rounded-full border border-[#111]/20 hidden lg:block" />
        <div className="absolute left-[38%] top-[60%] w-24 h-24 rounded-full border border-[#111]/15 hidden lg:block" />
        <div className="absolute left-0 top-10 rotate-180 vrl text-[9px] font-bold border border-[#111] px-1.5 py-2 hidden lg:block" style={mono}>Edícia {new Date().getFullYear()}</div>

        <div className="relative px-5 pt-16 pb-10 lg:pl-[14%] lg:pr-8 flex items-center">
          <div className="relative aspect-[3/4] w-full max-w-[420px]">
            <DuoPhoto src={PHOTOS[3]} className="absolute inset-0" base="#c9c9c9" />
            {/* pás pretína fotku — zarovnaný s pásom v pozadí sekcie */}
            <div className="absolute inset-y-0 left-0 w-1/2 duo-overlay" style={{ background: VI, opacity: 0.9 }} />
          </div>
        </div>

        <div className="relative px-5 sm:px-10 py-12 lg:py-16 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div />
            <div className="rotate-180 vrl text-[11px] font-bold tracking-[0.35em] hidden sm:block" style={caps}>Pre juniorov</div>
          </div>
          <div className="max-w-sm">
            <div className="text-[11px] font-bold leading-5" style={caps}>Štartovací sprievodca<br />pre juniorov v IT</div>
            <p className="mt-5 text-[13px] leading-6 text-[var(--jp-muted)]" style={{ fontFamily: 'var(--jp-sec-font)' }}>
              Overené firmy, jasné požiadavky, odpoveď do 48 hodín. Iba reálne ponuky pre začiatočníkov, stážistov a absolventov. ■
            </p>
            <div className="mt-7"><BlackButton href="/jobs">Začať</BlackButton></div>
          </div>
          <div className="flex items-center justify-between text-[10px] font-bold" style={mono}>
            <span>www.dajflek.sk</span>
            <Link href="/jobs" className="thin-arrow" aria-label="Ponuky" />
          </div>
        </div>
      </section>

      {/* SEARCH — tenká linka */}
      <section className="px-5 sm:px-10 py-8 border-t border-[#111]">
        <form action="/jobs" method="GET" className="flex items-center gap-6 max-w-2xl">
          <input name="search" type="text" placeholder="Akú pozíciu hľadáš?" className="flex-1 h-12 bg-transparent border-b border-[#111] text-sm placeholder:text-[var(--jp-muted)] focus:outline-none focus:border-[var(--jp-violet)]" />
          <button type="submit" className="thin-arrow text-[#111] hover:text-[var(--jp-violet)]" aria-label="Hľadať" />
        </form>
      </section>

      {/* STORIES pás — 3 karty */}
      <section className="px-5 sm:px-10 py-14 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { photo: PHOTOS[0], title: 'Staň sa\njuniorom, ktorého\nchcú', bar: 'h' },
          { photo: PHOTOS[1], title: 'Sprievodca\nprvou prácou', bar: 'v' },
          { photo: PHOTOS[2], title: 'CV, ktoré\nprejde', bar: 'circle' },
        ].map((c, i) => (
          <div key={i} className="relative aspect-[4/5] bg-[var(--jp-surface)] overflow-hidden p-6 flex flex-col justify-between">
            {c.bar === 'h' && <div className="absolute inset-x-0 top-[55%] h-[28%]" style={{ background: VI }} />}
            {c.bar === 'v' && <div className="absolute inset-y-0 right-[18%] w-[26%]" style={{ background: VI }} />}
            {c.bar === 'circle' && <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square rounded-full" style={{ background: VI }} />}
            <DuoPhoto src={c.photo} className={`absolute ${c.bar === 'circle' ? 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[58%] aspect-square rounded-full' : 'inset-x-[15%] top-[10%] bottom-0'}`} base="#cfcfcf" />
            {c.bar !== 'circle' && <div className={`absolute duo-overlay ${c.bar === 'h' ? 'inset-x-0 top-[55%] h-[28%]' : 'inset-y-0 right-[18%] w-[26%]'}`} style={{ background: VI, opacity: 0.85 }} />}
            <div className="relative flex items-start justify-between">
              <span className="text-xl" style={wordmark}>DF.</span>
              <span className="text-[9px] font-bold border border-[#111] px-1.5 py-1" style={mono}>0{i + 1}</span>
            </div>
            <div className="relative">
              <h3 className="text-[11px] font-bold leading-5 whitespace-pre-line" style={caps}>{c.title}</h3>
              <div className="mt-3 flex items-center justify-between">
                <BlackButton href="/jobs">Začať</BlackButton>
                <span className="thin-arrow" />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* KROKY — číslované tenké linky */}
      <section className="px-5 sm:px-10 py-14 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 border-t border-[#111]">
        <div>
          <div className="text-[11px] font-bold" style={caps}>Ako to funguje</div>
          <div className="mt-6 flex gap-3">
            {stats.slice(0, 2).map((s, i) => (
              <div key={i} className="px-4 py-3" style={{ background: i ? '#111' : VI, color: i ? '#fff' : '#111' }}>
                <div className="text-3xl" style={wordmark}>{s.value}</div>
                <div className="text-[9px] font-bold opacity-80" style={mono}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <ol>
          {STEPS.map((s, i) => (
            <li key={i} className="grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-5 border-b border-[#111]">
              <span className="text-[11px] font-bold" style={mono}>0{i + 1}</span>
              <div>
                <h3 className="text-[12px] font-bold" style={caps}>{s.title}</h3>
                <p className="mt-1 text-[13px] text-[var(--jp-muted)]" style={{ fontFamily: 'var(--jp-sec-font)' }}>{s.description}</p>
              </div>
              <span className="thin-arrow" />
            </li>
          ))}
        </ol>
      </section>

      {/* PONUKY — riadky s fialovou bodkou */}
      <section className="px-5 sm:px-10 py-14 border-t border-[#111]">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-bold" style={caps}>Najnovšie ponuky</div>
          <Link href="/jobs" className="text-[10px] font-bold hover:text-[var(--jp-violet)]" style={mono}>Všetky →</Link>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.map((job, i) => (
            <Link key={i} href={job.href} className="group border border-[#111] p-6 flex flex-col gap-8 hover:bg-[var(--jp-surface)] transition-colors">
              <div className="flex items-center justify-between">
                <span className="w-3 h-3 rounded-full" style={{ background: VI }} />
                <span className="text-[9px] font-bold" style={mono}>{job.date}</span>
              </div>
              <div>
                <div className="text-[9px] font-bold text-[var(--jp-muted)]" style={mono}>{job.company}</div>
                <h3 className="mt-2 text-[13px] font-bold leading-5" style={caps}>{job.title}</h3>
                <div className="mt-2 text-[11px] text-[var(--jp-muted)]" style={{ fontFamily: 'var(--jp-sec-font)' }}>{job.type} · {job.location}</div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">{job.salary}</span>
                <span className="thin-arrow group-hover:text-[var(--jp-violet)]" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA — kruhová fotka */}
      <section className="relative px-5 sm:px-10 py-16 border-t border-[#111] grid grid-cols-1 lg:grid-cols-2 gap-10 items-center overflow-hidden">
        <div className="absolute left-10 top-10 w-4 h-4 rounded-full" style={{ background: VI }} />
        <div className="absolute right-16 bottom-12 w-5 h-5 rounded-full" style={{ background: VI }} />
        <div className="absolute right-[40%] top-6 w-20 h-20 rounded-full border border-[#111]/15" />
        <div className="relative">
          <div className="text-[11px] font-bold" style={caps}>Staň sa juniorom,<br />ktorého firmy chcú</div>
          <p className="mt-4 text-[13px] text-[var(--jp-muted)] max-w-sm" style={{ fontFamily: 'var(--jp-sec-font)' }}>Registrácia je zadarmo. Žiadne skryté poplatky. Iba príležitosti.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {TYPES.map((t) => <Link key={t.key} href={`/jobs?type=${t.key}`} className="border border-[#111] px-3 py-1.5 text-[9px] font-bold hover:bg-[#111] hover:text-white" style={mono}>{t.label}</Link>)}
          </div>
          <div className="mt-8 flex items-center gap-6">
            <BlackButton href="/auth/register">Registrovať sa</BlackButton>
            <span className="thin-arrow" />
          </div>
        </div>
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto rounded-full overflow-hidden" style={{ background: VI }}>
          <DuoPhoto src={PHOTOS[0]} className="absolute inset-8 rounded-full" base="#bbb" />
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* =====================================================================
   2) SWISS ARC — oblúk U, plné fialové plochy
   ===================================================================== */
function ArcLayout({ jobs, stats }: Props) {
  return (
    <div className="min-h-screen bg-[var(--jp-bg)] text-[var(--jp-text)]" style={{ fontFamily: 'var(--jp-font)' }}>
      <Nav />

      {/* HERO: veľký U oblúk okolo fotky, wordmark otočený vpravo */}
      <section className="relative overflow-hidden min-h-[720px] grid grid-cols-1 lg:grid-cols-[1fr_auto]">
        <div className="absolute left-4 top-6 rotate-180 vrl text-[9px] font-bold hidden lg:block" style={mono}>www.dajflek.sk</div>
        <div className="relative px-5 sm:px-10 py-6 flex items-end justify-center">
          {/* U oblúk */}
          <div className="relative w-[360px] sm:w-[520px] h-[560px] sm:h-[640px]">
            {/* U oblúk = plný tvar mínus vnútorný výrez; tenký pás, široký otvor, veľké zaoblenie */}
            <div className="absolute inset-0 rounded-b-[9999px]" style={{ background: VI }} />
            <div className="absolute inset-x-[17%] top-0 bottom-[17%] rounded-b-[9999px] bg-[var(--jp-bg)]" />
            {/* portrét sedí v otvore U a telom prekrýva jeho spodok */}
            <DuoPhoto src={PHOTOS[3]} className="absolute inset-x-[24%] top-[14%] bottom-0" base="#c4c4c4" />
            <div className="absolute inset-x-[24%] top-[58%] h-[13%] duo-overlay" style={{ background: VI, opacity: 0.9 }} />
            <div className="absolute left-4 top-4 w-3 h-3 rounded-full bg-white" />
          </div>
        </div>
        <div className="relative px-5 sm:px-10 py-10 lg:py-14 flex lg:flex-col justify-between items-start gap-10 lg:w-[380px]">
          <div className="flex items-start gap-6">
            <span className="vrl text-7xl lg:text-8xl hidden lg:block" style={wordmark}>DF.</span>
            <div className="rotate-180 vrl text-[11px] font-bold tracking-[0.35em] hidden lg:block" style={caps}>Pre juniorov</div>
          </div>
          <div className="max-w-xs">
            <span className="thin-arrow mb-6" />
            <div className="text-[11px] font-bold leading-5" style={caps}>Štartovací sprievodca<br />pre juniorov v IT</div>
            <p className="mt-4 text-[13px] leading-6 text-[var(--jp-muted)]" style={{ fontFamily: 'var(--jp-sec-font)' }}>
              Overené firmy, jasné požiadavky, odpoveď do 48 hodín. ■
            </p>
            <div className="mt-6"><BlackButton href="/jobs">Začať</BlackButton></div>
          </div>
        </div>
        <div className="absolute left-5 sm:left-10 bottom-8 text-[11px] font-bold" style={mono}>Edícia<br /><span className="text-2xl tracking-[0.2em]">{new Date().getFullYear()}</span></div>
      </section>

      {/* FIALOVÁ PLOCHA: hľadanie + stories karty */}
      <section className="relative overflow-hidden px-5 sm:px-10 py-14" style={{ background: VI }}>
        <div className="absolute right-10 top-8 w-5 h-5 rounded-full bg-white" />
        <div className="absolute left-1/3 bottom-10 w-3 h-3 rounded-full bg-white" />
        <div className="absolute -right-24 -bottom-24 w-72 h-72 rounded-full border border-white/40" />
        <form action="/jobs" method="GET" className="relative flex max-w-2xl bg-white">
          <input name="search" type="text" placeholder="Akú pozíciu hľadáš?" className="flex-1 h-14 px-5 bg-transparent text-sm placeholder:text-[var(--jp-muted)] focus:outline-none" />
          <button type="submit" className="h-14 px-6 bg-[#111] text-white text-[10px] font-bold" style={mono}>Hľadať</button>
        </form>
        <div className="relative mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { kind: 'text', title: 'Štartovací\nsprievodca\npre juniorov' },
            { kind: 'photo', photo: PHOTOS[1] },
            { kind: 'stat' },
            { kind: 'circle', photo: PHOTOS[2] },
          ].map((c, i) => (
            <div key={i} className={`relative aspect-[9/14] overflow-hidden p-5 flex flex-col justify-between ${c.kind === 'photo' ? 'bg-[#111]' : 'bg-[var(--jp-bg)]'}`}>
              <div className="flex items-start justify-between">
                <span className={`text-lg ${c.kind === 'photo' ? 'text-white' : ''}`} style={wordmark}>DF.</span>
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: VI }} />
              </div>
              {c.kind === 'photo' && <DuoPhoto src={c.photo!} className="absolute inset-x-0 top-[22%] bottom-0" base="#333" />}
              {c.kind === 'circle' && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[72%] aspect-square rounded-full" style={{ background: VI }}>
                  <DuoPhoto src={c.photo!} className="absolute inset-[9%] rounded-full" base="#bbb" />
                </div>
              )}
              {c.kind === 'stat' && (
                <div>
                  <div className="text-5xl" style={wordmark}>{stats[0].value}</div>
                  <div className="mt-1 text-[9px] font-bold" style={mono}>{stats[0].label}</div>
                  <div className="mt-4 text-5xl" style={{ ...wordmark, color: VI }}>{stats[3].value}</div>
                  <div className="mt-1 text-[9px] font-bold" style={mono}>{stats[3].label}</div>
                </div>
              )}
              {c.kind === 'text' && <div className="text-[11px] font-bold leading-5 whitespace-pre-line" style={caps}>{c.title}</div>}
              <div className="relative flex items-center justify-between">
                <span className={`thin-arrow ${c.kind === 'photo' ? 'text-white' : ''}`} />
                <span className={`text-[8px] font-bold ${c.kind === 'photo' ? 'text-white' : ''}`} style={mono}>Edícia {new Date().getFullYear()}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* KROKY — tri stĺpce s fialovým horným pásom */}
      <section className="px-5 sm:px-10 py-14 grid grid-cols-1 md:grid-cols-3 gap-8">
        {STEPS.map((s, i) => (
          <div key={i}>
            <div className="h-2 w-full" style={{ background: i === 1 ? '#111' : VI }} />
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[10px] font-bold" style={mono}>0{i + 1}</span>
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: VI }} />
            </div>
            <h3 className="mt-3 text-[12px] font-bold" style={caps}>{s.title}</h3>
            <p className="mt-2 text-[13px] text-[var(--jp-muted)]" style={{ fontFamily: 'var(--jp-sec-font)' }}>{s.description}</p>
          </div>
        ))}
      </section>

      {/* PONUKY — stories na fialovej */}
      <section className="px-5 sm:px-10 py-14" style={{ background: VI }}>
        <div className="flex items-center justify-between text-[10px] font-bold" style={mono}>
          <span>Najnovšie ponuky</span>
          <Link href="/jobs" className="hover:text-white">Všetky →</Link>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {jobs.map((job, i) => (
            <Link key={i} href={job.href} className="group relative bg-[var(--jp-bg)] p-6 flex flex-col gap-10 hover:bg-[#111] hover:text-white transition-colors">
              <div className="absolute right-5 top-5 w-3 h-3 rounded-full" style={{ background: VI }} />
              <div className="text-[9px] font-bold text-[var(--jp-muted)] group-hover:text-white/60" style={mono}>{job.company}</div>
              <div>
                <h3 className="text-[13px] font-bold leading-5" style={caps}>{job.title}</h3>
                <div className="mt-2 text-[11px] opacity-70" style={{ fontFamily: 'var(--jp-sec-font)' }}>{job.type} · {job.location}</div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">{job.salary}</span>
                <span className="thin-arrow" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PREČO + CTA */}
      <section className="px-5 sm:px-10 py-14 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ul className="divide-y divide-[#111]">
          {FEATURES.map((f, i) => (
            <li key={i} className="py-4 grid grid-cols-[2.5rem_1fr] gap-4 items-baseline">
              <span className="text-[10px] font-bold" style={mono}>0{i + 1}</span>
              <div>
                <h3 className="text-[12px] font-bold" style={caps}>{f.title}</h3>
                <p className="mt-1 text-[13px] text-[var(--jp-muted)]" style={{ fontFamily: 'var(--jp-sec-font)' }}>{f.description}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="relative overflow-hidden p-8 flex flex-col justify-between min-h-[320px]" style={{ background: VI }}>
          <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-white/30" />
          <div className="absolute left-8 bottom-24 w-3 h-3 rounded-full bg-white" />
          <div className="relative text-[11px] font-bold leading-5" style={caps}>Staň sa juniorom,<br />ktorého firmy chcú</div>
          <div className="relative flex items-end justify-between">
            <div className="flex flex-wrap gap-2 max-w-xs">
              {TYPES.map((t) => <Link key={t.key} href={`/jobs?type=${t.key}`} className="bg-white px-3 py-1.5 text-[9px] font-bold hover:bg-[#111] hover:text-white" style={mono}>{t.label}</Link>)}
            </div>
            <BlackButton href="/auth/register">Registrovať</BlackButton>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="px-5 sm:px-10 py-6 border-t border-[#111] flex flex-wrap items-center justify-between gap-4 text-[9px] font-bold" style={mono}>
      <Wordmark className="!text-2xl" />
      <div className="flex gap-6">{NAV.map((n) => <Link key={n.href} href={n.href} className="hover:text-[var(--jp-violet)]">{n.label}</Link>)}</div>
      <span className="text-[var(--jp-muted)]">www.dajflek.sk · Edícia {new Date().getFullYear()}</span>
    </footer>
  );
}
