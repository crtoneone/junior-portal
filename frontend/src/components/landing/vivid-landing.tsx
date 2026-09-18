'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { DuoPhoto } from './duo-photo';
import { useLandingData, NAV, STEPS, FEATURES, TYPES, PHOTOS } from './shared';

export type VividVariant = 'vivid-split' | 'vivid-poster';

/**
 * Gradient duotone plagáty (magenta / tyrkys / žltá / fialová):
 *  vivid-split  – hero rozdelený na dva farebné bloky, portrét cez oba, veľké čísla, bodková mriežka
 *  vivid-poster – „plagátová stena": mriežka farebných dlaždíc s polkruhmi, každá dlaždica iná dvojica farieb
 */
export function VividLanding({ variant }: { variant: VividVariant }) {
  const { jobs, stats } = useLandingData(variant);
  return variant === 'vivid-split' ? <SplitLayout jobs={jobs} stats={stats} /> : <PosterLayout jobs={jobs} stats={stats} />;
}

type Props = { jobs: ReturnType<typeof useLandingData>['jobs']; stats: ReturnType<typeof useLandingData>['stats'] };

const M = 'var(--jp-magenta)';
const T = 'var(--jp-teal)';
const Y = 'var(--jp-yellow)';
const V = 'var(--jp-violet)';

const display = { fontFamily: 'var(--jp-display-font)', letterSpacing: '-0.03em', lineHeight: 0.9, textTransform: 'uppercase' as const };
const mono = { fontFamily: 'var(--jp-sec-font)', textTransform: 'uppercase' as const, letterSpacing: '0.08em' };

function Nav({ onDark }: { onDark: boolean }) {
  return (
    <header className={`flex items-center justify-between gap-4 px-5 sm:px-8 h-16 ${onDark ? 'text-white' : 'text-[var(--jp-text)]'}`}>
      <Link href="/" className="text-2xl" style={display}>DajFlek</Link>
      <nav className="hidden md:flex items-center gap-6 text-[11px] font-bold" style={mono}>
        {NAV.map((n) => <Link key={n.href} href={n.href} className="hover:opacity-60 transition-opacity">{n.label}</Link>)}
      </nav>
      <div className="flex items-center gap-3">
        <ThemeSwitcher />
        <Link href="/auth/register" className="hidden sm:inline-flex h-[42px] items-center px-4 text-[11px] font-bold" style={{ ...mono, background: Y, color: '#140b1f' }}>Registrácia</Link>
      </div>
    </header>
  );
}

/* =====================================================================
   1) VIVID SPLIT — magenta | tyrkys
   ===================================================================== */
function SplitLayout({ jobs, stats }: Props) {
  return (
    <div className="min-h-screen bg-[var(--jp-bg)] text-[var(--jp-text)]" style={{ fontFamily: 'var(--jp-font)' }}>
      {/* HERO: dve farebné polovice, portrét naprieč */}
      <section className="relative overflow-hidden text-white" style={{ background: `linear-gradient(90deg, ${M} 0 50%, ${T} 50% 100%)` }}>
        <Nav onDark />
        <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">
          <div className="px-5 sm:px-8 lg:pr-20 py-14 lg:py-20 flex flex-col justify-between gap-12">
            <div>
              <div className="text-[11px] font-bold opacity-80" style={mono}>Pre juniorov · {new Date().getFullYear()}</div>
              <h1 className="mt-6 text-[16vw] sm:text-[11vw] lg:text-[6rem]" style={display}>
                Vypadni<br />z <span style={{ color: Y }}>čakárne.</span>
              </h1>
              <p className="mt-6 max-w-sm text-base sm:text-lg opacity-90 leading-snug">
                Overené firmy, jasné požiadavky a odpoveď do 48 hodín. Prvá práca v IT bez čakania na „5 rokov praxe".
              </p>
            </div>
            <form action="/jobs" method="GET" className="flex max-w-md">
              <input name="search" type="text" placeholder="Pozícia, technológia…" className="flex-1 h-14 px-4 bg-white text-[var(--jp-text)] text-sm placeholder:text-[var(--jp-muted)] focus:outline-none" />
              <button type="submit" className="h-14 px-6 text-[11px] font-bold" style={{ ...mono, background: Y, color: '#140b1f' }}>Hľadať</button>
            </form>
          </div>
          <div className="relative min-h-[420px]">
            {/* portrét pretína šev magenta/tyrkys — tint je rozdelený v rovnakom bode ako pozadie */}
            <DuoPhoto src={PHOTOS[2]} tint={`linear-gradient(90deg, ${M} 0 12%, ${T} 12% 100%)`} mode="screen" base="#000" className="absolute lg:-left-[12%] left-0 right-[10%] lg:right-[22%] top-[8%] bottom-0" />
            <div className="absolute inset-0 dot-grid opacity-30 text-white pointer-events-none" style={{ maskImage: 'linear-gradient(to top, black 30%, transparent 70%)' }} />
            <div className="absolute left-6 bottom-6 sm:left-8 sm:bottom-8">
              <div className="text-6xl sm:text-8xl" style={{ ...display, color: Y }}>{stats[0].value}</div>
              <div className="text-[11px] font-bold" style={mono}>{stats[0].label}</div>
            </div>
          </div>
        </div>
      </section>

      {/* KROKY — žltý blok s polkruhom */}
      <section className="relative overflow-hidden" style={{ background: Y, color: '#140b1f' }}>
        <div className="absolute -left-44 -bottom-56 w-[360px] h-[360px] rounded-full" style={{ background: V, opacity: 0.9 }} />
        <div className="relative px-5 sm:px-8 py-16 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10">
          <h2 className="text-5xl sm:text-7xl" style={display}>Ako to<br />ide</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <div key={i}>
                <div className="text-5xl" style={display}>0{i + 1}</div>
                <div className="mt-3 w-10 h-10 dot-grid" />
                <h3 className="mt-4 text-xl font-black uppercase tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm opacity-80 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PONUKY — tri plagátové dlaždice */}
      <section className="px-5 sm:px-8 py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-5xl sm:text-7xl" style={display}>Ponuky</h2>
          <Link href="/jobs" className="text-[11px] font-bold inline-flex items-center gap-2" style={mono}>Všetky <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {jobs.map((job, i) => {
            const pair = [[M, T], [V, Y], [T, M]][i % 3];
            return (
              <Link key={i} href={job.href} className="group relative aspect-[4/5] overflow-hidden text-white" style={{ background: `linear-gradient(180deg, ${pair[0]} 0 55%, ${pair[1]} 55% 100%)` }}>
                <DuoPhoto src={PHOTOS[(i + 1) % PHOTOS.length]} tint={pair[0]} mode="screen" base="#000" className="absolute inset-x-0 top-0 h-[55%]" />
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="text-[10px] font-bold opacity-90" style={mono}>{job.company}</div>
                  <div>
                    <h3 className="text-3xl" style={display}>{job.title}</h3>
                    <div className="mt-3 text-[11px] font-bold" style={mono}>{job.type} · {job.location}</div>
                    <div className="mt-4 text-2xl font-black" style={{ color: i === 1 ? '#140b1f' : Y }}>{job.salary}</div>
                  </div>
                </div>
                <ArrowUpRight className="absolute right-5 top-5 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* STATS + PREČO — fialový blok */}
      <section className="text-white px-5 sm:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12" style={{ background: V }}>
        <div className="grid grid-cols-2 gap-8">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="text-5xl sm:text-6xl" style={{ ...display, color: i % 2 ? Y : '#fff' }}>{s.value}</div>
              <div className="mt-2 text-[11px] font-bold opacity-80" style={mono}>{s.label}</div>
            </div>
          ))}
        </div>
        <ul className="divide-y divide-white/20">
          {FEATURES.map((f, i) => (
            <li key={i} className="py-5 flex items-start gap-5">
              <span className="w-3 h-3 mt-2 rounded-full shrink-0" style={{ background: [M, T, Y, '#fff'][i] }} />
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight">{f.title}</h3>
                <p className="text-sm opacity-80">{f.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA + typy */}
      <section className="px-5 sm:px-8 py-16 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center">
        <div>
          <h2 className="text-5xl sm:text-7xl" style={display}>Pripravený<br />na <span style={{ color: M }}>prvý krok?</span></h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {TYPES.map((t, i) => (
              <Link key={t.key} href={`/jobs?type=${t.key}`} className="px-4 py-2 text-[11px] font-bold text-white hover:opacity-80" style={{ ...mono, background: [M, T, V, M, T][i] }}>{t.label}</Link>
            ))}
          </div>
        </div>
        <Link href="/auth/register" className="inline-flex items-center gap-3 h-16 px-10 text-[12px] font-bold text-white hover:opacity-90" style={{ ...mono, background: `linear-gradient(90deg, ${M}, ${V})` }}>
          Registrovať zadarmo <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <Footer />
    </div>
  );
}

/* =====================================================================
   2) VIVID POSTER — stena plagátov
   ===================================================================== */
function PosterLayout({ jobs, stats }: Props) {
  const tiles = [
    { bg: `linear-gradient(90deg, ${M} 0 50%, ${T} 50% 100%)` },
    { bg: `linear-gradient(90deg, ${V} 0 50%, ${Y} 50% 100%)` },
    { bg: `linear-gradient(90deg, ${T} 0 50%, ${M} 50% 100%)` },
  ];
  return (
    <div className="min-h-screen bg-[var(--jp-bg)] text-[var(--jp-text)]" style={{ fontFamily: 'var(--jp-font)' }}>
      <Nav onDark />

      {/* HERO — mriežka plagátov: titulok, fotka, štatistika, hľadanie */}
      <section className="p-3 sm:p-5 grid grid-cols-2 lg:grid-cols-4 auto-rows-[220px] sm:auto-rows-[260px] gap-3 sm:gap-5">
        <div className="col-span-2 row-span-2 relative overflow-hidden p-6 sm:p-8 flex flex-col justify-between text-white" style={{ background: tiles[0].bg }}>
          <div className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full" style={{ background: Y }} />
          <div className="relative text-[11px] font-bold opacity-80" style={mono}>Pre juniorov · {new Date().getFullYear()}</div>
          <h1 className="relative text-[12vw] sm:text-[8vw] lg:text-[6.2rem]" style={display}>Odštar-<br />tuj to.</h1>
        </div>
        <div className="col-span-2 lg:col-span-1 row-span-2 relative overflow-hidden" style={{ background: V }}>
          <DuoPhoto src={PHOTOS[0]} tint={V} mode="screen" base="#000" className="absolute inset-0" />
          <div className="absolute inset-0 dot-grid text-white opacity-30" style={{ maskImage: 'linear-gradient(to top, black 20%, transparent 60%)' }} />
          <div className="absolute left-5 bottom-5 text-white">
            <div className="text-[10px] font-bold" style={mono}>Junior</div>
            <div className="text-3xl" style={display}>Frontend</div>
          </div>
        </div>
        <div className="relative overflow-hidden p-5 flex flex-col justify-between" style={{ background: Y, color: '#140b1f' }}>
          <div className="absolute -left-10 -top-10 w-32 h-32 rounded-full" style={{ background: M }} />
          <div className="relative text-5xl sm:text-6xl" style={display}>{stats[0].value}</div>
          <div className="relative text-[10px] font-bold" style={mono}>{stats[0].label}</div>
        </div>
        <div className="relative overflow-hidden p-5 flex flex-col justify-between text-white" style={{ background: T }}>
          <div className="w-14 h-14 dot-grid" />
          <div>
            <div className="text-4xl sm:text-5xl" style={display}>{stats[3].value}</div>
            <div className="text-[10px] font-bold" style={mono}>{stats[3].label}</div>
          </div>
        </div>
      </section>
      <section className="px-3 sm:px-5 pb-5">
        <form action="/jobs" method="GET" className="flex bg-white h-14">
          <input name="search" type="text" placeholder="Pozícia, technológia, mesto…" className="flex-1 h-full px-5 text-[var(--jp-text)] text-sm placeholder:text-[var(--jp-muted)] focus:outline-none" />
          <button type="submit" className="px-8 text-[11px] font-bold" style={{ ...mono, background: M, color: '#fff' }}>Hľadať</button>
        </form>
      </section>

      {/* PONUKY — plagáty s polkruhmi */}
      <section className="px-3 sm:px-5 pb-5">
        <div className="flex items-end justify-between px-2 pb-5">
          <h2 className="text-4xl sm:text-6xl" style={display}>Ponuky</h2>
          <Link href="/jobs" className="text-[11px] font-bold inline-flex items-center gap-2" style={mono}>Všetky <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5">
          {jobs.map((job, i) => (
            <Link key={i} href={job.href} className="group relative aspect-[3/4] overflow-hidden text-white p-6 flex flex-col justify-between" style={{ background: tiles[i % 3].bg }}>
              <div className="absolute right-0 top-1/4 w-40 h-40 rounded-l-full" style={{ background: i === 1 ? T : Y, opacity: 0.9 }} />
              <DuoPhoto src={PHOTOS[(i + 2) % PHOTOS.length]} tint={[M, V, T][i % 3]} mode="screen" base="transparent" className="absolute inset-x-0 bottom-0 h-1/2" style={{ maskImage: 'linear-gradient(to top, black 60%, transparent 100%)' }} />
              <div className="relative text-[10px] font-bold" style={mono}>{job.company} · {job.type}</div>
              <div className="relative">
                <h3 className="text-3xl sm:text-4xl" style={display}>{job.title}</h3>
                <div className="mt-2 text-[11px] font-bold" style={mono}>{job.location}</div>
                <div className="mt-3 text-2xl font-black" style={{ color: Y }}>{job.salary}</div>
              </div>
              <ArrowUpRight className="absolute right-5 top-5 w-6 h-6" />
            </Link>
          ))}
        </div>
      </section>

      {/* KROKY + PREČO — tmavé dlaždice */}
      <section className="px-3 sm:px-5 pb-5 grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5">
        <div className="bg-[var(--jp-surface)] p-6 sm:p-8">
          <h2 className="text-4xl sm:text-5xl" style={display}>Ako to ide</h2>
          <ol className="mt-8 space-y-6">
            {STEPS.map((s, i) => (
              <li key={i} className="flex gap-5">
                <span className="text-4xl shrink-0" style={{ ...display, color: [M, T, Y][i] }}>0{i + 1}</span>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight">{s.title}</h3>
                  <p className="text-sm text-[var(--jp-muted)]">{s.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-5">
          {FEATURES.map((f, i) => (
            <div key={i} className="p-5 flex flex-col justify-between min-h-[160px]" style={{ background: [M, V, T, Y][i], color: i === 3 ? '#140b1f' : '#fff' }}>
              <div className="w-8 h-8 dot-grid opacity-60" />
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight">{f.title}</h3>
                <p className="text-xs opacity-85">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-3 sm:px-5 pb-5">
        <div className="relative overflow-hidden p-8 sm:p-12 text-white flex flex-col md:flex-row md:items-end justify-between gap-8" style={{ background: `linear-gradient(90deg, ${V}, ${M})` }}>
          <div className="absolute -left-16 -bottom-24 w-72 h-72 rounded-full" style={{ background: Y, opacity: 0.9 }} />
          <h2 className="relative text-5xl sm:text-7xl" style={display}>Pripravený<br />na prvý krok?</h2>
          <div className="relative flex flex-col gap-3 items-start md:items-end">
            <Link href="/auth/register" className="inline-flex items-center gap-3 h-14 px-8 text-[12px] font-bold" style={{ ...mono, background: '#fff', color: '#140b1f' }}>Registrovať zadarmo <ArrowRight className="w-4 h-4" /></Link>
            <div className="flex flex-wrap gap-2 md:justify-end">
              {TYPES.map((t) => <Link key={t.key} href={`/jobs?type=${t.key}`} className="px-3 py-1.5 text-[10px] font-bold border border-white/40 hover:bg-white/10" style={mono}>{t.label}</Link>)}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="px-5 sm:px-8 py-6 flex flex-wrap items-center justify-between gap-4 text-[10px] font-bold text-[var(--jp-muted)]" style={mono}>
      <span>DajFlek © {new Date().getFullYear()}</span>
      <div className="flex gap-5">{NAV.map((n) => <Link key={n.href} href={n.href} className="hover:text-[var(--jp-text)]">{n.label}</Link>)}</div>
      <span>Bratislava · info@dajflek.sk</span>
    </footer>
  );
}
