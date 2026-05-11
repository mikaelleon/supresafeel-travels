import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="mb-3">
              <BrandLogo variant="footer" />
            </div>
            <p className="text-sm text-background/70 italic">"Where Emotion Leads, We Follow."</p>
          </div>

          {/* Nav Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-3 text-primary">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/services", label: "Services" },
                { to: "/questionnaire", label: "Questionnaire" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="text-sm text-background/70 hover:text-primary transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-3 text-primary">Get in Touch</h4>
            <div className="space-y-2 text-sm text-background/70">
              <a href="mailto:SurpreSaFeelTravels@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" /> SurpreSaFeelTravels@gmail.com
              </a>
              <a href="tel:09123456789" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" /> 0912-345-6789
              </a>
            </div>
            <div className="flex gap-4 mt-4">
              <a href="https://facebook.com/SurpreSaFeelTravels" target="_blank" rel="noopener noreferrer" className="text-background/70 hover:text-primary transition-colors text-sm font-medium">
                Facebook
              </a>
              <a href="https://tiktok.com/@SurpreSaFeelTravels" target="_blank" rel="noopener noreferrer" className="text-background/70 hover:text-primary transition-colors text-sm font-medium">
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-6 text-center text-xs text-background/50">
          © 2026 SurpreSaFeel Travels. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
