import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import logo from "../../assets/logo.png.png"

const NAV = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why Medifix", href: "#why" },
  { label: "Facilities", href: "#facilities" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-brand-deep text-brand-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2 text-xs">
          <p className="opacity-90">
            Emergency line: <span className="font-semibold">08034151457</span>
          </p>
          <p className="opacity-90">
            Opening hours: <span className="font-semibold">24/7</span>
          </p>
        </div>
      </div>

      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-border bg-background/90 backdrop-blur-md shadow-card"
            : "border-transparent bg-background"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <a href="#top" className="flex items-center gap-3">
            <span className="">
              <span className="text-lg font-bold"><img src={logo} alt="medifix logo" className="w-48 h-20"/></span>
            </span>
            <span className="leading-tight">
              
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/75 transition-colors hover:text-teal"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="tel:+2348034151457"
              className="hidden items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-brand transition-colors hover:border-teal hover:text-teal sm:inline-flex"
            >
              <Phone className="h-4 w-4" /> Call now
            </a>
            <a
              href="#appointment"
              className="hidden rounded-full gradient-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-card transition-transform hover:-translate-y-0.5 sm:inline-block"
            >
              Book an Appointment
            </a>
            <button
              type="button"
              aria-label="Toggle navigation"
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-xl border border-border text-brand lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <div className="border-t border-border bg-background px-6 pb-6 pt-2 lg:hidden">
            <nav className="flex flex-col">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border/60 py-3 text-sm font-medium text-foreground/80"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href="#appointment"
              onClick={() => setOpen(false)}
              className="mt-4 block rounded-full gradient-brand px-5 py-3 text-center text-sm font-semibold text-brand-foreground"
            >
              Book an Appointment
            </a>
          </div>
        ) : null}
      </div>
    </header>
  );
}
