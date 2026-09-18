'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowUpRight, MapPin, Search } from 'lucide-react';
import { api } from '@/lib/api';
import { formatSalary, getJobTypeLabel, formatDate } from '@/lib/utils';

export default function HomePage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [stats, setStats] = useState(JOB_STATS);

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

  const Square = () => <span className="inline-block w-2.5 h-2.5 bg-[var(--jp-signal)] shrink-0" />;

  return (
    <div className="bg-[var(--jp-canvas)] text-[var(--jp-text)]">
      <div className="mx-auto max-w-[1400px] p-3 sm:p-6 lg:p-10" style={{ fontFamily: 'var(--jp-font)' }}>
        <div className="border-2 border-[var(--jp-border)] bg-[var(--jp-bg)]">
          {/* HERO — čierny blok, titulok vpravo, meta vľavo */}
          <section className="border-b-2 border-[var(--jp-border)] bg-[var(--jp-ink)] text-[var(--jp-ink-text)]">
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
                  <div className="flex items-center gap-2"><span className="inline-block w-2.5 h-2.5 bg-[var(--jp-signal)]" /> Bez seniorských BS</div>
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

          {/* SLUŽBY */}
          <section className="border-b-2 border-[var(--jp-border)] grid grid-cols-1 lg:grid-cols-[1fr_1.3fr]">
            <div className="border-b-2 lg:border-b-0 lg:border-r-2 border-[var(--jp-border)] p-6 sm:p-8">
              <div className="flex items-center gap-3 bl-mono text-[12px] pb-4 border-b-2 border-[var(--jp-border)]">
                <Square /> Čo ponúkame
              </div>
              <div className="grid grid-cols-2 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8">
                {SERVICES.map((s, i) => (
                  <Link key={s.href} href={s.href} className="group flex flex-col justify-between gap-8 p-6 sm:p-8 border-r-2 border-[var(--jp-border)] last:border-r-0 odd:border-r-2 even:border-r-0 hover:bg-[var(--jp-signal)] transition-colors">
                    <span className="bl-display text-5xl">{String(i + 1).padStart(2, '0')}</span>
                    <span className="flex items-end justify-between gap-2 text-sm font-bold uppercase tracking-tight">
                      {s.label} <ArrowUpRight className="bl-arrow w-5 h-5 shrink-0" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden p-6 sm:p-8 min-h-[420px] flex flex-col justify-between bg-[var(--jp-signal)] text-[var(--jp-ink)]">
              <p className="relative z-10 text-2xl sm:text-3xl font-bold uppercase leading-tight tracking-tight max-w-xs">
                Dobrá práca nie je len o plate.<br />Je o štarte.
              </p>
              <Link href="/jobs" className="group relative z-10 bl-mono inline-flex items-center justify-between gap-6 w-64 text-[13px] font-bold pb-2 border-b-2 border-current">
                Pozrieť ponuky <ArrowUpRight className="bl-arrow w-5 h-5" />
              </Link>
              <svg aria-hidden className="absolute right-0 bottom-0 w-[70%] h-[85%] opacity-90" viewBox="0 0 400 400" preserveAspectRatio="xMaxYMax slice">
                <polygon points="400,400 130,400 260,60" fill="currentColor" opacity="0.14" />
                <polygon points="400,400 260,60 400,110" fill="currentColor" opacity="0.28" />
                <polygon points="400,400 130,400 260,60 400,110" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <line key={i} x1={260 + i * 23} y1={60 + i * 8} x2={130 + i * 45} y2={400} stroke="currentColor" strokeWidth="1" opacity="0.35" />
                ))}
              </svg>
            </div>
          </section>

          {/* STATS */}
          <section className="border-b-2 border-[var(--jp-border)] grid grid-cols-2 md:grid-cols-4 gap-[2px] bg-[var(--jp-border)]">
            {stats.map((s, i) => (
              <div key={i} className="p-6 sm:p-8 bg-[var(--jp-bg)]">
                <div className="bl-display text-4xl sm:text-5xl text-[var(--jp-signal)]">{s.value}</div>
                <div className="bl-mono mt-3 text-[11px] text-[var(--jp-muted)]">{s.label}</div>
              </div>
            ))}
          </section>

          {/* JOBS */}
          <section className="border-b-2 border-[var(--jp-border)]">
            <div className="border-b-2 border-[var(--jp-border)] flex items-center justify-between px-6 sm:px-8 py-5">
              <div className="flex items-center gap-3 bl-mono text-[12px]"><Square /> Najnovšie ponuky</div>
              <Link href="/jobs" className="group bl-mono inline-flex items-center gap-2 text-[12px] font-bold hover:text-[var(--jp-signal)] transition-colors">
                Všetky <ArrowUpRight className="bl-arrow w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-[var(--jp-border)]">
              {jobs.length > 0
                ? jobs.map((job: any, i: number) => (
                    <Link key={job.id} href={`/jobs/${job.id}`} className="group flex flex-col justify-between gap-8 p-6 sm:p-8 min-h-[240px] bg-[var(--jp-bg)] hover:bg-[var(--jp-signal)] hover:text-[var(--jp-ink)] transition-colors">
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
                    <Link key={i} href="/jobs" className="group flex flex-col justify-between gap-8 p-6 sm:p-8 min-h-[240px] bg-[var(--jp-bg)] hover:bg-[var(--jp-signal)] transition-colors">
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

          {/* CTA */}
          <section className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-6 sm:p-8 border-b-2 lg:border-b-0 lg:border-r-2 border-[var(--jp-border)]">
              <div className="flex items-center gap-3 bl-mono text-[12px] pb-4 border-b-2 border-[var(--jp-border)]"><Square /> Typy pozícií</div>
              <div className="flex flex-wrap gap-2 pt-6">
                {TYPES.map((t) => (
                  <Link key={t.key} href={`/jobs?type=${t.key}`} className="border-2 border-[var(--jp-border)] bl-mono px-4 py-2.5 text-[12px] font-bold hover:bg-[var(--jp-text)] hover:text-[var(--jp-bg)] transition-colors">
                    {t.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="p-6 sm:p-8 flex flex-col justify-between gap-8 bg-[var(--jp-ink)] text-[var(--jp-ink-text)]">
              <h2 className="bl-display text-4xl sm:text-6xl">
                Pripravený<br />na <span className="text-[var(--jp-signal)]">prvý krok?</span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/auth/register" className="group bl-mono inline-flex items-center justify-between gap-6 flex-1 bg-[var(--jp-signal)] text-[var(--jp-ink)] text-[13px] font-bold px-6 h-14 hover:bg-[var(--jp-ink-text)] transition-colors">
                  Registrovať sa zadarmo <ArrowUpRight className="bl-arrow w-5 h-5" />
                </Link>
                <Link href="/pricing" className="group bl-mono inline-flex items-center justify-between gap-6 flex-1 border-2 border-current text-[13px] font-bold px-6 h-14 hover:opacity-70 transition-opacity">
                  Pre firmy <ArrowUpRight className="bl-arrow w-5 h-5" />
                </Link>
              </div>
            </div>
          </section>

          {/* FOOTER strip */}
          <footer className="grid grid-cols-1 md:grid-cols-[1fr_auto] bl-mono text-[11px]">
            <div className="p-6 sm:px-8 flex flex-wrap gap-x-8 gap-y-2 items-center">
              <span className="font-bold">DajFlek® {new Date().getFullYear()}</span>
              <Link href="/jobs" className="hover:text-[var(--jp-signal)]">Ponuky</Link>
              <Link href="/cv" className="hover:text-[var(--jp-signal)]">CV Builder</Link>
              <Link href="/pricing" className="hover:text-[var(--jp-signal)]">Cenník</Link>
              <Link href="/contact" className="hover:text-[var(--jp-signal)]">Kontakt</Link>
            </div>
            <div className="border-t-2 md:border-t-0 md:border-l-2 border-[var(--jp-border)] p-6 sm:px-8 flex items-center gap-3 text-[var(--jp-muted)]">
              <Square /> Bratislava, SK — info@dajflek.sk
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

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