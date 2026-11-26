// Centralized team configuration module for MercSoft
// Supports team cards and digital business card routing

// Shared company data for business cards (add `contactInfo.website` or `canonicalUrl` per member to override)
export const COMPANY = {
  name: "MercSoft",
  website: "https://mercsoft.mx",
};

export const TEAM_MEMBERS = [
  {
    slug: "egalindo",
    displayName: "Eduardo Galindo",
    firstName: "Eduardo",
    lastName: "Galindo Franco",
    fullName: "Eduardo Galindo Franco",
    title: { en: "Co-Founder", es: "Cofundador" },
    vcfFilename: "eduardo-galindo-mercsoft.vcf",
    role: {
      en: "Founder & Engineering Lead",
      es: "Fundador y Líder de Ingeniería",
    },
    bio: {
      en: "Specializing in software architecture, resilient web systems, and AI-powered product engineering.",
      es: "Especializado en arquitectura de software, sistemas web resilientes e ingeniería de productos con IA.",
    },
    avatar: null, // Default avatar uses initials fallback
    initials: "EG",
    contactInfo: {
      email: "egalindo@mercsoft.mx",
      phone: "+522221401900",
      phoneDisplay: "222 140 1900",
    },
    socialLinks: [],
  },
  {
    slug: "mromero",
    displayName: "M. Romero",
    role: {
      en: "Co-Founder & Operations Lead",
      es: "Cofundador y Líder de Operaciones",
    },
    bio: {
      en: "Directing product strategy, delivery processes, and client engagement for custom technology solutions.",
      es: "Dirigiendo estrategia de producto, procesos de entrega y vinculación para soluciones tecnológicas a la medida.",
    },
    avatar: null, // Default avatar uses initials fallback
    initials: "MR",
    contactInfo: {
      email: null,
      phone: null,
    },
    socialLinks: [],
  },
];

// Resolved canonical card URL for a member
export function getCardUrl(member) {
  return member.canonicalUrl || `${COMPANY.website}/${member.slug}`;
}

export function getTeamMember(slug) {
  return TEAM_MEMBERS.find((member) => member.slug === slug);
}
