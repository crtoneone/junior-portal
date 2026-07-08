import Link from 'next/link';
import { Search, MapPin, Briefcase, ChevronRight, Star, Zap, Shield, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingVibrantPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#644AE9]">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#DCEF62]/20 blur-3xl" />
          <div className="absolute bottom-10 right-20 w-48 h-48 rounded-full bg-[#DCEF62]/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pt-20 sm:pt-28 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#DCEF62] leading-tight uppercase">
              Nie si senior?
            </h1>
            <p className="mt-4 text-2xl sm:text-3xl font-bold text-white">
              Odštartuj kariéru!
            </p>
          </div>
        </div>

        {/* Search Form */}
        <div className="mx-auto max-w-5xl px-4 pb-0 relative z-10">
          <form action="/jobs" method="GET" className="bg-[#DCEF62] rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <span className="inline-block bg-[#644AE9] text-white text-sm font-bold px-4 py-2 rounded-full mb-3">
                  Akú pozíciu hľadáš?
                </span>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    name="search"
                    type="text"
                    placeholder="Frontend, Backend, QA..."
                    className="w-full h-12 pl-11 pr-4 bg-white text-gray-900 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#644AE9]/50 text-base shadow-sm"
                  />
                </div>
              </div>
              <div className="text-center">
                <span className="inline-block bg-[#644AE9] text-white text-sm font-bold px-4 py-2 rounded-full mb-3">
                  Lokalita?
                </span>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    name="location"
                    type="text"
                    placeholder="Bratislava, Košice..."
                    className="w-full h-12 pl-11 pr-4 bg-white text-gray-900 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#644AE9]/50 text-base shadow-sm"
                  />
                </div>
              </div>
              <div className="text-center">
                <span className="inline-block bg-[#644AE9] text-white text-sm font-bold px-4 py-2 rounded-full mb-3">
                  Kategória
                </span>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <select
                    name="category"
                    className="w-full h-12 pl-11 pr-4 bg-white text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#644AE9]/50 text-base shadow-sm appearance-none"
                  >
                    <option value="">Všetky kategórie</option>
                    <option value="it">IT a vývoj</option>
                    <option value="design">Dizajn</option>
                    <option value="marketing">Marketing</option>
                    <option value="other">Iné</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button type="submit" className="w-full sm:w-auto bg-[#FF4757] text-white hover:bg-[#FF4757]/90 font-bold h-12 px-12 text-base shadow-md rounded-xl">
                Hľadať
              </Button>
              <Link href="/jobs" className="text-sm text-[#644AE9] hover:underline font-medium">
                Hľadáš niečo konkrétnejšie? Pokročilé vyhľadávanie
              </Link>
            </div>
          </form>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Prečo JuniorPortal?</h2>
            <p className="mt-4 text-gray-500">Čím sme iní</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#644AE9]/10">
                  <feature.icon className="h-6 w-6 text-[#644AE9]" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#644AE9]">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">Pripravený začať svoju kariéru?</h2>
          <p className="text-lg text-white/80 mb-8">
            Pridaj sa k stovkám juniorov, ktorí už našli svoju vysnívanú prácu.
          </p>
          <Link href="/auth/register">
            <button className="bg-[#DCEF62] text-[#644AE9] hover:bg-[#DCEF62]/90 font-bold h-14 px-12 text-base shadow-md rounded-xl">
              Zaregistrovať sa zadarmo
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

const features = [
  { title: 'Len pre juniorov', description: 'Všetky ponuky sú overené a vhodné pre začiatočníkov.', icon: Zap },
  { title: 'Overené firmy', description: 'Každá firma je overená pred zverejnením ponuky.', icon: Shield },
  { title: 'CV Builder', description: 'Vytvor si profesionálne CV priamo v portáli.', icon: Briefcase },
];
