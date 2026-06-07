'use client';

import { Suspense } from 'react';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

function RegisterForm() {
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get('role') || 'candidate';
  const [role, setRole] = useState<'candidate' | 'employer'>(defaultRole as any);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    companyName: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register({
        ...form,
        role: role.toUpperCase(),
      });
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Registrácia zlyhala');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Registrácia</CardTitle>
        <CardDescription>Vytvor si účet zadarmo</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex rounded-lg border p-1 mb-6">
          <button
            onClick={() => setRole('candidate')}
            className={cn(
              'flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all',
              role === 'candidate' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
            )}
          >
            Hľadám prácu
          </button>
          <button
            onClick={() => setRole('employer')}
            className={cn(
              'flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all',
              role === 'employer' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
            )}
          >
            Hľadám zamestnancov
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Meno</Label>
              <Input
                id="firstName"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Priezvisko</Label>
              <Input
                id="lastName"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="tvoj@email.sk"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Heslo</Label>
            <Input
              id="password"
              type="password"
              placeholder="Minimálne 8 znakov"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              minLength={8}
            />
          </div>
          {role === 'employer' && (
            <div className="space-y-2">
              <Label htmlFor="companyName">Názov spoločnosti</Label>
              <Input
                id="companyName"
                value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                required
              />
            </div>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Registrujem...' : 'Vytvoriť účet'}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Už máš účet?{' '}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Prihlás sa
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gray-50">
      <Suspense fallback={
        <Card className="w-full max-w-md">
          <CardContent className="py-12 text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto" />
          </CardContent>
        </Card>
      }>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
