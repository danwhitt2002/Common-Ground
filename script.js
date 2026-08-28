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
  whatsappMessage: "Hi! Here's my payment proof for my Common Ground Grounds Pass:",

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
  // longer answer). An optional `key` surfaces that answer as its own field
  // in the saved application (in addition to the full `answers` list), which
  // is handy for a question like name/email you want to read at a glance.
  questions: [
    {
      text: "What is your full name?",
      type: "text",
      key: "name",
      placeholder: "Your full name",
    },
    {
      text: "What's your age?",
      type: "choice",
      key: "age",
      options: ["18–22", "23–27", "28–34", "35–39", "40+"],
    },
    {
      text: "What brings you to Rio?",
      type: "choice",
      key: "reason",
      // Selecting this exact option opens a text box asking them to specify —
      // see `writeIn`/`openWriteIn()` below.
      writeIn: "✨ Something else",
      writeInPlaceholder: "Tell us what brought you here",
      options: [
        "🏖️ I'm from Rio (Carioca)",
        "💼 I moved here for work",
        "❤️ I moved here for a partner",
        "🎒 I'm travelling / backpacking",
        "🎓 I'm studying here",
        "✨ Something else",
      ],
    },
    {
      text: "Why do you want to join Common Ground?",
      type: "multi",
      key: "motivation",
      hint: "Choose one or more",
      options: [
        "☕ Discover cool new places/cafes in Rio",
        "🤝 Meet new people",
        "🌍 Build a more international social circle",
        "💪 Put myself out of my comfort zone",
        "🌱 Try new things",
      ],
    },
    {
      text: "Who are you hoping to meet through Common Ground?",
      type: "multi",
      key: "lookingFor",
      hint: "Choose one or more",
      options: [
        "🏖️ Cariocas/locals",
        "💻 Digital nomads",
        "💕 Romantic connections",
        "🎒 Backpackers",
        "💡 Founders/entrepreneurs",
        "🤗 I'm open to meeting anyone",
      ],
    },
    {
      text: "Tell us about yourself",
      type: "textarea",
      key: "aboutYou",
      placeholder: "Describe yourself in a few sentences.",
    },
  ],
};

// ---------------------------------------------------------------------------
// State machine
// ---------------------------------------------------------------------------
const state = {
  screen: "landing", // landing | question | contact | reviewing | approved
  questionIndex: 0,
  answers: [], // { question, answer }
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

// ---------------------------------------------------------------------------
// Landing
// ---------------------------------------------------------------------------
document.getElementById("landing-price").textContent = CONFIG.price;
document.getElementById("approved-price").textContent = CONFIG.price;
document.getElementById("ig-handle").textContent = CONFIG.instagramHandle;
document.getElementById("ig-handle-pending").textContent = CONFIG.instagramHandle;

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
  qCountEl.textContent = `Question ${state.questionIndex + 1} of ${CONFIG.questions.length}`;
  questionTextEl.textContent = q.text;

  qHintEl.textContent = q.hint || "";
  qHintEl.hidden = !q.hint;

  writeInEl.hidden = true;
  writeInError.hidden = true;

  if (q.type === "text" || q.type === "textarea") {
    optionsEl.hidden = true;
    optionsEl.innerHTML = "";
    multiAnswerEl.hidden = true;
    textAnswerEl.hidden = false;
    textAnswerInput.value = prev ? prev.answer : "";
    textAnswerInput.placeholder = q.placeholder || "";
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
      if (prev && Array.isArray(prev.answer) && prev.answer.includes(opt)) {
        btn.classList.add("selected");
      }
      btn.textContent = opt;
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
      const isWriteInOption = q.writeIn && opt === q.writeIn;
      if (prev && (prev.answer === opt || (isWriteInOption && prev.writeInText !== undefined))) {
        btn.classList.add("selected");
      }
      btn.textContent = opt;
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
  writeInInput.placeholder = q.writeInPlaceholder || "Tell us more...";
  writeInError.hidden = true;
  writeInInput.focus();
}

function submitWriteIn() {
  const q = CONFIG.questions[state.questionIndex];
  const text = writeInInput.value.trim();
  if (!text) {
    writeInError.textContent = "Please tell us a bit more.";
    writeInError.hidden = false;
    writeInInput.focus();
    return;
  }
  writeInError.hidden = true;

  state.answers[state.questionIndex] = {
    question: q.text,
    answer: `${q.writeIn}: ${text}`,
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

function selectOption(answer) {
  // brief selected-state flash so the tap feels acknowledged
  Array.from(optionsEl.children).forEach((btn) => {
    btn.classList.toggle("selected", btn.textContent === answer);
    btn.disabled = true;
  });

  state.answers[state.questionIndex] = {
    question: CONFIG.questions[state.questionIndex].text,
    answer,
  };

  setTimeout(advanceQuestion, 320);
}

function submitTextAnswer() {
  const answer = textAnswerInput.value.trim();
  if (!answer) {
    textAnswerError.textContent = "Please answer to continue.";
    textAnswerError.hidden = false;
    textAnswerInput.focus();
    return;
  }
  textAnswerError.hidden = true;

  state.answers[state.questionIndex] = {
    question: CONFIG.questions[state.questionIndex].text,
    answer,
  };

  advanceQuestion();
}

function submitMultiAnswer() {
  const selected = Array.from(optionsEl.children)
    .filter((btn) => btn.classList.contains("selected"))
    .map((btn) => btn.textContent);

  if (selected.length === 0) {
    multiAnswerError.textContent = "Please choose at least one option.";
    multiAnswerError.hidden = false;
    return;
  }
  multiAnswerError.hidden = true;

  state.answers[state.questionIndex] = {
    question: CONFIG.questions[state.questionIndex].text,
    answer: selected,
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
    contactError.textContent = "Please fill in your WhatsApp number.";
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
const REVIEW_MESSAGES = [
  "Reviewing your application…",
  "Checking group fit…",
  "Submitting your application…",
];

function runReviewSequence() {
  let step = 0;
  reviewingText.textContent = REVIEW_MESSAGES[0];
  const interval = setInterval(() => {
    step += 1;
    if (step < REVIEW_MESSAGES.length) {
      reviewingText.textContent = REVIEW_MESSAGES[step];
    }
  }, 850);

  submitApplication();

  setTimeout(() => {
    clearInterval(interval);
    showScreen("pending");
  }, REVIEW_MESSAGES.length * 850 + 250);
}

// ---------------------------------------------------------------------------
// Save the application (remote endpoint + local backup)
// ---------------------------------------------------------------------------
function submitApplication() {
  const payload = {
    submittedAt: new Date().toISOString(),
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
// ---------------------------------------------------------------------------
document.getElementById("pix-key-value").textContent = CONFIG.pixKey;

const whatsappBtn = document.getElementById("whatsapp-btn");
whatsappBtn.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;

const copyPixBtn = document.getElementById("copy-pix-btn");
copyPixBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(CONFIG.pixKey);
  } catch (err) {
    // Clipboard API can be unavailable (e.g. insecure context) — fall back silently,
    // the key is still selectable/copyable by hand from the page.
  }
  copyPixBtn.textContent = "Copied";
  copyPixBtn.classList.add("copied");
  setTimeout(() => {
    copyPixBtn.textContent = "Copy";
    copyPixBtn.classList.remove("copied");
  }, 1600);
});

// ---------------------------------------------------------------------------
// Direct link to the payment screen for approved applicants — send someone
// "yoursite.com/#approved" (e.g. on WhatsApp, using the number they gave you)
// once you've reviewed their application, and it opens straight to the
// Pix/WhatsApp screen, skipping the whole questionnaire.
// ---------------------------------------------------------------------------
if (window.location.hash === "#approved") {
  showScreen("approved");
}
