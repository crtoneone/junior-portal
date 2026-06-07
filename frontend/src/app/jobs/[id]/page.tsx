'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { formatDate, formatSalary, getJobTypeLabel } from '@/lib/utils';
import { MapPin, Building2, Clock, DollarSign, Globe, Users, ArrowLeft, Bookmark, BookmarkCheck, Send, Star } from 'lucide-react';
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
      setIsApplying(false);
    } catch (err: any) {
      toast.error(err.message || 'Prihlásenie zlyhalo');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Link href="/jobs" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-1" /> Späť na ponuky
          </Link>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <p className="text-gray-500">Ponuka nebola nájdená</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/jobs" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" /> Späť na ponuky
      </Link>

      <Card className="mb-8">
        <CardContent className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-xl font-bold text-blue-600">
                  {job.employer?.companyName?.[0] || '?'}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                  <p className="text-lg text-gray-500">{job.employer?.companyName}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {matchScore && (
                <div className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium ${
                  matchScore.score >= 70 ? 'bg-green-100 text-green-700' :
                  matchScore.score >= 40 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  <Star className="h-4 w-4" />
                  {matchScore.score}% match
                </div>
              )}
              {user?.role === 'CANDIDATE' && (
                <Button variant="outline" onClick={handleSaveJob}>
                  {saved ? <BookmarkCheck className="h-4 w-4 mr-2 text-blue-600" /> : <Bookmark className="h-4 w-4 mr-2" />}
                  {saved ? 'Uložené' : 'Uložiť'}
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <Badge variant="secondary">{getJobTypeLabel(job.type)}</Badge>
            <Badge variant="outline">
              <MapPin className="h-3 w-3 mr-1" /> {job.location}
            </Badge>
            {job.isRemote && <Badge variant="success">Remote</Badge>}
            <Badge variant="outline">
              <DollarSign className="h-3 w-3 mr-1" /> {formatSalary(job.minSalary, job.maxSalary, job.currency)}
            </Badge>
            <Badge variant="outline">
              <Clock className="h-3 w-3 mr-1" /> {formatDate(job.createdAt)}
            </Badge>
          </div>

          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Popis pozície</h3>
            <p className="text-gray-600 whitespace-pre-line">{job.description}</p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Požiadavky</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              {job.requirements?.map((req: string, i: number) => (
                <li key={i}>{req}</li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Náplň práce</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              {job.responsibilities?.map((resp: string, i: number) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>

            {job.skills?.length > 0 && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Technológie</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill: string) => (
                    <Badge key={skill} className="bg-blue-50 text-blue-700">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">O spoločnosti</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100 text-2xl font-bold text-gray-600">
              {job.employer?.companyName?.[0] || '?'}
            </div>
            <div>
              <p className="font-medium text-gray-900">{job.employer?.companyName}</p>
              <p className="text-sm text-gray-500">{job.employer?.industry}</p>
            </div>
          </div>
          {job.employer?.description && (
            <p className="text-sm text-gray-600 mb-4">{job.employer.description}</p>
          )}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            {job.employer?.companySize && (
              <span className="flex items-center gap-1"><Building2 className="h-4 w-4" /> {job.employer.companySize} zamestnancov</span>
            )}
            {job.employer?.website && (
              <a href={job.employer.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                <Globe className="h-4 w-4" /> Webová stránka
              </a>
            )}
          </div>
        </CardContent>
      </Card>

      {user?.role === 'CANDIDATE' && !isApplying && (
        <div className="text-center">
          <Button size="lg" onClick={() => setIsApplying(true)}>
            <Send className="h-4 w-4 mr-2" /> Prihlásiť sa na túto pozíciu
          </Button>
        </div>
      )}

      {isApplying && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Prihlásenie na pozíciu</h3>
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
      )}

      {!user && (
        <div className="text-center bg-gray-50 rounded-xl p-8">
          <p className="text-gray-500 mb-4">Pre prihlásenie na túto pozíciu sa musíš prihlásiť.</p>
          <Link href="/auth/login">
            <Button>Prihlásiť sa</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
