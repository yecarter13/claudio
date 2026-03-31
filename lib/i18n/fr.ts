export interface Translations {
  nav: {
    about: string; films: string; music: string; shows: string;
    digital: string; contact: string; bookMe: string;
  };
  hero: {
    badge: string; tagline: string; cta_films: string; cta_contact: string;
    social_proof: string; scroll: string;
  };
  about: {
    label: string; heading: string; name: string;
    parcours: string; vision: string; mission: string;
  };
  films: {
    label: string; heading: string; accent: string;
    sub: string; watch: string; teaser: string;
  };
  music: {
    label: string; heading: string; accent: string; sub: string;
  };
  shows: {
    label: string; heading: string; accent: string;
    sub: string; watch: string; objectif: string;
  };
  digital: {
    label: string; heading: string; accent: string; sub: string; chart: string;
  };
  partners: {
    label: string; heading: string; accent: string; sub: string; cta: string;
  };
  services: {
    label: string; heading: string; accent: string; sub: string;
  };
  gallery: {
    label: string; heading: string; accent: string; sub: string;
    all: string; open: string; photos: string;
  };
  contact: {
    label: string; heading: string; accent: string; sub: string;
    email_label: string; phone_label: string; location_label: string;
    location_value: string; location_sub: string; available: string;
    form_title: string; form_sub: string; name_placeholder: string;
    email_placeholder: string; subject_label: string; message_placeholder: string;
    send: string; sending: string; sent_title: string; sent_sub: string;
    privacy: string; subjects: readonly string[];
  };
  footer: {
    quote: string; rights: string; made: string;
  };
}

export const fr: Translations = {
  nav: {
    about: "À Propos",
    films: "Films",
    music: "Musique",
    shows: "Shows",
    digital: "Digital",
    contact: "Contact",
    bookMe: "Me Contacter",
  },
  hero: {
    badge: "Créateur Camerounais · Divertissement · Culture",
    tagline: "Je suis là pour vous divertir, vous faire vivre des émotions authentiques et vous inspirer. Cameroun dans le cœur, le monde dans ma vision.",
    cta_films: "Voir mes Films",
    cta_contact: "Me Contacter",
    social_proof: "4M+ personnes me suivent",
    scroll: "Découvrir",
  },
  about: {
    label: "À PROPOS",
    heading: "Je suis",
    name: "Claudio Njalla.",
    parcours: "Parcours",
    vision: "Vision",
    mission: "Mission",
  },
  films: {
    label: "FILMOGRAPHIE",
    heading: "Derrière la caméra,",
    accent: "je joue pour de vrai.",
    sub: "Le jeu dramatique, c'est mon âme. Chaque film est un morceau de moi.",
    watch: "Voir le Film",
    teaser: "Teaser",
  },
  music: {
    label: "MUSIQUE",
    heading: "Quand je ne tourne pas…",
    accent: "je vous fais ressentir.",
    sub: "La musique, c'est mon côté le plus intime.",
  },
  shows: {
    label: "SHOWS & CONCEPTS",
    heading: "Bienvenue dans",
    accent: "mon univers.",
    sub: "Des émissions qui cassent les codes — créées pour vous faire vivre des moments uniques.",
    watch: "Regarder",
    objectif: "Objectif",
  },
  digital: {
    label: "INFLUENCE & PRÉSENCE DIGITALE",
    heading: "4M+ personnes",
    accent: "me suivent.",
    sub: "Une communauté engagée sur 5 plateformes majeures.",
    chart: "Audience par plateforme",
  },
  partners: {
    label: "PARTENARIATS",
    heading: "Ils m'ont fait",
    accent: "confiance.",
    sub: "Des collaborations authentiques avec des marques qui partagent mes valeurs.",
    cta: "Proposer un Partenariat",
  },
  services: {
    label: "SERVICES",
    heading: "Ce que je peux",
    accent: "faire pour vous.",
    sub: "De la promotion de marque à l'événementiel — mon audience et mon talent au service de vos projets.",
  },
  gallery: {
    label: "GALERIE",
    heading: "En images,",
    accent: "en coulisses.",
    sub: "Cliquez sur une galerie pour parcourir toutes les photos.",
    all: "Tous",
    open: "Voir la galerie",
    photos: "photos",
  },
  contact: {
    label: "CONTACT",
    heading: "Vous avez un projet ?",
    accent: "Parlons-en.",
    sub: "Collaboration, placement de marque, événement, ou juste dire bonjour.",
    email_label: "Email professionnel",
    phone_label: "Téléphone / WhatsApp",
    location_label: "Localisation",
    location_value: "Douala, Cameroun",
    location_sub: "Disponible pour déplacements internationaux",
    available: "Disponible · Réponse sous 24h",
    form_title: "Envoyez-moi un message",
    form_sub: "Je lis tout. Vraiment.",
    name_placeholder: "Votre nom complet",
    email_placeholder: "Votre adresse email",
    subject_label: "Objet",
    message_placeholder: "Décrivez votre projet…",
    send: "Envoyer le Message",
    sending: "Envoi en cours…",
    sent_title: "Message envoyé !",
    sent_sub: "Je vous réponds dans les 24h.",
    privacy: "Vos informations restent confidentielles.",
    subjects: [
      "Collaboration / Sponsoring",
      "Invitation Événement",
      "Projet Film/Série",
      "Projet Musical",
      "Interview / Média",
      "Autre",
    ],
  },
  footer: {
    quote: "Merci d'être passé. Revenez souvent — j'ai toujours quelque chose de nouveau à vous montrer.",
    rights: "Tous droits réservés.",
    made: "Made with care in Cameroon",
  },
};
