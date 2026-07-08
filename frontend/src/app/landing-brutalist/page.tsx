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
  Terminal,
  Bug,
  GitBranch,
  Cpu,
} from 'lucide-react';

export default function LandingBrutalistPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-[#00ff41] font-mono">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden border-b-2 border-[#00ff41]/30 px-4 py-20 sm:py-28">
        <div className="absolute top-8 left-8 text-[#00ff41]/5 text-[6rem] font-mono leading-none select-none pointer-events-none whitespace-pre">
{`  _    _      _            
 | |  | |    (_)           
 | |  | | ___ _ _ __   ___ 
 | |/\\| |/ __| | '_ \\ / _ \\
 \\  /\\  /\\__ \\ | | | |  __/
  \\/  \\/ |___/_|_| |_|\\___|`}
        </div>

        <div className="mx-auto max-w-6xl relative">
          <div className="mb-6 inline-flex items-center gap-2 border border-[#00ff41]/40 bg-[#00ff41]/5 px-3 py-1 text-xs uppercase tracking-widest">
            <Terminal className="w-3 h-3" />
            <span className="text-[#00ff41]">&#36; ./dajflek.sh &mdash; mode=junior</span>
          </div>

          <div className="mb-4 text-xs text-[#00ff41]/50 tracking-wide">
            <span className="text-[#00ff41]">&#36;</span> cat /etc/junior-portal | grep --color=always &apos;mission&apos;
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold uppercase leading-[0.85] tracking-tight">
            <span className="block text-white">JUNIOR</span>
            <span className="block text-[#00ff41]">PORTAL</span>
          </h1>

          <div className="mt-2 mb-8 h-[2px] w-full max-w-md bg-gradient-to-r from-[#00ff41] to-transparent" />

          <div className="mt-8 sm:mt-10 max-w-xl">
            <div className="flex items-start gap-2">
              <span className="text-[#00ff41] shrink-0 mt-1">&#36;</span>
              <div>
                <p className="text-white font-bold uppercase text-lg sm:text-xl leading-tight">
                  Nájdi svoju prvú prácu v IT
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  #junior #stáž #absolvent &mdash; iba overené firmy. žiadne BS.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 bg-[#00ff41] text-black font-bold uppercase text-sm px-8 py-4 border border-[#00ff41] hover:bg-[#00ff41]/90 transition-all"
            >
              <span className="text-black">&#62;</span> ZAČAŤ <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 bg-transparent text-[#00ff41] font-bold uppercase text-sm px-8 py-4 border border-[#00ff41] hover:bg-[#00ff41]/10 transition-all"
            >
              <span className="text-[#00ff41]">&#62;</span> PREZRIEŤ PONUKY
            </Link>
          </div>

          <div className="mt-8 text-[10px] text-gray-600 font-mono">
            <span className="text-[#00ff41]">&#36;</span> git log --oneline -1<br />
            <span className="text-gray-500">a1b2c3d</span> <span className="text-white">INIT:</span> junior portal ready to deploy
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="border-b border-[#00ff41]/30 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-xs text-gray-600">
            <span className="text-[#00ff41]">&#36;</span> ./metrics --live
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-black border border-[#00ff41]/30 p-5 hover:border-[#00ff41] transition-colors"
              >
                <div className="text-xs text-gray-600 mb-1">{'>>'} {stat.label.toLowerCase().replace(/ /g, '_')}</div>
                <div className="text-3xl sm:text-4xl font-bold text-[#00ff41]">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="border-b border-[#00ff41]/30 px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 text-xs text-gray-600">
            <span className="text-[#00ff41]">&#36;</span> cat docs/PIPELINE.md
          </div>
          <div className="mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold uppercase text-white tracking-tight">
              DEPLOYMENT<span className="text-[#00ff41]">_PIPELINE</span>
            </h2>
            <div className="mt-2 h-[2px] w-32 bg-[#00ff41]" />
          </div>

          <div className="space-y-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-black border border-[#00ff41]/20 p-5 hover:border-[#00ff41]/50 transition-colors"
              >
                <div className="shrink-0 w-10 h-10 bg-[#00ff41]/10 border border-[#00ff41]/40 flex items-center justify-center text-[#00ff41] font-bold text-sm">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <step.icon className="w-4 h-4 text-[#00ff41]" strokeWidth={2} />
                    <span className="font-bold uppercase text-white text-sm">{step.title}</span>
                  </div>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>
                <div className="hidden sm:block text-xs text-gray-600 shrink-0 mt-1 font-mono">
                  {step.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="border-b border-[#00ff41]/30 px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 text-xs text-gray-600">
            <span className="text-[#00ff41]">&#36;</span> grep -rn &apos;feature&apos; src/
          </div>
          <div className="mb-10 text-right">
            <h2 className="text-2xl sm:text-4xl font-bold uppercase text-white tracking-tight">
              WHY_<span className="text-[#00ff41]">US</span>
            </h2>
            <div className="mt-2 h-[2px] w-32 bg-[#00ff41] ml-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-black border border-[#00ff41]/20 p-6 hover:border-[#00ff41]/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 bg-[#00ff41]/10 w-10 h-10 flex items-center justify-center border border-[#00ff41]/40">
                    <feature.icon className="w-5 h-5 text-[#00ff41]" strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-gray-600 mb-0.5"># {i + 1}</div>
                    <h3 className="font-bold uppercase text-white text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== JOB TYPES ===== */}
      <section className="border-b border-[#00ff41]/30 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 text-xs text-gray-600">
            <span className="text-[#00ff41]">&#36;</span> ls -la /positions/ | head -8
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold uppercase text-white mb-8 tracking-tight">
            AVAILABLE_<span className="text-[#00ff41]">POSITIONS</span>
          </h2>

          <div className="flex flex-wrap gap-3">
            {jobTypes.map((type, i) => (
              <Link
                key={i}
                href={`/jobs?type=${type.label.toLowerCase().replace(/\s+/g, '-')}`}
                className={`inline-flex items-center gap-2 border px-4 py-2.5 font-bold uppercase text-xs transition-all hover:bg-[#00ff41] hover:text-black ${type.style}`}
              >
                <span className="text-inherit opacity-50">&#62;</span>
                {type.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIAL ===== */}
      <section className="border-b border-[#00ff41]/30 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 text-xs text-gray-600">
            <span className="text-[#00ff41]">&#36;</span> cat testimonials/martin_k.log
          </div>
          <div className="bg-black border border-[#00ff41]/30 p-6 sm:p-10">
            <div className="mb-2 text-xs text-gray-600">LOG ENTRY: 2026-03-15 / USER: martin_k / STATUS: hired</div>
            <div className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
              <span className="text-[#00ff41] font-bold">INFO:</span> &ldquo;JuniorPortal mi pomohol nájsť prvú prácu ako frontend developer. Bez skúseností som neveril, že to je možné.&rdquo;
            </div>
            <div className="mt-4 flex items-center gap-3 border-t border-[#00ff41]/20 pt-4">
              <div className="w-10 h-10 bg-[#00ff41] text-black flex items-center justify-center font-bold text-sm">
                MK
              </div>
              <div>
                <div className="font-bold text-white text-xs uppercase">Martin K.</div>
                <div className="text-xs text-gray-500 font-mono">Frontend Developer @ StartupX / hired: YES</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 text-xs text-gray-600">
            <span className="text-[#00ff41]">&#36;</span> ./register.sh --help
          </div>
          <div className="inline-block border border-[#00ff41]/40 bg-[#00ff41]/5 px-3 py-1 text-[#00ff41] text-xs uppercase tracking-widest mb-4">
            USAGE: ./register.sh [options]
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold uppercase text-white leading-[0.9] tracking-tight">
            RUN: <span className="text-[#00ff41]">./register.sh</span>
          </h2>
          <p className="mt-4 text-gray-500 text-sm max-w-lg mx-auto">
            Flags: --free --no-hidden-fees --only-opportunities
          </p>
          <div className="mt-10">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-3 bg-[#00ff41] text-black font-bold uppercase text-base px-10 py-4 border border-[#00ff41] hover:bg-[#00ff41]/90 transition-all"
            >
              <span className="text-black font-mono">&#36;</span> REGISTRUJ SA <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-[#00ff41]/30 bg-black px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 text-[10px] text-gray-700 font-mono">
            <span className="text-[#00ff41]">&#36;</span> cat /etc/dajflek/footer.cfg
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold uppercase text-[#00ff41] mb-3 text-xs tracking-wider">[portal]</h3>
              <ul className="space-y-1.5 text-xs font-mono text-gray-500">
                <li><Link href="/jobs" className="hover:text-[#00ff41] transition-colors">./jobs --list</Link></li>
                <li><Link href="/cv" className="hover:text-[#00ff41] transition-colors">./cv --build</Link></li>
                <li><Link href="/pricing" className="hover:text-[#00ff41] transition-colors">./pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold uppercase text-[#00ff41] mb-3 text-xs tracking-wider">[company]</h3>
              <ul className="space-y-1.5 text-xs font-mono text-gray-500">
                <li><Link href="/contact" className="hover:text-[#00ff41] transition-colors">./contact</Link></li>
                <li><Link href="/profile" className="hover:text-[#00ff41] transition-colors">./profile --view</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold uppercase text-[#00ff41] mb-3 text-xs tracking-wider">[dajflek.sk]</h3>
              <p className="text-xs font-mono text-gray-500 leading-relaxed">
                Portál pre juniorov, stážistov a absolventov v IT. Nájdi svoju prvú prácu.
              </p>
            </div>
          </div>
          <div className="border-t border-[#00ff41]/20 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="font-bold uppercase text-white text-xs tracking-wider">
              JUNIOR<span className="text-[#00ff41]">PORTAL</span>
            </div>
            <div className="text-[10px] font-mono text-gray-700">
              &copy; {new Date().getFullYear()} DajFlek.sk &mdash; MIT LICENSE / ALL RIGHTS RESERVED
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ===== DATA ===== */

const stats = [
  { value: '2 400+', label: 'Aktívnych ponúk' },
  { value: '850+', label: 'Juniorov zamestnaných' },
  { value: '120+', label: 'Overených firiem' },
  { value: '94%', label: 'Spokojnosť' },
];

const steps = [
  {
    title: 'Registrácia',
    description: 'Zaregistruj sa, pridaj skills a vzdelanie. Žiadne dlhé formuláre.',
    icon: Terminal,
    status: '[DEPLOY: init]',
  },
  {
    title: 'Match',
    description: 'Filtruj podľa lokality, tech stacku a úrovne skúseností.',
    icon: GitBranch,
    status: '[DEPLOY: build]',
  },
  {
    title: 'Deploy',
    description: 'Pošli prihlášku jedným klikom. Firma sa ti ozve do 48 hodín.',
    icon: Bug,
    status: '[DEPLOY: done]',
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
    icon: Cpu,
  },
];

const jobTypes = [
  { label: 'Frontend', style: 'bg-[#00ff41] text-black border-[#00ff41]' },
  { label: 'Backend', style: 'bg-transparent text-[#00ff41] border-[#00ff41]/50 hover:bg-[#00ff41] hover:text-black' },
  { label: 'Fullstack', style: 'bg-[#00ff41]/20 text-[#00ff41] border-[#00ff41]/50 hover:bg-[#00ff41] hover:text-black' },
  { label: 'DevOps', style: 'bg-transparent text-[#00ff41] border-[#00ff41]/50 hover:bg-[#00ff41] hover:text-black' },
  { label: 'Data', style: 'bg-[#00ff41]/10 text-[#00ff41] border-[#00ff41]/50 hover:bg-[#00ff41] hover:text-black' },
  { label: 'Mobile', style: 'bg-transparent text-[#00ff41] border-[#00ff41]/50 hover:bg-[#00ff41] hover:text-black' },
  { label: 'UI/UX', style: 'bg-[#00ff41]/20 text-[#00ff41] border-[#00ff41]/50 hover:bg-[#00ff41] hover:text-black' },
  { label: 'Stáž', style: 'bg-transparent text-[#00ff41] border-[#00ff41]/50 hover:bg-[#00ff41] hover:text-black' },
];
