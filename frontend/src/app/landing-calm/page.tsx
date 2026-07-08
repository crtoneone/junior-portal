import Link from 'next/link';
import { Briefcase, Building2, Zap, Shield, ChevronRight } from 'lucide-react';

export default function LandingCalmPage() {
  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#1a1a1a]">
      {/* Navigation */}
      <nav className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between">
          <span className="text-xl font-light tracking-wide">JuniorPortal</span>
          <div className="flex items-center gap-12">
            <Link href="/jobs" className="text-sm font-light text-gray-500 hover:text-[#1a1a1a] transition-colors duration-500">
              Práce
            </Link>
            <Link href="/pricing" className="text-sm font-light text-gray-500 hover:text-[#1a1a1a] transition-colors duration-500">
              Cenník
            </Link>
            <Link href="/auth/login" className="text-sm font-light text-gray-500 hover:text-[#1a1a1a] transition-colors duration-500">
              Prihlásiť sa
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 lg:px-8 pt-32 pb-40">
        <div className="max-w-2xl">
          <p className="text-xs font-light uppercase tracking-[0.2em] text-[#644AE9] mb-8">
            JuniorPortal
          </p>
          <h1 className="text-5xl lg:text-6xl font-extralight leading-[1.1] tracking-tight mb-8">
            Nájdi svoju prvú
            <br />
            <span className="text-[#644AE9]">prácu</span>
          </h1>
          <p className="text-lg font-light text-gray-500 leading-relaxed max-w-md mb-16">
            DajFlek.sk spája juniorov a absolventov s firmami, ktoré hľadajú čerstvé sily.
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-3 text-sm font-light text-[#644AE9] hover:gap-4 transition-all duration-500"
          >
            Zaregistrovať sa
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
            {stats.map((stat, i) => (
              <div key={i} className={i < stats.length - 1 ? 'border-r border-gray-100 pr-16' : ''}>
                <p className="text-4xl font-extralight tracking-tight mb-2">{stat.value}</p>
                <p className="text-xs font-light text-gray-400 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-32">
          <div className="max-w-lg mb-20">
            <p className="text-xs font-light uppercase tracking-[0.2em] text-gray-400 mb-4">
              Proces
            </p>
            <h2 className="text-3xl font-extralight tracking-tight">
              Jednoduchý proces
            </h2>
          </div>
          <div className="space-y-24">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-16 items-start">
                <span className="text-5xl font-extralight text-gray-100 shrink-0 w-12">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-lg font-light mb-3">{step.title}</h3>
                  <p className="text-sm font-light text-gray-400 leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-32">
          <div className="max-w-lg mb-20">
            <p className="text-xs font-light uppercase tracking-[0.2em] text-gray-400 mb-4">
              Funkcie
            </p>
            <h2 className="text-3xl font-extralight tracking-tight">
              Prečo JuniorPortal
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100">
            {features.map((feature, i) => (
              <div key={i} className="bg-[#fafaf8] p-12 group hover:bg-white transition-colors duration-700">
                <feature.icon className="w-5 h-5 text-[#644AE9] mb-6 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="text-base font-light mb-3">{feature.title}</h3>
                <p className="text-sm font-light text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlight */}
      <section className="border-t border-gray-100 bg-[#DCEF62]/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-32 text-center">
          <p className="text-3xl lg:text-4xl font-extralight tracking-tight max-w-2xl mx-auto leading-relaxed">
            Všetky ponuky sú overené a vhodné pre
            <br />
            <span className="text-[#644AE9]">začiatočníkov</span>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-40 text-center">
          <p className="text-xs font-light uppercase tracking-[0.2em] text-gray-400 mb-8">
            Začni
          </p>
          <h2 className="text-3xl lg:text-4xl font-extralight tracking-tight mb-12">
            Pripravený začať?
          </h2>
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-3 text-sm font-light text-[#644AE9] border border-[#644AE9]/20 px-8 py-4 hover:bg-[#644AE9] hover:text-white hover:border-[#644AE9] transition-all duration-500"
          >
            Zaregistrovať sa zadarmo
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-sm font-light mb-1">JuniorPortal</p>
              <p className="text-xs font-light text-gray-400">DajFlek.sk</p>
            </div>
            <div className="flex items-center gap-12">
              <Link href="/contact" className="text-xs font-light text-gray-400 hover:text-[#1a1a1a] transition-colors duration-500">
                Kontakt
              </Link>
              <Link href="/privacy" className="text-xs font-light text-gray-400 hover:text-[#1a1a1a] transition-colors duration-500">
                Súkromie
              </Link>
              <Link href="/terms" className="text-xs font-light text-gray-400 hover:text-[#1a1a1a] transition-colors duration-500">
                Podmienky
              </Link>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-gray-100">
            <p className="text-xs font-light text-gray-300">
              &copy; 2026 JuniorPortal. Všetky práva vyhradené.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const stats = [
  { value: '1 200+', label: 'Ponúk' },
  { value: '450+', label: 'Firiem' },
  { value: '8 500+', label: 'Juniorov' },
  { value: '92%', label: 'Úspešnosť' },
];

const steps = [
  {
    title: 'Vytvor si profil',
    description: 'Zaregistruj sa a vyplň svoje zručnosti, vzdelanie a preferencie. Trvá to pár minút.',
  },
  {
    title: 'Prezeraj ponuky',
    description: 'Prezeraj si ponuky prispôsobené juniorom a stážistom. Filtrom podľa lokality, oboru a typu spolupráce.',
  },
  {
    title: 'Reaguj na ponuky',
    description: 'Pošli svoju prihlášku jedným klikom. Firmy sa ti ozvú priamo cez portál.',
  },
];

const features = [
  {
    title: 'Len pre juniorov',
    description: 'Všetky ponuky sú overené a vhodné pre začiatočníkov. Žiadne skúsenosti nevyžadujeme.',
    icon: Zap,
  },
  {
    title: 'Overené firmy',
    description: 'Každá firma je overená pred zverejnením ponuky. Vieš, že komunikuješ s legitímnymi zamestnávateľmi.',
    icon: Shield,
  },
  {
    title: 'Skill Matching',
    description: 'Dostávaj odporúčania na základe tvojich zručností. Nájdi prácu, ktorá ti sadne.',
    icon: Building2,
  },
  {
    title: 'Jednoduché prihlásenie',
    description: 'Prihlás sa na pozíciu jedným klikom. Žiadne zbytočné formuláre a papierovanie.',
    icon: Briefcase,
  },
];
