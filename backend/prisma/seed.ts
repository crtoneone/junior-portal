import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

interface JobSeed {
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  location: string;
  isRemote?: boolean;
  type: string;
  minSalary?: number;
  maxSalary?: number;
  currency?: string;
  skills: string[];
}

interface CompanySeed {
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  companySize: string;
  industry: string;
  description: string;
  website: string;
  location: string;
  isVerified: boolean;
  jobs: JobSeed[];
}

const COMPANIES: CompanySeed[] = [
  {
    email: 'firma@example.sk',
    firstName: 'Peter',
    lastName: 'Zamestnávateľ',
    companyName: 'TechSolutions s.r.o.',
    companySize: '50-100',
    industry: 'Information Technology',
    description: 'Moderná IT firma zameraná na vývoj webových aplikácií',
    website: 'https://techsolutions.sk',
    location: 'Bratislava',
    isVerified: true,
    jobs: [
      {
        title: 'Junior React Developer',
        description:
          'Hľadáme nadšeného junior developera so znalosťou Reactu. Ponúkame mentoring, školenia a prácu v skvelom tíme.',
        requirements: ['Základy Reactu', 'TypeScript', 'HTML/CSS', 'Ochota učiť sa'],
        responsibilities: ['Vývoj UI komponentov', 'Code review', 'Spolupráca s tímom'],
        location: 'Bratislava',
        type: 'JUNIOR',
        minSalary: 1200,
        maxSalary: 1800,
        skills: ['React', 'TypeScript', 'CSS'],
      },
      {
        title: 'Stážista Full-stack Developer',
        description: 'Stáž pre študentov IT. Získaj prax na reálnych projektoch s podporou skúsených mentorov.',
        requirements: ['Základy JavaScriptu', 'Základy databáz', 'Aktívny študent IT'],
        responsibilities: ['Pomoc s vývojom', 'Testovanie', 'Dokumentácia'],
        location: 'Bratislava',
        isRemote: true,
        type: 'INTERNSHIP',
        minSalary: 500,
        maxSalary: 700,
        currency: 'EUR',
        skills: ['JavaScript', 'SQL', 'Git'],
      },
    ],
  },
  {
    email: 'hr@webwhale.sk',
    firstName: 'Martin',
    lastName: 'Kováč',
    companyName: 'WebWhale Studio',
    companySize: '11-50',
    industry: 'Digital Agency',
    description: 'Kreatívna digitálna agentúra špecializujúca sa na webové a mobilné aplikácie.',
    website: 'https://webwhale.sk',
    location: 'Bratislava',
    isVerified: true,
    jobs: [
      {
        title: 'Junior Frontend Developer',
        description:
          'Pridaj sa do nášho frontend tímu. Pracuješ na realnych projektoch pre klientov z celej Európy.',
        requirements: ['HTML/CSS', 'JavaScript (ES6+)', 'Základy Reactu', 'Základy Git'],
        responsibilities: ['Implementácia UI komponentov', 'Responzívne layouty', 'Spolupráca s dizajnérmi'],
        location: 'Bratislava',
        type: 'JUNIOR',
        minSalary: 1100,
        maxSalary: 1600,
        skills: ['React', 'JavaScript', 'HTML', 'CSS'],
      },
      {
        title: 'Stážista UI/UX Dizajnér',
        description:
          'Nauč sa navrhovať moderné rozhrania v agentúre, kde dizajn tvorí jadro každého projektu.',
        requirements: ['Základy Figmy', 'Citel pre detail', 'Študent dizajnu výhodou'],
        responsibilities: ['Wireframing', 'Prototypovanie', 'Úprava UI kitov'],
        location: 'Bratislava',
        type: 'INTERNSHIP',
        minSalary: 450,
        maxSalary: 600,
        skills: ['Figma', 'UI', 'UX'],
      },
    ],
  },
  {
    email: 'hr@codeline.sk',
    firstName: 'Lucia',
    lastName: 'Nováková',
    companyName: 'CodeLine Solutions',
    companySize: '11-50',
    industry: 'IT Services',
    description: 'Softvérové riešenia pre bankovníctvo a fintech. Stabilná firma s medzinárodnými klientmi.',
    website: 'https://codeline.sk',
    location: 'Košice',
    isVerified: true,
    jobs: [
      {
        title: 'Junior Backend Developer (Node.js)',
        description:
          'Vyvíjaj REST API a mikroslužby v Node.js pre fintech klientov. Základom je čistý kód a mentoring.',
        requirements: ['Základy Node.js', 'Základy databáz (PostgreSQL)', 'REST API'],
        responsibilities: ['Vývoj REST API', 'Pisanie testov', 'Code review'],
        location: 'Košice',
        type: 'JUNIOR',
        minSalary: 1200,
        maxSalary: 1700,
        skills: ['Node.js', 'PostgreSQL', 'TypeScript'],
      },
      {
        title: 'Stážista Testovanie (QA)',
        description:
          'Nauč sa testovať softvér na reálnych projektoch. Ideálna stáž pre absolventov bez praxe.',
        requirements: ['Logické myslenie', 'Základy SQL', 'Pečlivosť'],
        responsibilities: ['Manual testovanie', 'Tvorba test cases', 'Reportovanie bugov'],
        location: 'Košice',
        isRemote: true,
        type: 'INTERNSHIP',
        minSalary: 500,
        maxSalary: 650,
        skills: ['QA', 'SQL', 'Jira'],
      },
    ],
  },
  {
    email: 'hr@brightapps.sk',
    firstName: 'Adam',
    lastName: 'Horváth',
    companyName: 'BrightApps',
    companySize: '50-100',
    industry: 'Mobile Development',
    description: 'Vývoj mobilných aplikácií pre iOS a Android. Moderný stack a flexibilná práca.',
    website: 'https://brightapps.sk',
    location: 'Bratislava',
    isVerified: true,
    jobs: [
      {
        title: 'Junior Mobile Developer (React Native)',
        description:
          'Vyvíjaj mobilné aplikácie v React Native. Pracuješ po boku seniorov a učíš sa najlepšie praktiky.',
        requirements: ['Základy JavaScriptu/TypeScriptu', 'Základy Reactu', 'Záujem o mobilný vývoj'],
        responsibilities: ['Vývoj obrazoviek', 'Integrácia API', 'Testovanie na zariadeniach'],
        location: 'Bratislava',
        type: 'JUNIOR',
        minSalary: 1300,
        maxSalary: 1800,
        skills: ['React Native', 'TypeScript', 'iOS', 'Android'],
      },
      {
        title: 'Junior iOS Developer (Swift)',
        description:
          'Vytváraj nativne iOS aplikácie v Swifte. Ponúkame onboarding a medznu podporu.',
        requirements: ['Základy Swiftu', 'Znalosť UIKit výhodou', 'Záujem o Apple ekosystém'],
        responsibilities: ['Vývoj v Swift', 'Údržba aplikácií', 'Spolupráca s dizajnérmi'],
        location: 'Bratislava',
        type: 'JUNIOR',
        minSalary: 1400,
        maxSalary: 1900,
        skills: ['Swift', 'UIKit', 'Xcode'],
      },
    ],
  },
  {
    email: 'hr@codelab.sk',
    firstName: 'Eva',
    lastName: 'Bartošová',
    companyName: 'CodeLab Software',
    companySize: '11-50',
    industry: 'Software Development',
    description: 'Produktové studio vyvíjajúce SaaS riešenia pre e-commerce a logistiku.',
    website: 'https://codelab.sk',
    location: 'Žilina',
    isVerified: true,
    jobs: [
      {
        title: 'Junior Java Developer',
        description:
          'Pridaj sa do Java tímu a pracuj na enterprise riešeniach pre veľkých klientov.',
        requirements: ['Základy Javy', 'OOP', 'Základy SQL'],
        responsibilities: ['Vývoj backend služieb', 'Úprava existujúceho kódu', 'Praha s JUnit'],
        location: 'Žilina',
        type: 'JUNIOR',
        minSalary: 1200,
        maxSalary: 1600,
        skills: ['Java', 'Spring Boot', 'SQL'],
      },
      {
        title: 'Stážista DevOps Engineer',
        description:
          'Nauč sa CI/CD, Docker a cloud. Stáž pre študentov so záujmom o infraštruktúru.',
        requirements: ['Základy Linuxu', 'Základné skriptovanie', 'Znalosť git'],
        responsibilities: ['Správa CI/CD', 'Docker kontajnery', 'Monitoring'],
        location: 'Žilina',
        isRemote: true,
        type: 'INTERNSHIP',
        minSalary: 520,
        maxSalary: 680,
        skills: ['Docker', 'Linux', 'CI/CD'],
      },
    ],
  },
  {
    email: 'hr@solaris.sk',
    firstName: 'Tomáš',
    lastName: 'Molnár',
    companyName: 'Solaris Digital',
    companySize: '51-100',
    industry: 'Renewable Energy Tech',
    description: 'Firma spájajúca obnoviteľnú energiu s moderným softvérom na analýzu dát.',
    website: 'https://solaristech.sk',
    location: 'Nitra',
    isVerified: true,
    jobs: [
      {
        title: 'Junior Data Analyst',
        description:
          'Pracuj s dátami z energetických systémov, tvoria prehľady a uč sa analytické nástroje.',
        requirements: ['Základy SQL', 'Excel/Power BI', 'Analytické myslenie', 'Základy štatistiky'],
        responsibilities: ['Príprava reportov', 'Čistenie dát', 'Dashboarding'],
        location: 'Nitra',
        type: 'JUNIOR',
        minSalary: 1100,
        maxSalary: 1500,
        skills: ['SQL', 'Power BI', 'Excel'],
      },
      {
        title: 'Junior Python Developer',
        description:
          'Automatizuj procesy a vyvíjaj skripty pre analýzu dát v Pythone.',
        requirements: ['Základy Pythona', 'Základy Pandas', 'Ochota učiť sa'],
        responsibilities: ['Vývoj skriptov', 'Automation', 'Spolupráca s data tímom'],
        location: 'Nitra',
        type: 'JUNIOR',
        minSalary: 1200,
        maxSalary: 1500,
        skills: ['Python', 'Pandas', 'SQL'],
      },
    ],
  },
  {
    email: 'hr@smartweb.sk',
    firstName: 'Zuzana',
    lastName: 'Krajčová',
    companyName: 'SmartWeb s.r.o.',
    companySize: '11-50',
    industry: 'Web Development',
    description: 'Tvoríme rýchle a škálovateľné webové riešenia pre malé a stredné firmy.',
    website: 'https://smartweb.sk',
    location: 'Trnava',
    isVerified: true,
    jobs: [
      {
        title: 'Junior Vue.js Developer',
        description:
          'Vyvíjaj moderné webové aplikácie vo Vue.js. Uč sa od skúsených seniorov.',
        requirements: ['Základy JavaScriptu', 'Základy Vue.js', 'HTML/CSS'],
        responsibilities: ['Vývoj komponentov', 'Integrácia API', 'Optimalizácie'],
        location: 'Trnava',
        type: 'JUNIOR',
        minSalary: 1100,
        maxSalary: 1500,
        skills: ['Vue.js', 'JavaScript', 'CSS'],
      },
      {
        title: 'Junior WordPress Developer',
        description:
          'Lacný vstup do IT cez WordPress vývoj. Tvorba tém a pluginov pre reálnych klientov.',
        requirements: ['Základy PHP', 'HTML/CSS', 'Základné softvéru WordPress'],
        responsibilities: ['Tvorba tém', 'Vývoj pluginov', 'Údržba webov'],
        location: 'Trnava',
        type: 'JUNIOR',
        minSalary: 1000,
        maxSalary: 1300,
        skills: ['WordPress', 'PHP', 'HTML', 'CSS'],
      },
    ],
  },
  {
    email: 'hr@aiworks.sk',
    firstName: 'Simon',
    lastName: 'Urban',
    companyName: 'AI Works',
    companySize: '11-50',
    industry: 'Artificial Intelligence',
    description: 'Startup diskutujúce AI produkty pre e-commerce. Dynamický tím a moderný stack.',
    website: 'https://aiworks.ai',
    location: 'Bratislava',
    isVerified: true,
    jobs: [
      {
        title: 'Junior Python/ML Developer',
        description:
          'Pomáhaj vyvíjať ML modely a pipeline. Ideálna pozícia pre absolventa s chuťou učiť sa.',
        requirements: ['Základy Pythona', 'Základy ML (sklearn)', 'Základná matematika'],
        responsibilities: ['Príprava datasetov', 'Trénovanie modelov', 'Evaluácia'],
        location: 'Bratislava',
        isRemote: true,
        type: 'JUNIOR',
        minSalary: 1400,
        maxSalary: 1800,
        skills: ['Python', 'scikit-learn', 'Pandas'],
      },
      {
        title: 'Stážista AI Research',
        description:
          'Zapoj sa do výskumu v oblasti NLP a LLM. Publikuj a uč sa od špičkových výskumníkov.',
        requirements: ['Základy Pythona', 'Angličtina', 'Aktívny študent výhodou'],
        responsibilities: ['Literatúra review', 'Experimenty', 'Reportovanie'],
        location: 'Bratislava',
        isRemote: true,
        type: 'INTERNSHIP',
        minSalary: 600,
        maxSalary: 800,
        skills: ['Python', 'NLP', 'Pandas'],
      },
    ],
  },
  {
    email: 'hr@cloudnest.sk',
    firstName: 'Michal',
    lastName: 'Dudík',
    companyName: 'CloudNest',
    companySize: '11-50',
    industry: 'Cloud Infrastructure',
    description: 'Poskytujeme cloud infraštruktúru a DevOps služby pre e-commerce firmy.',
    website: 'https://cloudnest.sk',
    location: 'Košice',
    isVerified: true,
    jobs: [
      {
        title: 'Junior DevOps Engineer',
        description:
          'Správa docker, Kubernetes a CI/CD pipeline pre rastúce produkty.',
        requirements: ['Základy Linuxu', 'Základy Dockeru', 'Znalosť Git a CI/CD'],
        responsibilities: ['CI/CD pipeline', 'Infra ako kód', 'Monitoring'],
        location: 'Košice',
        isRemote: true,
        type: 'JUNIOR',
        minSalary: 1300,
        maxSalary: 1700,
        skills: ['Docker', 'Kubernetes', 'CI/CD', 'Linux'],
      },
      {
        title: 'Junior Cloud Support Engineer',
        description:
          'Podporuj klientov s migráciou na cloud a rieš každodenné technické otázky.',
        requirements: ['Základy cloudu', 'Komunikačné zručnosti', 'Základy Linuxu'],
        responsibilities: ['Support lístky', 'Migrácia na cloud', 'Dokumentácia'],
        location: 'Košice',
        type: 'JUNIOR',
        minSalary: 1000,
        maxSalary: 1300,
        skills: ['AWS', 'Azure', 'Linux'],
      },
    ],
  },
  {
    email: 'hr@codecraft.sk',
    firstName: 'Juraj',
    lastName: 'Ondruš',
    companyName: 'CodeCraft',
    companySize: '11-50',
    industry: 'Custom Software',
    description: 'Custom softvérové riešenia pre priemysel a logistiku. Dlhodobé projekty a stabilný tím.',
    website: 'https://codecraft.sk',
    location: 'Trenčín',
    isVerified: true,
    jobs: [
      {
        title: 'Junior C#/.NET Developer',
        description:
          'Vyvíjaj desktop a web aplikácie v .NET pre priemyselných klientov.',
        requirements: ['Základy C#', 'OOP', 'Základy SQL'],
        responsibilities: ['Vývoj aplikácií', 'Oprava bugov', 'Testovanie'],
        location: 'Trenčín',
        type: 'JUNIOR',
        minSalary: 1200,
        maxSalary: 1600,
        skills: ['C#', '.NET', 'SQL'],
      },
      {
        title: 'Junior PHP Developer',
        description:
          'Pridaj sa do tímu vyvíjajúceho e-commerce riešenia v PHP a Laravel.',
        requirements: ['Základy PHP', 'Základy SQL', 'Ochota učiť sa'],
        responsibilities: ['Vývoj modulov', 'Integrácie', 'Oprava chýb'],
        location: 'Trenčín',
        type: 'JUNIOR',
        minSalary: 1100,
        maxSalary: 1400,
        skills: ['PHP', 'Laravel', 'MySQL'],
      },
    ],
  },
  {
    email: 'hr@datanova.sk',
    firstName: 'Katarína',
    lastName: 'Hlavatá',
    companyName: 'DataNova Labs',
    companySize: '11-50',
    industry: 'Big Data & Analytics',
    description: 'Big data a analytické riešenia pre telekomunikácie a finančný sektor.',
    website: 'https://datanova.sk',
    location: 'Bratislava',
    isVerified: true,
    jobs: [
      {
        title: 'Stážista Data Engineering',
        description:
          'Nauč sa spracovávať dáta v reálnom čase s Spark a Kafka. Stáž pre študentov so záujmom o dáta.',
        requirements: ['Základy SQL', 'Základy Pythona', 'Záujem o veľké dáta'],
        responsibilities: ['ETL pipeline', 'Čistenie dát', 'Príprava reportov'],
        location: 'Bratislava',
        isRemote: true,
        type: 'INTERNSHIP',
        minSalary: 550,
        maxSalary: 700,
        skills: ['Python', 'SQL', 'Spark'],
      },
      {
        title: 'Junior SQL Developer',
        description:
          'Pracuj s dátovými skladmi a píš SQL dotazy pre analytické tímy.',
        requirements: ['SQL', 'Základy databáz', 'Logické myslenie'],
        responsibilities: ['SQL dotazy', 'Reporty', 'Optimalizácia výkonu'],
        location: 'Bratislava',
        type: 'JUNIOR',
        minSalary: 1150,
        maxSalary: 1500,
        skills: ['SQL', 'PostgreSQL', 'ETL'],
      },
    ],
  },
];

async function main() {
  const passwordHash = await bcrypt.hash('password123', 12);

  // ===== Admin =====
  await prisma.user.upsert({
    where: { email: 'admin@dajflek.sk' },
    update: {},
    create: {
      email: 'admin@dajflek.sk',
      passwordHash,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      isVerified: true,
    },
  });

  // ===== Candidate =====
  await prisma.user.upsert({
    where: { email: 'kandidat@example.sk' },
    update: {},
    create: {
      email: 'kandidat@example.sk',
      passwordHash,
      firstName: 'Ján',
      lastName: 'Kandidát',
      role: 'CANDIDATE',
      isVerified: true,
      candidateProfile: {
        create: {
          title: 'Junior React Developer',
          bio: 'Absolvent FIT, hľadám prvú pracovnú skúsenosť',
          location: 'Bratislava',
          skills: JSON.stringify(['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Node.js']),
          experience: 0,
          education: 'FIT STU',
          githubUrl: 'https://github.com/jankandidat',
          linkedinUrl: 'https://linkedin.com/in/jankandidat',
        },
      },
    },
  });

  // ===== Employers + Jobs =====
  let createdJobs = 0;

  for (const company of COMPANIES) {
    const user = await prisma.user.upsert({
      where: { email: company.email },
      update: {},
      create: {
        email: company.email,
        passwordHash,
        firstName: company.firstName,
        lastName: company.lastName,
        role: 'EMPLOYER',
        isVerified: true,
      },
    });

    const employerProfile = await prisma.employerProfile.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        companyName: company.companyName,
        companySize: company.companySize,
        industry: company.industry,
        description: company.description,
        website: company.website,
        location: company.location,
        isVerified: company.isVerified,
      },
    });

    for (const job of company.jobs) {
      const existing = await prisma.job.findFirst({
        where: { employerId: employerProfile.id, title: job.title },
      });

      if (!existing) {
        await prisma.job.create({
          data: {
            employerId: employerProfile.id,
            title: job.title,
            description: job.description,
            requirements: JSON.stringify(job.requirements),
            responsibilities: JSON.stringify(job.responsibilities),
            location: job.location,
            isRemote: job.isRemote ?? false,
            type: job.type,
            minSalary: job.minSalary,
            maxSalary: job.maxSalary,
            currency: job.currency ?? 'EUR',
            status: 'ACTIVE',
            skills: JSON.stringify(job.skills),
          },
        });
        createdJobs++;
      }
    }
  }

  // ===== Clean duplicate jobs (same employer + title) =====
  const allJobs = await prisma.job.findMany({ orderBy: { createdAt: 'asc' } });
  const seen = new Set<string>();
  let removed = 0;
  for (const job of allJobs) {
    const key = `${job.employerId}|${job.title}`;
    if (seen.has(key)) {
      await prisma.job.delete({ where: { id: job.id } });
      removed++;
    } else {
      seen.add(key);
    }
  }

  // ===== Contact messages (idempotent) =====
  const msgCount = await prisma.contactMessage.count();
  if (msgCount === 0) {
    await prisma.contactMessage.createMany({
      data: [
        {
          name: 'Mária Horváthová',
          email: 'maria@example.sk',
          subject: 'Spolupráca s portálom',
          message:
            'Dobrý deň, som HR manažérka vo firme DataSoft. Radi by sme začali využívať DajFlek na nábor juniorov. Viete mi poskytnúť viac informácií o možnostiach spolupráce a cenových balíkoch? Ďakujem.',
          status: 'UNREAD',
        },
        {
          name: 'Igor Novák',
          email: 'igor@example.sk',
          subject: 'Chyba pri registrácii',
          message:
            'Dobrý deň, pri registrácii sa mi zobrazuje chyba, že email je už používaný, ale ja som si ešte nikdy účet nevytváral. Prosím o pomoc. Ďakujem.',
          status: 'READ',
        },
        {
          name: 'Lucia Kováčová',
          email: 'lucia@example.sk',
          subject: 'Návrh na vylepšenie',
          message:
            'Pekný deň, používam DajFlek ako kandidátka a chcela by som navrhnúť možnosť nahrať viacero verzií CV. Občas potrebujem poslať iné CV na rôzne pozície. Ďakujem za zváženie.',
          status: 'REPLIED',
          reply:
            'Dobrý deň Lucia, ďakujeme za Váš návrh. Momentálne pracujeme na vylepšení CV Buildera, ktorý bude podporovať viacero verzií CV. Sledujte nás, čoskoro to spustíme.',
          repliedAt: new Date('2026-06-18'),
        },
      ],
    });
  }

  const jobCount = await prisma.job.count();
  console.log('Seed completed successfully');
  console.log('---');
  console.log(`Total jobs: ${jobCount}`);
  if (createdJobs > 0) console.log(`Created jobs: ${createdJobs}`);
  if (removed > 0) console.log(`Removed duplicate jobs: ${removed}`);
  console.log('Admin: admin@dajflek.sk / password123');
  console.log('Candidate: kandidat@example.sk / password123');
  console.log('Employer: firma@example.sk / password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });