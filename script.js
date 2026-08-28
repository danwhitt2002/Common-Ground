// ---------------------------------------------------------------------------
// CONFIG — everything you need to customize lives here.
// ---------------------------------------------------------------------------
const CONFIG = {
  price: "R$120",

  // Your Pix key (shown as text, and encoded into assets/pix-qr.png).
  // If you ever change the key or amount, regenerate that QR image to match.
  pixKey: "danwhitt2002@gmail.com",

  // WhatsApp number applicants send payment proof to, digits only with
  // country code, no "+", spaces, or leading 0 (e.g. UK 07830 067043 -> 447830067043).
  whatsappNumber: "447830067043",

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
        { en: "💼 I moved here for work", pt: "💼 Me mudei para cá a trabalho", es: "💼 Me mudé aquí por trabajo" },
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
      lede: "Find your common ground — weekly meetups, international circle, functional mocktails included every time. Membership is by application only.",
      apply: "Apply for Your Grounds Pass",
      finePrint: "Takes about a minute. {price} if approved.",
      menuLink: "See what's included — the drinks menu →",
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
      optional: "(optional)",
      submit: "Submit Application",
      error: "Please fill in your WhatsApp number.",
    },
    reviewing: {
      messages: [
        "Reviewing your application…",
        "Checking group fit…",
        "Submitting your application…",
      ],
    },
    pending: {
      eyebrow: "Application Received",
      heading: "Thank You",
      lede: "Your application is being reviewed. If you're a good fit, we'll message you on WhatsApp soon with your invitation and payment details.",
      menuLink: "See what's included — the drinks menu →",
      finePrint: "Questions in the meantime? DM us on Instagram {handle}.",
    },
    approved: {
      eyebrow: "Application Approved",
      heading: "Welcome to Common Ground.",
      lede: "You're in. Lock in your spot with your Grounds Pass — access to every weekly event, with coffee & matcha‑based mocktails included.",
      priceLabel: "Grounds Pass",
      priceSub: "Weekly events · coffee & matcha mocktails included",
      pixScanHint: "Scan with your bank app, or copy the Pix key below",
      pixKeyLabel: "Pix key (email)",
      copy: "Copy",
      copied: "Copied",
      whatsappBtn: "Send Payment Proof on WhatsApp",
      menuLink: "See the drinks menu →",
      finePrint: "Pay via Pix, then send your receipt on WhatsApp to lock in your spot. Questions? DM us on Instagram {handle}.",
    },
    whatsappMessage: "Hi! Here's my payment proof for my Common Ground Grounds Pass:",
  },
  pt: {
    landing: {
      eyebrow: "Rio de Janeiro · Inscrições Abertas",
      lede: "Encontre seu common ground — encontros semanais, um círculo internacional, mocktails funcionais incluídos sempre. A associação é somente por inscrição.",
      apply: "Inscreva-se para o seu Grounds Pass",
      finePrint: "Leva cerca de um minuto. {price} se aprovado(a).",
      menuLink: "Veja o que está incluído — o cardápio de bebidas →",
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
      optional: "(opcional)",
      submit: "Enviar Inscrição",
      error: "Preencha seu número de WhatsApp.",
    },
    reviewing: {
      messages: [
        "Analisando sua inscrição…",
        "Verificando se combina com o grupo…",
        "Enviando sua inscrição…",
      ],
    },
    pending: {
      eyebrow: "Inscrição Recebida",
      heading: "Obrigado(a)!",
      lede: "Sua inscrição está sendo analisada. Se for um bom encaixe, mandaremos uma mensagem no WhatsApp em breve com seu convite e os detalhes do pagamento.",
      menuLink: "Veja o que está incluído — o cardápio de bebidas →",
      finePrint: "Dúvidas enquanto isso? Chame no Instagram {handle}.",
    },
    approved: {
      eyebrow: "Inscrição Aprovada",
      heading: "Bem-vindo(a) à Common Ground.",
      lede: "Você entrou. Garanta sua vaga com o seu Grounds Pass — acesso a todos os encontros semanais, com mocktails de café e matchá incluídos.",
      priceLabel: "Grounds Pass",
      priceSub: "Encontros semanais · mocktails de café e matchá incluídos",
      pixScanHint: "Escaneie com o app do seu banco, ou copie a chave Pix abaixo",
      pixKeyLabel: "Chave Pix (e-mail)",
      copy: "Copiar",
      copied: "Copiado",
      whatsappBtn: "Enviar Comprovante no WhatsApp",
      menuLink: "Veja o cardápio de bebidas →",
      finePrint: "Pague via Pix e depois envie seu comprovante no WhatsApp para garantir sua vaga. Dúvidas? Chame no Instagram {handle}.",
    },
    whatsappMessage: "Oi! Aqui está o comprovante de pagamento do meu Grounds Pass da Common Ground:",
  },
  es: {
    landing: {
      eyebrow: "Río de Janeiro · Inscripciones Abiertas",
      lede: "Encuentra tu common ground — encuentros semanales, un círculo internacional, mocktails funcionales incluidos siempre. La membresía es solo por solicitud.",
      apply: "Solicita tu Grounds Pass",
      finePrint: "Toma cerca de un minuto. {price} si eres aprobado/a.",
      menuLink: "Mira qué está incluido — el menú de bebidas →",
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
      optional: "(opcional)",
      submit: "Enviar Solicitud",
      error: "Completa tu número de WhatsApp.",
    },
    reviewing: {
      messages: [
        "Revisando tu solicitud…",
        "Verificando que encajes con el grupo…",
        "Enviando tu solicitud…",
      ],
    },
    pending: {
      eyebrow: "Solicitud Recibida",
      heading: "¡Gracias!",
      lede: "Tu solicitud está siendo revisada. Si encajas bien, te escribiremos pronto por WhatsApp con tu invitación y los detalles de pago.",
      menuLink: "Mira qué está incluido — el menú de bebidas →",
      finePrint: "¿Dudas mientras tanto? Escríbenos por Instagram {handle}.",
    },
    approved: {
      eyebrow: "Solicitud Aprobada",
      heading: "Bienvenido/a a Common Ground.",
      lede: "Ya estás dentro. Asegura tu lugar con tu Grounds Pass — acceso a todos los encuentros semanales, con mocktails de café y matcha incluidos.",
      priceLabel: "Grounds Pass",
      priceSub: "Encuentros semanales · mocktails de café y matcha incluidos",
      pixScanHint: "Escanea con la app de tu banco, o copia la clave Pix abajo",
      pixKeyLabel: "Clave Pix (correo)",
      copy: "Copiar",
      copied: "Copiado",
      whatsappBtn: "Enviar Comprobante por WhatsApp",
      menuLink: "Mira el menú de bebidas →",
      finePrint: "Paga por Pix y luego envía tu comprobante por WhatsApp para asegurar tu lugar. ¿Dudas? Escríbenos por Instagram {handle}.",
    },
    whatsappMessage: "¡Hola! Aquí está mi comprobante de pago de mi Grounds Pass de Common Ground:",
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
  screen: "landing", // landing | question | contact | reviewing | approved
  lang: "en", // "en" | "pt" | "es" — switched via the flag buttons on landing
  questionIndex: 0,
  answers: [], // { question, answer, answerEn?, writeInText? }
  contact: {},
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
function renderLandingFinePrint() {
  document.getElementById("landing-fine-print").textContent = t("landing.finePrint").replace("{price}", CONFIG.price);
}

function renderPendingFinePrint() {
  document.getElementById("pending-fine-print").textContent = t("pending.finePrint").replace("{handle}", CONFIG.instagramHandle);
}

function renderApprovedFinePrint() {
  document.getElementById("approved-fine-print").textContent = t("approved.finePrint").replace("{handle}", CONFIG.instagramHandle);
}

function renderWhatsappBtn() {
  whatsappBtn.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(t("whatsappMessage"))}`;
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

  renderLandingFinePrint();
  renderPendingFinePrint();
  renderApprovedFinePrint();
  renderWhatsappBtn();
}

document.querySelectorAll(".lang-switch-btn").forEach((btn) => {
  btn.addEventListener("click", () => applyLang(btn.dataset.lang));
});

applyLang("en"); // default on load; the flag buttons switch it from here

// ---------------------------------------------------------------------------
// Landing
// ---------------------------------------------------------------------------
document.getElementById("approved-price").textContent = CONFIG.price;
document.getElementById("pix-key-value").textContent = CONFIG.pixKey;

document.getElementById("start-btn").addEventListener("click", () => {
  state.questionIndex = 0;
  renderQuestion();
  showScreen("question");
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
}

document.getElementById("contact-back-btn").addEventListener("click", () => {
  // Save whatever's been typed so it's still there if they come back forward.
  state.contact = {
    whatsapp: contactForm.whatsapp.value.trim(),
    instagram: contactForm.instagram.value.trim(),
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

  if (!whatsapp) {
    contactError.textContent = t("contact.error");
    contactError.hidden = false;
    return;
  }
  contactError.hidden = true;

  state.contact = { whatsapp, instagram };
  showScreen("reviewing");
  runReviewSequence();
});

// ---------------------------------------------------------------------------
// "Reviewing" sequence — builds the curated-application feel, then submits
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
    showScreen("pending");
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
// Payment — Pix key + WhatsApp payment proof
// (whatsappBtn itself is declared earlier, alongside applyLang())
// ---------------------------------------------------------------------------
const copyPixBtn = document.getElementById("copy-pix-btn");
copyPixBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(CONFIG.pixKey);
  } catch (err) {
    // Clipboard API can be unavailable (e.g. insecure context) — fall back silently,
    // the key is still selectable/copyable by hand from the page.
  }
  copyPixBtn.textContent = t("approved.copied");
  copyPixBtn.classList.add("copied");
  setTimeout(() => {
    copyPixBtn.textContent = t("approved.copy");
    copyPixBtn.classList.remove("copied");
  }, 1600);
});

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
