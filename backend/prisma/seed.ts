import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@juniorportal.sk' },
    update: {},
    create: {
      email: 'admin@juniorportal.sk',
      passwordHash,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      isVerified: true,
    },
  });

  const candidate = await prisma.user.upsert({
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

  const employer = await prisma.user.upsert({
    where: { email: 'firma@example.sk' },
    update: {},
    create: {
      email: 'firma@example.sk',
      passwordHash,
      firstName: 'Peter',
      lastName: 'Zamestnávateľ',
      role: 'EMPLOYER',
      isVerified: true,
      employerProfile: {
        create: {
          companyName: 'TechSolutions s.r.o.',
          companySize: '50-100',
          industry: 'Information Technology',
          description: 'Moderná IT firma zameraná na vývoj webových aplikácií',
          website: 'https://techsolution.sk',
          location: 'Bratislava',
          isVerified: true,
        },
      },
    },
  });

  const employerProfile = await prisma.employerProfile.findUnique({
    where: { userId: employer.id },
  });

  if (employerProfile && employerProfile.id) {
    await prisma.job.createMany({
      data: [
        {
          employerId: employerProfile.id,
          title: 'Junior React Developer',
          description: 'Hľadáme nadšeného junior developera so znalosťou Reactu. Ponúkame mentoring, školenia a prácu v skvelom tíme.',
          requirements: JSON.stringify(['Základy Reactu', 'TypeScript', 'HTML/CSS', 'Ochota učiť sa']),
          responsibilities: JSON.stringify(['Vývoj UI komponentov', 'Code review', 'Spolupráca s tímom']),
          location: 'Bratislava',
          type: 'JUNIOR',
          minSalary: 1200,
          maxSalary: 1800,
          skills: JSON.stringify(['React', 'TypeScript', 'CSS']),
        },
        {
          employerId: employerProfile.id,
          title: 'Stážista Full-stack Developer',
          description: 'Stáž pre študentov IT. Získaj prax na reálnych projektoch s podporou skúsených mentorov.',
          requirements: JSON.stringify(['Základy JavaScriptu', 'Základy databáz', 'Aktívny študent IT']),
          responsibilities: JSON.stringify(['Pomoc s vývojom', 'Testovanie', 'Dokumentácia']),
          location: 'Bratislava',
          isRemote: true,
          type: 'INTERNSHIP',
          minSalary: 4,
          maxSalary: 6,
          currency: 'EUR/hod',
          skills: JSON.stringify(['JavaScript', 'SQL', 'Git']),
        },
      ],
    });
  }

  console.log('Seed completed successfully');
  console.log('---');
  console.log('Admin: admin@juniorportal.sk / password123');
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
