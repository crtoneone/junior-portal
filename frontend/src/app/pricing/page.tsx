'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
    <div className="bg-[var(--jp-canvas)]">
      <div className="mx-auto max-w-[1400px] px-3 sm:px-6 lg:px-10 py-12">
        <div className="border-2 border-[var(--jp-border)] bg-[var(--jp-bg)]">
          <div className="border-b-2 border-[var(--jp-border)] p-6 sm:p-10">
            <p className="bl-mono text-[12px] uppercase tracking-wide text-[var(--jp-muted)] mb-4 flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 bg-[var(--jp-signal)]" /> Cenník
            </p>
            <h1 className="bl-display text-4xl sm:text-6xl">
              Cenník<br />pre <span className="text-[var(--jp-signal)]">firmy.</span>
            </h1>
            <p className="bl-mono mt-4 text-[12px] text-[var(--jp-muted)]">
              Všetky plány zahŕňajú 14-dňovú skúšobnú dobu. Žiadne skryté poplatky.
            </p>
            <div className="flex items-center gap-3 mt-8">
              <span className={cn('bl-mono text-[12px] font-bold', !annual ? 'text-[var(--jp-text)]' : 'text-[var(--jp-muted)]')}>Mesačne</span>
              <button
                onClick={() => setAnnual(!annual)}
                className={cn(
                  'relative inline-flex h-8 w-16 items-center border-2 border-[var(--jp-border)] bg-[var(--jp-surface)] transition-colors',
                  annual && 'bg-[var(--jp-signal)]'
                )}
                aria-label="Prepnúť na ročnú fakturáciu"
              >
                <span className={cn(
                  'inline-block h-6 w-6 border-2 border-[var(--jp-border)] bg-[var(--jp-surface)] transition-transform',
                  annual ? 'translate-x-8' : 'translate-x-0'
                )} />
              </button>
              <span className={cn('bl-mono text-[12px] font-bold', annual ? 'text-[var(--jp-text)]' : 'text-[var(--jp-muted)]')}>
                Ročne <span className="bl-mono px-2 py-0.5 border-2 border-[var(--jp-signal)] text-[var(--jp-signal)]">-20%</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[2px] bg-[var(--jp-border)] border-b-2 border-[var(--jp-border)]">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  'border-r-2 last:border-r-0 border-[var(--jp-border)]',
                  plan.popular && 'bg-[var(--jp-ink)] border-[var(--jp-ink)]'
                )}
              >
                <CardContent className="p-6 sm:p-8 flex flex-col">
                  <div className={cn('bl-mono mb-5', plan.popular ? 'text-[var(--jp-signal)]' : 'text-[var(--jp-muted)]')}>
                    {plan.popular ? 'Najobľúbenejší' : 'Plán'}
                  </div>
                  <h2 className={cn('text-xl font-bold uppercase tracking-tight', plan.popular ? 'text-[var(--jp-ink-text)]' : 'text-[var(--jp-text)]')}>{plan.name}</h2>
                  <p className={cn('bl-mono text-[12px] mt-2', plan.popular ? 'text-[var(--jp-ink-text)] opacity-70' : 'text-[var(--jp-muted)]')}>{plan.description}</p>
                  <div className="mt-6 pb-6 border-b-2 border-[var(--jp-border)]">
                    <span className={cn('bl-display text-5xl', plan.popular ? 'text-[var(--jp-signal)]' : 'text-[var(--jp-text)]')}>
                      {annual ? Math.floor(parseInt(plan.price) * 0.8) : plan.price}
                    </span>
                    <span className={cn('bl-mono text-[12px] ml-1', plan.popular ? 'text-[var(--jp-ink-text)] opacity-60' : 'text-[var(--jp-muted)]')}>€/{plan.period}</span>
                  </div>
                  <ul className="space-y-3 my-6 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 bl-mono text-[12px]">
                        {feature.included ? (
                          <Check className={cn('h-4 w-4 shrink-0', plan.popular ? 'text-[var(--jp-signal)]' : 'text-[var(--jp-text)]')} />
                        ) : (
                          <X className="h-4 w-4 text-[var(--jp-border)] shrink-0" />
                        )}
                        <span className={cn(
                          feature.included
                            ? (plan.popular ? 'text-[var(--jp-ink-text)]' : 'text-[var(--jp-text)]')
                            : (plan.popular ? 'text-[var(--jp-ink-text)] opacity-40' : 'text-[var(--jp-muted)]')
                        )}>
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

          <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="bl-display text-2xl sm:text-4xl">Potrebuješ individuálne riešenie?</h2>
              <p className="bl-mono mt-3 text-[12px] text-[var(--jp-muted)]">Kontaktuj nás a pripravíme ti cenu na mieru.</p>
            </div>
            <div className="md:justify-self-end">
              <Link href="/contact">
                <Button variant="outline" size="lg">Kontaktovať predaj</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}