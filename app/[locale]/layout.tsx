import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { LanguageSwitch } from "@/components/layout/language-switch";
import { locales, hasLocale, htmlLangOf, type Locale } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [htmlLangOf(l), `/${l}`])),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <html
      lang={htmlLangOf(locale)}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <header className="border-b border-line bg-canvas">
          <Container className="flex h-14 items-center justify-end gap-2">
            <span className="text-xs tracking-caps uppercase text-ink-subtle">
              {dict.common.language}
            </span>
            <LanguageSwitch locale={locale as Locale} label={dict.common.language} />
          </Container>
        </header>
        {children}
      </body>
    </html>
  );
}
