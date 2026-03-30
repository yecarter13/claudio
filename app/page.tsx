"use client";

import {
    FormEvent,
    ReactNode,
    useDeferredValue,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    AnimatePresence,
    motion,
    useInView,
    useReducedMotion,
} from "framer-motion";
import {
    ChevronDown,
    ChevronUp,
    Mail,
    Menu,
    Phone,
    Play,
    X,
    Sun,
    Moon,
    Sparkles,
} from "lucide-react";

/* ================================================================
   DATA CONSTANTS — edit all text & links here
================================================================ */

const HERO_TITLE_FIRST = "CLAUDIO";
const HERO_TITLE_LAST = "NJALLA";
const HERO_SUBTITLE_LABEL = "Cameroonian Creator · Entertainment · Culture";
const HERO_TAGLINE =
    "Je suis là pour vous divertir, vous faire rire, et vous faire vivre des émotions authentiques. Cameroun dans le cœur, le monde dans ma vision.";
const HERO_SOCIAL_PROOF = "4M+ personnes me suivent déjà ✨";
const HERO_SCROLL_TEXT = "Scroll pour découvrir";

const ABOUT_HEADING = "Je suis Claudio Njalla.";
const ABOUT_SUBHEADING = "Et je suis là pour ne jamais vous ennuyer.";
const ABOUT_BIO_1 =
    "Je m'appelle Claudio Njalla — comédien, acteur, musicien, et avant tout, quelqu'un qui aime faire sourire les gens. Je suis né et j'ai grandi au Cameroun, un pays riche en culture, en humour, et en talent.";
const ABOUT_BIO_2 =
    "Avec plus de 4 millions d'abonnés sur mes réseaux sociaux, j'ai eu la chance de toucher des cœurs bien au-delà de nos frontières. Mais ce qui compte le plus pour moi ? Votre sourire. Votre émotion. Votre connexion.";
const ABOUT_BIO_3 =
    "Que ce soit sur un plateau de tournage, derrière un micro, ou devant ma caméra pour vous faire rire — je donne tout. Toujours.";

const SOCIAL_HEADING = "Rejoignez les millions qui me suivent déjà.";
const SOCIAL_SUBHEADING =
    "Chaque like, chaque partage, chaque commentaire — c'est vous qui me donnez l'énergie de créer chaque jour.";
const SOCIAL_TOTAL_TEXT = "TOTAL : 4,006,200+ personnes dans ma communauté mondiale 🌍";

const SHOWS_HEADING = "Bienvenue dans mon univers comique.";
const SHOWS_SUBHEADING =
    "J'anime des émissions qui cassent les codes. Voici ce que j'ai créé pour vous faire vivre des moments uniques.";

const FILMS_HEADING = "Derrière la caméra, je joue pour de vrai.";
const FILMS_SUBHEADING =
    "L'humour c'est ma nature, mais le jeu dramatique c'est mon âme. Voici mes œuvres cinématographiques — chaque film est un morceau de moi.";

const MUSIC_HEADING = "Quand je ne vous fais pas rire...";
const MUSIC_HEADING_ACCENT = "...je vous fais ressentir.";
const MUSIC_SUBHEADING =
    "La musique, c'est mon côté le plus intime. Voici mes titres — écoutez-les, et vous me connaîtrez vraiment.";

const CONTACT_HEADING = "Vous avez un projet ?";
const CONTACT_HEADING_ACCENT = "Parlons-en.";
const CONTACT_SUBHEADING =
    "Que ce soit pour une collaboration, un placement de marque, un événement, ou simplement pour dire bonjour — ma porte est ouverte. Enfin... mon téléphone. Ma porte est toujours fermée 😄";

const FOOTER_QUOTE =
    "Merci d'être passé. Revenez souvent — j'ai toujours quelque chose de nouveau à vous montrer. 🙏✨";

const TYPEWRITER_ROLES = ["Comedian", "Influencer", "Actor", "Music Artist"] as const;

const SUBJECT_OPTIONS = [
    "Collaboration / Sponsoring",
    "Invitation Événement",
    "Projet Film/Série",
    "Projet Musical",
    "Interview / Média",
    "Autre",
] as const;

const BUDGET_OPTIONS = [
    "< 500K FCFA",
    "500K–2M FCFA",
    "2M–10M FCFA",
    "Discutons-en",
] as const;

const NAV_LINKS = [
    { id: "about", label: "About" },
    { id: "shows", label: "Shows" },
    { id: "films", label: "Films" },
    { id: "music", label: "Music" },
    { id: "contact", label: "Contact" },
] as const;

// TODO: Replace all placeholder image URLs with real photos
const IMAGES = {
    heroBg:
        "https://placehold.co/1920x1080/0A0A0A/1a1a1a?text=.",
    // TODO: Replace with a wide landscape photo of Claudio (event/stage)
    heroCutout:
        "https://placehold.co/600x900/111111/D4AF37?text=CLAUDIO+CUTOUT",
    // TODO: Replace with a real detoured PNG (use remove.bg)
    aboutMain:
        "https://placehold.co/560x560/141414/D4AF37?text=Photo+Claudio",
    // TODO: Replace with a professional portrait photo
    aboutSecondary:
        "https://placehold.co/180x180/1a1a1a/FF6B00?text=Backstage",
    // TODO: Replace with a candid/behind-the-scenes photo
    show1: "https://placehold.co/600x380/141414/D4AF37?text=Pop+The+Balloon",
    // TODO: Replace with show thumbnail
    show2: "https://placehold.co/600x380/141414/FF6B00?text=Speed+Date",
    // TODO: Replace with show thumbnail
    show3: "https://placehold.co/600x380/141414/D4AF37?text=Clash+of+Couples",
    // TODO: Replace with show thumbnail
    film1: "https://placehold.co/300x440/141414/D4AF37?text=IMPOSSIBLE%0ALOVE",
    // TODO: Replace with real movie poster
    film2: "https://placehold.co/300x440/141414/FF6B00?text=MY+SISTER'S%0AHUSBAND",
    // TODO: Replace with real movie poster
    film3: "https://placehold.co/300x440/141414/D4AF37?text=BLOODY%0AFRIENDS",
    // TODO: Replace with real movie poster
    film4: "https://placehold.co/300x440/141414/FF6B00?text=FROM+ASH%0ATO+LOVE",
    // TODO: Replace with real movie poster
    track1: "https://placehold.co/300x300/141414/D4AF37?text=FIN",
    // TODO: Replace with real album cover
    track2: "https://placehold.co/300x300/141414/FF6B00?text=MA+WOMAN",
    // TODO: Replace with real album cover
    track3: "https://placehold.co/300x300/141414/D4AF37?text=BOLE",
    // TODO: Replace with real album cover
} as const;

// TODO: Update all social links with real URLs
const SOCIAL_LINKS = {
    facebook: "https://www.facebook.com/claudionjalla",
    tiktok: "#", // TODO: Add real TikTok URL
    instagram: "#", // TODO: Add real Instagram URL
    snapchat: "#", // TODO: Add real Snapchat URL
    youtube: "#", // TODO: Add real YouTube URL
    whatsapp: "https://wa.me/237676456432",
    email: "mailto:stromaeclaudio@gmail.com",
    phone: "tel:+237676456432",
} as const;

/* ================================================================
   ANIMATION VARIANTS
================================================================ */
const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_SPRING = { type: "spring", stiffness: 220, damping: 22, mass: 0.8 };

const fadeInUp = {
    hidden: { opacity: 0, y: 44 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: EASE_OUT } },
};

const fadeInLeft = {
    hidden: { opacity: 0, x: -44 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.72, ease: EASE_OUT } },
};

const fadeInRight = {
    hidden: { opacity: 0, x: 44 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.72, ease: EASE_OUT } },
};

const staggerContainer = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: EASE_OUT } },
};

/* ================================================================
   STATIC DATA ARRAYS
================================================================ */
const HERO_PLATFORM_STATS = [
    { key: "tiktok",     label: "TikTok",     count: "2.4M",   icon: "tiktok"    },
    { key: "facebook",   label: "Facebook",   count: "975K",   icon: "facebook"  },
    { key: "snapchat",   label: "Snapchat",   count: "232.2K", icon: "snapchat"  },
    { key: "instagram",  label: "Instagram",  count: "181K",   icon: "instagram" },
    { key: "youtube",    label: "YouTube",    count: "219K",   icon: "youtube"   },
] as const;

const ABOUT_STATS = [
    { icon: "🎭", count: 3, prefix: "+", label: "Émissions" },
    { icon: "🎵", count: 3, prefix: "",  label: "Titres"    },
    { icon: "🎬", count: 4, prefix: "",  label: "Films"     },
] as const;

const SOCIAL_CARDS = [
    {
        key: "tiktok",
        count: 2400000,
        label: "Followers TikTok",
        quote: "Mes sketchs les plus fous sont là 😂",
        cta: "Me Suivre →",
        href: SOCIAL_LINKS.tiktok,
        glow: "rgba(255,255,255,0.16)",
        glowHover: "rgba(255,255,255,0.28)",
    },
    {
        key: "facebook",
        count: 975000,
        label: "Followers Facebook",
        quote: "Ma communauté principale — venez ! 🔥",
        cta: "Me Suivre →",
        href: SOCIAL_LINKS.facebook,
        glow: "rgba(24,119,242,0.28)",
        glowHover: "rgba(24,119,242,0.48)",
    },
    {
        key: "snapchat",
        count: 232200,
        label: "Followers Snapchat",
        quote: "Les coulisses exclusives sont ici 👻",
        cta: "M'Ajouter →",
        href: SOCIAL_LINKS.snapchat,
        glow: "rgba(255,252,0,0.22)",
        glowHover: "rgba(255,252,0,0.38)",
    },
    {
        key: "youtube",
        count: 219000,
        label: "Abonnés YouTube",
        quote: "Vidéos longues, émotions fortes 🎬",
        cta: "S'Abonner →",
        href: SOCIAL_LINKS.youtube,
        glow: "rgba(255,0,0,0.22)",
        glowHover: "rgba(255,0,0,0.38)",
    },
    {
        key: "instagram",
        count: 181000,
        label: "Followers Instagram",
        quote: "Ma vie, mes moments, mes couleurs 📸",
        cta: "Me Suivre →",
        href: SOCIAL_LINKS.instagram,
        glow: "rgba(228,64,95,0.26)",
        glowHover: "rgba(228,64,95,0.44)",
    },
] as const;

const SHOWS = [
    {
        badge: "ÉMISSION PHARE 🔥",
        title: "Pop The Balloon by Claudio",
        description:
            "Mon émission signature ! Des invités, des défis, des révélations — et surtout, beaucoup de rires. Vous ne savez jamais ce qui va arriver. Moi non plus, d'ailleurs 😂",
        tags: ["Jeu", "Humour", "Talk-Show"],
        image: IMAGES.show1,
        href: "#", // TODO: Add YouTube/Facebook link
    },
    {
        badge: "LOVE & DRAMA 💘",
        title: "Speed Date",
        description:
            "Je réunis des célibataires, je pose les questions que tout le monde pense tout bas, et je laisse le chaos s'installer. Spoiler : ça finit rarement bien... mais toujours avec le sourire 😄",
        tags: ["Dating", "Humour", "Réalité"],
        image: IMAGES.show2,
        href: "#", // TODO: Add link
    },
    {
        badge: "COUPLE GOALS? 💥",
        title: "Clash of Couples",
        description:
            "Deux couples. Des défis. Des vérités qui font mal... mais qu'on dit en riant. C'est moi qui arbitre, et je vous promets — il y a toujours un perdant. Et c'est souvent le couple 😅",
        tags: ["Couples", "Challenge", "Drama"],
        image: IMAGES.show3,
        href: "#", // TODO: Add link
    },
] as const;

const FILMS = [
    {
        title: "IMPOSSIBLE LOVE",
        genre: "Romance · Drame",
        quote:
            "Un film sur l'amour qui défie toutes les règles. J'ai donné beaucoup de moi dans ce rôle.",
        image: IMAGES.film1,
        href: "#", // TODO: Add film URL
    },
    {
        title: "MY SISTER'S HUSBAND",
        genre: "Comédie · Famille",
        quote:
            "Jouer dans cette comédie familiale a été un plaisir absolu. Vous allez trop rire 😂",
        image: IMAGES.film2,
        href: "#", // TODO: Add film URL
    },
    {
        title: "BLOODY FRIENDS",
        genre: "Thriller · Action",
        quote:
            "Un rôle intense, sombre, que j'ai adoré explorer. Ce n'est pas le Claudio que vous connaissez — mais vous allez l'aimer quand même.",
        image: IMAGES.film3,
        href: "#", // TODO: Add film URL
    },
    {
        title: "FROM ASH TO LOVE",
        genre: "Romance · Espoir",
        quote:
            "L'histoire d'une renaissance. Ce film m'a touché profondément. Je crois que vous le ressentirez aussi.",
        image: IMAGES.film4,
        href: "#", // TODO: Add film URL
    },
] as const;

const TRACKS = [
    {
        title: "FIN",
        note:
            "Ce titre, c'est une introspection. La fin d'un chapitre, le début d'autre chose. Chaque mot vient du cœur.",
        duration: "3:42",
        image: IMAGES.track1,
        color: "gold" as const,
    },
    {
        title: "MA WOMAN",
        note:
            "Un hommage à la femme forte. À l'amour sincère. À celle qui est là même quand les projecteurs s'éteignent.",
        duration: "4:15",
        image: IMAGES.track2,
        color: "orange" as const,
    },
    {
        title: "BOLÈ",
        note:
            "Bolè — un mot, une émotion, une identité. Ce son parle de nos racines camerounaises avec fierté et groove 🔥",
        duration: "3:58",
        image: IMAGES.track3,
        color: "gold" as const,
    },
] as const;

/* ================================================================
   UTILITY FUNCTIONS
================================================================ */
function formatCompact(value: number): string {
    if (value >= 1_000_000) {
        const m = value / 1_000_000;
        return `${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
    }
    if (value >= 1_000) {
        const k = value / 1_000;
        return `${(k >= 100 || k % 1 === 0 ? k.toFixed(0) : k.toFixed(1))}K`;
    }
    return `${Math.round(value)}`;
}

/* ================================================================
   SVG PLATFORM ICONS
================================================================ */
function PlatformIcon({ platform, className }: { platform: string; className?: string }) {
    if (platform === "tiktok") {
        return (
            <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
                <path d="M14.5 2.25v2.92a5.33 5.33 0 0 0 4.08 1.9v2.95a8.22 8.22 0 0 1-4.08-1.12v6.46a5.77 5.77 0 1 1-5.77-5.77c.4 0 .79.04 1.16.12v2.98a2.87 2.87 0 1 0 1.71 2.67V2.25h2.9Z" />
            </svg>
        );
    }
    if (platform === "snapchat") {
        return (
            <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
                <path d="M12 2.4c3.26 0 5.9 2.54 5.9 5.68v2.1c0 .53.27 1.03.73 1.32.53.34 1.1.58 1.7.71.23.05.39.26.37.5-.02.23-.2.43-.43.46-.7.1-1.35.36-1.88.76-.47.36-.6.99-.3 1.5.12.2.26.4.42.58.13.14.15.35.06.52a.53.53 0 0 1-.45.28c-.54.03-1.06.18-1.52.45-.63.37-1.42.38-2.06.04a2.88 2.88 0 0 0-2.74 0 2.2 2.2 0 0 1-2.06-.04 3.1 3.1 0 0 0-1.53-.45.53.53 0 0 1-.44-.28.52.52 0 0 1 .06-.52c.16-.18.3-.38.42-.58.3-.51.16-1.14-.31-1.5a4.03 4.03 0 0 0-1.87-.76.51.51 0 0 1-.43-.46.5.5 0 0 1 .37-.5c.6-.13 1.16-.37 1.69-.7.46-.3.74-.8.74-1.33V8.08c0-3.14 2.64-5.68 5.9-5.68Z" />
            </svg>
        );
    }
    if (platform === "youtube") {
        return (
            <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
                <path d="M21.57 7.2a2.9 2.9 0 0 0-2.05-2.05C17.86 4.7 12 4.7 12 4.7s-5.86 0-7.52.45A2.9 2.9 0 0 0 2.43 7.2 30.8 30.8 0 0 0 2 12a30.8 30.8 0 0 0 .43 4.8 2.9 2.9 0 0 0 2.05 2.05c1.66.45 7.52.45 7.52.45s5.86 0 7.52-.45a2.9 2.9 0 0 0 2.05-2.05A30.8 30.8 0 0 0 22 12a30.8 30.8 0 0 0-.43-4.8ZM10 15.34V8.66L15.77 12 10 15.34Z" />
            </svg>
        );
    }
    if (platform === "facebook") {
        return (
            <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
                <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.87.25-1.46 1.5-1.46h1.6V5.06A21.35 21.35 0 0 0 14.27 5c-2.56 0-4.32 1.56-4.32 4.43V11H7v3h2.95v8h3.55Z" />
            </svg>
        );
    }
    // Instagram gradient
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
            <defs>
                <linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#F58529" />
                    <stop offset="30%"  stopColor="#DD2A7B" />
                    <stop offset="70%"  stopColor="#8134AF" />
                    <stop offset="100%" stopColor="#515BD4" />
                </linearGradient>
            </defs>
            <rect x="3" y="3" width="18" height="18" rx="6" stroke="url(#igGrad)" strokeWidth="2" />
            <circle cx="12" cy="12" r="4" stroke="url(#igGrad)" strokeWidth="2" />
            <circle cx="17.5" cy="6.5" r="1.2" fill="url(#igGrad)" />
        </svg>
    );
}

/* ================================================================
   FLOATING BACKGROUND ORBS
================================================================ */
function FloatingOrbs({ count = 4 }: { count?: number }) {
    const prefersReducedMotion = useReducedMotion();
    const orbs = useMemo(
        () =>
            Array.from({ length: count }, (_, i) => ({
                id: i,
                size: 180 + i * 80,
                left: `${10 + i * 22}%`,
                top: `${15 + (i % 3) * 30}%`,
                duration: 7 + i * 2.5,
                delay: i * 1.8,
                opacity: 0.06 + i * 0.02,
            })),
        [count]
    );
    if (prefersReducedMotion) return null;
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            {orbs.map((orb) => (
                <motion.div
                    key={orb.id}
                    animate={{ y: [0, -28, 0], scale: [1, 1.06, 1], opacity: [orb.opacity, orb.opacity * 1.9, orb.opacity] }}
                    transition={{ duration: orb.duration, delay: orb.delay, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: "absolute",
                        width: orb.size,
                        height: orb.size,
                        left: orb.left,
                        top: orb.top,
                        borderRadius: "50%",
                        background: "radial-gradient(circle at 40% 40%, rgba(212,175,55,0.22), transparent 68%)",
                        filter: "blur(36px)",
                    }}
                />
            ))}
        </div>
    );
}

/* Tiny floating sparkle dots for the hero */
function HeroParticles() {
    const prefersReducedMotion = useReducedMotion();
    const particles = useMemo(
        () =>
            Array.from({ length: 18 }, (_, i) => ({
                id: i,
                left: `${5 + (i * 37) % 90}%`,
                top: `${10 + (i * 53) % 80}%`,
                size: 2 + (i % 3),
                duration: 4 + (i % 5) * 1.5,
                delay: (i * 0.4) % 6,
                dx: ((i % 5) - 2) * 18,
                dy: -30 - (i % 4) * 20,
            })),
        []
    );
    if (prefersReducedMotion) return null;
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            {particles.map((p) => (
                <motion.span
                    key={p.id}
                    animate={{
                        x: [0, p.dx, 0],
                        y: [0, p.dy, 0],
                        opacity: [0, 0.7, 0],
                        scale: [0.4, 1, 0.4],
                    }}
                    transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: "absolute",
                        width: p.size,
                        height: p.size,
                        left: p.left,
                        top: p.top,
                        borderRadius: "50%",
                        background: "rgba(212,175,55,0.8)",
                        boxShadow: "0 0 6px rgba(212,175,55,0.6)",
                    }}
                />
            ))}
        </div>
    );
}

/* ================================================================
   SECTION LABEL PILL
================================================================ */
function SectionLabel({ children }: { children: ReactNode }) {
    return (
        <motion.span
            variants={fadeInUp}
            className="font-accent inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/35 bg-[var(--bg-glass)] px-4 py-1.5 text-xs uppercase tracking-[0.24em] text-[#D4AF37] backdrop-blur"
        >
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            {children}
        </motion.span>
    );
}

/* ================================================================
   SECTION REVEAL WRAPPER
================================================================ */
function RevealSection({ id, className, children }: { id: string; className?: string; children: ReactNode }) {
    const ref = useRef<HTMLElement | null>(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    const prefersReducedMotion = useReducedMotion();
    return (
        <motion.section
            id={id}
            ref={ref}
            className={className}
            initial={prefersReducedMotion ? "visible" : "hidden"}
            animate={prefersReducedMotion || isInView ? "visible" : "hidden"}
            variants={staggerContainer}
        >
            {children}
        </motion.section>
    );
}

/* ================================================================
   COUNT-UP ANIMATION
================================================================ */
function CountUp({
                     to,
                     duration = 2,
                     formatter = (v: number) => `${Math.round(v)}`,
                     className,
                 }: {
    to: number;
    duration?: number;
    formatter?: (v: number) => string;
    className?: string;
}) {
    const ref = useRef<HTMLSpanElement | null>(null);
    const isInView = useInView(ref, { once: true, amount: 0.4 });
    const prefersReducedMotion = useReducedMotion();
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        if (prefersReducedMotion) { setValue(to); return; }
        const start = performance.now();
        let frame = 0;
        const tick = (ts: number) => {
            const p = Math.min((ts - start) / (duration * 1000), 1);
            setValue(to * (1 - Math.pow(1 - p, 3)));
            if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [duration, isInView, prefersReducedMotion, to]);

    return <span ref={ref} className={className}>{formatter(value)}</span>;
}

/* ================================================================
   WAVEFORM BARS
================================================================ */
function Waveform({ color = "gold" }: { color?: "gold" | "orange" }) {
    const bars = useMemo(
        () =>
            Array.from({ length: 20 }, (_, i) => {
                const seed = color === "orange" ? 0.77 : 0.41;
                const noise = Math.abs(Math.sin((i + 1) * 12.9898 + seed));
                return { height: Math.round(20 + noise * 80), delay: ((i * 17) % 10) / 10 };
            }),
        [color]
    );
    return (
        <div className="flex h-11 items-end gap-[3px]">
            {bars.map((bar, i) => (
                <span
                    key={`${bar.height}-${i}`}
                    className={`wave-bar block w-1.5 rounded-full ${color === "orange" ? "bg-[#FF6B00]" : "bg-[#D4AF37]"}`}
                    style={{ height: `${bar.height}%`, animationDelay: `${bar.delay}s` }}
                    aria-hidden="true"
                />
            ))}
        </div>
    );
}

/* ================================================================
   FILM CARD WITH 3D TILT
================================================================ */
function FilmCard({ title, genre, quote, image, href }: { title: string; genre: string; quote: string; image: string; href: string }) {
    const prefersReducedMotion = useReducedMotion();
    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
    const [hovered, setHovered] = useState(false);

    const handleMove = (e: React.MouseEvent<HTMLElement>) => {
        if (prefersReducedMotion) return;
        const b = e.currentTarget.getBoundingClientRect();
        setTilt({
            rotateX: (0.5 - (e.clientY - b.top) / b.height) * 14,
            rotateY: ((e.clientX - b.left) / b.width - 0.5) * 14,
        });
    };

    return (
        <motion.article variants={fadeInUp} className="group snap-start [perspective:1200px]">
            <motion.div
                onMouseMove={handleMove}
                onMouseLeave={() => { setTilt({ rotateX: 0, rotateY: 0 }); setHovered(false); }}
                onMouseEnter={() => setHovered(true)}
                animate={
                    prefersReducedMotion
                        ? {}
                        : {
                            ...tilt,
                            boxShadow: hovered
                                ? "0 20px 60px rgba(212,175,55,0.25), 0 8px 20px rgba(0,0,0,0.6)"
                                : "0 6px 24px rgba(0,0,0,0.4)",
                        }
                }
                transition={EASE_SPRING}
                className="relative aspect-[3/4.4] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] [transform-style:preserve-3d]"
                style={{ willChange: "transform" }}
            >
                <img src={image} alt={`Affiche du film ${title}`} loading="lazy" className="h-full w-full object-cover" />

                {/* Always-visible title strip */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 to-transparent px-4 py-4">
                    <p className="text-sm font-bold tracking-wide text-white">{title}</p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 flex translate-y-full flex-col justify-end bg-gradient-to-t from-black/96 via-black/75 to-transparent p-5 transition-transform duration-500 group-hover:translate-y-0">
          <span className="mb-3 inline-flex w-fit rounded-full border border-[#D4AF37]/40 bg-black/50 px-3 py-1 text-xs text-[#D4AF37]">
            {genre}
          </span>
                    <p className="mb-4 text-sm leading-relaxed text-gray-200">{quote}</p>
                    <a
                        href={href}
                        className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#D4AF37]/55 bg-black/50 px-4 py-2 text-xs font-medium text-white transition-all duration-300 hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] hover:scale-105"
                        aria-label={`Voir le film ${title}`}
                    >
                        Voir le Film →
                    </a>
                </div>
            </motion.div>
        </motion.article>
    );
}

/* ================================================================
   HERO NAME — ANIMATED LETTER REVEAL  (Bebas Neue font)
================================================================ */
function HeroName({ text, delay = 0, gradient = false }: { text: string; delay?: number; gradient?: boolean }) {
    return (
        <span
            className={`font-hero inline-flex overflow-hidden ${gradient ? "bg-[linear-gradient(135deg,#D4AF37_20%,#FF6B00_80%)] bg-clip-text text-transparent" : "text-white"}`}
            aria-label={text}
        >
      {text.split("").map((letter, i) => (
          <motion.span
              key={`${letter}-${i}`}
              initial={{ opacity: 0, y: 50, skewY: 4 }}
              animate={{ opacity: 1, y: 0, skewY: 0 }}
              transition={{ duration: 0.6, delay: delay + i * 0.04, ease: EASE_OUT }}
              className="inline-block will-change-transform"
              style={{ lineHeight: 0.9 }}
          >
              {letter === " " ? "\u00A0" : letter}
          </motion.span>
      ))}
    </span>
    );
}

/* ================================================================
   ANIMATED WORD (generic, for other sections)
================================================================ */
function AnimatedWord({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
    return (
        <span className={`inline-flex overflow-hidden ${className ?? ""}`}>
      {text.split("").map((letter, i) => (
          <motion.span
              key={`${letter}-${i}`}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: delay + i * 0.03, ease: EASE_OUT }}
              className="inline-block will-change-transform"
          >
              {letter === " " ? "\u00A0" : letter}
          </motion.span>
      ))}
    </span>
    );
}

/* ================================================================
   SOCIAL CARD (with hover glow)
================================================================ */
function SocialCard({ card }: { card: (typeof SOCIAL_CARDS)[number] }) {
    const [hovered, setHovered] = useState(false);
    const iconColors: Record<string, string> = {
        facebook: "text-[#1877F2]",
        snapchat: "text-[#FFFC00]",
        youtube:  "text-[#FF0000]",
        instagram: "text-[#E4405F]",
        tiktok:   "text-white",
    };

    return (
        <motion.article
            variants={fadeInUp}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            animate={{
                boxShadow: hovered
                    ? `0 0 0 1.5px ${card.glowHover}, 0 12px 40px ${card.glowHover}, 0 4px 12px rgba(0,0,0,0.4)`
                    : `0 0 0 1px transparent, 0 0 28px ${card.glow}`,
                y: hovered ? -8 : 0,
                scale: hovered ? 1.02 : 1,
            }}
            transition={{ duration: 0.38, ease: EASE_OUT }}
            className="rounded-2xl border border-[var(--border-card)] bg-[var(--bg-glass)] p-5 backdrop-blur-md"
        >
            <div className="mb-4 flex items-center justify-between">
                <PlatformIcon platform={card.key} className={`h-8 w-8 ${iconColors[card.key] ?? "text-white"}`} />
                <motion.div
                    animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
                    transition={{ duration: 0.25 }}
                    className="text-xs text-[#D4AF37]"
                >
                    ↗
                </motion.div>
            </div>
            <CountUp
                to={card.count}
                formatter={formatCompact}
                className="font-hero block text-4xl text-[var(--text-primary)]"
            />
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">{card.label}</p>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">{card.quote}</p>
            <a
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                className="mt-5 inline-flex text-sm font-semibold text-[#D4AF37] transition-all duration-300 hover:text-[#FF6B00] hover:translate-x-1"
                aria-label={`${card.cta} sur ${card.key}`}
            >
                {card.cta}
            </a>
        </motion.article>
    );
}

/* ================================================================
   NAVBAR / TOP BAR
================================================================ */
function TopBar({
                    hasScrolled,
                    activeSection,
                    isMobileMenuOpen,
                    setIsMobileMenuOpen,
                    jumpTo,
                    theme,
                    toggleTheme,
                    isMounted,
                }: {
    hasScrolled: boolean;
    activeSection: string;
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    jumpTo: (id: string) => void;
    theme: string;
    toggleTheme: () => void;
    isMounted: boolean;
}) {
    return (
        <motion.header
            initial={{ y: -44, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.85, ease: EASE_OUT }}
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
                hasScrolled
                    ? "border-b border-[var(--border-subtle)] shadow-[0_4px_24px_rgba(0,0,0,0.22)] backdrop-blur-xl"
                    : "bg-transparent"
            }`}
            style={hasScrolled ? { background: "var(--nav-bg)" } : {}}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
                {/* Logo */}
                <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="group flex items-center gap-3"
                    aria-label="Retour en haut de page"
                >
          <span className="font-hero inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#D4AF37]/55 text-lg text-[#D4AF37] transition-all duration-300 group-hover:bg-[#D4AF37] group-hover:text-black group-hover:scale-105 group-hover:shadow-[0_0_16px_var(--glow-gold)]">
            CN
          </span>
                    <span className="font-accent text-xs uppercase tracking-[0.28em] text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[#D4AF37]">
            Claudio Njalla
          </span>
                </button>

                {/* Desktop Nav */}
                <nav className="hidden items-center gap-7 lg:flex">
                    {NAV_LINKS.map((link) => (
                        <button
                            key={link.id}
                            type="button"
                            onClick={() => jumpTo(link.id)}
                            className="group relative text-sm font-medium text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--text-primary)]"
                        >
                            {link.label}
                            <span
                                className={`absolute -bottom-1.5 left-0 h-[2px] rounded-full bg-[linear-gradient(90deg,#D4AF37,#FF6B00)] transition-all duration-350 ${
                                    activeSection === link.id ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                                }`}
                            />
                        </button>
                    ))}

                    {isMounted && (
                        <button
                            onClick={toggleTheme}
                            className="rounded-full p-2 text-[var(--text-secondary)] transition-all duration-300 hover:bg-[#D4AF37]/12 hover:text-[#D4AF37] hover:scale-110 hover:shadow-[0_0_12px_var(--glow-gold)]"
                            aria-label="Basculer le thème"
                        >
                            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                    )}

                    <a
                        href="#contact"
                        className="btn-primary rounded-full bg-[linear-gradient(135deg,#D4AF37,#FF6B00)] px-5 py-2.5 text-sm font-bold text-black shadow-[0_4px_14px_var(--glow-gold)]"
                    >
                        Book Me
                    </a>
                </nav>

                {/* Mobile icons */}
                <div className="flex items-center gap-3 lg:hidden">
                    {isMounted && (
                        <button
                            onClick={toggleTheme}
                            className="text-[var(--text-primary)] transition-all duration-300 hover:text-[#D4AF37] hover:scale-110"
                            aria-label="Basculer le thème"
                        >
                            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen((o) => !o)}
                        className="text-[var(--text-primary)] transition-all duration-300 hover:text-[#D4AF37] hover:scale-110"
                        aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                    >
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Full-Screen Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ y: "-100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.48, ease: EASE_OUT }}
                        className="fixed inset-0 z-40 flex flex-col px-8 pb-10 pt-28 backdrop-blur-xl lg:hidden"
                        style={{ background: "var(--mobile-menu-bg)" }}
                    >
                        <div className="space-y-6">
                            {NAV_LINKS.map((link, i) => (
                                <motion.button
                                    key={link.id}
                                    initial={{ opacity: 0, x: -32 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 + i * 0.07, ease: EASE_OUT }}
                                    type="button"
                                    onClick={() => jumpTo(link.id)}
                                    className="block w-full text-left font-hero text-5xl text-[var(--text-primary)] transition-colors duration-200 hover:text-[#D4AF37]"
                                    aria-label={`Aller à ${link.label}`}
                                >
                                    {link.label}
                                </motion.button>
                            ))}
                        </div>
                        <motion.a
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            href="#contact"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="mt-10 inline-flex w-fit rounded-full bg-[linear-gradient(135deg,#D4AF37,#FF6B00)] px-6 py-3 text-sm font-semibold text-black shadow-[0_0_24px_var(--glow-gold)]"
                            aria-label="Book Me depuis le menu mobile"
                        >
                            Book Me
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

/* ================================================================
   MAIN PAGE COMPONENT
================================================================ */
export default function App() {
    const prefersReducedMotion = useReducedMotion();
    const [isMounted, setIsMounted] = useState(false);
    const [theme, setTheme] = useState("dark");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [activeSection, setActiveSection] = useState("about");
    const [roleIndex, setRoleIndex] = useState(0);
    const deferredRoleIndex = useDeferredValue(roleIndex);
    const [subject, setSubject] = useState<string>(SUBJECT_OPTIONS[0]);
    const [budget, setBudget] = useState<string>(BUDGET_OPTIONS[3]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    /* Role cycler */
    useEffect(() => {
        const id = setInterval(() => setRoleIndex((c) => (c + 1) % TYPEWRITER_ROLES.length), 2000);
        return () => clearInterval(id);
    }, []);

    /* Scroll listener */
    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            setHasScrolled(y > 80);
            setShowScrollTop(y > 300);
            const probe = y + window.innerHeight * 0.35;
            let curr = "about";
            NAV_LINKS.forEach((l) => {
                const el = document.getElementById(l.id);
                if (el && probe >= el.offsetTop) curr = l.id;
            });
            setActiveSection(curr);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* Escape closes mobile menu */
    useEffect(() => {
        if (!isMobileMenuOpen) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsMobileMenuOpen(false); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isMobileMenuOpen]);

    /* Theme init + apply */
    useEffect(() => {
        setIsMounted(true);
        if (window.matchMedia("(prefers-color-scheme: light)").matches) setTheme("light");
    }, []);

    useEffect(() => {
        if (!isMounted) return;
        document.documentElement.setAttribute("data-theme", theme);
        // Also update CSS variables for browsers that don't support data-theme selector well
        const root = document.documentElement;
        if (theme === "light") {
            root.style.setProperty("--bg-primary",    "#f5f0e8");
            root.style.setProperty("--bg-secondary",  "#ede8de");
            root.style.setProperty("--bg-card",        "#ffffff");
            root.style.setProperty("--bg-deep",        "#f0ead9");
            root.style.setProperty("--bg-overlay",     "rgba(245,240,232,0.80)");
            root.style.setProperty("--bg-glass",       "rgba(212,175,55,0.06)");
            root.style.setProperty("--text-primary",   "#1a1a1a");
            root.style.setProperty("--text-secondary", "#5a5550");
            root.style.setProperty("--text-muted",     "#9a9590");
            root.style.setProperty("--border-subtle",  "rgba(212,175,55,0.28)");
            root.style.setProperty("--border-card",    "rgba(212,175,55,0.14)");
            root.style.setProperty("--glow-gold",      "rgba(212,175,55,0.22)");
            root.style.setProperty("--shadow-card",    "0 4px 24px rgba(212,175,55,0.10),0 1px 4px rgba(0,0,0,0.06)");
            root.style.setProperty("--shadow-hover",   "0 12px 40px rgba(212,175,55,0.22),0 4px 16px rgba(0,0,0,0.08)");
            root.style.setProperty("--input-bg",       "#fdfaf4");
            root.style.setProperty("--input-border",   "rgba(212,175,55,0.28)");
            root.style.setProperty("--input-focus",    "rgba(212,175,55,0.70)");
            root.style.setProperty("--nav-bg",         "rgba(245,240,232,0.88)");
            root.style.setProperty("--mobile-menu-bg", "rgba(245,240,232,0.98)");
            root.style.setProperty("--stat-bar-bg",    "rgba(245,240,232,0.85)");
        } else {
            root.style.setProperty("--bg-primary",    "#080808");
            root.style.setProperty("--bg-secondary",  "#0f0f0f");
            root.style.setProperty("--bg-card",        "#141414");
            root.style.setProperty("--bg-deep",        "#050505");
            root.style.setProperty("--bg-overlay",     "rgba(0,0,0,0.55)");
            root.style.setProperty("--bg-glass",       "rgba(255,255,255,0.04)");
            root.style.setProperty("--text-primary",   "#ffffff");
            root.style.setProperty("--text-secondary", "#a0a0a0");
            root.style.setProperty("--text-muted",     "#5a5a5a");
            root.style.setProperty("--border-subtle",  "rgba(212,175,55,0.18)");
            root.style.setProperty("--border-card",    "rgba(255,255,255,0.07)");
            root.style.setProperty("--glow-gold",      "rgba(212,175,55,0.28)");
            root.style.setProperty("--shadow-card",    "0 8px 40px rgba(0,0,0,0.55)");
            root.style.setProperty("--shadow-hover",   "0 16px 48px rgba(212,175,55,0.18),0 4px 16px rgba(0,0,0,0.6)");
            root.style.setProperty("--input-bg",       "#0a0a0a");
            root.style.setProperty("--input-border",   "rgba(212,175,55,0.2)");
            root.style.setProperty("--input-focus",    "rgba(212,175,55,0.65)");
            root.style.setProperty("--nav-bg",         "rgba(8,8,8,0.82)");
            root.style.setProperty("--mobile-menu-bg", "rgba(8,8,8,0.98)");
            root.style.setProperty("--stat-bar-bg",    "rgba(0,0,0,0.68)");
        }
    }, [theme, isMounted]);

    const toggleTheme = () => setTheme((p) => (p === "dark" ? "light" : "dark"));

    const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        window.setTimeout(() => setIsSubmitting(false), 1400);
    };

    const jumpTo = (id: string) => {
        setIsMobileMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    /* ── PLATFORM ICON COLOR MAP ── */
    const platformIconClass = (key: string) => {
        const map: Record<string, string> = {
            facebook:  "text-[#1877F2]",
            youtube:   "text-[#FF0000]",
            snapchat:  "text-[#FFFC00]",
            instagram: "text-[#E4405F]",
            tiktok:    "text-white",
        };
        return map[key] ?? "text-[var(--text-primary)]";
    };

    /* ──────────────────────────────────────────────────────────────
       RENDER
    ────────────────────────────────────────────────────────────── */
    return (
        <main
            className="relative overflow-x-hidden transition-colors duration-500"
            style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
        >
            {/* ===== SECTION: NAVBAR ===== */}
            <TopBar
                hasScrolled={hasScrolled}
                activeSection={activeSection}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                jumpTo={jumpTo}
                theme={theme}
                toggleTheme={toggleTheme}
                isMounted={isMounted}
            />

            {/* ===== SECTION: HERO ===== */}
            <section className="relative min-h-screen overflow-hidden pt-20 md:pt-24">
                {/* Background image with Ken Burns */}
                <div className="absolute inset-0">
                    <motion.div
                        animate={prefersReducedMotion ? undefined : { scale: [1, 1.08] }}
                        transition={
                            prefersReducedMotion ? undefined
                                : { duration: 22, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
                        }
                        className="h-full w-full will-change-transform"
                    >
                        <img
                            src={IMAGES.heroBg}
                            alt="Claudio Njalla en plein spectacle"
                            className="h-full w-full object-cover object-top"
                            loading="eager"
                        />
                    </motion.div>
                    {/* Gradient overlays */}
                    <div className="absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(0,0,0,0.96)_42%,rgba(0,0,0,0.28)_100%)] md:block" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.96)_62%)] md:hidden" />
                    {/* Light mode overlay */}
                    {isMounted && theme === "light" && (
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(245,240,232,0.88)_40%,rgba(245,240,232,0.30)_100%)] hidden md:block" />
                    )}
                </div>

                {/* Floating background orbs */}
                <FloatingOrbs count={5} />

                {/* Sparkle particles */}
                <HeroParticles />

                {/* Detoured portrait cutout */}
                <motion.img
                    initial={prefersReducedMotion ? false : { x: 140, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={prefersReducedMotion ? undefined : { duration: 1.5, delay: 0.4, ease: "easeOut" }}
                    src={IMAGES.heroCutout}
                    alt="Portrait artistique de Claudio Njalla"
                    // TODO: Replace with real PNG detoured via remove.bg
                    className="absolute bottom-[110px] left-1/2 z-[1] h-[52vh] -translate-x-1/2 opacity-30 [filter:drop-shadow(0_0_60px_rgba(212,175,55,0.4))] md:bottom-0 md:left-auto md:right-[4%] md:h-[90vh] md:translate-x-0 md:opacity-100"
                />

                {/* Hero content */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col justify-center px-4 pb-44 pt-10 md:px-8 md:pb-32"
                >
                    {/* Pill badge */}
                    <motion.span
                        variants={fadeInUp}
                        transition={{ delay: 0.15 }}
                        className="font-accent mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#D4AF37]/45 bg-black/30 px-4 py-1.5 text-xs text-[#D4AF37] backdrop-blur-sm"
                    >
                        🇨🇲 {HERO_SUBTITLE_LABEL}
                    </motion.span>

                    {/* HERO NAME — Bebas Neue */}
                    <div className="mb-4">
                        <h1
                            className="text-[clamp(4.5rem,14vw,10rem)] leading-[0.88]"
                            aria-label={`${HERO_TITLE_FIRST} ${HERO_TITLE_LAST}`}
                        >
                            <HeroName text={HERO_TITLE_FIRST} delay={0.1} />
                            <br />
                            <HeroName text={HERO_TITLE_LAST} delay={0.26} gradient />
                        </h1>

                        {/* Gold rule animation */}
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 72, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT }}
                            className="mt-5 h-[3px] rounded-full bg-[linear-gradient(90deg,#D4AF37,#FF6B00)]"
                            style={{ boxShadow: "0 0 12px rgba(212,175,55,0.5)" }}
                        />
                    </div>

                    {/* Typewriter role */}
                    <motion.p
                        variants={fadeInUp}
                        transition={{ delay: 0.55 }}
                        className="font-accent mb-5 text-xl text-[#FF6B00]"
                    >
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={deferredRoleIndex}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.35 }}
                                className="inline-block"
                            >
                                {TYPEWRITER_ROLES[deferredRoleIndex]}
                            </motion.span>
                        </AnimatePresence>
                        <span className="blinking-cursor ml-1">|</span>
                    </motion.p>

                    {/* Tagline */}
                    <motion.p
                        variants={fadeInUp}
                        transition={{ delay: 0.72 }}
                        className="max-w-xl text-base leading-relaxed text-gray-300 md:text-lg"
                        style={{ color: theme === "light" ? "var(--text-secondary)" : undefined }}
                    >
                        {HERO_TAGLINE}
                    </motion.p>

                    {/* CTA buttons */}
                    <motion.div
                        variants={scaleIn}
                        transition={{ delay: 0.9 }}
                        className="mt-8 flex flex-wrap items-center gap-3"
                    >
                        <a
                            href="#shows"
                            className="btn-primary rounded-full bg-[linear-gradient(135deg,#D4AF37,#FF6B00)] px-7 py-3.5 text-sm font-bold text-black shadow-[0_4px_20px_rgba(212,175,55,0.35)]"
                            aria-label="Voir mes émissions"
                        >
                            🎬 Voir mes Émissions
                        </a>
                        <a
                            href="#contact"
                            className="btn-outline rounded-full border border-[#D4AF37]/55 px-7 py-3.5 text-sm font-medium text-[var(--text-primary)]"
                            aria-label="Me contacter"
                        >
                            📩 Me Contacter
                        </a>
                    </motion.div>

                    {/* Social proof */}
                    <motion.div
                        variants={fadeInUp}
                        transition={{ delay: 1.05 }}
                        className="mt-5 flex items-center gap-3 text-sm text-gray-400"
                    >
                        <div className="flex -space-x-2">
                            {["CN", "AF", "LM"].map((av) => (
                                <span
                                    key={av}
                                    className="font-accent inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF37]/35 bg-[#141414] text-[10px] text-[#D4AF37]"
                                >
                  {av}
                </span>
                            ))}
                        </div>
                        <span style={{ color: theme === "light" ? "var(--text-secondary)" : "rgb(156,163,175)" }}>
              {HERO_SOCIAL_PROOF}
            </span>
                    </motion.div>
                </motion.div>

                {/* Animated scroll indicator */}
                <motion.div
                    animate={
                        prefersReducedMotion ? undefined
                            : { y: [0, 9, 0], opacity: [0.55, 1, 0.55] }
                    }
                    transition={
                        prefersReducedMotion ? undefined
                            : { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }
                    className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 text-[#D4AF37]"
                >
                    <ChevronDown className="h-5 w-5" aria-hidden="true" />
                    <span className="font-accent text-[10px] uppercase tracking-[0.26em]">{HERO_SCROLL_TEXT}</span>
                </motion.div>

                {/* Bottom stats bar */}
                <div
                    className="absolute inset-x-0 bottom-0 z-10 border-t border-[#D4AF37]/20 backdrop-blur-lg"
                    style={{ background: "var(--stat-bar-bg)" }}
                >
                    <div className="mx-auto flex max-w-7xl snap-x snap-mandatory items-center gap-0 overflow-x-auto whitespace-nowrap px-3 py-4 md:justify-between md:px-8">
                        {HERO_PLATFORM_STATS.map((stat, idx) => (
                            <div key={stat.key} className="flex snap-start items-center">
                                <div className="shimmer-sweep flex min-w-[175px] items-center gap-2 px-2 md:min-w-0 md:px-2">
                                    <PlatformIcon
                                        platform={stat.icon}
                                        className={`h-4 w-4 ${platformIconClass(stat.key)}`}
                                    />
                                    <span className="text-sm font-bold text-[var(--text-primary)]">{stat.count}</span>
                                    <span className="text-xs text-[#D4AF37]">{stat.label}</span>
                                </div>
                                {idx !== HERO_PLATFORM_STATS.length - 1 && (
                                    <span className="mx-2 text-[#D4AF37]/35">|</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== SECTION: ABOUT ===== */}
            <RevealSection
                id="about"
                className="relative py-20 md:py-28"
                style={{ background: "var(--bg-secondary)" } as React.CSSProperties}
            >
                <div className="noise-overlay pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
                <FloatingOrbs count={3} />

                <div className="relative mx-auto max-w-7xl px-4 md:px-8">
                    <SectionLabel>À PROPOS</SectionLabel>

                    <motion.h2
                        variants={fadeInUp}
                        className="font-display mt-6 text-4xl font-bold text-[var(--text-primary)] md:text-6xl"
                    >
                        {ABOUT_HEADING}
                    </motion.h2>
                    <motion.p variants={fadeInUp} className="mt-3 text-lg text-[#D4AF37]">
                        {ABOUT_SUBHEADING}
                    </motion.p>

                    <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
                        {/* Image block */}
                        <motion.div variants={fadeInLeft} className="relative">
                            <motion.div
                                className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]"
                                whileHover={prefersReducedMotion ? {} : { scale: 1.01, boxShadow: "0 16px 48px var(--glow-gold)" }}
                                transition={{ duration: 0.4 }}
                            >
                                <img
                                    src={IMAGES.aboutMain}
                                    alt="Portrait principal de Claudio Njalla"
                                    loading="lazy"
                                    className="h-full w-full object-cover"
                                />
                                <span className="absolute bottom-4 left-4 rounded-full bg-[#D4AF37] px-3 py-1 text-xs font-semibold text-black shadow-lg">
                  🇨🇲 Fier Camerounais
                </span>
                            </motion.div>
                            {/* Secondary floating image */}
                            <motion.div
                                className="absolute -bottom-8 right-4 h-32 w-32 overflow-hidden rounded-xl border-2 border-[#FF6B00]/45 shadow-xl md:h-44 md:w-44"
                                animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <img
                                    src={IMAGES.aboutSecondary}
                                    alt="Photo backstage de Claudio Njalla"
                                    loading="lazy"
                                    className="h-full w-full object-cover"
                                />
                            </motion.div>
                        </motion.div>

                        {/* Text block */}
                        <motion.div variants={staggerContainer} className="relative mt-10 lg:mt-0">
                            {/* Decorative "CN" */}
                            <div
                                className="pointer-events-none absolute -right-2 -top-10 font-hero text-[120px] leading-none text-[#D4AF37]/08 md:text-[160px]"
                                aria-hidden="true"
                            >
                                CN
                            </div>
                            <motion.p variants={fadeInUp} className="leading-relaxed text-[var(--text-secondary)]">
                                {ABOUT_BIO_1}
                            </motion.p>
                            <motion.p variants={fadeInUp} className="mt-4 leading-relaxed text-[var(--text-secondary)]">
                                {ABOUT_BIO_2}
                            </motion.p>
                            <motion.p variants={fadeInUp} className="mt-4 leading-relaxed text-[var(--text-secondary)]">
                                {ABOUT_BIO_3}
                            </motion.p>

                            {/* Stats counters */}
                            <motion.div variants={staggerContainer} className="mt-8 grid grid-cols-3 gap-3">
                                {ABOUT_STATS.map((item) => (
                                    <motion.div
                                        key={item.label}
                                        variants={scaleIn}
                                        className="card-hover rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-5 text-center"
                                        style={{ boxShadow: "var(--shadow-card)" }}
                                    >
                                        <div className="text-xl">{item.icon}</div>
                                        <CountUp
                                            to={item.count}
                                            formatter={(v) => `${item.prefix}${Math.round(v)}`}
                                            className="font-hero mt-2 block text-3xl text-[#D4AF37]"
                                        />
                                        <span className="mt-1 block text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      {item.label}
                    </span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </RevealSection>

            {/* ===== SECTION: SOCIAL ===== */}
            <RevealSection
                id="social"
                className="diagonal-pattern relative py-20 md:py-28"
                style={{ background: "var(--bg-primary)" } as React.CSSProperties}
            >
                <FloatingOrbs count={4} />
                <div className="relative mx-auto max-w-7xl px-4 md:px-8">
                    <SectionLabel>MA COMMUNAUTÉ</SectionLabel>

                    <motion.h2
                        variants={fadeInUp}
                        className="font-display mt-6 text-4xl font-bold text-[var(--text-primary)] md:text-6xl"
                    >
                        {SOCIAL_HEADING}
                    </motion.h2>
                    <motion.p variants={fadeInUp} className="mt-4 max-w-3xl leading-relaxed text-[var(--text-secondary)]">
                        {SOCIAL_SUBHEADING}
                    </motion.p>

                    <motion.div
                        variants={staggerContainer}
                        className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
                    >
                        {SOCIAL_CARDS.map((card) => (
                            <SocialCard key={card.key} card={card} />
                        ))}
                    </motion.div>

                    {/* Total reach banner */}
                    <motion.div
                        variants={fadeInUp}
                        className="mt-10 overflow-hidden rounded-2xl border border-[#D4AF37]/22 bg-[linear-gradient(135deg,rgba(212,175,55,0.10),rgba(255,107,0,0.10))] px-6 py-5 text-center"
                    >
            <span className="font-hero bg-[linear-gradient(135deg,#D4AF37,#FF6B00)] bg-clip-text text-2xl text-transparent">
              {SOCIAL_TOTAL_TEXT}
            </span>
                    </motion.div>
                </div>
            </RevealSection>

            {/* ===== SECTION: SHOWS ===== */}
            <RevealSection
                id="shows"
                className="relative py-20 md:py-28"
                style={{ background: "var(--bg-secondary)" } as React.CSSProperties}
            >
                <FloatingOrbs count={3} />
                <div className="relative mx-auto max-w-7xl px-4 md:px-8">
                    <SectionLabel>MES ÉMISSIONS</SectionLabel>

                    <motion.h2
                        variants={fadeInUp}
                        className="font-display mt-6 text-4xl font-bold text-[var(--text-primary)] md:text-6xl"
                    >
                        {SHOWS_HEADING}
                    </motion.h2>
                    <motion.p variants={fadeInUp} className="mt-4 max-w-3xl text-[var(--text-secondary)]">
                        {SHOWS_SUBHEADING}
                    </motion.p>

                    <motion.div variants={staggerContainer} className="mt-12 grid gap-6 lg:grid-cols-3">
                        {SHOWS.map((show, i) => (
                            <motion.article
                                key={show.title}
                                variants={fadeInUp}
                                className="group overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] card-hover"
                                style={{ boxShadow: "var(--shadow-card)", animationDelay: `${i * 0.1}s` }}
                            >
                                {/* Show image */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={show.image}
                                        alt={`Affiche de l'émission ${show.title}`}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/90 to-transparent" />
                                    {/* Badge on image */}
                                    <span className="font-accent absolute right-3 top-3 inline-flex rounded-full border border-[#D4AF37]/40 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#D4AF37] backdrop-blur-sm">
                    {show.badge}
                  </span>
                                </div>

                                <div className="space-y-4 p-5">
                                    <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">{show.title}</h3>
                                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{show.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {show.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full border border-[var(--border-card)] bg-[var(--bg-glass)] px-3 py-1 text-xs text-[var(--text-secondary)] backdrop-blur-sm"
                                            >
                        {tag}
                      </span>
                                        ))}
                                    </div>
                                    <a
                                        href={show.href}
                                        className="btn-primary inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#D4AF37,#FF6B00)] px-5 py-2.5 text-sm font-bold text-black shadow-[0_4px_14px_var(--glow-gold)]"
                                        aria-label={`Regarder ${show.title}`}
                                    >
                                        <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                                        Regarder
                                    </a>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </RevealSection>

            {/* ===== SECTION: FILMS ===== */}
            <RevealSection
                id="films"
                className="film-strip-pattern relative py-20 md:py-28"
                style={{ background: "var(--bg-primary)" } as React.CSSProperties}
            >
                <FloatingOrbs count={3} />
                {/* Decorative film strip label */}
                <div
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 font-hero text-[80px] leading-none text-[#D4AF37]/05 md:text-[120px]"
                    aria-hidden="true"
                >
                    CINEMA
                </div>

                <div className="relative mx-auto max-w-7xl px-4 md:px-8">
                    <SectionLabel>MES FILMS</SectionLabel>

                    <motion.h2
                        variants={fadeInUp}
                        className="font-display mt-6 text-4xl font-bold text-[var(--text-primary)] md:text-6xl"
                    >
                        {FILMS_HEADING}
                    </motion.h2>
                    <motion.p variants={fadeInUp} className="mt-4 max-w-3xl text-[var(--text-secondary)]">
                        {FILMS_SUBHEADING}
                    </motion.p>

                    <motion.div
                        variants={staggerContainer}
                        className="mt-12 grid auto-cols-[80%] grid-flow-col snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:grid-flow-row md:grid-cols-4 md:overflow-visible"
                    >
                        {FILMS.map((film) => (
                            <FilmCard key={film.title} {...film} />
                        ))}
                    </motion.div>
                </div>
            </RevealSection>

            {/* ===== SECTION: MUSIC ===== */}
            <RevealSection
                id="music"
                className="relative overflow-hidden py-20 md:py-28"
                style={{ background: "var(--bg-secondary)" } as React.CSSProperties}
            >
                {/* Decorative music note */}
                <motion.span
                    animate={prefersReducedMotion ? {} : { y: [0, -20, 0], opacity: [0.08, 0.14, 0.08] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="pointer-events-none absolute right-4 top-10 text-[140px] text-[#D4AF37] md:text-[220px]"
                    aria-hidden="true"
                >
                    ♫
                </motion.span>
                <motion.span
                    animate={prefersReducedMotion ? {} : { y: [0, 14, 0], opacity: [0.05, 0.10, 0.05] }}
                    transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                    className="pointer-events-none absolute left-6 bottom-20 text-[80px] text-[#FF6B00] md:text-[110px]"
                    aria-hidden="true"
                >
                    ♪
                </motion.span>

                <div className="relative mx-auto max-w-7xl px-4 md:px-8">
                    <SectionLabel>MA MUSIQUE</SectionLabel>

                    <motion.h2
                        variants={fadeInUp}
                        className="font-display mt-6 text-4xl font-bold text-[var(--text-primary)] md:text-6xl"
                    >
                        {MUSIC_HEADING}{" "}
                        <span className="bg-[linear-gradient(135deg,#D4AF37,#FF6B00)] bg-clip-text text-transparent">
              {MUSIC_HEADING_ACCENT}
            </span>
                    </motion.h2>
                    <motion.p variants={fadeInUp} className="mt-4 max-w-3xl text-[var(--text-secondary)]">
                        {MUSIC_SUBHEADING}
                    </motion.p>

                    <motion.div variants={staggerContainer} className="mt-12 grid gap-6 lg:grid-cols-3">
                        {TRACKS.map((track, idx) => (
                            <motion.article
                                key={track.title}
                                variants={fadeInUp}
                                animate={
                                    prefersReducedMotion ? undefined : { y: [0, -9, 0] }
                                }
                                transition={
                                    prefersReducedMotion ? undefined
                                        : { duration: 3.5, repeat: Infinity, delay: idx * 0.55, ease: "easeInOut" }
                                }
                                className="group rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 card-hover"
                                style={{ boxShadow: "var(--shadow-card)", willChange: "transform" }}
                            >
                                <div className="flex flex-col gap-4 md:flex-row">
                                    <motion.img
                                        src={track.image}
                                        alt={`Cover du titre ${track.title}`}
                                        loading="lazy"
                                        className="h-28 w-28 rounded-xl object-cover"
                                        whileHover={prefersReducedMotion ? {} : { scale: 1.06, rotate: 2 }}
                                        transition={{ duration: 0.35 }}
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="font-hero text-3xl text-[var(--text-primary)]">{track.title}</h3>
                                            <motion.button
                                                type="button"
                                                whileHover={prefersReducedMotion ? {} : { scale: 1.12 }}
                                                whileTap={prefersReducedMotion ? {} : { scale: 0.94 }}
                                                className={`glow-pulse inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-black shadow-lg ${
                                                    track.color === "orange"
                                                        ? "bg-[linear-gradient(135deg,#FF6B00,#FFB347)]"
                                                        : "bg-[linear-gradient(135deg,#D4AF37,#FF6B00)]"
                                                }`}
                                                aria-label={`Lire ${track.title}`}
                                            >
                                                <Play className="ml-0.5 h-4 w-4 fill-current" />
                                            </motion.button>
                                        </div>
                                        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{track.note}</p>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <Waveform color={track.color} />
                                    <span className="font-accent text-xs text-[var(--text-muted)]">{track.duration}</span>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {["Spotify", "YouTube Music", "Apple Music"].map((svc) => (
                                        <a
                                            key={`${track.title}-${svc}`}
                                            href="#"
                                            // TODO: Add real streaming URL
                                            className="rounded-full border border-[#D4AF37]/38 px-3 py-1.5 text-xs text-[var(--text-secondary)] transition-all duration-300 hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] hover:scale-105"
                                            aria-label={`Écouter ${track.title} sur ${svc}`}
                                        >
                                            ▶ {svc}
                                        </a>
                                    ))}
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>

                    {/* Playlist CTA */}
                    <motion.a
                        variants={fadeInUp}
                        href="#"
                        // TODO: Add real playlist URL
                        className="btn-primary mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#D4AF37,#FF6B00)] px-8 py-3.5 text-sm font-bold text-black shadow-[0_0_28px_var(--glow-gold)]"
                        aria-label="Écouter la playlist complète"
                    >
                        🎧 Actuellement dans mes oreillettes — Écoutez ma playlist complète
                    </motion.a>
                </div>
            </RevealSection>

            {/* ===== SECTION: CONTACT ===== */}
            <RevealSection
                id="contact"
                className="relative overflow-hidden py-20 md:py-28"
                style={{ background: "var(--bg-primary)" } as React.CSSProperties}
            >
                {/* Radial glow */}
                <div
                    className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                    style={{ background: "radial-gradient(circle, rgba(212,175,55,0.10), transparent 70%)" }}
                    aria-hidden="true"
                />

                <div className="relative mx-auto max-w-7xl px-4 md:px-8">
                    <SectionLabel>TRAVAILLONS ENSEMBLE</SectionLabel>

                    <motion.h2
                        variants={fadeInUp}
                        className="font-display mt-6 text-4xl font-bold text-[var(--text-primary)] md:text-6xl"
                    >
                        {CONTACT_HEADING}{" "}
                        <span className="bg-[linear-gradient(135deg,#D4AF37,#FF6B00)] bg-clip-text text-transparent">
              {CONTACT_HEADING_ACCENT}
            </span>
                    </motion.h2>
                    <motion.p variants={fadeInUp} className="mt-4 max-w-3xl text-[var(--text-secondary)]">
                        {CONTACT_SUBHEADING}
                    </motion.p>

                    <div className="mt-12 grid gap-8 lg:grid-cols-2">
                        {/* Contact info */}
                        <motion.div variants={staggerContainer} className="space-y-5">

                            {/* Email card */}
                            <motion.article
                                variants={fadeInUp}
                                className="card-hover rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5"
                                style={{ boxShadow: "var(--shadow-card)" }}
                            >
                                <div className="flex items-start gap-4">
                  <span className="rounded-full bg-[#D4AF37]/14 p-3.5 text-[#D4AF37]">
                    <Mail className="h-5 w-5" />
                  </span>
                                    <div>
                                        <p className="font-accent text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                                            Email professionnel
                                        </p>
                                        <a
                                            href={SOCIAL_LINKS.email}
                                            className="mt-1 block text-lg font-semibold text-[var(--text-primary)] transition-colors duration-300 hover:text-[#D4AF37]"
                                            aria-label="Envoyer un email"
                                        >
                                            stromaeclaudio@gmail.com
                                        </a>
                                        <p className="mt-2 text-sm text-[var(--text-secondary)]">
                                            Je réponds personnellement à chaque message sérieux.
                                        </p>
                                        <a
                                            href={SOCIAL_LINKS.email}
                                            className="btn-outline mt-4 inline-flex rounded-full border border-[#D4AF37]/50 px-5 py-2.5 text-sm text-[var(--text-primary)]"
                                            aria-label="Envoyer un email à Claudio Njalla"
                                        >
                                            📧 Envoyer un Email
                                        </a>
                                    </div>
                                </div>
                            </motion.article>

                            {/* Phone card */}
                            <motion.article
                                variants={fadeInUp}
                                className="card-hover rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5"
                                style={{ boxShadow: "var(--shadow-card)" }}
                            >
                                <div className="flex items-start gap-4">
                  <span className="rounded-full bg-[#D4AF37]/14 p-3.5 text-[#D4AF37]">
                    <Phone className="h-5 w-5" />
                  </span>
                                    <div>
                                        <p className="font-accent text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                                            WhatsApp & Appels
                                        </p>
                                        <a
                                            href={SOCIAL_LINKS.phone}
                                            className="mt-1 block text-lg font-semibold text-[var(--text-primary)] transition-colors duration-300 hover:text-[#D4AF37]"
                                            aria-label="Appeler Claudio Njalla"
                                        >
                                            +237 6 76 45 64 32
                                        </a>
                                        <p className="mt-2 text-sm text-[var(--text-secondary)]">
                                            WhatsApp pour les demandes urgentes — mais soyez sérieux svp 😅
                                        </p>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            <a
                                                href={SOCIAL_LINKS.phone}
                                                className="btn-outline rounded-full border border-[#D4AF37]/50 px-5 py-2.5 text-sm text-[var(--text-primary)]"
                                                aria-label="Appeler maintenant"
                                            >
                                                📱 Appeler
                                            </a>
                                            <a
                                                href={SOCIAL_LINKS.whatsapp}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="btn-outline rounded-full border border-[#25D366]/50 px-5 py-2.5 text-sm text-[var(--text-primary)] hover:border-[#25D366] hover:bg-[#25D366]/12"
                                                aria-label="Contacter sur WhatsApp"
                                            >
                                                💬 WhatsApp
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.article>

                            {/* Availability badge */}
                            <motion.div
                                variants={fadeInUp}
                                className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/32 bg-emerald-400/10 px-5 py-2.5 text-sm text-emerald-300"
                            >
                <span className="relative inline-flex h-2.5 w-2.5">
                  <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
                </span>
                                Disponible pour collaborations · Réponse sous 24h
                            </motion.div>

                            {/* Social quick links */}
                            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
                                {[
                                    { key: "facebook",  href: SOCIAL_LINKS.facebook  },
                                    { key: "instagram", href: SOCIAL_LINKS.instagram  },
                                    { key: "tiktok",    href: SOCIAL_LINKS.tiktok     },
                                    { key: "youtube",   href: SOCIAL_LINKS.youtube    },
                                    { key: "snapchat",  href: SOCIAL_LINKS.snapchat   },
                                ].map((s) => (
                                    <a
                                        key={`contact-${s.key}`}
                                        href={s.href}
                                        target={s.href.startsWith("http") ? "_blank" : undefined}
                                        rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                                        className="icon-btn inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-card)] bg-[var(--bg-glass)] text-[var(--text-secondary)] hover:border-[#D4AF37]/55 hover:text-[#D4AF37]"
                                        aria-label={`Ouvrir ${s.key}`}
                                    >
                                        <PlatformIcon platform={s.key} className="h-4 w-4" />
                                    </a>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Contact form */}
                        <motion.div
                            variants={fadeInRight}
                            className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6"
                            style={{ boxShadow: "var(--shadow-card)" }}
                        >
                            <h3 className="font-display text-3xl font-bold text-[var(--text-primary)]">
                                Envoyez-moi un message
                            </h3>
                            <p className="mt-2 text-sm text-[var(--text-secondary)]">
                                Je lis tout. Vraiment. (Enfin, presque tout 😄)
                            </p>

                            <form onSubmit={handleContactSubmit} className="mt-6 space-y-4">
                                <input
                                    required
                                    type="text"
                                    placeholder="Votre nom complet"
                                    className="w-full rounded-xl border px-4 py-3.5 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                                    style={{
                                        background: "var(--input-bg)",
                                        borderColor: "var(--input-border)",
                                        color: "var(--text-primary)",
                                    }}
                                    aria-label="Votre nom complet"
                                />
                                <input
                                    required
                                    type="email"
                                    placeholder="Votre adresse email"
                                    className="w-full rounded-xl border px-4 py-3.5 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                                    style={{
                                        background: "var(--input-bg)",
                                        borderColor: "var(--input-border)",
                                        color: "var(--text-primary)",
                                    }}
                                    aria-label="Votre adresse email"
                                />

                                <select
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-full rounded-xl border px-4 py-3.5 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                                    style={{
                                        background: "var(--input-bg)",
                                        borderColor: "var(--input-border)",
                                        color: "var(--text-primary)",
                                    }}
                                    aria-label="Objet de votre demande"
                                >
                                    {SUBJECT_OPTIONS.map((opt) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>

                                <fieldset>
                                    <legend className="mb-2 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                                        Budget (optionnel)
                                    </legend>
                                    <div className="grid grid-cols-2 gap-2">
                                        {BUDGET_OPTIONS.map((opt) => (
                                            <label key={opt} className="relative cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="budget"
                                                    value={opt}
                                                    checked={budget === opt}
                                                    onChange={(e) => setBudget(e.target.value)}
                                                    className="peer sr-only"
                                                    aria-label={opt}
                                                />
                                                <span
                                                    className="block rounded-lg border px-3 py-2.5 text-center text-xs transition-all duration-300 peer-checked:bg-[#D4AF37]/12"
                                                    style={{
                                                        background: "var(--input-bg)",
                                                        borderColor: "var(--input-border)",
                                                        color: "var(--text-secondary)",
                                                    }}
                                                >
                          {opt}
                        </span>
                                            </label>
                                        ))}
                                    </div>
                                </fieldset>

                                <textarea
                                    required
                                    rows={5}
                                    placeholder="Décrivez votre projet..."
                                    className="w-full resize-none rounded-xl border px-4 py-3.5 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                                    style={{
                                        background: "var(--input-bg)",
                                        borderColor: "var(--input-border)",
                                        color: "var(--text-primary)",
                                    }}
                                    aria-label="Décrivez votre projet"
                                />

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={prefersReducedMotion ? {} : { scale: 1.02, boxShadow: "0 8px 28px var(--glow-gold)" }}
                                    whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                                    className="inline-flex w-full items-center justify-center rounded-xl bg-[linear-gradient(135deg,#D4AF37,#FF6B00)] px-5 py-3.5 text-sm font-bold text-black shadow-[0_0_22px_var(--glow-gold)] disabled:opacity-70"
                                    aria-label="Envoyer le message"
                                >
                                    {isSubmitting ? (
                                        <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/25 border-t-black" />
                      Envoi en cours...
                    </span>
                                    ) : (
                                        "Envoyer le Message →"
                                    )}
                                </motion.button>
                            </form>

                            <p className="mt-4 text-xs text-[var(--text-muted)]">
                                🔒 Vos informations restent confidentielles et ne sont jamais partagées.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </RevealSection>

            {/* ===== SECTION: FOOTER ===== */}
            <footer
                className="border-t border-[var(--border-subtle)]"
                style={{ background: "var(--bg-deep)" }}
            >
                <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
                    {/* Top row */}
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h3 className="font-hero text-4xl text-[#D4AF37]" style={{ letterSpacing: "0.04em" }}>
                                CLAUDIO NJALLA
                            </h3>
                            <p className="mt-1 text-sm text-[var(--text-muted)]">
                                Comedian · Influencer · Actor · Musician
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            {[
                                { key: "facebook",  href: SOCIAL_LINKS.facebook  },
                                { key: "instagram", href: SOCIAL_LINKS.instagram  },
                                { key: "tiktok",    href: SOCIAL_LINKS.tiktok     },
                                { key: "youtube",   href: SOCIAL_LINKS.youtube    },
                                { key: "snapchat",  href: SOCIAL_LINKS.snapchat   },
                            ].map((s) => (
                                <a
                                    key={`footer-${s.key}`}
                                    href={s.href}
                                    target={s.href.startsWith("http") ? "_blank" : undefined}
                                    rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                                    className="icon-btn inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-card)] bg-[var(--bg-glass)] text-[var(--text-secondary)] hover:border-[#D4AF37]/55 hover:text-[#D4AF37]"
                                    aria-label={`Ouvrir ${s.key}`}
                                >
                                    <PlatformIcon platform={s.key} className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Nav links */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--text-secondary)]">
                        {NAV_LINKS.map((l) => (
                            <button
                                key={`footer-${l.id}`}
                                type="button"
                                onClick={() => jumpTo(l.id)}
                                className="transition-colors duration-300 hover:text-[#D4AF37]"
                                aria-label={`Aller à ${l.label}`}
                            >
                                {l.label === "About" ? "À Propos" : l.label}
                            </button>
                        ))}
                    </div>

                    {/* Contact summary */}
                    <div className="mt-5 text-center text-sm text-[var(--text-muted)]">
                        📧 stromaeclaudio@gmail.com &nbsp;|&nbsp; 📱 +237 6 76 45 64 32
                    </div>

                    {/* Footer quote */}
                    <p className="mx-auto mt-8 max-w-2xl text-center text-sm italic text-[var(--text-secondary)]">
                        "{FOOTER_QUOTE}"
                    </p>

                    {/* Bottom row */}
                    <div
                        className="mt-8 flex flex-col gap-3 border-t pt-5 text-xs text-[var(--text-muted)] md:flex-row md:items-center md:justify-between"
                        style={{ borderColor: "var(--border-subtle)" }}
                    >
                        <span>© 2025 Claudio Njalla. Tous droits réservés.</span>
                        <span>Made with ❤️ in Cameroon 🇨🇲</span>
                    </div>
                </div>
            </footer>

            {/* ===== SCROLL TO TOP ===== */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, y: 16, scale: 0.88 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.88 }}
                        whileHover={prefersReducedMotion ? {} : { scale: 1.12, boxShadow: "0 0 28px var(--glow-gold)" }}
                        whileTap={prefersReducedMotion ? {} : { scale: 0.94 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="fixed bottom-5 right-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#D4AF37,#FF6B00)] text-black shadow-[0_0_24px_var(--glow-gold)]"
                        aria-label="Remonter en haut"
                    >
                        <ChevronUp className="h-5 w-5" />
                    </motion.button>
                )}
            </AnimatePresence>
        </main>
    );
}