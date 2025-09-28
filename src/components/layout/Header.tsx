import { Button } from "@/components/ui/button";
import { PenTool, User, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <PenTool className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-xl">ResumeAI</span>
          </Link>

          {/* Desktop Navigation & Actions */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              <Link to="/templates" className="btn-ghost">
                Templates
              </Link>
              <a href="/super-resumes" className="btn-ghost">
                Examples
              </a>
              <a href="/pricing" className="btn-ghost">
                Pricing
              </a>
            </nav>
            
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link to="/templates" className="btn-ghost text-left justify-start">
                Templates
              </Link>
              <a href="/super-resumes" className="btn-ghost text-left justify-start">
                Examples
              </a>
              <a href="/pricing" className="btn-ghost text-left justify-start">
                Pricing
              </a>
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <Button variant="ghost" className="justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <button className="btn-hero">
                  Start Building
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;