import { useState } from "react";
import { CheckCircle2, Clock, Mail, Phone } from "lucide-react";

const Contact = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="page-fade-in pt-20 min-h-screen">
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Let's Plan Your Next Feeling</h1>
            <p className="text-muted-foreground text-lg">Have questions? We'd love to hear from you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: "SurpreSaFeelTravels@gmail.com", href: "mailto:SurpreSaFeelTravels@gmail.com" },
                { icon: Phone, label: "Phone", value: "0912-345-6789", href: "tel:09123456789" },
                { icon: Mail, label: "Facebook", value: "SurpreSaFeel Travels", href: "https://facebook.com/SurpreSaFeelTravels" },
                { icon: Clock, label: "TikTok", value: "@SurpreSaFeelTravels", href: "https://tiktok.com/@SurpreSaFeelTravels" },
                { icon: Clock, label: "Response Time", value: "We reply within 24 hours", href: "" },
              ].map((c, i) => (
                <div key={i} className="bg-card rounded-xl p-5 shadow-sm border border-border flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <c.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-primary transition-colors">
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-md border border-border">
              {sent ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-2">Message sent!</h3>
                  <p className="text-sm text-muted-foreground">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input type="text" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Message</label>
                    <textarea required rows={4} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                  </div>
                  <button type="submit" className="w-full px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
