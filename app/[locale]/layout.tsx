import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { LanguageSwitch } from "@/components/layout/language-switch";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { api } from "@/lib/api";
import { locales, hasLocale, htmlLangOf } from "@/lib/content";
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    title: {
      default: dict.meta.title,
      template: `%s | ${dict.meta.title}`,
    },
    description: dict.meta.description,
    openGraph: {
      type: "website",
      siteName: dict.meta.title,
      title: dict.meta.title,
      description: dict.meta.description,
    },
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

  const [dict, settings] = await Promise.all([
    getDictionary(locale),
    api.getSiteSettings(locale),
  ]);

  return (
    <html
      lang={htmlLangOf(locale)}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader
          locale={locale}
          settings={settings}
          labels={dict.layout}
          languageSwitch={
            <LanguageSwitch locale={locale} label={dict.common.language} />
          }
        />
        {children}
        <SiteFooter
          siteName={settings.siteName}
          footer={settings.footer}
          labels={{
            contact: dict.layout.footerContact,
            follow: dict.layout.footerFollow,
            address: dict.layout.address,
            email: dict.layout.email,
            phone: dict.layout.phone,
          }}
        />
      </body>
    </html>
  );
}
