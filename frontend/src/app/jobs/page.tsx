'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { formatDate, formatSalary, getJobTypeLabel } from '@/lib/utils';
import { Search, MapPin, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>({});
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (type) params.set('type', type);
    params.set('page', page.toString());
    params.set('limit', '12');

    api.get(`/jobs?${params.toString()}`)
      .then((data) => {
        setJobs(data.jobs);
        setPagination(data.pagination);
      })
      .finally(() => setLoading(false));
  }, [search, type, page]);

  const jobTypes = ['', 'FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'JUNIOR', 'CONTRACT'];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Ponuky práce</h1>
        <p className="mt-2 text-gray-500">Nájdi svoju vysnívanú prácu medzi overenými ponukami</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Hľadať ponuky..."
            className="pl-10"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <select
          className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm"
          value={type}
          onChange={(e) => { setType(e.target.value); setPage(1); }}
        >
          <option value="">Všetky typy</option>
          <option value="FULL_TIME">Plný úväzok</option>
          <option value="PART_TIME">Skrátený úväzok</option>
          <option value="INTERNSHIP">Stáž</option>
          <option value="JUNIOR">Junior</option>
          <option value="CONTRACT">Živnosť</option>
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/4 mb-4" />
                <div className="h-8 bg-gray-200 rounded w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-16">
          <Briefcase className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Žiadne ponuky nenájdené</h3>
          <p className="text-gray-500">Skús zmeniť vyhľadávacie kritériá</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job: any) => (
              <Link key={job.id} href={`/jobs/${job.id}`}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-sm font-bold text-blue-600">
                          {job.employer?.companyName?.[0] || '?'}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{job.title}</p>
                          <p className="text-sm text-gray-500">{job.employer?.companyName}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">{getJobTypeLabel(job.type)}</Badge>
                      <Badge variant="outline">{job.location}</Badge>
                      {job.isRemote && <Badge variant="success">Remote</Badge>}
                    </div>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {job.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-600">
                        {formatSalary(job.minSalary, job.maxSalary, job.currency)}
                      </span>
                      <span className="text-xs text-gray-400">{formatDate(job.createdAt)}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Predošlá
              </Button>
              <span className="text-sm text-gray-500">
                Strana {page} z {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                disabled={page === pagination.totalPages}
              >
                Ďalšia <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
