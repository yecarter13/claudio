"use client";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Lock, MessageCircle } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/data";
import { PlatformIcon } from "@/components/ui/PlatformIcon";
import { RevealSection } from "@/components/ui/RevealSection";
import { SectionLabel } from "@/components/ui/SectionLabel";

const E = [0.22, 1, 0.36, 1] as const;
const fadeUp    = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: E } } };
const fadeRight = { hidden: { opacity: 0, x: 28 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: E } } };

const SUBJECT_OPTIONS = [
  "Collaboration / Sponsoring", "Invitation Événement", "Projet Film/Série",
  "Projet Musical", "Interview / Média", "Autre",
] as const;

const SOCIALS = [
  { key: "facebook",  href: SOCIAL_LINKS.facebook  },
  { key: "instagram", href: SOCIAL_LINKS.instagram  },
  { key: "tiktok",    href: SOCIAL_LINKS.tiktok     },
  { key: "youtube",   href: SOCIAL_LINKS.youtube    },
  { key: "snapchat",  href: SOCIAL_LINKS.snapchat   },
] as const;

type ActionItem = { Icon: React.FC<{ className?: string }>; text: string; href: string };
type InfoItem   = { Icon: React.FC<{ className?: string }>; label: string; value: string; href: string | null; sub?: string; actions: ActionItem[] };

const INFO_ITEMS: InfoItem[] = [
  { Icon: Mail,   label: "Email professionnel", value: "stromaeclaudio@gmail.com",
    href: SOCIAL_LINKS.email,
    actions: [{ Icon: Mail, text: "Envoyer un Email", href: SOCIAL_LINKS.email }] },
  { Icon: Phone,  label: "Téléphone / WhatsApp", value: "+237 6 76 45 64 32",
    href: SOCIAL_LINKS.phone,
    actions: [
      { Icon: Phone,         text: "Appeler",  href: SOCIAL_LINKS.phone    },
      { Icon: MessageCircle, text: "WhatsApp", href: SOCIAL_LINKS.whatsapp },
    ] },
  { Icon: MapPin, label: "Localisation", value: "Douala, Cameroun",
    href: null,
    sub: "Disponible pour déplacements internationaux",
    actions: [] },
];

export function ContactSection() {
  const [subject, setSubject]       = useState<string>(SUBJECT_OPTIONS[0]);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent]             = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSent(true); }, 1400);
  };

  return (
    <RevealSection id="contact" className="relative overflow-hidden py-20 md:py-28" style={{ background: "var(--bg-primary)" }}>
      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] opacity-[0.04] blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <SectionLabel>CONTACT</SectionLabel>
        <motion.h2 variants={fadeUp} className="font-display mt-6 text-4xl font-bold text-[var(--text-primary)] md:text-6xl">
          Vous avez un projet ?{" "}
          <span className="bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] bg-clip-text text-transparent">Parlons-en.</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-[var(--text-secondary)]">
          Collaboration, placement de marque, événement, ou juste dire bonjour.
        </motion.p>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Info */}
          <motion.div variants={{ hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.09 } } }} className="space-y-4">
            {INFO_ITEMS.map(({ Icon, label, value, href, sub, actions }) => (
              <motion.article key={label} variants={fadeUp}
                className="rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] p-5"
                style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="flex items-start gap-4">
                  <span className="rounded-xl bg-[var(--accent-light)] p-3 text-[var(--accent)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-accent text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">{label}</p>
                    {href
                      ? <a href={href} className="mt-1 block truncate text-base font-semibold text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]">{value}</a>
                      : <p className="mt-1 text-base font-semibold text-[var(--text-primary)]">{value}</p>
                    }
                    {sub && <p className="mt-0.5 text-sm text-[var(--text-secondary)]">{sub}</p>}
                    {actions.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {actions.map(({ Icon: AIcon, text, href: ah }) => (
                          <a key={text} href={ah}
                            target={ah.startsWith("http") ? "_blank" : undefined}
                            rel={ah.startsWith("http") ? "noreferrer" : undefined}
                            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-card)] bg-[var(--bg-secondary)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-all hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
                            aria-label={text}>
                            <AIcon className="h-3.5 w-3.5" aria-hidden="true" />{text}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}

            {/* Availability */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2.5 text-sm font-medium text-emerald-700">
              <span className="relative inline-flex h-2.5 w-2.5">
                <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Disponible · Réponse sous 24h
            </motion.div>

            {/* Social icons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              {SOCIALS.map((s) => (
                <a key={s.key} href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] text-[var(--text-secondary)] shadow-sm transition-all hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)] hover:scale-110"
                  aria-label={`Ouvrir ${s.key}`}>
                  <PlatformIcon platform={s.key} className="h-4 w-4" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div variants={fadeRight}
            className="rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] p-6"
            style={{ boxShadow: "var(--shadow-card)" }}>
            <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">Envoyez-moi un message</h3>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">Je lis tout. Vraiment.</p>

            {sent ? (
              <div className="mt-8 flex flex-col items-center gap-3 py-10 text-center">
                <CheckCircle className="h-12 w-12 text-emerald-500" />
                <p className="font-display text-xl font-bold text-[var(--text-primary)]">Message envoyé !</p>
                <p className="text-sm text-[var(--text-secondary)]">Je vous réponds dans les 24h.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {[
                  { type: "text",  placeholder: "Votre nom complet",   label: "Votre nom complet"   },
                  { type: "email", placeholder: "Votre adresse email",  label: "Votre adresse email"  },
                ].map(({ type, placeholder, label }) => (
                  <input key={label} required type={type} placeholder={placeholder} aria-label={label}
                    className="w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
                    style={{ background: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--text-primary)" }} />
                ))}

                <select value={subject} onChange={(e) => setSubject(e.target.value)} aria-label="Objet"
                  className="w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
                  style={{ background: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--text-primary)" }}>
                  {SUBJECT_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>

                <textarea required rows={4} placeholder="Décrivez votre projet…" aria-label="Décrivez votre projet"
                  className="w-full resize-none rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
                  style={{ background: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--text-primary)" }} />

                <motion.button type="submit" disabled={submitting}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-[0_4px_20px_var(--glow)] disabled:opacity-60"
                  aria-label="Envoyer le message">
                  {submitting ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Envoi en cours…
                    </span>
                  ) : (
                    <><Send className="h-4 w-4" aria-hidden="true" />Envoyer le Message</>
                  )}
                </motion.button>

                <p className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                  <Lock className="h-3 w-3" aria-hidden="true" />
                  Vos informations restent confidentielles.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </RevealSection>
  );
}
