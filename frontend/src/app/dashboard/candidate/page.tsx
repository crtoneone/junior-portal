'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatDate, formatSalary, getJobTypeLabel } from '@/lib/utils';
import { Briefcase, Bookmark, TrendingUp, FileText, Star, BarChart3 } from 'lucide-react';

export default function CandidateDashboard() {
  const { user, token } = useAuth();
  const [applications, setApplications] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [recommended, setRecommended] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    (async () => {
      const [appsRes, statsRes, savedRes, recRes] = await Promise.allSettled([
        api.get('/applications/my', token),
        api.get('/applications/my/stats', token),
        api.get('/candidates/saved-jobs', token),
        api.get('/candidates/recommended', token),
      ]);
      if (appsRes.status === 'fulfilled') setApplications(appsRes.value);
      if (statsRes.status === 'fulfilled') setStats(statsRes.value);
      if (savedRes.status === 'fulfilled') setSavedJobs(savedRes.value);
      if (recRes.status === 'fulfilled') setRecommended(recRes.value);
      setLoading(false);
    })();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[var(--jp-canvas)]">
        <div className="h-8 w-8 animate-spin border-4 border-[var(--jp-accent)] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--jp-canvas)]">
    <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-10 py-8">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="bl-mono text-[11px] uppercase tracking-wide text-[var(--jp-muted)] mb-2 flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 bg-[var(--jp-signal)]" /> Tvoj prehľad
          </p>
          <h1 className="bl-display text-4xl">Vitaj, <span className="text-[var(--jp-signal)]">{user?.firstName}</span>!</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/cv">
            <Button variant="outline">CV Builder</Button>
          </Link>
          <Link href="/profile">
            <Button variant="outline">Profil</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-[2px] sm:grid-cols-2 lg:grid-cols-4 mb-8 bg-[var(--jp-border)] border-2 border-[var(--jp-border)]">
        <div className="bg-[var(--jp-bg)] p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="bl-display text-4xl text-[var(--jp-signal)]">{stats?.total || 0}</p>
              <p className="bl-mono mt-2 text-[11px] text-[var(--jp-muted)]">Prihlášky</p>
            </div>
            <div className="p-3 border-2 border-[var(--jp-border)]">
              <Briefcase className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="bg-[var(--jp-bg)] p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="bl-display text-4xl text-[var(--jp-signal)]">{stats?.reviewed || 0}</p>
              <p className="bl-mono mt-2 text-[11px] text-[var(--jp-muted)]">V procese</p>
            </div>
            <div className="p-3 border-2 border-[var(--jp-border)]">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="bg-[var(--jp-bg)] p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="bl-display text-4xl text-[var(--jp-signal)]">{stats?.accepted || 0}</p>
              <p className="bl-mono mt-2 text-[11px] text-[var(--jp-muted)]">Prijaté</p>
            </div>
            <div className="p-3 border-2 border-[var(--jp-border)]">
              <BarChart3 className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="bg-[var(--jp-bg)] p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="bl-display text-4xl text-[var(--jp-signal)]">{savedJobs?.length || 0}</p>
              <p className="bl-mono mt-2 text-[11px] text-[var(--jp-muted)]">Uložené</p>
            </div>
            <div className="p-3 border-2 border-[var(--jp-border)]">
              <Bookmark className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {recommended.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 uppercase">
              <Star className="h-5 w-5 text-[var(--jp-signal)]" />
              Odporúčané ponuky
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommended.slice(0, 4).map((job: any) => (
                <Link key={job.id} href={`/jobs/${job.id}`}>
                  <div className="p-4 border-2 border-[var(--jp-border)] hover:bg-[var(--jp-signal)] hover:text-[var(--jp-ink)] transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold uppercase text-sm text-[var(--jp-text)]">{job.title}</p>
                        <p className="bl-mono text-xs text-[var(--jp-muted)] mt-1">{job.employer?.companyName}</p>
                      </div>
                      {job.matchScore >= 0 && (
                        <div className="flex-shrink-0 flex items-center gap-2 border-2 border-[var(--jp-border)] bg-[var(--jp-ink)] text-[var(--jp-signal)] px-3 py-1.5 bl-mono text-sm font-bold">
                          <Star className="h-4 w-4" />
                          {job.matchScore}% match
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">{getJobTypeLabel(job.type)}</Badge>
                      <Badge variant="outline" className="text-xs">{job.location}</Badge>
                    </div>
                    {job.matchDetails?.matchedSkills?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {job.matchDetails.matchedSkills.map((s: string) => (
                          <span key={s} className="bl-mono text-[10px] text-[var(--jp-signal)] border-2 border-[var(--jp-border)] px-1.5 py-0.5">{s}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            {recommended.length > 4 && (
              <div className="mt-4 text-center">
                <Link href="/jobs">
                  <Button variant="outline">Zobraziť všetky ponuky</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg uppercase">Nedávne prihlášky</CardTitle>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <div className="text-center py-8 text-[var(--jp-muted)]">
                <p>Zatiaľ si sa neprihlásil na žiadnu ponuku.</p>
                <Link href="/jobs">
                  <Button variant="outline" className="mt-4">Prezerať ponuky</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.slice(0, 5).map((app: any) => (
                  <div key={app.id} className="flex items-center justify-between p-3 border-2 border-[var(--jp-border)] bg-[var(--jp-bg)] hover:border-[var(--jp-signal)] transition-colors">
                    <div>
                      <p className="font-bold uppercase text-sm text-[var(--jp-text)]">{app.job.title}</p>
                      <p className="bl-mono text-xs text-[var(--jp-muted)] mt-1">{app.job.employer.companyName}</p>
                      <p className="bl-mono text-[10px] text-[var(--jp-muted)] mt-1">{formatDate(app.createdAt)}</p>
                    </div>
                    <Badge variant={app.status === 'PENDING' ? 'warning' : app.status === 'ACCEPTED' ? 'success' : app.status === 'REJECTED' ? 'danger' : 'default'}>
                      {app.status === 'PENDING' ? 'Čaká' : app.status === 'REVIEWED' ? 'Prezerá sa' : app.status === 'ACCEPTED' ? 'Prijaté' : 'Zamietnuté'}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg uppercase">Uložené ponuky</CardTitle>
          </CardHeader>
          <CardContent>
            {savedJobs.length === 0 ? (
              <div className="text-center py-8 text-[var(--jp-muted)]">
                <p>Zatiaľ nemáš žiadne uložené ponuky.</p>
                <Link href="/jobs">
                  <Button variant="outline" className="mt-4">Prezerať ponuky</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {savedJobs.slice(0, 5).map((saved: any) => (
                  <Link key={saved.id} href={`/jobs/${saved.job.id}`}>
                    <div className="flex items-center justify-between p-3 border-2 border-[var(--jp-border)] bg-[var(--jp-bg)] hover:border-[var(--jp-signal)] transition-colors">
                      <div>
                        <p className="font-bold uppercase text-sm text-[var(--jp-text)]">{saved.job.title}</p>
                        <p className="bl-mono text-xs text-[var(--jp-muted)] mt-1">{saved.job.employer.companyName} • {saved.job.location}</p>
                      </div>
                      <Badge>{getJobTypeLabel(saved.job.type)}</Badge>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
}
