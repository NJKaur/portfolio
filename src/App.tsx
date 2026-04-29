import { useState, useEffect, useRef } from "react";

const p = {
  sage: "#7A816C",
  sageLight: "#ECEEE9",
  sageMid: "#5E6455",
  rose: "#D1A9A5",
  roseLight: "#F5EDEC",
  roseMid: "#B8887F",
  rust: "#AE6965",
  rustLight: "#F2E6E5",
  oak: "#A58B71",
  oakLight: "#F0EBE4",
  bone: "#E5DFD6",
  dark: "#2D2926",
  muted: "#7A716A",
  cream: "#F5F1EC",
  brown: "#5C3D2E",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: #F5F1EC; color: #2D2926; overflow-x: hidden; }

  /* FADE-IN ANIMATION SYSTEM */
  .fade-up {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .delay-1 { transition-delay: 0.1s; }
  .delay-2 { transition-delay: 0.2s; }
  .delay-3 { transition-delay: 0.3s; }
  .delay-4 { transition-delay: 0.4s; }
  .delay-5 { transition-delay: 0.5s; }
  .delay-6 { transition-delay: 0.6s; }

  /* NAVBAR */
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(245,241,236,0.92); backdrop-filter: blur(12px);
    border-bottom: 1px solid #E5DFD6;
    padding: 0 48px; display: flex; justify-content: space-between; align-items: center; height: 60px;
    transition: box-shadow 0.3s;
  }
  .navbar.scrolled { box-shadow: 0 2px 20px rgba(45,41,38,0.06); }
  .nav-logo { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: #2D2926; cursor: pointer; }
  .nav-links { display: flex; gap: 32px; list-style: none; }
  .nav-links a {
    font-size: 13px; color: #7A716A; text-decoration: none; font-weight: 500;
    transition: color 0.2s; letter-spacing: 0.02em;
    position: relative;
  }
  .nav-links a::after {
    content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 1.5px;
    background: #AE6965; transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .nav-links a:hover { color: #2D2926; }
  .nav-links a:hover::after { width: 100%; }
  .nav-links a.active { color: #5C3D2E; font-weight: 600; }
  .nav-links a.active::after { width: 100%; background: #5C3D2E; }

  /* SECTIONS */
  .section { padding: 100px 48px; max-width: 1100px; margin: 0 auto; }

  /* HERO */
  .hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 120px 48px 80px; max-width: 1100px; margin: 0 auto; }
  .hero-greeting {
    font-size: 14px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase;
    color: #7A816C; margin-bottom: 16px;
    opacity: 0; animation: heroFadeUp 0.8s 0.2s cubic-bezier(0.22,1,0.36,1) forwards;
  }
  .hero-punjabi {
    font-family: 'Playfair Display', serif; font-size: 80px; font-weight: 700;
    color: #2D2926; line-height: 1; margin-bottom: 8px;
    opacity: 0; animation: heroFadeUp 0.8s 0.35s cubic-bezier(0.22,1,0.36,1) forwards;
  }
  .hero-english {
    font-size: 14px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase;
    color: #7A716A; margin-bottom: 32px;
    opacity: 0; animation: heroFadeUp 0.8s 0.45s cubic-bezier(0.22,1,0.36,1) forwards;
  }
  .hero-tagline {
    font-family: 'Playfair Display', serif; font-size: 26px; font-style: italic;
    color: #A58B71; margin-bottom: 24px; max-width: 600px; line-height: 1.4;
    opacity: 0; animation: heroFadeUp 0.8s 0.55s cubic-bezier(0.22,1,0.36,1) forwards;
  }
  .hero-body {
    font-size: 16px; color: #7A716A; line-height: 1.8; max-width: 580px; margin-bottom: 40px;
    opacity: 0; animation: heroFadeUp 0.8s 0.65s cubic-bezier(0.22,1,0.36,1) forwards;
  }
  .hero-btns {
    display: flex; gap: 16px; flex-wrap: wrap;
    opacity: 0; animation: heroFadeUp 0.8s 0.75s cubic-bezier(0.22,1,0.36,1) forwards;
  }
  .hero-scroll {
    margin-top: 80px; font-size: 12px; color: #D1A9A5; letter-spacing: 0.12em; text-transform: uppercase;
    opacity: 0; animation: heroFadeUp 0.8s 0.9s cubic-bezier(0.22,1,0.36,1) forwards;
  }
  @keyframes heroFadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* BUTTONS */
  .btn-primary {
    background: #5C3D2E; color: #F5F1EC; border: none; border-radius: 4px;
    padding: 14px 32px; font-size: 14px; font-weight: 600; cursor: pointer;
    font-family: 'DM Sans', sans-serif; letter-spacing: 0.03em;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(92,61,46,0.25); }
  .btn-outline {
    background: transparent; color: #5C3D2E; border: 1.5px solid #5C3D2E;
    border-radius: 4px; padding: 14px 32px; font-size: 14px; font-weight: 600;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
  }
  .btn-outline:hover { background: #5C3D2E; color: #F5F1EC; transform: translateY(-2px); }

  /* SECTION HEADINGS */
  .section-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #7A816C; margin-bottom: 12px; }
  .section-title { font-family: 'Playfair Display', serif; font-size: 42px; font-weight: 700; color: #2D2926; line-height: 1.15; margin-bottom: 20px; }
  .section-subtitle { font-size: 16px; color: #7A716A; line-height: 1.7; max-width: 600px; }
  .divider { width: 48px; height: 2px; background: #D1A9A5; margin: 24px 0; }

  /* ABOUT */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; margin-top: 60px; }
  .about-text p { font-size: 15px; color: #7A716A; line-height: 1.85; margin-bottom: 20px; }
  .about-text p strong { color: #2D2926; font-weight: 600; }
  .about-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 40px; }
  .stat-box {
    background: white; border: 1px solid #E5DFD6; border-radius: 8px; padding: 20px;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .stat-box:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(45,41,38,0.06); }
  .stat-num { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: #AE6965; margin-bottom: 4px; }
  .stat-label { font-size: 12px; color: #7A716A; font-weight: 500; line-height: 1.4; }
  .about-details { display: flex; flex-direction: column; gap: 16px; }
  .detail-card {
    background: white; border: 1px solid #E5DFD6; border-radius: 8px; padding: 20px 24px;
    transition: border-color 0.3s;
  }
  .detail-card:hover { border-color: #D1A9A5; }
  .detail-label { font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #7A816C; margin-bottom: 8px; }
  .detail-value { font-size: 14px; color: #2D2926; font-weight: 500; line-height: 1.6; white-space: pre-line; }

  /* SKILLS */
  .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; margin-top: 60px; }
  .skill-card {
    transition: transform 0.3s, box-shadow 0.3s;
    padding: 8px; border-radius: 12px;
  }
  .skill-card:hover { transform: translateY(-6px); }
  .skill-icon { width: 48px; height: 48px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 20px; }
  .skill-name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #2D2926; margin-bottom: 12px; }
  .skill-desc { font-size: 14px; color: #7A716A; line-height: 1.75; }

  /* PROJECTS */
  .projects-list { display: flex; flex-direction: column; gap: 80px; margin-top: 60px; }
  .project-row { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
  .project-row.reverse { direction: rtl; }
  .project-row.reverse > * { direction: ltr; }
  .project-visual {
    border-radius: 12px; overflow: hidden; height: 320px;
    display: flex; align-items: center; justify-content: center;
    background: white; border: 1px solid #E5DFD6;
    transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s;
  }
  .project-visual:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 32px rgba(45,41,38,0.1);
  }
  .project-visual img { width: 100%; height: 100%; object-fit: cover; }
  .project-visual.contain-image img { object-fit: contain; padding: 24px; }
  .project-visual-text { font-family: 'Playfair Display', serif; font-size: 28px; font-style: italic; color: #A58B71; }
  .project-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
  .proj-tag { font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 999px; background: #ECEEE9; color: #5E6455; }
  .project-name { font-family: 'Playfair Display', serif; font-size: 30px; font-weight: 700; color: #2D2926; margin-bottom: 16px; line-height: 1.2; }
  .project-desc { font-size: 14px; color: #7A716A; line-height: 1.8; margin-bottom: 24px; }
  .project-meta { display: flex; gap: 32px; margin-bottom: 24px; }
  .proj-meta-item { font-size: 12px; color: #7A716A; }
  .proj-meta-label { font-weight: 700; color: #2D2926; display: block; margin-bottom: 2px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; }
  .project-link {
    font-size: 13px; font-weight: 700; color: #AE6965; cursor: pointer;
    letter-spacing: 0.03em; display: inline-flex; align-items: center; gap: 6px;
    text-decoration: none; border-bottom: 1.5px solid transparent;
    transition: border-color 0.2s;
  }
  .project-link:hover { border-color: #AE6965; }

  /* JOURNEY */
  .journey-bg { background: #2D2926; }
  .journey-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; margin-top: 60px; }
  .journey-card {
    border-top: 2px solid #D1A9A5; padding-top: 24px;
    transition: transform 0.3s;
  }
  .journey-card:hover { transform: translateY(-4px); }
  .journey-period { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #D1A9A5; margin-bottom: 12px; }
  .journey-role { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: #F5F1EC; margin-bottom: 6px; line-height: 1.3; }
  .journey-org { font-size: 13px; color: #A58B71; font-weight: 500; margin-bottom: 12px; }
  .journey-desc { font-size: 13px; color: #9A918A; line-height: 1.7; }

  /* PHILOSOPHY */
  .philosophy-bg { background: #AE6965; overflow: hidden; position: relative; }
  .philosophy-bg::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 70%);
  }
  .philosophy-inner { max-width: 800px; margin: 0 auto; text-align: center; padding: 100px 48px; position: relative; }
  .philosophy-text { font-family: 'Playfair Display', serif; font-size: 36px; font-style: italic; color: white; line-height: 1.5; margin-bottom: 16px; }
  .philosophy-attr { font-size: 13px; color: rgba(255,255,255,0.7); letter-spacing: 0.1em; text-transform: uppercase; }

  /* CONTACT */
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; margin-top: 60px; }
  .contact-links { display: flex; flex-direction: column; gap: 16px; }
  .contact-link-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 24px; background: white; border: 1px solid #E5DFD6;
    border-radius: 8px; cursor: pointer; transition: border-color 0.2s, transform 0.2s;
    text-decoration: none;
  }
  .contact-link-row:hover { border-color: #D1A9A5; transform: translateX(4px); }
  .contact-link-label { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: #2D2926; }
  .contact-link-sub { font-size: 12px; color: #7A716A; margin-top: 2px; }
  .contact-arrow { color: #AE6965; font-size: 18px; transition: transform 0.2s; }
  .contact-link-row:hover .contact-arrow { transform: translateX(4px); }
  .contact-text p { font-size: 15px; color: #7A716A; line-height: 1.85; margin-bottom: 20px; }
  .contact-text p strong { color: #2D2926; font-weight: 600; }

  /* FOOTER */
  .footer { text-align: center; padding: 40px 48px; border-top: 1px solid #E5DFD6; font-size: 12px; color: #D1A9A5; }

  /* CASE STUDY */
  .case-study-back {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 13px; font-weight: 600; color: #AE6965; cursor: pointer;
    margin-bottom: 48px; border: none; background: none;
    font-family: 'DM Sans', sans-serif; transition: gap 0.2s;
  }
  .case-study-back:hover { gap: 12px; }
  .cs-hero { margin-bottom: 64px; }
  .cs-hero-title {
    font-family: 'Playfair Display', serif; font-size: 52px; font-weight: 700;
    color: #2D2926; line-height: 1.1; margin-bottom: 20px;
  }
  .cs-hero-subtitle {
    font-size: 18px; color: #7A716A; line-height: 1.7; max-width: 640px; margin-bottom: 32px;
  }
  .cs-meta-row { display: flex; gap: 48px; flex-wrap: wrap; }
  .cs-meta-item {}
  .cs-meta-label { font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #7A816C; margin-bottom: 4px; }
  .cs-meta-value { font-size: 14px; color: #2D2926; font-weight: 500; }
  .cs-section { margin-bottom: 56px; }
  .cs-section-title {
    font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700;
    color: #2D2926; margin-bottom: 16px;
  }
  .cs-section p { font-size: 15px; color: #7A716A; line-height: 1.85; margin-bottom: 16px; }
  .cs-section p strong { color: #2D2926; font-weight: 600; }
  .cs-highlight {
    background: #ECEEE9; border-left: 3px solid #7A816C;
    padding: 20px 24px; border-radius: 0 8px 8px 0; margin: 24px 0;
  }
  .cs-highlight p { font-size: 14px; color: #5E6455; line-height: 1.75; margin-bottom: 0; }
  .cs-features { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 24px 0; }
  .cs-feature-card {
    background: white; border: 1px solid #E5DFD6; border-radius: 8px; padding: 20px;
    transition: transform 0.3s, border-color 0.3s;
  }
  .cs-feature-card:hover { transform: translateY(-4px); border-color: #D1A9A5; }
  .cs-feature-icon { font-size: 24px; margin-bottom: 12px; }
  .cs-feature-name { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: #2D2926; margin-bottom: 8px; }
  .cs-feature-desc { font-size: 13px; color: #7A716A; line-height: 1.7; }
  .cs-stats-banner {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 32px 0;
  }
  .cs-stat-card {
    background: white; border: 1px solid #E5DFD6; border-radius: 8px;
    padding: 24px; text-align: center;
    transition: transform 0.3s, border-color 0.3s;
  }
  .cs-stat-card:hover { transform: translateY(-4px); border-color: #D1A9A5; }
  .cs-stat-num {
    font-family: 'Playfair Display', serif; font-size: 40px; font-weight: 700;
    color: #AE6965; line-height: 1; margin-bottom: 8px;
  }
  .cs-stat-desc { font-size: 13px; color: #7A716A; line-height: 1.5; }
  .cs-weights-grid {
    display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin: 24px 0;
  }
  .cs-weight-card {
    background: white; border: 1px solid #E5DFD6; border-radius: 8px;
    padding: 16px; text-align: center;
    transition: transform 0.3s;
  }
  .cs-weight-card:hover { transform: translateY(-4px); }
  .cs-weight-pct {
    font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700;
    margin-bottom: 4px;
  }
  .cs-weight-label { font-size: 11px; font-weight: 600; color: #2D2926; letter-spacing: 0.02em; }
  .cs-weight-desc { font-size: 11px; color: #7A716A; margin-top: 6px; line-height: 1.4; }
  .cs-persona-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 24px 0;
  }
  .cs-persona-card {
    background: white; border: 1px solid #E5DFD6; border-radius: 8px; padding: 16px;
    transition: transform 0.3s, border-color 0.3s;
  }
  .cs-persona-card:hover { transform: translateY(-4px); border-color: #D1A9A5; }
  .cs-persona-icon { font-size: 20px; margin-bottom: 8px; }
  .cs-persona-name { font-weight: 700; font-size: 13px; color: #2D2926; margin-bottom: 4px; }
  .cs-persona-desc { font-size: 12px; color: #7A716A; line-height: 1.5; }
  .cs-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin: 24px 0; align-items: start; }
  .cs-callout {
    background: #2D2926; border-radius: 8px; padding: 32px; margin: 32px 0;
  }
  .cs-callout p { color: #E5DFD6 !important; margin-bottom: 0 !important; }
  .cs-callout strong { color: #D1A9A5 !important; }
  .cs-future-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 24px 0;
  }
  .cs-future-card {
    border: 1px solid #E5DFD6; border-radius: 8px; padding: 16px;
    background: white; transition: transform 0.3s;
  }
  .cs-future-card:hover { transform: translateY(-4px); }
  .cs-future-title { font-weight: 700; font-size: 13px; color: #2D2926; margin-bottom: 6px; }
  .cs-future-desc { font-size: 12px; color: #7A716A; line-height: 1.6; }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .navbar { padding: 0 20px; }
    .nav-links { gap: 12px; }
    .nav-links a { font-size: 12px; }
    .hero { padding: 100px 20px 60px; }
    .hero-punjabi { font-size: 48px; }
    .section { padding: 60px 20px; }
    .about-grid { grid-template-columns: 1fr; gap: 40px; }
    .skills-grid { grid-template-columns: 1fr; gap: 32px; }
    .project-row, .project-row.reverse { grid-template-columns: 1fr; gap: 32px; direction: ltr; }
    .journey-grid { grid-template-columns: 1fr 1fr; gap: 24px; }
    .contact-grid { grid-template-columns: 1fr; gap: 40px; }
    .philosophy-text { font-size: 24px; }
    .philosophy-inner { padding: 60px 24px; }
    .cs-hero-title { font-size: 36px; }
    .cs-features { grid-template-columns: 1fr; }
    .cs-meta-row { gap: 24px; }
    .cs-stats-banner { grid-template-columns: 1fr; }
    .cs-weights-grid { grid-template-columns: repeat(3, 1fr); }
    .cs-persona-grid { grid-template-columns: 1fr; }
    .cs-two-col { grid-template-columns: 1fr; }
    .cs-future-grid { grid-template-columns: 1fr; }
  }
`;

const navSections = ["About", "Skills", "Work", "Journey", "Contact"];

// Intersection Observer hook for scroll animations
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useFadeIn();
  return (
    <div
      ref={ref}
      className={`fade-up ${delay ? `delay-${delay}` : ""} ${className}`}
    >
      {children}
    </div>
  );
}

// ─── SAANJHA CASE STUDY ───
function SaanjhaCaseStudy({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div style={{ background: p.cream, minHeight: "100vh" }}>
      <div className="section" style={{ paddingTop: 120 }}>
        <button className="case-study-back" onClick={onBack}>
          ← Back to portfolio
        </button>

        <FadeUp>
          <div className="cs-hero">
            <div className="project-tags" style={{ marginBottom: 16 }}>
              <span className="proj-tag">UX Research</span>
              <span className="proj-tag">Community Design</span>
              <span className="proj-tag">Accessibility</span>
              <span className="proj-tag">Behavioral Science</span>
            </div>
            <h1 className="cs-hero-title">Saanjha Social</h1>
            <p className="cs-hero-subtitle">
              A community connection platform fighting social isolation in
              Seattle by centering accessibility-first venue verification,
              inclusion-informed matching, and a buddy system that creates
              accountability without pressure.
            </p>
            <div className="cs-meta-row">
              <div className="cs-meta-item">
                <div className="cs-meta-label">Role</div>
                <div className="cs-meta-value">
                  Lead Designer and Researcher
                </div>
              </div>
              <div className="cs-meta-item">
                <div className="cs-meta-label">Timeline</div>
                <div className="cs-meta-value">September 2025 to Present</div>
              </div>
              <div className="cs-meta-item">
                <div className="cs-meta-label">Tools</div>
                <div className="cs-meta-value">
                  Figma, React/Vite, Java Swing
                </div>
              </div>
              <div className="cs-meta-item">
                <div className="cs-meta-label">Presented</div>
                <div className="cs-meta-value">
                  COE MS Student Showcase, April 2026
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* STATS BANNER */}
        <FadeUp>
          <div className="cs-stats-banner">
            <div className="cs-stat-card">
              <div className="cs-stat-num">1 in 5</div>
              <div className="cs-stat-desc">
                King County adults experience social isolation
              </div>
            </div>
            <div className="cs-stat-card">
              <div className="cs-stat-num">20.2%</div>
              <div className="cs-stat-desc">
                of King County adults live with a disability
              </div>
            </div>
            <div className="cs-stat-card">
              <div className="cs-stat-num">29%</div>
              <div className="cs-stat-desc">
                increased risk of premature death from social isolation
                (Holt-Lunstad et al.)
              </div>
            </div>
          </div>
        </FadeUp>

        {/* THE PROBLEM */}
        <FadeUp>
          <div className="cs-section">
            <h2 className="cs-section-title">The Problem</h2>
            <p>
              Social isolation is a serious public health crisis, and in Seattle
              it is made worse by the city's unique culture and demographics.
              The phenomenon known as the
              <strong> "Seattle Freeze" </strong> describes a pattern where
              people are outwardly friendly but rarely form deeper, lasting
              friendships. High rates of introversion, constant population
              turnover driven by the tech industry (over 50,000 residents
              relocating annually), more than 150 rainy days pushing people
              indoors, and a local culture that values politeness over
              directness all fuel this dynamic.
            </p>
            <p>
              For people with disabilities and chronic illness, these cultural
              barriers compound with real-world obstacles: inaccessible venues,
              unreliable transit, and limited transportation options. The
              experience of repeatedly arriving at a venue only to find it is
              not truly accessible makes social participation feel risky and
              discouraging, further reinforcing withdrawal from community life.
            </p>
            <div className="cs-highlight">
              <p>
                Research has established social isolation as a documented risk
                factor for radicalization to violent extremism. Gill et al.
                analyzed 119 lone-actor terrorists and found that many had
                experienced deep social isolation before radicalizing. This
                project demonstrates how technology can strengthen community
                bonds proactively by removing the accessibility and inclusion
                barriers that keep vulnerable people isolated.
              </p>
            </div>
          </div>
        </FadeUp>

        {/* WHY EXISTING PLATFORMS FAIL */}
        <FadeUp>
          <div className="cs-section">
            <h2 className="cs-section-title">Why Existing Platforms Fail</h2>
            <p>
              Existing platforms like Meetup, Bumble BFF, and Facebook Groups
              fall short in several critical ways:
            </p>
            <div className="cs-features">
              <div className="cs-feature-card">
                <div className="cs-feature-icon">&#10060;</div>
                <div className="cs-feature-name">
                  Inaccurate Accessibility Data
                </div>
                <div className="cs-feature-desc">
                  Accessibility information is user-submitted and frequently
                  inaccurate. A venue listed as "accessible" may still lack
                  step-free entrances, accessible restrooms, or adequate
                  seating.
                </div>
              </div>
              <div className="cs-feature-card">
                <div className="cs-feature-icon">&#10060;</div>
                <div className="cs-feature-name">
                  No Transportation Awareness
                </div>
                <div className="cs-feature-desc">
                  No platform accounts for transportation limitations or helps
                  users determine whether they can realistically reach a venue
                  given their mobility needs.
                </div>
              </div>
              <div className="cs-feature-card">
                <div className="cs-feature-icon">&#10060;</div>
                <div className="cs-feature-name">Overwhelming Group Sizes</div>
                <div className="cs-feature-desc">
                  Large default group sizes can feel overwhelming for people who
                  are already apprehensive about social participation due to
                  prior experiences of exclusion.
                </div>
              </div>
              <div className="cs-feature-card">
                <div className="cs-feature-icon">&#10060;</div>
                <div className="cs-feature-name">
                  No Accountability Mechanism
                </div>
                <div className="cs-feature-desc">
                  No platform has any accountability mechanism to counter the
                  Seattle Freeze pattern of last-minute cancellations, which
                  disproportionately affects people who invested significant
                  effort to attend.
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* THE MATCHING ENGINE */}
        <FadeUp>
          <div className="cs-section">
            <h2 className="cs-section-title">The Matching Engine</h2>
            <p>
              The core of Saanjha Social is a five-dimension matching engine
              that scores users across weighted factors grounded in behavioral
              science. Accessibility is weighted highest because both users must
              be comfortable at the same venue for a meetup to succeed.
            </p>
            <div className="cs-weights-grid">
              {[
                {
                  pct: "30%",
                  label: "Access",
                  color: "#AE6965",
                  desc: "Accessibility overlap scored first as a hard constraint",
                },
                {
                  pct: "25%",
                  label: "Interest",
                  color: "#A58B71",
                  desc: "Jaccard similarity (intersection over union)",
                },
                {
                  pct: "20%",
                  label: "Energy",
                  color: "#7A816C",
                  desc: "Accounts for variable energy from chronic illness",
                },
                {
                  pct: "15%",
                  label: "Group Size",
                  color: "#D1A9A5",
                  desc: "Preferred social setting (2-4 vs 5-10 people)",
                },
                {
                  pct: "10%",
                  label: "Attachment",
                  color: "#B8887F",
                  desc: "Grounded in attachment theory research",
                },
              ].map(({ pct, label, color, desc }) => (
                <div key={label} className="cs-weight-card">
                  <div className="cs-weight-pct" style={{ color }}>
                    {pct}
                  </div>
                  <div className="cs-weight-label">{label}</div>
                  <div className="cs-weight-desc">{desc}</div>
                </div>
              ))}
            </div>
            <p>
              Accessibility is enforced as a <strong>hard constraint</strong>:
              users only see venues that meet every one of their stated
              requirements. Interest overlap uses Jaccard similarity. Energy
              scoring accounts for "Variable" energy levels common in users with
              chronic illness. Attachment style scoring is grounded in
              attachment theory, where Secure-Secure pairings score highest and
              Anxious-Avoidant pairings score lowest.
            </p>
          </div>
        </FadeUp>

        {/* KEY FEATURES */}
        <FadeUp>
          <div className="cs-section">
            <h2 className="cs-section-title">Key Features</h2>
            <div className="cs-features">
              <div className="cs-feature-card">
                <div className="cs-feature-icon">&#9989;</div>
                <div className="cs-feature-name">Verified Venue Database</div>
                <div className="cs-feature-desc">
                  8 real Seattle venues manually verified for wheelchair access,
                  noise levels, seating, sensory accommodations, service animal
                  policies, and proximity to accessible transit stops.
                </div>
              </div>
              <div className="cs-feature-card">
                <div className="cs-feature-icon">&#129309;</div>
                <div className="cs-feature-name">Buddy System</div>
                <div className="cs-feature-desc">
                  Every user is paired with a buddy before each event. Both
                  confirm attendance 24 hours in advance and have pre-event
                  chat. Designed to handle legitimate cancellations with
                  understanding, not penalty.
                </div>
              </div>
              <div className="cs-feature-card">
                <div className="cs-feature-icon">&#128506;</div>
                <div className="cs-feature-name">Chat + Map Panel</div>
                <div className="cs-feature-desc">
                  Buddy chat with an integrated Seattle neighborhood map. Venue
                  dots are color-coded: red for upcoming events, green for
                  venues meeting the user's access needs, gray otherwise.
                </div>
              </div>
              <div className="cs-feature-card">
                <div className="cs-feature-icon">&#127963;</div>
                <div className="cs-feature-name">
                  Platform-Facilitated Events
                </div>
                <div className="cs-feature-desc">
                  Structured events (5-10 people, board games, art workshops)
                  and casual meetups (2-4 people, coffee, walks). Users never
                  need to host. Every listing includes a full accessibility
                  breakdown.
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* SAMPLE USERS */}
        <FadeUp>
          <div className="cs-section">
            <h2 className="cs-section-title">Designed for Real People</h2>
            <p>
              The platform ships with six sample users representing the target
              demographics, each crafted to test different matching edge cases
              and accessibility requirements:
            </p>
            <div className="cs-persona-grid">
              {[
                {
                  icon: "&#9855;",
                  name: "Wheelchair User",
                  desc: "New to Seattle, needs step-free entrances and accessible restrooms",
                },
                {
                  icon: "&#129504;",
                  name: "Autistic Adult",
                  desc: "Prefers quiet small groups, low noise, sensory-friendly venues",
                },
                {
                  icon: "&#128054;",
                  name: "Service Dog Handler",
                  desc: "Photographer who needs service animal accommodations",
                },
                {
                  icon: "&#128187;",
                  name: "Tech Transplant",
                  desc: "Experiencing the Seattle Freeze firsthand, looking for genuine connection",
                },
                {
                  icon: "&#128164;",
                  name: "Chronic Fatigue",
                  desc: "Retired teacher with variable energy levels, needs flexible scheduling",
                },
                {
                  icon: "&#127891;",
                  name: "Graduate Student",
                  desc: "Multiple overlapping accessibility needs, limited transportation",
                },
              ].map(({ icon, name, desc }) => (
                <div key={name} className="cs-persona-card">
                  <div
                    className="cs-persona-icon"
                    dangerouslySetInnerHTML={{ __html: icon }}
                  />
                  <div className="cs-persona-name">{name}</div>
                  <div className="cs-persona-desc">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* TECHNICAL IMPLEMENTATION */}
        <FadeUp>
          <div className="cs-section">
            <h2 className="cs-section-title">Technical Implementation</h2>
            <p>
              Saanjha was built across two course projects, allowing iteration
              from concept through high-fidelity prototype. The system follows a
              three-tier architecture: User Interface Layer, Application Logic
              Layer, and Data Persistence Layer.
            </p>
            <div className="cs-two-col">
              <div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: p.dark,
                    marginBottom: 12,
                  }}
                >
                  INFO 5100: Java Swing
                </h3>
                <p>
                  Desktop application with <strong>19 Java files</strong>{" "}
                  organized across model, logic, and view layers. Five model
                  classes (UserProfile, AccessibilityPreferences, Venue, Event,
                  UserMatch), three logic components (MatchingEngine,
                  VenueFilter, BuddyMatcher), and a six-tab Swing interface. The
                  matching engine runs at O(n) per user and O(n&sup2;) for all
                  pairs.
                </p>
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: p.dark,
                    marginBottom: 12,
                  }}
                >
                  INFO 6150: React/Vite SPA
                </h3>
                <p>
                  Responsive single-page application with a mobile phone-frame
                  UI, Puget Sound-inspired color palette, three-screen
                  authentication flow, and a custom "Other" chip input system
                  for open-ended profile fields. Built with accessibility and
                  multilingual design considerations from the start.
                </p>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* ETHICAL FRAMEWORK */}
        <FadeUp>
          <div className="cs-callout">
            <p>
              <strong>
                Ethical framework built into the architecture, not added as an
                afterthought.
              </strong>{" "}
              Accessibility data can reveal disability and health status. This
              data is treated with the same care as protected health
              information. All intervention design prioritizes user agency. The
              platform works for its users, never against them. Genuine
              inclusion requires both physical access and the assurance that
              participation will never be used against someone.
            </p>
          </div>
        </FadeUp>

        {/* OUTCOMES */}
        <FadeUp>
          <div className="cs-section">
            <h2 className="cs-section-title">Expected Outcomes</h2>
            <div className="cs-features">
              <div className="cs-feature-card">
                <div className="cs-feature-icon">&#128201;</div>
                <div className="cs-feature-name">Reduced Isolation</div>
                <div className="cs-feature-desc">
                  Decrease in UCLA Loneliness Scale and PROMIS Social Isolation
                  scores after three or more events attended.
                </div>
              </div>
              <div className="cs-feature-card">
                <div className="cs-feature-icon">&#129303;</div>
                <div className="cs-feature-name">Sustained Connection</div>
                <div className="cs-feature-desc">
                  At least one sustained friendship (3+ voluntary meetups)
                  formed within three months of joining.
                </div>
              </div>
              <div className="cs-feature-card">
                <div className="cs-feature-icon">&#9855;</div>
                <div className="cs-feature-name">
                  90% Accessibility Satisfaction
                </div>
                <div className="cs-feature-desc">
                  Users report that venues met their stated accessibility needs
                  without unexpected barriers.
                </div>
              </div>
              <div className="cs-feature-card">
                <div className="cs-feature-icon">&#128197;</div>
                <div className="cs-feature-name">
                  Below 15% Cancellation Rate
                </div>
                <div className="cs-feature-desc">
                  The buddy system targets keeping cancellations below 15%,
                  compared to the 30-40% typical of general social platforms.
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* FUTURE DIRECTIONS */}
        <FadeUp>
          <div className="cs-section">
            <h2 className="cs-section-title">Future Directions</h2>
            <div className="cs-future-grid">
              {[
                {
                  title: "Real-Time Transit Integration",
                  desc: "King County Metro GTFS API for actual travel times, wheelchair-accessible stops, and real-time service disruptions.",
                },
                {
                  title: "Machine Learning Match Refinement",
                  desc: "Collecting anonymized feedback to learn optimal matching weights over time using supervised learning.",
                },
                {
                  title: "Mobile Application",
                  desc: "Responsive mobile interface for users who rely on smartphones and mobile assistive technology.",
                },
                {
                  title: "Expanded Venue Database",
                  desc: "Scaling from 8 to 50+ venues through partnerships with Seattle Parks and Recreation and volunteer verification.",
                },
                {
                  title: "Real-Time Buddy Chat",
                  desc: "End-to-end encrypted messaging replacing the current simulated chat interface.",
                },
                {
                  title: "Community Resilience Dashboard",
                  desc: "Aggregated, anonymized neighborhood-level data showing isolation trends and venue utilization.",
                },
              ].map(({ title, desc }) => (
                <div key={title} className="cs-future-card">
                  <div className="cs-future-title">{title}</div>
                  <div className="cs-future-desc">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* RECOGNITION */}
        <FadeUp>
          <div className="cs-section">
            <h2 className="cs-section-title">Recognition</h2>
            <p>
              Saanjha Social was presented at the{" "}
              <strong>College of Engineering MS Student Showcase</strong> on
              April 21, 2026, under the advisorship of Professor Guanzhou Ji.
              The research poster and paper generated meaningful conversation
              among faculty and peers about social isolation on campus. Several
              students shared that the "Seattle Freeze" concept directly
              reflected their own experience of moving to Seattle for graduate
              school.
            </p>
            <p>
              The project continues to evolve. I am exploring opportunities to
              present at external conferences and develop the platform beyond an
              academic context, with the ultimate goal of deployment in Seattle.
            </p>
          </div>
        </FadeUp>

        <FadeUp>
          <div style={{ textAlign: "center", padding: "40px 0 80px" }}>
            <button className="btn-primary" onClick={onBack}>
              ← Back to portfolio
            </button>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}

// ─── MAIN PORTFOLIO ───
export default function App() {
  const [active, setActive] = useState("About");
  const [scrolled, setScrolled] = useState(false);
  const [view, setView] = useState("home");

  useEffect(() => {
    if (view !== "home") return;
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const offsets = navSections
        .map((s) => {
          const el = document.getElementById(s.toLowerCase());
          return el ? { id: s, top: el.getBoundingClientRect().top } : null;
        })
        .filter(Boolean);
      const current = offsets.filter((o) => o.top <= 120).pop();
      if (current) setActive(current.id);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [view]);

  if (view === "saanjha") {
    return (
      <>
        <style>{styles}</style>
        <nav className="navbar scrolled">
          <div
            className="nav-logo"
            style={{ cursor: "pointer" }}
            onClick={() => setView("home")}
          >
            Neerkamal Jaswal
          </div>
          <ul className="nav-links">
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setView("home");
                }}
              >
                Home
              </a>
            </li>
          </ul>
        </nav>
        <SaanjhaCaseStudy onBack={() => setView("home")} />
        <footer className="footer">
          &copy; 2026 Neerkamal Jaswal &middot; Designed with Intention
        </footer>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>

      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo">Neerkamal Jaswal</div>
        <ul className="nav-links">
          {navSections.map((s) => (
            <li key={s}>
              <a
                href={`#${s.toLowerCase()}`}
                className={active === s ? "active" : ""}
              >
                {s}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <div id="hero" style={{ background: p.cream }}>
        <div className="hero">
          <div className="hero-greeting">Hey there, I am</div>
          <div className="hero-punjabi">ਨੀਰਕਮਲ</div>
          <div className="hero-english">Neerkamal Jaswal</div>
          <div className="hero-tagline">
            "Great design is both beautiful and invisible."
          </div>
          <p className="hero-body">
            I am a UX designer and researcher combining behavioral science,
            cross-cultural communication, and a deep commitment to
            accessibility. I design experiences that work elegantly for
            everyone, especially the people most often left out.
          </p>
          <div className="hero-btns">
            <button
              className="btn-primary"
              onClick={() =>
                document
                  .getElementById("work")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View my work
            </button>
            <button
              className="btn-outline"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Get in touch
            </button>
          </div>
          <div className="hero-scroll">scroll to explore &#8595;</div>
        </div>
      </div>

      {/* ABOUT */}
      <div id="about" style={{ background: p.cream }}>
        <div className="section">
          <FadeUp>
            <div className="section-eyebrow">About me</div>
          </FadeUp>
          <FadeUp delay={1}>
            <div className="section-title">
              Designer. Researcher.
              <br />
              Community Builder.
            </div>
          </FadeUp>
          <FadeUp delay={2}>
            <div className="divider" />
          </FadeUp>
          <div className="about-grid">
            <FadeUp delay={2}>
              <div className="about-text">
                <p>
                  I believe great design is both beautiful and invisible.
                  Effective UX is not about choosing between aesthetics and
                  accessibility. It is about understanding how people think,
                  identifying where they struggle, and building solutions that
                  work elegantly for everyone.
                </p>
                <p>
                  At Seattle University, I conducted award-winning research on
                  how people process scientific information and form
                  health-related attitudes, earning the{" "}
                  <strong>
                    Outstanding Undergraduate Research Project Award.
                  </strong>{" "}
                  That work taught me to focus on user motivations and behavior,
                  not just stated preferences.
                </p>
                <p>
                  I am currently a UX Design Intern at UpKeep Home Services and
                  am developing Saanjha Social, a community connection platform
                  addressing social isolation in Seattle. I am also the founder
                  of Nadar, a Punjabi cultural brand.
                </p>
                <div className="about-stats">
                  {[
                    { num: "12 → 7", label: "Booking steps reduced at UpKeep" },
                    {
                      num: "133",
                      label: "Research participants, award-winning study",
                    },
                    {
                      num: "4",
                      label: "Languages spoken fluently or conversationally",
                    },
                    { num: "3.92", label: "GPA, MS Information Systems" },
                  ].map(({ num, label }) => (
                    <div key={label} className="stat-box">
                      <div className="stat-num">{num}</div>
                      <div className="stat-label">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={3}>
              <div className="about-details">
                {[
                  {
                    label: "Education",
                    value:
                      "MS Information Systems\nNortheastern University Seattle\n\nBA Psychology\nSeattle University",
                  },
                  {
                    label: "Currently",
                    value:
                      "UX Design Intern at UpKeep\nBuilding Saanjha Social\nFounding Nadar ਨਦਰ",
                  },
                  {
                    label: "Languages",
                    value:
                      "English \u00B7 Punjabi (fluent)\nHindi \u00B7 Urdu (conversational)",
                  },
                  {
                    label: "Based in",
                    value: "Seattle, WA\nOpen to remote and relocation",
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="detail-card">
                    <div className="detail-label">{label}</div>
                    <div className="detail-value">{value}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* SKILLS */}
      <div id="skills" style={{ background: "white" }}>
        <div className="section">
          <FadeUp>
            <div className="section-eyebrow">What I do</div>
          </FadeUp>
          <FadeUp delay={1}>
            <div className="section-title">Primary skills</div>
          </FadeUp>
          <FadeUp delay={2}>
            <div className="divider" />
          </FadeUp>
          <div className="skills-grid">
            {[
              {
                icon: "🎨",
                bg: p.roseLight,
                name: "UX Design & Prototyping",
                desc: "I design end-to-end product experiences in Figma, focusing on cognitive load and mental models rooted in psychology.",
              },
              {
                icon: "🔬",
                bg: p.sageLight,
                name: "Research & Behavior",
                desc: "I have led 133-participant studies. I focus on what users actually do rather than just what they say.",
              },
              {
                icon: "♿",
                bg: p.oakLight,
                name: "Inclusive Design",
                desc: "Accessibility is my starting point. I design from the margins inward to ensure experiences work for everyone.",
              },
              {
                icon: "🌐",
                bg: p.rustLight,
                name: "Cultural Strategy",
                desc: "Fluent in English and Punjabi. I build with diaspora communities in mind, ensuring multilingual UX feels native.",
              },
              {
                icon: "💻",
                bg: p.sageLight,
                name: "Frontend Development",
                desc: "Experience with React, JS, and CSS allows me to collaborate effectively with engineering teams.",
              },
              {
                icon: "🏛",
                bg: p.roseLight,
                name: "Brand Identity",
                desc: "Through Nadar, I have developed a brand identity that bridges traditional heritage and modern aesthetics.",
              },
            ].map(({ icon, bg, name, desc }, i) => (
              <FadeUp key={name} delay={Math.min(i + 1, 6)}>
                <div className="skill-card">
                  <div className="skill-icon" style={{ background: bg }}>
                    {icon}
                  </div>
                  <div className="skill-name">{name}</div>
                  <div className="skill-desc">{desc}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* PROJECTS */}
      <div id="work" style={{ background: p.cream }}>
        <div className="section">
          <FadeUp>
            <div className="section-eyebrow">Selected work</div>
          </FadeUp>
          <FadeUp delay={1}>
            <div className="section-title">Projects</div>
          </FadeUp>
          <FadeUp delay={2}>
            <div className="divider" />
          </FadeUp>
          <div className="projects-list">
            {/* SAANJHA */}
            <FadeUp>
              <div className="project-row">
                <div
                  className="project-visual"
                  style={{
                    background: "linear-gradient(135deg,#F5F0EE,#EDE8E5)",
                  }}
                >
                  <img
                    src="/cover.png"
                    alt="Saanjha Social - Connection without barriers"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div>
                  <div className="project-tags">
                    <span className="proj-tag">UX Research</span>
                    <span className="proj-tag">Community</span>
                    <span className="proj-tag">Accessibility</span>
                  </div>
                  <div className="project-name">Saanjha ਸਾਂਝਾ Social</div>
                  <div className="project-meta">
                    <div className="proj-meta-item">
                      <span className="proj-meta-label">Role</span>Lead UX
                      Designer
                    </div>
                    <div className="proj-meta-item">
                      <span className="proj-meta-label">Timeline</span>2025 to
                      Present
                    </div>
                  </div>
                  <p className="project-desc">
                    A community connection platform addressing social isolation
                    in Seattle. Centers accessibility-first venue verification,
                    behavioral matching, and multilingual support.
                  </p>
                  <a
                    className="project-link"
                    onClick={() => setView("saanjha")}
                  >
                    View case study →
                  </a>
                </div>
              </div>
            </FadeUp>

            {/* UPKEEP */}
            <FadeUp>
              <div className="project-row reverse">
                <div
                  className="project-visual"
                  style={{
                    background: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="/upkeeplogo.png"
                    alt="UpKeep"
                    style={{
                      maxWidth: "70%",
                      maxHeight: "60%",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div>
                  <div className="project-tags">
                    <span className="proj-tag">Mobile UX</span>
                    <span className="proj-tag">Internship</span>
                  </div>
                  <div className="project-name">UpKeep Mobile App</div>
                  <div className="project-meta">
                    <div className="proj-meta-item">
                      <span className="proj-meta-label">Role</span>UX Design
                      Intern
                    </div>
                    <div className="proj-meta-item">
                      <span className="proj-meta-label">Timeline</span>2025 to
                      2026
                    </div>
                  </div>
                  <p className="project-desc">
                    Streamlined the booking flow from 12 steps to 7. Designed
                    for both customers and cleaners to increase pricing
                    transparency.
                  </p>
                  <span
                    className="project-link"
                    style={{
                      color: p.muted,
                      cursor: "default",
                      borderBottom: "none",
                    }}
                  >
                    Case study coming soon
                  </span>
                </div>
              </div>
            </FadeUp>

            {/* NADAR */}
            <FadeUp>
              <div className="project-row">
                <div
                  className="project-visual"
                  style={{
                    background: "#FFFAF5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="/Nadar_Wall_Art_One.png"
                    alt="Nadar - made with nadar, made to be seen"
                    style={{
                      maxWidth: "75%",
                      maxHeight: "85%",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div>
                  <div className="project-tags">
                    <span className="proj-tag">Brand Identity</span>
                    <span className="proj-tag">Entrepreneurship</span>
                  </div>
                  <div className="project-name">Nadar ਨਦਰ</div>
                  <div className="project-meta">
                    <div className="proj-meta-item">
                      <span className="proj-meta-label">Role</span>Founder
                    </div>
                    <div className="proj-meta-item">
                      <span className="proj-meta-label">Launch</span>2026
                    </div>
                  </div>
                  <p className="project-desc">
                    A Punjabi cultural brand for the diaspora, filling the gap
                    between traditional goods and modern aesthetic needs.
                  </p>
                  <span
                    className="project-link"
                    style={{
                      color: p.muted,
                      cursor: "default",
                      borderBottom: "none",
                    }}
                  >
                    Etsy shop coming soon
                  </span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* PHILOSOPHY */}
      <div className="philosophy-bg">
        <FadeUp>
          <div className="philosophy-inner">
            <div className="philosophy-text">
              "I design from the margins inward, because when experiences work
              for the most overlooked users, they work better for everyone."
            </div>
            <div className="philosophy-attr">Neerkamal Jaswal</div>
          </div>
        </FadeUp>
      </div>

      {/* JOURNEY */}
      <div id="journey" className="journey-bg">
        <div className="section">
          <FadeUp>
            <div className="section-eyebrow" style={{ color: "#D1A9A5" }}>
              Career journey
            </div>
          </FadeUp>
          <FadeUp delay={1}>
            <div className="section-title" style={{ color: "#F5F1EC" }}>
              How I got here
            </div>
          </FadeUp>
          <FadeUp delay={2}>
            <div className="divider" />
          </FadeUp>
          <div className="journey-grid">
            {[
              {
                period: "2022 – 2023",
                role: "Lead Researcher",
                org: "Seattle University",
                desc: "Led award-winning behavioral research on information processing and attitude formation with 133 participants.",
              },
              {
                period: "2024 – 2025",
                role: "Operations Officer",
                org: "VFS Global",
                desc: "Managed consular operations for applicants from 20+ countries, building cross-cultural communication expertise.",
              },
              {
                period: "2025 – Present",
                role: "MS IS Student",
                org: "Northeastern University",
                desc: "Bridging behavioral science, engineering, and human-centered design in the College of Engineering.",
              },
              {
                period: "2025 – 2026",
                role: "UX Design Intern",
                org: "UpKeep Home Services",
                desc: "Redesigned mobile booking flows and conducted user research for a home services platform.",
              },
            ].map((j, i) => (
              <FadeUp key={j.role} delay={Math.min(i + 1, 6)}>
                <div className="journey-card">
                  <div className="journey-period">{j.period}</div>
                  <div className="journey-role">{j.role}</div>
                  <div className="journey-org">{j.org}</div>
                  <div className="journey-desc">{j.desc}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" style={{ background: "white" }}>
        <div className="section">
          <FadeUp>
            <div className="section-eyebrow">Get in touch</div>
          </FadeUp>
          <FadeUp delay={1}>
            <div className="section-title">
              Let us build something
              <br />
              meaningful.
            </div>
          </FadeUp>
          <FadeUp delay={2}>
            <div className="divider" />
          </FadeUp>
          <div className="contact-grid">
            <FadeUp delay={3}>
              <div className="contact-text">
                <p>
                  Currently looking for{" "}
                  <strong>UX Design or Research roles</strong> where I can
                  contribute to accessible, high-impact products.
                </p>
                <p>Seattle based, open to remote and relocation.</p>
              </div>
            </FadeUp>
            <FadeUp delay={4}>
              <div className="contact-links">
                <a
                  className="contact-link-row"
                  href="mailto:jaswal.n@northeastern.edu"
                >
                  <div>
                    <div className="contact-link-label">Email</div>
                    <div className="contact-link-sub">
                      jaswal.n@northeastern.edu
                    </div>
                  </div>
                  <span className="contact-arrow">→</span>
                </a>
                <a
                  className="contact-link-row"
                  href="https://www.linkedin.com/in/neerkamaljaswal/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    <div className="contact-link-label">LinkedIn</div>
                    <div className="contact-link-sub">
                      linkedin.com/in/neerkamaljaswal
                    </div>
                  </div>
                  <span className="contact-arrow">→</span>
                </a>
                <a
                  className="contact-link-row"
                  href="https://github.com/NJKaur"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    <div className="contact-link-label">GitHub</div>
                    <div className="contact-link-sub">github.com/NJKaur</div>
                  </div>
                  <span className="contact-arrow">→</span>
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      <footer className="footer">
        &copy; 2026 Neerkamal Jaswal &middot; Designed with Intention
      </footer>
    </>
  );
}
