'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'Základný',
    price: '0',
    period: 'mesiac',
    description: 'Pre malé firmy a jednotlivcov',
    features: [
      { text: '1 aktívna ponuka', included: true },
      { text: 'Základná podpora', included: true },
      { text: 'Firemný profil', included: true },
      { text: 'Prístup k databáze kandidátov', included: false },
      { text: 'Kandidáti s match scoringom', included: false },
      { text: 'API prístup', included: false },
      { text: 'Prioritná podpora', included: false },
    ],
    cta: 'Začať zadarmo',
    popular: false,
  },
  {
    name: 'Profesionálny',
    price: '49',
    period: 'mesiac',
    description: 'Pre rastúce firmy s pravidelným náborom',
    features: [
      { text: '10 aktívnych ponúk', included: true },
      { text: 'Základná podpora', included: true },
      { text: 'Firemný profil', included: true },
      { text: 'Prístup k databáze kandidátov', included: true },
      { text: 'Kandidáti s match scoringom', included: true },
      { text: 'API prístup', included: false },
      { text: 'Prioritná podpora', included: false },
    ],
    cta: 'Začať trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '149',
    period: 'mesiac',
    description: 'Pre veľké firmy a agentúry',
    features: [
      { text: 'Neobmedzené ponuky', included: true },
      { text: 'Prioritná podpora', included: true },
      { text: 'Firemný profil', included: true },
      { text: 'Prístup k databáze kandidátov', included: true },
      { text: 'Kandidáti s match scoringom', included: true },
      { text: 'API prístup', included: true },
      { text: 'Vlastná subdoména', included: true },
    ],
    cta: 'Kontaktovať nás',
    popular: false,
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Cenník pre firmy</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Vyber si plán, ktorý vyhovuje tvojim náborovým potrebám. Všetky plány zahŕňajú 14-dňovú skúšobnú dobu.
        </p>
        <div className="flex items-center justify-center gap-3 mt-8">
          <span className={cn('text-sm', !annual ? 'font-semibold text-gray-900' : 'text-gray-500')}>Mesačne</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={cn(
              'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
              annual ? 'bg-blue-600' : 'bg-gray-300'
            )}
          >
            <span className={cn(
              'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
              annual ? 'translate-x-6' : 'translate-x-1'
            )} />
          </button>
          <span className={cn('text-sm', annual ? 'font-semibold text-gray-900' : 'text-gray-500')}>
            Ročne <Badge variant="success" className="ml-1">-20%</Badge>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={cn(
              'relative',
              plan.popular && 'border-blue-500 shadow-lg ring-1 ring-blue-500'
            )}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-4 py-1">Najobľúbenejší</Badge>
              </div>
            )}
            <CardHeader className="text-center pt-8">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">{annual ? Math.floor(parseInt(plan.price) * 0.8) : plan.price}</span>
                <span className="text-gray-500 ml-1">€/{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    {feature.included ? (
                      <Check className="h-4 w-4 text-green-500 shrink-0" />
                    ) : (
                      <X className="h-4 w-4 text-gray-300 shrink-0" />
                    )}
                    <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/auth/register?role=employer">
                <Button
                  className="w-full"
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Potrebuješ individuálne riešenie?</h2>
        <p className="text-gray-500 mb-6">Kontaktuj nás a pripravíme ti cenu na mieru.</p>
        <Button variant="outline" size="lg">Kontaktovať predaj</Button>
      </div>
    </div>
  );
}
