import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <section className="container-site py-24 md:py-32">
      <p className="font-serif text-6xl text-clay-ink" aria-hidden="true">
        404
      </p>
      <h1 className="mt-4 font-serif text-4xl font-medium">{t("title")}</h1>
      <p className="mt-4 max-w-xl text-lg text-evergreen/80">{t("lead")}</p>
      <ButtonLink href="/" className="mt-8">
        {t("back")}
      </ButtonLink>
    </section>
  );
}
