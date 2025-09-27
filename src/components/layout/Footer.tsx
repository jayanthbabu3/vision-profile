import { PenTool, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                  <PenTool className="w-4 h-4 text-white" />
                </div>
                <span className="font-heading font-bold text-xl text-white">ResumeAI</span>
              </div>
              <p className="text-slate-400 mb-6 max-w-md">
                Build premium, ATS-friendly resumes with AI assistance. 
                Get hired faster with professional templates and smart optimization.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <nav className="space-y-3">
                <a href="/templates" className="block hover:text-primary transition-colors">Templates</a>
                <a href="/super-resumes" className="block hover:text-primary transition-colors">Super Resumes</a>
                <a href="/ai-features" className="block hover:text-primary transition-colors">AI Features</a>
                <a href="/pricing" className="block hover:text-primary transition-colors">Pricing</a>
              </nav>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <nav className="space-y-3">
                <a href="/blog" className="block hover:text-primary transition-colors">Resume Tips</a>
                <a href="/guides" className="block hover:text-primary transition-colors">Career Guides</a>
                <a href="/examples" className="block hover:text-primary transition-colors">Examples</a>
                <a href="/help" className="block hover:text-primary transition-colors">Help Center</a>
              </nav>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <nav className="space-y-3">
                <a href="/about" className="block hover:text-primary transition-colors">About</a>
                <a href="/careers" className="block hover:text-primary transition-colors">Careers</a>
                <a href="/privacy" className="block hover:text-primary transition-colors">Privacy</a>
                <a href="/terms" className="block hover:text-primary transition-colors">Terms</a>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-slate-400 text-sm">
              © 2024 ResumeAI. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>GDPR Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;