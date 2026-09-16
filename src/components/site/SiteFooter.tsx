import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import logo from "../../assets/logo.png.png"

const QUICK_LINKS = [
  { label: "About Medifix", href: "#about" },
  { label: "Our Services", href: "#services" },
  { label: "Why Choose Us", href: "#why" },
  { label: "Facilities", href: "#facilities" },
  { label: "Book Appointment", href: "#appointment" },
];

const SERVICES = [
  "General Medical Care",
  "Maternity & Obstetrics",
  "Paediatrics",
  "Laboratory Services",
  "Emergency Care",
  "Surgery",
];

export function SiteFooter() {
  return (
    <footer className="bg-brand-deep text-brand-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="">
            <img src={logo} alt="medifix logo" className="w-38 h-20"/>
            </span>
            <span className="font-display text-lg font-bold"></span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-brand-foreground/70">
            Compassionate, patient-centred hospital care delivered by a professional clinical team
            in a safe and modern environment.
          </p>
          <div className="mt-6 flex gap-3">
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#contact"
                aria-label="Social media profile placeholder"
                className="grid h-10 w-10 place-items-center rounded-full border border-brand-foreground/20 transition-colors hover:border-teal hover:bg-teal/20"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-teal">
            Quick Links
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-brand-foreground/75">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-brand-foreground">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-teal">Services</h3>
          <ul className="mt-5 space-y-3 text-sm text-brand-foreground/75">
            {SERVICES.map((s) => (
              <li key={s}>
                <a href="#services" className="transition-colors hover:text-brand-foreground">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-teal">Contact</h3>
          <ul className="mt-5 space-y-4 text-sm text-brand-foreground/75">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
              <span>Medifiix Hospital, Opposite Agano Palace, near New Market, Ajara-Aganmathen, Badagry, Lagos State.</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
              <span>08034151457</span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
              <span>medifixhospitalltd@gmail.com</span>
            </li>
          </ul>
          <a
            href="#appointment"
            className="mt-6 inline-block rounded-full bg-teal px-5 py-3 text-sm font-semibold text-teal-foreground transition-transform hover:-translate-y-0.5"
          >
            Request an Appointment
          </a>
        </div>
      </div>

      <div className="border-t border-brand-foreground/10">
  <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-brand-foreground/60 sm:flex-row sm:items-center sm:justify-between">
    <p>© {new Date().getFullYear()} Medifix Hospital Limited. All rights reserved.</p>

    <p className="flex flex-wrap items-center gap-3">
      <span>
        Website by {"Upward Digitals "}
        <a
          href="https://wa.me/2349011936263?text=Hi%20Upward%20Digitals%2C%20I%20found%20you%20through%20the%20Medifix%20Hospital%20website."
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand-foreground underline underline-offset-4 hover:text-teal"
        >
          Upward Digitals
        </a>
      </span>
            <a href="/auth" className="underline underline-offset-4 hover:text-brand-foreground">
              Staff login
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
