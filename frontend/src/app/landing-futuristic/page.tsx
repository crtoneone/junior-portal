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
  Cpu,
  Zap,
  Globe,
  Bot,
  Star,
  Rocket,
  Lightbulb,
  Users,
  Building2,
} from 'lucide-react';

export default function LandingFuturisticPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden">
      {/* ===== HERO ===== */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-[#1a1a2e] via-[#0f3460] to-[#16213e] overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[100px]" />
        
        <div className="mx-auto max-w-7xl relative">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center gap-2 bg-blue-900/50 text-blue-300 px-4 py-2 rounded-full text-sm font-mono border border-blue-700/50">
              <Bot className="w-4 h-4" />
              AI-POWERED RECRUITMENT PLATFORM
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold leading-tight tracking-tight">
              <span className="text-white">Find Your</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Future Career
              </span>
            </h1>

            <div className="mt-8 max-w-3xl mx-auto">
              <p className="text-xl text-gray-300 leading-relaxed font-light">
                <span className="text-blue-400">Revolutionary</span> junior job portal powered by AI. Match your potential with top-tier opportunities in the digital age.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <Link
                href="/auth/register"
                className="group relative inline-flex items-center gap-3 bg-blue-600 text-white font-semibold text-lg px-10 py-5 rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Rocket className="w-6 h-6 relative z-10" />
                <span className="relative z-10">Begin Journey</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/jobs"
                className="inline-flex items-center gap-3 bg-transparent backdrop-blur-sm text-blue-300 font-semibold text-lg px-10 py-5 rounded-xl border border-blue-500/50 hover:bg-blue-900/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                <Search className="w-6 h-6" />
                Explore Opportunities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-32 px-4 bg-[#0f1620] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#0f1620]" />
        <div className="mx-auto max-w-7xl relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="relative group p-8 bg-gradient-to-br from-[#1a2332] to-[#0f1620] rounded-2xl border border-blue-900/30 hover:border-blue-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="absolute top-0 right-0 p-4 text-blue-400 opacity-50 group-hover:opacity-100 transition-opacity">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="pt-4">
                  <div className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-cyan-300 transition-all">
                    {stat.value}
                  </div>
                  <div className="mt-3 text-sm text-gray-400 font-medium group-hover:text-blue-300 transition-colors">
                    {stat.label}
                  </div>
                  <div className="mt-4 h-1 w-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-32 px-4 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1620] to-[#0a0a0a]" />
        <div className="mx-auto max-w-7xl relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Powered by <span className="text-blue-400">AI Intelligence</span>
            </h2>
            <div className="mt-4 h-1 w-24 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
            <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
              Our advanced AI algorithms match your unique skills with the perfect junior opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative group"
              >
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500" />
                <div className="relative p-10 bg-gradient-to-br from-[#1a2332] to-[#0f1620] rounded-3xl border border-blue-900/30 hover:border-blue-500/50 transition-all duration-500 transform group-hover:-translate-y-3">
                  <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl mb-8 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl font-bold text-white">0{i + 1}</span>
                  </div>
                  <div className="mb-6 text-blue-400 group-hover:text-cyan-300 transition-colors">
                    <step.icon className="w-16 h-16" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-32 px-4 bg-[#0f1620] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#0f1620]" />
        <div className="mx-auto max-w-7xl relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Future-Proof <span className="text-cyan-400">Features</span>
            </h2>
            <div className="mt-4 h-1 w-24 bg-gradient-to-r from-cyan-600 to-blue-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group p-8 bg-gradient-to-br from-[#1a2332] to-[#0f1620] rounded-2xl border border-blue-900/30 hover:border-cyan-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-900/50 to-blue-900/50 rounded-xl flex items-center justify-center mb-6 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 transition-all">
                  <feature.icon className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== JOB TYPES ===== */}
      <section className="py-32 px-4 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1620] to-[#0a0a0a]" />
        <div className="mx-auto max-w-7xl relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Tech <span className="text-cyan-400">Specializations</span>
            </h2>
            <p className="mt-4 text-xl text-gray-400">
              Explore opportunities in cutting-edge technologies
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {jobTypes.map((type, i) => (
              <Link
                key={i}
                href={`/jobs?type=${type.label.toLowerCase().replace(/\s+/g, '-')}`}
                className={`group relative inline-flex items-center gap-3 px-8 py-5 bg-gradient-to-br ${type.gradient} rounded-xl font-bold text-lg transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/30 overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${type.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <type.icon className="w-6 h-6 relative z-10" />
                <span className="relative z-10 text-white">
                  {type.label}
                </span>
                <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIAL ===== */}
      <section className="py-32 px-4 bg-[#0f1620] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#0f1620]" />
        <div className="mx-auto max-w-6xl relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              AI-Powered <span className="text-cyan-400">Success Stories</span>
            </h2>
          </div>

          <div className="relative p-12 bg-gradient-to-br from-[#1a2332] to-[#0f1620] rounded-3xl border border-cyan-900/30 hover:border-cyan-500/50 transition-all duration-500">
            <div className="absolute top-0 right-0 p-6 text-cyan-400/20">
              <Lightbulb className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="text-6xl font-bold text-cyan-400/20 mb-6">&ldquo;</div>
              <blockquote className="text-2xl md:text-3xl font-light text-gray-200 leading-relaxed mb-10">
                <span className="text-cyan-400 font-bold">AI matched me</span> with my dream role as a Frontend Developer. 
                The intelligent algorithms understood my unique skill set better than any recruiter. I found my first job 
                in just 2 weeks after starting my profile!
              </blockquote>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center font-bold text-2xl text-white">
                  EK
                </div>
                <div>
                  <div className="font-bold text-white text-lg">Eva K.</div>
                  <div className="text-cyan-400 text-sm">Frontend Developer @ TechCorpAI</div>
                  <div className="flex items-center gap-2 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-cyan-500 text-cyan-500" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-32 px-4 relative bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-[#0a0a0a] to-blue-900/20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-cyan-600/10 rounded-full blur-[100px]" />
        </div>
        
        <div className="mx-auto max-w-4xl relative text-center">
          <div className="inline-block bg-cyan-900/30 backdrop-blur-sm text-cyan-300 px-6 py-2 rounded-full text-sm font-mono border border-cyan-700/50 mb-8">
            READY TO BEGIN YOUR FUTURE?
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Launch Your Career<br></br>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
              IN THE AGE OF AI
            </span>
          </h2>
          
          <p className="mt-8 text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of young talents who've already found their place in tomorrow's tech landscape. 
            Start your journey with our AI-powered recruitment platform designed specifically for junior professionals.
          </p>
          
          <div className="mt-12">
            <Link
              href="/auth/register"
              className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xl px-16 py-6 rounded-2xl shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Zap className="w-7 h-7 relative z-10" />
              <span className="relative z-10">Create Your Future</span>
              <Rocket className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#0a0a0a] border-t border-blue-900/30 px-4 py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1620] to-[#0a0a0a]" />
        <div className="mx-auto max-w-7xl relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-xl text-white">AIFINDME</div>
                  <div className="text-sm text-cyan-400 font-mono">AI-POWERED RECRUITMENT</div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                The future of junior employment. Powered by artificial intelligence, designed for human potential. 
                Connect with opportunities that match your unique journey.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold uppercase text-cyan-400 mb-6 text-sm">Platform</h3>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link href="/jobs" className="hover:text-cyan-300 transition-colors">Job Search</Link></li>
                <li><Link href="/cv" className="hover:text-cyan-300 transition-colors">AI CV Builder</Link></li>
                <li><Link href="/pricing" className="hover:text-cyan-300 transition-colors">Pricing</Link></li>
                <li><Link href="/talent-pool" className="hover:text-cyan-300 transition-colors">Talent Pool</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold uppercase text-cyan-400 mb-6 text-sm">Company</h3>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-cyan-300 transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-cyan-300 transition-colors">Careers</Link></li>
                <li><Link href="/blog" className="hover:text-cyan-300 transition-colors">AI Insights</Link></li>
                <li><Link href="/contact" className="hover:text-cyan-300 transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold uppercase text-cyan-400 mb-6 text-sm">AIFINDME</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Revolutionizing junior employment through artificial intelligence. Your future awaits in the age of AI.
              </p>
            </div>
          </div>
          
          <div className="border-t border-blue-900/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-cyan-400 font-mono text-sm">
              AIFINDME © {new Date().getFullYear()}
            </div>
            <div className="text-gray-500 text-sm">
              Powered by Artificial Intelligence • Designed for Human Potential
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Privacy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Terms</Link>
              <Link href="/cookies" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ===== CUSTOM ICONS ===== */

const Brain = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.5L4.5 12A2.5 2.5 0 0 1 7 9.5h6.5A2.5 2.5 0 0 0 16 12v5.5a2.5 2.5 0 0 1-5 0v-8.5" />
  </svg>
);

const Database = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2V12z" />
    <path d="M3 12v4" />
    <path d="M21 12v4" />
    <path d="M14 12l-2 2-2-2" />
  </svg>
);

const Cloud = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2z" />
  </svg>
);

const Palette = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    <circle cx="8.5" cy="6.5" r=".5" fill="currentColor" />
    <path d="M12 2C8 6 8 12 5 14c0 0-1-10 4-14zM12 2c4-4 4-10-2-14zM12 2c0 8 5 10 5 10" />
  </svg>
);

const Smartphone = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

/* ===== DATA ===== */

const stats = [
  { value: '5K+', label: 'Active Job Listings', icon: Search },
  { value: '2.5K+', label: 'Success Stories', icon: TrendingUp },
  { value: '500+', label: 'Verified Companies', icon: Building2 },
  { value: '95%', label: 'Success Rate', icon: Star },
];

const steps = [
  {
    title: 'Create AI Profile',
    description: 'Upload your skills, education, and experience. Our AI analyzes and matches your profile with optimal opportunities.',
    icon: Bot,
  },
  {
    title: 'Smart Matching',
    description: 'Our AI algorithms analyze thousands of job requirements to find perfect matches based on your unique qualifications.',
    icon: Cpu,
  },
  {
    title: 'Launch Career',
    description: 'Apply with one click. Companies contact you directly through our secure platform. Begin your journey today!',
    icon: Rocket,
  },
];

const features = [
  {
    title: 'AI Analysis',
    description: 'Advanced machine learning matches your skills with perfect opportunities.',
    icon: Cpu,
  },
  {
    title: 'Smart Recommendations',
    description: 'Daily personalized job suggestions based on your profile and interests.',
    icon: Brain,
  },
  {
    title: 'Automated Applications',
    description: 'One-click applications to multiple positions simultaneously.',
    icon: Bot,
  },
  {
    title: 'Skill Assessment',
    description: 'AI-powered skill evaluation and gap analysis for career growth.',
    icon: Lightbulb,
  },
];

const jobTypes = [
  {
    label: 'AI/ML Engineer',
    icon: Cpu,
    gradient: 'bg-gradient-to-br from-[#1a2332] to-[#0f1620]',
    hoverGradient: 'from-cyan-600 to-blue-600',
  },
  {
    label: 'Frontend Developer',
    icon: Code2,
    gradient: 'bg-gradient-to-br from-[#2a1332] to-[#1a0f20]',
    hoverGradient: 'from-purple-600 to-pink-600',
  },
  {
    label: 'Backend Developer',
    icon: Database,
    gradient: 'bg-gradient-to-br from-[#1a2332] to-[#0f1620]',
    hoverGradient: 'from-green-600 to-teal-600',
  },
  {
    label: 'DevOps Engineer',
    icon: Cloud,
    gradient: 'bg-gradient-to-br from-[#2a2332] to-[#1a1a20]',
    hoverGradient: 'from-orange-600 to-red-600',
  },
  {
    label: 'Data Scientist',
    icon: Brain,
    gradient: 'bg-gradient-to-br from-[#2a1a32] to-[#1a0f20]',
    hoverGradient: 'from-blue-600 to-indigo-600',
  },
  {
    label: 'UI/UX Designer',
    icon: Palette,
    gradient: 'bg-gradient-to-br from-[#2a2a32] to-[#1a1a20]',
    hoverGradient: 'from-pink-600 to-rose-600',
  },
  {
    label: 'Fullstack Developer',
    icon: Code2,
    gradient: 'bg-gradient-to-br from-[#1a2332] to-[#0f1620]',
    hoverGradient: 'from-cyan-600 to-blue-600',
  },
  {
    label: 'Mobile Developer',
    icon: Smartphone,
    gradient: 'bg-gradient-to-br from-[#2a2332] to-[#1a1a20]',
    hoverGradient: 'from-indigo-600 to-violet-600',
  },
];