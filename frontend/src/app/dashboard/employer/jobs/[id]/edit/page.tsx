'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Plus, X } from 'lucide-react';

export default function EditJobPage() {
  const { token } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    type: 'JUNIOR',
    isRemote: false,
    minSalary: '',
    maxSalary: '',
    currency: 'EUR',
    skills: [''],
    requirements: [''],
    responsibilities: [''],
  });

  useEffect(() => {
    if (!token) return;
    api.get(`/jobs/${params.id}`, token).then((job: any) => {
      if (job) {
        setForm({
          title: job.title || '',
          description: job.description || '',
          location: job.location || '',
          type: job.type || 'JUNIOR',
          isRemote: job.isRemote || false,
          minSalary: job.minSalary?.toString() || '',
          maxSalary: job.maxSalary?.toString() || '',
          currency: job.currency || 'EUR',
          skills: job.skills?.length ? job.skills : [''],
          requirements: job.requirements?.length ? job.requirements : [''],
          responsibilities: job.responsibilities?.length ? job.responsibilities : [''],
        });
      }
    }).finally(() => setFetching(false));
  }, [token, params.id]);

  const addItem = (field: 'skills' | 'requirements' | 'responsibilities') => {
    setForm({ ...form, [field]: [...form[field], ''] });
  };

  const removeItem = (field: 'skills' | 'requirements' | 'responsibilities', index: number) => {
    const items = form[field].filter((_, i) => i !== index);
    setForm({ ...form, [field]: items.length ? items : [''] });
  };

  const updateItem = (field: 'skills' | 'requirements' | 'responsibilities', index: number, value: string) => {
    const items = [...form[field]];
    items[index] = value;
    setForm({ ...form, [field]: items });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/jobs/${params.id}`, {
        ...form,
        minSalary: form.minSalary ? parseInt(form.minSalary) : undefined,
        maxSalary: form.maxSalary ? parseInt(form.maxSalary) : undefined,
        skills: form.skills.filter(Boolean),
        requirements: form.requirements.filter(Boolean),
        responsibilities: form.responsibilities.filter(Boolean),
      }, token!);

      toast.success('Ponuka bola aktualizovaná');
      router.push('/dashboard/employer');
    } catch (err: any) {
      toast.error(err.message || 'Chyba pri ukladaní');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Upraviť ponuku</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Názov pozície *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="napr. Junior React Developer"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Popis pozície *</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Popíš čo bude náplňou práce..."
                rows={5}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Miesto *</Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="napr. Bratislava"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Typ úväzku *</Label>
                <select
                  id="type"
                  className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  <option value="FULL_TIME">Plný úväzok</option>
                  <option value="PART_TIME">Skrátený úväzok</option>
                  <option value="INTERNSHIP">Stáž</option>
                  <option value="JUNIOR">Junior</option>
                  <option value="CONTRACT">Živnosť</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isRemote"
                checked={form.isRemote}
                onChange={(e) => setForm({ ...form, isRemote: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <Label htmlFor="isRemote">Remote práca</Label>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minSalary">Min. plat</Label>
                <Input
                  id="minSalary"
                  type="number"
                  value={form.minSalary}
                  onChange={(e) => setForm({ ...form, minSalary: e.target.value })}
                  placeholder="1200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxSalary">Max. plat</Label>
                <Input
                  id="maxSalary"
                  type="number"
                  value={form.maxSalary}
                  onChange={(e) => setForm({ ...form, maxSalary: e.target.value })}
                  placeholder="1800"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Mena</Label>
                <select
                  id="currency"
                  className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm"
                  value={form.currency}
                  onChange={(e) => setForm({ ...form, currency: e.target.value })}
                >
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                  <option value="CZK">CZK</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Požiadavky *</Label>
              {form.requirements.map((req, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    value={req}
                    onChange={(e) => updateItem('requirements', i, e.target.value)}
                    placeholder={`Požiadavka ${i + 1}`}
                    required
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeItem('requirements', i)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => addItem('requirements')}>
                <Plus className="h-4 w-4 mr-1" /> Pridať požiadavku
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Náplň práce *</Label>
              {form.responsibilities.map((resp, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    value={resp}
                    onChange={(e) => updateItem('responsibilities', i, e.target.value)}
                    placeholder={`Náplň ${i + 1}`}
                    required
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeItem('responsibilities', i)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => addItem('responsibilities')}>
                <Plus className="h-4 w-4 mr-1" /> Pridať náplň
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Technológie</Label>
              {form.skills.map((skill, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    value={skill}
                    onChange={(e) => updateItem('skills', i, e.target.value)}
                    placeholder="napr. React"
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeItem('skills', i)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => addItem('skills')}>
                <Plus className="h-4 w-4 mr-1" /> Pridať technológiu
              </Button>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Ukladám...' : 'Uložiť zmeny'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
