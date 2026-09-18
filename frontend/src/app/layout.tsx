import type { Metadata } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono, Fredoka } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { ThemeProvider } from "@/lib/theme";
import { ErrorBoundary } from "@/components/error-boundary";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-ibm-plex-mono",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: "DajFlek - Práca pre juniorov a stážistov",
  description: "Nájdi svoju prvú prácu. Ponuky pre juniorov, stážistov a absolventov.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className="h-full antialiased">
      <body className={`${inter.className} ${spaceGrotesk.variable} ${ibmPlexMono.variable} ${fredoka.variable} min-h-full flex flex-col`}>
        <AuthProvider>
          <ThemeProvider>
            <ErrorBoundary>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </ErrorBoundary>
            <Toaster position="top-right" richColors />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
