"use client";

import Image from "next/image";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Check,
  ChevronDown,
  Clock3,
  GraduationCap,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  Stethoscope,
  UserRoundCheck,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";

const clinicPhoneDisplay = "+91 93812 19187";
const clinicPhoneHref = "tel:+919381219187";
const clinicWhatsAppHref = "https://wa.me/919381219187";
const requestConsultationLabel = "Request an Aesthetic Consultation";
const leadApiUrl = "https://api.drnishitaranka.in/v1/leads";

const concernOptions = [
  "Visible Signs of Ageing",
  "Skin Quality & Texture",
  "Facial Definition & Balance",
  "Pigmentation & Uneven Tone",
  "Acne Scars",
  "Lower-Face / Double-Chin Concerns",
  "Unwanted Hair",
  "Not Sure?",
];

const concernCards = [
  {
    title: "Visible Signs of Ageing",
    body: "Fine lines, changing skin quality and other visible signs of ageing.",
  },
  {
    title: "Skin Quality & Texture",
    body: "Dullness, uneven texture, pores and overall skin quality.",
  },
  {
    title: "Facial Definition & Balance",
    body: "Concerns around facial proportions, definition and balance.",
  },
  {
    title: "Pigmentation & Uneven Tone",
    body: "Concerns related to pigmentation and uneven-looking skin tone.",
  },
  {
    title: "Acne Scars",
    body: "Texture and visible marks following acne.",
  },
  {
    title: "Lower-Face / Double-Chin Concerns",
    body: "Concerns around lower-face definition and contour.",
  },
  {
    title: "Unwanted Hair",
    body: "Facial or body hair concerns.",
  },
  {
    title: "Not Sure?",
    body: "I'd like a dermatologist's assessment.",
  },
];

const authorityStats = [
  {
    icon: BadgeCheck,
    value: "10+ Years",
    label: "Dermatology Experience",
  },
  {
    icon: Award,
    value: "Dermatologist of the Year",
    label: "South Region — Economic Times & Financial Express, 2025 & 2026",
  },
  {
    icon: GraduationCap,
    value: "Trainer & Educator",
    label: "Global Trainer for Juvéderm, Restylane & aesthetic brands",
  },
  {
    icon: Star,
    value: "4.8 ★",
    label: "Google Rating",
  },
  {
    icon: UserRoundCheck,
    value: "700+",
    label: "Google Reviews",
  },
  {
    icon: ShieldCheck,
    value: "13,000+",
    label: "Patients Cared For",
  },
];

const publications = [
  { src: "/brand/deccan-chronicle.png", alt: "Deccan Chronicle" },
  { src: "/brand/hindustan-times.png", alt: "Hindustan Times" },
  { src: "/brand/new-indian-express.png", alt: "The New Indian Express" },
  { src: "/brand/deccan-herald.png", alt: "Deccan Herald" },
  { src: "/brand/lifestyle-asia.png", alt: "Lifestyle Asia" },
  { src: "/brand/hauterfly.png", alt: "Hauterfly" },
];

const assessmentConsiderations = [
  {
    title: "Facial Anatomy & Proportions",
    body: "Understanding the structure and balance of your face.",
  },
  {
    title: "Skin Quality",
    body: "Relevant skin characteristics, texture and overall quality.",
  },
  {
    title: "Ageing Pattern",
    body: "Understanding how your individual features are changing over time.",
  },
  {
    title: "Your Concern",
    body: "What you actually want to improve.",
  },
  {
    title: "Your Expectations",
    body: "The degree of change you are comfortable with.",
  },
  {
    title: "Medical Suitability",
    body: "Your history, previous treatments and clinical suitability.",
  },
];

const credentialItems = [
  {
    title: "Dermatologist of the Year",
    body: "Recognised as Dermatologist of the Year — South Region by Economic Times and Financial Express, 2025 and 2026.",
  },
  {
    title: "Trainer / Educator",
    body: "Global Trainer for Juvéderm, Restylane and other aesthetic brands.",
  },
  {
    title: "Faculty & Speaker",
    body: "International faculty and speaker in anti-ageing and Indian skin science.",
  },
  {
    title: "International Training",
    body: "Advanced training across France, South Korea, UAE and Singapore.",
  },
  {
    title: "Advanced Anatomy Training",
    body: "Cadaver-trained in facial anatomy and injectables.",
  },
  {
    title: "Education & Memberships",
    body: "MD in Dermatology. Life member, IADVL, IADVL National Resident Committee, Indian Medical Association, and Association of Cutaneous Surgeons.",
  },
];

const aestheticCapabilities = [
  {
    title: "General Aesthetic Dermatology",
    body: "Aesthetic care planned around your individual skin, facial features and concerns.",
  },
  {
    title: "Skin Quality & Rejuvenation",
    body: "Approaches focused on texture, pigmentation, hydration, collagen support and overall skin quality.",
  },
  {
    title: "Facial Rejuvenation",
    body: "Options for visible signs of ageing, facial balance and definition.",
  },
  {
    title: "Acne Scars & Texture",
    body: "Treatment approaches selected according to scar type, skin characteristics and individual response.",
  },
  {
    title: "Pigmentation",
    body: "Assessment-led approaches for uneven tone and pigmentation concerns.",
  },
  {
    title: "Unwanted Hair",
    body: "Laser-based and other appropriate approaches for unwanted facial or body hair.",
  },
];

const productItems = ["JUVÉDERM", "Restylane", "TEOXANE / TEOSYAL", "Sculptra", "HArmonyCa"];

const technologyItems = [
  {
    title: "Skin Resurfacing",
    body: "For selected concerns involving texture, pigmentation and skin quality.",
  },
  {
    title: "Energy-Based Treatments",
    body: "Technology selected according to skin and treatment objectives.",
  },
  {
    title: "Skin Rejuvenation",
    body: "Approaches designed to support skin quality and visible rejuvenation.",
  },
  {
    title: "Hair & Scalp Technology",
    body: "Technology-led approaches selected according to the underlying concern.",
  },
];

const consultationJourneySteps = [
  {
    number: "01",
    title: "Tell Us What You'd Like to Improve",
    body: "You don't need to know the treatment name.",
  },
  {
    number: "02",
    title: "Dermatologist-Led Assessment",
    body: "Relevant skin characteristics, facial anatomy, history and goals are assessed.",
  },
  {
    number: "03",
    title: "Clinical Photography",
    body: "Where appropriate, photography helps document concerns and monitor progress.",
  },
  {
    number: "04",
    title: "Understand Your Options",
    body: "Possible approaches, expected outcomes, limitations, downtime and alternatives are discussed.",
  },
  {
    number: "05",
    title: "Build Your Plan",
    body: "Treatment may involve one modality, a combination approach, staged care — or no treatment.",
  },
  {
    number: "06",
    title: "Review",
    body: "Appropriate follow-up forms part of the treatment journey.",
  },
];

const reviews = [
  {
    quote:
      "I have been regularly visiting Dr Nishita's clinic for the past 2+ years and have been extremely happy with the results, be it managing my acne and skin to laser hair removal treatments.",
    author: "Vaidehi Agarwal",
  },
  {
    quote:
      "Dr. Nishita Ranka is the best dermatologist I've visited till date. After consulting Nishita ma'am there is great improvement in just one month.",
    author: "Shamili Praharsha",
  },
  {
    quote:
      "I am really happy that I visited this clinic and it was a great experience. I highly recommend Dr. Nishita's clinic for any skin problems.",
    author: "Snehitha Kodali",
  },
  {
    quote:
      "It was a great experience at Nishita's Clinic, and the staff were very helpful and humble.",
    author: "Sravani Gubba",
  },
  {
    quote:
      "Great service and wonderful experience for laser hair reduction, have seen amazing results in just 4 sessions.",
    author: "Supraja Alleni",
  },
];

const faqs = [
  {
    question: "Do I need to know which treatment I want?",
    answer:
      "No. You can start with your concern rather than a treatment name. The consultation is designed to determine what may be appropriate for you.",
  },
  {
    question: "How does Dr. Nishita decide which treatment is right for me?",
    answer:
      "Treatment planning considers your facial anatomy, skin quality, ageing pattern, concern, expectations, previous treatments and medical suitability.",
  },
  {
    question: "Will I be recommended a combination of treatments?",
    answer:
      "Where clinically appropriate, treatment may involve a single modality, combination approach or staged care. Not every concern requires multiple treatments.",
  },
  {
    question: "Will my treatment make me look different?",
    answer:
      "Aesthetic treatment does not have to mean dramatic change. Treatment can be planned around your existing features and the degree of change you are comfortable with.",
  },
  {
    question: "Does the clinic treat both medical and aesthetic concerns?",
    answer:
      "Yes. The clinic's wider offering spans clinical dermatology, skin, hair and aesthetic care.",
  },
  {
    question: "What happens during the first consultation?",
    answer:
      "Your concern, relevant medical history, facial or skin characteristics and goals are assessed before appropriate options and treatment plans are discussed.",
  },
];

type FormErrors = Partial<Record<"name" | "phone" | "area" | "submit", string>>;
type FormValues = Record<"name" | "phone" | "area", string>;
type StickyFormPhase = "hidden" | "visible" | "hiding";
type StickyFormMode = "auto" | "mobile";
type MobileCtaTone = "on-light" | "on-dark";

type ConcernDropdownProps = {
  className?: string;
  error?: string;
  id: string;
  label: string;
  options: string[];
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

function ConcernDropdown({
  className,
  error,
  id,
  label,
  options,
  placeholder,
  value,
  onChange,
}: ConcernDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const menuId = `${id}-options`;
  const errorId = `${id}-error`;

  const focusOption = useCallback((index: number) => {
    window.requestAnimationFrame(() => optionRefs.current[index]?.focus());
  }, []);

  const openMenu = useCallback(
    (preferredIndex?: number) => {
      const selectedIndex = options.indexOf(value);
      const nextIndex =
        preferredIndex ?? (selectedIndex >= 0 ? selectedIndex : 0);
      setActiveIndex(nextIndex);
      setIsOpen(true);
      focusOption(nextIndex);
    },
    [focusOption, options, value],
  );

  const closeMenu = useCallback((restoreFocus = false) => {
    setIsOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [closeMenu]);

  function handleTriggerKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "Home") {
      event.preventDefault();
      openMenu(event.key === "Home" ? 0 : undefined);
    }

    if (event.key === "ArrowUp" || event.key === "End") {
      event.preventDefault();
      openMenu(event.key === "End" ? options.length - 1 : undefined);
    }

    if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      closeMenu(true);
    }
  }

  function handleOptionKeyDown(
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onChange(options[index]);
      closeMenu(true);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu(true);
      return;
    }

    if (event.key === "Tab") {
      closeMenu();
      return;
    }

    let nextIndex = index;
    if (event.key === "ArrowDown") nextIndex = (index + 1) % options.length;
    if (event.key === "ArrowUp") {
      nextIndex = (index - 1 + options.length) % options.length;
    }
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = options.length - 1;

    if (nextIndex !== index) {
      event.preventDefault();
      setActiveIndex(nextIndex);
      focusOption(nextIndex);
    }
  }

  return (
    <div className={`field-group custom-select-field${className ? ` ${className}` : ""}`}>
      <label id={`${id}-label`} htmlFor={id}>
        {label} <span className="required-mark" aria-hidden="true">*</span>
      </label>
      <input type="hidden" name="area" value={value} />
      <div ref={rootRef} className="custom-select" data-open={isOpen}>
        <button
          ref={triggerRef}
          id={id}
          className="custom-select-trigger"
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={menuId}
          aria-labelledby={`${id}-label ${id}-value`}
          data-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onClick={() => (isOpen ? closeMenu() : openMenu())}
          onKeyDown={handleTriggerKeyDown}
        >
          <span id={`${id}-value`} className={value ? undefined : "is-placeholder"}>
            {value || placeholder}
          </span>
          <ChevronDown className="custom-select-chevron" size={18} aria-hidden="true" />
        </button>
        <div
          id={menuId}
          className="custom-select-menu"
          role="listbox"
          aria-labelledby={`${id}-label`}
          aria-hidden={!isOpen}
        >
          {options.map((option, index) => (
            <button
              key={option}
              ref={(element) => {
                optionRefs.current[index] = element;
              }}
              className="custom-select-option"
              type="button"
              role="option"
              aria-selected={value === option}
              tabIndex={isOpen && index === activeIndex ? 0 : -1}
              onClick={() => {
                onChange(option);
                closeMenu(true);
              }}
              onFocus={() => setActiveIndex(index)}
              onKeyDown={(event) => handleOptionKeyDown(event, index)}
            >
              <span>{option}</span>
              <Check size={16} aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
      {error && (
        <span className="field-error" id={errorId} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

const getBackgroundLuminance = (element: Element | null) => {
  let currentElement: Element | null = element;

  while (currentElement && currentElement !== document.documentElement) {
    const backgroundColor = window.getComputedStyle(currentElement).backgroundColor;
    const match = backgroundColor.match(
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/,
    );

    if (match && Number(match[4] ?? 1) > 0.08) {
      const [, red, green, blue] = match.map(Number);
      return (red * 299 + green * 587 + blue * 114) / 1000;
    }

    currentElement = currentElement.parentElement;
  }

  return 255;
};

export default function Home() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    phone: "",
    area: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stickyFormPhase, setStickyFormPhase] =
    useState<StickyFormPhase>("hidden");
  const [stickyFormMode, setStickyFormMode] =
    useState<StickyFormMode | null>(null);
  const [stickyFormHeight, setStickyFormHeight] = useState(0);
  const [mobileCtaVisible, setMobileCtaVisible] = useState(false);
  const [mobileCtaTone, setMobileCtaTone] =
    useState<MobileCtaTone>("on-light");
  const [reviewsPaused, setReviewsPaused] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const stickyFormRef = useRef<HTMLElement>(null);
  const stickyCloseButtonRef = useRef<HTMLButtonElement>(null);
  const bookingCloseButtonRef = useRef<HTMLButtonElement>(null);
  const mobileCtaRef = useRef<HTMLButtonElement>(null);
  const stickyPhaseRef = useRef<StickyFormPhase>("hidden");
  const stickyModeRef = useRef<StickyFormMode | null>(null);
  const stickyDismissedRef = useRef(false);
  const stickyExitTimerRef = useRef<number | null>(null);
  const stickyFormMounted = stickyFormPhase !== "hidden";
  const stickyFormHiding = stickyFormPhase === "hiding";
  const mobileConsultationOpen =
    stickyFormPhase === "visible" && stickyFormMode === "mobile";
  const mobileCtaInteractive = mobileCtaVisible && !stickyFormMounted;

  const clearStickyExitTimer = useCallback(() => {
    if (stickyExitTimerRef.current === null) return;
    window.clearTimeout(stickyExitTimerRef.current);
    stickyExitTimerRef.current = null;
  }, []);

  const showStickyForm = useCallback((mode: StickyFormMode) => {
    if (mode === "auto" && stickyDismissedRef.current) return;

    clearStickyExitTimer();
    stickyModeRef.current = mode;
    setStickyFormMode(mode);
    if (stickyPhaseRef.current === "visible") return;

    stickyPhaseRef.current = "visible";
    setStickyFormPhase("visible");
  }, [clearStickyExitTimer]);

  const hideStickyForm = useCallback(() => {
    if (
      stickyPhaseRef.current === "hidden" ||
      stickyPhaseRef.current === "hiding"
    ) {
      return;
    }

    clearStickyExitTimer();
    const closingMode = stickyModeRef.current;
    stickyPhaseRef.current = "hiding";
    setStickyFormPhase("hiding");
    stickyExitTimerRef.current = window.setTimeout(() => {
      stickyPhaseRef.current = "hidden";
      stickyModeRef.current = null;
      stickyExitTimerRef.current = null;
      setStickyFormMode(null);
      setStickyFormPhase("hidden");

      if (
        closingMode === "mobile" &&
        window.matchMedia("(max-width: 560px)").matches
      ) {
        window.requestAnimationFrame(() => {
          mobileCtaRef.current?.focus({ preventScroll: true });
        });
      }
    }, 320);
  }, [clearStickyExitTimer]);

  const dismissStickyForm = useCallback(() => {
    if (stickyModeRef.current === "auto") {
      stickyDismissedRef.current = true;
    }
    hideStickyForm();
  }, [hideStickyForm]);

  const openMobileConsultation = useCallback(() => {
    stickyDismissedRef.current = false;
    showStickyForm("mobile");
  }, [showStickyForm]);

  const handleConsultationLinkClick = useCallback(
    (event: ReactMouseEvent<HTMLAnchorElement>) => {
      if (!window.matchMedia("(max-width: 560px)").matches) return;

      event.preventDefault();
      openMobileConsultation();
    },
    [openMobileConsultation],
  );

  useEffect(() => {
    let animationFrame = 0;

    const updateStickyVisibility = () => {
      const heroSection = document.getElementById("top");
      if (!heroSection) return;

      const hasPassedHero = heroSection.getBoundingClientRect().bottom <= 68;
      const isMobile = window.matchMedia("(max-width: 560px)").matches;
      if (isMobile) {
        setMobileCtaVisible(true);
        const ctaElement = mobileCtaRef.current;
        const sampleX = window.innerWidth / 2;
        const sampleY = window.innerHeight - 36;
        const backdropElement =
          document
            .elementsFromPoint(sampleX, sampleY)
            .find((element) => !ctaElement?.contains(element))
            ?.closest("section, footer, header, main") ??
          document.body;
        const backdropLuminance = getBackgroundLuminance(backdropElement);
        setMobileCtaTone(backdropLuminance < 150 ? "on-dark" : "on-light");
        if (stickyModeRef.current === "auto") hideStickyForm();
        return;
      }

      setMobileCtaVisible(false);
      if (hasPassedHero) {
        showStickyForm("auto");
      } else {
        stickyDismissedRef.current = false;
        hideStickyForm();
      }
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateStickyVisibility);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      clearStickyExitTimer();
    };
  }, [clearStickyExitTimer, hideStickyForm, showStickyForm]);

  useEffect(() => {
    if (!mobileConsultationOpen) return;

    const focusFrame = window.requestAnimationFrame(() => {
      stickyCloseButtonRef.current?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(focusFrame);
  }, [mobileConsultationOpen]);

  useEffect(() => {
    if (!isBookingModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      bookingCloseButtonRef.current?.focus({ preventScroll: true });
    });

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") setIsBookingModalOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      window.cancelAnimationFrame(focusFrame);
    };
  }, [isBookingModalOpen]);

  useEffect(() => {
    if (window.matchMedia("(max-width: 560px)").matches) return;

    let armed = false;
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, 4000);

    function handleMouseLeave(event: MouseEvent) {
      if (!armed || event.clientY > 0) return;

      let alreadyShown = false;
      try {
        alreadyShown = sessionStorage.getItem("exitIntentShown") === "1";
      } catch {
        alreadyShown = false;
      }
      if (alreadyShown) return;

      try {
        sessionStorage.setItem("exitIntentShown", "1");
      } catch {
        // sessionStorage unavailable (e.g. private browsing); allow it to show anyway
      }

      setIsBookingModalOpen(true);
    }

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.clearTimeout(armTimer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px 8% 0px",
      },
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!stickyFormMounted) return;

    const stickyForm = stickyFormRef.current;
    if (!stickyForm) return;

    const updateHeight = () => {
      setStickyFormHeight(
        Math.ceil(stickyForm.getBoundingClientRect().height),
      );
    };

    const initialMeasureFrame = window.requestAnimationFrame(updateHeight);
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(stickyForm);

    return () => {
      window.cancelAnimationFrame(initialMeasureFrame);
      resizeObserver.disconnect();
    };
  }, [stickyFormMounted]);

  function updateField(field: keyof FormValues, value: string) {
    setFormValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleConcernSelect(concern: string) {
    updateField("area", concern);

    if (window.matchMedia("(max-width: 560px)").matches) {
      openMobileConsultation();
      return;
    }

    document
      .getElementById("consultation")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.requestAnimationFrame(() => {
      document.getElementById("area")?.focus();
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const area = String(form.get("area") ?? "").trim();
    const digits = phone.replace(/\D/g, "");
    const nextErrors: FormErrors = {};

    if (name.length < 2) nextErrors.name = "Please enter your full name.";
    if (digits.length < 10 || digits.length > 13) {
      nextErrors.phone = "Please enter a valid mobile number.";
    }
    if (!area) nextErrors.area = "Please choose a concern.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidField = Object.keys(nextErrors)[0];
      const fieldPrefix = event.currentTarget.dataset.formPrefix ?? "";
      window.requestAnimationFrame(() => {
        document.getElementById(fieldPrefix + firstInvalidField)?.focus();
      });
      return;
    }

    setIsSubmitting(true);

    const searchParams = new URLSearchParams(window.location.search);
    const gclid =
      searchParams.get("gclid")?.trim() ||
      searchParams.get("gcl_id")?.trim() ||
      "";

    fetch("/api/telecrm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, area, landing_page_1: "brandlandingpage" }),
      keepalive: true,
    }).catch((error) => {
      console.error("TeleCRM lead submission failed", error);
    });

    try {
      const response = await fetch(leadApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage: "complete",
          name,
          phone,
          email: `lead+${digits}@drnishitaranka.in`,
          landingPage: "Brand Landing Page",
          treatmentAreas: [area],
          plannedStart: "",
          referrer: document.referrer || "Direct / none",
          utmSource: searchParams.get("utm_source") || "direct",
          utmMedium: searchParams.get("utm_medium") || "none",
          utmCampaign: searchParams.get("utm_campaign") || "Brand Landing Page",
          utmContent: searchParams.get("utm_content") || "",
          utmTerm: searchParams.get("utm_term") || "",
          gclid,
          formAnswers: { "Primary concern": area },
          website: "",
        }),
      });

      const result = (await response.json()) as {
        error?: string;
        leadId?: string;
      };
      if (!response.ok || !result.leadId) {
        throw new Error(result.error || "Lead submission failed");
      }

      (
        window as Window & {
          dataLayer?: Array<Record<string, string>>;
        }
      ).dataLayer?.push({
        event: "consultation_form_submit",
        treatment: "brand_consultation",
        selected_concern: area,
        lead_id: result.leadId,
        utm_source: searchParams.get("utm_source") ?? "",
        utm_medium: searchParams.get("utm_medium") ?? "",
        utm_campaign: searchParams.get("utm_campaign") ?? "",
        utm_content: searchParams.get("utm_content") ?? "",
        utm_term: searchParams.get("utm_term") ?? "",
        gclid,
      });

      window.location.assign("/thank-you");
    } catch (error) {
      console.error("Lead submission failed", error);
      setErrors((current) => ({
        ...current,
        submit: "We could not save your request. Please try again in a moment.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  }

  const consultationForm = (prefix = "") => (
    <>
      <div className="field-group">
        <label htmlFor={`${prefix}name`}>
          Full name <span className="required-mark" aria-hidden="true">*</span>
        </label>
        <input
          id={`${prefix}name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          value={formValues.name}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${prefix}name-error` : undefined}
          onChange={(event) => updateField("name", event.target.value)}
        />
        {errors.name && (
          <span className="field-error" id={`${prefix}name-error`} role="alert">
            {errors.name}
          </span>
        )}
      </div>
      <div className="field-group">
        <label htmlFor={`${prefix}phone`}>
          Mobile number <span className="required-mark" aria-hidden="true">*</span>
        </label>
        <input
          id={`${prefix}phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+91"
          required
          value={formValues.phone}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? `${prefix}phone-error` : undefined}
          onChange={(event) => updateField("phone", event.target.value)}
        />
        {errors.phone && (
          <span className="field-error" id={`${prefix}phone-error`} role="alert">
            {errors.phone}
          </span>
        )}
      </div>
      <ConcernDropdown
        className={prefix === "sticky-" ? "sticky-area-field" : undefined}
        id={`${prefix}area`}
        label="Primary concern"
        placeholder="Select a concern"
        options={concernOptions}
        value={formValues.area}
        error={errors.area}
        onChange={(value) => updateField("area", value)}
      />
    </>
  );

  return (
    <main id="main-content" className="page-brand page-brand">
      <a className="skip-link" href="#hero-title">
        Skip to consultation information
      </a>
      <header className="site-header" aria-label="Clinic header">
        <div className="header-inner">
          <a
            className="brand-link"
            href="#top"
            aria-label="Dr. Nishita's Clinic home"
          >
            <Image
              src="/brand/logo.png"
              alt="Dr. Nishita's Clinic for Skin, Hair and Aesthetics"
              width={500}
              height={89}
              priority
              unoptimized
            />
          </a>
          <div className="header-actions">
            <span className="header-location">Banjara Hills, Hyderabad</span>
            {/* <a
              className="call-link"
              href={clinicPhoneHref}
              aria-label={"Call clinic on " + clinicPhoneDisplay}
            >
              <Phone size={18} aria-hidden="true" />
              <span>Call clinic</span>
            </a> */}
          </div>
        </div>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-inner">
          <div className="hero-copy">
            <div
              className="rating-line hero-reveal"
              style={{ "--delay": "80ms" } as CSSProperties}
            >
              <Image
                src="/brand/google.png"
                alt="Google"
                width={36}
                height={36}
                unoptimized
                loading="eager"
              />
              <span className="rating-score">4.8</span>
              <span className="stars" aria-label="4.8 out of 5 stars">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    size={15}
                    fill="currentColor"
                    aria-hidden="true"
                  />
                ))}
              </span>
              <span className="rating-count">13,000+ Patients Cared For</span>
            </div>
            <p
              className="eyebrow hero-reveal"
              style={{ "--delay": "150ms" } as CSSProperties}
            >
              Aesthetic Dermatology | Banjara Hills, Hyderabad
            </p>
            <h1
              id="hero-title"
              className="hero-reveal"
              style={{ "--delay": "220ms" } as CSSProperties}
            >
              Aesthetic Treatments, Led by a Dermatologist
            </h1>
            <div className="hero-media-frame">
              <Image
                className="hero-media hero-media-desktop"
                src="/brand/hero-doctor-saree.jpg"
                alt="Dr. Nishita Ranka, dermatologist"
                fill
                priority
                unoptimized
                sizes="(max-width: 560px) 0px, 100vw"
              />
              <Image
                className="hero-media hero-media-mobile"
                src="/brand/hero-clinic-interior.jpg"
                alt="Dr. Nishita's Clinic reception and waiting area"
                fill
                priority
                unoptimized
                sizes="(max-width: 560px) 100vw, 0px"
              />
            </div>
            <p
              className="hero-intro hero-reveal"
              style={{ "--delay": "300ms" } as CSSProperties}
            >
              Whether you want to improve skin quality, soften visible signs
              of ageing, enhance facial definition or simply understand your
              options, your treatment should begin with an assessment, not a
              procedure. At Dr. Nishita&apos;s Clinic, aesthetic treatment
              plans are led by{" "}
              <strong>
                Dr. Nishita Ranka, Dermatologist with 10+ years of experience
              </strong>
              , and designed around your face, skin and individual goals.
            </p>
            <a
              className="hero-mobile-cta hero-reveal"
              href="#consultation"
              onClick={handleConsultationLinkClick}
              style={{ "--delay": "340ms" } as CSSProperties}
            >
              {requestConsultationLabel}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              className="text-link hero-whatsapp-cta hero-reveal"
              href={clinicWhatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{ "--delay": "350ms" } as CSSProperties}
            >
              <MessageCircle size={16} aria-hidden="true" /> WhatsApp the Clinic
            </a>
            <ul
              className="hero-benefits hero-reveal"
              style={{ "--delay": "360ms" } as CSSProperties}
            >
              {[
                "Dermatologist-led assessment before any treatment",
                "Personalised, staged or combination treatment planning",
                "Natural-looking outcomes built around your own features",
              ].map((benefit) => (
                <li key={benefit}>
                  <Check size={18} aria-hidden="true" /> {benefit}
                </li>
              ))}
            </ul>
          </div>

          <form
            className="consultation-form hero-reveal"
            id="consultation"
            onSubmit={handleSubmit}
            data-form-prefix=""
            noValidate
            style={{ "--delay": "440ms" } as CSSProperties}
          >
            <div className="form-heading">
              <h2>Tell us what you&apos;d like to improve.</h2>
              <p>Three details. Less than a minute.</p>
            </div>
            {consultationForm()}
            <div className="form-submit">
              <button
                type="submit"
                data-testid="consultation-submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? "Saving your request..." : requestConsultationLabel}
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
            {errors.submit && (
              <p className="form-submit-error" role="alert">
                {errors.submit}
              </p>
            )}
            <p className="form-disclaimer">
              * By continuing, you agree to be contacted by the clinic.
            </p>
          </form>
        </div>
      </section>

      <section className="proof-band" aria-label="Clinic authority and experience">
        <div className="section-inner proof-grid">
          {authorityStats.map(({ icon: Icon, value, label }, index) => (
            <div
              className="proof-item"
              key={value}
              data-reveal="rise"
              style={
                { "--reveal-delay": `${index * 70}ms` } as CSSProperties
              }
            >
              <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
              <div>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="featured-section" aria-labelledby="featured-title">
        <div className="section-inner">
          <p className="section-label" id="featured-title" data-reveal="fade">
            Dr. Ranka has been featured in
          </p>
        </div>
        <div className="publication-marquee" data-reveal="fade">
          <div className="publication-track">
            {[0, 1].map((groupIndex) => (
              <div
                className="publication-group"
                key={groupIndex}
                aria-hidden={groupIndex === 1}
              >
                {publications.map((publication) => (
                  <div
                    className="publication-logo"
                    key={`${groupIndex}-${publication.alt}`}
                  >
                    <Image
                      src={publication.src}
                      alt={groupIndex === 0 ? publication.alt : ""}
                      width={300}
                      height={150}
                      unoptimized
                      loading="eager"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section" aria-labelledby="concerns-title">
        <div className="section-inner">
          <div className="technology-heading" data-reveal="rise">
            <p className="eyebrow">Concerns</p>
            <h2 id="concerns-title">What Would You Like to Improve?</h2>
          </div>
          <div className="brand-care-grid" aria-label="Aesthetic concerns">
            {concernCards.map((concern, index) => (
              <button
                type="button"
                className="brand-care-card concern-card"
                key={concern.title}
                data-reveal="rise"
                style={
                  { "--reveal-delay": `${index * 55}ms` } as CSSProperties
                }
                onClick={() => handleConcernSelect(concern.title)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{concern.title}</h3>
                <p>{concern.body}</p>
              </button>
            ))}
          </div>
          <a
            className="primary-button brand-care-cta"
            href="#consultation"
            onClick={handleConsultationLinkClick}
            data-reveal="fade"
          >
            Tell Us What Concerns You <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section
        className="content-section content-section--dark"
        aria-labelledby="assessment-title"
      >
        <div className="section-inner">
          <div className="section-heading split-heading" data-reveal="rise">
            <div>
              <p className="eyebrow">Assessment Philosophy</p>
              <h2 id="assessment-title">
                We don&apos;t start with a procedure. We start with an
                assessment.
              </h2>
            </div>
            <p>
              A patient asking for one procedure may have a concern better
              addressed by another approach. Sometimes a staged or
              combination plan may be appropriate. And sometimes, no
              treatment may be recommended.
            </p>
          </div>
          <h3 className="pull-quote-label" data-reveal="fade">
            Your assessment considers:
          </h3>
          <div className="brand-care-grid" aria-label="What your assessment considers">
            {assessmentConsiderations.map((item, index) => (
              <article
                className="brand-care-card"
                key={item.title}
                data-reveal="rise"
                style={
                  { "--reveal-delay": `${index * 65}ms` } as CSSProperties
                }
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <p className="pull-quote" data-reveal="fade">
            The question isn&apos;t simply, &quot;What treatment can we
            do?&quot;
          </p>
          <p className="pull-quote" data-reveal="fade">
            It&apos;s, &quot;What would actually be appropriate for this
            patient?&quot;
          </p>
        </div>
      </section>

      <section className="doctor-section" aria-labelledby="doctor-title">
        <div className="doctor-media" data-reveal="left">
          <Image
            src="/brand/dr-nishita.jpg"
            alt="Dr. Nishita Ranka"
            fill
            unoptimized
            loading="eager"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
        </div>
        <div className="doctor-copy" data-reveal="right">
          <p className="eyebrow">
            Dermatologist | Trainer &amp; Educator | 10+ Years of Experience
          </p>
          <h2 id="doctor-title">Meet Dr. Nishita Ranka</h2>
          <p className="large-copy">
            Dr. Nishita Ranka&apos;s work spans clinical and aesthetic
            dermatology. Her approach to aesthetics begins with
            understanding facial anatomy, skin quality, ageing patterns and
            individual goals before discussing treatment.
          </p>
          <p>
            Rather than approaching aesthetics as a menu of procedures, she
            focuses on considered treatment plans and natural-looking
            outcomes.
          </p>
          <p className="doctor-philosophy-label">Her philosophy</p>
          <p className="doctor-philosophy">
            &quot;The question is not what treatment can we do. It is what
            would actually be appropriate for this patient.&quot;
          </p>
          <div className="doctor-signals">
            {[
              { icon: Stethoscope, text: "10+ Years Experience" },
              { icon: ShieldCheck, text: "Assessment-Led Care" },
            ].map(({ icon: Icon, text }) => (
              <span key={text}>
                <Icon size={20} aria-hidden="true" /> {text}
              </span>
            ))}
          </div>
          <a className="text-link" href="#credentials">
            Know Dr. Nishita <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section
        className="content-section"
        id="credentials"
        aria-labelledby="credentials-title"
      >
        <div className="section-inner">
          <div className="technology-heading" data-reveal="rise">
            <p className="eyebrow">Credentials</p>
            <h2 id="credentials-title">Expertise backed by experience</h2>
          </div>
          <div className="brand-care-grid" aria-label="Credentials">
            {credentialItems.map((item, index) => (
              <article
                className="brand-care-card"
                key={item.title}
                data-reveal="rise"
                style={
                  { "--reveal-delay": `${index * 60}ms` } as CSSProperties
                }
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="content-section content-section--dark"
        aria-labelledby="teaching-title"
      >
        <div className="section-inner">
          <div className="section-heading split-heading" data-reveal="rise">
            <div>
              <p className="eyebrow">Professional Education</p>
              <h2 id="teaching-title">Trusted to treat. Trusted to teach.</h2>
            </div>
            <p>
              Dr. Nishita&apos;s work in aesthetics extends beyond treating
              patients. She also contributes to professional education,
              training doctors in areas including facial assessment,
              anatomy and aesthetic techniques.
            </p>
          </div>
          <p className="pull-quote" data-reveal="fade">
            The same commitment to precision that guides patient care
            informs the way she teaches other medical professionals.
          </p>
        </div>
      </section>

      <section className="content-section" aria-labelledby="natural-title">
        <div className="section-inner">
          <div className="technology-heading" data-reveal="rise">
            <p className="eyebrow">Natural-Looking Aesthetics</p>
            <h2 id="natural-title">You should still look like you.</h2>
            <p>
              Aesthetic care does not have to mean dramatic change. The
              objective may simply be improved skin quality, a more rested
              appearance, softer visible signs of ageing, better definition,
              improved balance or thoughtful maintenance over time.
            </p>
          </div>
          <div className="natural-copy" data-reveal="fade">
            <p>
              Treatment planning respects your individual facial features
              and the degree of change you are comfortable with.
            </p>
            <p className="natural-quote">
              &quot;I want to look better. I don&apos;t want to look
              overdone.&quot;
            </p>
            <p>
              <strong>We understand.</strong> Treatment decisions are made
              around your anatomy, concerns and goals, with outcomes that
              remain personal to you.
            </p>
          </div>
        </div>
      </section>

      <section className="brand-care-section" aria-labelledby="brand-care-title">
        <div className="section-inner">
          <div className="technology-heading" data-reveal="rise">
            <p className="eyebrow">Treatment Capabilities</p>
            <h2 id="brand-care-title">
              A complete approach to aesthetic dermatology
            </h2>
            <p>
              From skin quality to facial definition, treatment options are
              selected according to your assessment and goals.
            </p>
          </div>
          <div className="brand-care-grid" aria-label="Areas of care">
            {aestheticCapabilities.map((area, index) => (
              <article
                className="brand-care-card"
                key={area.title}
                data-reveal="rise"
                style={
                  { "--reveal-delay": `${index * 65}ms` } as CSSProperties
                }
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{area.title}</h3>
                <p>{area.body}</p>
              </article>
            ))}
          </div>
          <a
            className="primary-button brand-care-cta"
            href="#consultation"
            onClick={handleConsultationLinkClick}
            data-reveal="fade"
          >
            Explore Your Treatment Options <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section
        className="content-section content-section--dark"
        aria-labelledby="products-title"
      >
        <div className="section-inner">
          <div className="section-heading split-heading" data-reveal="rise">
            <div>
              <p className="eyebrow">Products</p>
              <h2 id="products-title">
                Established products used in our practice
              </h2>
            </div>
            <p>
              Where an injectable treatment is clinically appropriate,
              product selection depends on the indication, facial anatomy,
              treatment objective and individual assessment.
            </p>
          </div>
          <ul
            className="products-list"
            aria-label="Products used in practice"
            data-reveal="rise"
          >
            {productItems.map((product) => (
              <li className="product-pill" key={product}>
                {product}
              </li>
            ))}
          </ul>
          <p className="pull-quote" data-reveal="fade">
            Products support the treatment plan. They do not define it.
          </p>
        </div>
      </section>

      <section
        className="content-section technology-section"
        aria-labelledby="technology-title"
      >
        <div className="section-inner">
          <div className="technology-heading" data-reveal="rise">
            <p className="eyebrow">Technology</p>
            <h2 id="technology-title">
              Technology with a clinical purpose
            </h2>
            <p>
              Technology is only as valuable as the way it is selected and
              used. Treatment technologies are chosen according to the
              concern being addressed, skin characteristics and desired
              treatment approach.
            </p>
          </div>
          <div
            className="brand-care-grid brand-care-grid--4"
            aria-label="Treatment technology"
          >
            {technologyItems.map((item, index) => (
              <article
                className="brand-care-card"
                key={item.title}
                data-reveal="rise"
                style={
                  { "--reveal-delay": `${index * 70}ms` } as CSSProperties
                }
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section" aria-labelledby="process-title">
        <div className="section-inner">
          <div className="section-heading split-heading" data-reveal="rise">
            <div>
              <p className="eyebrow">Consultation Journey</p>
              <h2 id="process-title">
                Your consultation comes before your treatment.
              </h2>
            </div>
            <p>
              Different concerns, and different people, need different
              approaches. Care begins with understanding what is happening
              before deciding what treatment may be appropriate.
            </p>
          </div>
          <div className="process-grid">
            {consultationJourneySteps.map((step, index) => (
              <article
                className="process-step"
                key={step.number}
                data-reveal="rise"
                style={
                  { "--reveal-delay": `${index * 80}ms` } as CSSProperties
                }
              >
                <span className="step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
          <a
            className="primary-button process-cta"
            href="#consultation"
            onClick={handleConsultationLinkClick}
            data-reveal="fade"
          >
            {requestConsultationLabel} <ArrowRight size={18} aria-hidden="true" />
          </a>
          <p className="medical-note" data-reveal="fade">
            Consultation helps determine which treatment pathway may be
            appropriate for your concern. Suitability and response vary.
          </p>
        </div>
      </section>

      <section className="reviews-section" aria-labelledby="reviews-title">
        <div className="section-inner">
          <div className="review-heading" data-reveal="rise">
            <div>
              <p className="eyebrow">Trusted by Patients</p>
              <h2 id="reviews-title">
                The experience matters as much as the plan.
              </h2>
            </div>
            <div className="review-score">
              <Image
                src="/brand/google.png"
                alt="Google"
                width={48}
                height={48}
                unoptimized
                loading="eager"
              />
              <span>4.8</span>
              <small>from 700+ reviews</small>
            </div>
          </div>
          <div
            className={`review-grid is-visible ${reviewsPaused ? "is-paused" : ""}`}
            data-reveal="rise"
            role="button"
            tabIndex={0}
            aria-pressed={reviewsPaused}
            aria-label={
              reviewsPaused
                ? "Resume testimonial scrolling"
                : "Pause testimonial scrolling"
            }
            onClick={() => setReviewsPaused((current) => !current)}
            onKeyDown={(event) => {
              if (event.key !== "Enter" && event.key !== " ") return;
              event.preventDefault();
              setReviewsPaused((current) => !current);
            }}
          >
            <div className="review-track">
              {[0, 1].map((groupIndex) => (
                <div
                  className="review-group"
                  key={groupIndex}
                  aria-hidden={groupIndex === 1}
                >
                  {reviews.map((review, index) => (
                    <blockquote
                      key={`${review.author}-${groupIndex}-${index}`}
                      style={
                        {
                          "--reveal-delay": `${index * 70}ms`,
                        } as CSSProperties
                      }
                    >
                      <span className="quote-mark" aria-hidden="true">
                        &quot;
                      </span>
                      <p>&quot;{review.quote}&quot;</p>
                      <footer>{review.author}</footer>
                    </blockquote>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <p className="medical-note" data-reveal="fade">
            Selected excerpts from patient reviews. Individual experiences and
            results vary.
          </p>
        </div>
      </section>

      <section className="faq-section" aria-labelledby="faq-title">
        <div className="section-inner faq-layout">
          <div className="faq-intro" data-reveal="left">
            <p className="eyebrow">Clear answers</p>
            <h2 id="faq-title">Questions before your first consultation.</h2>
            <p>
              These answers are general information. Your consultation
              determines what is appropriate for you.
            </p>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                className="faq-item"
                key={faq.question}
                data-reveal="right"
                style={
                  { "--reveal-delay": `${index * 60}ms` } as CSSProperties
                }
              >
                <button
                  className="faq-trigger"
                  type="button"
                  aria-expanded={openFaqIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() =>
                    setOpenFaqIndex((current) =>
                      current === index ? null : index,
                    )
                  }
                >
                  {faq.question}
                  <span aria-hidden="true">+</span>
                </button>
                <div
                  className="faq-answer"
                  id={`faq-answer-${index}`}
                  aria-hidden={openFaqIndex !== index}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta" aria-labelledby="final-cta-title">
        <Image
          src="/brand/clinic.jpg"
          alt="Reception at Dr. Nishita's Clinic in Banjara Hills"
          fill
          unoptimized
          loading="eager"
          sizes="100vw"
        />
        <div className="final-cta-inner" data-reveal="rise">
          <p className="eyebrow">Banjara Hills, Hyderabad</p>
          <h2 id="final-cta-title">
            Start with what you want to improve.
          </h2>
          <p>
            You don&apos;t need to know the procedure. Tell us what
            concerns you, and begin with a dermatologist-led assessment
            designed around your skin, face and individual goals.
          </p>
          <div className="cta-actions">
            <a
              className="primary-button"
              href="#consultation"
              onClick={handleConsultationLinkClick}
            >
              {requestConsultationLabel} <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              className="secondary-button"
              href={clinicWhatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} aria-hidden="true" /> WhatsApp the Clinic
            </a>
          </div>
        </div>
      </section>

      <section className="clinic-details" aria-label="Clinic details">
        <div className="section-inner">
          <div className="clinic-details-heading" data-reveal="rise">
            <p className="eyebrow">Skin | Hair | Aesthetics</p>
            <h2 id="clinic-info">Dr. Nishita&apos;s Clinic</h2>
            <p>Banjara Hills, Hyderabad</p>
          </div>
          <div className="details-grid">
            <div data-reveal="rise">
              <MapPin size={22} aria-hidden="true" />
              <h3>Visit the clinic</h3>
              <p>
                Road No. 7, 1st Floor, Sowbhagya Abode, beside Iran Embassy,
                Banjara Hills, Telangana 500034.
              </p>
            </div>
            <div
              data-reveal="rise"
              style={{ "--reveal-delay": "80ms" } as CSSProperties}
            >
              <Clock3 size={22} aria-hidden="true" />
              <h3>Clinic hours</h3>
              <p>Monday to Saturday, 10:00 AM to 7:00 PM. Sunday closed.</p>
            </div>
            <div
              data-reveal="rise"
              style={{ "--reveal-delay": "160ms" } as CSSProperties}
            >
              <MessageCircle size={22} aria-hidden="true" />
              <h3>Speak with the team</h3>
              <p>
                {clinicPhoneDisplay}
                <br />
                support@drnishitaranka.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="legal-section" aria-label="Privacy and terms">
        <div className="section-inner legal-grid">
          <div id="privacy" data-reveal="left">
            <h2>Privacy notice</h2>
            <p>
              Details entered in the consultation form are securely submitted
              to Dr. Nishita&apos;s Clinic and included in the WhatsApp message
              you choose to send. The clinic uses this information to respond
              to your enquiry and coordinate care. To request access,
              correction or deletion, email support@drnishitaranka.com.
            </p>
          </div>
          <div id="terms" data-reveal="right">
            <h2>Terms and medical note</h2>
            <p>
              This page provides general information and does not replace a
              medical consultation. Treatment suitability, recommendations,
              pricing, expected outcomes and treatment plans are determined
              following individual assessment. Individual results vary.
            </p>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-inner" data-reveal="fade">
          <div className="footer-brand">
            <Image
              src="/brand/logo.png"
              alt="Dr. Nishita's Clinic"
              width={500}
              height={89}
              unoptimized
              loading="eager"
            />
            <div className="footer-meta">
              <nav aria-label="Footer links">
                <a href="#doctor-title">About</a>
                <span aria-hidden="true">|</span>
                <a href="#concerns-title">Skin</a>
                <span aria-hidden="true">|</span>
                <a href="#concerns-title">Hair</a>
                <span aria-hidden="true">|</span>
                <a href="#brand-care-title">Aesthetics</a>
                <span aria-hidden="true">|</span>
                <a href="#clinic-info">Contact</a>
                <span aria-hidden="true">|</span>
                <a href="#privacy">Privacy Policy</a>
                <span aria-hidden="true">|</span>
                <a href="#terms">Terms &amp; Conditions</a>
              </nav>
              <p>(c) 2026 Dr. Nishita Ranka. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      <div
        className="sticky-form-spacer"
        aria-hidden="true"
        style={{
          height: stickyFormMounted ? `${stickyFormHeight}px` : "0px",
        }}
      />

      {stickyFormMounted && (
        <section
          id="mobile-consultation-sheet"
          ref={stickyFormRef}
          className={`sticky-consultation ${
            stickyFormHiding ? "is-hiding" : "is-showing"
          }`}
          aria-label="Sticky consultation form"
          data-testid="sticky-consultation"
        >
          <button
            ref={stickyCloseButtonRef}
            className="sticky-form-close"
            type="button"
            aria-label="Close sticky consultation form"
            title="Close"
            onClick={dismissStickyForm}
          >
            <X size={18} aria-hidden="true" />
          </button>
          <form
            className="sticky-consultation-form"
            onSubmit={handleSubmit}
            data-form-prefix="sticky-"
            noValidate
          >
            <div className="sticky-form-heading">
              <h2>Tell us what you&apos;d like to improve.</h2>
            </div>
            {consultationForm("sticky-")}
            <div className="sticky-form-submit">
              <button
                type="submit"
                data-testid="sticky-consultation-submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? "Saving your request..." : requestConsultationLabel}
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
            {errors.submit && (
              <p className="form-submit-error" role="alert">
                {errors.submit}
              </p>
            )}
            <p className="sticky-form-disclaimer">
              * By continuing, you agree to be contacted by the clinic.
            </p>
          </form>
        </section>
      )}

      <button
        ref={mobileCtaRef}
        className={`mobile-sticky-cta ${
          mobileCtaVisible ? "is-visible" : ""
        } is-${mobileCtaTone} ${stickyFormMounted ? "is-sheet-open" : ""}`}
        type="button"
        aria-controls="mobile-consultation-sheet"
        aria-expanded={mobileConsultationOpen}
        aria-hidden={!mobileCtaInteractive}
        tabIndex={mobileCtaInteractive ? undefined : -1}
        onClick={openMobileConsultation}
      >
        {requestConsultationLabel} <ArrowRight size={18} aria-hidden="true" />
      </button>

      {isBookingModalOpen && (
        <div
          className="booking-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsBookingModalOpen(false);
            }
          }}
        >
          <div
            className="booking-modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Book a consultation"
          >
            <button
              ref={bookingCloseButtonRef}
              type="button"
              className="booking-modal-close"
              onClick={() => setIsBookingModalOpen(false)}
              aria-label="Close"
            >
              <X size={20} aria-hidden="true" />
            </button>
            <form
              className="consultation-form booking-modal-form"
              onSubmit={handleSubmit}
              data-form-prefix="modal-"
              noValidate
            >
              <div className="form-heading">
                <h2>Tell us what you&apos;d like to improve.</h2>
                <p>Three details. Less than a minute.</p>
              </div>
              {consultationForm("modal-")}
              <div className="form-submit">
                <button
                  type="submit"
                  data-testid="booking-modal-submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? "Saving your request..." : requestConsultationLabel}
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
              {errors.submit && (
                <p className="form-submit-error" role="alert">
                  {errors.submit}
                </p>
              )}
              <p className="form-disclaimer">
                * By continuing, you agree to be contacted by the clinic.
              </p>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
