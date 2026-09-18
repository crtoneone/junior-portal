'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { formatDate, formatSalary, getJobTypeLabel } from '@/lib/utils';
import { MapPin, Building2, Globe, ArrowLeft, Bookmark, BookmarkCheck, Send, Star, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function JobDetailPage() {
  const { id } = useParams();
  const { user, token } = useAuth();
  const router = useRouter();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [applying, setApplying] = useState(false);
  const [matchScore, setMatchScore] = useState<any>(null);
  const [applied, setApplied] = useState(false);

  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError('');
    api.get(`/jobs/${id}`).then((data) => {
      setJob(data);
    }).catch((err) => {
      setError(err.message || 'Nepodarilo sa načítať ponuku');
    }).finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (token && user?.role === 'CANDIDATE' && id) {
      api.get(`/candidates/match/${id}`, token).then(setMatchScore).catch(() => {});
    }
  }, [token, user, id]);

  const handleSaveJob = async () => {
    if (!token) {
      router.push('/auth/login');
      return;
    }
    try {
      const res = await api.post(`/candidates/saved-jobs/${id}`, {}, token);
      setSaved(res.saved);
      toast.success(res.saved ? 'Ponuka uložená' : 'Ponuka odstránená z uložených');
    } catch {
      toast.error('Nepodarilo sa uložiť ponuku');
    }
  };

  const handleApply = async () => {
    if (!token) {
      router.push('/auth/login');
      return;
    }
    setApplying(true);
    try {
      await api.post('/applications', { jobId: id, coverLetter }, token);
      toast.success('Úspešne si sa prihlásil na túto pozíciu!');
      setApplied(true);
      setIsApplying(false);
    } catch (err: any) {
      toast.error(err.message || 'Prihlásenie zlyhalo');
    } finally {
      setApplying(false);
    }
  };

  const handleGuestApply = async () => {
    if (!guestName.trim() || !guestEmail.trim()) {
      toast.error('Meno a email sú povinné');
      return;
    }
    setApplying(true);
    try {
      const [firstName, ...lastParts] = guestName.trim().split(' ');
      const lastName = lastParts.join(' ');
      await api.post('/applications/guest', {
        firstName,
        lastName: lastName || '-',
        email: guestEmail.trim(),
        phone: guestPhone.trim() || undefined,
        jobId: id,
        coverLetter: coverLetter || undefined,
      });
      toast.success('Tvoja prihláška bola odoslaná!');
      setApplied(true);
      setIsApplying(false);
    } catch (err: any) {
      toast.error(err.message || 'Prihlásenie zlyhalo');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[var(--jp-canvas)]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--jp-accent)] border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 bg-[var(--jp-canvas)]">
        <div className="text-center bg-[var(--jp-bg)] border-2 border-[var(--jp-border)] p-8 max-w-md w-full">
          <p className="text-red-500 mb-4">{error}</p>
          <Link href="/jobs" className="inline-flex items-center text-sm text-[var(--jp-text)] hover:text-[var(--jp-signal)]">
            <ArrowLeft className="h-4 w-4 mr-1" /> Späť na ponuky
          </Link>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[var(--jp-canvas)]">
        <p className="text-[var(--jp-muted)]">Ponuka nebola nájdená</p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--jp-canvas)]">
      <div className="mx-auto max-w-[1200px] px-3 sm:px-6 lg:px-10 py-8">
        <Link href="/jobs" className="bl-mono inline-flex items-center text-sm text-[var(--jp-text)] hover:text-[var(--jp-signal)] mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" /> Späť na ponuky
        </Link>

        {/* HEAD */}
        <div className="border-2 border-[var(--jp-border)] bg-[var(--jp-ink)] text-[var(--jp-ink-text)] mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
            <div className="p-6 sm:p-8 lg:border-r-2 border-[var(--jp-ink-text)]">
              <p className="bl-mono text-[11px] opacity-70 mb-3">{job.employer?.companyName} / {getJobTypeLabel(job.type)}</p>
              <h1 className="bl-display text-3xl sm:text-5xl">{job.title}</h1>
              <div className="bl-mono mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[12px] opacity-80">
                <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                {job.isRemote && <span>Remote</span>}
                <span>{formatDate(job.createdAt)}</span>
              </div>
            </div>
            <div className="p-6 sm:p-8 flex flex-col justify-between gap-4">
              <div className="text-right">
                <p className="bl-mono text-[11px] opacity-60 mb-1">Plat</p>
                <p className="bl-display text-2xl text-[var(--jp-signal)]">{formatSalary(job.minSalary, job.maxSalary, job.currency)}</p>
              </div>
              <div className="flex flex-col gap-3">
                {matchScore && (
                  <div className={`bl-mono text-center text-sm font-bold border-2 py-2 ${
                    matchScore.score >= 70 ? 'border-[var(--jp-signal)] text-[var(--jp-signal)]' :
                    matchScore.score >= 40 ? 'border-[var(--jp-ink-text)] text-[var(--jp-ink-text)]' :
                    'border-[var(--jp-ink-text)] text-[var(--jp-ink-text)] opacity-60'
                  }`}>
                    <Star className="h-4 w-4 inline mr-1" />
                    {matchScore.score}% match
                  </div>
                )}
                {user?.role === 'CANDIDATE' && (
                  <button onClick={handleSaveJob} className="bl-mono border-2 border-[var(--jp-ink-text)] px-4 py-2.5 text-sm font-bold text-[var(--jp-ink-text)] hover:bg-[var(--jp-signal)] hover:text-[var(--jp-ink)] transition-colors">
                    {saved ? <><BookmarkCheck className="h-4 w-4 inline mr-2" /> Uložené</> : <><Bookmark className="h-4 w-4 inline mr-2" /> Uložiť</>}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* MAIN */}
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-lg font-bold uppercase tracking-tight text-[var(--jp-text)] mb-3">Popis pozície</h2>
                <p className="text-[var(--jp-text)] whitespace-pre-line leading-6">{job.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-lg font-bold uppercase tracking-tight text-[var(--jp-text)] mb-4">Požiadavky</h2>
                <ul className="space-y-3">
                  {job.requirements?.map((req: string, i: number) => (
                    <li key={i} className="bl-mono text-[13px] flex items-start gap-3 text-[var(--jp-text)]">
                      <span className="inline-block w-2.5 h-2.5 bg-[var(--jp-signal)] shrink-0 mt-1" /> {req}
                    </li>
                  ))}
                </ul>

                <h2 className="text-lg font-bold uppercase tracking-tight text-[var(--jp-text)] mt-8 mb-4">Náplň práce</h2>
                <ul className="space-y-3">
                  {job.responsibilities?.map((resp: string, i: number) => (
                    <li key={i} className="bl-mono text-[13px] flex items-start gap-3 text-[var(--jp-text)]">
                      <span className="inline-block w-2.5 h-2.5 bg-[var(--jp-signal)] shrink-0 mt-1" /> {resp}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* SIDE */}
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-lg font-bold uppercase tracking-tight text-[var(--jp-text)] mb-4">O spoločnosti</h2>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-16 w-16 items-center justify-center border-2 border-[var(--jp-border)] bg-[var(--jp-surface)] text-2xl font-bold text-[var(--jp-text)]">
                    {job.employer?.companyName?.[0] || '?'}
                  </div>
                  <div>
                    <p className="font-bold uppercase text-[var(--jp-text)]">{job.employer?.companyName}</p>
                    <p className="bl-mono text-xs text-[var(--jp-muted)]">{job.employer?.industry}</p>
                  </div>
                </div>
                {job.employer?.description && (
                  <p className="text-sm text-[var(--jp-muted)] mb-4">{job.employer.description}</p>
                )}
                <div className="flex flex-wrap gap-4 bl-mono text-xs text-[var(--jp-muted)]">
                  {job.employer?.companySize && (
                    <span className="inline-flex items-center gap-1"><Building2 className="h-4 w-4" /> {job.employer.companySize} zamestnancov</span>
                  )}
                  {job.employer?.website && (
                    <a href={job.employer.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--jp-text)] hover:text-[var(--jp-signal)]">
                      <Globe className="h-4 w-4" /> Webová stránka
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>

            {job.skills?.length > 0 && (
              <Card>
                <CardContent className="p-6 sm:p-8">
                  <h2 className="text-lg font-bold uppercase tracking-tight text-[var(--jp-text)] mb-4">Technológie</h2>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill: string) => (
                      <span key={skill} className="bl-mono border-2 border-[var(--jp-border)] bg-[var(--jp-surface)] px-3 py-1.5 text-xs font-bold text-[var(--jp-text)]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* APPLY */}
        {applied ? (
          <Card className="mt-8 bg-[var(--jp-signal)] border-[var(--jp-border)]">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-12 w-12 text-[var(--jp-ink)] mx-auto mb-4" />
              <h2 className="text-xl font-bold uppercase text-[var(--jp-ink)] mb-2">Prihláška odoslaná!</h2>
              <p className="text-[var(--jp-ink)] opacity-80">Tvoja prihláška na pozíciu "{job.title}" bola úspešne odoslaná.</p>
            </CardContent>
          </Card>
        ) : user?.role === 'CANDIDATE' && !isApplying ? (
          <div className="mt-8 text-center">
            <button onClick={() => setIsApplying(true)} className="bl-mono inline-flex items-center justify-between gap-6 bg-[var(--jp-accent)] text-[var(--jp-accent-contrast)] text-[13px] font-bold px-8 h-14 hover:bg-[var(--jp-accent-hover)] transition-colors">
              <Send className="h-4 w-4 mr-2" /> Prihlásiť sa na túto pozíciu
            </button>
          </div>
        ) : user?.role === 'CANDIDATE' && isApplying ? (
          <Card className="mt-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold uppercase text-[var(--jp-text)] mb-4">Prihlásenie na pozíciu</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="coverLetter">Motivačný list (voliteľné)</Label>
                  <Textarea
                    id="coverLetter"
                    placeholder="Napíš pár slov o sebe a prečo by si chcel túto pozíciu..."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="mt-1"
                    rows={5}
                  />
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleApply} disabled={applying}>
                    {applying ? 'Odosielam...' : 'Odoslať prihlášku'}
                  </Button>
                  <Button variant="outline" onClick={() => setIsApplying(false)}>
                    Zrušiť
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : !user && !isApplying ? (
          <div className="mt-8 text-center bg-[var(--jp-bg)] border-2 border-[var(--jp-border)] p-8">
            <p className="bl-mono text-[13px] text-[var(--jp-muted)] mb-6">Môžeš sa prihlásiť alebo pokračovať bez registrácie.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href={`/auth/login?redirect=/jobs/${id}`}>
                <Button variant="outline">Prihlásiť sa</Button>
              </Link>
              <Button size="lg" onClick={() => setIsApplying(true)}>
                <Send className="h-4 w-4 mr-2" /> Pokračovať bez registrácie
              </Button>
            </div>
          </div>
        ) : null}

        {!user && isApplying && (
          <Card className="mt-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold uppercase text-[var(--jp-text)] mb-4">Prihlásiť sa na pozíciu</h3>
              <div className="space-y-4">
                <div>
                  <Label>Meno a priezvisko</Label>
                  <Input value={guestName} onChange={e => setGuestName(e.target.value)} placeholder="Ján Mrkvička" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} placeholder="jan@example.sk" />
                </div>
                <div>
                  <Label>Telefón (voliteľné)</Label>
                  <Input value={guestPhone} onChange={e => setGuestPhone(e.target.value)} placeholder="+421 901 123 456" />
                </div>
                <div>
                  <Label>Motivačný list (voliteľné)</Label>
                  <Textarea
                    placeholder="Napíš pár slov o sebe a prečo by si chcel túto pozíciu..."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="mt-1"
                    rows={5}
                  />
                </div>
                <p className="bl-mono text-[11px] text-[var(--jp-muted)]">Po odoslaní ti bude vytvorený účet, pomocou ktorého sa neskôr môžeš prihlásiť.</p>
                <div className="flex gap-3">
                  <Button onClick={handleGuestApply} disabled={applying}>
                    {applying ? 'Odosielam...' : 'Odoslať prihlášku'}
                  </Button>
                  <Button variant="outline" onClick={() => { setIsApplying(false); setCoverLetter(''); }}>
                    Zrušiť
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
