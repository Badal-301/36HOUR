"use client";

import { useEffect, useState } from "react";
import { Menu, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/shared/Logo";
import { useRegistrationStore } from "@/lib/registration-store";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "tracks", label: "Tracks" },
  { id: "schedule", label: "Schedule" },
  { id: "prizes", label: "Prizes" },
  { id: "rules", label: "Rules" },
  { id: "faq", label: "FAQ" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const openRegistration = useRegistrationStore((s) => s.open);

  /* Sticky header style change on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active section indicator (anchor the nav to visible section) */
  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.32;
      let current = "";
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) current = item.id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/80 bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        {/* Left — brand */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="rounded-md focus-visible:outline-offset-4"
          aria-label="DEVSPRINT 36 — back to top"
        >
          <Logo />
        </a>

        {/* Center/right — desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                aria-current={activeSection === item.id ? "true" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-offset-4",
                  activeSection === item.id
                    ? "text-acid"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button
            onClick={openRegistration}
            className="hidden font-semibold sm:inline-flex"
            aria-label="Register for DEVSPRINT 36 (opens registration form)"
          >
            Register Now
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Button>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-[86vw] max-w-sm flex-col border-border bg-background"
            >
              <SheetHeader className="border-b border-border">
                <SheetTitle asChild>
                  <div>
                    <Logo compact />
                  </div>
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex-1 overflow-y-auto">
                <ul className="flex flex-col gap-1 px-2 py-4">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.id);
                        }}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium transition-colors",
                          activeSection === item.id
                            ? "bg-secondary text-acid"
                            : "text-foreground/85 hover:bg-secondary"
                        )}
                      >
                        {item.label}
                        <span
                          aria-hidden="true"
                          className="mono-label text-[0.625rem] text-muted-foreground"
                        >
                          0{NAV_ITEMS.indexOf(item) + 1}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="border-t border-border p-4">
                <Button
                  onClick={() => {
                    setMobileOpen(false);
                    openRegistration();
                  }}
                  className="w-full font-semibold"
                >
                  Register Now
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
