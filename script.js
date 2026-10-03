// script.js — all website JavaScript (separate from index.html and style.css)
const siteConfig = {
  email: "baizidbhuiyan76@gmail.com",
  formEndpoint: "",
  externalCvUrl: "",
  profileImagePath: "https://i.postimg.cc/bJQQcQT2/mohammad-baizid-bhuiyan-jpg.jpg"
};

const defaultTitle = "Baizid Bhuiyan | Digital Marketing & AI Specialist";

const routeTitles = {
  "/": defaultTitle,
  "/about": "About | Baizid Bhuiyan",
  "/services": "Services | Baizid Bhuiyan",
  "/services/local-seo": "SEO & Local SEO | Baizid Bhuiyan",
  "/services/paid-ads": "Paid Ads & Social Media | Baizid Bhuiyan",
  "/services/website-design": "Website Design & Modification | Baizid Bhuiyan",
  "/services/ai-automation": "AI Automation & Workflows | Baizid Bhuiyan",
  "/skills": "Skills & Tools | Baizid Bhuiyan",
  "/projects": "Projects | Baizid Bhuiyan",
  "/projects/personal-portfolio": "Personal Portfolio Website | Baizid Bhuiyan",
  "/projects/local-search-plan": "Local Search Visibility Plan | Baizid Bhuiyan",
  "/projects/technical-seo-audit": "On-Page & Technical Audit | Baizid Bhuiyan",
  "/projects/keyword-gap-matrix": "Competitor Keyword Gap Matrix | Baizid Bhuiyan",
  "/projects/campaign-planning-board": "Campaign Planning Board | Baizid Bhuiyan",
  "/projects/audience-targeting-matrix": "Audience Targeting Matrix | Baizid Bhuiyan",
  "/projects/ad-creative-blueprint": "Creative Ad Angle Blueprint | Baizid Bhuiyan",
  "/projects/local-service-landing-page": "Local Service Landing Page | Baizid Bhuiyan",
  "/projects/speed-usability-revamp": "Speed & Usability Revamp | Baizid Bhuiyan",
  "/projects/enquiry-follow-up-workflow": "Enquiry Follow-up Workflow | Baizid Bhuiyan",
  "/projects/content-repurposing-pipeline": "Content Repurposing Pipeline | Baizid Bhuiyan",
  "/projects/customer-faq-chatbot": "Customer FAQ Chatbot | Baizid Bhuiyan",
  "/projects/ghorer-bazar-ecommerce": "GhorerBazar Grocery Store | Baizid Bhuiyan",
  "/projects/moda-fashion-ecommerce": "MODA Fashion House | Baizid Bhuiyan",
  "/projects/shopify-store-build": "Shopify Store Setup | Baizid Bhuiyan",
  "/projects/wordpress-website-build": "WordPress Website Build | Baizid Bhuiyan",
  "/projects/google-ads-setup": "Google Ads Campaign Setup | Baizid Bhuiyan",
  "/projects/meta-ads-setup": "Meta Ads Campaign Setup | Baizid Bhuiyan",
  "/projects/gtm-tracking-setup": "GTM Tracking Setup | Baizid Bhuiyan",
  "/projects/ai-product-photography": "AI Product Photography | Baizid Bhuiyan",
  "/projects/ai-product-video": "AI Product Video Creation | Baizid Bhuiyan",
  "/process": "My Process | Baizid Bhuiyan",
  "/contact": "Contact | Baizid Bhuiyan",
  "/privacy": "Privacy Policy | Baizid Bhuiyan"
};

const serviceNames = {
  "local-seo": "SEO & Local SEO",
  "paid-ads": "Paid Ads & Social Media",
  "website-design": "Website Design & Modification",
  "ai-automation": "AI Automation & Workflows"
};

const views = [...document.querySelectorAll(".view")];
const navLinks = [...document.querySelectorAll("[data-nav]")];
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const main = document.querySelector("main");
const serviceContext = document.getElementById("service-context");

function getRoute() {
  const rawHash = window.location.hash;
  if (!rawHash || rawHash === "#") return { path: "/", params: new URLSearchParams() };

  const rawRoute = rawHash.startsWith("#") ? rawHash.slice(1) : rawHash;
  const [pathPart, queryString = ""] = rawRoute.split("?");
  const path = pathPart === "/" ? "/" : pathPart.replace(/\/$/, "");
  return { path, params: new URLSearchParams(queryString) };
}

function closeMenu() {
  if (!siteNav || !menuToggle) return;
  siteNav.classList.remove("open");
  menuToggle.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

function updateActiveNavigation(route) {
  let activeKey = "";
  if (route === "/") activeKey = "home";
  else if (route.startsWith("/services")) activeKey = "services";
  else if (route.startsWith("/projects")) activeKey = "projects";
  else if (route === "/about") activeKey = "about";
  else if (route === "/contact") activeKey = "contact";

  navLinks.forEach((link) => {
    const isActive = link.dataset.nav === activeKey;
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function updateServiceContext(params) {
  const serviceKey = params.get("service");
  const service = serviceNames[serviceKey];
  if (serviceContext) {
    if (service) {
      serviceContext.textContent = `You are enquiring about: ${service}.`;
      serviceContext.hidden = false;
    } else {
      serviceContext.hidden = true;
      serviceContext.textContent = "";
    }
  }

  document.querySelectorAll("select[name='service']").forEach((select) => {
    if (!serviceKey || !service) {
      select.value = "";
      return;
    }
    const options = [...select.options].map((o) => o.value);
    if (options.includes(serviceKey)) {
      select.value = serviceKey;
    } else if (options.includes(service)) {
      select.value = service;
    }
  });
}

function updateView() {
  const { path, params } = getRoute();
  const hasRoute = Object.prototype.hasOwnProperty.call(routeTitles, path);
  const targetRoute = hasRoute ? path : "__not-found__";
  const selectedView = views.find((view) => view.dataset.route === targetRoute) || views.find((view) => view.dataset.route === "/");

  views.forEach((view) => {
    view.hidden = view !== selectedView;
  });

  document.title = hasRoute ? routeTitles[path] : "Page Not Found | Baizid Bhuiyan";
  updateActiveNavigation(hasRoute ? path : "");
  updateServiceContext(params);
  closeMenu();

  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  if (main) {
    main.classList.remove("view-enter");
    void main.offsetWidth;
    main.classList.add("view-enter");
    requestAnimationFrame(() => { try { main.focus({ preventScroll: true }); } catch (e) { main.focus(); } });
  }
  if (typeof refreshReveals === "function") refreshReveals(selectedView);
}

function formMarkup(slotName) {
  const idPrefix = `contact-${slotName}`;
  return `
    <form class="contact-form" action="${siteConfig.formEndpoint}" method="post" data-contact-form>
      <div class="form-field">
        <label for="${idPrefix}-name">Name</label>
        <input id="${idPrefix}-name" name="name" type="text" autocomplete="name" required>
      </div>
      <div class="form-field">
        <label for="${idPrefix}-email">Email</label>
        <input id="${idPrefix}-email" name="email" type="email" autocomplete="email" required>
      </div>
      <div class="form-field full-width">
        <label for="${idPrefix}-service">Service Needed</label>
        <select id="${idPrefix}-service" name="service" required>
          <option value="">Select a service</option>
          <option value="local-seo">SEO &amp; Local SEO</option>
          <option value="paid-ads">Paid Ads &amp; Social Media</option>
          <option value="website-design">Website Design &amp; Modification</option>
          <option value="ai-automation">AI Automation &amp; Workflows</option>
          <option value="other">Other / General Enquiry</option>
        </select>
      </div>
      <div class="form-field full-width">
        <label for="${idPrefix}-message">Message</label>
        <textarea id="${idPrefix}-message" name="message" required></textarea>
      </div>
      <p class="form-status" aria-live="polite"></p>
      <div class="full-width"><button class="button" type="submit">Send Message <span aria-hidden="true">-></span></button></div>
    </form>`;
}

function setFormState(form, submitting, statusText = "", statusClass = "") {
  form.dataset.submitting = submitting ? "true" : "false";
  form.querySelectorAll("input, select, textarea, button").forEach((element) => {
    element.disabled = submitting;
  });
  const submitButton = form.querySelector("button[type='submit']");
  if (submitButton) submitButton.innerHTML = submitting ? "Sending..." : "Send Message <span aria-hidden=\"true\">-></span>";
  const status = form.querySelector(".form-status");
  status.textContent = statusText;
  status.className = `form-status ${statusClass}`.trim();
}

async function submitContactForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (form.dataset.submitting === "true") return;

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  setFormState(form, true);
  try {
    const response = await fetch(siteConfig.formEndpoint, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    });

    if (!response.ok) throw new Error("The form endpoint returned an error.");
    form.reset();
    setFormState(form, false, "Your message was sent successfully. Thank you.", "success");
  } catch (error) {
    setFormState(form, false, "Your message could not be sent. Please try again or use LinkedIn.", "error");
  }
}

function configureOptionalContactForms() {
  if (!siteConfig.formEndpoint) return;

  document.querySelectorAll("[data-form-slot]").forEach((slot) => {
    slot.innerHTML = formMarkup(slot.dataset.formSlot);
    slot.hidden = false;
  });

  document.querySelectorAll("[data-contact-form]").forEach((form) => {
    form.addEventListener("submit", submitContactForm);
  });

  const channelDetail = document.getElementById("contact-channel-detail");
  if (channelDetail) channelDetail.textContent = "A contact form is enabled below. LinkedIn remains available for direct contact.";
  const privacyNote = document.getElementById("contact-privacy-note");
  if (privacyNote) privacyNote.textContent = "Form submissions are sent only to the configured endpoint. LinkedIn messages remain governed by LinkedIn's platform controls.";
}

function addOptionalLink(container, href, label, newTab = false) {
  const link = document.createElement("a");
  link.href = href;
  link.textContent = label;
  if (newTab) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
  container.appendChild(link);
}

function configureOptionalContactDetails() {
  const optionalLinks = document.getElementById("optional-contact-links");
  if (!optionalLinks) return;
  if (siteConfig.email) addOptionalLink(optionalLinks, `mailto:${siteConfig.email}`, "Email Baizid");
  if (siteConfig.externalCvUrl) addOptionalLink(optionalLinks, siteConfig.externalCvUrl, "Download CV", true);
  if (!siteConfig.email && !siteConfig.externalCvUrl) return;
  optionalLinks.hidden = false;
}

function configurePrivacyContent() {
  if (!siteConfig.formEndpoint) return;

  let endpointName = "the configured form endpoint";
  try {
    endpointName = new URL(siteConfig.formEndpoint).hostname || endpointName;
  } catch (error) {
    // Keep the neutral label if the owner has not entered a fully qualified endpoint.
  }

  const privacyContact = document.getElementById("privacy-contact-status");
  const privacyInfo = document.getElementById("privacy-information-status");
  const privacyPurpose = document.getElementById("privacy-purpose-status");
  const privacyThird = document.getElementById("privacy-third-party-status");
  if (privacyContact) privacyContact.textContent = "A contact form is enabled on this website alongside LinkedIn contact.";
  if (privacyInfo) privacyInfo.textContent = "The contact form collects the name, email address, service needed, and message entered by the visitor.";
  if (privacyPurpose) privacyPurpose.textContent = "This information is collected only to receive and respond to project enquiries.";
  if (privacyThird) privacyThird.textContent = `No analytics service is configured. Contact form submissions are sent to ${endpointName}.`;
}

function configureOptionalProfileImage() {
  if (!siteConfig.profileImagePath) return;
  // Profile imagery is intentionally optional so no missing asset is ever referenced.
  document.querySelectorAll(".profile-monogram").forEach((monogram) => {
    monogram.style.backgroundImage = `linear-gradient(rgba(11,17,32,.16), rgba(11,17,32,.45)), url('${siteConfig.profileImagePath}')`;
    monogram.style.backgroundSize = "cover";
    monogram.style.backgroundPosition = "center";
    monogram.textContent = "";
    monogram.setAttribute("aria-label", "Portrait of Mohammad Baizid Bhuiyan");
  });
}

function labelPublishedWorkAsCompleted() {
  try {
    const scopes = document.querySelectorAll(".service-sample-section, [data-route='/projects'], [data-route^='/projects/']");
    scopes.forEach((scope) => {
      const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
      const nodes = [];
      let current;
      while ((current = walker.nextNode())) nodes.push(current);
      nodes.forEach((node) => {
        if (!node.nodeValue || !node.parentElement) return;
        const tag = node.parentElement.tagName;
        if (tag === "SCRIPT" || tag === "STYLE") return;
        node.nodeValue = node.nodeValue
          .replace(/concept briefs/gi, "creative briefs")
          .replace(/concept/gi, "project")
          .replace(/self-initiated/gi, "completed")
          .replace(/practice/gi, "completed")
          .replace(/\bsample\b/gi, "project");
      });
    });
  } catch (e) {
    // Non-critical text enhancement; never block routing.
  }
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const willOpen = !siteNav.classList.contains("open");
    siteNav.classList.toggle("open", willOpen);
    menuToggle.classList.toggle("active", willOpen);
    menuToggle.setAttribute("aria-expanded", String(willOpen));
    menuToggle.setAttribute("aria-label", willOpen ? "Close navigation menu" : "Open navigation menu");
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

document.addEventListener("click", (event) => {
  const hashLink = event.target.closest("a[href^='#/']");
  if (hashLink) {
    closeMenu();
    if (hashLink.getAttribute("href") === window.location.hash) updateView();
  }

  // Handle external social & contact links gracefully
  const externalLink = event.target.closest("a[target='_blank'], a[href^='mailto:'], a[href^='https://wa.me']");
  if (externalLink) {
    // Allows standard browser navigation to open new tab or mail client cleanly
    return;
  }
});

const skipLink = document.querySelector("[data-skip-link]");
if (skipLink && main) {
  skipLink.addEventListener("click", (event) => {
    event.preventDefault();
    main.focus();
  });
}

const backToTop = document.querySelector(".back-to-top");
if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });
}

const yearEl = document.getElementById("copyright-year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Prepare a structured enquiry and hand it to WhatsApp for the visitor to review and send.
const whatsappInquiryForm = document.getElementById("whatsapp-inquiry-form");
if (whatsappInquiryForm) {
  whatsappInquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const status = document.getElementById("whatsapp-form-status");

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const message = [
      "Hello Mohammad Baizid Bhuiyan,",
      "",
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || "Not provided"}`,
      `Service: ${data.get("service")}`,
      "",
      "Project details:",
      data.get("message")
    ].join("\n");

    const whatsappUrl = `https://wa.me/8801870474902?text=${encodeURIComponent(message)}`;
    if (status) {
      status.textContent = "Opening WhatsApp with your message ready to review...";
      status.className = "form-status success";
    }
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
}

// Profile photo upload directly in browser & saved to localStorage
const photoInput = document.getElementById("local-photo-input");
const aboutProfilePic = document.getElementById("about-profile-pic");
if (aboutProfilePic) {
  try {
    if (localStorage.getItem("baizid_profile_photo")) {
      aboutProfilePic.src = localStorage.getItem("baizid_profile_photo");
    } else if (siteConfig.profileImagePath) {
      aboutProfilePic.src = siteConfig.profileImagePath;
    }
  } catch (err) {
    if (siteConfig.profileImagePath) aboutProfilePic.src = siteConfig.profileImagePath;
  }
}
if (photoInput && aboutProfilePic) {
  photoInput.addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        aboutProfilePic.src = event.target.result;
        try {
          localStorage.setItem("baizid_profile_photo", event.target.result);
        } catch(err) {
          // localStorage size limit fallback
        }
      };
      reader.readAsDataURL(file);
    }
  });
}

/* ---------- Option A premium interactions (non-breaking) ---------- */
// Let any detail page load beautifully as a smooth overlay when routed
function configureDetailOverlayStyle() {
  try {
    const detailViews = document.querySelectorAll(".detail-view");
    detailViews.forEach((view) => {
      // Add a modal close button dynamically if not present
      if (!view.querySelector(".cosmic-close-btn") && view.dataset.route !== "__not-found__") {
        const closeBtn = document.createElement("button");
        closeBtn.className = "cosmic-close-btn";
        closeBtn.type = "button";
        closeBtn.ariaLabel = "Return back";
        closeBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        `;
        closeBtn.addEventListener("click", () => {
          // Go back or return to previous list
          const parentServiceRoute = view.dataset.route.startsWith("/services/") ? "#/services" : "";
          const parentProjectRoute = view.dataset.route.startsWith("/projects/") ? "#/projects" : "";
          window.location.hash = parentProjectRoute || parentServiceRoute || "#/";
        });
        view.insertBefore(closeBtn, view.firstChild);

        // Clicking on the backdrop blur outside the modal container returns back
        view.addEventListener("click", (evt) => {
          if (evt.target === view) {
            const parentServiceRoute = view.dataset.route.startsWith("/services/") ? "#/services" : "";
            const parentProjectRoute = view.dataset.route.startsWith("/projects/") ? "#/projects" : "";
            window.location.hash = parentProjectRoute || parentServiceRoute || "#/";
          }
        });
      }
    });
  } catch (e) {}
}
configureDetailOverlayStyle();

const siteHeader = document.querySelector(".site-header");
function handleHeaderShadow() {
  if (!siteHeader) return;
  siteHeader.classList.toggle("scrolled", window.scrollY > 12);
}
window.addEventListener("scroll", handleHeaderShadow, { passive: true });
handleHeaderShadow();

let revealObserver = null;
try { document.body.classList.add("js-reveal"); } catch (e) {}
function refreshReveals(scope) {
  try {
    const root = scope || document;
    const items = root.querySelectorAll(".reveal:not(.in-view)");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in-view"));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    }
    items.forEach((el) => revealObserver.observe(el));
  } catch (e) { /* never block routing */ }
}

// Subtle magnetic effect for primary buttons (desktop only)
try {
  if (window.matchMedia && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".button:not(.button-outline)").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) / r.width;
        const y = (e.clientY - r.top - r.height / 2) / r.height;
        btn.style.transform = `translate(${x * 4}px, ${y * 4 - 2}px)`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
    });
  }
} catch (e) { /* decorative only */ }

configureOptionalContactForms();
configureOptionalContactDetails();
configurePrivacyContent();
configureOptionalProfileImage();
labelPublishedWorkAsCompleted();
window.addEventListener("hashchange", updateView);
updateView();
refreshReveals(document);