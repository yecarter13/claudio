/* ================================================================
   CLAUDIO NJALLA — Central data file
   Replace placeholder URLs with real assets when ready
================================================================ */

export const SOCIAL_LINKS = {
  facebook:  "https://www.facebook.com/claudionjalla",
  tiktok:    "#",
  instagram: "#",
  snapchat:  "#",
  youtube:   "https://www.youtube.com/@ClaudioNjalla",
  whatsapp:  "https://wa.me/237676456432",
  email:     "mailto:stromaeclaudio@gmail.com",
  phone:     "tel:+237676456432",
} as const;

/* ── ABOUT ─────────────────────────────────────────────────────── */
export const ABOUT = {
  shortBio:
    "Comédien, acteur, musicien et influenceur camerounais suivi par plus de 4 millions de personnes à travers le monde.",
  parcours: [
    { year: "2018", event: "Premiers sketchs viraux sur Facebook" },
    { year: "2020", event: "Lancement de l'émission Pop The Balloon" },
    { year: "2021", event: "Rôle principal dans Impossible Love" },
    { year: "2022", event: "Sortie du titre musical FIN · 120K de vues" },
    { year: "2023", event: "Partenariat Tecno Cameroun · 108K abonnés" },
    { year: "2024", event: "4M+ abonnés toutes plateformes confondues" },
  ],
  vision:
    "Représenter la créativité africaine sur la scène mondiale — avec authenticité, humour et talent.",
  mission:
    "Divertir, inspirer et connecter les gens à travers le contenu, la musique et le cinéma.",
  photo: "/accueil2.jpeg",
} as const;

/* ── FILMS ─────────────────────────────────────────────────────── */
export const FILMS = [
  {
    title: "IMPOSSIBLE LOVE",
    genre: "Romance · Drame",
    description:
      "Un amour interdit entre deux mondes opposés. Claudio incarne un jeune homme déterminé à briser les barrières sociales pour vivre sa passion. Un film intense, émouvant, ancré dans la réalité camerounaise.",
    image: "/impossible-love.jpeg",
    href: "https://www.youtube.com/watch?v=n41OZMYRINY",
    teaser: "https://www.youtube.com/watch?v=3OJGjf1be-0",
    year: "2025",
  },
  {
    title: "BLOODY FRIENDS",
    genre: "Thriller · Action",
    description:
      "Quand l'amitié devient dangereuse. Claudio explore un rôle sombre et complexe dans ce thriller haletant qui tient le spectateur en haleine jusqu'à la dernière seconde.",
    image: "/bloody-friends.jpeg",
    href: "https://www.youtube.com/watch?v=F-tylWxBu7Q",
    teaser: null,
    year: "2024",
  },
  {
    title: "MY SISTER'S HUSBAND",
    genre: "Comédie · Famille",
    description:
      "Une comédie familiale explosive ! Le mari de sa sœur débarque à la maison et tout part en vrille. Claudio au sommet de son art comique dans un film qui fait rire toute la famille.",
    image: "/my-sister-husband.jpeg",
    href: "https://www.youtube.com/watch?v=FhXBJoMkTjA",
    teaser: "https://www.youtube.com/watch?v=CYFKxzmNru4",
    year: "2025",
  },
] as const;

/* ── MUSIC ─────────────────────────────────────────────────────── */

/**
 * YouTube thumbnail URL helper.
 * Quality order: maxresdefault → hqdefault (fallback si maxres non dispo)
 */
export function ytThumb(videoId: string, quality: "maxresdefault" | "hqdefault" = "hqdefault") {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

export const TRACKS = [
  {
    title: "MA WOMAN",
    type: "Clip Officiel",
    note: "Un hommage à la femme forte. À l'amour sincère. À celle qui est là même quand les projecteurs s'éteignent.",
    duration: "4:15",
    youtubeId: "4v8lKBdP4nA",
    href: "https://music.apple.com/cm/album/ma-woman-single/1771310035",
    streamLinks: {
      apple: "https://music.apple.com/cm/album/ma-woman-single/1771310035",
      shazam: "https://www.shazam.com/song/1771310036/ma-woman",
      youtube: "https://youtu.be/4v8lKBdP4nA",
    },
    color: "orange" as const,
  },
  {
    title: "VANITÉ",
    type: "Clip Officiel",
    note: "Une réflexion profonde sur les apparences et l'ego. Ce titre marque un tournant dans l'univers musical de Claudio — plus mature, plus introspectif.",
    duration: "3:55",
    youtubeId: "CGIEam-ZiAQ",
    href: "https://youtu.be/CGIEam-ZiAQ",
    streamLinks: {
      apple: null,
      shazam: null,
      youtube: "https://youtu.be/CGIEam-ZiAQ",
    },
    color: "gold" as const,
  },
  {
    title: "BOLÈ",
    type: "Single",
    note: "Bolè — un mot, une émotion, une identité. Ce son parle de nos racines camerounaises avec fierté et groove.",
    duration: "3:58",
    youtubeId: "A6-mT_ucG3g",
    href: "https://music.apple.com/ng/album/bol%C3%A8-single/1688859199",
    streamLinks: {
      apple: "https://music.apple.com/ng/album/bol%C3%A8-single/1688859199",
      shazam: null,
      youtube: "https://youtu.be/A6-mT_ucG3g",
    },
    color: "gold" as const,
  },
  {
    title: "FIN",
    type: "Single",
    note: "Une introspection profonde. La fin d'un chapitre, le début d'autre chose. Chaque mot vient du cœur.",
    duration: "3:42",
    youtubeId: "oVDEXgYT3pU",
    href: "https://music.apple.com/cg/song/fin/1796792606",
    streamLinks: {
      apple: "https://music.apple.com/cg/song/fin/1796792606",
      shazam: null,
      youtube: "https://youtu.be/oVDEXgYT3pU",
    },
    color: "gold" as const,
  },
] as const;

/* ── SHOWS ─────────────────────────────────────────────────────── */
export const SHOWS = [
  {
    title: "Pop The Balloon",
    badge: "ÉMISSION PHARE",
    description:
      "Des célibataires, des questions piquantes, et un ballon qui peut éclater à tout moment. L'émission de dating la plus imprévisible du Cameroun.",
    objectif:
      "Divertir et connecter les gens à travers un format de jeu original mêlant rencontres, défis et humour.",
    type: "Émission Dating · Jeu",
    image: "/pop-balloon.jpeg",
    href: "https://www.youtube.com/watch?v=lB3W8jIuaHQ",
    episodes: [
      { label: "Épisode 1", href: "https://www.youtube.com/watch?v=lB3W8jIuaHQ" },
      { label: "Épisode 95", href: "https://www.youtube.com/watch?v=x_Dxl2liqEY" },
      { label: "Part 20", href: "https://www.youtube.com/watch?v=JPqdXWIlF3k" },
      { label: "Speed Date", href: "https://www.youtube.com/watch?v=uXn7IOkrapk" },
    ],
    tags: ["Dating", "Jeu", "Humour"],
  },
  {
    title: "Smash or Pass",
    badge: "TALK-SHOW",
    description:
      "Le concept qui fait débat ! Claudio met ses invités face à des choix impossibles dans une ambiance explosive de rires et de révélations.",
    objectif:
      "Créer un espace de divertissement authentique où les personnalités camerounaises peuvent s'exprimer librement.",
    type: "Émission Web · Talk-Show",
    youtubeId: "Gjhv9Rmcb1Y",
    href: "https://youtu.be/Gjhv9Rmcb1Y",
    episodes: [
      { label: "1 VS Many", href: "https://www.youtube.com/watch?v=O1GhYFjYdDg" },
      { label: "Maa Jacky", href: "https://www.youtube.com/watch?v=yK4i69D2490" },
    ],
    tags: ["Talk-Show", "Humour", "Interview"],
  },
] as const;

/* ── DIGITAL PRESENCE ──────────────────────────────────────────── */
export const PLATFORMS = [
  {
    key: "tiktok",
    label: "TikTok",
    followers: 2400000,
    display: "2.4M",
    contentType: "Sketchs comiques, challenges, tendances",
    color: "#ffffff",
    href: SOCIAL_LINKS.tiktok,
  },
  {
    key: "facebook",
    label: "Facebook",
    followers: 975000,
    display: "975K",
    contentType: "Vidéos longues, lives, émissions",
    color: "#1877F2",
    href: SOCIAL_LINKS.facebook,
  },
  {
    key: "snapchat",
    label: "Snapchat",
    followers: 232200,
    display: "232K",
    contentType: "Coulisses exclusives, stories quotidiennes",
    color: "#FFFC00",
    href: SOCIAL_LINKS.snapchat,
  },
  {
    key: "youtube",
    label: "YouTube",
    followers: 219000,
    display: "219K",
    contentType: "Films, émissions complètes, clips",
    color: "#FF0000",
    href: SOCIAL_LINKS.youtube,
  },
  {
    key: "instagram",
    label: "Instagram",
    followers: 181000,
    display: "181K",
    contentType: "Photos lifestyle, reels, stories",
    color: "#E4405F",
    href: SOCIAL_LINKS.instagram,
  },
] as const;

export const CHART_DATA = PLATFORMS.map((p) => ({
  name: p.label,
  followers: p.followers,
  fill: p.color,
}));

/* ── PARTNERSHIPS ──────────────────────────────────────────────── */
export const PARTNERS = [
  {
    name: "Tecno Cameroun",
    logo: "/tecno.png",
    type: "Ambassadeur de marque",
    description:
      "Campagne de promotion des smartphones Tecno auprès de la communauté jeune camerounaise.",
    category: "Tech",
  },
  {
    name: "1xBet",
    logo: "/1xbet.png",
    type: "Partenariat sponsoring",
    description:
      "Collaboration avec la plateforme de paris sportifs 1xBet — visibilité auprès d'une audience de millions de fans.",
    category: "Sport & Betting",
  },
  {
    name: "Partenaire 3",
    logo: "https://placehold.co/120x60/141414/D4AF37?text=BRAND+3",
    type: "Co-création de contenu",
    description: "Création de contenus sponsorisés sur mesure pour les réseaux sociaux.",
    category: "Mode",
  },
] as const;

/* ── SERVICES ──────────────────────────────────────────────────── */
export const SERVICES = [
  {
    title: "Promotion de Marque",
    description:
      "Intégration de votre marque dans les contenus de Claudio — vidéos, stories, posts — avec un reach de 4M+ personnes.",
    features: ["Posts sponsorisés", "Stories dédiées", "Mentions en live"],
  },
  {
    title: "Influence Marketing",
    description:
      "Campagnes d'influence sur mesure, ciblant la communauté jeune et engagée de Claudio en Afrique et dans la diaspora.",
    features: ["Stratégie de contenu", "Multi-plateformes", "Reporting détaillé"],
  },
  {
    title: "Apparitions (Films & Clips)",
    description:
      "Claudio disponible pour des rôles dans vos productions cinématographiques, séries ou clips musicaux.",
    features: ["Rôles principaux", "Caméos", "Clips musicaux"],
  },
  {
    title: "Événementiel",
    description:
      "Animation d'événements, galas, lancements de produits, conférences — Claudio apporte son énergie et son humour.",
    features: ["Animation de soirées", "Lancements produits", "Galas & cérémonies"],
  },
] as const;

/* ── GALLERY ───────────────────────────────────────────────────── */
export interface GalleryPhoto {
  src: string;
  alt: string;
}

export interface GalleryAlbum {
  id: string;
  category: string;
  label: string;
  cover: string;
  count: number;
  photos: GalleryPhoto[];
}

export const GALLERY_ALBUMS: GalleryAlbum[] = [
  {
    id: "quotidien",
    category: "Quotidien",
    label: "Photos Quotidiennes",
    cover: "/galerie/moi.jpeg",
    count: 4,
    photos: [
      { src: "/galerie/moi.jpeg",     alt: "Claudio Njalla — photo quotidienne" },
      { src: "/galerie/moi2.jpeg",    alt: "Claudio Njalla — lifestyle" },
      { src: "/galerie/moi3.jpeg",    alt: "Claudio Njalla — lifestyle" },
      { src: "/galerie/moi-(2).jpeg", alt: "Claudio Njalla — photo du jour" },
    ],
  },
  {
    id: "tournage",
    category: "Tournage",
    label: "Tournages & Sets",
    cover: "/galerie/tournage.jpeg",
    count: 12,
    photos: [
      { src: "/galerie/tournage.jpeg",      alt: "Tournage" },
      { src: "/galerie/tournage-(2).jpeg",  alt: "Tournage 2" },
      { src: "/galerie/tournage-(3).jpeg",  alt: "Tournage 3" },
      { src: "/galerie/tournage-(4).jpeg",  alt: "Tournage 4" },
      { src: "/galerie/tournage-(5).jpeg",  alt: "Tournage 5" },
      { src: "/galerie/tournage-(6).jpeg",  alt: "Tournage 6" },
      { src: "/galerie/tournage-(7).jpeg",  alt: "Tournage 7" },
      { src: "/galerie/tournage-(8).jpeg",  alt: "Tournage 8" },
      { src: "/galerie/tournage-(9).jpeg",  alt: "Tournage 9" },
      { src: "/galerie/tournage-(10).jpeg", alt: "Tournage 10" },
      { src: "/galerie/tournage-(11).jpeg", alt: "Tournage 11" },
      { src: "/galerie/tournage-(12).jpeg", alt: "Tournage 12" },
    ],
  },
  {
    id: "prestation",
    category: "Prestation",
    label: "Prestations Musicales",
    cover: "/galerie/prestation-musical.jpeg",
    count: 4,
    photos: [
      { src: "/galerie/prestation-musical.jpeg",     alt: "Prestation musicale" },
      { src: "/galerie/prestation-musical-(2).jpeg", alt: "Prestation musicale 2" },
      { src: "/galerie/prestage-musical.jpeg",       alt: "Prestation sur scène" },
      { src: "/galerie/prestaion-musical.jpeg",      alt: "Prestation musicale live" },
    ],
  },
  {
    id: "tecno",
    category: "Tecno",
    label: "Collaboration Tecno",
    cover: "/galerie/tecno.jpeg",
    count: 6,
    photos: [
      { src: "/galerie/tecno.jpeg",     alt: "Partenariat Tecno Cameroun" },
      { src: "/galerie/tecno-(2).jpeg", alt: "Tecno — shooting 2" },
      { src: "/galerie/tecno-(3).jpeg", alt: "Tecno — shooting 3" },
      { src: "/galerie/tecno-(4).jpeg", alt: "Tecno — shooting 4" },
      { src: "/galerie/tecno-(5).jpeg", alt: "Tecno — shooting 5" },
      { src: "/galerie/tecno-(6).jpeg", alt: "Tecno — shooting 6" },
    ],
  },
];

export const GALLERY_CATEGORIES = ["Tous", "Quotidien", "Tournage", "Prestation", "Tecno"] as const;
