import Link from 'next/link';
import {
  Search,
  Briefcase,
  FileText,
  Shield,
  TrendingUp,
  ArrowRight,
  Code2,
  GraduationCap,
  ChevronRight,
  Users,
  Building2,
  Star,
} from 'lucide-react';

export default function LandingCorporatePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* ===== HERO ===== */}
      <section className="relative py-20 lg:py-32 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="mb-6 inline-block bg-blue-600 text-white px-4 py-2 text-sm font-semibold uppercase tracking-wider rounded">
              DajFlek.sk &mdash; Júnior kariérní portál
            </div>

            <h1 className="text-4xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Najděte si svoju prvú prácu<br/>
              <span className="text-blue-600">mestej Senior manažér</span>
            </h1>

            <div className="mt-8 max-w-2xl mx-auto">
              <p className="text-lg text-gray-600 leading-relaxed">
                Firemný portál pre juniorov, stážistov a absolventov. Nadupané firmy. Žiadne BS.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold uppercase text-sm px-8 py-4 rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1"
              >
                ZAČAŤ <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 bg-transparent text-blue-600 font-semibold uppercase text-sm px-8 py-4 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all"
              >
                PREZRIEŤ PONUKY
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-blue-100 p-3">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
              Ako to <span className="text-blue-600">funguje</span>
            </h2>
            <div className="mt-4 h-1 w-24 bg-blue-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative bg-white rounded-xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="absolute -top-4 -left-4 bg-blue-600 text-white w-12 h-12 flex items-center justify-center font-bold text-xl rounded-lg border-4 border-white">
                  {i + 1}
                </div>
                <div className="mb-4 text-blue-600">
                  <step.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
              Prečo <span className="text-blue-600">my</span>?
            </h2>
            <div className="mt-4 h-1 w-24 bg-blue-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-lg">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== JOB TYPES ===== */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Typy <span className="text-blue-600">pozícií</span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {jobTypes.map((type, i) => (
              <Link
                key={i}
                href={`/jobs?type=${type.label.toLowerCase().replace(/\\s+/g, '-')}`}
                className={`inline-flex items-center gap-2 px-6 py-3 font-semibold uppercase text-sm rounded-lg transition-all hover:-translate-y-1 ${type.style}`}
              >
                <ChevronRight className="w-4 h-4" />
                {type.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIAL ===== */}
      <section className="py-20 px-4 bg-blue-50">
        <div className="mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-blue-100">
            <div className="text-5xl font-bold text-blue-600 mb-4">&ldquo;</div>
            <blockquote className="text-xl lg:text-2xl font-semibold text-gray-900 leading-tight mb-8">
              JuniorPortal mi pomohol nájsť prvú prácu ako frontend developer. Bez skúseností som
              neveril, že to je možné.
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-600 text-white flex items-center justify-center font-bold text-lg rounded-lg">
                MK
              </div>
              <div>
                <div className="font-bold text-gray-900 uppercase">Martin K.</div>
                <div className="text-sm text-gray-600">Frontend Developer @ StartupX</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-block bg-white text-blue-600 px-4 py-2 text-sm font-semibold uppercase tracking-wider rounded mb-6">
            Ešte váhaš?
          </div>
          <h2 className="text-3xl lg:text-6xl font-bold text-white leading-tight">
            ZAČNI <span className="text-yellow-300">DNES</span>
          </h2>
          <p className="mt-4 text-blue-100 text-lg max-w-lg mx-auto">
            Registrácia je zadarmo. Žiadne skryté poplatky. Iba príležitosti.
          </p>
          <div className="mt-10">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-3 bg-white text-blue-600 font-bold uppercase text-lg px-12 py-5 rounded-lg shadow-lg hover:bg-gray-100 transition-all transform hover:-translate-y-1"
            >
              REGISTRUJ SA <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-900 text-white px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <h3 className="font-bold uppercase text-blue-400 mb-4 text-sm">Portál</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link href="/jobs" className="hover:text-white transition-colors">Ponuky práce</Link></li>
                <li><Link href="/cv" className="hover:text-white transition-colors">CV Builder</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Cenník</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold uppercase text-blue-400 mb-4 text-sm">Spoločnosť</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link href="/contact" className="hover:text-white transition-colors">Kontakt</Link></li>
                <li><Link href="/profile" className="hover:text-white transition-colors">Profil</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold uppercase text-blue-400 mb-4 text-sm">DajFlek.sk</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Portál pre juniorov, stážistov a absolventov. Nájdi svoju prvú prácu.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-bold uppercase text-white text-sm">Junior<span className="text-blue-400">Portal</span></div>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} DajFlek.sk &mdash; Všetky práva vyhradené
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ===== DATA ===== */

const stats = [
  { value: '2 400+', label: 'Aktívnych ponúk', icon: Briefcase },
  { value: '850+', label: 'Juniorov zamestnaných', icon: Users },
  { value: '120+', label: 'Overených firiem', icon: Building2 },
  { value: '94%', label: 'Spokojnosť', icon: Star },
];

const steps = [
  {
    title: 'Vytvor profil',
    description: 'Zaregistruj sa, pridaj skills a vzdelanie. Žiadne dlhé formuláre.',
    icon: FileText,
  },
  {
    title: 'Prezeraj ponuky',
    description: 'Filtruj podľa lokality, tech stacku a úrovne skúseností.',
    icon: Search,
  },
  {
    title: 'Reaguj a získaj prácu',
    description: 'Pošli prihlášku jedným klikom. Firma sa ti ozve do 48 hodín.',
    icon: TrendingUp,
  },
];

const features = [
  {
    title: 'Len pre juniorov',
    description: 'Žiadne seniorské pozície. Všetko je pre teba.',
    icon: GraduationCap,
  },
  {
    title: 'Overené firmy',
    description: 'Každá firma je skontrolovaná pred zverejnením.',
    icon: Shield,
  },
  {
    title: 'CV Builder',
    description: 'Vytvor si profesionálne CV priamo v portáli.',
    icon: FileText,
  },
  {
    title: 'Skill Matching',
    description: 'AI odporúčania na základe tvojich zručností.',
    icon: Code2,
  },
];

const jobTypes = [
  { label: 'Frontend', style: 'bg-[#DCEF62] text-black shadow-[4px_4px_0_#000]' },
  { label: 'Backend', style: 'bg-white text-black shadow-[4px_4px_0_#000]' },
  { label: 'Fullstack', style: 'bg-[#644AE9] text-white shadow-[4px_4px_0_#000]' },
  { label: 'DevOps', style: 'bg-[#000] text-[#DCEF62] shadow-[4px_4px_0_#644AE9]' },
  { label: 'Data', style: 'bg-[#DCEF62] text-black shadow-[4px_4px_0_#000]' },
  { label: 'Mobile', style: 'bg-white text-black shadow-[4px_4px_0_#000]' },
  { label: 'UI/UX', style: 'bg-[#644AE9] text-white shadow-[4px_4px_0_#000]' },
  { label: 'Stáž', style: 'bg-[#000] text-[#DCEF62] shadow-[4px_4px_0_#644AE9]' },
];