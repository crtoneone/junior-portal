'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  Search,
  ArrowRight,
  Shield,
  ChevronRight,
  TrendingUp,
  Code2,
  FileText,
  MapPin,
  Building2,
  Zap,
  Briefcase,
  GraduationCap,
} from 'lucide-react';
import { useTheme, type ThemeName } from '@/lib/theme';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { api } from '@/lib/api';
import { formatSalary, getJobTypeLabel, formatDate } from '@/lib/utils';

export function LandingPage({ forcedTheme }: { forcedTheme?: ThemeName }) {
  const { theme, setTheme } = useTheme();
  const [jobs, setJobs] = useState<any[]>([]);
  const [stats, setStats] = useState(JOB_STATS);

  const activeTheme = forcedTheme ?? theme;
  const isCorporate = activeTheme === 'corporate';
  const isBauhaus = activeTheme === 'bauhaus';
  const isBauhaus2 = activeTheme === 'bauhaus2';
  const isEditorial = activeTheme === 'editorial';
  const isNeon = activeTheme === 'neon';
  const isRetro = activeTheme === 'retro';
  const isMinimal = activeTheme === 'minimal';

  useEffect(() => {
    if (forcedTheme) setTheme(forcedTheme);
  }, [forcedTheme, setTheme]);

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
            { value: `${String(total).padStart(2, '0')}`, label: 'Aktívnych ponúk' },
            { value: `${Math.max(500, total * 3)}`, label: 'Juniorov v databáze' },
            { value: '10+', label: 'Overených firiem' },
            { value: '94%', label: 'Spokojnosť' },
          ]);
        }
      })
      .catch(() => {});
  }, []);

  const logo = (
    <div className="font-black text-lg tracking-tighter text-[var(--jp-text)]" style={{ textTransform: 'var(--jp-tt)' }}>
      Daj<span className="text-[var(--jp-accent)]">Flek</span>
    </div>
  );

  const navLinks = (
    <div className="flex items-center gap-3">
      <ThemeSwitcher />
      <Link
        href="/auth/register"
        className="hidden sm:inline-flex items-center gap-2 bg-[var(--jp-accent)] text-[var(--jp-accent-contrast)] text-xs font-bold px-5 py-2.5 transition-colors hover:bg-[var(--jp-accent-hover)]"
        style={{ textTransform: 'var(--jp-tt)', borderRadius: 'var(--jp-radius)' }}
      >
        Registrovať
      </Link>
    </div>
  );

  const jobsSection = (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
          <div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight" style={{ textTransform: 'var(--jp-tt)' }}>
              Najnovšie <span className="text-[var(--jp-accent)]">ponuky</span>
            </h2>
            <div className="mt-4 h-[3px] w-20 bg-[var(--jp-accent)]" />
          </div>
          <Link href="/jobs" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--jp-accent)] hover:text-[var(--jp-accent-hover)] transition-colors">
            Všetky ponuky <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job: any) => (
              <Link key={job.id} href={`/jobs/${job.id}`}>
                <div className="group h-full p-6 bg-[var(--jp-bg)] border-[var(--jp-border-w)] border-[var(--jp-border)] transition-all hover:shadow-[var(--jp-shadow)]" style={{ borderRadius: 'var(--jp-radius-lg)' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-11 w-11 items-center justify-center bg-[var(--jp-accent-soft)] text-sm font-black text-[var(--jp-accent)]" style={{ borderRadius: 'var(--jp-radius)' }}>
                      {job.employer?.companyName?.[0] || '?'}
                    </div>
                    <div>
                      <p className="font-black leading-tight group-hover:text-[var(--jp-accent)] transition-colors">{job.title}</p>
                      <p className="text-xs text-[var(--jp-muted)]">{job.employer?.companyName}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4 text-[10px] font-bold text-[var(--jp-muted)]" style={{ textTransform: 'var(--jp-tt)' }}>
                    <span className="px-2 py-1 bg-[var(--jp-surface)] border border-[var(--jp-border)]">{getJobTypeLabel(job.type)}</span>
                    <span className="px-2 py-1 bg-[var(--jp-surface)] border border-[var(--jp-border)]">
                      <MapPin className="inline w-3 h-3 mr-1" />
                      {job.location}
                    </span>
                    {job.isRemote && <span className="px-2 py-1 text-[var(--jp-accent)]">Remote</span>}
                  </div>
                  <div className="flex items-center justify-between border-t-[var(--jp-border-w)] border-[var(--jp-border)] pt-4">
                    <span className="text-sm font-black text-[var(--jp-accent)]">
                      {formatSalary(job.minSalary, job.maxSalary, job.currency)}
                    </span>
                    <span className="text-xs text-[var(--jp-muted)]">{formatDate(job.createdAt)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-52 animate-pulse bg-[var(--jp-surface)] border-[var(--jp-border-w)] border-[var(--jp-border)]" style={{ borderRadius: 'var(--jp-radius-lg)' }} />
            ))}
          </div>
        )}
      </div>
    </section>
  );

  const navSection = (
    <header className="sticky top-0 z-50 border-b-[var(--jp-border-w)] border-[var(--jp-border)] bg-[var(--jp-bg)]" style={isNeon ? { backdropFilter: 'blur(12px)' } : undefined}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px]">
          {logo}
          <div className="hidden md:flex items-center gap-8 text-xs font-bold" style={{ textTransform: 'var(--jp-tt)' }}>
            <Link href="/jobs" className="text-[var(--jp-muted)] hover:text-[var(--jp-accent)] transition-colors">Ponuky</Link>
            <Link href="/cv" className="text-[var(--jp-muted)] hover:text-[var(--jp-accent)] transition-colors">CV</Link>
            <Link href="/pricing" className="text-[var(--jp-muted)] hover:text-[var(--jp-accent)] transition-colors">Cenník</Link>
            <Link href="/contact" className="text-[var(--jp-muted)] hover:text-[var(--jp-accent)] transition-colors">Kontakt</Link>
          </div>
          {navLinks}
        </div>
      </div>
    </header>
  );

  const heroSection = (
    <section className={`relative overflow-hidden ${isNeon ? 'border-b border-[var(--jp-border)]' : 'bg-[var(--jp-accent-grad)]'}`}>
      {isEditorial && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-6 border border-[var(--jp-border)] px-3 py-1 text-[10px] font-bold text-[var(--jp-muted)]" style={{ fontFamily: 'var(--jp-sec-font)' }}>
                PORTÁL PRE JUNIOROV
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.92] tracking-tight" style={{ fontFamily: 'var(--jp-font)' }}>
                Nájdi svoju
                <br />
                <span className="text-[var(--jp-accent)] italic">prvú prácu</span>
              </h1>
              <p className="mt-6 text-lg text-[var(--jp-muted)] max-w-md leading-relaxed">
                Iba overené firmy, iba reálne ponuky, žiadne BS.
              </p>
              <form action="/jobs" method="GET" className="mt-8 flex gap-3 max-w-lg">
                <input name="search" type="text" placeholder="Akú pozíciu hľadáš?"
                  className="flex-1 h-12 px-4 bg-transparent text-[var(--jp-text)] placeholder-[var(--jp-muted)] border border-[var(--jp-border)] focus:outline-none focus:border-[var(--jp-accent)]" />
                <button type="submit" className="bg-[var(--jp-accent)] text-[var(--jp-accent-contrast)] font-bold h-12 px-6 hover:bg-[var(--jp-accent-hover)] transition-colors">
                  Hľadať
                </button>
              </form>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="p-5 border border-[var(--jp-border)]">
                  <div className="text-3xl font-black text-[var(--jp-accent)]" style={{ fontFamily: 'var(--jp-font)' }}>{stat.value}</div>
                  <div className="mt-1 text-[10px] font-bold text-[var(--jp-muted)] uppercase" style={{ fontFamily: 'var(--jp-sec-font)' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isNeon && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,255,136,0.06) 0%, transparent 60%)' }}>
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-[var(--jp-border)] text-xs font-bold text-[var(--jp-accent)]" style={{ borderRadius: 'var(--jp-radius)', fontFamily: 'var(--jp-sec-font)', boxShadow: '0 0 20px rgba(0,255,136,0.1)' }}>
            PORTÁL PRE JUNIOROV
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[0.92] tracking-tight" style={{ textShadow: '0 0 40px rgba(0,255,136,0.3)' }}>
            Nájdi svoju
            <br />
            <span className="text-[var(--jp-accent)]" style={{ textShadow: '0 0 30px rgba(0,255,136,0.5)' }}>prvú prácu</span>
          </h1>
          <p className="mt-6 text-lg text-[var(--jp-muted)] max-w-xl mx-auto">
            Iba overené firmy, iba reálne ponuky, žiadne BS.
          </p>
          <form action="/jobs" method="GET" className="mt-10 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <input name="search" type="text" placeholder="Akú pozíciu hľadáš?"
              className="flex-1 h-14 px-5 bg-[var(--jp-surface)] text-[var(--jp-text)] placeholder-[var(--jp-muted)] border border-[var(--jp-border)] focus:outline-none focus:border-[var(--jp-accent)]"
              style={{ borderRadius: 'var(--jp-radius)' }} />
            <button type="submit" className="bg-[var(--jp-accent)] text-[var(--jp-accent-contrast)] font-bold h-14 px-8 hover:bg-[var(--jp-accent-hover)] transition-colors"
              style={{ borderRadius: 'var(--jp-radius)' }}>
              Hľadať <ArrowRight className="w-5 h-5 inline ml-2" />
            </button>
          </form>
        </div>
      )}

      {isRetro && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 bg-[var(--jp-accent)] text-[var(--jp-accent-contrast)] text-xs font-bold" style={{ borderRadius: '999px' }}>
              PORTÁL PRE JUNIOROV
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight">
              Nájdi svoju
              <br />
              <span className="text-[var(--jp-accent)]">prvú prácu</span>
            </h1>
            <p className="mt-6 text-xl text-[var(--jp-muted)] max-w-lg mx-auto">
              Iba overené firmy, iba reálne ponuky, žiadne BS.
            </p>
            <form action="/jobs" method="GET" className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input name="search" type="text" placeholder="Akú pozíciu hľadáš?"
                className="flex-1 h-14 px-5 bg-[var(--jp-bg)] text-[var(--jp-text)] placeholder-[var(--jp-muted)] border-2 border-[var(--jp-border)] focus:outline-none focus:border-[var(--jp-accent)]"
                style={{ borderRadius: '999px' }} />
              <button type="submit" className="bg-[var(--jp-accent)] text-[var(--jp-accent-contrast)] font-bold h-14 px-8 hover:bg-[var(--jp-accent-hover)] transition-colors"
                style={{ borderRadius: '999px' }}>
                Hľadať <ArrowRight className="w-5 h-5 inline ml-2" />
              </button>
            </form>
          </div>
        </div>
      )}

      {isMinimal && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight">
              Nájdi svoju
              <br />
              <span className="font-bold">prvú prácu</span>
            </h1>
            <p className="mt-6 text-base text-[var(--jp-muted)] max-w-md mx-auto">
              Iba overené firmy, iba reálne ponuky, žiadne BS.
            </p>
            <form action="/jobs" method="GET" className="mt-8 flex gap-0 max-w-md mx-auto">
              <input name="search" type="text" placeholder="Akú pozíciu hľadáš?"
                className="flex-1 h-12 px-4 bg-transparent text-[var(--jp-text)] placeholder-[var(--jp-muted)] border border-[var(--jp-border)] border-r-0 focus:outline-none" />
              <button type="submit" className="bg-[var(--jp-text)] text-[var(--jp-bg)] font-medium h-12 px-6 hover:opacity-80 transition-opacity">
                →
              </button>
            </form>
          </div>
        </div>
      )}

      {(isBauhaus || isBauhaus2 || isCorporate) && (
        <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${isBauhaus ? 'py-14' : 'py-20 lg:py-28'}`}>
          <div className={isBauhaus ? 'max-w-2xl' : 'max-w-3xl'}>
            <div className="inline-flex items-center gap-2 mb-6 bg-[var(--jp-bg)] border-[var(--jp-border-w)] border-[var(--jp-border)] px-4 py-2 text-xs font-bold text-[var(--jp-accent)]" style={{ borderRadius: 'var(--jp-radius)', fontFamily: 'var(--jp-sec-font)' }}>
              DajFlek.sk — Portál pre juniorov
            </div>
            <h1 className={`font-black leading-[0.95] tracking-tight ${isBauhaus ? 'text-3xl sm:text-5xl' : 'text-5xl sm:text-6xl lg:text-7xl'}`} style={{ textTransform: 'var(--jp-tt)', letterSpacing: 'var(--jp-ls)' }}>
              Nájdi svoju
              <br />
              <span className="text-[var(--jp-accent)]">prvú prácu</span>
            </h1>
            <p className={`text-lg text-[var(--jp-muted)] max-w-xl leading-relaxed ${isBauhaus ? 'mt-4' : 'mt-6'}`}>
              Náborový portál pre juniorov, stážistov a absolventov v IT. Iba overené firmy, iba reálne ponuky, žiadne BS.
            </p>
            <form action="/jobs" method="GET" className={`flex flex-col sm:flex-row gap-3 max-w-2xl ${isBauhaus ? 'mt-7' : 'mt-10'}`}>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--jp-muted)]" />
                <input name="search" type="text" placeholder="Akú pozíciu hľadáš?"
                  className="w-full h-14 pl-11 pr-4 bg-[var(--jp-bg)] text-[var(--jp-text)] placeholder-[var(--jp-muted)] border-[var(--jp-border-w)] border-[var(--jp-border)] focus:outline-none focus:ring-2 focus:ring-[var(--jp-accent)]"
                  style={{ borderRadius: 'var(--jp-radius)' }} />
              </div>
              <button type="submit" className="inline-flex items-center justify-center gap-2 bg-[var(--jp-accent)] text-[var(--jp-accent-contrast)] font-bold h-14 px-8 transition-colors hover:bg-[var(--jp-accent-hover)]"
                style={{ borderRadius: 'var(--jp-radius)' }}>
                Hľadať <ArrowRight className="w-5 h-5" />
              </button>
            </form>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-xs font-bold text-[var(--jp-muted)]" style={{ textTransform: 'var(--jp-tt)' }}>
              <Link href="/auth/register" className="flex items-center gap-2 hover:text-[var(--jp-accent)] transition-colors">
                <Zap className="w-4 h-4 text-[var(--jp-accent)]" /> Registrácia zdarma
              </Link>
              <Link href="/jobs" className="flex items-center gap-2 hover:text-[var(--jp-accent)] transition-colors">
                <Briefcase className="w-4 h-4 text-[var(--jp-accent)]" /> Prezrieť ponuky
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );

  const statsSection = !isEditorial ? (
    <section className="py-14 border-b-[var(--jp-border-w)] border-[var(--jp-border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`grid gap-4 ${isMinimal ? 'grid-cols-4' : 'grid-cols-2 lg:grid-cols-4'}`}>
          {stats.map((stat, i) => (
            <div key={i} className={`p-6 ${isNeon ? 'bg-[var(--jp-surface)] border border-[var(--jp-border)]' : 'bg-[var(--jp-surface)] border-[var(--jp-border-w)] border-[var(--jp-border)]'}`}
              style={{ borderRadius: 'var(--jp-radius-lg)' }}>
              <div className="text-3xl sm:text-4xl font-black tracking-tighter text-[var(--jp-accent)]">{stat.value}</div>
              <div className="mt-1 text-[10px] font-bold text-[var(--jp-muted)]" style={{ textTransform: 'var(--jp-tt)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ) : null;

  const stepsSection = !isMinimal ? (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight" style={{ textTransform: 'var(--jp-tt)' }}>
            Ako to <span className="text-[var(--jp-accent)]">funguje</span>
          </h2>
          <div className="mt-4 h-[3px] w-20 bg-[var(--jp-accent)]" />
        </div>
        <div className={`grid grid-cols-1 gap-6 ${isRetro ? 'md:grid-cols-3' : isNeon ? 'md:grid-cols-3' : 'md:grid-cols-3'}`}>
          {STEPS.map((step, i) => (
            <div key={i} className={`relative p-8 ${isNeon ? 'bg-[var(--jp-surface)] border border-[var(--jp-border)]' : 'bg-[var(--jp-surface)] border-[var(--jp-border-w)] border-[var(--jp-border)]'}`}
              style={{ borderRadius: 'var(--jp-radius-lg)', boxShadow: isNeon ? '0 0 20px rgba(0,255,136,0.05)' : undefined }}>
              <div className="absolute -top-4 left-4 bg-[var(--jp-accent)] text-[var(--jp-accent-contrast)] w-12 h-12 flex items-center justify-center font-black text-xl"
                style={{ borderRadius: isRetro ? '999px' : 'var(--jp-radius)' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="mb-4 mt-4 text-[var(--jp-accent)]">
                <step.icon className="w-10 h-10" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-black mb-3" style={{ textTransform: 'var(--jp-tt)' }}>{step.title}</h3>
              <p className="text-[var(--jp-muted)] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  ) : null;

  const featuresSection = (
    <section className="py-20 bg-[var(--jp-surface)] border-y-[var(--jp-border-w)] border-[var(--jp-border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight" style={{ textTransform: 'var(--jp-tt)' }}>
            Prečo <span className="text-[var(--jp-accent)]">my</span>?
          </h2>
          <div className="mt-4 h-[3px] w-20 bg-[var(--jp-accent)]" />
        </div>
        {isEditorial ? (
          <div className="space-y-0">
            {FEATURES.map((feature, i) => (
              <div key={i} className="flex items-start gap-6 py-6 border-b border-[var(--jp-border)] last:border-0">
                <div className="text-[10px] font-bold text-[var(--jp-muted)] w-8 shrink-0 pt-1" style={{ fontFamily: 'var(--jp-sec-font)' }}>0{i + 1}</div>
                <div className="text-[var(--jp-accent)] shrink-0"><feature.icon className="w-6 h-6" strokeWidth={1.5} /></div>
                <div>
                  <h3 className="text-lg font-black mb-1" style={{ fontFamily: 'var(--jp-font)' }}>{feature.title}</h3>
                  <p className="text-sm text-[var(--jp-muted)] leading-relaxed max-w-xl">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : isMinimal ? (
          <div className="space-y-12">
            {FEATURES.map((feature, i) => (
              <div key={i} className="flex items-start gap-8">
                <div className="text-[var(--jp-accent)] shrink-0 mt-1"><feature.icon className="w-5 h-5" strokeWidth={1} /></div>
                <div>
                  <h3 className="text-sm font-bold mb-1 uppercase tracking-wider" style={{ fontFamily: 'var(--jp-sec-font)' }}>{feature.title}</h3>
                  <p className="text-sm text-[var(--jp-muted)] leading-relaxed max-w-lg">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : isNeon ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((feature, i) => (
              <div key={i} className="p-6 bg-[var(--jp-bg)] border border-[var(--jp-border)] transition-all hover:shadow-[var(--jp-shadow)]"
                style={{ borderRadius: 'var(--jp-radius-lg)' }}>
                <div className="mb-4 inline-flex bg-[var(--jp-accent-soft)] text-[var(--jp-accent)] w-12 h-12 items-center justify-center"
                  style={{ borderRadius: 'var(--jp-radius)' }}>
                  <feature.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--jp-muted)] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        ) : isRetro ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FEATURES.map((feature, i) => (
              <div key={i} className="p-7 bg-[var(--jp-bg)] border-2 border-[var(--jp-border)] transition-all hover:shadow-[var(--jp-shadow)]"
                style={{ borderRadius: '28px' }}>
                <div className="mb-4 inline-flex bg-[var(--jp-accent)] text-[var(--jp-accent-contrast)] w-14 h-14 items-center justify-center"
                  style={{ borderRadius: '999px' }}>
                  <feature.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--jp-muted)] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, i) => (
              <div key={i} className="p-6 bg-[var(--jp-bg)] border-[var(--jp-border-w)] border-[var(--jp-border)]"
                style={{ borderRadius: 'var(--jp-radius-lg)' }}>
                <div className="mb-4 inline-flex bg-[var(--jp-accent)] text-[var(--jp-accent-contrast)] w-12 h-12 items-center justify-center"
                  style={{ borderRadius: 'var(--jp-radius)' }}>
                  <feature.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-black mb-2" style={{ textTransform: 'var(--jp-tt)' }}>{feature.title}</h3>
                <p className="text-sm text-[var(--jp-muted)] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );

  const typesSection = (
    <section className="py-20 bg-[var(--jp-surface)] border-y-[var(--jp-border-w)] border-[var(--jp-border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight" style={{ textTransform: 'var(--jp-tt)' }}>
            Typy <span className="text-[var(--jp-accent)]">pozícií</span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {TYPES.map((t, i) => (
            <Link key={i} href={`/jobs?type=${t.key}`}
              className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-bold bg-[var(--jp-bg)] border-[var(--jp-border-w)] border-[var(--jp-border)] text-[var(--jp-text)] hover:text-[var(--jp-accent)] transition-colors ${isNeon ? 'hover:shadow-[var(--jp-shadow)]' : ''}`}
              style={{ borderRadius: isRetro ? '999px' : 'var(--jp-radius)' }}>
              <ChevronRight className="w-4 h-4 text-[var(--jp-accent)]" /> {t.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );

  const ctaSection = (
    <section className={`py-24 ${isNeon ? 'bg-[var(--jp-surface)] border-t border-[var(--jp-border)]' : isMinimal ? 'border-t border-[var(--jp-border)]' : 'bg-[var(--jp-accent)]'}`}>
      <div className="mx-auto max-w-4xl px-4 text-center">
        {isMinimal ? (
          <>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight">
              Pripravený na <span className="font-bold">prvý krok</span>?
            </h2>
            <p className="mt-4 text-base text-[var(--jp-muted)] max-w-lg mx-auto">
              Registrácia je zadarmo. Žiadne skryté poplatky.
            </p>
            <div className="mt-8">
              <Link href="/auth/register" className="inline-flex items-center gap-3 border border-[var(--jp-text)] text-[var(--jp-text)] font-medium text-sm px-8 py-4 hover:bg-[var(--jp-text)] hover:text-[var(--jp-bg)] transition-colors">
                Registrovať sa →
              </Link>
            </div>
          </>
        ) : isNeon ? (
          <>
            <h2 className="text-3xl sm:text-6xl font-black tracking-tight" style={{ textShadow: '0 0 40px rgba(0,255,136,0.2)' }}>
              Pripravený na <span className="text-[var(--jp-accent)]" style={{ textShadow: '0 0 30px rgba(0,255,136,0.4)' }}>prvý krok</span>?
            </h2>
            <p className="mt-4 text-lg text-[var(--jp-muted)] max-w-lg mx-auto">
              Registrácia je zadarmo. Žiadne skryté poplatky. Iba príležitosti.
            </p>
            <div className="mt-10">
              <Link href="/auth/register" className="inline-flex items-center gap-3 bg-[var(--jp-accent)] text-[var(--jp-accent-contrast)] font-bold text-sm px-10 py-5 transition-all hover:opacity-90"
                style={{ borderRadius: 'var(--jp-radius)' }}>
                Registrovať sa <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </>
        ) : isEditorial ? (
          <>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight" style={{ fontFamily: 'var(--jp-font)' }}>
              Pripravený na <span className="text-[var(--jp-accent)] italic">prvý krok</span>?
            </h2>
            <p className="mt-4 text-base text-[var(--jp-muted)] max-w-lg mx-auto">
              Registrácia je zadarmo. Žiadne skryté poplatky.
            </p>
            <div className="mt-8">
              <Link href="/auth/register" className="inline-flex items-center gap-3 bg-[var(--jp-accent)] text-[var(--jp-accent-contrast)] font-bold text-sm px-10 py-5 transition-all hover:opacity-90">
                Registrovať sa <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </>
        ) : isRetro ? (
          <>
            <h2 className="text-3xl sm:text-6xl font-black tracking-tight">
              Pripravený na <span className="text-[var(--jp-accent)]">prvý krok</span>?
            </h2>
            <p className="mt-4 text-lg text-[var(--jp-accent-contrast)]/80 max-w-lg mx-auto">
              Registrácia je zadarmo. Žiadne skryté poplatky.
            </p>
            <div className="mt-10">
              <Link href="/auth/register" className="inline-flex items-center gap-3 bg-[var(--jp-bg)] text-[var(--jp-accent)] font-black text-sm px-10 py-5 transition-all hover:opacity-90"
                style={{ borderRadius: '999px' }}>
                Registrovať sa <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl sm:text-6xl font-black text-[var(--jp-accent-contrast)] leading-tight" style={{ textTransform: 'var(--jp-tt)' }}>
              Pripravený na <span className="text-[var(--jp-bg)]">prvý krok</span>?
            </h2>
            <p className="mt-4 text-lg text-[var(--jp-accent-contrast)]/80 max-w-lg mx-auto">
              Registrácia je zadarmo. Žiadne skryté poplatky. Iba príležitosti.
            </p>
            <div className="mt-10">
              <Link href="/auth/register" className="inline-flex items-center gap-3 bg-[var(--jp-bg)] text-[var(--jp-accent)] font-black text-sm px-10 py-5 transition-all hover:opacity-90"
                style={{ textTransform: 'var(--jp-tt)', borderRadius: 'var(--jp-radius-lg)' }}>
                Registrovať sa <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );

  const footerSection = (
    <footer className="py-12 border-t-[var(--jp-border-w)] border-[var(--jp-border)] bg-[var(--jp-bg)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            {logo}
            <p className="mt-2 text-xs text-[var(--jp-muted)]">Portál pre juniorov, stážistov a absolventov v IT.</p>
          </div>
          <div>
            <div className="text-[10px] font-black text-[var(--jp-text)] mb-3" style={{ textTransform: 'var(--jp-tt)' }}>Portál</div>
            <ul className="space-y-1.5 text-xs text-[var(--jp-muted)]">
              <li><Link href="/jobs" className="hover:text-[var(--jp-accent)] transition-colors">Ponuky</Link></li>
              <li><Link href="/cv" className="hover:text-[var(--jp-accent)] transition-colors">CV Builder</Link></li>
              <li><Link href="/pricing" className="hover:text-[var(--jp-accent)] transition-colors">Cenník</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-black text-[var(--jp-text)] mb-3" style={{ textTransform: 'var(--jp-tt)' }}>Kontakt</div>
            <ul className="space-y-1.5 text-xs text-[var(--jp-muted)]">
              <li><Link href="/contact" className="hover:text-[var(--jp-accent)] transition-colors">Kontakt</Link></li>
              <li className="flex items-center gap-2"><Building2 className="w-3.5 h-3.5" /> Bratislava, Slovensko</li>
              <li className="text-[10px] text-[var(--jp-muted)]">&copy; {new Date().getFullYear()} DajFlek.sk</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );

  const sectionOrder: Record<ThemeName, string[]> = {
    corporate: ['nav', 'hero', 'stats', 'steps', 'features', 'jobs', 'types', 'cta', 'footer'],
    bauhaus: ['nav', 'hero', 'jobs', 'stats', 'steps', 'features', 'types', 'cta', 'footer'],
    bauhaus2: ['marquee', 'nav', 'hero', 'stats', 'steps', 'features', 'jobs', 'types', 'cta', 'footer'],
    editorial: ['nav', 'hero', 'features', 'jobs', 'steps', 'types', 'cta', 'footer'],
    neon: ['nav', 'hero', 'stats', 'steps', 'features', 'jobs', 'types', 'cta', 'footer'],
    retro: ['nav', 'hero', 'stats', 'steps', 'features', 'jobs', 'types', 'cta', 'footer'],
    minimal: ['nav', 'hero', 'features', 'jobs', 'types', 'cta', 'footer'],
  };

  const sectionMap: Record<string, React.ReactNode> = {
    marquee: isBauhaus2 ? <Marquee /> : null,
    nav: navSection,
    hero: heroSection,
    stats: statsSection,
    steps: stepsSection,
    features: featuresSection,
    jobs: jobsSection,
    types: typesSection,
    cta: ctaSection,
    footer: footerSection,
  };

  return (
    <div className="min-h-screen bg-[var(--jp-bg)] text-[var(--jp-text)]" style={{ fontFamily: 'var(--jp-font)' }}>
      {sectionOrder[activeTheme].map((key) => (
        <div key={key}>{sectionMap[key]}</div>
      ))}
    </div>
  );
}

const JOB_STATS = [
  { value: '2 400+', label: 'Aktívnych ponúk' },
  { value: '850+', label: 'Juniorov v databáze' },
  { value: '120+', label: 'Overených firiem' },
  { value: '94%', label: 'Spokojnosť' },
];

const STEPS = [
  {
    title: 'Vytvor profil',
    description: 'Zaregistruj sa, pridaj skills, vzdelanie a svoje preferencie. Trvá to 5 minút.',
    icon: FileText,
  },
  {
    title: 'Prezeraj ponuky',
    description: 'Filtruj podľa lokality, tech stacku, typu úväzku a nájdi si tú svoju pozíciu.',
    icon: Search,
  },
  {
    title: 'Nastúp do práce',
    description: 'Pošli prihlášku jedným klikom a odpoveď očakávaj do 48 hodín.',
    icon: TrendingUp,
  },
];

const FEATURES = [
  {
    title: 'Len pre juniorov',
    description: 'Žiadne seniorské trapasy. Všetky ponuky sú overené a vhodné pre začiatočníkov.',
    icon: GraduationCap,
  },
  {
    title: 'Overené firmy',
    description: 'Každá firma je skontrolovaná pred zverejnením ponuky. Žiadne podvody.',
    icon: Shield,
  },
  {
    title: 'CV Builder',
    description: 'Vytvor si profesionálne CV priamo v portáli a ulož si ho.',
    icon: FileText,
  },
  {
    title: 'Skill Matching',
    description: 'AI odporúčania na mieru podľa tvojich zručností a preferencií.',
    icon: Code2,
  },
];

const TYPES = [
  { key: 'FULL_TIME', label: 'Plný úväzok' },
  { key: 'PART_TIME', label: 'Skrátený úväzok' },
  { key: 'INTERNSHIP', label: 'Stáž' },
  { key: 'JUNIOR', label: 'Junior' },
  { key: 'CONTRACT', label: 'Živnosť' },
];

const MARQUEE_ITEMS = [
  'Práca pre juniorov',
  'Stáže',
  'Iba overené firmy',
  'CV Builder',
  'Skill Matching',
  'Registrácia zdarma',
  'Späť na DajFlek',
];

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      className="overflow-hidden whitespace-nowrap border-b-[3px] border-[var(--jp-border)] bg-[var(--jp-text)] text-[var(--jp-marquee)]"
      style={{ fontFamily: 'var(--jp-sec-font)' }}
    >
      <div className="inline-flex py-2 animate-[marquee_20s_linear_infinite] text-[11px] font-bold uppercase" style={{ letterSpacing: '0.08em' }}>
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center px-6">
            {item} <span className="text-[var(--jp-accent)] ml-6">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}