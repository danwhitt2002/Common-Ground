// ---------------------------------------------------------------------------
// CONFIG — everything you need to customize lives here.
// ---------------------------------------------------------------------------
const CONFIG = {
  // Single Event Pass — one specific date, picked on the select-event screen.
  price: "R$100",

  // Referral discount — 20% off a Single Event Pass (R$100 -> R$80) the
  // moment someone enters a friend's name in the "Referred by" field on
  // the contact screen. This swaps the price/QR on the payment screen
  // automatically, no message-first step — but since there's no backend
  // or accounts here, it's honor-based like everything else on this site:
  // nothing verifies the named referrer is real. Every submitted
  // application still records the name (see submitApplication()), so you
  // can spot-check afterwards if a name looks made up or gets reused
  // suspiciously. The referrer's own 20% off isn't automated at all —
  // they aren't filling out a new application — so that side is always on
  // you to remember and honor by hand next time they book.
  referralPrice: "R$80",

  // Grounds Pass — the monthly membership. Access to every event for a
  // month, plus Inner Circle, the invite-only premium WhatsApp group (day-to-day
  // meetups: run club, beach days, co-working, etc. — see
  // TRANSLATIONS.<lang>.approved.plans.monthly.sub). Called "monthly"
  // internally throughout the code (state.plan, element ids, CONFIG field
  // names) since that's what it technically is, but every user-facing
  // string calls it "Grounds Pass" — the flagship, branded tier, distinct
  // from the plain one-off Single Event Pass. Not tied to a specific date,
  // so it skips the select-event screen via its own link. There's no
  // recurring billing here (no backend for that) — like Founding Member
  // spots, renewals are tracked by hand: note when someone's month is up
  // and follow up for the next payment.
  monthlyMembershipPrice: "R$180",

  // Founding Member — a one-time, lifetime pass. Deliberately limited
  // (see foundingMemberSpotsTotal/Remaining below) to keep it exclusive.
  foundingMemberPrice: "R$699",

  // How many Founding Member spots exist in total, and how many are still
  // available — shown on the payment screen ("X of Y spots left"). There's
  // no backend here, so update foundingMemberSpotsRemaining by hand each
  // time one sells. The actual member number (e.g. "You're Founding Member
  // 4/20!") is something you tell them yourself when you confirm their
  // payment on WhatsApp — the site can't assign that live.
  foundingMemberSpotsTotal: 20,
  foundingMemberSpotsRemaining: 19,

  // Your Pix key (shown as text, and encoded into assets/pix-qr.png,
  // assets/pix-qr-monthly.png, and assets/pix-qr-founding.png). If you ever
  // change the key or any price, regenerate the matching QR image(s).
  pixKey: "04409638777",

  // PayPal and Wise — a second/third way to pay for applicants without Pix
  // (mainly international visitors). Both are priced in GBP rather than
  // Reais, since that's the currency your PayPal/Wise accounts actually
  // settle in — pricing directly in GBP avoids paying for two currency
  // conversions (payer's currency -> BRL -> GBP) instead of one.
  //
  // paypalLink is a PayPal.me link — PayPal.me supports the amount right
  // in the URL (paypalLink + "/12GBP"), so each plan gets its own exact
  // link built automatically, no per-amount QR needed.
  paypalLink: "https://www.paypal.me/commongroundbr",

  // wiseLink is a personal Wise "pay me" link. The ?amount=X&currency=YYY
  // pre-fill (Wise's documented format for its *business* pay links) is
  // confirmed working here too — the Wise app itself showed the right
  // amount pre-filled when this exact link+params combo was tested.
  wiseLink: "https://wise.com/pay/me/danielthomasw81",

  // Shown as copyable fallback text under the Wise QR, same role as
  // CONFIG.pixKey under the Pix QR — for anyone who can't scan.
  wiseTag: "@danielthomasw81",

  // GBP amount for each plan, shown on the PayPal button/Wise QR and built
  // into their links. Independent from the Reais prices above — update
  // both if you ever reprice.
  gbpAmount: { single: 15, monthly: 26, founding: 100, referral: 12 },

  // WhatsApp number applicants send payment proof to, digits only with
  // country code, no "+", spaces, or leading 0 (e.g. UK 07830 067043 -> 447830067043).
  whatsappNumber: "447830067043",

  // The STANDARD/general WhatsApp community group's invite link — this one
  // is public, shown directly on the landing page as a tappable link
  // (landing.communityLink), open to anyone, no payment needed. Distinct
  // from Inner Circle, the PREMIUM group (fortnightly events + day-to-day meetups), which
  // stays invite-only — you still hand that invite out manually to Grounds
  // Pass/Founding Member holders after confirming payment, same as before.
  standardGroupLink: "https://chat.whatsapp.com/F0Cfm69AAL6JVQpoud0Ok0?s=cl&p=i&mlu=4&ilr=4",

  // Shown at the bottom of the "approved" screen. Update to your real handle.
  instagramHandle: "@dansdigitaldiaries",

  // Where application answers get saved. Point this at a Formspree endpoint
  // (https://formspree.io — free tier, no backend needed) or any endpoint that
  // accepts a JSON POST. Leave blank to disable remote saving (answers still
  // get kept in the browser's localStorage as a local-only backup).
  //   Example: "https://formspree.io/f/abcdEFGH"
  formEndpoint: "https://formspree.io/f/mbgjrjnp",

  // Each question is type "choice" (single-select, needs an `options` array,
  // tapping one auto-advances), "multi" (multi-select — same `options`
  // array, but tap any number then hit Continue; set `hint` to show a small
  // note like "Choose one or more" under the question), or "text"/"textarea"
  // (a free-response field — "text" is a single short line, "textarea" is a
  // longer answer). `text`/`hint`/`placeholder`/`writeInPlaceholder` are each
  // { en, pt, es } — same for every string inside an `options` entry. A
  // "choice" question can set `writeIn` to the `en` value of one option (e.g.
  // "Something else") — selecting it opens a text box instead of submitting
  // right away, so you get a real answer instead of a vague catch-all. An
  // optional `key` surfaces that answer as its own field in the saved
  // application (in addition to the full `answers` list).
  questions: [
    {
      text: {
        en: "What is your full name?",
        pt: "Qual é o seu nome completo?",
        es: "¿Cuál es tu nombre completo?",
      },
      type: "text",
      key: "name",
      placeholder: {
        en: "Your full name",
        pt: "Seu nome completo",
        es: "Tu nombre completo",
      },
    },
    {
      text: {
        en: "What's your age?",
        pt: "Qual é a sua idade?",
        es: "¿Cuál es tu edad?",
      },
      type: "choice",
      key: "age",
      options: [
        { en: "18–22", pt: "18–22", es: "18–22" },
        { en: "23–27", pt: "23–27", es: "23–27" },
        { en: "28–34", pt: "28–34", es: "28–34" },
        { en: "35–39", pt: "35–39", es: "35–39" },
        { en: "40+", pt: "40+", es: "40+" },
      ],
    },
    {
      text: {
        en: "What brings you to Rio?",
        pt: "O que te trouxe ao Rio?",
        es: "¿Qué te trajo a Río?",
      },
      type: "choice",
      key: "reason",
      // Selecting this exact option opens a text box asking them to specify —
      // see `writeIn`/`openWriteIn()` below. Matched against an option's `en`
      // value, so it works no matter which language is on screen.
      writeIn: "✨ Something else",
      writeInPlaceholder: {
        en: "Tell us what brought you here",
        pt: "Conte-nos o que te trouxe aqui",
        es: "Cuéntanos qué te trajo aquí",
      },
      options: [
        { en: "🏖️ I'm from Rio (Carioca)", pt: "🏖️ Sou do Rio (Carioca)", es: "🏖️ Soy de Río (Carioca)" },
        { en: "💼 I moved here for work/digital nomad", pt: "💼 Me mudei para cá a trabalho/nômade digital", es: "💼 Me mudé aquí por trabajo/nómada digital" },
        { en: "❤️ I moved here for a partner", pt: "❤️ Me mudei para cá por causa de um(a) parceiro(a)", es: "❤️ Me mudé aquí por una pareja" },
        { en: "🎒 I'm travelling / backpacking", pt: "🎒 Estou viajando / mochilão", es: "🎒 Estoy viajando / de mochilero" },
        { en: "🎓 I'm studying here", pt: "🎓 Estou estudando aqui", es: "🎓 Estoy estudiando aquí" },
        { en: "✨ Something else", pt: "✨ Outro motivo", es: "✨ Otro motivo" },
      ],
    },
    {
      text: {
        en: "Why do you want to join Common Ground?",
        pt: "Por que você quer participar da Common Ground?",
        es: "¿Por qué quieres unirte a Common Ground?",
      },
      type: "multi",
      key: "motivation",
      hint: {
        en: "Choose one or more",
        pt: "Escolha uma ou mais opções",
        es: "Elige una o más opciones",
      },
      options: [
        { en: "☕ Discover cool new places/cafes in Rio", pt: "☕ Descobrir lugares e cafés legais no Rio", es: "☕ Descubrir lugares y cafés geniales en Río" },
        { en: "🤝 Meet new people", pt: "🤝 Conhecer pessoas novas", es: "🤝 Conocer gente nueva" },
        { en: "🌍 Build a more international social circle", pt: "🌍 Construir um círculo social mais internacional", es: "🌍 Construir un círculo social más internacional" },
        { en: "💪 Put myself out of my comfort zone", pt: "💪 Sair da minha zona de conforto", es: "💪 Salir de mi zona de confort" },
        { en: "🌱 Try new things", pt: "🌱 Experimentar coisas novas", es: "🌱 Probar cosas nuevas" },
      ],
    },
    {
      text: {
        en: "Who are you hoping to meet through Common Ground?",
        pt: "Quem você espera conhecer na Common Ground?",
        es: "¿A quién esperas conocer en Common Ground?",
      },
      type: "multi",
      key: "lookingFor",
      hint: {
        en: "Choose one or more",
        pt: "Escolha uma ou mais opções",
        es: "Elige una o más opciones",
      },
      options: [
        { en: "🏖️ Cariocas/locals", pt: "🏖️ Cariocas/locais", es: "🏖️ Cariocas/locales" },
        { en: "💻 Digital nomads", pt: "💻 Nômades digitais", es: "💻 Nómadas digitales" },
        { en: "💕 Romantic connections", pt: "💕 Conexões românticas", es: "💕 Conexiones románticas" },
        { en: "🎒 Backpackers", pt: "🎒 Mochileiros", es: "🎒 Mochileros" },
        { en: "💡 Founders/entrepreneurs", pt: "💡 Fundadores/empreendedores", es: "💡 Fundadores/emprendedores" },
        { en: "🤗 I'm open to meeting anyone", pt: "🤗 Estou aberto(a) a conhecer qualquer pessoa", es: "🤗 Estoy abierto/a a conocer a cualquier persona" },
      ],
    },
    {
      text: {
        en: "Tell us about yourself",
        pt: "Conte-nos sobre você",
        es: "Cuéntanos sobre ti",
      },
      type: "textarea",
      key: "aboutYou",
      placeholder: {
        en: "Describe yourself in a few sentences.",
        pt: "Descreva-se em algumas frases.",
        es: "Descríbete en algunas frases.",
      },
    },
  ],
};

// ---------------------------------------------------------------------------
// Translations — every other on-screen string, keyed by dot-path and looked
// up with t("some.key"). Templated strings use {price}/{handle}/{current}/
// {total} placeholders, substituted with a plain .replace() where used.
// ---------------------------------------------------------------------------
const TRANSLATIONS = {
  en: {
    landing: {
      eyebrow: "Rio de Janeiro · Applications Open Now",
      bio: "A fortnightly social club in Rio de Janeiro made for connection through community. Locals, nomads, and travellers alike — everyone is welcome!",
      lede: "Find your Common Ground — apply now.",
      perksHeading: "The Grounds Pass — {monthlyPrice}/month",
      perks: {
        access: "Unlimited access to Common Ground events that month.",
        groupchat: "Invitation into Common Ground: Inner Circle, our members-only WhatsApp — with first access to events and announcements.",
        meetups: "Free meetups throughout the month — beach days, run clubs, coworking, and more.",
        brands: "Curated discounts across a handpicked lineup of brands that share our aesthetic.",
      },
      singleHeading: "Single-Event Pass — {price}/event",
      singlePerks: {
        access: "Access to our fortnightly social club.",
      },
      stats: {
        capacity: "Max people per event",
        nextEvent: "Next Event",
        founding: "Founding Member passes remaining",
        price: "Price per event",
      },
      apply: "Apply Now",
      finePrint: "Takes about a minute.",
      menuLink: "See what's included at our events — the drinks menu →",
      eventsLink: "See upcoming event dates →",
      communityLede: "Not ready to apply yet? Join our general WhatsApp community — open to everyone, event updates and announcements.",
      communityIntro: "Introduce yourself!",
      communityLink: "Common Ground Community Groupchat →",
      referralHeading: "Refer a Friend",
      referralBody: "Refer a friend and both get 20% off your single-event pass. All they need to do is mention your name in the Referral section in the application.",
    },
    question: {
      back: "← Back",
      continue: "Continue",
      countTemplate: "Question {current} of {total}",
      textError: "Please answer to continue.",
      multiError: "Please choose at least one option.",
      writeInError: "Please tell us a bit more.",
      writeInDefaultPlaceholder: "Tell us more...",
    },
    contact: {
      eyebrow: "Final Step",
      heading: "What's your WhatsApp number, so we can reach you?",
      whatsappLabel: "WhatsApp number",
      whatsappPlaceholder: "+55 21 91234-5678",
      instagramLabel: "Instagram handle",
      instagramPlaceholder: "@yourname",
      referredByLabel: "Referred by",
      referredByPlaceholder: "Friend's name",
      optional: "(optional)",
      submit: "Submit Application",
      error: "Please fill in your WhatsApp number.",
    },
    reviewing: {
      messages: [
        "Saving your answers…",
        "Setting up your application…",
        "Almost there…",
      ],
    },
    selectEvent: {
      back: "← Back",
      eyebrow: "Almost There",
      heading: "Select Your Event",
      lede: "Pick the date you're coming to.",
      continueOne: "Continue →",
      monthlyLink: "Or get a Grounds Pass — premium access, no dates needed →",
      foundingLink: "Or become a Founding Member — lifetime access, no dates needed →",
      selectedDatesLabel: "Your date: {dates}",
      whatsappDatesSuffix: "Date: {dates}.",
      locale: "en-GB",
    },
    approved: {
      backToSelectEvent: "← Select Your Event",
      eyebrow: "You're In!",
      heading: "Welcome to the Common Ground Social Club.",
      lede: "You're in. Choose your plan below — coffee & matcha‑based mocktails included every time.",
      recommendedLabel: "Recommended",
      plans: {
        single: {
          label: "Single Event Pass",
          unit: "/event",
          sub: "Try us out — this event only, plus the general WhatsApp group chat",
        },
        monthly: {
          label: "Grounds Pass",
          unit: "/month",
          sub: "Every event this month, plus Inner Circle, our invite-only WhatsApp group — fortnightly events, run club, beach days, co-working, and discounts with our curated brand partners",
        },
        founding: {
          label: "Founding Member",
          unit: "one-time",
          sub: "One-time payment · lifetime access to every event, plus Inner Circle, our invite-only WhatsApp group",
          badge: "{remaining} of {total} spots left",
        },
      },
      paymentMethods: { pix: "Pix", paypal: "PayPal", wise: "Wise" },
      pixScanHint: "Or scan the QR code below",
      pixKeyLabel: "Pix key (CPF)",
      wiseScanHint: "Or scan the QR code below",
      wiseTagLabel: "Wise tag",
      externalPayHint: "Tap below to pay, then send your receipt on WhatsApp to lock in your spot.",
      externalPayBtn: "Pay with {method} →",
      paidViaSuffix: " (paid via {method})",
      copy: "Copy",
      copied: "Copied",
      whatsappBtn: "Send Payment Proof on WhatsApp",
      groupNote: "Grounds Pass holders get added to Common Ground: Inner Circle, our invite-only members WhatsApp. Members get first access to our events and announcements.",
      menuLink: "See the drinks menu →",
      finePrint: "Send your receipt on WhatsApp to lock in your spot. Questions? DM us on Instagram {handle}.",
      referralBadge: "20% off — referred by {name}",
      whatsappReferralSuffix: "Referred by: {name}.",
    },
    whatsappMessage: {
      single: "Hi! Here's my payment proof for my Common Ground Single Event Pass:",
      monthly: "Hi! Here's my payment proof for my Common Ground Grounds Pass:",
      founding: "Hi! Here's my payment proof for my Common Ground Founding Member Pass (lifetime):",
    },
  },
  pt: {
    landing: {
      eyebrow: "Rio de Janeiro · Inscrições Abertas",
      bio: "Um clube social quinzenal no Rio de Janeiro feito para conexão através da comunidade. Cariocas, nômades e viajantes — todos são bem-vindos!",
      lede: "Find your Common Ground — inscreva-se agora.",
      perksHeading: "O Grounds Pass — {monthlyPrice}/mês",
      perks: {
        access: "Acesso ilimitado aos eventos da Common Ground naquele mês.",
        groupchat: "Convite para o Common Ground: Inner Circle, nosso WhatsApp exclusivo para membros — com acesso prioritário a eventos e avisos.",
        meetups: "Encontros gratuitos ao longo do mês — praia, corrida em grupo, coworking e muito mais.",
        brands: "Descontos exclusivos com uma seleção de marcas parceiras que combinam com a nossa estética.",
      },
      singleHeading: "Passe de Evento Único — {price}/evento",
      singlePerks: {
        access: "Acesso ao nosso clube social quinzenal.",
      },
      stats: {
        capacity: "Máximo de pessoas por evento",
        nextEvent: "Próximo Evento",
        founding: "Passes de Membro Fundador restantes",
        price: "Preço por evento",
      },
      apply: "Inscreva-se Agora",
      finePrint: "Leva cerca de um minuto.",
      menuLink: "Veja o que está incluído nos nossos eventos — o cardápio de bebidas →",
      eventsLink: "Veja as próximas datas de eventos →",
      communityLede: "Ainda não está pronto(a) para se inscrever? Entre no nosso grupo geral do WhatsApp — aberto a todos, com novidades e avisos de eventos.",
      communityIntro: "Se apresente!",
      communityLink: "Grupo da Comunidade Common Ground →",
      referralHeading: "Indique um Amigo",
      referralBody: "Indique um(a) amigo(a) e os dois ganham 20% de desconto no passe de evento único. Basta ele(a) mencionar seu nome no campo de indicação da inscrição.",
    },
    question: {
      back: "← Voltar",
      continue: "Continuar",
      countTemplate: "Pergunta {current} de {total}",
      textError: "Responda para continuar.",
      multiError: "Escolha pelo menos uma opção.",
      writeInError: "Conte-nos um pouco mais.",
      writeInDefaultPlaceholder: "Conte-nos mais...",
    },
    contact: {
      eyebrow: "Última Etapa",
      heading: "Qual é o seu número de WhatsApp, para conseguirmos falar com você?",
      whatsappLabel: "Número de WhatsApp",
      whatsappPlaceholder: "+55 21 91234-5678",
      instagramLabel: "Instagram",
      instagramPlaceholder: "@seunome",
      referredByLabel: "Indicado(a) por",
      referredByPlaceholder: "Nome do(a) amigo(a)",
      optional: "(opcional)",
      submit: "Enviar Inscrição",
      error: "Preencha seu número de WhatsApp.",
    },
    reviewing: {
      messages: [
        "Salvando suas respostas…",
        "Preparando sua inscrição…",
        "Quase lá…",
      ],
    },
    selectEvent: {
      back: "← Voltar",
      eyebrow: "Quase Lá",
      heading: "Escolha Seu Evento",
      lede: "Escolha a data em que você vai participar.",
      continueOne: "Continuar →",
      monthlyLink: "Ou garanta um Grounds Pass — acesso premium, sem datas necessárias →",
      foundingLink: "Ou torne-se Membro Fundador — acesso vitalício, sem datas necessárias →",
      selectedDatesLabel: "Sua data: {dates}",
      whatsappDatesSuffix: "Data: {dates}.",
      locale: "pt-BR",
    },
    approved: {
      backToSelectEvent: "← Escolha Seu Evento",
      eyebrow: "Você Está Dentro!",
      heading: "Bem-vindo(a) ao Common Ground Social Club.",
      lede: "Você entrou. Escolha seu plano abaixo — mocktails de café e matchá incluídos sempre.",
      recommendedLabel: "Recomendado",
      plans: {
        single: {
          label: "Passe de Evento Único",
          unit: "/evento",
          sub: "Experimente — somente este evento, além do grupo geral no WhatsApp",
        },
        monthly: {
          label: "Grounds Pass",
          unit: "/mês",
          sub: "Todos os eventos do mês, além do Inner Circle, nosso grupo exclusivo por convite no WhatsApp — encontros quinzenais, corrida em grupo, praia, coworking e descontos com nossas marcas parceiras",
        },
        founding: {
          label: "Membro Fundador",
          unit: "pagamento único",
          sub: "Pagamento único · acesso vitalício a todos os eventos, além do Inner Circle, nosso grupo exclusivo por convite no WhatsApp",
          badge: "{remaining} de {total} vagas restantes",
        },
      },
      paymentMethods: { pix: "Pix", paypal: "PayPal", wise: "Wise" },
      pixScanHint: "Ou escaneie o QR code abaixo",
      pixKeyLabel: "Chave Pix (CPF)",
      wiseScanHint: "Ou escaneie o QR code abaixo",
      wiseTagLabel: "Tag da Wise",
      externalPayHint: "Toque abaixo para pagar, depois envie seu comprovante no WhatsApp para garantir sua vaga.",
      externalPayBtn: "Pagar com {method} →",
      paidViaSuffix: " (pago via {method})",
      copy: "Copiar",
      copied: "Copiado",
      whatsappBtn: "Enviar Comprovante no WhatsApp",
      groupNote: "Titulares do Grounds Pass são adicionados ao Common Ground: Inner Circle, nosso WhatsApp exclusivo para membros. Membros têm acesso prioritário aos nossos eventos e avisos.",
      menuLink: "Veja o cardápio de bebidas →",
      finePrint: "Envie seu comprovante no WhatsApp para garantir sua vaga. Dúvidas? Chame no Instagram {handle}.",
      referralBadge: "20% de desconto — indicado(a) por {name}",
      whatsappReferralSuffix: "Indicado(a) por: {name}.",
    },
    whatsappMessage: {
      single: "Oi! Aqui está o comprovante de pagamento do meu Passe de Evento Único da Common Ground:",
      monthly: "Oi! Aqui está o comprovante de pagamento do meu Grounds Pass da Common Ground:",
      founding: "Oi! Aqui está o comprovante de pagamento do meu Passe de Membro Fundador da Common Ground (vitalício):",
    },
  },
  es: {
    landing: {
      eyebrow: "Río de Janeiro · Inscripciones Abiertas",
      bio: "Un club social quincenal en Río de Janeiro creado para la conexión a través de la comunidad. Cariocas, nómadas y viajeros — ¡todos son bienvenidos!",
      lede: "Find your Common Ground — solicita ahora.",
      perksHeading: "El Grounds Pass — {monthlyPrice}/mes",
      perks: {
        access: "Acceso ilimitado a los eventos de Common Ground ese mes.",
        groupchat: "Invitación a Common Ground: Inner Circle, nuestro WhatsApp exclusivo para miembros — con acceso prioritario a eventos y anuncios.",
        meetups: "Encuentros gratuitos durante todo el mes — playa, running club, coworking y más.",
        brands: "Descuentos exclusivos con una selección de marcas asociadas que combinan con nuestra estética.",
      },
      singleHeading: "Pase de Evento Único — {price}/evento",
      singlePerks: {
        access: "Acceso a nuestro club social quincenal.",
      },
      stats: {
        capacity: "Máximo de personas por evento",
        nextEvent: "Próximo Evento",
        founding: "Pases de Miembro Fundador restantes",
        price: "Precio por evento",
      },
      apply: "Solicita Ahora",
      finePrint: "Toma cerca de un minuto.",
      menuLink: "Mira qué está incluido en nuestros eventos — el menú de bebidas →",
      eventsLink: "Mira las próximas fechas de eventos →",
      communityLede: "¿Aún no estás listo/a para solicitar? Únete a nuestra comunidad general de WhatsApp — abierta a todos, con novedades y anuncios de eventos.",
      communityIntro: "¡Preséntate!",
      communityLink: "Grupo Comunitario de Common Ground →",
      referralHeading: "Refiere a un Amigo",
      referralBody: "Refiere a un amigo y ambos obtienen 20% de descuento en el pase de evento único. Solo tiene que mencionar tu nombre en el campo de referido de la solicitud.",
    },
    question: {
      back: "← Atrás",
      continue: "Continuar",
      countTemplate: "Pregunta {current} de {total}",
      textError: "Responde para continuar.",
      multiError: "Elige al menos una opción.",
      writeInError: "Cuéntanos un poco más.",
      writeInDefaultPlaceholder: "Cuéntanos más...",
    },
    contact: {
      eyebrow: "Último Paso",
      heading: "¿Cuál es tu número de WhatsApp, para poder contactarte?",
      whatsappLabel: "Número de WhatsApp",
      whatsappPlaceholder: "+55 21 91234-5678",
      instagramLabel: "Instagram",
      instagramPlaceholder: "@tunombre",
      referredByLabel: "Referido/a por",
      referredByPlaceholder: "Nombre de tu amigo/a",
      optional: "(opcional)",
      submit: "Enviar Solicitud",
      error: "Completa tu número de WhatsApp.",
    },
    reviewing: {
      messages: [
        "Guardando tus respuestas…",
        "Preparando tu solicitud…",
        "Casi listo…",
      ],
    },
    selectEvent: {
      back: "← Atrás",
      eyebrow: "Casi Listo",
      heading: "Elige Tu Evento",
      lede: "Elige la fecha a la que vas a asistir.",
      continueOne: "Continuar →",
      monthlyLink: "O consigue un Grounds Pass — acceso premium, sin fechas necesarias →",
      foundingLink: "O conviértete en Miembro Fundador — acceso de por vida, sin fechas necesarias →",
      selectedDatesLabel: "Tu fecha: {dates}",
      whatsappDatesSuffix: "Fecha: {dates}.",
      locale: "es-ES",
    },
    approved: {
      backToSelectEvent: "← Elige Tu Evento",
      eyebrow: "¡Ya Estás Dentro!",
      heading: "Bienvenido/a al Common Ground Social Club.",
      lede: "Ya estás dentro. Elige tu plan abajo — mocktails de café y matcha incluidos siempre.",
      recommendedLabel: "Recomendado",
      plans: {
        single: {
          label: "Pase de Evento Único",
          unit: "/evento",
          sub: "Pruébanos — solo este evento, además del grupo general de WhatsApp",
        },
        monthly: {
          label: "Grounds Pass",
          unit: "/mes",
          sub: "Todos los eventos de este mes, además del Inner Circle, nuestro grupo exclusivo por invitación de WhatsApp — eventos quincenales, running club, playa, coworking y descuentos con nuestras marcas asociadas",
        },
        founding: {
          label: "Miembro Fundador",
          unit: "pago único",
          sub: "Pago único · acceso de por vida a todos los eventos, además del Inner Circle, nuestro grupo exclusivo por invitación de WhatsApp",
          badge: "{remaining} de {total} cupos restantes",
        },
      },
      paymentMethods: { pix: "Pix", paypal: "PayPal", wise: "Wise" },
      pixScanHint: "O escanea el código QR abajo",
      pixKeyLabel: "Clave Pix (CPF)",
      wiseScanHint: "O escanea el código QR abajo",
      wiseTagLabel: "Etiqueta de Wise",
      externalPayHint: "Toca abajo para pagar, luego envía tu comprobante por WhatsApp para asegurar tu lugar.",
      externalPayBtn: "Pagar con {method} →",
      paidViaSuffix: " (pagado vía {method})",
      copy: "Copiar",
      copied: "Copiado",
      whatsappBtn: "Enviar Comprobante por WhatsApp",
      groupNote: "Los titulares del Grounds Pass son añadidos a Common Ground: Inner Circle, nuestro WhatsApp exclusivo para miembros. Los miembros tienen acceso prioritario a nuestros eventos y anuncios.",
      menuLink: "Mira el menú de bebidas →",
      finePrint: "Envía tu comprobante por WhatsApp para asegurar tu lugar. ¿Dudas? Escríbenos por Instagram {handle}.",
      referralBadge: "20% de descuento — referido/a por {name}",
      whatsappReferralSuffix: "Referido/a por: {name}.",
    },
    whatsappMessage: {
      single: "¡Hola! Aquí está mi comprobante de pago de mi Pase de Evento Único de Common Ground:",
      monthly: "¡Hola! Aquí está mi comprobante de pago de mi Grounds Pass de Common Ground:",
      founding: "¡Hola! Aquí está mi comprobante de pago de mi Pase de Miembro Fundador de Common Ground (de por vida):",
    },
  },
};

function t(key) {
  const dict = TRANSLATIONS[state.lang] || TRANSLATIONS.en;
  return key.split(".").reduce((obj, k) => (obj ? obj[k] : undefined), dict);
}

// ---------------------------------------------------------------------------
// State machine
// ---------------------------------------------------------------------------
const state = {
  screen: "landing", // landing | question | contact | reviewing | select-event | approved
  lang: "en", // "en" | "pt" | "es" — switched via the flag buttons on landing
  plan: "monthly", // "single" | "monthly" | "founding" — defaults to Grounds Pass ("monthly"), the main product, for anyone landing straight on the payment screen via the #approved shortcut; overridden to "single" the moment someone actually picks a date on the select-event step
  paymentMethod: "pix", // "pix" | "paypal" | "wise" — chosen on the approved/payment screen
  questionIndex: 0,
  answers: [], // { question, answer, answerEn?, writeInText? }
  contact: {},
  selectedEvents: [], // holds a single "YYYY-MM-DD" date picked on the select-event screen (Single Event plan only)
};

const screens = {};
document.querySelectorAll(".screen").forEach((el) => {
  screens[el.dataset.screen] = el;
});

function showScreen(name) {
  state.screen = name;
  Object.values(screens).forEach((el) => el.classList.remove("is-active"));
  screens[name].classList.add("is-active");
  window.scrollTo({ top: 0, behavior: "smooth" });

  // No-op on the real site (there's no "menu"/"events" screen here — those
  // links are real page navigations to menu.html/events.html). Only fires
  // in the trial bundle, where menu.js/events.js are merged into this same
  // page as screens, so a language switched after a screen was first built
  // still comes through.
  if (name === "menu" && typeof renderMenuPage === "function") {
    renderMenuPage();
  }
  if (name === "events" && typeof renderEventsPage === "function") {
    renderEventsPage();
  }
}

// The WhatsApp payment-proof button's text is language-dependent, so it's
// declared up here (instead of down in the "Payment" section) so applyLang()
// below — including its initial call — can safely reference it.
const whatsappBtn = document.getElementById("whatsapp-btn");

// ---------------------------------------------------------------------------
// Language switch — small flag buttons in the top-right corner of the
// landing screen. Picking one translates every static string on the page
// (via [data-i18n]/[data-i18n-placeholder]) without changing screens.
// ---------------------------------------------------------------------------
function renderLandingPerksHeading() {
  document.getElementById("landing-perks-heading").textContent = t("landing.perksHeading").replace("{monthlyPrice}", CONFIG.monthlyMembershipPrice);
}

function renderLandingSingleHeading() {
  document.getElementById("landing-single-heading").textContent = t("landing.singleHeading").replace("{price}", CONFIG.price);
}

// Landing page's stat row shows the next upcoming event's date (day + short
// month, e.g. "27 Sep") next to the capacity stat — reuses the same locale
// key as the select-event screen's date formatting for consistency.
function renderNextEventStat() {
  const el = document.getElementById("next-event-date");
  const nextEvent = EVENTS_CONFIG.events[0];
  if (!el || !nextEvent) return;
  const formatter = new Intl.DateTimeFormat(t("selectEvent.locale"), { day: "numeric", month: "short", timeZone: "UTC" });
  const [y, m, d] = nextEvent.date.split("-").map(Number);
  el.textContent = formatter.format(new Date(Date.UTC(y, m - 1, d)));
}

function renderReferralSection() {
  document.getElementById("landing-referral-body").textContent = t("landing.referralBody");
  document.getElementById("referral-price-old").textContent = CONFIG.price;
  document.getElementById("referral-price-new").textContent = CONFIG.referralPrice;
}

function renderApprovedFinePrint() {
  document.getElementById("approved-fine-print").textContent = t("approved.finePrint").replace("{handle}", CONFIG.instagramHandle);
}

// Formats the dates picked on the select-event screen (e.g. "6 Sep, 13 Sep")
// in the current language's locale — null if nothing was picked there (the
// #approved direct-link shortcut skips that screen entirely).
function formatSelectedDatesForSub() {
  if (state.selectedEvents.length === 0) return null;
  const formatter = new Intl.DateTimeFormat(t("selectEvent.locale"), { day: "numeric", month: "short", timeZone: "UTC" });
  return state.selectedEvents
    .map((dateStr) => {
      const [y, m, d] = dateStr.split("-").map(Number);
      return formatter.format(new Date(Date.UTC(y, m - 1, d)));
    })
    .join(", ");
}

function renderWhatsappBtn() {
  const methodLabel = t(`approved.paymentMethods.${state.paymentMethod}`);
  const paidVia = t("approved.paidViaSuffix").replace("{method}", methodLabel);
  let message = t("whatsappMessage")[state.plan] + paidVia;
  const datesLabel = state.plan === "single" ? formatSelectedDatesForSub() : null;
  if (datesLabel) {
    message += " " + t("selectEvent.whatsappDatesSuffix").replace("{dates}", datesLabel);
  }
  if (isReferralDiscountActive()) {
    message += " " + t("approved.whatsappReferralSuffix").replace("{name}", state.contact.referredBy);
  }
  whatsappBtn.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// ---------------------------------------------------------------------------
// Select-event — the step between "reviewing" and payment. Applicants pick
// the one real date they're paying for (from EVENTS_CONFIG, shared with
// events.html via events-data.js) instead of buying a pass blind, always
// mapping to the Single Event Pass. Grounds Pass (the monthly membership,
// "monthly" internally) and Founding Member both skip this screen via
// their own links instead — neither is tied to a specific date: Grounds
// Pass covers every event announced during the paid month, tracked
// manually like Founding Member spots; Founding Member is a lifetime pass
// with no dates at all.
// ---------------------------------------------------------------------------
function renderSelectEventScreen() {
  const formatter = new Intl.DateTimeFormat(t("selectEvent.locale"), { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });
  const listEl = document.getElementById("select-event-list");
  listEl.innerHTML = "";

  const ul = document.createElement("ul");
  ul.className = "events-cards";

  EVENTS_CONFIG.events.forEach((event) => {
    const isSelected = state.selectedEvents[0] === event.date;

    const li = document.createElement("li");
    li.className = "event-card event-card-select" + (isSelected ? " is-selected" : "");
    li.setAttribute("role", "radio");
    li.setAttribute("aria-checked", String(isSelected));
    li.tabIndex = 0;

    const check = document.createElement("span");
    check.className = "event-card-check";
    check.setAttribute("aria-hidden", "true");
    check.textContent = "✓";
    li.appendChild(check);

    if (event.tag) {
      const tag = document.createElement("span");
      tag.className = "event-tag";
      tag.textContent = event.tag;
      li.appendChild(tag);
    }

    if (event.image) {
      const img = document.createElement("img");
      img.className = "event-card-img";
      img.src = event.image;
      img.alt = "";
      li.appendChild(img);
    }

    if (event.title) {
      const titleEl = document.createElement("p");
      titleEl.className = "event-card-title";
      titleEl.textContent = event.title;
      li.appendChild(titleEl);
    }

    const dateEl = document.createElement("p");
    dateEl.className = "event-card-date";
    const [y, m, d] = event.date.split("-").map(Number);
    dateEl.textContent = formatter.format(new Date(Date.UTC(y, m - 1, d)));
    li.appendChild(dateEl);

    const select = () => {
      state.selectedEvents = [event.date];
      renderSelectEventScreen();
    };
    li.addEventListener("click", select);
    li.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        select();
      }
    });

    ul.appendChild(li);
  });

  listEl.appendChild(ul);

  document.getElementById("select-event-continue").disabled = state.selectedEvents.length === 0;
}

document.getElementById("select-event-continue").addEventListener("click", () => {
  if (state.selectedEvents.length === 0) return;
  state.plan = "single";
  showScreen("approved");
  renderPlanCard();
});

document.getElementById("select-event-monthly-link").addEventListener("click", (e) => {
  e.preventDefault();
  state.plan = "monthly";
  state.selectedEvents = [];
  showScreen("approved");
  renderPlanCard();
});

document.getElementById("select-event-founding-link").addEventListener("click", (e) => {
  e.preventDefault();
  state.plan = "founding";
  state.selectedEvents = [];
  showScreen("approved");
  renderPlanCard();
});

document.getElementById("select-event-back-btn").addEventListener("click", () => {
  prefillContact();
  showScreen("contact");
});

// Lets someone recheck/change their picked date from the payment screen
// without starting the whole application over — jumps straight back to
// select-event (preserving whatever's already in state.selectedEvents).
document.getElementById("approved-back-btn").addEventListener("click", () => {
  renderSelectEventScreen();
  showScreen("select-event");
});

// ---------------------------------------------------------------------------
// Plan toggle — Single Event Pass (one date, picked on the select-event
// screen), Grounds Pass (the monthly membership — a manually-tracked month
// of access, no recurring billing), or a Founding Member lifetime pass
// (limited to CONFIG.foundingMemberSpotsTotal — see that comment for how
// spots are tracked), on the approved/payment screen. Swaps the displayed
// price, its QR code (each amount needs its own Pix QR), and the WhatsApp
// payment-proof message so it's clear which plan was paid for.
//
// Payment-method toggle — Pix, PayPal, or Wise, alongside the plan toggle.
// Pix and Wise each show a QR (scan to pay, exact amount baked in) plus a
// copyable fallback value; PayPal shows a single tappable button instead,
// since paypal.me links are meant to be tapped on the same phone rather
// than scanned (no fixed-amount QR was set up for it).
// ---------------------------------------------------------------------------
const planPrices = { single: CONFIG.price, monthly: CONFIG.monthlyMembershipPrice, founding: CONFIG.foundingMemberPrice };
const planPricesGBP = {
  single: `£${CONFIG.gbpAmount.single}`,
  monthly: `£${CONFIG.gbpAmount.monthly}`,
  founding: `£${CONFIG.gbpAmount.founding}`,
};
const planQrImages = {
  single: "assets/pix-qr.png",
  monthly: "assets/pix-qr-monthly.png",
  founding: "assets/pix-qr-founding.png",
};
const wiseQrImages = {
  single: "assets/wise-qr.png",
  monthly: "assets/wise-qr-monthly.png",
  founding: "assets/wise-qr-founding.png",
};

// Referral-discount QR codes — swapped in for Single Event Pass only, when
// state.contact.referredBy is set. See CONFIG.referralPrice for context.
const referralPixQr = "assets/pix-qr-referral.png";
const referralWiseQr = "assets/wise-qr-referral.png";

function isReferralDiscountActive() {
  return state.plan === "single" && !!state.contact.referredBy;
}

function externalPayUrl(method, plan) {
  const amount = isReferralDiscountActive() ? CONFIG.gbpAmount.referral : CONFIG.gbpAmount[plan];
  if (method === "paypal") return `${CONFIG.paypalLink}/${amount}GBP`;
  return "#";
}

function renderPlanCard() {
  document.getElementById("plan-btn-single").classList.toggle("is-active", state.plan === "single");
  document.getElementById("plan-btn-monthly").classList.toggle("is-active", state.plan === "monthly");
  document.getElementById("plan-btn-founding").classList.toggle("is-active", state.plan === "founding");

  document.getElementById("payment-btn-pix").classList.toggle("is-active", state.paymentMethod === "pix");
  document.getElementById("payment-btn-paypal").classList.toggle("is-active", state.paymentMethod === "paypal");
  document.getElementById("payment-btn-wise").classList.toggle("is-active", state.paymentMethod === "wise");

  const isPix = state.paymentMethod === "pix";
  const referralActive = isReferralDiscountActive();
  document.getElementById("approved-price-label").textContent = t(`approved.plans.${state.plan}.label`);
  document.getElementById("approved-price").textContent = referralActive
    ? (isPix ? CONFIG.referralPrice : `£${CONFIG.gbpAmount.referral}`)
    : (isPix ? planPrices[state.plan] : planPricesGBP[state.plan]);
  document.getElementById("approved-price-unit").textContent = t(`approved.plans.${state.plan}.unit`);

  // Show the actual date picked on the select-event screen in place of the
  // generic plan description, for Single Event Pass only — the Grounds
  // Pass and Founding Member links both skip that screen, so they never
  // carry a date, and switching plan tabs manually after picking one
  // (e.g. to Founding Member) correctly falls back to the generic copy.
  const datesLabel = state.plan === "single" ? formatSelectedDatesForSub() : null;
  document.getElementById("approved-price-sub").textContent = datesLabel
    ? t("selectEvent.selectedDatesLabel").replace("{dates}", datesLabel)
    : t(`approved.plans.${state.plan}.sub`);

  const badge = document.getElementById("plan-badge");
  const badgeText = referralActive
    ? t("approved.referralBadge").replace("{name}", state.contact.referredBy)
    : t(`approved.plans.${state.plan}.badge`);
  if (badgeText) {
    badge.textContent = badgeText
      .replace("{remaining}", CONFIG.foundingMemberSpotsRemaining)
      .replace("{total}", CONFIG.foundingMemberSpotsTotal);
    badge.hidden = false;
  } else {
    badge.hidden = true;
  }

  document.getElementById("pix-card").hidden = state.paymentMethod !== "pix";
  document.getElementById("external-pay-card").hidden = state.paymentMethod !== "paypal";
  document.getElementById("wise-card").hidden = state.paymentMethod !== "wise";
  document.getElementById("pix-qr").src = referralActive ? referralPixQr : planQrImages[state.plan];
  document.getElementById("wise-qr").src = referralActive ? referralWiseQr : wiseQrImages[state.plan];

  if (state.paymentMethod === "paypal") {
    const methodLabel = t(`approved.paymentMethods.${state.paymentMethod}`);
    const externalBtn = document.getElementById("external-pay-btn");
    externalBtn.href = externalPayUrl(state.paymentMethod, state.plan);
    externalBtn.textContent = t("approved.externalPayBtn").replace("{method}", methodLabel);
  }

  renderWhatsappBtn();
}

document.querySelectorAll(".plan-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    state.plan = btn.dataset.plan;
    renderPlanCard();
  });
});

document.querySelectorAll(".payment-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    state.paymentMethod = btn.dataset.method;
    renderPlanCard();
  });
});

// ---------------------------------------------------------------------------
// Landing page stat row — each number fluctuates between its start value and
// target on a loop once it scrolls into view (up, hold, back down, repeat),
// as an ongoing visual hook rather than a one-shot count-up.
// ---------------------------------------------------------------------------
function animateNumber(el, from, to, prefix, suffix, duration, onDone) {
  const startTime = performance.now();
  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(from + eased * (to - from));
    el.textContent = prefix + value + suffix;
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else if (onDone) {
      onDone();
    }
  }
  requestAnimationFrame(tick);
}

function loopStat(el) {
  const target = Number(el.dataset.target);
  const from = el.dataset.start ? Number(el.dataset.start) : 0;
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";
  const holdMs = 3600;

  function cycle() {
    animateNumber(el, from, target, prefix, suffix, 3000, () => {
      setTimeout(() => {
        animateNumber(el, target, from, prefix, suffix, 2000, () => {
          setTimeout(cycle, 400);
        });
      }, holdMs);
    });
  }
  cycle();
}

if ("IntersectionObserver" in window) {
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      loopStat(entry.target);
      statObserver.unobserve(entry.target);
    });
  }, { threshold: 0.4 });

  document.querySelectorAll(".stat-number").forEach((el) => statObserver.observe(el));
} else {
  // No IntersectionObserver support — just show the final numbers.
  document.querySelectorAll(".stat-number").forEach((el) => {
    el.textContent = (el.dataset.prefix || "") + el.dataset.target + (el.dataset.suffix || "");
  });
}

// menu.html/events.html are separate pages with no shared JS state, so the
// chosen language is carried across via a "?lang=" URL param on the way
// there — and read back on the way back, so the round trip stays in sync.
function renderMenuLinks() {
  document.querySelectorAll("[data-menu-link]").forEach((a) => {
    a.href = `menu.html?lang=${state.lang}`;
  });
  document.querySelectorAll("[data-events-link]").forEach((a) => {
    a.href = `events.html?lang=${state.lang}`;
  });
}

function applyLang(lang) {
  state.lang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const val = t(el.dataset.i18n);
    if (val !== undefined) el.textContent = val;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const val = t(el.dataset.i18nPlaceholder);
    if (val !== undefined) el.placeholder = val;
  });
  document.querySelectorAll(".lang-switch-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  renderLandingPerksHeading();
  renderLandingSingleHeading();
  renderNextEventStat();
  renderReferralSection();
  renderApprovedFinePrint();
  renderPlanCard();
  renderMenuLinks();
}

document.querySelectorAll(".lang-switch-btn").forEach((btn) => {
  btn.addEventListener("click", () => applyLang(btn.dataset.lang));
});

// Default to English, unless we're arriving back from menu.html with its
// "?lang=" param set (so following its "back" link doesn't reset to English).
const urlLang = new URLSearchParams(window.location.search).get("lang");
applyLang(["en", "pt", "es"].includes(urlLang) ? urlLang : "en");

// ---------------------------------------------------------------------------
// Landing
// ---------------------------------------------------------------------------
document.getElementById("pix-key-value").textContent = CONFIG.pixKey;
document.getElementById("wise-tag-value").textContent = CONFIG.wiseTag;
document.getElementById("plan-price-single").textContent = CONFIG.price;
document.getElementById("plan-price-monthly").textContent = CONFIG.monthlyMembershipPrice;
document.getElementById("plan-price-founding").textContent = CONFIG.foundingMemberPrice;
document.getElementById("community-link").href = CONFIG.standardGroupLink;
document.getElementById("approved-community-link").href = CONFIG.standardGroupLink;

document.getElementById("start-btn").addEventListener("click", () => {
  state.questionIndex = 0;
  renderQuestion();
  showScreen("question");
});

// Wordmark in the header links back to the landing screen — a full page
// navigation would work too, but this avoids the reload/flash since we're
// already on this same page.
document.getElementById("logo-link").addEventListener("click", (e) => {
  e.preventDefault();
  showScreen("landing");
});

// ---------------------------------------------------------------------------
// Questions
// ---------------------------------------------------------------------------
const qBackBtn = document.getElementById("q-back-btn");
const progressEl = document.getElementById("progress");
const qCountEl = document.getElementById("q-count");
const questionTextEl = document.getElementById("question-text");
const qHintEl = document.getElementById("q-hint");
const optionsEl = document.getElementById("options");
const multiAnswerEl = document.getElementById("multi-answer");
const multiAnswerError = document.getElementById("multi-answer-error");
const multiAnswerContinue = document.getElementById("multi-answer-continue");
const textAnswerEl = document.getElementById("text-answer");
const textAnswerInput = document.getElementById("text-answer-input");
const textAnswerError = document.getElementById("text-answer-error");
const textAnswerContinue = document.getElementById("text-answer-continue");
const writeInEl = document.getElementById("write-in-answer");
const writeInInput = document.getElementById("write-in-input");
const writeInError = document.getElementById("write-in-error");
const writeInContinue = document.getElementById("write-in-continue");

function renderProgress() {
  progressEl.innerHTML = "";
  CONFIG.questions.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot" + (i <= state.questionIndex ? " filled" : "");
    progressEl.appendChild(dot);
  });
}

function renderQuestion() {
  const q = CONFIG.questions[state.questionIndex];
  const prev = state.answers[state.questionIndex]; // restore on back-navigation
  renderProgress();
  qCountEl.textContent = t("question.countTemplate")
    .replace("{current}", state.questionIndex + 1)
    .replace("{total}", CONFIG.questions.length);
  questionTextEl.textContent = q.text[state.lang];

  const hintText = q.hint ? q.hint[state.lang] : "";
  qHintEl.textContent = hintText;
  qHintEl.hidden = !hintText;

  writeInEl.hidden = true;
  writeInError.hidden = true;

  if (q.type === "text" || q.type === "textarea") {
    optionsEl.hidden = true;
    optionsEl.innerHTML = "";
    multiAnswerEl.hidden = true;
    textAnswerEl.hidden = false;
    textAnswerInput.value = prev ? prev.answer : "";
    textAnswerInput.placeholder = (q.placeholder && q.placeholder[state.lang]) || "";
    textAnswerInput.rows = q.type === "text" ? 1 : 4;
    textAnswerInput.classList.toggle("short", q.type === "text");
    textAnswerError.hidden = true;
    textAnswerInput.focus();
  } else if (q.type === "multi") {
    textAnswerEl.hidden = true;
    optionsEl.hidden = false;
    optionsEl.innerHTML = "";
    q.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn";
      btn.dataset.optEn = opt.en;
      if (prev && Array.isArray(prev.answerEn) && prev.answerEn.includes(opt.en)) {
        btn.classList.add("selected");
      }
      btn.textContent = opt[state.lang];
      btn.addEventListener("click", () => {
        btn.classList.toggle("selected");
        multiAnswerError.hidden = true;
      });
      optionsEl.appendChild(btn);
    });
    multiAnswerError.hidden = true;
    multiAnswerEl.hidden = false;
  } else {
    textAnswerEl.hidden = true;
    multiAnswerEl.hidden = true;
    optionsEl.hidden = false;
    optionsEl.innerHTML = "";
    q.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn";
      btn.dataset.optEn = opt.en;
      const isWriteInOption = q.writeIn && opt.en === q.writeIn;
      if (prev && (prev.answerEn === opt.en || (isWriteInOption && prev.writeInText !== undefined))) {
        btn.classList.add("selected");
      }
      btn.textContent = opt[state.lang];
      btn.addEventListener("click", () => {
        if (isWriteInOption) {
          btn.classList.add("selected");
          // Don't clobber in-progress typing if it's already open.
          if (writeInEl.hidden) {
            openWriteIn(prev && prev.writeInText !== undefined ? prev.writeInText : "");
          } else {
            writeInInput.focus();
          }
        } else {
          writeInEl.hidden = true;
          selectOption(opt);
        }
      });
      optionsEl.appendChild(btn);
    });

    if (q.writeIn && prev && prev.writeInText !== undefined) {
      openWriteIn(prev.writeInText);
    }
  }
}

function openWriteIn(initialText) {
  const q = CONFIG.questions[state.questionIndex];
  writeInEl.hidden = false;
  writeInInput.value = initialText || "";
  writeInInput.placeholder = (q.writeInPlaceholder && q.writeInPlaceholder[state.lang]) || t("question.writeInDefaultPlaceholder");
  writeInError.hidden = true;
  writeInInput.focus();
}

function submitWriteIn() {
  const q = CONFIG.questions[state.questionIndex];
  const text = writeInInput.value.trim();
  if (!text) {
    writeInError.textContent = t("question.writeInError");
    writeInError.hidden = false;
    writeInInput.focus();
    return;
  }
  writeInError.hidden = true;

  const writeInOption = q.options.find((o) => o.en === q.writeIn);

  state.answers[state.questionIndex] = {
    question: q.text[state.lang],
    answer: `${writeInOption[state.lang]}: ${text}`,
    writeInText: text,
  };

  advanceQuestion();
}

writeInContinue.addEventListener("click", submitWriteIn);

writeInInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    submitWriteIn();
  }
});

function goToPreviousQuestion() {
  if (state.questionIndex > 0) {
    state.questionIndex -= 1;
    renderQuestion();
  } else {
    showScreen("landing");
  }
}

qBackBtn.addEventListener("click", goToPreviousQuestion);

function advanceQuestion() {
  if (state.questionIndex < CONFIG.questions.length - 1) {
    state.questionIndex += 1;
    renderQuestion();
  } else {
    prefillContact();
    showScreen("contact");
  }
}

function selectOption(opt) {
  // brief selected-state flash so the tap feels acknowledged
  Array.from(optionsEl.children).forEach((btn) => {
    btn.classList.toggle("selected", btn.dataset.optEn === opt.en);
    btn.disabled = true;
  });

  const q = CONFIG.questions[state.questionIndex];
  state.answers[state.questionIndex] = {
    question: q.text[state.lang],
    answer: opt[state.lang],
    answerEn: opt.en,
  };

  setTimeout(advanceQuestion, 320);
}

function submitTextAnswer() {
  const answer = textAnswerInput.value.trim();
  if (!answer) {
    textAnswerError.textContent = t("question.textError");
    textAnswerError.hidden = false;
    textAnswerInput.focus();
    return;
  }
  textAnswerError.hidden = true;

  const q = CONFIG.questions[state.questionIndex];
  state.answers[state.questionIndex] = {
    question: q.text[state.lang],
    answer,
  };

  advanceQuestion();
}

function submitMultiAnswer() {
  const selectedEls = Array.from(optionsEl.children).filter((btn) => btn.classList.contains("selected"));

  if (selectedEls.length === 0) {
    multiAnswerError.textContent = t("question.multiError");
    multiAnswerError.hidden = false;
    return;
  }
  multiAnswerError.hidden = true;

  const q = CONFIG.questions[state.questionIndex];
  state.answers[state.questionIndex] = {
    question: q.text[state.lang],
    answer: selectedEls.map((btn) => btn.textContent),
    answerEn: selectedEls.map((btn) => btn.dataset.optEn),
  };

  advanceQuestion();
}

multiAnswerContinue.addEventListener("click", submitMultiAnswer);

textAnswerContinue.addEventListener("click", submitTextAnswer);

textAnswerInput.addEventListener("keydown", (e) => {
  // Single-line "text" questions submit on Enter; textareas keep Enter as a newline.
  if (e.key === "Enter" && !e.shiftKey && textAnswerInput.classList.contains("short")) {
    e.preventDefault();
    submitTextAnswer();
  }
});

// ---------------------------------------------------------------------------
// Contact form
// ---------------------------------------------------------------------------
const contactForm = document.getElementById("contact-form");
const contactError = document.getElementById("contact-error");

function prefillContact() {
  contactForm.whatsapp.value = state.contact.whatsapp || "";
  contactForm.instagram.value = state.contact.instagram || "";
  contactForm.referredBy.value = state.contact.referredBy || "";
}

document.getElementById("contact-back-btn").addEventListener("click", () => {
  // Save whatever's been typed so it's still there if they come back forward.
  state.contact = {
    whatsapp: contactForm.whatsapp.value.trim(),
    instagram: contactForm.instagram.value.trim(),
    referredBy: contactForm.referredBy.value.trim(),
  };
  state.questionIndex = CONFIG.questions.length - 1;
  renderQuestion();
  showScreen("question");
});

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(contactForm);
  const whatsapp = (data.get("whatsapp") || "").toString().trim();
  const instagram = (data.get("instagram") || "").toString().trim();
  const referredBy = (data.get("referredBy") || "").toString().trim();

  if (!whatsapp) {
    contactError.textContent = t("contact.error");
    contactError.hidden = false;
    return;
  }
  contactError.hidden = true;

  state.contact = { whatsapp, instagram, referredBy };
  showScreen("reviewing");
  runReviewSequence();
});

// ---------------------------------------------------------------------------
// Brief transition sequence — describes the actual submit happening
// underneath, rather than implying a human review that isn't taking place
// ---------------------------------------------------------------------------
const reviewingText = document.getElementById("reviewing-text");

function runReviewSequence() {
  const messages = t("reviewing.messages");
  let step = 0;
  reviewingText.textContent = messages[0];
  const interval = setInterval(() => {
    step += 1;
    if (step < messages.length) {
      reviewingText.textContent = messages[step];
    }
  }, 850);

  submitApplication();

  setTimeout(() => {
    clearInterval(interval);
    renderSelectEventScreen();
    showScreen("select-event");
  }, messages.length * 850 + 250);
}

// ---------------------------------------------------------------------------
// Save the application (remote endpoint + local backup)
// ---------------------------------------------------------------------------
function submitApplication() {
  const payload = {
    submittedAt: new Date().toISOString(),
    language: state.lang,
    ...state.contact,
    answers: state.answers,
  };

  // Surface any keyed question (e.g. name) as its own top-level field too,
  // so it's readable at a glance alongside the full Q&A list above.
  CONFIG.questions.forEach((q, i) => {
    if (q.key && state.answers[i]) {
      payload[q.key] = state.answers[i].answer;
    }
  });

  // Local backup so nothing is lost even without a remote endpoint configured.
  try {
    const key = "commonground-applications";
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.push(payload);
    localStorage.setItem(key, JSON.stringify(existing));
  } catch (err) {
    // localStorage can fail in private browsing / storage-full states — non-fatal.
  }

  if (!CONFIG.formEndpoint) return;

  fetch(CONFIG.formEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {
    // Never block the applicant's flow on a network/save failure.
  });
}

// ---------------------------------------------------------------------------
// Payment — Pix key / Wise tag copy buttons + WhatsApp payment proof
// (whatsappBtn itself is declared earlier, alongside applyLang())
// ---------------------------------------------------------------------------
function wireCopyButton(buttonId, value) {
  const btn = document.getElementById(buttonId);
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (err) {
      // Clipboard API can be unavailable (e.g. insecure context) — fall back silently,
      // the value is still selectable/copyable by hand from the page.
    }
    btn.textContent = t("approved.copied");
    btn.classList.add("copied");
    setTimeout(() => {
      btn.textContent = t("approved.copy");
      btn.classList.remove("copied");
    }, 1600);
  });
}

wireCopyButton("copy-pix-btn", CONFIG.pixKey);
wireCopyButton("copy-wise-btn", CONFIG.wiseTag);

// ---------------------------------------------------------------------------
// Direct link to the payment screen for approved applicants — send someone
// "yoursite.com/#approved" (e.g. on WhatsApp, using the number they gave you)
// once you've reviewed their application, and it opens straight to the
// Pix/WhatsApp screen, skipping the whole questionnaire. Shows in English
// (the default language), since this path never touches the landing screen's
// flag switcher.
// ---------------------------------------------------------------------------
if (window.location.hash === "#approved") {
  showScreen("approved");
}
