'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { formatDate, formatSalary, getJobTypeLabel } from '@/lib/utils';
import { Search, MapPin, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';

function JobsContent() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>({});
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError('');
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (location) params.set('location', location);
    if (type) params.set('type', type);
    params.set('page', page.toString());
    params.set('limit', '12');

    api.get(`/jobs?${params.toString()}`)
      .then((data) => {
        setJobs(data.jobs);
        setPagination(data.pagination);
      })
      .catch((err) => setError(err.message || 'Nepodarilo sa načítať ponuky'))
      .finally(() => setLoading(false));
  }, [search, location, type, page]);

  const jobTypes = ['', 'FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'JUNIOR', 'CONTRACT'];

  return (
    <div className="bg-[var(--jp-canvas)]">
      <div className="mx-auto max-w-[1400px] p-3 sm:p-6 lg:p-10">
        <div className="border-2 border-[var(--jp-border)] bg-[var(--jp-bg)]">
          {/* HEADER strip */}
          <div className="border-b-2 border-[var(--jp-border)] p-6 sm:p-10">
            <p className="bl-mono text-[12px] uppercase tracking-wide text-[var(--jp-muted)] mb-4 flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 bg-[var(--jp-signal)]" /> Prehľad ponúk
            </p>
            <h1 className="bl-display text-4xl sm:text-6xl">
              Ponuky<br />práce<span className="text-[var(--jp-signal)]">.</span>
            </h1>
            <p className="bl-mono text-[12px] text-[var(--jp-muted)] mt-4">
              Nájdi svoju prvú prácu medzi overenými ponukami. Odpoveď do 48 hodín.
            </p>
          </div>

          {/* FILTERS */}
          <div className="border-b-2 border-[var(--jp-border)] grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-[var(--jp-border)]">
            <div className="bg-[var(--jp-bg)] p-4 flex items-stretch">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--jp-muted)]" />
                <Input
                  placeholder="Hľadať ponuky..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                />
              </div>
            </div>
            <div className="bg-[var(--jp-bg)] p-4 flex items-stretch md:border-x-2 border-[var(--jp-border)]">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--jp-muted)]" />
                <Input
                  placeholder="Lokalita"
                  className="pl-10"
                  value={location}
                  onChange={(e) => { setLocation(e.target.value); setPage(1); }}
                />
              </div>
            </div>
            <div className="bg-[var(--jp-bg)] p-4 flex items-stretch">
              <select
                className="bl-mono h-12 w-full border-2 border-[var(--jp-border)] bg-[var(--jp-surface)] px-3 text-sm font-semibold text-[var(--jp-text)] focus:outline-none focus:ring-2 focus:ring-[var(--jp-accent)]"
                value={type}
                onChange={(e) => { setType(e.target.value); setPage(1); }}
              >
                <option value="">Všetky typy</option>
                <option value="FULL_TIME">Plný úväzok</option>
                <option value="PART_TIME">Skrátený úväzok</option>
                <option value="INTERNSHIP">Stáž</option>
                <option value="JUNIOR">Junior</option>
                <option value="CONTRACT">Živnosť</option>
              </select>
            </div>
          </div>

          {/* CONTENT */}
          {error ? (
            <div className="text-center py-16">
              <p className="text-red-500 mb-4">{error}</p>
              <Button variant="outline" onClick={() => window.location.reload()}>Skúsiť znova</Button>
            </div>
          ) : loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-[var(--jp-border)] p-[2px]">
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="bg-[var(--jp-bg)] p-6 min-h-[240px]">
                  <div className="h-4 bg-[var(--jp-surface)] border border-[var(--jp-border)] w-3/4 mb-3" />
                  <div className="h-3 bg-[var(--jp-surface)] border border-[var(--jp-border)] w-1/2 mb-2" />
                  <div className="h-3 bg-[var(--jp-surface)] border border-[var(--jp-border)] w-1/4 mb-4" />
                  <div className="h-10 bg-[var(--jp-surface)] border border-[var(--jp-border)] w-full" />
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-16">
              <Briefcase className="h-16 w-16 mx-auto mb-4 text-[var(--jp-muted)]" />
              <h3 className="text-lg font-bold uppercase text-[var(--jp-text)] mb-2">Žiadne ponuky nenájdené</h3>
              <p className="text-[var(--jp-muted)]">Skús zmeniť vyhľadávacie kritériá</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-[var(--jp-border)] p-[2px]">
                {jobs.map((job: any, i: number) => (
                  <Link key={job.id} href={`/jobs/${job.id}`} className="group flex flex-col justify-between gap-8 p-6 sm:p-8 min-h-[240px] bg-[var(--jp-bg)] hover:bg-[var(--jp-signal)] hover:text-[var(--jp-ink)] transition-colors">
                    <div>
                      <p className="bl-mono text-[11px] opacity-70">{String(i + 1).padStart(2, '0')} / {job.employer?.companyName}</p>
                      <h2 className="mt-3 text-xl sm:text-2xl font-bold uppercase leading-tight tracking-tight">{job.title}</h2>
                      <div className="bl-mono mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] opacity-80">
                        {getJobTypeLabel(job.type) && <span>{getJobTypeLabel(job.type)}</span>}
                        <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                        {job.isRemote && <span>Remote</span>}
                      </div>
                    </div>
                    <div className="flex items-end justify-between bl-mono text-[12px]">
                      <span className="font-bold">{formatSalary(job.minSalary, job.maxSalary, job.currency)}</span>
                      <span className="inline-flex items-center gap-2 opacity-70">{formatDate(job.createdAt)} <ChevronRight className="w-4 h-4" /></span>
                    </div>
                  </Link>
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 p-6 border-t-2 border-[var(--jp-border)]">
                  <Button
                    variant="outline"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Predošlá
                  </Button>
                  <span className="bl-mono text-sm text-[var(--jp-muted)]">
                    Stránka {page} z {pagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                    disabled={page === pagination.totalPages}
                  >
                    Ďalšia <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={
      <div className="bg-[var(--jp-canvas)] p-3 sm:p-6 lg:p-10">
        <div className="mx-auto max-w-[1400px] border-2 border-[var(--jp-border)] bg-[var(--jp-bg)] p-8 space-y-4">
          <div className="h-10 bg-[var(--jp-surface)] border border-[var(--jp-border)] w-1/3" />
          <div className="h-6 bg-[var(--jp-surface)] border border-[var(--jp-border)] w-1/2" />
        </div>
      </div>
    }>
      <JobsContent />
    </Suspense>
  );
}