import { notFound } from "next/navigation";
import { ContactForm } from "@/components/sections/contact-form";
import { Container } from "@/components/ui/container";
import { api } from "@/lib/api";
import { hasLocale } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const [dict, contact] = await Promise.all([
    getDictionary(locale),
    api.getContactPage(locale),
  ]);

  const infoItems: { label: string; value: string; href?: string }[] = [
    { label: dict.contact.address, value: contact.info.address },
    {
      label: dict.contact.email,
      value: contact.info.email,
      href: `mailto:${contact.info.email}`,
    },
    {
      label: dict.contact.phone,
      value: contact.info.phone,
      href: `tel:${contact.info.phone.replace(/\s+/g, "")}`,
    },
    { label: dict.contact.hours, value: contact.info.hours },
  ];

  return (
    <main className="flex flex-1 flex-col py-16 lg:py-20">
      <Container>
        <h1 className="text-display-sm text-ink lg:text-display-md">
          {contact.title}
        </h1>
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <section
            aria-labelledby="contact-info-heading"
            className="rounded-card border border-line bg-surface p-6 shadow-card"
          >
            <h2
              id="contact-info-heading"
              className="text-sm font-medium tracking-caps uppercase text-ink-subtle"
            >
              {dict.contact.infoHeading}
            </h2>
            <dl className="mt-6 space-y-5 text-sm">
              {infoItems.map((item) => (
                <div key={item.label}>
                  <dt className="text-ink-subtle">{item.label}</dt>
                  <dd className="mt-1 break-words text-ink">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-brand-600 transition-colors hover:text-brand-700"
                      >
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <ContactForm formConfig={contact.formConfig} labels={dict.contact} />
        </div>
      </Container>
    </main>
  );
}
