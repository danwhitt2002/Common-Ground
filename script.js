// ---------------------------------------------------------------------------
// CONFIG — everything you need to customize lives here.
// ---------------------------------------------------------------------------
const CONFIG = {
  price: "R$120",

  // Paste your Stripe Payment Link here (Stripe Dashboard > Payment Links > +New).
  // Leave as-is and the button will show a setup reminder instead of charging anyone.
  stripeLink: "https://buy.stripe.com/REPLACE_WITH_YOUR_LINK",

  // Shown at the bottom of the "approved" screen. Update to your real handle.
  instagramHandle: "@commonground",

  // Where application answers get saved. Point this at a Formspree endpoint
  // (https://formspree.io — free tier, no backend needed) or any endpoint that
  // accepts a JSON POST. Leave blank to disable remote saving (answers still
  // get kept in the browser's localStorage as a local-only backup).
  //   Example: "https://formspree.io/f/abcdEFGH"
  formEndpoint: "https://formspree.io/f/mbgjrjnp",

  questions: [
    {
      text: "What are you actually looking for in a community?",
      options: [
        "Deep, real friendships",
        "Creative collaborators",
        "A reason to leave the house more",
        "Honestly, all of the above",
      ],
    },
    {
      text: "How do you usually show up to a room full of strangers?",
      options: [
        "I find the person standing alone",
        "I make an entrance",
        "I scope it out for a minute first",
        "I bring my people with me",
      ],
    },
    {
      text: "Pick your ideal Saturday.",
      options: [
        "Rooftop, golden hour",
        "Bookstore, then a wine bar",
        "Hosting everyone at my place",
        "Wherever the group ends up",
      ],
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

document.getElementById("start-btn").addEventListener("click", () => {
  state.questionIndex = 0;
  renderQuestion();
  showScreen("question");
});

// ---------------------------------------------------------------------------
// Questions
// ---------------------------------------------------------------------------
const progressEl = document.getElementById("progress");
const qCountEl = document.getElementById("q-count");
const questionTextEl = document.getElementById("question-text");
const optionsEl = document.getElementById("options");

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
  renderProgress();
  qCountEl.textContent = `Question ${state.questionIndex + 1} of ${CONFIG.questions.length}`;
  questionTextEl.textContent = q.text;
  optionsEl.innerHTML = "";

  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    btn.textContent = opt;
    btn.addEventListener("click", () => selectOption(opt));
    optionsEl.appendChild(btn);
  });
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

  setTimeout(() => {
    if (state.questionIndex < CONFIG.questions.length - 1) {
      state.questionIndex += 1;
      renderQuestion();
    } else {
      showScreen("contact");
    }
  }, 320);
}

// ---------------------------------------------------------------------------
// Contact form
// ---------------------------------------------------------------------------
const contactForm = document.getElementById("contact-form");
const contactError = document.getElementById("contact-error");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(contactForm);
  const firstName = (data.get("firstName") || "").toString().trim();
  const email = (data.get("email") || "").toString().trim();
  const instagram = (data.get("instagram") || "").toString().trim();

  if (!firstName || !email) {
    contactError.textContent = "Please fill in your name and email.";
    contactError.hidden = false;
    return;
  }
  contactError.hidden = true;

  state.contact = { firstName, email, instagram };
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
  "Finalizing decision…",
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
    showScreen("approved");
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
// Payment
// ---------------------------------------------------------------------------
const payBtn = document.getElementById("pay-btn");
if (CONFIG.stripeLink.includes("REPLACE_WITH_YOUR_LINK")) {
  payBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alert(
      "Set CONFIG.stripeLink in script.js to your real Stripe Payment Link before going live."
    );
  });
} else {
  payBtn.href = CONFIG.stripeLink;
}
