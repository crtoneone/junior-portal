'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith('/landing-')) return null;

  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="DajFlek" className="h-8 w-auto" />
            </div>
            <p className="text-sm text-gray-500">
              Pomáhame juniorom a stážistom nájsť ich prvú prácu v IT.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Pre uchádzačov</h3>
            <ul className="space-y-2">
              <li><Link href="/jobs" className="text-sm text-gray-500 hover:text-gray-900">Ponuky prác</Link></li>
              <li><Link href="/auth/register" className="text-sm text-gray-500 hover:text-gray-900">Registrácia</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Pre firmy</h3>
            <ul className="space-y-2">
              <li><Link href="/pricing" className="text-sm text-gray-500 hover:text-gray-900">Cenník</Link></li>
              <li><Link href="/auth/register" className="text-sm text-gray-500 hover:text-gray-900">Pridať ponuku</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Kontakt</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-500">info@dajflek.sk</li>
              <li className="text-sm text-gray-500">Bratislava, Slovensko</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-gray-400">&copy; 2026 DajFlek. Všetky práva vyhradené.</p>
        </div>
      </div>
    </footer>
  );
}
