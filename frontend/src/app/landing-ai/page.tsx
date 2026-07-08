'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Brain,
  Sparkles,
  Target,
  Layers,
  BarChart3,
  MessageSquare,
  Zap,
  ChevronRight,
  Bot,
  TrendingUp,
  Briefcase,
  ArrowRight,
} from 'lucide-react';

const heroWords = ['prácu', 'kariéru', 'budúcnosť'];

const recommendedJobs = [
  {
    title: 'Junior Frontend Developer',
    company: 'TechFlow s.r.o.',
    location: 'Bratislava',
    match: 94,
    tags: ['React', 'TypeScript', 'Tailwind'],
    reason: 'Zodpovedá tvojim zručnostiam v Reacte a TypeScripte',
  },
  {
    title: 'Stážista – Data Analyst',
    company: 'DataSphere',
    location: 'Košice',
    match: 87,
    tags: ['Python', 'SQL', 'Excel'],
    reason: 'Tvoj profil zodpovedá požiadavkám na analytické myslenie',
  },
  {
    title: 'Junior UI/UX Designer',
    company: 'CreativeMinds',
    location: 'Remote',
    match: 81,
    tags: ['Figma', 'CSS', 'Design Systems'],
    reason: 'Zaujímavá zhoda s tvojim portfóliom a preferenciami',
  },
];

const steps = [
  {
    icon: Brain,
    title: 'Analyzujeme profil',
    description: 'Naše AI skenuje tvoje zručnosti, vzdelanie, projekty a preferencie, aby pochopilo tvoj unikátny profil.',
  },
  {
    icon: Target,
    title: 'Porovnávame zručnosti',
    description: 'Porovnávame tvoj profil s tisíckami pracovných ponúk a hodnotíme mieru zhody na základe viacerých faktorov.',
  },
  {
    icon: Sparkles,
    title: 'Odporúčame',
    description: 'Dostaneš个人izované odporúčania s vysvetlením, prečo ti daná ponuka vyhovuje a aká je šanca na úspech.',
  },
];

const features = [
  {
    icon: Zap,
    title: 'AI Matching',
    description: 'Inteligentné porovnávanie tvojho profilu s pracovnými ponukami na základe zručností, skúseností a potenciálu.',
  },
  {
    icon: Layers,
    title: 'Smart Filter',
    description: 'Automatické filtrovanie ponúk podľa tvojej úrovne, lokalita, typ spolupráce a ďalších preferencií.',
  },
  {
    icon: BarChart3,
    title: 'Personalized Dashboard',
    description: 'Prehľadný panel s personalizovanými štatistikami, odporúčaniami a pokrokom vo vyhľadávaní.',
  },
];

export default function LandingAiPage() {
  const [heroWordIndex, setHeroWordIndex] = useState(0);
  const [heroWordCharIndex, setHeroWordCharIndex] = useState(0);
  const [heroWordDeleting, setHeroWordDeleting] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);

  useEffect(() => {
    const currentWord = heroWords[heroWordIndex];
    const timeout = heroWordDeleting ? 60 : 100;

    if (!heroWordDeleting && heroWordCharIndex === currentWord.length) {
      setTimeout(() => setHeroWordDeleting(true), 1800);
      return;
    }

    if (heroWordDeleting && heroWordCharIndex === 0) {
      setHeroWordDeleting(false);
      setHeroWordIndex((prev) => (prev + 1) % heroWords.length);
      return;
    }

    const timer = setTimeout(() => {
      setHeroWordCharIndex((prev) => prev + (heroWordDeleting ? -1 : 1));
    }, timeout);

    return () => clearTimeout(timer);
  }, [heroWordCharIndex, heroWordDeleting, heroWordIndex]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      <style>{`
        @keyframes neuralPulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.6; }
        }
        @keyframes neuralFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(100, 74, 233, 0.3); }
          50% { box-shadow: 0 0 40px rgba(100, 74, 233, 0.6), 0 0 60px rgba(220, 239, 98, 0.2); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes scanLine {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 8s ease infinite;
        }
        .neural-dot {
          animation: neuralFloat 4s ease-in-out infinite;
        }
        .glow-card {
          animation: glowPulse 3s ease-in-out infinite;
        }
        .scan-line::after {
          content: '';
          position: absolute;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #644AE9, transparent);
          animation: scanLine 3s linear infinite;
        }
      `}</style>

      {/* Neural Network Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0a1a] to-[#0a0a0f] animate-gradient opacity-80" />
        {/* Neural dots */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#644AE9] neural-dot"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          />
        ))}
        {/* Neural lines (CSS pseudo-element approach via SVG) */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <line x1="10%" y1="20%" x2="25%" y2="35%" stroke="#644AE9" strokeWidth="0.5" />
          <line x1="25%" y1="35%" x2="15%" y2="50%" stroke="#644AE9" strokeWidth="0.5" />
          <line x1="70%" y1="15%" x2="85%" y2="30%" stroke="#644AE9" strokeWidth="0.5" />
          <line x1="85%" y1="30%" x2="75%" y2="50%" stroke="#644AE9" strokeWidth="0.5" />
          <line x1="40%" y1="60%" x2="60%" y2="75%" stroke="#644AE9" strokeWidth="0.5" />
          <line x1="60%" y1="75%" x2="50%" y2="90%" stroke="#644AE9" strokeWidth="0.5" />
          <line x1="30%" y1="45%" x2="50%" y2="30%" stroke="#DCEF62" strokeWidth="0.3" />
          <line x1="65%" y1="40%" x2="80%" y2="55%" stroke="#DCEF62" strokeWidth="0.3" />
          <line x1="20%" y1="70%" x2="35%" y2="85%" stroke="#DCEF62" strokeWidth="0.3" />
          <line x1="55%" y1="20%" x2="70%" y2="35%" stroke="#DCEF62" strokeWidth="0.3" />
          <line x1="45%" y1="50%" x2="65%" y2="40%" stroke="#644AE9" strokeWidth="0.3" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#644AE9]/20 border border-[#644AE9]/30 text-[#DCEF62] text-sm font-medium mb-8" style={{ animation: 'slideUp 0.6s ease-out' }}>
              <Bot className="w-4 h-4" />
              AI-Powered Job Matching
            </div>

            {/* Branding */}
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6" style={{ animation: 'slideUp 0.6s ease-out 0.1s both' }}>
              JuniorPortal
            </h1>

            {/* Headline with typing effect */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6" style={{ animation: 'slideUp 0.6s ease-out 0.2s both' }}>
              Nájdi svoju prvú{' '}
              <span className="text-[#644AE9] relative inline-block">
                <span>{heroWords[heroWordIndex].slice(0, heroWordCharIndex)}</span>
                <span
                  className="inline-block w-[3px] h-[1em] bg-[#DCEF62] ml-1 align-middle"
                  style={{ animation: 'blink 0.8s step-end infinite' }}
                />
              </span>
            </h2>

            {/* Tagline */}
            <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10" style={{ animation: 'slideUp 0.6s ease-out 0.3s both' }}>
              Naše AI analyzuje tvoj profil a inteligentne porovnáva zručnosti s pracovnými ponukami — aby si našiel tú pravú prácu rýchlejšie.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center" style={{ animation: 'slideUp 0.6s ease-out 0.4s both' }}>
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#644AE9] text-white font-semibold text-lg hover:bg-[#5539d1] transition-all glow-card"
              >
                <Sparkles className="w-5 h-5" />
                Spustiť AI Matching
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white/80 font-medium text-lg hover:bg-white/5 hover:border-white/30 transition-all"
              >
                Prehľadať ponuky
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto" style={{ animation: 'slideUp 0.6s ease-out 0.5s both' }}>
              {[
                { value: '2,400+', label: 'Ponúk' },
                { value: '850+', label: 'Firiem' },
                { value: '94%', label: 'Spokojnosť' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl sm:text-3xl font-bold text-[#DCEF62]">{stat.value}</div>
                  <div className="text-sm text-white/40 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Recommendation Cards */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DCEF62]/10 border border-[#DCEF62]/20 text-[#DCEF62] text-sm font-medium mb-4">
                <Brain className="w-4 h-4 animate-pulse" />
                AI odporúča pre teba
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Tvoje personalizované ponuky</h2>
              <p className="text-white/50 max-w-xl mx-auto">
                Naše AI analyzovalo tvoj profil a našlo tieto ponuky s najvyššou mierou zhody.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedJobs.map((job, i) => (
                <div
                  key={i}
                  className="group relative bg-[#12121a] border border-white/10 rounded-2xl p-6 hover:border-[#644AE9]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(100,74,233,0.15)] scan-line overflow-hidden"
                  style={{ animation: `slideUp 0.6s ease-out ${0.1 + i * 0.15}s both` }}
                >
                  {/* Match percentage */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-[#644AE9]/10 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-[#644AE9]" />
                      </div>
                      <span className="text-xs text-white/40">{job.company}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCEF62]/10 border border-[#DCEF62]/20">
                      <TrendingUp className="w-3.5 h-3.5 text-[#DCEF62]" />
                      <span className="text-sm font-bold text-[#DCEF62]">{job.match}%</span>
                    </div>
                  </div>

                  {/* Job info */}
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-[#DCEF62] transition-colors">{job.title}</h3>
                  <p className="text-sm text-white/40 mb-3">{job.location}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-0.5 rounded-md bg-white/5 text-xs text-white/60 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* AI Reason */}
                  <div className="p-3 rounded-lg bg-[#644AE9]/5 border border-[#644AE9]/10">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-[#644AE9] mt-0.5 shrink-0" />
                      <p className="text-xs text-white/50 leading-relaxed">{job.reason}</p>
                    </div>
                  </div>

                  {/* Apply button */}
                  <Link
                    href="/jobs"
                    className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/5 text-white/70 text-sm font-medium hover:bg-[#644AE9]/20 hover:text-[#DCEF62] transition-all border border-transparent hover:border-[#644AE9]/30"
                  >
                    Zobraziť detail
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How AI Works */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0d0d15]">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#644AE9]/10 border border-[#644AE9]/20 text-[#644AE9] text-sm font-medium mb-4">
                <Bot className="w-4 h-4" />
                Ako AI funguje
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Inteligentný proces</h2>
              <p className="text-white/50 max-w-xl mx-auto">
                Pozri sa, ako naše AI pracuje za scénou, aby ti našlo tú najlepšiu prácu.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connection lines (desktop only) */}
              <div className="hidden md:block absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#644AE9]/30 to-transparent" />

              {steps.map((step, i) => (
                <div
                  key={i}
                  className="relative text-center group"
                  style={{ animation: `slideUp 0.6s ease-out ${0.1 + i * 0.2}s both` }}
                >
                  {/* Step number */}
                  <div className="relative mx-auto mb-6 w-20 h-20">
                    <div className="absolute inset-0 rounded-2xl bg-[#644AE9]/10 group-hover:bg-[#644AE9]/20 transition-all duration-300" />
                    <div className="absolute inset-0 rounded-2xl border border-[#644AE9]/20 group-hover:border-[#644AE9]/40 transition-all duration-300" />
                    <div className="relative flex items-center justify-center w-full h-full">
                      <step.icon className="w-8 h-8 text-[#644AE9]" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#0a0a0f] border border-[#644AE9]/30 flex items-center justify-center">
                      <span className="text-xs font-bold text-[#DCEF62]">{i + 1}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed max-w-xs mx-auto">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DCEF62]/10 border border-[#DCEF62]/20 text-[#DCEF62] text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                Funkcie
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Všetko čo potrebuješ</h2>
              <p className="text-white/50 max-w-xl mx-auto">
                Nástroje, ktoré ti pomôžu nájsť prácu rýchlejšie a efektívnejšie.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="relative p-6 rounded-2xl bg-[#12121a] border border-white/5 hover:border-[#DCEF62]/20 transition-all duration-300 group hover:shadow-[0_0_40px_rgba(220,239,98,0.05)]"
                  style={{ animation: `slideUp 0.6s ease-out ${0.1 + i * 0.15}s both` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#DCEF62]/10 flex items-center justify-center mb-5 group-hover:bg-[#DCEF62]/15 transition-colors">
                    <feature.icon className="w-6 h-6 text-[#DCEF62]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="relative rounded-3xl overflow-hidden p-10 sm:p-14 text-center bg-gradient-to-br from-[#644AE9]/20 via-[#0a0a0f] to-[#DCEF62]/10 border border-[#644AE9]/20">
              {/* Glow effects */}
              <div className="absolute top-0 left-1/4 w-48 h-48 rounded-full bg-[#644AE9]/20 blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full bg-[#DCEF62]/10 blur-3xl" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#644AE9]/20 border border-[#644AE9]/30 text-[#644AE9] text-sm font-medium mb-6">
                  <Brain className="w-4 h-4 animate-pulse" />
                  Pripravený na AI Matching?
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Nechaj AI nájsť tvoju vysnívanú prácu
                </h2>
                <p className="text-white/50 max-w-lg mx-auto mb-8">
                  Zaregistruj sa zadarmo, vyplň profil a nechaj naše AI, aby našlo ponuky, ktoré ti skutočne sadnú.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/auth/register"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#DCEF62] text-[#0a0a0f] font-bold text-lg hover:bg-[#c8db4d] transition-all shadow-[0_0_30px_rgba(220,239,98,0.3)]"
                  >
                    <Sparkles className="w-5 h-5" />
                    Zaregistrovať sa zadarmo
                  </Link>
                  <Link
                    href="/jobs"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white/80 font-medium text-lg hover:bg-white/5 transition-all"
                  >
                    Prehľadať ponuky
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 px-4 sm:px-6 lg:px-8 border-t border-white/5">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#644AE9] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg">JuniorPortal</span>
              </div>
              <div className="flex items-center gap-6 text-sm text-white/40">
                <Link href="/contact" className="hover:text-white/60 transition-colors">Kontakt</Link>
                <Link href="/pricing" className="hover:text-white/60 transition-colors">Cenník</Link>
                <Link href="/jobs" className="hover:text-white/60 transition-colors">Ponuky</Link>
              </div>
              <p className="text-xs text-white/30">
                © 2026 JuniorPortal (DajFlek.sk). Všetky práva vyhradené.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Floating AI Chat Button */}
      <button
        onClick={() => setAiChatOpen(!aiChatOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#644AE9] flex items-center justify-center shadow-[0_0_30px_rgba(100,74,233,0.5)] hover:shadow-[0_0_50px_rgba(100,74,233,0.7)] transition-all hover:scale-105"
        style={{ animation: 'glowPulse 2s ease-in-out infinite' }}
      >
        {aiChatOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <MessageSquare className="w-6 h-6 text-white" />
        )}
      </button>

      {/* AI Chat Window */}
      {aiChatOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-[#12121a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          style={{ animation: 'slideUp 0.3s ease-out' }}
        >
          {/* Chat header */}
          <div className="p-4 bg-[#644AE9]/20 border-b border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#644AE9] flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">AI Asistent</h3>
              <p className="text-xs text-white/40 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Online
              </p>
            </div>
          </div>

          {/* Chat messages */}
          <div className="p-4 space-y-3 max-h-72 overflow-y-auto">
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-[#644AE9]/20 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5 text-[#644AE9]" />
              </div>
              <div className="bg-white/5 rounded-xl rounded-tl-none px-3 py-2 text-sm text-white/70">
                Ahoj! Som tvoj AI asistent. Pomôžem ti nájsť prácu, ktorá sadne tvojim zručnostiam. Čo hľadáš?
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <div className="bg-[#644AE9]/30 rounded-xl rounded-tr-none px-3 py-2 text-sm text-white/80">
                Hľadám junior pozíciu v Reacte
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-[#644AE9]/20 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5 text-[#644AE9]" />
              </div>
              <div className="bg-white/5 rounded-xl rounded-tl-none px-3 py-2 text-sm text-white/70">
                Skvelé! Našiel som pre teba 5 pozícií s nad 85% zhodou. <span className="text-[#DCEF62]">Pozri odporúčania hore ↑</span>
              </div>
            </div>
          </div>

          {/* Chat input */}
          <div className="p-3 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Napíš správu..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#644AE9]/50"
              />
              <button className="px-3 py-2 rounded-lg bg-[#644AE9] text-white text-sm font-medium hover:bg-[#5539d1] transition-colors">
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
