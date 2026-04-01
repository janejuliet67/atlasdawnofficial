const body = document.body;
const loader = document.querySelector(".page-loader");
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const revealItems = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll(".counter");
const compareToggle = document.querySelector("#compare-toggle");
const comparePanel = document.querySelector("#compare-panel");
const bookingSection = document.querySelector("#booking");
const bookingForm = document.querySelector("#booking-form");
const newsletterForm = document.querySelector("#newsletter-form");
const stickyBooking = document.querySelector("#sticky-booking");
const syncInputs = document.querySelectorAll("[data-sync]");
const packageCards = document.querySelectorAll("[data-package-card]");
const packageLinks = document.querySelectorAll("[data-select-package]");
const modal = document.querySelector("#media-modal");
const modalBody = document.querySelector("#media-modal-body");
const modalTitle = document.querySelector("#media-modal-title");
const modalDescription = document.querySelector("#media-modal-description");
const modalTriggers = document.querySelectorAll("[data-modal-type]");
const modalCloseButtons = document.querySelectorAll("[data-close-modal]");
const destinationButtons = document.querySelectorAll("[data-destination]");

const countdownHours = document.querySelector("#countdown-hours");
const countdownMinutes = document.querySelector("#countdown-minutes");
const countdownSeconds = document.querySelector("#countdown-seconds");

const bookingTotal = document.querySelector("#booking-total");
const bookingTotalAmount = document.querySelector("#booking-total-amount");
const bookingNote = document.querySelector("#booking-note");
const stickySummary = document.querySelector("#sticky-summary");
const stickyMeta = document.querySelector("#sticky-meta");
const weatherTip = document.querySelector("#weather-tip");
const timingTip = document.querySelector("#timing-tip");
const guestLockNote = document.querySelector("#guest-lock-note");
const bookingFeedback = document.querySelector("#booking-feedback");
const newsletterFeedback = document.querySelector("#newsletter-feedback");
const bookingWhatsappNumber = "212671517781";

const destinationTitle = document.querySelector("#destination-title");
const destinationDescription = document.querySelector("#destination-description");
const destinationDrive = document.querySelector("#destination-drive");
const destinationMood = document.querySelector("#destination-mood");
const destinationHighlights = document.querySelector("#destination-highlights");
const destinationCta = document.querySelector("#destination-cta");

const packageData = {
  classic: {
    name: "Classic Flight",
    pricing: "perGuest",
    price: 1800,
    label: "Classic Flight for {guests}",
  },
  couple: {
    name: "Private Flight",
    pricing: "perGuest",
    price: 3500,
    minimumGuests: 2,
    label: "Private Flight for {guests}",
  },
  vip: {
    name: "Royal Flight",
    pricing: "perGuest",
    price: 5500,
    minimumGuests: 2,
    label: "Royal Flight for {guests}",
  },
};

const extrasData = {
  drone: 450,
  airport: 200,
  breakfast: 300,
  proposal: 950,
};

const destinations = {
  marrakech: {
    title: "Marrakech Dawn Escape",
    description:
      "Fastest transfer from the city, best for first-time visitors, and the most balanced mix of desert atmosphere with Atlas Mountain views.",
    drive: "30 to 45 minutes from central Marrakech",
    mood: "Mood: cinematic, romantic, effortless",
    highlights: [
      "Best for luxury couples and premium first-time travelers",
      "Ideal balance of convenience and scenery",
      "Private transfers available from riads and villas",
    ],
    cta: "Book Marrakech sunrise",
  },
};

const seasonalTips = [
  {
    months: [11, 0, 1],
    weather:
      "Winter mornings bring the clearest desert visibility and snow-bright Atlas views. Bring a soft layer for takeoff, then enjoy crisp golden light.",
    timing:
      "December through February is excellent for clarity, luxury couple trips, and travelers who love fresh morning air.",
  },
  {
    months: [2, 3, 4],
    weather:
      "Spring is prime season: gentle temperatures, calm air, and the most photogenic sunrise color. It is the easiest recommendation for most guests.",
    timing:
      "March through May usually delivers the most balanced conditions and the strongest booking demand, especially for private flights.",
  },
  {
    months: [5, 6, 7],
    weather:
      "Summer works best for very early departures. Lift-off is still beautiful, but premium travelers often favor private transport and lighter styling.",
    timing:
      "June through August is ideal for guests who want quieter calendars and sunrise before the heat builds later in the day.",
  },
  {
    months: [8, 9, 10],
    weather:
      "Autumn gives you mellow temperatures, warm amber skies, and a romantic mood that feels made for proposals and content-focused trips.",
    timing:
      "September through November is one of the best windows for romance, proposals, and luxury travelers planning shoulder-season escapes.",
  },
];

const formatMadAmount = (value) =>
  new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace(/\u202f/g, " ");

const formatCurrency = (value) => `${formatMadAmount(value)} MAD`;

const formatGuestLabel = (count) => `${count} ${count === 1 ? "guest" : "guests"}`;

const toDateInputValue = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

body.classList.add("is-loading");

let bookingSectionInView = false;

const setMenuState = (isOpen) => {
  if (!navToggle || !navMenu) {
    return;
  }

  navToggle.setAttribute("aria-expanded", String(isOpen));
  navMenu.classList.toggle("is-open", isOpen);
  body.classList.toggle("menu-open", isOpen);
};

window.addEventListener("load", () => {
  window.setTimeout(() => {
    loader.classList.add("is-hidden");
    body.classList.remove("is-loading");
  }, 700);
});

const setScrollState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
  document.documentElement.style.setProperty("--hero-shift", `${Math.min(window.scrollY * 0.12, 48)}px`);

  if (stickyBooking) {
    const nearPageEnd =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 140;
    stickyBooking.classList.toggle(
      "is-visible",
      window.scrollY > 420 && !bookingSectionInView && !nearPageEnd
    );
  }
};

setScrollState();
window.addEventListener("scroll", setScrollState, { passive: true });

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    setMenuState(!isExpanded);
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });

  document.addEventListener("click", (event) => {
    if (
      window.innerWidth < 768 &&
      navMenu.classList.contains("is-open") &&
      !header.contains(event.target)
    ) {
      setMenuState(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      setMenuState(false);
    }
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const animateCounter = (element) => {
  const target = Number(element.dataset.counter || "0");
  const suffix = element.dataset.suffix || "";
  const duration = 1500;
  const startTime = performance.now();

  const step = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const currentValue = Math.round(target * progress);
    element.textContent = `${currentValue.toLocaleString()}${suffix}`;

    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = `${target.toLocaleString()}${suffix}`;
    }
  };

  window.requestAnimationFrame(step);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

counters.forEach((counter) => counterObserver.observe(counter));

if (compareToggle && comparePanel) {
  compareToggle.addEventListener("click", () => {
    const isExpanded = compareToggle.getAttribute("aria-expanded") === "true";
    compareToggle.setAttribute("aria-expanded", String(!isExpanded));
    comparePanel.hidden = isExpanded;
    compareToggle.textContent = isExpanded ? "Compare packages" : "Hide comparison";
  });
}

const closeModal = () => {
  if (!modal) {
    return;
  }

  modal.hidden = true;
  modalBody.innerHTML = "";
  body.classList.remove("modal-open");
};

const openModal = (trigger) => {
  if (!modal) {
    return;
  }

  const type = trigger.dataset.modalType;
  const src = trigger.dataset.modalSrc;
  const poster = trigger.dataset.modalPoster;
  const title = trigger.dataset.modalTitle || "Experience Preview";
  const copy = trigger.dataset.modalCopy || "";

  modalBody.innerHTML = "";

  if (type === "video") {
    const video = document.createElement("video");
    video.src = src;
    if (poster) {
      video.poster = poster;
    }
    video.controls = true;
    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;
    modalBody.appendChild(video);
  } else {
    const image = document.createElement("img");
    image.src = src;
    image.alt = title;
    modalBody.appendChild(image);
  }

  modalTitle.textContent = title;
  modalDescription.textContent = copy;
  modal.hidden = false;
  body.classList.add("modal-open");
};

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => openModal(trigger));
});

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && !modal.hidden) {
    closeModal();
  }

  if (event.key === "Escape" && navMenu?.classList.contains("is-open")) {
    setMenuState(false);
  }
});

if (bookingSection && stickyBooking) {
  const bookingSectionObserver = new IntersectionObserver(
    (entries) => {
      bookingSectionInView = entries[0]?.isIntersecting ?? false;
      setScrollState();
    },
    { threshold: 0.18 }
  );

  bookingSectionObserver.observe(bookingSection);
}

const syncField = (key, value, source) => {
  document.querySelectorAll(`[data-sync="${key}"]`).forEach((input) => {
    if (input !== source) {
      input.value = value;
    }
  });
};

const getSelectedPackage = () =>
  document.querySelector('[data-sync="package"]')?.value || "classic";

const getSelectedGuests = () =>
  Number(document.querySelector('[data-sync="guests"]')?.value || "2");

const getSelectedDate = () =>
  document.querySelector('[data-sync="date"]')?.value || "";

const getExtrasTotal = () => {
  if (!bookingForm) {
    return 0;
  }

  const selectedExtras = bookingForm.querySelectorAll('input[name="extras"]:checked');

  return [...selectedExtras].reduce((total, input) => {
    return total + (extrasData[input.value] || 0);
  }, 0);
};

const setGuestLockState = () => {
  const selectedPackage = getSelectedPackage();
  const selected = packageData[selectedPackage];
  const guestInputs = document.querySelectorAll('[data-sync="guests"]');
  const minimumGuests = selected.minimumGuests || 1;
  const coupleMode = Boolean(selected.forcedGuests);

  guestInputs.forEach((input) => {
    input.disabled = coupleMode;
    if (coupleMode) {
      input.value = String(selected.forcedGuests);
    } else if (Number(input.value) < minimumGuests) {
      input.value = String(minimumGuests);
    }
  });

  if (coupleMode) {
    guestLockNote.textContent = "This private flight is reserved for exactly 2 guests, with pacing designed for a proposal or intimate celebration.";
  } else if (minimumGuests > 1) {
    guestLockNote.textContent = `${selected.name} requires a minimum of ${minimumGuests} guests and includes private service from pickup to landing.`;
  } else {
    guestLockNote.textContent = "Need more than 6 guests? Our concierge can arrange a private fleet and branded morning setup.";
  }
};

const updatePackageCardState = () => {
  const selectedPackage = getSelectedPackage();

  packageCards.forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.packageCard === selectedPackage);
  });
};

const updateWeatherTips = () => {
  const selectedDate = getSelectedDate();
  const date = selectedDate ? new Date(`${selectedDate}T06:00:00`) : new Date();
  const month = date.getMonth();
  const season = seasonalTips.find((item) => item.months.includes(month)) || seasonalTips[1];

  weatherTip.textContent = season.weather;
  timingTip.textContent = season.timing;
};

const updateDestination = (key) => {
  const destination = destinations[key];

  if (!destination) {
    return;
  }

  destinationTitle.textContent = destination.title;
  destinationDescription.textContent = destination.description;
  destinationDrive.textContent = destination.drive;
  destinationMood.textContent = destination.mood;
  destinationCta.textContent = destination.cta;

  destinationHighlights.innerHTML = "";
  destination.highlights.forEach((highlight) => {
    const item = document.createElement("li");
    item.textContent = highlight;
    destinationHighlights.appendChild(item);
  });

  destinationButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.destination === key);
  });
};

destinationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    updateDestination(button.dataset.destination);
  });
});

packageLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const selectedPackage = link.dataset.selectPackage;
    syncField("package", selectedPackage, null);
    document.querySelectorAll('[data-sync="package"]').forEach((input) => {
      input.value = selectedPackage;
    });
    updateBookingSummary();
  });
});

const buildWhatsappUrl = (total) => {
  const selectedPackage = getSelectedPackage();
  const guests = getSelectedGuests();
  const selectedDate = getSelectedDate() || "flexible date";
  const packageName = packageData[selectedPackage].name;
  const fullName = bookingForm?.querySelector('input[name="fullName"]')?.value?.trim() || "";
  const phone = bookingForm?.querySelector('input[name="phone"]')?.value?.trim() || "";
  const pickupLabel =
    bookingForm?.querySelector('select[name="pickup"] option:checked')?.textContent?.trim() ||
    "Riad or hotel in Marrakech";
  const extras = bookingForm
    ? [...bookingForm.querySelectorAll('input[name="extras"]:checked')].map((input) => {
        return input.closest("label")?.querySelector("span")?.textContent?.trim() || input.value;
      })
    : [];
  const lines = [
    "Hello Atlas Dawn,",
    "",
    "I would like to request a booking with the following details:",
  ];

  if (fullName) {
    lines.push(`Name: ${fullName}`);
  }

  if (phone) {
    lines.push(`My WhatsApp: ${phone}`);
  }

  lines.push(
    `Package: ${packageName}`,
    `Guests: ${formatGuestLabel(guests)}`,
    `Preferred date: ${selectedDate}`,
    `Pickup: ${pickupLabel}`,
    `Extras: ${extras.length ? extras.join(", ") : "None"}`,
    `Estimated total: ${formatCurrency(total)}`,
    "",
    "Please confirm availability and the next steps."
  );

  return `https://wa.me/${bookingWhatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
};

function updateBookingSummary() {
  setGuestLockState();

  const selectedPackage = getSelectedPackage();
  const guests = getSelectedGuests();
  const chosenPackage = packageData[selectedPackage];
  const baseTotal = chosenPackage.pricing === "fixed" ? chosenPackage.price : chosenPackage.price * guests;
  const extrasTotal = getExtrasTotal();
  const grandTotal = baseTotal + extrasTotal;
  const noteText = chosenPackage.label.replace("{guests}", formatGuestLabel(guests));

  if (bookingTotalAmount) {
    bookingTotalAmount.textContent = formatMadAmount(grandTotal);
  } else if (bookingTotal) {
    bookingTotal.textContent = formatCurrency(grandTotal);
  }
  bookingNote.textContent = noteText;
  stickySummary.textContent = `${chosenPackage.name} | ${formatCurrency(baseTotal)}`;
  stickyMeta.textContent =
    chosenPackage.pricing === "fixed"
      ? "Private flight for 2 guests"
      : `${formatGuestLabel(guests)} selected`;

  updatePackageCardState();
  updateWeatherTips();
}

const setDefaultDates = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const todayValue = toDateInputValue(today);
  const tomorrowValue = toDateInputValue(tomorrow);

  document.querySelectorAll('[data-sync="date"]').forEach((input) => {
    input.min = todayValue;
    input.value = tomorrowValue;
  });
};

syncInputs.forEach((input) => {
  input.addEventListener("change", (event) => {
    const key = event.currentTarget.dataset.sync;
    const value = event.currentTarget.value;
    syncField(key, value, event.currentTarget);
    updateBookingSummary();
  });
});

if (bookingForm) {
  bookingForm.querySelectorAll('input[name="fullName"], input[name="phone"]').forEach((input) => {
    input.addEventListener("input", updateBookingSummary);
  });

  bookingForm.querySelectorAll('input[name="extras"]').forEach((input) => {
    input.addEventListener("change", updateBookingSummary);
  });

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitButton = bookingForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    const selectedPackage = getSelectedPackage();
    const guests = getSelectedGuests();
    const chosenPackage = packageData[selectedPackage];
    const baseTotal = chosenPackage.pricing === "fixed" ? chosenPackage.price : chosenPackage.price * guests;
    const grandTotal = baseTotal + getExtrasTotal();
    const whatsappUrl = buildWhatsappUrl(grandTotal);

    submitButton.disabled = true;
    submitButton.textContent = "Opening WhatsApp...";
    const openedWindow = window.open(whatsappUrl, "_blank", "noopener");

    if (!openedWindow) {
      window.location.href = whatsappUrl;
    }

    window.setTimeout(() => {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }, 2200);
  });
}

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    newsletterFeedback.textContent = "You are on the list for new sunrise drops, seasonal tips, and curated Marrakech moments.";
    newsletterForm.reset();
  });
}

const updateCountdown = () => {
  const now = new Date();
  const target = new Date();
  target.setHours(6, 15, 0, 0);

  if (now >= target) {
    target.setDate(target.getDate() + 1);
  }

  const difference = target.getTime() - now.getTime();
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  countdownHours.textContent = String(hours).padStart(2, "0");
  countdownMinutes.textContent = String(minutes).padStart(2, "0");
  countdownSeconds.textContent = String(seconds).padStart(2, "0");
};

setDefaultDates();
updateDestination("marrakech");
updateBookingSummary();
updateCountdown();
window.setInterval(updateCountdown, 1000);
