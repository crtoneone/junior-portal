'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function EmployerProfilePage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    companyName: '',
    companySize: '',
    industry: '',
    description: '',
    website: '',
    location: '',
  });

  useEffect(() => {
    if (!token) return;
    if (user?.role !== 'EMPLOYER') {
      router.push('/dashboard');
      return;
    }
    api.get('/employers/profile', token).then((profile: any) => {
      if (profile) {
        setForm({
          companyName: profile.companyName || '',
          companySize: profile.companySize || '',
          industry: profile.industry || '',
          description: profile.description || '',
          website: profile.website || '',
          location: profile.location || '',
        });
      }
    }).finally(() => setFetching(false));
  }, [token, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.patch('/employers/profile', form, token!);
      toast.success('Profil spoločnosti aktualizovaný');
    } catch (err: any) {
      toast.error(err.message || 'Chyba pri ukladaní');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[var(--jp-canvas)]">
        <div className="h-8 w-8 animate-spin border-4 border-[var(--jp-accent)] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--jp-canvas)]">
    <div className="mx-auto max-w-2xl px-3 sm:px-6 lg:px-10 py-10">
        <p className="bl-mono text-[11px] uppercase tracking-wide text-[var(--jp-muted)] mb-4 flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 bg-[var(--jp-signal)]" /> Profil spoločnosti
        </p>
        <h1 className="bl-display text-4xl mb-8">Profil<span className="text-[var(--jp-signal)]">.</span></h1>
      <Card>
        <CardHeader>
          <CardTitle>Profil spoločnosti</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="companyName">Názov spoločnosti *</Label>
              <Input
                id="companyName"
                value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                placeholder="napr. Tech Solutions s.r.o."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companySize">Veľkosť spoločnosti</Label>
                <select
                  id="companySize"
                  className="bl-mono h-10 w-full border-2 border-[var(--jp-border)] bg-[var(--jp-surface)] px-3 text-sm"
                  value={form.companySize}
                  onChange={(e) => setForm({ ...form, companySize: e.target.value })}
                >
                  <option value="">-- Vyber --</option>
                  <option value="1-10">1-10 zamestnancov</option>
                  <option value="11-50">11-50 zamestnancov</option>
                  <option value="51-200">51-200 zamestnancov</option>
                  <option value="201-1000">201-1000 zamestnancov</option>
                  <option value="1000+">1000+ zamestnancov</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Odvetvie</Label>
                <Input
                  id="industry"
                  value={form.industry}
                  onChange={(e) => setForm({ ...form, industry: e.target.value })}
                  placeholder="napr. IT, Financie"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Sídlo</Label>
              <Input
                id="location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="napr. Bratislava"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">O spoločnosti</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Stručne predstav svoju spoločnosť..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Webová stránka</Label>
              <Input
                id="website"
                type="url"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                placeholder="https://tvojastranka.sk"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Ukladám...' : 'Uložiť profil'}
            </Button>
          </form>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
