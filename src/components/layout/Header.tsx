import { Button } from "@/components/ui/button";
import { PenTool, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const navLinks = [
  {
    label: "Templates",
    to: "/templates",
  },
  {
    label: "Resources",
    href: "#resources",
  },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-container items-center justify-between px-6 lg:px-8 xl:max-w-[1400px]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero shadow-lg">
            <PenTool className="h-5 w-5 text-white" />
          </div>
          <span className="font-heading text-lg font-semibold tracking-tight text-foreground">
            ResumeAI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <nav className="flex items-center gap-4">
            {navLinks.map((link) => (
              link.to ? (
                <Link
                  key={link.label}
                  to={link.to}
                  className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
                >
                  {link.label}
                </a>
              )
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" className="rounded-full border border-border px-5 py-2 text-sm font-medium">
              Sign In
            </Button>
            <Link to="/resume/template-classic-001" className="btn-hero rounded-full px-6 py-2 text-sm font-semibold">
              Launch Builder
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden rounded-full border border-border bg-background/80 p-2 text-muted-foreground shadow-sm"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-border/60 bg-background/95 px-6 pb-6 pt-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              link.to ? (
                <Link
                  key={link.label}
                  to={link.to}
                  className="rounded-xl border border-border/70 px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-xl border border-border/70 px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              )
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-3">
            <Button variant="ghost" className="w-full rounded-xl border border-border px-4 py-3 text-sm font-medium">
              Sign In
            </Button>
            <Link
              to="/resume/template-classic-001"
              className="btn-hero w-full rounded-xl px-4 py-3 text-center text-sm font-semibold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Launch Builder
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
