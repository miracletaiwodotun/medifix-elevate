import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  Ambulance,
  ArrowRight,
  Baby,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Clock,
  FlaskConical,
  HeartPulse,
  MapPin,
  Mail,
  MessageCircle,
  Navigation,
  Phone,
  Quote,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Users,
} from "lucide-react";

import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import galleryConsult from "@/assets/gallery-consult.jpg";
import galleryWard from "@/assets/gallery-ward.jpg";
import galleryLab from "@/assets/gallery-lab.jpg";
import galleryTheatre from "@/assets/gallery-theatre.jpg";
import galleryWaiting from "@/assets/gallery-waiting.jpg";
import galleryStation from "@/assets/gallery-emergency.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Medifix Hospital Limited | Compassionate Healthcare You Can Trust" },
      {
        name: "description",
        content:
          "Medifix Hospital Limited offers general medical care, maternity, paediatrics, laboratory, surgery and emergency services. Book an appointment or get directions today.",
      },
      {
        property: "og:title",
        content: "Medifix Hospital Limited | Compassionate Healthcare You Can Trust",
      },
      {
        property: "og:description",
        content:
          "Patient-centred hospital care with experienced professionals, modern facilities and quality healthcare. Request an appointment with Medifix Hospital Limited.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Hospital",
          name: "Medifix Hospital Limited",
          description:
            "Hospital providing general medical care, maternity, paediatrics, laboratory, surgery and emergency services.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "[Add hospital address]",
          },
          telephone: "[Add phone number]",
          openingHours: "[Add opening hours]",
        }),
      },
    ],
  }),
  component: HomePage,
});

const SERVICES = [
  {
    icon: Stethoscope,
    title: "General Medical Care",
    body: "Consultations, diagnosis and ongoing treatment for everyday health concerns and chronic conditions.",
  },
  {
    icon: HeartPulse,
    title: "Maternity & Obstetrics",
    body: "Antenatal, delivery and postnatal care in a supportive environment focused on mother and baby safety.",
  },
  {
    icon: Baby,
    title: "Paediatrics",
    body: "Attentive care for infants, children and adolescents, from routine check-ups to acute illness.",
  },
  {
    icon: FlaskConical,
    title: "Laboratory Services",
    body: "Diagnostic testing and sample analysis to support accurate, timely clinical decisions.",
  },
  {
    icon: Ambulance,
    title: "Emergency Care",
    body: "Prompt assessment and stabilisation for urgent medical situations. [Confirm emergency cover hours]",
  },
  {
    icon: Syringe,
    title: "Surgery",
    body: "Surgical procedures carried out with strict attention to sterility, safety and recovery support.",
  },
  {
    icon: ShieldCheck,
    title: "Preventive Healthcare",
    body: "Health screening, immunisation and wellness guidance to help you stay ahead of illness.",
  },
];

const WHY = [
  {
    icon: Users,
    title: "Experienced healthcare professionals",
    body: "A clinical team committed to careful assessment and clear communication at every visit.",
  },
  {
    icon: HeartPulse,
    title: "Patient-centred care",
    body: "Treatment plans built around your needs, comfort, dignity and understanding.",
  },
  {
    icon: Building2,
    title: "Modern facilities",
    body: "Clean consultation rooms, wards and treatment areas designed for safe, efficient care.",
  },
  {
    icon: MapPin,
    title: "Accessible location",
    body: "Easy to reach for the surrounding community. [Add location and landmark details]",
  },
  {
    icon: Activity,
    title: "Quality healthcare",
    body: "Consistent clinical standards, infection control and patient safety practices.",
  },
  {
    icon: Clock,
    title: "Availability",
    body: "[Confirm whether 24/7 services are available before publishing this claim]",
  },
];

const GALLERY = [
  { src: galleryWaiting, alt: "Bright hospital waiting area with seating and plants", span: "lg:col-span-2 lg:row-span-2" },
  { src: galleryConsult, alt: "Modern consultation room with examination bed", span: "" },
  { src: galleryWard, alt: "Clean inpatient ward with prepared beds", span: "" },
  { src: galleryLab, alt: "Laboratory technician analysing samples under a microscope", span: "" },
  { src: galleryTheatre, alt: "Operating theatre with surgical lighting and equipment", span: "" },
  { src: galleryStation, alt: "Hospital nurses station with staff at work", span: "sm:col-span-2 lg:col-span-4" },
];

const TESTIMONIALS = [
  {
    quote:
      "The staff explained every step of my treatment and checked on me regularly. I left feeling genuinely cared for.",
    name: "Sample Patient A",
    detail: "Placeholder review — replace with a genuine patient review",
  },
  {
    quote:
      "From reception to consultation the process was calm and organised. The environment was clean and reassuring.",
    name: "Sample Patient B",
    detail: "Placeholder review — replace with a genuine patient review",
  },
  {
    quote:
      "My child was seen quickly and treated with real patience. Clear guidance was given for care at home.",
    name: "Sample Patient C",
    detail: "Placeholder review — replace with a genuine patient review",
  },
];

function HomePage() {
  return (
    <div id="top" className="bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Services />
        <Why />
        <Facilities />
        <Appointment />
        <Testimonials />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-40 top-[-10rem] h-[28rem] w-[28rem] rounded-full bg-teal-soft blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 pt-16 lg:grid-cols-[1.05fr_1fr] lg:pb-28 lg:pt-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            <span className="h-2 w-2 rounded-full bg-teal" />
            Medifix Hospital Limited
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] text-brand sm:text-5xl lg:text-6xl">
            Compassionate Healthcare You Can Trust
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            At Medifix Hospital Limited we combine quality healthcare with patient-centred
            attention — careful diagnosis, clear explanations and treatment delivered in a safe,
            modern environment for you and your family.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#appointment"
              className="inline-flex items-center gap-2 rounded-full gradient-brand px-7 py-4 text-sm font-semibold text-brand-foreground shadow-lift transition-transform hover:-translate-y-0.5"
            >
              Book an Appointment <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-brand/25 px-7 py-4 text-sm font-semibold text-brand transition-colors hover:border-teal hover:text-teal"
            >
              Contact Us
            </a>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <InfoPill
              icon={Ambulance}
              label="Emergency"
              value="[Add emergency number]"
              accent
            />
            <InfoPill icon={Phone} label="Reception" value="[Add phone number]" />
            <InfoPill icon={Clock} label="Opening hours" value="[Add opening hours]" />
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] shadow-lift">
            <img
              src={heroImg}
              alt="Reception area of a modern hospital with a nurse assisting a patient"
              width={1600}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-4 right-4 rounded-2xl border border-border bg-background/95 p-5 shadow-card backdrop-blur sm:left-8 sm:right-auto sm:max-w-xs">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-teal-soft text-teal">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-brand">
                  Patient safety first
                </p>
                <p className="text-xs text-muted-foreground">
                  Infection control and clinical standards at every step
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoPill({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border p-4 ${
        accent ? "border-emergency/30 bg-emergency/5" : "border-border bg-surface"
      }`}
    >
      <Icon className={`h-5 w-5 shrink-0 ${accent ? "text-emergency" : "text-teal"}`} />
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </p>
        <p className="truncate text-sm font-semibold text-brand">{value}</p>
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="border-y border-border bg-surface py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="reveal overflow-hidden rounded-[2rem] shadow-card">
          <img
            src={aboutImg}
            alt="Two hospital doctors reviewing a patient chart together"
            width={1200}
            height={1408}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="reveal">
          <p className="eyebrow">About Medifix</p>
          <h2 className="mt-4 text-3xl font-bold text-brand sm:text-4xl">
            A hospital built around professionalism and compassion
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Medifix Hospital Limited is a healthcare facility dedicated to providing dependable
            medical services to individuals and families. Our approach is simple: listen carefully,
            diagnose thoroughly and treat with respect.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Patient safety and quality healthcare guide how we run our clinical spaces, manage
            records and support recovery. [Add hospital history, ownership details and year
            established once confirmed.]
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Professional clinical practice",
              "Compassionate patient care",
              "Patient safety standards",
              "Quality healthcare delivery",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm font-medium text-brand">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-teal" />
                {item}
              </li>
            ))}
          </ul>
          <a
            href="#services"
            className="mt-9 inline-flex items-center gap-2 rounded-full border border-brand/25 px-6 py-3.5 text-sm font-semibold text-brand transition-colors hover:border-teal hover:text-teal"
          >
            Learn More <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="reveal mx-auto max-w-2xl text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-bold text-brand sm:text-4xl">{title}</h2>
      {body ? <p className="mt-4 text-base leading-relaxed text-muted-foreground">{body}</p> : null}
    </div>
  );
}

function Services() {
  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Our Services"
          title="Care across the areas that matter most"
          body="Services listed below are indicative for this prototype. [Confirm the full list of services offered before publishing.]"
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="reveal group rounded-3xl border border-border bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-lift"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-soft text-teal transition-colors group-hover:gradient-brand group-hover:text-brand-foreground">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-lg font-semibold text-brand">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              <a
                href="#appointment"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal"
              >
                Request this service <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          ))}
          <article className="reveal flex flex-col justify-between rounded-3xl gradient-brand p-7 text-brand-foreground shadow-lift">
            <div>
              <h3 className="text-lg font-semibold">Not sure which service you need?</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-foreground/80">
                Speak with our team and we will guide you to the right care pathway.
              </p>
            </div>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3.5 text-sm font-semibold text-brand"
            >
              Talk to us <ArrowRight className="h-4 w-4" />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section id="why" className="border-y border-border bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Why Choose Medifix"
          title="Reasons families keep coming back"
          body="Every point below reflects how we intend to care for patients. Claims in brackets must be confirmed before publishing."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WHY.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="reveal rounded-3xl border border-border bg-card p-7 shadow-card"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/5 text-brand">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-base font-semibold text-brand">{title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Facilities() {
  return (
    <section id="facilities" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Facilities"
          title="A calm, clean environment for healing"
          body="Representative images of hospital spaces. [Replace with photographs of the Medifix facility.]"
        />
        <div className="mt-14 grid auto-rows-[190px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GALLERY.map((item) => (
            <figure
              key={item.alt}
              className={`reveal group relative overflow-hidden rounded-2xl shadow-card ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                width={1200}
                height={900}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-brand-deep/70 px-4 py-3 text-xs font-medium text-brand-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {item.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const FIELD =
  "mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-teal focus:ring-2 focus:ring-teal/25";
const LABEL = "block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground";

function Appointment() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="appointment" className="border-y border-border bg-surface py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-start gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="reveal">
          <p className="eyebrow">Appointments</p>
          <h2 className="mt-4 text-3xl font-bold text-brand sm:text-4xl">
            Request an appointment in under a minute
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Share a few details and our team will follow up to confirm your preferred date and
            service. For urgent medical situations, please call the emergency line instead.
          </p>
          <div className="mt-8 space-y-3">
            <InfoPill icon={Ambulance} label="Emergency" value="[Add emergency number]" accent />
            <InfoPill icon={MessageCircle} label="WhatsApp" value="[Add WhatsApp number]" />
            <InfoPill icon={CalendarCheck} label="Response time" value="[Add response time]" />
          </div>
        </div>

        <form
          className="reveal rounded-3xl border border-border bg-card p-7 shadow-lift sm:p-9"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={LABEL} htmlFor="name">
                Full name
              </label>
              <input id="name" name="name" required placeholder="Your full name" className={FIELD} />
            </div>
            <div>
              <label className={LABEL} htmlFor="phone">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="Your phone number"
                className={FIELD}
              />
            </div>
            <div>
              <label className={LABEL} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className={FIELD}
              />
            </div>
            <div>
              <label className={LABEL} htmlFor="date">
                Preferred date
              </label>
              <input id="date" name="date" type="date" required className={FIELD} />
            </div>
            <div>
              <label className={LABEL} htmlFor="service">
                Preferred service
              </label>
              <select id="service" name="service" required defaultValue="" className={FIELD}>
                <option value="" disabled>
                  Select a service
                </option>
                {SERVICES.map((s) => (
                  <option key={s.title} value={s.title}>
                    {s.title}
                  </option>
                ))}
                <option value="Other">Other / not sure</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={LABEL} htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Briefly describe your concern or preferred time"
                className={FIELD}
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-7 w-full rounded-full gradient-brand px-6 py-4 text-sm font-semibold text-brand-foreground shadow-card transition-transform hover:-translate-y-0.5"
          >
            Request Appointment
          </button>

          {submitted ? (
            <p className="mt-4 rounded-xl border border-teal/30 bg-teal-soft px-4 py-3 text-sm font-medium text-brand">
              Thank you — your request has been captured in this prototype. [Connect this form to
              the hospital's email or booking system before going live.]
            </p>
          ) : (
            <p className="mt-4 text-xs text-muted-foreground">
              Prototype form — submissions are not yet delivered anywhere.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="Sample patient feedback"
          body="The quotes below are sample placeholder content created for layout purposes only. Replace them with genuine, permissioned patient reviews."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.name}
              className="reveal flex flex-col rounded-3xl border border-border bg-card p-8 shadow-card"
            >
              <Quote className="h-8 w-8 text-teal/40" />
              <p className="mt-5 flex-1 text-base leading-relaxed text-foreground/85">"{t.quote}"</p>
              <footer className="mt-7 border-t border-border pt-5">
                <p className="text-sm font-semibold text-brand">{t.name}</p>
                <p className="mt-1 text-xs italic text-muted-foreground">{t.detail}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-t border-border bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Reach Medifix Hospital Limited"
          body="Contact details in brackets are placeholders. [Provide verified address, phone, WhatsApp, email and opening hours.]"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <div className="reveal space-y-4 lg:col-span-1">
            <ContactRow icon={MapPin} label="Address" value="[Add hospital address]" />
            <ContactRow icon={Phone} label="Phone" value="[Add phone number]" />
            <ContactRow icon={Mail} label="Email" value="[Add email address]" />
            <ContactRow icon={Clock} label="Opening hours" value="[Add opening hours]" />
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-teal px-6 py-3.5 text-sm font-semibold text-teal-foreground transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </a>
              <a
                href="tel:+000000000000"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-brand/25 px-6 py-3.5 text-sm font-semibold text-brand transition-colors hover:border-teal hover:text-teal"
              >
                <Phone className="h-4 w-4" /> Call
              </a>
            </div>
          </div>

          <div className="reveal overflow-hidden rounded-3xl border border-border bg-card shadow-card lg:col-span-2">
            <div className="relative h-72 w-full bg-brand-deep/90 sm:h-80">
              <div className="absolute inset-0 grid place-items-center px-6 text-center">
                <div>
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-teal text-teal-foreground">
                    <MapPin className="h-6 w-6" />
                  </span>
                  <p className="mt-5 font-display text-lg font-semibold text-brand-foreground">
                    Map placeholder
                  </p>
                  <p className="mx-auto mt-2 max-w-sm text-sm text-brand-foreground/70">
                    [Embed the Google Maps location for Medifix Hospital Limited once the verified
                    address is available.]
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 p-7 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-base font-semibold text-brand">
                  Planning your visit?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Open directions on your phone and we will be ready for you.
                </p>
              </div>
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full gradient-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-card transition-transform hover:-translate-y-0.5"
              >
                <Navigation className="h-4 w-4" /> Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-soft text-teal">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 text-sm font-semibold text-brand">{value}</p>
      </div>
    </div>
  );
}
