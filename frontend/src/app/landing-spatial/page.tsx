'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import {
  Search,
  Briefcase,
  Building2,
  TrendingUp,
  Zap,
  Shield,
  Compass,
  Layers,
  Box,
  Globe,
  ArrowRight,
  Sparkles,
  Users,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';

function SpatialCard({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotation({ x: y * -12, y: x * 12 });
  };

  const handleMouseLeave = () => setRotation({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        perspective: '1000px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      <div
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: 'transform 0.15s ease-out',
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </div>
    </div>
  );
}

function FloatingOrb({
  size,
  color,
  blur,
  className = '',
}: {
  size: number;
  color: string;
  blur: number;
  className?: string;
}) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        filter: `blur(${blur}px)`,
        transformStyle: 'preserve-3d',
        animation: 'float 8s ease-in-out infinite',
      }}
    />
  );
}

export default function LandingSpatialPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
      <div
      className="min-h-screen overflow-hidden relative"
      style={{
        backgroundColor: '#0a0e24',
        perspective: '1200px',
        perspectiveOrigin: '50% 30%',
      }}
    >
      {/* Dot pattern background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: 'radial-gradient(circle, #DCEF62 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateX(0deg); }
          50% { transform: translateY(-20px) rotateX(5deg); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotateY(0deg); }
          50% { transform: translateY(-15px) rotateY(8deg); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
          50% { transform: translateY(15px) rotateX(-5deg) rotateY(-5deg); }
        }
        @keyframes pulse3d {
          0%, 100% { transform: scale(1) translateZ(0); }
          50% { transform: scale(1.05) translateZ(10px); }
        }
        @keyframes spin3d {
          0% { transform: rotateY(0deg) rotateX(15deg); }
          100% { transform: rotateY(360deg) rotateX(15deg); }
        }
      `}</style>

      {/* ===== DEPTH LAYER 0: Far background grid ===== */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100,74,233,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100,74,233,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: `translateZ(-200px) scale(1.5)`,
        }}
      />

      {/* ===== HERO SECTION ===== */}
      <section className="relative flex flex-col justify-center -mt-[134px]" style={{ transformStyle: 'preserve-3d', minHeight: '70vh' }}>
        {/* Layer: Far depth orbs */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateZ(-120px) scale(1.4)`, transformStyle: 'preserve-3d' }}
        >
          <FloatingOrb size={400} color="rgba(100,74,233,0.18)" blur={100} className="top-[10%] left-[-5%]" />
          <FloatingOrb size={300} color="rgba(220,239,98,0.08)" blur={80} className="top-[30%] right-[-3%]" />
          <FloatingOrb size={250} color="rgba(100,74,233,0.12)" blur={90} className="bottom-[10%] left-[20%]" />
        </div>

        {/* Layer: Mid depth orbs */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateZ(-50px) scale(1.15)`, transformStyle: 'preserve-3d' }}
        >
          <FloatingOrb size={200} color="rgba(100,74,233,0.28)" blur={60} className="top-[20%] left-[15%]" />
          <FloatingOrb size={160} color="rgba(220,239,98,0.15)" blur={50} className="top-[40%] right-[10%]" />
          <FloatingOrb size={120} color="rgba(100,74,233,0.2)" blur={40} className="bottom-[25%] right-[25%]" />
        </div>

        {/* Layer: Near depth floating shapes */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateZ(-20px) scale(1.05)`, transformStyle: 'preserve-3d' }}
        >
          <div
            className="absolute top-[15%] left-[8%] w-16 h-16 border-2 border-[#644AE9]/25 rounded-xl"
            style={{ animation: 'float 6s ease-in-out infinite', transformStyle: 'preserve-3d' }}
          />
          <div
            className="absolute top-[25%] right-[12%] w-10 h-10 bg-[#DCEF62]/10 rounded-lg"
            style={{ animation: 'floatSlow 7s ease-in-out infinite', transformStyle: 'preserve-3d' }}
          />
          <div
            className="absolute bottom-[30%] left-[20%] w-8 h-8 border border-[#644AE9]/15 rounded-full"
            style={{ animation: 'floatReverse 5s ease-in-out infinite', transformStyle: 'preserve-3d' }}
          />
        </div>

        {/* Hero content at front layer */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center" style={{ transform: 'translateZ(0)' }}>
          {/* Title */}
          <h1
            className="text-[60px] sm:text-[72px] lg:text-[84px] font-extrabold leading-relaxed mb-2"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #DCEF62 50%, #644AE9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: 'none',
              transform: 'translateZ(40px)',
            }}
          >
            Nie si senior?
          </h1>

          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white/90 mb-8 leading-tight"
            style={{ transform: 'translateZ(30px)' }}
          >
            Odštartuj svoju kariéru
          </h2>

          <p
            className="text-xl sm:text-[22px] text-white/60 mb-8 whitespace-nowrap text-left"
            style={{ transform: 'translateZ(20px)' }}
          >
            DajFlek spája juniorov a stážistov s firmami, ktoré hľadajú čerstvé sily.
          </p>


          {/* Search bar with glass panel */}
          <SpatialCard delay={300} className="max-w-[1060px] mx-auto">
            <div
              className="rounded-2xl p-1"
              style={{
                background: 'linear-gradient(135deg, rgba(100,74,233,0.3), rgba(220,239,98,0.2))',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(100,74,233,0.15)',
                transform: 'translateZ(60px)',
              }}
            >
              <form
                action="/jobs"
                method="GET"
                className="flex flex-col sm:flex-row gap-2 p-2 rounded-xl"
                style={{ background: '#14152e' }}
              >
                <div className="flex-1 relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-white/30" />
                  <input
                    name="search"
                    type="text"
                    placeholder="Akú pozíciu hľadáš?"
                    className="w-full h-[60px] pl-14 pr-4 bg-white/5 text-white placeholder-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#644AE9]/50 text-base"
                  />
                </div>
                <div className="sm:w-52 relative">
                  <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-white/30" />
                  <input
                    name="location"
                    type="text"
                    placeholder="Lokalita?"
                    className="w-full h-[60px] pl-14 pr-4 bg-white/5 text-white placeholder-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#644AE9]/50 text-base"
                  />
                </div>
                <button
                  type="submit"
                  className="h-[60px] px-10 rounded-lg font-semibold text-base transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #644AE9, #7c5cf5)',
                    color: '#fff',
                    boxShadow: '0 4px 15px rgba(100,74,233,0.4)',
                  }}
                >
                  Hľadať
                </button>
              </form>
            </div>
          </SpatialCard>
        </div>

      </section>

      {/* ===== STAT CARDS SECTION ===== */}
      <section className="relative py-24" style={{ transformStyle: 'preserve-3d' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8" style={{ perspective: '1000px' }}>
            {stats.map((stat, i) => (
              <SpatialCard key={i} delay={i * 150}>
                <div
                  className="relative rounded-2xl p-6 text-center overflow-hidden group cursor-default"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: `
                      0 20px 40px rgba(0,0,0,0.3),
                      0 0 0 1px rgba(255,255,255,0.03) inset,
                      0 1px 0 rgba(255,255,255,0.05) inset
                    `,
                    transformStyle: 'preserve-3d',
                    transform: `translateZ(${20 + i * 10}px)`,
                  }}
                >
                  {/* Glass reflection */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(100,74,233,0.1) 0%, transparent 60%)',
                    }}
                  />
                  <div
                    className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(100,74,233,0.2), rgba(220,239,98,0.1))',
                      boxShadow: '0 4px 20px rgba(100,74,233,0.2)',
                      transform: 'translateZ(10px)',
                    }}
                  >
                    <stat.icon className="h-7 w-7 text-[#DCEF62]" />
                  </div>
                  <div
                    className="text-3xl font-bold text-white mb-1"
                    style={{ transform: 'translateZ(5px)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </div>
              </SpatialCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRIESTOROVÉ MOŽNOSTI SECTION ===== */}
      <section className="relative py-24" style={{ transformStyle: 'preserve-3d' }}>
        {/* Background depth layer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: 'translateZ(-80px) scale(1.2)', transformStyle: 'preserve-3d' }}
        >
          <FloatingOrb size={350} color="rgba(100,74,233,0.14)" blur={80} className="top-[10%] left-[-5%]" />
          <FloatingOrb size={250} color="rgba(220,239,98,0.06)" blur={70} className="bottom-[10%] right-[-3%]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SpatialCard className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6"
              style={{
                background: 'rgba(220,239,98,0.1)',
                border: '1px solid rgba(220,239,98,0.2)',
                color: '#DCEF62',
              }}
            >
              <Compass className="w-3.5 h-3.5" />
              Priestorové možnosti
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              style={{ transform: 'translateZ(20px)' }}
            >
              Preskúmaj svoju budúcnosť
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Tri dimenzie, v ktorých sa môžeš rozvíjať
            </p>
          </SpatialCard>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ perspective: '1200px' }}>
            {spaceFeatures.map((feature, i) => (
              <SpatialCard key={i} delay={i * 200}>
                <div
                  className="relative rounded-3xl p-8 overflow-hidden group cursor-default h-full"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))`,
                    border: '1px solid rgba(255,255,255,0.06)',
                    boxShadow: `
                      0 25px 50px rgba(0,0,0,0.4),
                      0 0 0 1px rgba(255,255,255,0.03) inset
                    `,
                    transform: `translateZ(${30 + i * 15}px)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Gradient accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${feature.accentColor}, transparent)`,
                    }}
                  />

                  {/* Floating icon orb */}
                  <div
                    className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${feature.accentColor}20, ${feature.accentColor}08)`,
                      border: `1px solid ${feature.accentColor}20`,
                      boxShadow: `0 8px 30px ${feature.accentColor}15`,
                      transform: 'translateZ(15px)',
                      animation: `floatSlow ${6 + i}s ease-in-out infinite`,
                    }}
                  >
                    <feature.icon className="h-8 w-8" style={{ color: feature.accentColor }} />
                  </div>

                  <h3
                    className="text-xl font-bold text-white mb-3"
                    style={{ transform: 'translateZ(10px)' }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-6" style={{ transform: 'translateZ(5px)' }}>
                    {feature.description}
                  </p>

                  <Link
                    href={feature.href}
                    className="inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-300 group/link"
                    style={{ color: feature.accentColor }}
                  >
                    Preskúmať
                    <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </SpatialCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PREČO JUNIORPORTAL SECTION ===== */}
      <section className="relative py-24" style={{ transformStyle: 'preserve-3d' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SpatialCard className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6"
              style={{
                background: 'rgba(100,74,233,0.1)',
                border: '1px solid rgba(100,74,233,0.2)',
                color: '#644AE9',
              }}
            >
              <Layers className="w-3.5 h-3.5" />
              Prečo DajFlek
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              style={{ transform: 'translateZ(20px)' }}
            >
              Vrstvy výhod
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Každá funkcia je navrhnutá s hĺbkou a účelom
            </p>
          </SpatialCard>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            style={{ perspective: '1200px' }}
          >
            {features.map((feature, i) => (
              <SpatialCard key={i} delay={i * 100}>
                <div
                  className="relative rounded-2xl p-6 h-full group cursor-default overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    boxShadow: `
                      0 15px 35px rgba(0,0,0,0.3),
                      0 0 0 1px rgba(255,255,255,0.02) inset
                    `,
                    transform: `translateZ(${15 + (i % 2) * 10}px)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${feature.accentColor}10 0%, transparent 70%)`,
                    }}
                  />
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      background: `${feature.accentColor}12`,
                      border: `1px solid ${feature.accentColor}18`,
                      transform: 'translateZ(10px)',
                    }}
                  >
                    <feature.icon className="h-6 w-6" style={{ color: feature.accentColor }} />
                  </div>
                  <h3
                    className="text-base font-semibold text-white mb-2"
                    style={{ transform: 'translateZ(8px)' }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </SpatialCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-24" style={{ transformStyle: 'preserve-3d' }}>
        {/* Depth layers for CTA */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: 'translateZ(-100px) scale(1.3)', transformStyle: 'preserve-3d' }}
        >
          <FloatingOrb size={500} color="rgba(100,74,233,0.18)" blur={120} className="top-[-10%] left-[20%]" />
          <FloatingOrb size={400} color="rgba(220,239,98,0.06)" blur={100} className="bottom-[-10%] right-[20%]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SpatialCard delay={100}>
            <div
              className="relative rounded-3xl p-12 text-center overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(100,74,233,0.15), rgba(100,74,233,0.05))',
                border: '1px solid rgba(100,74,233,0.2)',
                boxShadow: `
                  0 30px 60px rgba(0,0,0,0.4),
                  0 0 80px rgba(100,74,233,0.1),
                  inset 0 1px 0 rgba(255,255,255,0.05)
                `,
                transform: 'translateZ(40px)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Background grid */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(100,74,233,0.5) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(100,74,233,0.5) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Floating decorative elements */}
              <div
                className="absolute top-6 right-8 w-8 h-8 border border-[#DCEF62]/20 rounded-lg"
                style={{ animation: 'float 5s ease-in-out infinite', transform: 'translateZ(20px)' }}
              />
              <div
                className="absolute bottom-8 left-10 w-6 h-6 bg-[#644AE9]/10 rounded-full"
                style={{ animation: 'floatSlow 6s ease-in-out infinite', transform: 'translateZ(15px)' }}
              />

              <div className="relative" style={{ transform: 'translateZ(10px)' }}>
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6"
                  style={{
                    background: 'rgba(220,239,98,0.1)',
                    border: '1px solid rgba(220,239,98,0.2)',
                    color: '#DCEF62',
                  }}
                >
                  <Zap className="w-3.5 h-3.5" />
                  Začni teraz
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Pripravený vstúpiť do priestoru?
                </h2>
                <p className="text-lg text-white/50 mb-8 max-w-lg mx-auto">
                  Pridaj sa k stovkám juniorov, ktorí už našli svoju vysnívanú prácu cez DajFlek.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <SpatialCard delay={200}>
                    <Link
                      href="/auth/register"
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300 hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, #DCEF62, #c4d650)',
                        color: '#0a0e24',
                        boxShadow: '0 8px 30px rgba(220,239,98,0.3), 0 2px 8px rgba(0,0,0,0.2)',
                      }}
                    >
                      Zaregistruj sa zadarmo
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </SpatialCard>

                  <SpatialCard delay={300}>
                    <Link
                      href="/jobs"
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#fff',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <RotateCcw className="w-4 h-4" />
                      Prehľadávať ponuky
                    </Link>
                  </SpatialCard>
                </div>
              </div>
            </div>
          </SpatialCard>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer
        className="relative border-t"
        style={{
          borderColor: 'rgba(255,255,255,0.05)',
          background: 'rgba(255,255,255,0.01)',
        }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #644AE9, #7c5cf5)',
                    boxShadow: '0 4px 15px rgba(100,74,233,0.3)',
                  }}
                >
                  <Box className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">DajFlek</span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed">
                Priestorový portál pre juniorov a stážistov. Nájdi svoju prvú prácu v roku 2026.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Pre uchádzačov</h4>
              <ul className="space-y-2.5">
                {['Prehľadávať ponuky', 'Vytvoriť profil', 'CV Builder', 'Skill matching'].map((item) => (
                  <li key={item}>
                    <Link href="/jobs" className="text-sm text-white/40 hover:text-[#DCEF62] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Pre firmy</h4>
              <ul className="space-y-2.5">
                {['Pridať ponuku', 'Prehľad uchádzačov', 'Cenník', 'Kontakt'].map((item) => (
                  <li key={item}>
                    <Link href="/pricing" className="text-sm text-white/40 hover:text-[#DCEF62] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Portál</h4>
              <ul className="space-y-2.5">
                {['O nás', 'Blog', 'Podmienky', 'Ochrana súkromia'].map((item) => (
                  <li key={item}>
                    <Link href="/contact" className="text-sm text-white/40 hover:text-[#DCEF62] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
          >
            <p className="text-xs text-white/30">
              &copy; 2026 DajFlek (DajFlek.sk). Všetky práva vyhradené.
            </p>
            <div className="flex items-center gap-1 text-xs text-white/30">
              <Globe className="w-3.5 h-3.5" />
              Vytvorené pre slovenských juniorov
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const stats = [
  { value: '2 500+', label: 'Aktívnych ponúk', icon: Briefcase },
  { value: '850+', label: 'Overených firiem', icon: Building2 },
  { value: '12 000+', label: 'Juniorov', icon: Users },
];

const spaceFeatures = [
  {
    title: 'Virtuálne prehliadky',
    description: 'Prezeraj si firmy a pracovné prostredie v priestorovom zobrazení. Zaži kultúru firmy skôr, než sa prihlásiš.',
    icon: Globe,
    accentColor: '#644AE9',
    href: '/jobs',
  },
  {
    title: '3D Profil',
    description: 'Svoj profil ako priestorovú prezentáciu. Ukáž svoje zručnosti, projekty a skúsenosti v interaktívnej forme.',
    icon: Box,
    accentColor: '#DCEF62',
    href: '/profile',
  },
  {
    title: 'Priestorové mapovanie',
    description: 'Vizualizuj svoju kariérnu cestu ako 3D mapu. Vid, kam ťa tvoje zručnosti môžu zaviesť.',
    icon: Compass,
    accentColor: '#644AE9',
    href: '/dashboard',
  },
];

const features = [
  {
    title: 'Len pre juniorov',
    description: 'Všetky ponuky sú overené a vhodné pre začiatočníkov.',
    icon: Zap,
    accentColor: '#DCEF62',
  },
  {
    title: 'Overené firmy',
    description: 'Každá firma je overená pred zverejnením ponuky.',
    icon: Shield,
    accentColor: '#644AE9',
  },
  {
    title: 'CV Builder',
    description: 'Vytvor si profesionálne CV priamo v portáli.',
    icon: Briefcase,
    accentColor: '#DCEF62',
  },
  {
    title: 'Skill Matching',
    description: 'Dostávaj odporúčania na základe tvojich zručností.',
    icon: TrendingUp,
    accentColor: '#644AE9',
  },
];
