'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';

export default function AdminSkillsPage() {
  const { token } = useAuth();
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState('');

  const fetchSkills = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await api.get('/admin/skills', token);
      setSkills(res);
    } catch { toast.error('Chyba pri načítaní skillov'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchSkills(); }, [token]);

  const createSkill = async () => {
    if (!newName.trim()) return;
    try {
      await api.post('/admin/skills', { name: newName.trim(), category: newCategory.trim() || undefined }, token!);
      toast.success('Skill pridaný');
      setNewName('');
      setNewCategory('');
      fetchSkills();
    } catch (e: any) { toast.error(e.message || 'Chyba'); }
  };

  const updateSkill = async (id: string) => {
    try {
      await api.patch(`/admin/skills/${id}`, { name: editName.trim(), category: editCategory.trim() || undefined }, token!);
      toast.success('Skill upravený');
      setEditingId(null);
      fetchSkills();
    } catch (e: any) { toast.error(e.message || 'Chyba'); }
  };

  const deleteSkill = async (id: string) => {
    if (!confirm('Naozaj chceš odstrániť tento skill?')) return;
    try {
      await api.delete(`/admin/skills/${id}`, token!);
      toast.success('Skill odstránený');
      fetchSkills();
    } catch { toast.error('Chyba'); }
  };

  const startEdit = (skill: any) => {
    setEditingId(skill.id);
    setEditName(skill.name);
    setEditCategory(skill.category || '');
  };

  const grouped = skills.reduce((acc: Record<string, any[]>, s: any) => {
    const cat = s.category || 'Ostatné';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {});

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[var(--jp-canvas)]">
      <p className="bl-mono text-[11px] uppercase tracking-wide text-[var(--jp-muted)] mb-1 flex items-center gap-2">
        <span className="inline-block w-2.5 h-2.5 bg-[var(--jp-signal)]" /> Sprava
      </p>
      <h1 className="bl-display text-3xl mb-6">Skills<span className="text-[var(--jp-signal)]">.</span></h1>

      <Card className="mb-6">
        <CardHeader><CardTitle className="text-sm uppercase">Pridať nový skill</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input placeholder="Názov skillu" value={newName} onChange={(e) => setNewName(e.target.value)} />
            <Input placeholder="Kategória (voliteľné)" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
            <Button onClick={createSkill} disabled={!newName.trim()}>
              <Plus className="w-4 h-4 mr-1" /> Pridať
            </Button>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex items-center justify-center py-12"><div className="h-8 w-8 animate-spin border-4 border-[var(--jp-accent)] border-t-transparent" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(grouped).map(([category, categorySkills]) => (
            <Card key={category}>
              <CardHeader><CardTitle className="bl-mono text-sm font-bold text-[var(--jp-muted)] uppercase tracking-wider">{category}</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {(categorySkills as any[]).map((skill: any) => (
                    <div key={skill.id} className="flex items-center justify-between p-2 border-2 border-[var(--jp-border)] bg-[var(--jp-surface)]">
                      {editingId === skill.id ? (
                        <div className="flex-1 flex flex-col sm:flex-row gap-2">
                          <Input size={1} className="h-8 text-sm" value={editName} onChange={(e) => setEditName(e.target.value)} />
                          <Input size={1} className="h-8 text-sm" value={editCategory} onChange={(e) => setEditCategory(e.target.value)} />
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" onClick={() => updateSkill(skill.id)}><Check className="w-4 h-4 text-[var(--jp-signal)]" /></Button>
                            <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}><X className="w-4 h-4 text-[var(--jp-muted)]" /></Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div>
                            <span className="bl-mono text-sm font-bold">{skill.name}</span>
                            {skill.category && <span className="ml-2 bl-mono text-xs text-[var(--jp-muted)]">({skill.category})</span>}
                          </div>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" onClick={() => startEdit(skill)}><Pencil className="w-3.5 h-3.5" /></Button>
                            <Button size="sm" variant="ghost" onClick={() => deleteSkill(skill.id)}><Trash2 className="w-3.5 h-3.5 text-[var(--jp-signal)]" /></Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
