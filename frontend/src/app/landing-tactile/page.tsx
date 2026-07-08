'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Search,
  CheckCircle,
  Rocket,
  Star,
  TrendingUp,
  Users,
  Zap,
  Heart,
  Target,
  Award,
  ArrowRight,
  ChevronRight,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function LandingTactile() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0f0a14] text-white overflow-hidden relative">
      {/* Background texture */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(100,74,233,0.1) 10px, rgba(100,74,233,0.1) 11px)`,
        }}
      />

      {/* Floating decorative dots */}
      <div className="fixed top-20 left-10 w-3 h-3 rounded-full bg-[#644AE9] opacity-40 animate-pulse" />
      <div className="fixed top-40 right-20 w-2 h-2 rounded-full bg-[#DCEF62] opacity-50 animate-pulse" style={{ animationDelay: '75ms' }} />
      <div className="fixed bottom-32 left-1/4 w-4 h-4 rounded-full bg-[#FF6B35] opacity-30 animate-pulse" style={{ animationDelay: '150ms' }} />
      <div className="fixed top-1/3 left-1/3 w-2 h-2 rounded-full bg-[#06D6A0] opacity-40 animate-pulse" style={{ animationDelay: '100ms' }} />
      <div className="fixed bottom-20 right-1/3 w-3 h-3 rounded-full bg-[#644AE9] opacity-25 animate-pulse" style={{ animationDelay: '200ms' }} />

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#644AE9] to-[#FF6B35] flex items-center justify-center shadow-lg shadow-[#644AE9]/30 group-hover:shadow-[#644AE9]/50 transition-shadow">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#DCEF62] border-2 border-[#0f0a14]" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#DCEF62] to-[#644AE9] bg-clip-text text-transparent">
              JuniorPortal
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#" className="text-gray-400 hover:text-[#DCEF62] transition-colors text-sm">Pre firmy</Link>
            <Link href="#" className="text-gray-400 hover:text-[#DCEF62] transition-colors text-sm">Ako funguje</Link>
            <Link href="#" className="text-gray-400 hover:text-[#DCEF62] transition-colors text-sm">Blog</Link>
            <Link href="#" className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#644AE9] to-[#FF6B35] text-white text-sm font-semibold hover:shadow-lg hover:shadow-[#644AE9]/40 transition-all hover:scale-105">
              Prihlásiť sa
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-32">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] opacity-20"
          style={{ background: 'linear-gradient(135deg, #644AE9, #FF6B35)', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', filter: 'blur(60px)' }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] opacity-15"
          style={{ background: 'linear-gradient(45deg, #DCEF62, #06D6A0)', borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', filter: 'blur(40px)' }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DCEF62]/10 border border-[#DCEF62]/30 mb-8 shadow-lg shadow-[#DCEF62]/10">
              <Sparkles className="w-4 h-4 text-[#DCEF62]" />
              <span className="text-[#DCEF62] text-sm font-medium">#1 portál pre juniorov na Slovensku</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              <span className="bg-gradient-to-r from-[#DCEF62] via-[#644AE9] to-[#FF6B35] bg-clip-text text-transparent">Nájdi svoju</span>
              <br />
              <span className="bg-gradient-to-r from-[#FF6B35] via-[#06D6A0] to-[#644AE9] bg-clip-text text-transparent">prvú prácu</span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
              JuniorPortal spája talenty s firmami, ktoré hľadajú čerstvých absolventov a šikovných juniorov. Jednoducho, rýchlo a zadarmo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#" className="group px-8 py-4 rounded-full bg-gradient-to-r from-[#644AE9] to-[#FF6B35] text-white font-bold text-lg flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-[#644AE9]/40 transition-all hover:scale-105">
                Prehľadávať ponuky
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#" className="px-8 py-4 rounded-full border-2 border-[#DCEF62]/40 text-[#DCEF62] font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#DCEF62]/10 transition-all">
                Som firma
              </Link>
            </div>
          </div>

          {/* Floating decorative elements */}
          <div className="absolute top-10 right-10 hidden lg:block">
            <div
              className="w-32 h-32 bg-gradient-to-br from-[#644AE9]/30 to-[#FF6B35]/30 flex items-center justify-center shadow-2xl shadow-[#644AE9]/20 border border-white/10"
              style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', transform: 'rotate(12deg)' }}
            >
              <Briefcase className="w-12 h-12 text-[#DCEF62]" />
            </div>
          </div>
          <div className="absolute bottom-20 right-40 hidden lg:block">
            <div
              className="w-24 h-24 bg-gradient-to-br from-[#06D6A0]/30 to-[#DCEF62]/30 flex items-center justify-center shadow-2xl shadow-[#06D6A0]/20 border border-white/10"
              style={{ borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%', transform: 'rotate(-8deg)' }}
            >
              <Star className="w-8 h-8 text-[#FF6B35]" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '2,500+', label: 'Ponúk práce', icon: Briefcase, color: '#644AE9' },
              { value: '15,000+', label: 'Juniorov', icon: Users, color: '#FF6B35' },
              { value: '850+', label: 'Firiem', icon: CheckCircle, color: '#06D6A0' },
              { value: '92%', label: 'Úspešnosť', icon: TrendingUp, color: '#DCEF62' },
            ].map((stat, i) => (
              <div
                key={i}
                className="relative p-6 rounded-3xl group hover:scale-105 transition-transform duration-300"
                style={{ background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}05)`, border: `1px solid ${stat.color}30` }}
              >
                <div
                  className="absolute top-0 right-0 w-16 h-16 opacity-20"
                  style={{ background: `linear-gradient(135deg, ${stat.color}, transparent)`, borderRadius: '0 24px 0 40px' }}
                />
                <stat.icon className="w-8 h-8 mb-3" style={{ color: stat.color }} />
                <div
                  className="text-3xl md:text-4xl font-extrabold mb-1"
                  style={{ background: `linear-gradient(135deg, ${stat.color}, #fff)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  {stat.value}
                </div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative px-6 py-24">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10"
          style={{ background: 'linear-gradient(45deg, #644AE9, #DCEF62)', borderRadius: '40% 60% 60% 40% / 40% 40% 60% 60%', filter: 'blur(80px)' }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-[#DCEF62] to-[#644AE9] bg-clip-text text-transparent">Ako to funguje</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Jednoduché kroky k tvojej vysnívanej kariére</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Vytvor profil', description: 'Zaregistruj sa a vytvor si profil, ktorý ukáže tvoje zručnosti a skúsenosti.', icon: Target, color: '#644AE9' },
              { step: '02', title: 'Prehľadávaj ponuky', description: 'Prezri si stovky ponúk od firiem, ktoré hľadajú práve teba.', icon: Search, color: '#FF6B35' },
              { step: '03', title: 'Získaj prácu', description: 'Pošli žiadosť, absolvuj pohovor a začni svoju kariéru.', icon: Rocket, color: '#06D6A0' },
            ].map((item, i) => (
              <div
                key={i}
                className="relative group"
                onMouseEnter={() => setHoveredStep(i)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div
                  className="relative p-8 rounded-3xl border border-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/20"
                  style={{ background: `linear-gradient(135deg, ${item.color}10, ${item.color}05)`, transform: hoveredStep === i ? 'translateY(-8px)' : 'translateY(0)' }}
                >
                  <div
                    className="absolute -top-3 -left-3 w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-xl border-2 border-white/20"
                    style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}aa)`, color: 'white' }}
                  >
                    {item.step}
                  </div>
                  <div className="absolute top-4 right-4 flex gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                    <div className="w-2 h-2 rounded-full opacity-60" style={{ background: item.color }} />
                    <div className="w-2 h-2 rounded-full opacity-30" style={{ background: item.color }} />
                  </div>
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 mt-4 shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${item.color}40, ${item.color}20)`, border: `1px solid ${item.color}50` }}
                  >
                    <item.icon className="w-7 h-7" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                  <div
                    className="absolute bottom-0 left-8 right-8 h-1 rounded-full opacity-30"
                    style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-6 py-24">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #644AE9 1px, transparent 1px), radial-gradient(circle at 80% 50%, #FF6B35 1px, transparent 1px), radial-gradient(circle at 50% 80%, #06D6A0 1px, transparent 1px)`,
            backgroundSize: '60px 60px, 80px 80px, 70px 70px',
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-[#FF6B35] to-[#06D6A0] bg-clip-text text-transparent">Prečo JuniorPortal?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Všetko, čo potrebuješ na štart svojej kariéry</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Filtre podľa odvetvia', description: 'Nájdite prácu presne v odvetví, ktoré vás zaujíma.', icon: Search, color: '#644AE9' },
              { title: 'Hodnotenie firiem', description: 'Prečítajte si reálne recenzie od zamestnancov.', icon: Star, color: '#DCEF62' },
              { title: 'Kariérny poradca', description: 'AI-powered tipy na zlepšenie profilu a CV.', icon: Zap, color: '#FF6B35' },
              { title: 'Notifikácie', description: 'Buďte informovaní o nových ponukách ako prví.', icon: Heart, color: '#06D6A0' },
              { title: 'Mentoring program', description: 'Spojte sa s skúsenými profesionálmi z odvetvia.', icon: Award, color: '#644AE9' },
              { title: 'Skill tracking', description: 'Sledujte svoj pokrok a rozvoj zručností.', icon: TrendingUp, color: '#FF6B35' },
            ].map((feature, i) => (
              <div
                key={i}
                className="relative group p-6 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${feature.color}08, ${feature.color}03)` }}
              >
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${feature.color}20, transparent 50%)` }}
                />
                <div
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full opacity-30 group-hover:opacity-60 transition-opacity"
                  style={{ background: `linear-gradient(135deg, ${feature.color}, transparent)` }}
                />
                <div className="relative z-10">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${feature.color}30, ${feature.color}10)`, border: `1px solid ${feature.color}40` }}
                  >
                    <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
                <div
                  className="absolute bottom-3 right-3 w-6 h-6 rounded-lg opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ background: feature.color, transform: 'rotate(45deg)' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Preview */}
      <section className="relative px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-[#06D6A0] to-[#DCEF62] bg-clip-text text-transparent">Najnovšie ponuky</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Pozrite sa na najnovšie príležitosti pre juniorov</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { company: 'TechStartup s.r.o.', role: 'Junior Frontend Developer', location: 'Bratislava', type: 'Full-time', salary: '€1,200 - €1,800', tags: ['React', 'TypeScript', 'Tailwind'], color: '#644AE9' },
              { company: 'DataFlow a.s.', role: 'Junior Data Analyst', location: 'Košice', type: 'Remote', salary: '€1,400 - €2,000', tags: ['Python', 'SQL', 'Tableau'], color: '#FF6B35' },
              { company: 'DesignStudio', role: 'Junior UI/UX Designer', location: 'Banská Bystrica', type: 'Hybrid', salary: '€1,100 - €1,600', tags: ['Figma', 'Adobe XD', 'Prototyping'], color: '#06D6A0' },
            ].map((job, i) => (
              <div
                key={i}
                className="relative p-6 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 group hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${job.color}10, ${job.color}05)` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${job.color}40, ${job.color}20)`, border: `1px solid ${job.color}50` }}
                  >
                    <Briefcase className="w-6 h-6" style={{ color: job.color }} />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: `${job.color}20`, color: job.color, border: `1px solid ${job.color}40` }}>
                    {job.type}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{job.role}</h3>
                <p className="text-gray-500 text-sm mb-4">{job.company}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{job.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{job.type}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tags.map((tag, j) => (
                    <span key={j} className="px-2 py-1 rounded-lg text-xs font-medium bg-white/5 text-gray-300 border border-white/10">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold" style={{ color: job.color }}>{job.salary}</span>
                  <Link href="#" className="flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-white transition-colors group/link">
                    Detail
                    <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="#" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-[#DCEF62]/40 text-[#DCEF62] font-bold text-lg hover:bg-[#DCEF62]/10 transition-all">
              Zobraziť všetky ponuky
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-24">
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: 'linear-gradient(135deg, #644AE9, #FF6B35, #06D6A0)', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', filter: 'blur(80px)' }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <div
            className="relative p-12 md:p-16 rounded-[3rem] border border-white/10 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1a1025, #0f0a14)' }}
          >
            <div
              className="absolute top-0 right-0 w-48 h-48 opacity-30"
              style={{ background: 'linear-gradient(135deg, #644AE9, transparent)', borderRadius: '0 60px 0 80px' }}
            />
            <div
              className="absolute bottom-0 left-0 w-36 h-36 opacity-20"
              style={{ background: 'linear-gradient(45deg, #06D6A0, transparent)', borderRadius: '0 60px 0 80px' }}
            />
            <div className="absolute top-8 left-8 w-4 h-4 rounded-full bg-[#DCEF62] opacity-40 animate-pulse" />
            <div className="absolute top-12 right-12 w-3 h-3 rounded-full bg-[#FF6B35] opacity-50 animate-pulse" style={{ animationDelay: '75ms' }} />
            <div className="absolute bottom-8 left-1/3 w-2 h-2 rounded-full bg-[#06D6A0] opacity-40 animate-pulse" style={{ animationDelay: '150ms' }} />

            <div className="text-center relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                <span className="bg-gradient-to-r from-[#DCEF62] via-[#644AE9] to-[#FF6B35] bg-clip-text text-transparent">Pripravený na novú</span>
                <br />
                <span className="bg-gradient-to-r from-[#FF6B35] via-[#06D6A0] to-[#DCEF62] bg-clip-text text-transparent">kariéru?</span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                Pridaj sa k tisícom juniorov, ktorí už našli svoju vysnívanú prácu prostredníctvom JuniorPortálu.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#" className="group px-10 py-5 rounded-full bg-gradient-to-r from-[#644AE9] to-[#FF6B35] text-white font-bold text-lg flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-[#644AE9]/40 transition-all hover:scale-105">
                  <Rocket className="w-5 h-5" />
                  Začať teraz
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="#" className="px-10 py-5 rounded-full border-2 border-white/20 text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-white/5 transition-all">
                  Zistiť viac
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#644AE9] to-[#FF6B35] flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#DCEF62] to-[#644AE9] bg-clip-text text-transparent">JuniorPortal</span>
              </Link>
              <p className="text-gray-500 text-sm leading-relaxed">Prvý portál na Slovensku špeciálne navrhnutý pre juniorov a absolventov.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Pre uchádzačov</h4>
              <ul className="space-y-3">
                {['Prehľadávať ponuky', 'Vytvoriť profil', 'Kariérny poradca', 'Blog'].map((item, i) => (
                  <li key={i}><Link href="#" className="text-gray-500 hover:text-[#DCEF62] transition-colors text-sm">{item}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Pre firmy</h4>
              <ul className="space-y-3">
                {['Pridať ponuku', 'Cenník', 'Pre firmy', 'Kontakt'].map((item, i) => (
                  <li key={i}><Link href="#" className="text-gray-500 hover:text-[#DCEF62] transition-colors text-sm">{item}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Kontakt</h4>
              <ul className="space-y-3">
                <li className="text-gray-500 text-sm">info@juniorportal.sk</li>
                <li className="text-gray-500 text-sm">+421 901 234 567</li>
                <li className="text-gray-500 text-sm">Bratislava, Slovensko</li>
              </ul>
              <div className="flex gap-3 mt-6">
                {['LinkedIn', 'Twitter', 'Instagram'].map((social, i) => (
                  <Link key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-[#DCEF62] hover:border-[#DCEF62]/30 transition-all text-xs">
                    {social[0]}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">© 2026 JuniorPortal. Všetky práva vyhradené.</p>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-600 hover:text-[#DCEF62] transition-colors text-sm">Súkromie</Link>
              <Link href="#" className="text-gray-600 hover:text-[#DCEF62] transition-colors text-sm">Podmienky</Link>
              <Link href="#" className="text-gray-600 hover:text-[#DCEF62] transition-colors text-sm">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
