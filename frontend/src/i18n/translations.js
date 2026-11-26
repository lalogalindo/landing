// Translations for MercSoft landing.
// Default language: English. Add new languages by adding a key to the `dict` object.
// Use the `useT()` hook from ./index.js to consume strings.

export const dict = {
  en: {
    nav: {
      about: "About Us",
      services: "Services",
      process: "Process",
      privacy: "Privacy",
      contact: "Contact",
      cta: "Start a project",
    },
    hero: {
      eyebrow: "Software Studio · AI-Powered",
      title_a: "Solutions to",
      title_b: "your problems,",
      title_c: "engineered with cutting-edge tech.",
      lede:
        "MercSoft builds custom software for ambitious teams — e-commerce, dashboards, self-managed platforms, AI products and consulting. We design every system around your problem, not a template.",
      cta_primary: "Get a free discovery call",
      cta_secondary: "See how we work",
      stat_1_value: "AI-first",
      stat_1_label: "modern stack",
      stat_2_value: "100%",
      stat_2_label: "tailor-made",
      stat_3_value: "1:1",
      stat_3_label: "founder-led",
      ticker: [
        "REACT",
        "FASTAPI",
        "POSTGRES",
        "MONGODB",
        "OPENAI",
        "ANTHROPIC",
        "GEMINI",
        "STRIPE",
        "AWS",
        "GCP",
        "DOCKER",
        "KUBERNETES",
        "TYPESCRIPT",
        "NEXT.JS",
      ],
    },
    services: {
      label: "What we build",
      title: "A modern toolkit. Built for the problem in front of you.",
      lede:
        "Pick one, mix many. Every engagement is shaped to the outcome you need — not to a fixed catalogue.",
      items: {
        ecommerce: {
          name: "E-commerce",
          desc: "Storefronts, checkouts and payment flows that convert. Stripe, Shopify and headless setups.",
        },
        dashboards: {
          name: "Dashboards",
          desc: "Operational and analytics dashboards with realtime data, role-based access and exports.",
        },
        self_managed: {
          name: "Self-managed sites",
          desc: "Marketing sites and portals your team can edit without us — CMS, blocks and previews built-in.",
        },
        ai: {
          name: "AI Solutions",
          desc: "LLM features, agents, RAG and automations using GPT, Claude and Gemini — wired to your data.",
        },
        consulting: {
          name: "Consulting",
          desc: "Architecture reviews, tech due diligence and roadmaps that turn ambition into a plan.",
        },
        custom: {
          name: "Custom Software",
          desc: "Internal tools, SaaS products and integrations engineered end-to-end.",
        },
      },
    },
    process: {
      label: "How we work",
      title: "Requirements first. Always.",
      lede:
        "Most software fails because it answers the wrong question. We invest the most time up-front — in requirements gathering — so what we build serves you, and only you.",
      requirements_pill: "Our primary focus",
      steps: [
        {
          tag: "01 · Discovery",
          name: "Requirements gathering",
          desc:
            "Deep interviews, workflow mapping and stakeholder alignment. We don't write a line of code until we understand the problem better than your team does.",
          highlight: true,
        },
        {
          tag: "02 · Design",
          name: "Architecture & UX",
          desc:
            "We design data models, system architecture and interfaces that fit your reality — not a generic template.",
        },
        {
          tag: "03 · Build",
          name: "Engineering with AI leverage",
          desc:
            "Modern stack, AI-augmented development and continuous demos so you see progress every week.",
        },
        {
          tag: "04 · Delivery",
          name: "Launch & evolve",
          desc:
            "We ship, train your team, and stay close — measuring outcomes and iterating on what moves the needle.",
        },
      ],
    },
    privacy: {
      label: "Legal",
      title: "Privacy Policy & Data Usage",
      updated: "Last updated: December 2025",
      sections: [
        {
          h: "1. Who we are",
          p:
            "MercSoft is a software development studio founded by Manuel and partners. This page describes how we collect, use and protect information you share with us through this website and any engagement that follows.",
        },
        {
          h: "2. Information we collect",
          p:
            "When you submit our contact form we collect: your name, email address, company (optional), subject and the message you choose to write. Our backend also stores a timestamp and a unique identifier for the submission. We do not collect payment information through this site.",
        },
        {
          h: "3. How we use your information",
          p:
            "We use your information solely to (a) reply to your inquiry, (b) understand the problem you want us to solve, (c) prepare a proposal if requested, and (d) keep an internal record for legal and accounting reasons. We do not sell, rent or trade your data.",
        },
        {
          h: "4. Service providers",
          p:
            "Email delivery is handled by Resend (https://resend.com). Form submissions are protected by Google reCAPTCHA, which is subject to the Google Privacy Policy and Terms of Service. These providers may process minimal technical data on our behalf to deliver the service.",
        },
        {
          h: "5. Data retention",
          p:
            "Submissions are retained for as long as needed to serve you and to comply with applicable law. You can request deletion at any time by writing to the email address listed below.",
        },
        {
          h: "6. Your rights",
          p:
            "You can request access, correction, portability or deletion of your personal data. To exercise any of these rights, contact us at the email shown in the footer.",
        },
        {
          h: "7. Security",
          p:
            "We apply reasonable technical and organisational measures to protect your information, including encryption in transit and access controls. No method of transmission over the internet is 100% secure, however.",
        },
        {
          h: "8. Changes to this policy",
          p:
            "We may update this policy as our service evolves. The 'Last updated' date above will reflect the most recent revision.",
        },
      ],
    },
    contact: {
      label: "Contact",
      title: "Tell us about your problem.",
      lede:
        "We read every message. Expect a reply within one business day from a founder, not a bot.",
      info_email: "Email",
      info_phone: "Phone",
      info_hours: "Hours",
      info_hours_value: "Mon–Fri · 9am to 7pm",
      form: {
        name: "Full name",
        email: "Work email",
        company: "Company (optional)",
        subject: "Subject",
        message: "What problem can we solve for you?",
        submit: "Send message",
        sending: "Sending…",
        success_title: "Message sent",
        success_desc: "Thanks — we'll be in touch within one business day.",
        error_recaptcha: "Please complete the reCAPTCHA.",
        error_quota:
          "Our email service is at capacity right now. Please try again later, or contact us by phone.",
        error_generic: "Something went wrong. Please try again.",
      },
    },
    about: {
      hero_eyebrow: "About MercSoft",
      hero_title_a: "Engineered for clarity,",
      hero_title_b: "built for impact.",
      hero_lede:
        "MercSoft is an AI-powered software studio partnering with ambitious companies to build scalable digital products, high-converting platforms, and intelligent workflows.",
      intro_label: "Who We Are",
      intro_title: "A modern software partner",
      intro_text:
        "MercSoft bridges technical excellence with strategic business execution. Rather than applying rigid templates, we analyze every system from first principles to deliver maintainable, performant, and tailor-made software.",
      services_label: "What We Do",
      services_title: "Full-cycle digital engineering",
      services_lede:
        "From initial architecture to continuous production deployment, our capabilities cover modern web development, intelligent automation, and bespoke cloud infrastructure.",
      approach_label: "Our Approach",
      approach_title: "Principles behind our craft",
      principles: [
        {
          title: "Problem-First Engineering",
          desc: "Every line of code starts with understanding your business bottleneck. We build purposeful software, eliminating unnecessary bloat.",
        },
        {
          title: "Modern AI & Resilient Stack",
          desc: "We leverage leading-edge AI models, robust backend APIs, and reactive interfaces to create systems built to scale.",
        },
        {
          title: "Direct Founder Collaboration",
          desc: "Work directly with senior engineers and architects from kickoff through launch, ensuring high velocity and zero friction.",
        },
      ],
      team_label: "Our Team",
      team_title: "Leadership & craft",
      team_lede:
        "Meet the team leading engineering, product strategy, and technical architecture at MercSoft.",
      view_card: "View digital card",
      cta_label: "Ready to collaborate?",
      cta_title: "Let's build your next digital product together.",
      cta_lede:
        "Whether you need custom software, an AI workflow, or an architectural audit, we're ready to help.",
      cta_btn: "Start a project",
    },
    card: {
      badge: "Digital Business Card",
      subtitle: "MercSoft Team Member",
      connect: "Get in touch",
      back_to_about: "Back to About Us",
      back_to_home: "Back to Home",
      placeholder_notice:
        "Full digital card features (vCard, QR code, NFC) coming soon.",
      tap_flip: "Tap to flip",
      flip_label: "Business card. Press to flip it.",
      descriptor: "Software & Digital Solutions",
      save: "Save contact",
      whatsapp: "WhatsApp",
      call: "Call",
      email: "Email",
      website: "Website",
      linkedin: "LinkedIn",
      share: "Share",
      qr_show: "Show QR code",
      qr_hide: "Hide QR code",
      qr_alt: "QR code for this business card",
      qr_download: "Download QR (PNG)",
      copied: "Link copied",
      saved: "Contact file downloaded",
      copy_error: "Could not copy the link",
      powered: "Powered by",
      lang_label: "Language",
      not_found: "Business card not found.",
    },
    not_found: {
      title: "404",
      subtitle: "Page not found",
      desc: "The page you are looking for doesn't exist or has been moved.",
      back_home: "Return to Home",
    },
    footer: {
      tagline: "We create solutions to our customers' problems.",
      copyright: "© 2025 MercSoft. All rights reserved.",
      built_with: "Built with care, shipped with AI.",
    },
  },

  // Spanish — ready for future toggling.
  es: {
    nav: {
      about: "Nosotros",
      services: "Servicios",
      process: "Proceso",
      privacy: "Privacidad",
      contact: "Contacto",
      cta: "Empezar proyecto",
    },
    hero: {
      eyebrow: "Estudio de software · Impulsado por IA",
      title_a: "Soluciones a",
      title_b: "tus problemas,",
      title_c: "construidas con tecnología de punta.",
      lede:
        "MercSoft construye software a medida para equipos ambiciosos: e-commerce, dashboards, plataformas auto-administrables, productos de IA y consultoría. Diseñamos cada sistema alrededor de tu problema, no de una plantilla.",
      cta_primary: "Agenda una llamada gratis",
      cta_secondary: "Cómo trabajamos",
      stat_1_value: "AI-first",
      stat_1_label: "stack moderno",
      stat_2_value: "100%",
      stat_2_label: "a la medida",
      stat_3_value: "1:1",
      stat_3_label: "atendido por fundadores",
      ticker: [
        "REACT",
        "FASTAPI",
        "POSTGRES",
        "MONGODB",
        "OPENAI",
        "ANTHROPIC",
        "GEMINI",
        "STRIPE",
        "AWS",
        "GCP",
        "DOCKER",
        "KUBERNETES",
        "TYPESCRIPT",
        "NEXT.JS",
      ],
    },
    services: {
      label: "Lo que construimos",
      title: "Un toolkit moderno. Pensado para el problema que tienes enfrente.",
      lede:
        "Elige uno, combina varios. Cada proyecto se moldea al resultado que necesitas — no a un catálogo fijo.",
      items: {
        ecommerce: {
          name: "E-commerce",
          desc: "Tiendas, checkouts y flujos de pago que convierten. Stripe, Shopify y arquitecturas headless.",
        },
        dashboards: {
          name: "Dashboards",
          desc: "Tableros operativos y de analítica con datos en tiempo real, roles y exportaciones.",
        },
        self_managed: {
          name: "Sitios auto-administrables",
          desc: "Sitios y portales que tu equipo puede editar sin nosotros — CMS y bloques incluidos.",
        },
        ai: {
          name: "Soluciones IA",
          desc: "Funciones LLM, agentes, RAG y automatizaciones con GPT, Claude y Gemini conectados a tus datos.",
        },
        consulting: {
          name: "Consultoría",
          desc: "Revisiones de arquitectura, due diligence y hojas de ruta que aterrizan la ambición.",
        },
        custom: {
          name: "Software a medida",
          desc: "Herramientas internas, productos SaaS e integraciones de extremo a extremo.",
        },
      },
    },
    process: {
      label: "Cómo trabajamos",
      title: "Requerimientos primero. Siempre.",
      lede:
        "La mayoría del software falla porque responde la pregunta equivocada. Invertimos el mayor tiempo al inicio — en levantar requerimientos — para que lo que construyamos te sirva a ti, y solo a ti.",
      requirements_pill: "Nuestro foco principal",
      steps: [
        {
          tag: "01 · Descubrimiento",
          name: "Levantamiento de requerimientos",
          desc:
            "Entrevistas profundas, mapeo de flujos y alineación con stakeholders. No escribimos una línea hasta entender el problema mejor que tu equipo.",
          highlight: true,
        },
        {
          tag: "02 · Diseño",
          name: "Arquitectura y UX",
          desc:
            "Diseñamos modelos de datos, arquitectura e interfaces que se ajustan a tu realidad — no a una plantilla.",
        },
        {
          tag: "03 · Construcción",
          name: "Ingeniería potenciada con IA",
          desc:
            "Stack moderno, desarrollo asistido por IA y demos continuas para ver avance cada semana.",
        },
        {
          tag: "04 · Entrega",
          name: "Lanzamiento y evolución",
          desc:
            "Lanzamos, capacitamos a tu equipo y nos quedamos cerca — midiendo resultados e iterando en lo que mueve la aguja.",
        },
      ],
    },
    privacy: {
      label: "Legal",
      title: "Aviso de privacidad y uso de datos",
      updated: "Última actualización: diciembre 2025",
      sections: [
        {
          h: "1. Quiénes somos",
          p:
            "MercSoft es un estudio de desarrollo de software fundado por Manuel y socios. Esta página describe cómo recolectamos, usamos y protegemos la información que compartes con nosotros a través de este sitio.",
        },
        {
          h: "2. Información que recolectamos",
          p:
            "Cuando envías el formulario de contacto recolectamos: tu nombre, correo, empresa (opcional), asunto y el mensaje que decidas escribir. Nuestro backend también guarda una marca de tiempo y un identificador único.",
        },
        {
          h: "3. Cómo usamos tu información",
          p:
            "La usamos exclusivamente para (a) responder a tu solicitud, (b) entender el problema que quieres resolver, (c) preparar una propuesta si aplica y (d) mantener un registro interno legal y contable. No vendemos ni rentamos tus datos.",
        },
        {
          h: "4. Proveedores",
          p:
            "El envío de correos lo realiza Resend (https://resend.com). Los formularios están protegidos por Google reCAPTCHA, sujeto a sus políticas. Estos proveedores procesan datos técnicos mínimos por nuestra cuenta.",
        },
        {
          h: "5. Retención de datos",
          p:
            "Conservamos los envíos durante el tiempo necesario para atenderte y cumplir con la ley aplicable. Puedes solicitar su eliminación cuando lo desees al correo del pie de página.",
        },
        {
          h: "6. Tus derechos",
          p:
            "Puedes solicitar acceso, rectificación, portabilidad o eliminación de tus datos. Para ejercerlos, escríbenos al correo del pie de página.",
        },
        {
          h: "7. Seguridad",
          p:
            "Aplicamos medidas técnicas y organizativas razonables: cifrado en tránsito y controles de acceso. Sin embargo, ningún método de transmisión es 100% seguro.",
        },
        {
          h: "8. Cambios a este aviso",
          p:
            "Podemos actualizar este aviso. La fecha 'Última actualización' reflejará la versión vigente.",
        },
      ],
    },
    contact: {
      label: "Contacto",
      title: "Cuéntanos tu problema.",
      lede:
        "Leemos cada mensaje. Recibirás respuesta en menos de un día hábil de uno de los fundadores, no de un bot.",
      info_email: "Correo",
      info_phone: "Teléfono",
      info_hours: "Horario",
      info_hours_value: "Lun–Vie · 9am a 7pm",
      form: {
        name: "Nombre completo",
        email: "Correo de trabajo",
        company: "Empresa (opcional)",
        subject: "Asunto",
        message: "¿Qué problema podemos resolver?",
        submit: "Enviar mensaje",
        sending: "Enviando…",
        success_title: "Mensaje enviado",
        success_desc: "Gracias — te contactaremos en menos de un día hábil.",
        error_recaptcha: "Por favor completa el reCAPTCHA.",
        error_quota:
          "Nuestro servicio de correo está saturado. Intenta más tarde o llámanos por teléfono.",
        error_generic: "Algo salió mal. Inténtalo de nuevo.",
      },
    },
    about: {
      hero_eyebrow: "Sobre MercSoft",
      hero_title_a: "Diseñado para claridad,",
      hero_title_b: "construido para impactar.",
      hero_lede:
        "MercSoft es un estudio de software potenciado con IA que colabora con empresas ambiciosas para crear productos digitales escalables, plataformas de alto impacto y flujos inteligentes.",
      intro_label: "Quiénes Somos",
      intro_title: "Un socio moderno de software",
      intro_text:
        "MercSoft une la excelencia técnica con la visión estratégica de negocio. En lugar de aplicar plantillas rígidas, abordamos cada sistema desde sus fundamentos para entregar software mantenible, veloz y hecho a la medida.",
      services_label: "Qué Hacemos",
      services_title: "Ingeniería digital de ciclo completo",
      services_lede:
        "Desde la arquitectura inicial hasta el despliegue continuo en producción, abarcamos desarrollo web moderno, automatizaciones inteligentes e infraestructura en la nube.",
      approach_label: "Nuestro Enfoque",
      approach_title: "Principios detrás de nuestro trabajo",
      principles: [
        {
          title: "Ingeniería centrada en el problema",
          desc: "Cada línea de código responde a una necesidad real del negocio. Construimos software con propósito, sin capas innecesarias.",
        },
        {
          title: "IA moderna y stack resiliente",
          desc: "Aprovechamos modelos de IA de vanguardia, APIs robustas e interfaces reactivas para crear sistemas diseñados para escalar.",
        },
        {
          title: "Colaboración directa",
          desc: "Trabaja directamente con ingenieros y arquitectos senior desde el inicio hasta el lanzamiento, garantizando agilidad y transparencia.",
        },
      ],
      team_label: "Nuestro Equipo",
      team_title: "Liderazgo y experiencia",
      team_lede:
        "Conoce al equipo que lidera la ingeniería, estrategia de producto y arquitectura técnica en MercSoft.",
      view_card: "Ver tarjeta digital",
      cta_label: "¿Listo para colaborar?",
      cta_title: "Construyamos tu próximo producto digital.",
      cta_lede:
        "Ya sea que necesites software a la medida, automatizaciones con IA o una auditoría técnica, estamos listos para comenzar.",
      cta_btn: "Iniciar proyecto",
    },
    card: {
      badge: "Tarjeta Digital de Presentación",
      subtitle: "Equipo MercSoft",
      connect: "Contactar",
      back_to_about: "Volver a Nosotros",
      back_to_home: "Volver al Inicio",
      placeholder_notice:
        "Funcionalidades completas de tarjeta digital (vCard, código QR, NFC) disponibles próximamente.",
      tap_flip: "Toca para girar",
      flip_label: "Tarjeta de presentación. Presiona para girarla.",
      descriptor: "Software y Soluciones Digitales",
      save: "Guardar contacto",
      whatsapp: "WhatsApp",
      call: "Llamar",
      email: "Correo",
      website: "Sitio web",
      linkedin: "LinkedIn",
      share: "Compartir",
      qr_show: "Mostrar código QR",
      qr_hide: "Ocultar código QR",
      qr_alt: "Código QR de esta tarjeta de presentación",
      qr_download: "Descargar QR (PNG)",
      copied: "Enlace copiado",
      saved: "Archivo de contacto descargado",
      copy_error: "No se pudo copiar el enlace",
      powered: "Desarrollado por",
      lang_label: "Idioma",
      not_found: "Tarjeta no encontrada.",
    },
    not_found: {
      title: "404",
      subtitle: "Página no encontrada",
      desc: "La página que buscas no existe o ha sido movida.",
      back_home: "Volver al Inicio",
    },
    footer: {
      tagline: "Creamos soluciones a los problemas de nuestros clientes.",
      copyright: "© 2025 MercSoft. Todos los derechos reservados.",
      built_with: "Construido con cuidado, entregado con IA.",
    },
  },
};

export const SUPPORTED_LANGS = Object.keys(dict);
