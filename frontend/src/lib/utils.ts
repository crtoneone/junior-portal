import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSalary(min?: number, max?: number, currency?: string): string {
  const cur = currency || 'EUR';
  if (!min && !max) return 'Dohodou';
  if (min && max) return `${min.toLocaleString()} - ${max.toLocaleString()} ${cur}`;
  if (min) return `od ${min.toLocaleString()} ${cur}`;
  return `do ${max!.toLocaleString()} ${cur}`;
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Dnes';
  if (days === 1) return 'Včera';
  if (days < 7) return `Pred ${days} dňami`;
  if (days < 30) return `Pred ${Math.floor(days / 7)} týždňami`;
  return d.toLocaleDateString('sk-SK');
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    REVIEWED: 'bg-blue-100 text-blue-800',
    ACCEPTED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
    ACTIVE: 'bg-green-100 text-green-800',
    CLOSED: 'bg-gray-100 text-gray-800',
    DRAFT: 'bg-orange-100 text-orange-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

export function getJobTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    FULL_TIME: 'Plný úväzok',
    PART_TIME: 'Skrátený úväzok',
    INTERNSHIP: 'Stáž',
    JUNIOR: 'Junior',
    CONTRACT: 'Živnosť',
  };
  return labels[type] || type;
}
