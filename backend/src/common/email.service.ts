import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    const host = process.env.SMTP_HOST;
    if (host) {
      this.transporter = nodemailer.createTransport({
        host,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    }
  }

  async send(options: { to: string; subject: string; text: string; html?: string }) {
    if (this.transporter) {
      try {
        await this.transporter.sendMail({
          from: process.env.SMTP_FROM || 'noreply@juniorportal.sk',
          ...options,
        });
      } catch (err) {
        console.error('Email send failed:', err);
      }
    } else {
      console.log(`[EMAIL] To: ${options.to} | Subject: ${options.subject}`);
      console.log(`[EMAIL] Body: ${options.text}`);
    }
  }

  async sendPasswordReset(email: string, link: string) {
    await this.send({
      to: email,
      subject: 'Obnova hesla - JuniorPortal',
      text: `Pre obnovu hesla klikni na nasledujúci odkaz: ${link}\n\nPlatnosť odkazu je 1 hodina.\n\nAk si nežiadal/a o obnovu hesla, ignoruj tento email.`,
      html: `
        <h2>Obnova hesla</h2>
        <p>Pre obnovu hesla klikni na tlačidlo nižšie:</p>
        <a href="${link}" style="display:inline-block;padding:12px 24px;background:#644AE9;color:#fff;text-decoration:none;border-radius:8px;margin:16px 0;">Obnoviť heslo</a>
        <p style="color:#666;font-size:12px;">Platnosť odkazu je 1 hodina. Ak si nežiadal/a o obnovu hesla, ignoruj tento email.</p>
      `,
    });
  }

  async sendJobAlert(email: string, jobs: { title: string; company: string; location: string; link: string }[]) {
    const jobsHtml = jobs.map(j => `
      <div style="padding:12px;border:1px solid #e5e7eb;border-radius:8px;margin-bottom:8px;">
        <a href="${j.link}" style="font-size:16px;font-weight:600;color:#644AE9;text-decoration:none;">${j.title}</a>
        <p style="color:#666;margin:4px 0;">${j.company} &middot; ${j.location}</p>
      </div>
    `).join('');

    await this.send({
      to: email,
      subject: `Nové ponuky na JuniorPortáli (${jobs.length})`,
      text: `Nové pracovné ponuky:\n\n${jobs.map(j => `${j.title} - ${j.company} (${j.location}): ${j.link}`).join('\n')}`,
      html: `
        <h2 style="color:#1a1a2e;">Nové pracovné ponuky</h2>
        <p style="color:#666;">Našli sme ${jobs.length} nových ponúk podľa tvojich kritérií:</p>
        ${jobsHtml}
        <p style="color:#999;font-size:12px;margin-top:16px;">Tento email bol odoslaný na základe tvojho uloženého vyhľadávania na JuniorPortáli.</p>
      `,
    });
  }
}
