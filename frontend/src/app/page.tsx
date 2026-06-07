import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Briefcase, Building2, TrendingUp, Zap, Shield } from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzEuNjU3IDAgMy0xLjM0MyAzLTNzLTEuMzQzLTMtMy0zLTMgMS4zNDMtMyAzIDEuMzQzIDMgMyAzem0wIDI0YzEuNjU3IDAgMy0xLjM0MyAzLTNzLTEuMzQzLTMtMy0zLTMgMS4zNDMtMyAzIDEuMzQzIDMgMyAzem0tMjQgMGMxLjY1NyAwIDMtMS4zNDMgMy0zcy0xLjM0My0zLTMtMy0zIDEuMzQzLTMgMyAxLjM0MyAzIDMgM3oiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Nájdi svoju prvú <span className="text-blue-200">prácu v IT</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-blue-100 max-w-2xl mx-auto">
              JuniorPortal spája talentovaných juniorov, stážistov a absolventov s firmami, ktoré hľadajú čerstvé sily. Žiadne skúsenosti? Nevadí!
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/auth/register?role=candidate">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                  Hľadám prácu
                </Button>
              </Link>
              <Link href="/auth/register?role=employer">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Hľadám zamestnancov
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Ako to funguje</h2>
            <p className="mt-4 text-gray-500">Jednoduchý proces v troch krokoch</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <Card key={i} className="relative border-0 shadow-lg">
                <CardContent className="pt-8 text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
                    <step.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Prečo JuniorPortal?</h2>
            <p className="mt-4 text-gray-500">Čím sme iní</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <Card key={i} className="border-0 shadow-md">
                <CardContent className="pt-8 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">Pripravený začať svoju kariéru?</h2>
          <p className="text-lg text-blue-100 mb-8">
            Pridaj sa k stovkám juniorov, ktorí už našli svoju vysnívanú prácu.
          </p>
          <Link href="/auth/register">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
              Zaregistrovať sa zadarmo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

const steps = [
  { title: 'Vytvor si profil', description: 'Zaregistruj sa a vyplň svoje skills, vzdelanie a preferencie.', icon: Search },
  { title: 'Prezeraj ponuky', description: 'Prezeraj si ponuky prispôsobené juniorom a stážistom.', icon: Briefcase },
  { title: 'Reaguj na ponuky', description: 'Pošli svoju prihlášku jedným klikom a čakaj na odpoveď.', icon: TrendingUp },
];

const features = [
  { title: 'Len pre juniorov', description: 'Všetky ponuky sú overené a vhodné pre začiatočníkov.', icon: Zap },
  { title: 'Overené firmy', description: 'Každá firma je overená pred zverejnením ponuky.', icon: Shield },
  { title: 'CV Builder', description: 'Vytvor si profesionálne CV priamo v portáli.', icon: Briefcase },
  { title: 'Skill Matching', description: 'Dostávaj odporúčania na základe tvojich zručností.', icon: Building2 },
];
