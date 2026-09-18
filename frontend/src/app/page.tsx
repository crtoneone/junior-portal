import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Briefcase, Building2, TrendingUp, Zap, Shield, Mail, Send } from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[#644AE9]">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#DCEF62]/20 blur-3xl" />
          <div className="absolute bottom-10 right-20 w-48 h-48 rounded-full bg-[#DCEF62]/10 blur-3xl" />

        </div>
        <div className="mx-auto max-w-5xl px-4 pt-10 sm:pt-14 sm:px-6 lg:px-8 relative pb-0">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight uppercase">
              Nie si senior?
            </h1>
            <p className="mt-6 text-[58px] leading-8 text-[#DCEF62] max-w-2xl mx-auto font-bold">
              Odštartuj kariéru.
            </p>
          </div>
        </div>
        <div className="mt-8 sm:mt-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-0">
          <div className="text-center mb-4">
            <p className="text-sm text-white/60">
              Hľadáš niečo konkrétnejšie?{' '}
              <Link href="/jobs" className="text-[#DCEF62] hover:underline font-medium">
                Pokročilé vyhľadávanie
              </Link>
            </p>
          </div>
        </div>
        <form action="/jobs" method="GET" className="flex flex-col sm:flex-row gap-3 p-4 sm:p-5 bg-[#DCEF62] rounded-xl max-w-[1266px] mx-auto sm:px-8 pb-7">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none" />
            <input
              name="search"
              type="text"
              placeholder="Akú pozíciu hľadáš?"
              className="w-full h-14 pl-12 pr-4 bg-white text-gray-900 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#644AE9]/50 text-base shadow-sm"
            />
          </div>
          <div className="sm:w-52 relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input
              name="location"
              type="text"
              placeholder="Lokalita?"
              className="w-full h-14 pl-12 pr-4 bg-white text-gray-900 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#644AE9]/50 text-base shadow-sm"
            />
          </div>
          <Button type="submit" size="lg" className="bg-[#644AE9] text-white hover:bg-[#644AE9]/90 font-semibold h-14 px-10 text-base shadow-sm">
            Hľadať
          </Button>
        </form>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1266px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Ako to funguje</h2>
            <p className="mt-4 text-gray-500">Jednoduchý proces v troch krokoch</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <Card key={i} className="relative border-0 shadow-lg">
                <CardContent className="pt-8 text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#644AE9]/10">
                    <step.icon className="h-8 w-8 text-[#644AE9]" />
                  </div>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-[#644AE9] text-sm font-bold text-white">
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
        <div className="mx-auto max-w-[1266px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Prečo DajFlek?</h2>
            <p className="mt-4 text-gray-500">Čím sme iní</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <Card key={i} className="border-0 shadow-md">
                <CardContent className="pt-8 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#DCEF62]/20">
                    <feature.icon className="h-6 w-6 text-[#644AE9]" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-[1266px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Máš otázku?</h2>
            <p className="mt-4 text-gray-500">Napíš nám a my sa ti ozveme</p>
          </div>
          <div className="max-w-xl mx-auto">
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-[#644AE9] text-white hover:bg-[#644AE9]/90">
                <Mail className="w-5 h-5 mr-2" /> Kontaktovať nás
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#644AE9]">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">Pripravený začať svoju kariéru?</h2>
          <p className="text-lg text-white/80 mb-8">
            Pridaj sa k stovkám juniorov, ktorí už našli svoju vysnívanú prácu.
          </p>
          <Link href="/auth/register">
            <Button size="lg" className="bg-white text-[#644AE9] hover:bg-gray-50">
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
