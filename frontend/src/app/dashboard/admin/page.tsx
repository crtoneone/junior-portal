'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Users, Briefcase, Building2, FileText } from 'lucide-react';

export default function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (!token) return;
    Promise.all([
      api.get('/admin/dashboard', token),
      api.get('/admin/users', token),
    ]).then(([s, u]) => {
      setStats(s);
      setUsers(u.users);
    });
  }, [token]);

  const verifyEmployer = async (userId: string) => {
    try {
      await api.post(`/admin/verify-employer/${userId}`, {}, token!);
      toast.success('Firma overená');
    } catch {
      toast.error('Chyba pri overovaní');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-3">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats?.totalUsers || 0}</p>
              <p className="text-sm text-gray-500">Používatelia</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-3">
              <Building2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats?.totalEmployers || 0}</p>
              <p className="text-sm text-gray-500">Firmy</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="rounded-lg bg-purple-100 p-3">
              <Briefcase className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats?.totalJobs || 0}</p>
              <p className="text-sm text-gray-500">Ponuky</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="rounded-lg bg-orange-100 p-3">
              <FileText className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats?.totalApplications || 0}</p>
              <p className="text-sm text-gray-500">Prihlášky</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Správa používateľov</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {users.map((u: any) => (
              <div key={u.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="font-medium">{u.firstName} {u.lastName}</p>
                  <p className="text-sm text-gray-500">{u.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={u.role === 'ADMIN' ? 'default' : u.role === 'EMPLOYER' ? 'secondary' : 'outline'}>
                    {u.role === 'CANDIDATE' ? 'Uchádzač' : u.role === 'EMPLOYER' ? 'Firma' : 'Admin'}
                  </Badge>
                  {u.role === 'EMPLOYER' && !u.isVerified && (
                    <Button size="sm" onClick={() => verifyEmployer(u.id)}>
                      Overiť firmu
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
