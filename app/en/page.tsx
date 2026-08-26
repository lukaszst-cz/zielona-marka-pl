import type { Metadata } from "next";
import BrandSignature from "../BrandSignature";

export const metadata: Metadata = {
  title: "Websites and business systems",
  description: "Websites, technical SEO, process automation and client portals for growing businesses in Poland.",
  alternates: { canonical: "/en", languages: { pl: "/", en: "/en" } },
  openGraph: { locale: "en_GB", title: "Zielona Marka | Websites and business systems", images: [] },
  twitter: { images: [] },
};

const offers = [
  ["One-page website", "from PLN 1,449", "A clear online introduction for a small business, including a contact path and mobile-first layout."],
  ["Business website", "from PLN 2,490", "A structured website with services, proof, enquiries and technical SEO foundations."],
  ["Website plus", "from PLN 3,690", "A more complete sales website with integrations, scalable content and stronger search foundations."],
];

const process = ["Discovery and brief", "Structure and content", "Design and build", "QA and launch", "Support after launch"];

export default function EnglishPage() {
  return <main className="english-site" lang="en">
    <header className="site-header">
      <nav className="nav shell" aria-label="Main navigation">
        <a className="brand" href="/en" aria-label="Zielona Marka, English home"><BrandSignature /></a>
        <div className="nav-links"><a href="#work">Work</a><a href="#offer">Offer</a><a href="#process">Process</a><a href="#contact">Contact</a></div>
        <div className="language-switch" aria-label="Language selection"><a href="/" lang="pl" aria-label="Polska wersja">🇵🇱 <span>PL</span></a><a className="active" href="/en" lang="en" aria-label="English version">🇬🇧 <span>EN</span></a></div>
        <a className="button button-small" href="#contact">Start a project <span>↗</span></a>
      </nav>
    </header>

    <section className="hero shell english-hero">
      <div className="eyebrow"><span />WEBSITES AND SYSTEMS FOR BUSINESSES</div>
      <h1>Digital places where <em>businesses can grow.</em></h1>
      <p>I design clear, fast and human websites, then add only the tools that genuinely improve your workflow.</p>
      <div className="hero-actions"><a className="button" href="#offer">See the offer <span>↓</span></a><a className="text-link" href="#work">Explore examples <span>↘</span></a></div>
    </section>

    <section className="quick-start"><div className="shell quick-start-inner"><div className="quick-start-intro"><span className="section-no">A CLEAR START</span><h2>You do not need technical language to start.</h2></div><div className="quick-start-steps"><article><b>01</b><h3>Tell me about the business</h3><p>A short call or online meeting is enough. We can work remotely throughout Poland.</p></article><article><b>02</b><h3>Get a clear proposal</h3><p>Scope, timetable, technology and price before work begins.</p></article><article><b>03</b><h3>Review before launch</h3><p>You see the website, request refinements and receive a QA summary before publication.</p></article></div></div></section>

    <section id="offer" className="section offer-section"><div className="shell"><div className="section-head"><div><span className="section-no">SERVICES AND PRICING</span><h2>Choose the result, not the technology.</h2></div><p>Every project begins with a short brief. Prices are starting points for a defined scope and can be adjusted after we understand what the business needs.</p></div><div className="english-offers">{offers.map(([title, price, copy]) => <article key={title}><span>WEBSITE</span><h3>{title}</h3><b>{price}</b><p>{copy}</p><a href="#contact">Ask about this option ↗</a></article>)}</div></div></section>

    <section className="section included"><div className="shell included-grid"><div><span className="section-no">BUILT FOR REAL USE</span><h2>Fast, clear and ready to be found.</h2></div><ul><li>Responsive design for phone, tablet and desktop</li><li>Clickable contact paths and enquiry form</li><li>Technical SEO foundations and clear page structure</li><li>Privacy and cookie information matched to real features</li><li>Quality assurance (QA) before launch</li><li>Handover and practical update instructions</li></ul></div></section>

    <section id="process" className="section shell"><div className="section-head"><div><span className="section-no">HOW WE WORK</span><h2>A calm process from idea to launch.</h2></div><p>There are no surprises hidden behind technical terms. You always know the current stage, what is needed from you and what comes next.</p></div><div className="process">{process.map((step, index) => <article key={step}><b>{String(index + 1).padStart(2, "0")}</b><h3>{step}</h3><p>{index === 3 ? "Responsive checks, key journeys, links and performance review before go-live." : "A focused, documented step with clear decisions and next actions."}</p></article>)}</div></section>

    <section className="section tech-section"><div className="shell"><div className="section-head"><div><span className="section-no">TOOLS THAT FIT</span><h2>Simple when simple is enough. Scalable when it matters.</h2></div><p>Depending on the project, this can mean a fast custom website, WordPress for editable content, React for interactive interfaces, or a lightweight client portal with automations and KPI views.</p></div><div className="english-tools"><article><b>Websites</b><span>Custom code, WordPress, React and PHP where the scope calls for it.</span></article><article><b>Automation</b><span>Forms, reminders, status updates, dashboards and connected tools.</span></article><article><b>Client area</b><span>Clear project status, files, approvals and shared next steps.</span></article></div></div></section>

    <section id="work" className="section shell"><div className="section-head"><div><span className="section-no">SELECTED CONCEPTS</span><h2>Different industries need different stories.</h2></div><p>Each concept uses a deliberately different visual direction, rather than one template applied everywhere.</p></div><div className="visual-proof-strip english-proof"><a href="/demo/bistro-strona"><small>HOSPITALITY</small><strong>Bistro Forma</strong><span>Menu, booking journey and atmosphere ↗</span></a><a href="/demo/natura-strona"><small>WELLNESS</small><strong>Natura Studio</strong><span>Calm presentation and booking path ↗</span></a><a href="/demo/dom-strona"><small>PROPERTY</small><strong>Dom Dobry</strong><span>Availability, trust and enquiry flow ↗</span></a></div></section>

    <section id="contact" className="section contact-section"><div className="shell contact-grid"><div><span className="section-no">LET&apos;S TALK</span><h2>Tell me about your business.</h2><p>We can meet online through Google Meet or work entirely by email and phone. Local meetings are possible around Warsaw; remote collaboration is available across Poland.</p><div className="contact-direct"><a href="tel:+48450458466"><small>MOBILE</small><strong>+48 450 458 466</strong></a><a href="mailto:lukasz.staniewicz@gmail.com"><small>E-MAIL</small><strong>lukasz.staniewicz@gmail.com</strong></a></div></div><div className="english-contact-card"><span>SHORT BRIEF</span><h3>Start with the essentials.</h3><p>What does your company do, what should the website help with, and when would you like to launch?</p><a className="button" href="mailto:lukasz.staniewicz@gmail.com?subject=Website%20enquiry%20from%20zielona-marka.pl">Send an enquiry <span>↗</span></a></div></div></section>

    <footer><div className="shell footer-grid"><a className="brand" href="/en"><BrandSignature /></a><p>Websites and systems for businesses. Designed in Poland, available remotely.</p><div><a href="/">Polish version</a><a href="/polityka-prywatnosci">Privacy</a><a href="https://github.com/lukaszst-cz" target="_blank" rel="noreferrer">GitHub ↗</a></div></div></footer>
  </main>;
}
