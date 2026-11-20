"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useForm, useWatch, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  CONTACT_METHODS,
  COUNTRIES,
  GOALS,
  MESSAGE_MAX,
  enquirySchema,
  type Enquiry,
  type EnquiryInput,
} from "@/lib/validation/enquiry";
import { buttonStyles } from "@/components/ui/ButtonLink";

type Status = "idle" | "submitting" | "success" | "error" | "rateLimited" | "notConfigured";

const KNOWN_ERRORS = new Set([
  "nameRequired",
  "nameTooLong",
  "emailInvalid",
  "phoneInvalid",
  "contactRequired",
  "methodRequired",
  "methodEmailMissing",
  "methodPhoneMissing",
  "messageTooLong",
  "consentRequired",
]);

const inputClass =
  "block w-full min-h-12 rounded-[10px] border border-neutral bg-white px-4 py-3 text-base text-evergreen placeholder:text-evergreen/50 transition-colors hover:border-sage focus:border-evergreen focus:outline-2 focus:outline-offset-0 focus:outline-evergreen aria-[invalid=true]:border-clay disabled:cursor-not-allowed disabled:bg-cream";

function FieldLabel({
  htmlFor,
  children,
  optional = false,
}: {
  htmlFor: string;
  children: string;
  optional?: boolean;
}) {
  const t = useTranslations("contact.form");
  return (
    <label htmlFor={htmlFor} className="mb-2 block font-semibold">
      {children}{" "}
      <span className="text-sm font-normal text-evergreen/75">({optional ? t("optional") : t("required")})</span>
    </label>
  );
}

function FieldError({ id, message }: { id: string; message: string | null }) {
  return message ? (
    <p id={id} className="mt-2 text-sm font-medium text-clay-ink">
      {message}
    </p>
  ) : null;
}

export function EnquiryForm({ configured, hasDirectContact }: { configured: boolean; hasDirectContact: boolean }) {
  const t = useTranslations("contact.form");
  const locale = useLocale();
  const id = useId();
  const startedAt = useRef<number>(0);
  const statusRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>(configured ? "idle" : "notConfigured");

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors },
  } = useForm<EnquiryInput, unknown, Enquiry>({
    resolver: zodResolver(enquirySchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      country: "",
      goal: "",
      preferredContact: undefined,
      message: "",
      consent: false,
    },
  });

  const messageLength = (useWatch({ control, name: "message" }) ?? "").length;
  const honeypot = useRef<HTMLInputElement>(null);

  const focusStatus = () => requestAnimationFrame(() => statusRef.current?.focus());

  async function onSubmit(values: Enquiry) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enquiry: values,
          meta: { website: honeypot.current?.value ?? "", startedAt: startedAt.current, locale },
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { status?: string; errors?: Record<string, string> };

      if (res.ok && body.status === "ok") {
        setStatus("success");
        reset();
      } else if (body.status === "invalid" && body.errors) {
        setStatus("idle");
        for (const [field, key] of Object.entries(body.errors)) {
          setError(field as FieldPath<EnquiryInput>, { type: "server", message: key });
        }
        return;
      } else if (res.status === 429) {
        setStatus("rateLimited");
      } else if (body.status === "not_configured") {
        setStatus("notConfigured");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    focusStatus();
  }

  const err = (field: keyof EnquiryInput) => {
    const key = errors[field]?.message;
    if (!key) return null;
    return t(`errors.${KNOWN_ERRORS.has(key) ? key : "invalid"}` as "errors.invalid");
  };

  const fid = (name: string) => `${id}-${name}`;
  const describedBy = (name: string, hint?: boolean) =>
    [hint ? `${fid(name)}-hint` : null, errors[name as keyof EnquiryInput] ? `${fid(name)}-error` : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const disabled = !configured || status === "submitting";

  const statusMessage =
    status === "success"
      ? t("status.success")
      : status === "error"
        ? t("status.error")
        : status === "rateLimited"
          ? t("status.rateLimited")
          : status === "notConfigured"
            ? hasDirectContact
              ? t("status.notConfiguredWithContact")
              : t("status.notConfiguredNoContact")
            : null;

  const tone =
    status === "success"
      ? "border-evergreen bg-evergreen text-cream"
      : status === "notConfigured"
        ? "border-neutral bg-cream text-evergreen"
        : "border-clay bg-white text-evergreen";

  return (
    <form
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
      noValidate
      aria-describedby={statusMessage ? fid("status") : undefined}
    >
      <div
        ref={statusRef}
        id={fid("status")}
        tabIndex={-1}
        role={status === "success" || status === "notConfigured" ? "status" : "alert"}
        aria-live="polite"
        className={statusMessage ? `mb-8 rounded-[10px] border px-5 py-4 font-medium outline-none ${tone}` : "sr-only"}
      >
        {statusMessage}
      </div>

      <fieldset disabled={disabled} className="space-y-6">
        <legend className="sr-only">{t("legend")}</legend>

        <div>
          <FieldLabel htmlFor={fid("name")}>{t("name")}</FieldLabel>
          <input
            id={fid("name")}
            type="text"
            autoComplete="name"
            className={inputClass}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
            aria-required="true"
            {...register("name")}
          />
          <FieldError id={`${fid("name")}-error`} message={err("name")} />
        </div>

        <div className="rounded-[12px] border border-neutral p-5">
          <p id={fid("contact-hint")} className="mb-4 text-[0.95rem] text-evergreen/80">
            {t("contactHint")}
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <FieldLabel htmlFor={fid("email")} optional>
                {t("email")}
              </FieldLabel>
              <input
                id={fid("email")}
                type="email"
                dir="ltr"
                inputMode="email"
                autoComplete="email"
                className={`${inputClass} text-start`}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={[fid("contact-hint"), describedBy("email")].filter(Boolean).join(" ")}
                {...register("email")}
              />
              <FieldError id={`${fid("email")}-error`} message={err("email")} />
            </div>
            <div>
              <FieldLabel htmlFor={fid("phone")} optional>
                {t("phone")}
              </FieldLabel>
              <input
                id={fid("phone")}
                type="tel"
                dir="ltr"
                inputMode="tel"
                autoComplete="tel"
                className={`${inputClass} text-start`}
                aria-invalid={errors.phone ? true : undefined}
                aria-describedby={[fid("contact-hint"), describedBy("phone", true)].filter(Boolean).join(" ")}
                {...register("phone")}
              />
              <p id={`${fid("phone")}-hint`} className="mt-2 text-sm text-evergreen/75">
                {t.rich("phoneHint", { ltr: (chunks) => <bdi dir="ltr">{chunks}</bdi> })}
              </p>
              <FieldError id={`${fid("phone")}-error`} message={err("phone")} />
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <FieldLabel htmlFor={fid("country")} optional>
              {t("country")}
            </FieldLabel>
            <select id={fid("country")} autoComplete="country" className={inputClass} {...register("country")}>
              <option value="">{t("countryPlaceholder")}</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {t(`countries.${c}`)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <FieldLabel htmlFor={fid("goal")} optional>
              {t("goal")}
            </FieldLabel>
            <select id={fid("goal")} className={inputClass} {...register("goal")}>
              <option value="">{t("goalPlaceholder")}</option>
              {GOALS.map((g) => (
                <option key={g} value={g}>
                  {t(`goals.${g}`)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <fieldset aria-describedby={errors.preferredContact ? `${fid("preferredContact")}-error` : undefined}>
          <legend className="mb-3 font-semibold">
            {t("preferredContact")} <span className="text-sm font-normal text-evergreen/75">({t("required")})</span>
          </legend>
          <div className="flex flex-wrap gap-3">
            {CONTACT_METHODS.map((m) => (
              <label
                key={m}
                className="flex min-h-12 cursor-pointer items-center gap-3 rounded-[10px] border border-neutral bg-white px-4 has-[:checked]:border-evergreen has-[:checked]:bg-cream has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-clay"
              >
                <input type="radio" value={m} className="h-4 w-4 accent-evergreen" {...register("preferredContact")} />
                <span>{t(`methods.${m}`)}</span>
              </label>
            ))}
          </div>
          <FieldError id={`${fid("preferredContact")}-error`} message={err("preferredContact")} />
        </fieldset>

        <div>
          <FieldLabel htmlFor={fid("message")} optional>
            {t("message")}
          </FieldLabel>
          <textarea
            id={fid("message")}
            rows={5}
            maxLength={MESSAGE_MAX}
            className={`${inputClass} resize-y`}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy("message", true)}
            {...register("message")}
          />
          <p id={`${fid("message")}-hint`} className="mt-2 flex justify-between gap-4 text-sm text-evergreen/75">
            <span>{t("messageHint")}</span>
            <span aria-hidden="true" className="ltr-isolate shrink-0 tabular-nums">
              {messageLength}/{MESSAGE_MAX}
            </span>
          </p>
          <FieldError id={`${fid("message")}-error`} message={err("message")} />
        </div>

        {/* Honeypot: hidden from people and assistive tech, often filled by bots. */}
        <div aria-hidden="true" className="absolute -start-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={fid("website")}>{t("honeypot")}</label>
          <input
            ref={honeypot}
            id={fid("website")}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>

        <div>
          <div className="flex items-start gap-3">
            <input
              id={fid("consent")}
              type="checkbox"
              className="mt-1 h-5 w-5 shrink-0 accent-evergreen"
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={describedBy("consent")}
              aria-required="true"
              {...register("consent")}
            />
            <label htmlFor={fid("consent")} className="leading-relaxed">
              {t("consent")}{" "}
              <Link href="/privacy" className="font-semibold underline underline-offset-4">
                {t("privacyLink")}
              </Link>
            </label>
          </div>
          <FieldError id={`${fid("consent")}-error`} message={err("consent")} />
        </div>

        <button
          type="submit"
          className={`${buttonStyles.primary} w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto`}
        >
          {status === "submitting" ? t("submitting") : t("submit")}
        </button>
      </fieldset>
    </form>
  );
}
