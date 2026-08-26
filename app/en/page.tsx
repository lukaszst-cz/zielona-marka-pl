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
        <div className="nav-links"><a href="#work">Work</a><a href="#offer">Offer</a><a href="#systems">Systems</a><a href="#process">Process</a><a href="#contact">Contact</a></div>
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

    <section className="section english-mobile"><div className="shell english-split"><div><span className="section-no">MOBILE FIRST, NOT MOBILE LAST</span><h2>A website should work at the exact moment a customer needs it.</h2></div><div><p>For many local businesses, the first visit happens between meetings, in a car park or at home on a phone. That is why the first screen, key information, contact path and forms are designed for small screens first and then refined for desktop.</p><ul><li>Tap-to-call and tap-to-message contact options</li><li>Clear service information without pinching or zooming</li><li>Fast images and a focused path to an enquiry</li></ul></div></div></section>

    <section id="process" className="section shell"><div className="section-head"><div><span className="section-no">HOW WE WORK</span><h2>A calm process from idea to launch.</h2></div><p>There are no surprises hidden behind technical terms. You always know the current stage, what is needed from you and what comes next.</p></div><div className="process">{process.map((step, index) => <article key={step}><b>{String(index + 1).padStart(2, "0")}</b><h3>{step}</h3><p>{index === 3 ? "Responsive checks, key journeys, links and performance review before go-live." : "A focused, documented step with clear decisions and next actions."}</p></article>)}</div></section>

    <section className="section tech-section"><div className="shell"><div className="section-head"><div><span className="section-no">TOOLS THAT FIT</span><h2>Simple when simple is enough. Scalable when it matters.</h2></div><p>Depending on the project, this can mean a fast custom website, WordPress for editable content, React for interactive interfaces, or a lightweight client portal with automations and KPI views.</p></div><div className="english-tools"><article><b>Websites</b><span>Custom code, WordPress, React and PHP where the scope calls for it.</span></article><article><b>Automation</b><span>Forms, reminders, status updates, dashboards and connected tools.</span></article><article><b>Client area</b><span>Clear project status, files, approvals and shared next steps.</span></article></div></div></section>

    <section id="systems" className="section english-systems"><div className="shell"><div className="section-head"><div><span className="section-no">BEYOND THE WEBSITE</span><h2>Small systems that remove everyday friction.</h2></div><p>Not every company needs a large CRM or ERP system. Often a carefully designed, smaller workflow is a more useful and affordable starting point.</p></div><div className="english-system-grid"><article><span>01</span><h3>Enquiry and follow-up flow</h3><p>Forms that send a clear enquiry, confirm receipt and create a practical next step instead of leaving messages scattered across channels.</p></article><article><span>02</span><h3>Client project area</h3><p>A private status page can show progress, next actions, shared files, approvals and an individual project code.</p></article><article><span>03</span><h3>Operations dashboard</h3><p>For suitable businesses, dashboards can bring orders, deadlines, key metrics and process status into one simpler view.</p></article><article><span>04</span><h3>Google visibility foundations</h3><p>Website structure, local business information, Search Console readiness and a Google Business Profile can be planned as one consistent presence.</p></article></div></div></section>

    <section id="work" className="section shell"><div className="section-head"><div><span className="section-no">SELECTED CONCEPTS</span><h2>Different industries need different stories.</h2></div><p>Each concept uses a deliberately different visual direction, rather than one template applied everywhere.</p></div><div className="visual-proof-strip english-proof"><a href="/demo/bistro-strona"><small>HOSPITALITY</small><strong>Bistro Forma</strong><span>Menu, booking journey and atmosphere ↗</span></a><a href="/demo/natura-strona"><small>WELLNESS</small><strong>Natura Studio</strong><span>Calm presentation and booking path ↗</span></a><a href="/demo/dom-strona"><small>PROPERTY</small><strong>Dom Dobry</strong><span>Availability, trust and enquiry flow ↗</span></a></div></section>

    <section className="section english-faq"><div className="shell faq-grid"><div><span className="section-no">FAQ</span><h2>Useful answers before you begin.</h2><p>Plain language, clear expectations and no technical fog.</p></div><div className="faq-list"><details open><summary><span>01</span>Do we need to meet in person?<i>+</i></summary><p>No. Projects can be completed remotely through Google Meet, email and phone. Local meetings around Warsaw remain possible when they add real value.</p></details><details><summary><span>02</span>Can I edit the website later?<i>+</i></summary><p>Yes, when regular updates are part of the plan. WordPress or another suitable content solution can be selected before the project begins.</p></details><details><summary><span>03</span>Will the website rank first in Google?<i>+</i></summary><p>No honest provider can promise a specific position. The website is prepared with technical SEO foundations, mobile usability and a clear structure so it is ready for further SEO work.</p></details><details><summary><span>04</span>What is QA?<i>+</i></summary><p>Quality assurance is the final check before launch: key journeys, forms, links, responsive behaviour, accessibility basics and performance are reviewed and documented.</p></details><details><summary><span>05</span>Can we start small and grow later?<i>+</i></summary><p>Yes. A one-page site can become a broader website, portfolio, booking flow, client area or automation system as the business develops.</p></details><details><summary><span>06</span>What happens after launch?<i>+</i></summary><p>You receive the agreed access, update guidance and QA handover. Ongoing care can include monitoring, updates, backups, form checks and small content changes.</p></details></div></div></section>

    <section id="contact" className="section contact-section"><div className="shell contact-grid"><div><span className="section-no">LET&apos;S TALK</span><h2>Tell me about your business.</h2><p>We can meet online through Google Meet or work entirely by email and phone. Local meetings are possible around Warsaw; remote collaboration is available across Poland.</p><div className="contact-direct"><a href="tel:+48450458466"><small>MOBILE</small><strong>+48 450 458 466</strong></a><a href="mailto:lukasz.staniewicz@gmail.com"><small>E-MAIL</small><strong>lukasz.staniewicz@gmail.com</strong></a></div></div><div className="english-contact-card"><span>SHORT BRIEF</span><h3>Start with the essentials.</h3><p>What does your company do, what should the website help with, and when would you like to launch?</p><a className="button" href="mailto:lukasz.staniewicz@gmail.com?subject=Website%20enquiry%20from%20zielona-marka.pl">Send an enquiry <span>↗</span></a></div></div></section>

    <footer><div className="shell footer-grid"><a className="brand" href="/en"><BrandSignature /></a><p>Websites and systems for businesses. Designed in Poland, available remotely.</p><div><a href="/">Polish version</a><a href="/polityka-prywatnosci">Privacy</a><a href="https://github.com/lukaszst-cz" target="_blank" rel="noreferrer">GitHub ↗</a></div></div></footer>
  </main>;
}
