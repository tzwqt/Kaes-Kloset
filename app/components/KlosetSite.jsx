"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Script from "next/script";
import Image from "next/image";

// ─── DATA ────────────────────────────────────────────────────────────────────

const services = [
  {
    title: "Appointment-Based Curated Styling",
    price: "$15–$50",
    unit: " fee",
    badge: "Applied toward purchase",
    description: "Complete a consultation form, then arrive for a 1-hour personalized session with 4–8 curated selections hand-picked for your occasion and style.",
    experience: ["Lavender consultation cards + gold clips", "Black folders for your look profile", "Curated racks preset before you arrive"],
    icon: "✦",
  },
  {
    title: "Curated Outfit Packs",
    price: "$80–$350",
    unit: "/look",
    description: "Ready-made outfit sets styled for birthdays, date nights, photoshoots, vacations, professional looks, and glam events.",
    experience: ["Branded lavender tags + gold detailing", "Packaged and presentation-ready", "Styled for your exact occasion"],
    icon: "◈",
  },
  {
    title: "Off-the-Rack Boutique Shopping",
    price: "$35+",
    unit: "",
    description: "Browse our seasonal, trendy, and premium pieces. Tops $35–$120 · Bottoms $40–$150 · Dresses $45–$250 · Suits $45–$250.",
    experience: ["Black shelves + lavender ambient lighting", "Gold accent price tags throughout", "Walk-ins always welcome"],
    icon: "◇",
  },
  {
    title: "Personal Styling Add-Ons",
    price: "Custom",
    unit: "",
    description: "Wardrobe revamps, photoshoot styling, event styling, and group looks — bridal parties, birthday groups, and more.",
    experience: ["Full wardrobe audits + rebuilds", "On-location photoshoot + event styling", "Group looks for bridal, birthday & more"],
    icon: "❖",
  },
];

const koreValues = [
  {
    title: "Konfidence",
    description: "Every client walks out feeling like the best version of themselves — inside and out.",
    icon: "✦",
  },
  {
    title: "Intentionality",
    description: "Every look is curated with purpose — nothing about your style is accidental.",
    icon: "◈",
  },
  {
    title: "Excellence",
    description: "Premium pieces, high-quality service, and an unmatched boutique experience — every time.",
    icon: "◇",
  },
  {
    title: "Individuality",
    description: "Your story is your style. We celebrate what makes you uniquely, beautifully you.",
    icon: "❖",
  },
  {
    title: "Faith & Purpose",
    description: "Rooted in the belief that each person is fearfully and wonderfully made (Psalm 139:14).",
    icon: "✧",
  },
];

const team = [
  {
    name: "Kaelyn Charles",
    role: "CEO / Founder",
    bio: "Kaelyn is the visionary behind Kae's Kloset — a stylist, entrepreneur, and answered prayer to every client she serves. Her mission: confidence, style, and transformation.",
    image: "/team/kaelyn-charles.jpg",
  },
  { name: "Abena Pokua", role: "Chief Operating Officer", image: "/team/abena-pokua.png" },
  { name: "AJ Charles", role: "Chief Finance Officer", image: "/team/aj-charles.png" },
  { name: "Abrielle Lewis", role: "Chief of Staff", image: "/team/abrielle-lewis.jpg" },
  { name: "Jada Edwards", role: "Hair Salon Owner / Co-Partner", image: "/team/jada-edwards.jpg" },
  { name: "Tiffany Charles", role: "Human Resources", image: "/team/tiffany-charles.jpg" },
  { name: "Damaris Young", role: "Executive Creative Director", image: "/team/damaris-young.png" },
  { name: "Ja'Lynn Manson", role: "Head Stylist Consultant", image: "/team/jalynn-manson.jpg" },
  { name: "Kayla Charles", role: "Graphics", image: "/team/kayla-charles.png" },
];

const testimonials = [
  { name: "Client Name", quote: "Testimonials coming soon — check back shortly!", role: "Client" },
  { name: "Client Name", quote: "Testimonials coming soon — check back shortly!", role: "Client" },
  { name: "Client Name", quote: "Testimonials coming soon — check back shortly!", role: "Client" },
];

// ─── FADE-UP WRAPPER ─────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── FORM HELPERS ────────────────────────────────────────────────────────────

const inputProps = {
  style: { background: "var(--bg-base)", border: "1px solid var(--border)", color: "var(--text-primary)" },
  className: "w-full rounded-lg px-4 py-3 text-sm outline-none transition-colors",
  onFocus: (e) => (e.currentTarget.style.borderColor = "var(--lavender)"),
  onBlur: (e) => (e.currentTarget.style.borderColor = "var(--border)"),
};

function FormField({ label, hint, children }) {
  return (
    <div>
      <label className="block text-xs mb-2 tracking-wide" style={{ color: "var(--text-muted)" }}>
        {label}{hint && <span className="ml-1" style={{ color: "var(--text-faint)" }}>({hint})</span>}
      </label>
      {children}
    </div>
  );
}

// ─── PERSON ICON ─────────────────────────────────────────────────────────────

function PersonIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--lavender-light)" strokeWidth="1.2">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

// ─── THEME TOGGLE ─────────────────────────────────────────────────────────────

function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      style={{ color: "var(--lavender-light)", border: "1px solid var(--border)" }}
      className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
    >
      {dark ? (
        // Sun icon
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        // Moon icon
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
        </svg>
      )}
    </button>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function KlosetSite() {
  const [dark, setDark] = useState(true);
  const [formData, setFormData] = useState({
    name: "", dob: "", age: "", email: "", phone: "",
    sizeTop: "", sizeBottom: "", sizeDress: "", sizeShoe: "",
    occasion: "", favoriteColor: "", musicGenre: "", favoriteCandy: "",
    service: "", message: "",
  });
  const [stylePrefs, setStylePrefs] = useState([]);

  const styleOptions = ["Casual", "Elegant", "Bold", "Minimalist", "Trendy", "Sexy", "Streetwear", "Business Chic"];

  function toggleStyle(s) {
    setStylePrefs((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  }

  function field(key) {
    return {
      value: formData[key],
      onChange: (e) => setFormData((d) => ({ ...d, [key]: e.target.value })),
    };
  }
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Apply theme to root element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  // Initialize to dark on mount
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Values", id: "values" },
    { label: "Team", id: "team" },
    { label: "Services", id: "services" },
    { label: "Work", id: "work" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Book", id: "book" },
  ];

  // Shared inline style shortcuts
  const card = {
    background: "var(--bg-raised)",
    border: "1px solid var(--border)",
  };

  return (
    <div style={{ background: "var(--bg-base)", color: "var(--text-primary)" }} className="min-h-screen font-sans antialiased transition-colors duration-300">

      {/* ── ANNOUNCEMENT STRIP ── */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center gap-3 py-2 text-[11px] tracking-[0.18em] uppercase overflow-hidden whitespace-nowrap"
        style={{ background: "var(--lavender)", color: "#fff", borderBottom: "1px solid var(--gold)", boxShadow: "0 1px 0 0 var(--gold)" }}
      >
        <span style={{ color: "var(--gold)" }}>✦</span>
        <span style={{ color: "var(--gold)", opacity: 0.6 }}>✦</span>
        <span style={{ color: "var(--gold)", opacity: 0.3 }}>✦</span>
        <span>Now Featuring: Lavender Luxe Looks</span>
        <span className="hidden sm:inline" style={{ color: "var(--gold)", opacity: 0.8 }}>✦</span>
        <span className="hidden sm:inline" style={{ opacity: 0.75 }}>Golden Hour Glam Coming This Month</span>
        <span className="hidden sm:inline" style={{ color: "var(--gold)", opacity: 0.3 }}>✦</span>
        <span className="hidden sm:inline" style={{ color: "var(--gold)", opacity: 0.6 }}>✦</span>
        <span style={{ color: "var(--gold)" }}>✦</span>
      </div>

      {/* ── NAV ── */}
      <header style={{ background: "var(--bg-base)", borderBottom: "1px solid var(--border)" }} className="fixed top-[34px] left-0 right-0 z-50 backdrop-blur-md bg-opacity-90">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="flex items-center">
            <img
              src={dark ? "/logo-gold.png" : "/logo-lavender.png"}
              alt="Kae's Kloset"
              className="h-10 w-auto"
            />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7 text-sm" style={{ color: "var(--text-muted)" }}>
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="transition-colors hover:opacity-100"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lavender-light)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {l.label}
              </button>
            ))}
            <ThemeToggle dark={dark} onToggle={() => setDark((d) => !d)} />
          </nav>

          {/* Mobile row */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle dark={dark} onToggle={() => setDark((d) => !d)} />
            <button style={{ color: "var(--lavender-light)" }} onClick={() => setMenuOpen((o) => !o)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                {menuOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                  : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
                }
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ borderTop: "1px solid var(--border)", background: "var(--bg-base)" }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-4 text-sm">
                {navLinks.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => scrollTo(l.id)}
                    className="text-left transition-colors"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-[calc(5rem+34px)] overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none" style={{ background: "var(--glow-1)" }} />
        <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none" style={{ background: "var(--glow-2)" }} />
        {/* Gold sparkle accents */}
        <div className="absolute top-[22%] left-[12%] pointer-events-none select-none" style={{ color: "var(--gold)", opacity: 0.35, fontSize: "1.5rem" }}>✦</div>
        <div className="absolute top-[18%] right-[16%] pointer-events-none select-none" style={{ color: "var(--gold)", opacity: 0.2, fontSize: "0.75rem" }}>✦</div>
        <div className="absolute top-[55%] right-[10%] pointer-events-none select-none" style={{ color: "var(--gold)", opacity: 0.25, fontSize: "1rem" }}>◈</div>
        <div className="absolute bottom-[28%] left-[8%] pointer-events-none select-none" style={{ color: "var(--gold)", opacity: 0.18, fontSize: "0.65rem" }}>✦</div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <img
            src={dark ? "/logo-gold.png" : "/logo-lavender.png"}
            alt="Kae's Kloset"
            className="h-36 md:h-48 w-auto mx-auto"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-sm tracking-[0.2em] uppercase mb-6"
          style={{ color: "var(--gold)" }}
        >
          Lavender Luxe · Golden Hour Glam · Kustomized for You
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.05]"
          style={{ color: "var(--text-primary)" }}
        >
          Fearfully &amp;
          <br />
          <span className="italic font-light" style={{ color: "var(--lavender-light)" }}>Wonderfully Styled.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 text-lg max-w-lg mx-auto leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          A boutique designed to celebrate your individuality — appointment-based styling, curated looks, and premium pieces crafted to make you feel fearfully and wonderfully made.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => scrollTo("book")}
            style={{ background: "var(--lavender)", color: "#fff" }}
            className="px-8 py-3.5 text-sm rounded-full transition-opacity hover:opacity-90"
          >
            Book your Konsultation
          </button>
          <button
            onClick={() => scrollTo("services")}
            style={{ border: "1px solid var(--border-strong)", color: "var(--lavender-light)" }}
            className="px-8 py-3.5 text-sm rounded-full transition-opacity hover:opacity-80"
          >
            View Services
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-px h-12 mx-auto" style={{ background: "linear-gradient(to bottom, var(--lavender-light), transparent)", opacity: 0.4 }} />
        </motion.div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section id="about" className="py-24 px-6" style={{ background: "var(--bg-surface)" }}>
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <p className="text-xs tracking-[0.2em] uppercase text-center mb-4" style={{ color: "var(--lavender-light)" }}>Our Purpose</p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-center mb-16" style={{ color: "var(--text-primary)" }}>
              Mission &amp; Vision
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeUp delay={0.1}>
              <div style={{ ...card, borderTop: "2px solid var(--gold)" }} className="rounded-2xl p-8 h-full">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-5" style={{ background: "var(--gold-dim)" }}>
                  <span style={{ color: "var(--gold)" }} className="text-lg">◈</span>
                </div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--lavender-light)" }}>Our Mission</h3>
                <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  To provide high-quality, stylish, and unique fashion pieces paired with an unmatched personalized shopping experience — where confidence, creativity, and individuality are celebrated.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div style={{ ...card, borderTop: "2px solid var(--gold)" }} className="rounded-2xl p-8 h-full">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-5" style={{ background: "var(--gold-dim)" }}>
                  <span style={{ color: "var(--gold)" }} className="text-lg">✦</span>
                </div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--lavender-light)" }}>Our Vision</h3>
                <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  To cultivate a boutique experience where every client is seen, valued, and celebrated as the beautifully unique individual God created them to be — because each person is &ldquo;fearfully and wonderfully made&rdquo; (Psalm 139:14). Kae&apos;s Kloset exists to reflect this truth through curated wardrobe experiences that highlight each client&apos;s God-given beauty, confidence, and purpose.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── KORE VALUES ── */}
      <section id="values" className="py-24 px-6" style={{ background: "var(--bg-base)" }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <p className="text-xs tracking-[0.2em] uppercase text-center mb-4" style={{ color: "var(--lavender-light)" }}>What We Stand For</p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-center mb-16" style={{ color: "var(--text-primary)" }}>
              Kore Values
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-6 gap-6">
            {/* Row 1 — 3 values */}
            {koreValues.slice(0, 3).map((v, i) => (
              <FadeUp key={i} delay={i * 0.08} className="sm:col-span-2">
                <div style={{ ...card, borderTop: "2px solid var(--gold)" }} className="rounded-2xl p-7 h-full">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mb-5" style={{ background: "var(--gold-dim)" }}>
                    <span style={{ color: "var(--gold)" }} className="text-lg">{v.icon}</span>
                  </div>
                  <h3 className="font-semibold text-base mb-3" style={{ color: "var(--text-primary)" }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{v.description}</p>
                </div>
              </FadeUp>
            ))}
            {/* Row 2 — 2 values centered */}
            <FadeUp key={3} delay={3 * 0.08} className="sm:col-span-2 sm:col-start-2">
              <div style={{ ...card, borderTop: "2px solid var(--gold)" }} className="rounded-2xl p-7 h-full">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-5" style={{ background: "var(--gold-dim)" }}>
                  <span style={{ color: "var(--gold)" }} className="text-lg">{koreValues[3].icon}</span>
                </div>
                <h3 className="font-semibold text-base mb-3" style={{ color: "var(--text-primary)" }}>{koreValues[3].title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{koreValues[3].description}</p>
              </div>
            </FadeUp>
            <FadeUp key={4} delay={4 * 0.08} className="sm:col-span-2">
              <div style={{ ...card, borderTop: "2px solid var(--gold)" }} className="rounded-2xl p-7 h-full">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-5" style={{ background: "var(--gold-dim)" }}>
                  <span style={{ color: "var(--gold)" }} className="text-lg">{koreValues[4].icon}</span>
                </div>
                <h3 className="font-semibold text-base mb-3" style={{ color: "var(--text-primary)" }}>{koreValues[4].title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{koreValues[4].description}</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── MEET THE CEO ── */}
      <section className="py-24 px-6" style={{ background: "var(--bg-base)" }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <p className="text-xs tracking-[0.2em] uppercase text-center mb-4" style={{ color: "var(--lavender-light)" }}>The Visionary</p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-center mb-16" style={{ color: "var(--text-primary)" }}>
              Meet the CEO
            </h2>
          </FadeUp>

          <div className="flex flex-col gap-10">

            {/* ── Welcome Video ── */}
            <FadeUp delay={0.1}>
              {/* TODO: Replace this placeholder with an <iframe> embed once Kaelyn shares her video link */}
              <div
                style={{ ...card, borderTop: "2px solid var(--gold)", position: "relative", overflow: "hidden" }}
                className="w-full rounded-2xl aspect-video flex items-center justify-center"
              >
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, var(--bg-raised) 60%, var(--lavender-dim))" }} />
                {/* Decorative corner sparkles */}
                <span className="absolute top-4 left-5 text-sm pointer-events-none select-none" style={{ color: "var(--gold)", opacity: 0.4 }}>✦</span>
                <span className="absolute bottom-4 right-5 text-xs pointer-events-none select-none" style={{ color: "var(--gold)", opacity: 0.3 }}>◈</span>
                <div className="relative flex flex-col items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "var(--gold)", boxShadow: "0 0 32px var(--gold-dim)" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Welcome from Kaelyn</p>
                  <p className="text-xs tracking-[0.15em] uppercase" style={{ color: "var(--text-faint)" }}>Video coming soon</p>
                </div>
              </div>
            </FadeUp>

            {/* ── Bio ── */}
            <FadeUp delay={0.2} className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Kaelyn Charles</h3>
                <p className="text-sm tracking-wide mb-6" style={{ color: "var(--lavender-light)" }}>Founder &amp; Owner · Kae&apos;s Kloset</p>
                <p className="leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                  Kaelyn Charles is more than a stylist — she is an answered prayer to every client she serves. With an eye for detail, a heart for people, and a gift for transformation, Kaelyn built Kae&apos;s Kloset on the belief that every person is &ldquo;fearfully and wonderfully made.&rdquo;
                </p>
                <p className="leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
                  From curated outfit sessions to full boutique experiences, she approaches every engagement as a calling — not just a service. Her boutique is a space where confidence, creativity, and individuality are always celebrated.
                </p>
                <div className="flex flex-wrap gap-4 text-sm" style={{ color: "var(--text-muted)" }}>
                  <a href="mailto:kaeskustomkloset@gmail.com" className="flex items-center gap-2 transition-colors" style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lavender-light)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>
                    ✉ kaeskustomkloset@gmail.com
                  </a>
                  <a href="tel:8327752279" className="flex items-center gap-2 transition-colors" style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lavender-light)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>
                    📱 (832) 775-2279
                  </a>
                  <a href="https://instagram.com/kaesk_loset" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors" style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lavender-light)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>
                    📸 @kaesk_loset
                  </a>
                </div>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ── MEET THE TEAM ── */}
      <section id="team" className="py-24 px-6" style={{ background: "var(--bg-surface)" }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <p className="text-xs tracking-[0.2em] uppercase text-center mb-4" style={{ color: "var(--lavender-light)" }}>The Dream Team</p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-center mb-4" style={{ color: "var(--text-primary)" }}>
              Meet the Team
            </h2>
            <p className="text-center text-sm mb-16" style={{ color: "var(--text-muted)" }}>The people behind the Kloset.</p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div
                  style={i === 0 ? { ...card, borderTop: "2px solid var(--gold)" } : card}
                  className="rounded-2xl p-6 text-center h-full"
                >
                  <div
                    className="rounded-full mx-auto mb-4 relative overflow-hidden"
                    style={i === 0
                      ? { width: 96, height: 96, border: "2px solid var(--gold)", background: "var(--gold-dim)" }
                      : { width: 80, height: 80, border: "1px solid var(--border-strong)", background: "var(--bg-surface)" }
                    }
                  >
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        style={{ objectFit: "cover", objectPosition: "center top" }}
                        sizes="96px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <PersonIcon />
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-base mb-1" style={{ color: "var(--text-primary)" }}>{member.name}</h3>
                  <p className="text-xs tracking-wide mb-3" style={{ color: i === 0 ? "var(--gold)" : "var(--lavender-light)" }}>{member.role}</p>
                  {member.bio && <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{member.bio}</p>}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 px-6" style={{ background: "var(--bg-base)" }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <p className="text-xs tracking-[0.2em] uppercase text-center mb-4" style={{ color: "var(--lavender-light)" }}>What We Offer</p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-center mb-4" style={{ color: "var(--text-primary)" }}>
              Services &amp; Pricing
            </h2>
            <p className="text-center text-sm mb-16" style={{ color: "var(--text-muted)" }}>
              Appointment fees of $15–$50 are applied toward your purchase. Walk-ins always welcome.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {services.map((s, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div style={{ ...card, borderTop: "2px solid var(--gold)" }} className="rounded-2xl p-7 h-full flex flex-col">
                  <span style={{ color: "var(--gold)" }} className="text-xl">{s.icon}</span>
                  <h3 className="font-semibold text-base mt-4 mb-1" style={{ color: "var(--text-primary)" }}>{s.title}</h3>
                  {s.badge && <span className="text-[10px] italic tracking-wide" style={{ color: "var(--text-muted)" }}>{s.badge}</span>}
                  <p className="text-3xl font-light mt-3 mb-1" style={{ color: "var(--text-primary)" }}>
                    {s.price}<span className="text-base" style={{ color: "var(--text-muted)" }}>{s.unit}</span>
                  </p>
                  <p className="text-sm mt-3 leading-relaxed" style={{ color: "var(--text-muted)" }}>{s.description}</p>
                  {s.experience && (
                    <div className="mt-5 pt-5 space-y-2" style={{ borderTop: "1px solid var(--border)" }}>
                      <p className="text-[10px] tracking-[0.15em] uppercase mb-3" style={{ color: "var(--gold)" }}>The Experience</p>
                      {s.experience.map((e, j) => (
                        <div key={j} className="flex items-start gap-2.5 text-xs" style={{ color: "var(--text-muted)" }}>
                          <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--gold)" }} />
                          {e}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Holy Hands Inc. */}
          <FadeUp delay={0.35}>
            <div style={{ ...card, borderTop: "2px solid var(--gold)" }} className="rounded-2xl p-7">
              <span style={{ color: "var(--gold)" }} className="text-xl">✧</span>
              <h3 className="font-semibold text-base mt-4" style={{ color: "var(--text-primary)" }}>Holy Hands Co.</h3>
              <p className="text-xs tracking-wide mt-1 mb-6" style={{ color: "var(--text-muted)" }}>Hair &amp; Makeup Services</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase mb-3" style={{ color: "var(--lavender-light)" }}>Makeup</p>
                  <p className="text-3xl font-light mb-4" style={{ color: "var(--text-primary)" }}>$50–$85</p>
                  <div className="space-y-2">
                    {["Natural Glam", "Soft Glam", "Full Glam"].map((g) => (
                      <div key={g} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--lavender)" }} />
                        {g}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase mb-3" style={{ color: "var(--lavender-light)" }}>Hair</p>
                  <p className="text-3xl font-light mb-4" style={{ color: "var(--text-primary)" }}>$70–$250</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>Pricing varies depending on the style selected.</p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── PORTFOLIO & INSTAGRAM ── */}
      <section id="work" className="py-24 px-6" style={{ background: "var(--bg-surface)" }}>
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <FadeUp>
            <p className="text-xs tracking-[0.2em] uppercase text-center mb-4" style={{ color: "var(--lavender-light)" }}>Portfolio</p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-center mb-3" style={{ color: "var(--text-primary)" }}>
              Lavender Luxe Looks
            </h2>
            <p className="text-center text-sm mb-6" style={{ color: "var(--text-muted)" }}>
              Our curated aesthetic — lavender, gold, and everything elevated.
            </p>
            <div className="flex justify-center mb-16">
              <a
                href="https://instagram.com/kaesk_loset"
                target="_blank"
                rel="noopener noreferrer"
                style={{ border: "1px solid var(--border-strong)", color: "var(--lavender-light)" }}
                className="flex items-center gap-2 px-5 py-2 rounded-full text-xs tracking-wide transition-opacity hover:opacity-80"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
                @kaesk_loset
              </a>
            </div>
          </FadeUp>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
            {[
              { span: "col-span-2", h: "h-64", label: "Lavender Luxe Looks" },
              { span: "",           h: "h-64", label: "Golden Hour Glam" },
              { span: "",           h: "h-44", label: "Streetwear Edit" },
              { span: "",           h: "h-44", label: "Business Chic" },
              { span: "col-span-2", h: "h-44", label: "Curated Pack — Date Night" },
            ].map((cell, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <div
                  style={{ ...card, position: "relative", overflow: "hidden" }}
                  className={`rounded-xl flex items-end ${cell.span} ${cell.h}`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-faint)" strokeWidth="1.2">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </div>
                  <div className="relative w-full px-4 py-3" style={{ background: "linear-gradient(to top, var(--bg-surface) 60%, transparent)" }}>
                    <p className="text-[10px] tracking-[0.15em] uppercase" style={{ color: "var(--gold)" }}>{cell.label}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Monthly themes */}
          <FadeUp delay={0.2}>
            <div style={{ border: "1px solid var(--border)" }} className="rounded-2xl p-8">
              <p className="text-[10px] tracking-[0.2em] uppercase mb-5" style={{ color: "var(--gold)" }}>Monthly Themes</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { month: "Jan", theme: "New Year, New You" },
                  { month: "Feb", theme: "Golden Hour Glam" },
                  { month: "Mar", theme: "Spring Luxe Edit" },
                  { month: "Apr", theme: "Lavender Luxe Looks" },
                  { month: "May", theme: "Bold & Beautiful" },
                  { month: "Jun", theme: "Summer Streetwear" },
                  { month: "Jul", theme: "Vacation Mode" },
                  { month: "Aug", theme: "Back to Business Chic" },
                ].map(({ month, theme }) => (
                  <div key={month} className="rounded-xl px-4 py-3" style={{ background: "var(--lavender-dim)" }}>
                    <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>{month}</p>
                    <p className="text-xs leading-snug" style={{ color: "var(--text-muted)" }}>{theme}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-24 px-6" style={{ background: "var(--bg-base)" }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <p className="text-xs tracking-[0.2em] uppercase text-center mb-4" style={{ color: "var(--lavender-light)" }}>What Clients Say</p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-center mb-4" style={{ color: "var(--text-primary)" }}>
              Testimonials
            </h2>
            <p className="text-center text-sm mb-16" style={{ color: "var(--text-muted)" }}>Client testimonials coming soon.</p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div style={{ ...card, borderTop: "2px solid var(--gold)" }} className="rounded-2xl p-7 h-full flex flex-col">
                  <span className="text-3xl leading-none mb-4" style={{ color: "var(--gold)" }}>&ldquo;</span>
                  <p className="text-sm leading-relaxed flex-1 italic" style={{ color: "var(--text-muted)" }}>{t.quote}</p>
                  <div className="mt-6 pt-5" style={{ borderTop: "1px solid var(--border)" }}>
                    <p className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>{t.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{t.role}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOK YOUR KONSULTATION ── */}
      <section id="book" className="py-24 px-6" style={{ background: "var(--bg-surface)" }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <p className="text-xs tracking-[0.2em] uppercase text-center mb-4" style={{ color: "var(--lavender-light)" }}>Let&apos;s Connect</p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-center mb-4" style={{ color: "var(--text-primary)" }}>
              Book with Kae
            </h2>
            <p className="text-center text-sm mb-12" style={{ color: "var(--text-muted)" }}>
              Choose your session below — payment is collected securely at checkout via PayPal.
            </p>
          </FadeUp>

          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* ── Konsultation — inline Calendly embed ── */}
            <FadeUp delay={0.1} className="flex-1 min-w-0">
              <div style={{ ...card, borderTop: "2px solid var(--gold)", overflow: "hidden" }} className="rounded-2xl">
                <div className="px-6 pt-6 pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
                  <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: "var(--gold)" }}>New Klients</p>
                  <h3 className="font-semibold text-lg" style={{ color: "var(--text-primary)" }}>Konsultation — 30 min</h3>
                  <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Booking fee applied toward your purchase · Powered by Calendly</p>
                </div>
                <div
                  className="calendly-inline-widget"
                  data-url="https://calendly.com/kaeskustomkloset/30min"
                  style={{ minWidth: "320px", height: "700px" }}
                />
              </div>
            </FadeUp>

            {/* ── Styling & Event Meeting — link card ── */}
            <FadeUp delay={0.2} className="w-full lg:w-80 flex-shrink-0">
              <div style={{ ...card, borderTop: "2px solid var(--lavender-light)" }} className="rounded-2xl p-7">
                <p className="text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: "var(--lavender-light)" }}>Existing Klients</p>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-5" style={{ background: "var(--lavender-dim)" }}>
                  <span style={{ color: "var(--lavender-light)" }} className="text-lg">◈</span>
                </div>
                <h3 className="font-semibold text-base mb-2" style={{ color: "var(--text-primary)" }}>Styling &amp; Event Meeting</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                  A focused session for photoshoots, events, and occasion styling — to lock in every detail before your look comes to life.
                </p>
                <ul className="space-y-2 mb-8">
                  {["Photoshoot prep & planning", "Event &amp; occasion styling", "Look confirmations &amp; details"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs" style={{ color: "var(--text-muted)" }}>
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--lavender-light)" }} />
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
                <a
                  href="https://calendly.com/kaeskustomkloset/styling-event-meeting"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: "var(--lavender)", color: "#fff" }}
                  className="block text-center w-full py-3 text-sm rounded-full transition-opacity hover:opacity-90 font-medium"
                >
                  Schedule a Meeting
                </a>
              </div>
            </FadeUp>

          </div>
        </div>

        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid var(--border)", background: "var(--bg-base)" }} className="px-6 py-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <div className="text-center md:text-left">
            <img
              src={dark ? "/logo-gold.png" : "/logo-lavender.png"}
              alt="Kae's Kloset"
              className="h-16 w-auto mx-auto md:mx-0 mb-2"
            />
            <p className="text-xs" style={{ color: "var(--text-faint)" }}>A Kustom store with a Kustomizable experience.</p>
          </div>

          <div className="flex flex-col items-center gap-1 text-xs" style={{ color: "var(--text-faint)" }}>
            <a href="mailto:kaeskustomkloset@gmail.com" className="transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lavender-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-faint)")}>
              kaeskustomkloset@gmail.com
            </a>
            <a href="tel:8327752279" className="transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lavender-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-faint)")}>
              (832) 775-2279
            </a>
          </div>

          <div className="flex gap-6 text-xs" style={{ color: "var(--text-faint)" }}>
            <a href="https://instagram.com/kaesk_loset" target="_blank" rel="noopener noreferrer" className="transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lavender-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-faint)")}>
              Instagram
            </a>
          </div>
        </div>
        <p className="text-center text-xs mt-8" style={{ color: "var(--text-faint)" }}>© 2026 Kae&apos;s Kloset. All rights reserved.</p>
      </footer>

    </div>
  );
}
