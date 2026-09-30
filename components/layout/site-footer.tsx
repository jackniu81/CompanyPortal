import { Container } from "@/components/ui/container";
import type { SiteSettings } from "@/lib/api";

export function SiteFooter({
  siteName,
  footer,
  labels,
}: {
  siteName: string;
  footer: SiteSettings["footer"];
  labels: {
    contact: string;
    follow: string;
    address: string;
    email: string;
    phone: string;
  };
}) {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <Container className="flex flex-col gap-10 py-14 lg:flex-row lg:justify-between lg:gap-16">
        <section aria-labelledby="footer-contact-heading" className="max-w-measure">
          <h2
            id="footer-contact-heading"
            className="text-sm font-medium tracking-caps uppercase text-ink-subtle"
          >
            {labels.contact}
          </h2>
          <p className="mt-4 text-lg font-medium text-ink">{siteName}</p>
          <address className="mt-3 flex flex-col gap-1 break-words text-sm not-italic leading-relaxed text-ink-muted">
            <span>
              <span className="sr-only">{labels.address}：</span>
              {footer.address}
            </span>
            <a href={`mailto:${footer.email}`} className="transition-colors hover:text-ink">
              <span className="sr-only">{labels.email}：</span>
              {footer.email}
            </a>
            <a href={`tel:${footer.phone.replace(/\s+/g, "")}`} className="transition-colors hover:text-ink">
              <span className="sr-only">{labels.phone}：</span>
              {footer.phone}
            </a>
          </address>
        </section>

        <section aria-labelledby="footer-follow-heading">
          <h2
            id="footer-follow-heading"
            className="text-sm font-medium tracking-caps uppercase text-ink-subtle"
          >
            {labels.follow}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {footer.social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={/^https?:/.test(item.href) ? "_blank" : undefined}
                  rel={/^https?:/.test(item.href) ? "noopener noreferrer" : undefined}
                  className="inline-block rounded-field border border-line bg-canvas px-3 py-1.5 text-sm text-ink-muted transition-colors hover:border-brand-300 hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </Container>
      <Container className="border-t border-line py-6">
        <p className="text-xs text-ink-subtle">{footer.copyright}</p>
      </Container>
    </footer>
  );
}
