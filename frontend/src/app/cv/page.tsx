'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Plus, X, Download, Eye, Trash2, RotateCcw } from 'lucide-react';
import jsPDF from 'jspdf';

interface CVData {
  personal: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    title: string;
  };
  summary: string;
  experience: { id: string; company: string; position: string; startDate: string; endDate: string; description: string }[];
  education: { id: string; school: string; degree: string; field: string; startDate: string; endDate: string }[];
  skills: string[];
  languages: { id: string; language: string; level: string }[];
  links: { id: string; label: string; url: string }[];
}

const emptyCV: CVData = {
  personal: { firstName: '', lastName: '', email: '', phone: '', location: '', title: '' },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  languages: [],
  links: [],
};

export default function CVBuilderPage() {
  const { user, token } = useAuth();
  const [cv, setCV] = useState<CVData>(emptyCV);
  const [cvId, setCvId] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadCV = async () => {
      if (!token) { setLoading(false); return; }
      try {
        const saved = await api.get<any[]>('/candidates/cv', token);
        if (saved.length > 0) {
          const latest = saved[0];
          setCvId(latest.id);
          const data = typeof latest.cvData === 'string' ? JSON.parse(latest.cvData) : latest.cvData;
          setCV({
            personal: {
              firstName: data.personal?.firstName || user?.firstName || '',
              lastName: data.personal?.lastName || user?.lastName || '',
              email: data.personal?.email || user?.email || '',
              phone: data.personal?.phone || '',
              location: data.personal?.location || '',
              title: data.personal?.title || '',
            },
            summary: data.summary || '',
            experience: data.experience || [],
            education: data.education || [],
            skills: data.skills || [],
            languages: data.languages || [],
            links: data.links || [],
          });
        } else {
          setCV({ ...emptyCV, personal: { ...emptyCV.personal, firstName: user?.firstName || '', lastName: user?.lastName || '', email: user?.email || '' } });
        }
      } catch {
        setCV({ ...emptyCV, personal: { ...emptyCV.personal, firstName: user?.firstName || '', lastName: user?.lastName || '', email: user?.email || '' } });
      } finally {
        setLoading(false);
      }
    };
    loadCV();
  }, [token, user]);

  const updatePersonal = (field: string, value: string) => {
    setCV({ ...cv, personal: { ...cv.personal, [field]: value } });
  };

  const addItem = (section: 'experience' | 'education' | 'languages' | 'links') => {
    const newItem: any = { id: crypto.randomUUID() };
    if (section === 'experience') Object.assign(newItem, { company: '', position: '', startDate: '', endDate: '', description: '' });
    else if (section === 'education') Object.assign(newItem, { school: '', degree: '', field: '', startDate: '', endDate: '' });
    else if (section === 'languages') Object.assign(newItem, { language: '', level: '' });
    else if (section === 'links') Object.assign(newItem, { label: '', url: '' });
    setCV({ ...cv, [section]: [...cv[section], newItem] });
  };

  const removeItem = (section: 'experience' | 'education' | 'languages' | 'links', id: string) => {
    setCV({ ...cv, [section]: cv[section].filter((i) => i.id !== id) });
  };

  const updateItem = (section: 'experience' | 'education' | 'languages' | 'links', id: string, field: string, value: string) => {
    setCV({ ...cv, [section]: cv[section].map((i) => (i.id === id ? { ...i, [field]: value } : i)) });
  };

  const addSkill = () => setCV({ ...cv, skills: [...cv.skills, ''] });
  const removeSkill = (i: number) => setCV({ ...cv, skills: cv.skills.filter((_, j) => j !== i) });
  const updateSkill = (i: number, v: string) => {
    const s = [...cv.skills];
    s[i] = v;
    setCV({ ...cv, skills: s });
  };

  const validate = (): boolean => {
    if (!cv.personal.firstName.trim() || !cv.personal.lastName.trim()) {
      toast.error('Meno a priezvisko sú povinné');
      return false;
    }
    if (!cv.personal.email.trim()) {
      toast.error('Email je povinný');
      return false;
    }
    return true;
  };

  const exportPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const margin = 20;
    let y = margin;

    const addText = (text: string, size: number, bold = false, color = '#1a1a2e') => {
      if (y > 280) { doc.addPage(); y = margin; }
      doc.setFontSize(size);
      doc.setTextColor(color);
      doc.text(text, margin, y);
      y += size * 0.5;
    };

    doc.setFont('helvetica', 'bold');
    addText(`${cv.personal.firstName} ${cv.personal.lastName}`, 24, true, '#1a1a2e');
    doc.setFont('helvetica', 'normal');
    addText(cv.personal.title, 12, false, '#666');
    addText(`${cv.personal.email} | ${cv.personal.phone} | ${cv.personal.location}`, 9, false, '#888');
    y += 5;

    if (cv.summary) {
      doc.setFillColor(26, 26, 46);
      doc.rect(margin, y - 4, pageWidth - 2 * margin, 0.5, 'F');
      doc.setFont('helvetica', 'bold');
      addText('PROFESIONÁLNY SÚHRN', 11, true, '#1a1a2e');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      const lines = doc.splitTextToSize(cv.summary, pageWidth - 2 * margin);
      lines.forEach((l: string) => { if (y > 280) { doc.addPage(); y = margin; } doc.text(l, margin, y); y += 4.5; });
      y += 3;
    }

    if (cv.experience.length) {
      doc.setFillColor(26, 26, 46);
      doc.rect(margin, y - 4, pageWidth - 2 * margin, 0.5, 'F');
      doc.setFont('helvetica', 'bold');
      addText('PRAX', 11, true, '#1a1a2e');
      cv.experience.forEach((exp) => {
        if (y > 270) { doc.addPage(); y = margin; }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor('#1a1a2e');
        doc.text(exp.position, margin, y);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor('#666');
        const period = `${exp.startDate} - ${exp.endDate || 'súčasnosť'}`;
        doc.text(period, pageWidth - margin - doc.getTextWidth(period), y);
        y += 5;
        doc.text(exp.company, margin, y);
        y += 4;
        if (exp.description) {
          doc.setFontSize(8);
          doc.setTextColor('#444');
          const lines = doc.splitTextToSize(exp.description, pageWidth - 2 * margin);
          lines.forEach((l: string) => { if (y > 280) { doc.addPage(); y = margin; } doc.text(l, margin, y); y += 4; });
        }
        y += 2;
      });
    }

    if (cv.education.length) {
      if (y > 260) { doc.addPage(); y = margin; }
      doc.setFillColor(26, 26, 46);
      doc.rect(margin, y - 4, pageWidth - 2 * margin, 0.5, 'F');
      doc.setFont('helvetica', 'bold');
      addText('VZDELANIE', 11, true, '#1a1a2e');
      cv.education.forEach((edu) => {
        if (y > 270) { doc.addPage(); y = margin; }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor('#1a1a2e');
        doc.text(edu.school, margin, y);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor('#666');
        const period = `${edu.startDate} - ${edu.endDate || 'súčasnosť'}`;
        doc.text(period, pageWidth - margin - doc.getTextWidth(period), y);
        y += 5;
        doc.text(`${edu.degree}${edu.field ? ` - ${edu.field}` : ''}`, margin, y);
        y += 6;
      });
    }

    if (cv.skills.filter(Boolean).length) {
      if (y > 260) { doc.addPage(); y = margin; }
      doc.setFillColor(26, 26, 46);
      doc.rect(margin, y - 4, pageWidth - 2 * margin, 0.5, 'F');
      doc.setFont('helvetica', 'bold');
      addText('ZRUČNOSTI', 11, true, '#1a1a2e');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor('#444');
      const skillsStr = cv.skills.filter(Boolean).join(', ');
      const lines = doc.splitTextToSize(skillsStr, pageWidth - 2 * margin);
      lines.forEach((l: string) => { if (y > 280) { doc.addPage(); y = margin; } doc.text(l, margin, y); y += 4.5; });
    }

    if (cv.languages.length) {
      if (y > 260) { doc.addPage(); y = margin; }
      doc.setFillColor(26, 26, 46);
      doc.rect(margin, y - 4, pageWidth - 2 * margin, 0.5, 'F');
      doc.setFont('helvetica', 'bold');
      addText('JAZYKY', 11, true, '#1a1a2e');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      cv.languages.forEach((lang) => {
        if (y > 280) { doc.addPage(); y = margin; }
        doc.setTextColor('#1a1a2e');
        doc.text(`${lang.language} - ${lang.level}`, margin, y);
        y += 5;
      });
    }

    if (cv.links.filter(l => l.label && l.url).length) {
      if (y > 260) { doc.addPage(); y = margin; }
      doc.setFillColor(26, 26, 46);
      doc.rect(margin, y - 4, pageWidth - 2 * margin, 0.5, 'F');
      doc.setFont('helvetica', 'bold');
      addText('ODKAZY', 11, true, '#1a1a2e');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      cv.links.forEach((link) => {
        if (!link.label || !link.url) return;
        if (y > 280) { doc.addPage(); y = margin; }
        doc.setTextColor('#1a1a2e');
        doc.text(`${link.label}: ${link.url}`, margin, y);
        y += 5;
      });
    }

    doc.save('CV.pdf');
    toast.success('CV exportované ako PDF');
  };

  const saveCV = async () => {
    if (!token) return;
    if (!validate()) return;
    setSaving(true);
    try {
      if (cvId) {
        await api.patch(`/candidates/cv/${cvId}`, { cvData: cv }, token);
        toast.success('CV aktualizované');
      } else {
        const result = await api.post<any>('/candidates/cv/save', { cvData: cv }, token);
        setCvId(result.id);
        toast.success('CV uložené');
      }
    } catch {
      toast.error('Chyba pri ukladaní');
    } finally {
      setSaving(false);
    }
  };

  const deleteCV = async () => {
    if (!token || !cvId) return;
    if (!confirm('Naozaj chceš vymazať toto CV?')) return;
    try {
      await api.delete(`/candidates/cv/${cvId}`, token);
      setCvId(null);
      setCV({ ...emptyCV, personal: { ...emptyCV.personal, firstName: user?.firstName || '', lastName: user?.lastName || '', email: user?.email || '' } });
      toast.success('CV vymazané');
    } catch {
      toast.error('Chyba pri mazaní');
    }
  };

  const resetCV = () => {
    if (!confirm('Naozaj chceš začať odznova? Tento krok sa nedá vrátiť.')) return;
    setCvId(null);
    setCV({ ...emptyCV, personal: { ...emptyCV.personal, firstName: user?.firstName || '', lastName: user?.lastName || '', email: user?.email || '' } });
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[var(--jp-canvas)]">
        <div className="h-8 w-8 animate-spin border-4 border-[var(--jp-accent)] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="bg-[var(--jp-canvas)] min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-10 py-10">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="bl-mono text-[11px] uppercase tracking-wide text-[var(--jp-muted)] mb-2">05 / Tvoj dokument</p>
          <h1 className="bl-display text-4xl">CV <span className="text-[var(--jp-signal)]">Builder.</span></h1>
          <p className="bl-mono mt-2 text-[12px] text-[var(--jp-muted)]">{cvId ? 'Uprav svoje CV' : 'Vytvor si profesionálne CV'}</p>
        </div>
        <div className="flex gap-2">
          {cvId && (
            <Button variant="outline" onClick={deleteCV}>
              <Trash2 className="h-4 w-4 mr-2" /> Vymazať
            </Button>
          )}
          <Button variant="ghost" onClick={resetCV}>
            <RotateCcw className="h-4 w-4 mr-2" /> Nové CV
          </Button>
          <Button variant="outline" onClick={() => setPreview(!preview)}>
            <Eye className="h-4 w-4 mr-2" /> {preview ? 'Upraviť' : 'Náhľad'}
          </Button>
          <Button variant="outline" onClick={exportPDF}>
            <Download className="h-4 w-4 mr-2" /> Export PDF
          </Button>
          <Button onClick={saveCV} disabled={saving}>
            {saving ? 'Ukladám...' : cvId ? 'Aktualizovať CV' : 'Uložiť CV'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className={preview ? 'hidden lg:block' : ''}>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold uppercase text-sm text-[var(--jp-text)]">Osobné údaje</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Meno</Label><Input value={cv.personal.firstName} onChange={e => updatePersonal('firstName', e.target.value)} /></div>
                  <div><Label>Priezvisko</Label><Input value={cv.personal.lastName} onChange={e => updatePersonal('lastName', e.target.value)} /></div>
                </div>
                <div><Label>Email</Label><Input type="email" value={cv.personal.email} onChange={e => updatePersonal('email', e.target.value)} /></div>
                <div><Label>Telefón</Label><Input value={cv.personal.phone} onChange={e => updatePersonal('phone', e.target.value)} /></div>
                <div><Label>Lokalita</Label><Input value={cv.personal.location} onChange={e => updatePersonal('location', e.target.value)} /></div>
                <div><Label>Profesný titul</Label><Input value={cv.personal.title} onChange={e => updatePersonal('title', e.target.value)} placeholder="napr. Junior React Developer" /></div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold uppercase text-sm text-[var(--jp-text)]">Profesionálny súhrn</h3>
                <Textarea value={cv.summary} onChange={e => setCV({ ...cv, summary: e.target.value })} rows={4} placeholder="Stručne o tebe, tvoje ciele a čo hľadáš..." />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold uppercase text-sm text-[var(--jp-text)]">Prax</h3>
                  <Button type="button" variant="outline" size="sm" onClick={() => addItem('experience')}>
                    <Plus className="h-4 w-4 mr-1" /> Pridať
                  </Button>
                </div>
                {cv.experience.map((exp) => (
                  <div key={exp.id} className="p-4 border-2 border-[var(--jp-border)] space-y-3 relative">
                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeItem('experience', exp.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="grid grid-cols-2 gap-4">
                      <div><Label>Pozícia</Label><Input value={exp.position} onChange={e => updateItem('experience', exp.id, 'position', e.target.value)} /></div>
                      <div><Label>Firma</Label><Input value={exp.company} onChange={e => updateItem('experience', exp.id, 'company', e.target.value)} /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><Label>Od</Label><Input type="month" value={exp.startDate} onChange={e => updateItem('experience', exp.id, 'startDate', e.target.value)} /></div>
                      <div><Label>Do</Label><Input type="month" value={exp.endDate} onChange={e => updateItem('experience', exp.id, 'endDate', e.target.value)} /></div>
                    </div>
                    <div><Label>Popis</Label><Textarea value={exp.description} onChange={e => updateItem('experience', exp.id, 'description', e.target.value)} rows={2} /></div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold uppercase text-sm text-[var(--jp-text)]">Vzdelanie</h3>
                  <Button type="button" variant="outline" size="sm" onClick={() => addItem('education')}>
                    <Plus className="h-4 w-4 mr-1" /> Pridať
                  </Button>
                </div>
                {cv.education.map((edu) => (
                  <div key={edu.id} className="p-4 border-2 border-[var(--jp-border)] space-y-3 relative">
                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeItem('education', edu.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                    <div><Label>Škola</Label><Input value={edu.school} onChange={e => updateItem('education', edu.id, 'school', e.target.value)} /></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><Label>Stupeň</Label><Input value={edu.degree} onChange={e => updateItem('education', edu.id, 'degree', e.target.value)} /></div>
                      <div><Label>Odbor</Label><Input value={edu.field} onChange={e => updateItem('education', edu.id, 'field', e.target.value)} /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><Label>Od</Label><Input type="month" value={edu.startDate} onChange={e => updateItem('education', edu.id, 'startDate', e.target.value)} /></div>
                      <div><Label>Do</Label><Input type="month" value={edu.endDate} onChange={e => updateItem('education', edu.id, 'endDate', e.target.value)} /></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold uppercase text-sm text-[var(--jp-text)]">Zručnosti</h3>
                  <Button type="button" variant="outline" size="sm" onClick={addSkill}>
                    <Plus className="h-4 w-4 mr-1" /> Pridať
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cv.skills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-1 border-2 border-[var(--jp-border)] bg-[var(--jp-signal)] px-3 py-1.5">
                      <Input
                        value={skill}
                        onChange={e => updateSkill(i, e.target.value)}
                        className="h-6 w-24 border-0 bg-transparent p-0 text-sm focus:ring-0"
                        placeholder="skill"
                      />
                      <button onClick={() => removeSkill(i)} className="text-[var(--jp-ink)] hover:text-black">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold uppercase text-sm text-[var(--jp-text)]">Jazyky</h3>
                  <Button type="button" variant="outline" size="sm" onClick={() => addItem('languages')}>
                    <Plus className="h-4 w-4 mr-1" /> Pridať
                  </Button>
                </div>
                {cv.languages.map((lang) => (
                  <div key={lang.id} className="flex gap-3 items-end relative">
                    <div className="flex-1"><Label>Jazyk</Label><Input value={lang.language} onChange={e => updateItem('languages', lang.id, 'language', e.target.value)} /></div>
                    <div className="flex-1">
                      <Label>Úroveň</Label>
                      <select className="bl-mono h-10 w-full border-2 border-[var(--jp-border)] bg-[var(--jp-surface)] px-3 text-sm" value={lang.level} onChange={e => updateItem('languages', lang.id, 'level', e.target.value)}>
                        <option value="">--</option>
                        <option value="A1 - Začiatočník">A1 - Začiatočník</option>
                        <option value="A2 - Mierne pokročilý">A2 - Mierne pokročilý</option>
                        <option value="B1 - Stredne pokročilý">B1 - Stredne pokročilý</option>
                        <option value="B2 - Vyššie stredne pokročilý">B2 - Vyššie stredne pokročilý</option>
                        <option value="C1 - Pokročilý">C1 - Pokročilý</option>
                        <option value="C2 - Materinský jazyk">C2 - Materinský jazyk</option>
                      </select>
                    </div>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeItem('languages', lang.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold uppercase text-sm text-[var(--jp-text)]">Odkazy</h3>
                  <Button type="button" variant="outline" size="sm" onClick={() => addItem('links')}>
                    <Plus className="h-4 w-4 mr-1" /> Pridať
                  </Button>
                </div>
                {cv.links.map((link) => (
                  <div key={link.id} className="flex gap-3 items-end relative">
                    <div className="flex-1"><Label>Názov</Label><Input value={link.label} onChange={e => updateItem('links', link.id, 'label', e.target.value)} placeholder="napr. GitHub, LinkedIn" /></div>
                    <div className="flex-[2]"><Label>URL</Label><Input value={link.url} onChange={e => updateItem('links', link.id, 'url', e.target.value)} placeholder="https://..." /></div>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeItem('links', link.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {preview && (
          <div ref={previewRef} className="lg:sticky lg:top-24 self-start">
            <Card className="border-2 border-[var(--jp-border)]">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-[var(--jp-text)]">{cv.personal.firstName} {cv.personal.lastName}</h2>
                  {cv.personal.title && <p className="font-bold bl-mono text-[var(--jp-signal)]">{cv.personal.title}</p>}
                  <p className="bl-mono text-xs text-[var(--jp-muted)] mt-1">
                    {[cv.personal.email, cv.personal.phone, cv.personal.location].filter(Boolean).join(' | ')}
                  </p>
                </div>

                {cv.summary && (
                  <div className="mb-6">
                    <h3 className="bl-mono text-xs font-bold uppercase text-[var(--jp-muted)] tracking-wider mb-2">O mne</h3>
                    <p className="text-sm text-[var(--jp-text)]">{cv.summary}</p>
                  </div>
                )}

                {cv.experience.length > 0 && (
                  <div className="mb-6">
                    <h3 className="bl-mono text-xs font-bold uppercase text-[var(--jp-muted)] tracking-wider mb-3">Prax</h3>
                    {cv.experience.map((exp) => (
                      <div key={exp.id} className="mb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-[var(--jp-text)]">{exp.position}</p>
                            <p className="text-sm text-[var(--jp-muted)]">{exp.company}</p>
                          </div>
                          <p className="bl-mono text-xs text-[var(--jp-muted)]">{exp.startDate} - {exp.endDate || 'súčasnosť'}</p>
                        </div>
                        {exp.description && <p className="text-sm text-[var(--jp-text)] mt-1">{exp.description}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {cv.education.length > 0 && (
                  <div className="mb-6">
                    <h3 className="bl-mono text-xs font-bold uppercase text-[var(--jp-muted)] tracking-wider mb-3">Vzdelanie</h3>
                    {cv.education.map((edu) => (
                      <div key={edu.id} className="mb-3">
                        <div className="flex justify-between">
                          <p className="font-medium text-[var(--jp-text)]">{edu.school}</p>
                          <p className="bl-mono text-xs text-[var(--jp-muted)]">{edu.startDate} - {edu.endDate || 'súčasnosť'}</p>
                        </div>
                        <p className="text-sm text-[var(--jp-muted)]">{edu.degree}{edu.field ? ` - ${edu.field}` : ''}</p>
                      </div>
                    ))}
                  </div>
                )}

                {cv.skills.filter(Boolean).length > 0 && (
                  <div className="mb-6">
                    <h3 className="bl-mono text-xs font-bold uppercase text-[var(--jp-muted)] tracking-wider mb-3">Zručnosti</h3>
                    <div className="flex flex-wrap gap-2">
                      {cv.skills.filter(Boolean).map((s, i) => (
                        <span key={i} className="border-2 border-[var(--jp-border)] bg-[var(--jp-signal)] text-[var(--jp-ink)] bl-mono text-xs font-bold px-2.5 py-1">{s}</span>
                      ))}
                    </div>
                  </div>
                )}

                {cv.languages.length > 0 && (
                  <div className="mb-6">
                    <h3 className="bl-mono text-xs font-bold uppercase text-[var(--jp-muted)] tracking-wider mb-3">Jazyky</h3>
                    {cv.languages.map((lang) => (
                      <p key={lang.id} className="text-sm text-[var(--jp-text)]">{lang.language} - {lang.level}</p>
                    ))}
                  </div>
                )}

                {cv.links.filter(l => l.label && l.url).length > 0 && (
                  <div>
                    <h3 className="bl-mono text-xs font-bold uppercase text-[var(--jp-muted)] tracking-wider mb-3">Odkazy</h3>
                    {cv.links.filter(l => l.label && l.url).map((link) => (
                      <p key={link.id} className="text-sm text-[var(--jp-signal)] font-bold">
                        <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
                      </p>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
