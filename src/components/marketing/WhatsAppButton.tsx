import { getTranslations } from "next-intl/server";
import { getWhatsAppLink } from "@/lib/contact";
import { buttonStyles } from "@/components/ui/ButtonLink";

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3c-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 1.9 2.9 4.6 4 1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.3Z" />
    </svg>
  );
}

/** Renders nothing unless a real WhatsApp number is configured. */
export async function WhatsAppButton({
  variant = "primary",
  className = "",
}: {
  variant?: keyof typeof buttonStyles;
  className?: string;
}) {
  const t = await getTranslations("contact");
  const href = getWhatsAppLink(t("whatsappPrefill"));
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${buttonStyles[variant]} ${className}`}>
      <WhatsAppIcon />
      {t("whatsappCta")}
      <span className="sr-only"> ({t("opensWhatsapp")})</span>
    </a>
  );
}
