'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Plus, X } from 'lucide-react';

export default function CandidateProfilePage() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [form, setForm] = useState({
    title: '',
    bio: '',
    location: '',
    skills: [''],
    experience: '',
    education: '',
    githubUrl: '',
    linkedinUrl: '',
    portfolioUrl: '',
    isOpenToWork: true,
  });

  useEffect(() => {
    if (!token) return;
    api.get('/candidates/profile', token).then((profile) => {
      if (profile) {
        setForm({
          title: profile.title || '',
          bio: profile.bio || '',
          location: profile.location || '',
          skills: profile.skills?.length ? profile.skills : [''],
          experience: profile.experience?.toString() || '',
          education: profile.education || '',
          githubUrl: profile.githubUrl || '',
          linkedinUrl: profile.linkedinUrl || '',
          portfolioUrl: profile.portfolioUrl || '',
          isOpenToWork: profile.isOpenToWork ?? true,
        });
      }
    }).catch((err) => {
      setFetchError(err.message || 'Nepodarilo sa načítať profil');
    }).finally(() => setFetching(false));
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.patch('/candidates/profile', {
        ...form,
        skills: form.skills.filter(Boolean),
        experience: form.experience ? parseInt(form.experience) : undefined,
      }, token!);
      toast.success('Profil aktualizovaný');
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

  if (fetchError) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[var(--jp-canvas)]">
        <div className="text-center border-2 border-[var(--jp-border)] bg-[var(--jp-surface)] p-8 w-full max-w-md">
          <p className="text-[var(--jp-signal)] bl-mono text-[13px] mb-4">{fetchError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--jp-canvas)]">
      <div className="mx-auto max-w-2xl px-3 sm:px-6 lg:px-10 py-10">
        <p className="bl-mono text-[11px] uppercase tracking-wide text-[var(--jp-muted)] mb-4 flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 bg-[var(--jp-signal)]" /> Môj profil
        </p>
        <h1 className="bl-display text-4xl mb-8">Profil<span className="text-[var(--jp-signal)]">.</span></h1>
      <Card>
        <CardHeader>
          <CardTitle>Môj profil</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Titulok / Pozícia</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="napr. Junior React Developer"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">O mne</Label>
              <Textarea
                id="bio"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                placeholder="Stručne o tebe..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Lokalita</Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="napr. Bratislava"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Roky praxe</Label>
                <Input
                  id="experience"
                  type="number"
                  value={form.experience}
                  onChange={(e) => setForm({ ...form, experience: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Vzdelanie</Label>
              <Input
                id="education"
                value={form.education}
                onChange={(e) => setForm({ ...form, education: e.target.value })}
                placeholder="napr. FIT STU"
              />
            </div>

            <div className="space-y-2">
              <Label>Technológie</Label>
              {form.skills.map((skill, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    value={skill}
                    onChange={(e) => {
                      const skills = [...form.skills];
                      skills[i] = e.target.value;
                      setForm({ ...form, skills });
                    }}
                    placeholder="napr. React"
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => {
                    if (form.skills.length > 1) {
                      setForm({ ...form, skills: form.skills.filter((_, j) => j !== i) });
                    }
                  }}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => setForm({ ...form, skills: [...form.skills, ''] })}>
                <Plus className="h-4 w-4 mr-1" /> Pridať
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input
                id="githubUrl"
                value={form.githubUrl}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                placeholder="https://github.com/tvoje meno"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
              <Input
                id="linkedinUrl"
                value={form.linkedinUrl}
                onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
                placeholder="https://linkedin.com/in/tvoj profil"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolioUrl">Portfólio URL</Label>
              <Input
                id="portfolioUrl"
                value={form.portfolioUrl}
                onChange={(e) => setForm({ ...form, portfolioUrl: e.target.value })}
                placeholder="https://tvojportfolio.sk"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isOpenToWork"
                checked={form.isOpenToWork}
                onChange={(e) => setForm({ ...form, isOpenToWork: e.target.checked })}
                className="h-5 w-5 border-2 border-[var(--jp-border)] accent-[var(--jp-signal)]"
              />
              <Label htmlFor="isOpenToWork">Hľadám prácu</Label>
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
