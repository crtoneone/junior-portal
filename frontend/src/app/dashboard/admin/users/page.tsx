'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Search, ChevronLeft, ChevronRight, Shield, ShieldOff, Trash2, Ban, Check } from 'lucide-react';

export default function AdminUsersPage() {
  const { token } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (search) params.set('search', search);
      if (roleFilter) params.set('role', roleFilter);
      const res = await api.get(`/admin/users?${params}`, token);
      setUsers(res.users);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch { toast.error('Chyba pri načítaní používateľov'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(); }, [token, page, roleFilter]);

  useEffect(() => {
    const timer = setTimeout(() => { setPage(1); fetchUsers(); }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const toggleActive = async (id: string) => {
    try {
      await api.patch(`/admin/users/${id}/toggle-active`, {}, token!);
      toast.success('Stav používateľa zmenený');
      fetchUsers();
    } catch { toast.error('Chyba'); }
  };

  const changeRole = async (id: string, role: string) => {
    try {
      await api.patch(`/admin/users/${id}/role`, { role }, token!);
      toast.success('Rola zmenená');
      fetchUsers();
    } catch { toast.error('Chyba pri zmene roly'); }
  };

  const deleteUser = async (id: string) => {
    if (!confirm('Naozaj chceš odstrániť tohto používateľa?')) return;
    try {
      await api.delete(`/admin/users/${id}`, token!);
      toast.success('Používateľ odstránený');
      fetchUsers();
    } catch { toast.error('Chyba pri odstraňovaní'); }
  };

  const verifyEmployer = async (id: string) => {
    try {
      await api.post(`/admin/verify-employer/${id}`, {}, token!);
      toast.success('Firma overená');
      fetchUsers();
    } catch { toast.error('Chyba'); }
  };

  const unverifyEmployer = async (id: string) => {
    try {
      await api.post(`/admin/unverify-employer/${id}`, {}, token!);
      toast.success('Overenie firmy zrušené');
      fetchUsers();
    } catch { toast.error('Chyba'); }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Správa používateľov</h1>
        <div className="text-sm text-gray-500">Celkom: {total}</div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Hľadať meno, email..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {['', 'CANDIDATE', 'EMPLOYER', 'ADMIN'].map((r) => (
                <Button
                  key={r}
                  variant={roleFilter === r ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => { setRoleFilter(r); setPage(1); }}
                >
                  {r || 'Všetci'}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12"><div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" /></div>
          ) : users.length === 0 ? (
            <div className="text-center py-12 text-gray-500">Žiadni používatelia</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Meno</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Rola</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Stav</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Registrovaný</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Akcie</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u: any) => (
                    <tr key={u.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="font-medium">{u.firstName} {u.lastName}</span>
                        {u._count?.applications > 0 && (
                          <span className="ml-2 text-xs text-gray-400">({u._count.applications} prihlášok)</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{u.email}</td>
                      <td className="py-3 px-4">
                        <Badge variant={u.role === 'ADMIN' ? 'default' : u.role === 'EMPLOYER' ? 'secondary' : 'outline'}>
                          {u.role === 'CANDIDATE' ? 'Uchádzač' : u.role === 'EMPLOYER' ? 'Firma' : 'Admin'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${u.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                          <span className="text-xs">{u.isActive ? 'Aktívny' : 'Blokovaný'}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-500 text-xs">{new Date(u.createdAt).toLocaleDateString('sk-SK')}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-1">
                          {u.role === 'EMPLOYER' && (
                            u.isVerified ? (
                              <Button variant="ghost" size="sm" onClick={() => unverifyEmployer(u.id)} title="Zrušiť overenie">
                                <ShieldOff className="w-4 h-4 text-orange-500" />
                              </Button>
                            ) : (
                              <Button variant="ghost" size="sm" onClick={() => verifyEmployer(u.id)} title="Overiť firmu">
                                <Shield className="w-4 h-4 text-green-500" />
                              </Button>
                            )
                          )}
                          {u.role !== 'ADMIN' && (
                            <>
                              <Button variant="ghost" size="sm" onClick={() => toggleActive(u.id)} title={u.isActive ? 'Blokovať' : 'Odblokovať'}>
                                {u.isActive ? <Ban className="w-4 h-4 text-red-500" /> : <Check className="w-4 h-4 text-green-500" />}
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => deleteUser(u.id)} title="Odstrániť">
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm text-gray-600">Stránka {page} z {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
