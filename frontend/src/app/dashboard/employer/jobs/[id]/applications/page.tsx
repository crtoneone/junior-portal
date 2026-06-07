'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function JobApplicationsPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !id) return;
    api.get(`/applications/job/${id}`, token)
      .then(setApplications)
      .finally(() => setLoading(false));
  }, [token, id]);

  const updateStatus = async (applicationId: string, status: string, feedback?: string) => {
    try {
      await api.patch(`/applications/${applicationId}/status`, { status, feedback }, token!);
      setApplications((apps) =>
        apps.map((a) => (a.id === applicationId ? { ...a, status, feedback } : a))
      );
      toast.success('Status prihlášky aktualizovaný');
    } catch (err: any) {
      toast.error(err.message || 'Chyba pri aktualizácii');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/dashboard/employer" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" /> Späť na dashboard
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Prihlášky na pozíciu</h1>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">Zatiaľ nikto nereagoval na túto ponuku.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {applications.map((app: any) => (
            <Card key={app.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                      {app.user.firstName[0]}{app.user.lastName[0]}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{app.user.firstName} {app.user.lastName}</p>
                      <p className="text-sm text-gray-500">{app.user.email}</p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      app.status === 'ACCEPTED' ? 'success' :
                      app.status === 'REJECTED' ? 'danger' :
                      app.status === 'REVIEWED' ? 'default' : 'warning'
                    }
                  >
                    {app.status === 'PENDING' ? 'Čaká' :
                     app.status === 'REVIEWED' ? 'Prezerá sa' :
                     app.status === 'ACCEPTED' ? 'Prijatý' : 'Zamietnutý'}
                  </Badge>
                </div>

                {app.user.candidateProfile && (
                  <div className="mb-4 text-sm text-gray-600">
                    {app.user.candidateProfile.title && <p className="font-medium">{app.user.candidateProfile.title}</p>}
                    {app.user.candidateProfile.skills?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {app.user.candidateProfile.skills.map((s: string) => (
                          <Badge key={s} variant="secondary">{s}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {app.coverLetter && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                    <p className="font-medium mb-1">Motivačný list:</p>
                    <p className="whitespace-pre-line">{app.coverLetter}</p>
                  </div>
                )}

                {app.feedback && (
                  <div className="mb-4 p-3 bg-yellow-50 rounded-lg text-sm text-gray-600">
                    <p className="font-medium mb-1">Feedback:</p>
                    <p>{app.feedback}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  {app.status === 'PENDING' && (
                    <>
                      <Button size="sm" onClick={() => updateStatus(app.id, 'REVIEWED')}>
                        Označiť ako prezerané
                      </Button>
                      <Button size="sm" variant="outline" className="text-green-600 border-green-300" onClick={() => updateStatus(app.id, 'ACCEPTED')}>
                        Prijať
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-300" onClick={() => updateStatus(app.id, 'REJECTED')}>
                        Zamietnuť
                      </Button>
                    </>
                  )}
                  {app.status === 'REVIEWED' && (
                    <>
                      <Button size="sm" variant="outline" className="text-green-600 border-green-300" onClick={() => updateStatus(app.id, 'ACCEPTED')}>
                        Prijať
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-300" onClick={() => updateStatus(app.id, 'REJECTED', 'Ďakujeme za záujem, ale rozhodli sme sa pre iného kandidáta.')}>
                        Zamietnuť
                      </Button>
                    </>
                  )}
                  {(app.status === 'ACCEPTED' || app.status === 'REJECTED') && (
                    <span className="text-sm text-gray-400 py-2">Finalizované</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
