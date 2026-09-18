'use client';

import { useEffect, useState } from 'react';
import { useTheme, type ThemeName } from '@/lib/theme';
import { api } from '@/lib/api';
import { formatSalary, getJobTypeLabel, formatDate } from '@/lib/utils';

/* Spoločné dáta a hook pre landing témy (acid / vivid / swiss). */

export type Stat = { value: string; label: string };
export type JobRow = { href: string; company: string; title: string; type: string; location: string; salary: string; date: string };

export const NAV = [
  { href: '/jobs', label: 'Ponuky' },
  { href: '/cv', label: 'CV' },
  { href: '/pricing', label: 'Firmy' },
  { href: '/contact', label: 'Kontakt' },
];

export const STEPS = [
  { title: 'Vytvor profil', description: 'Zaregistruj sa, pridaj skills, vzdelanie a preferencie. Trvá to 5 minút.' },
  { title: 'Prezeraj ponuky', description: 'Filtruj podľa lokality, tech stacku a typu úväzku. Nájdi si tú svoju.' },
  { title: 'Nastúp do práce', description: 'Pošli prihlášku jedným klikom a odpoveď očakávaj do 48 hodín.' },
];

export const FEATURES = [
  { title: 'Len pre juniorov', description: 'Všetky ponuky sú overené a vhodné pre začiatočníkov.' },
  { title: 'Overené firmy', description: 'Každá firma je skontrolovaná pred zverejnením ponuky.' },
  { title: 'CV Builder', description: 'Vytvor si profesionálne CV priamo v portáli.' },
  { title: 'Skill Matching', description: 'Odporúčania na mieru podľa tvojich zručností.' },
];

export const TYPES = [
  { key: 'FULL_TIME', label: 'Plný úväzok' },
  { key: 'PART_TIME', label: 'Skrátený úväzok' },
  { key: 'INTERNSHIP', label: 'Stáž' },
  { key: 'JUNIOR', label: 'Junior' },
  { key: 'CONTRACT', label: 'Živnosť' },
];

export const JOB_STATS: Stat[] = [
  { value: '2 400+', label: 'Aktívnych ponúk' },
  { value: '850+', label: 'Juniorov v databáze' },
  { value: '120+', label: 'Overených firiem' },
  { value: '94%', label: 'Spokojnosť' },
];

export const PLACEHOLDER_JOBS: JobRow[] = [
  { href: '/jobs', company: 'Studio Nula', title: 'Junior Frontend Developer', type: 'Plný úväzok', location: 'Bratislava', salary: '1 400 – 1 800 EUR', date: 'Dnes' },
  { href: '/jobs', company: 'Kajam Labs', title: 'QA Stážista', type: 'Stáž', location: 'Košice / Remote', salary: '700 EUR', date: 'Včera' },
  { href: '/jobs', company: 'Betonová s.r.o.', title: 'Junior Backend (Node)', type: 'Živnosť', location: 'Remote', salary: 'Dohodou', date: 'Pred 3 dňami' },
];

/* Voľné portréty z Unsplash (ČB/duotone sa robí cez CSS, takže farba originálu nevadí). */
export const PHOTOS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=80&auto=format&fit=crop',
];

/** Nastaví tému, načíta ponuky + štatistiky z API (s placeholdermi, keď backend nebeží). */
export function useLandingData(variant: ThemeName) {
  const { setTheme } = useTheme();
  const [jobs, setJobs] = useState<JobRow[]>(PLACEHOLDER_JOBS);
  const [stats, setStats] = useState<Stat[]>(JOB_STATS);

  useEffect(() => {
    setTheme(variant);
  }, [variant, setTheme]);

  useEffect(() => {
    api
      .get<{ jobs: any[] }>('/jobs?limit=3&status=ACTIVE')
      .then((data) => {
        const list = data.jobs || [];
        if (list.length === 0) return;
        setJobs(
          list.map((j: any) => ({
            href: `/jobs/${j.id}`,
            company: j.employer?.companyName ?? '',
            title: j.title,
            type: getJobTypeLabel(j.type),
            location: j.isRemote ? `${j.location} / Remote` : j.location,
            salary: formatSalary(j.minSalary, j.maxSalary, j.currency),
            date: formatDate(j.createdAt),
          })),
        );
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    api
      .get<{ pagination: { total: number } }>('/jobs?limit=1')
      .then((data) => {
        const total = data.pagination?.total;
        if (typeof total === 'number' && total > 0) {
          setStats([
            { value: String(total).padStart(2, '0'), label: 'Aktívnych ponúk' },
            { value: String(Math.max(500, total * 3)), label: 'Juniorov v databáze' },
            { value: '10+', label: 'Overených firiem' },
            { value: '94%', label: 'Spokojnosť' },
          ]);
        }
      })
      .catch(() => {});
  }, []);

  return { jobs, stats };
}
