import { Link } from "react-router-dom";
import {
  Backpack,
  Compass,
  Heart,
  Map,
  Mountain,
  Sunrise,
  Users,
  Waves,
  type LucideIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const trips: { icon: LucideIcon; name: string; mood: string; location: string }[] = [
  { icon: Sunrise, name: "Tagaytay Escape", mood: "Stress Relief", location: "Tagaytay, Batangas" },
  { icon: Waves, name: "Batangas Beach Reset", mood: "Relaxation", location: "Batangas" },
  { icon: Mountain, name: "Baguio Wanderer", mood: "Budget Adventure", location: "Baguio City" },
  { icon: Heart, name: "Cebu Romantic Getaway", mood: "Romance", location: "Cebu" },
  { icon: Users, name: "Zambales Family Trip", mood: "Bonding", location: "Zambales" },
  { icon: Backpack, name: "Vigan Solo Journey", mood: "Self-Discovery", location: "Vigan, Ilocos Sur" },
];

const steps = [
  { icon: Heart, title: "Tell Us How You Feel", desc: "You answer a short emotional assessment" },
  { icon: Map, title: "We Plan Your Journey", desc: "Our team builds a personalized itinerary" },
  { icon: Compass, title: "You Travel Your Way", desc: "Experience a trip designed around your emotions" },
];

const faqItems: { q: string; a: string }[] = [
  {
    q: "What is emotion-based travel planning?",
    a: "Instead of starting with a destination list, we start with how you want to feel—rested, reconnected, brave, or something else—and shape pacing, places, and activities around that emotional goal.",
  },
  {
    q: "How much does a personalized itinerary cost?",
    a: "Sample itineraries on this site are inspiration only. Your custom plan is built after the Emotion Quiz; pricing starts at ₱1,000 for a personalized itinerary—details are confirmed when we review your answers.",
  },
  {
    q: "Who is SurpreSaFeel for?",
    a: "We work especially with Filipino travelers (millennials and Gen Z) who want trips that match their mood and bandwidth—not a one-size-fits-all template.",
  },
  {
    q: "Do I have to take the Emotion Quiz?",
    a: "The quiz helps us capture how you want to feel and your travel style in one pass. If you prefer email instead, reach out via our Contact page and we will guide you from there.",
  },
  {
    q: "How long does it take to get my itinerary?",
    a: "Turnaround depends on trip complexity and how complete your inputs are. After you submit the questionnaire, our team reviews it and follows up with next steps and timing.",
  },
  {
    q: "Where are you based?",
    a: "SurpreSaFeel Travels is a digital-first travel planning service based in the Philippines. We plan remotely and coordinate with you online.",
  },
];

const Index = () => {
  return (
    <div className="page-fade-in">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(37 91% 55% / 0.15), hsl(180 61% 26% / 0.1))" }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
            Travel the Way You <span className="text-primary">Feel</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
            We don't ask where you want to go. We ask how you want to feel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/questionnaire" className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg hover:opacity-90 transition-opacity text-base">
              Take the Emotion Quiz
            </Link>
            <a href="#what-we-do" className="px-8 py-3 rounded-full border-2 border-secondary text-secondary font-semibold hover:bg-secondary hover:text-secondary-foreground transition-colors text-base">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section id="what-we-do" className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="bg-card rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-shadow border border-border">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Itineraries */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">Sample Itineraries</h2>
          <p className="text-center text-muted-foreground mb-12">Discover trips designed around real emotions</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((t, i) => {
              const TripIcon = t.icon;
              return (
              <div key={i} className="bg-card rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border border-border group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <TripIcon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-1">{t.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{t.location}</p>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  {t.mood}
                </span>
              </div>
            );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4" style={{ background: "linear-gradient(135deg, hsl(37 91% 55%), hsl(180 61% 26%))" }}>
        <div className="container mx-auto max-w-2xl text-center text-white">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Ready to Travel the Way You Feel?</h2>
          <p className="text-lg mb-8 text-white/90">
            Answer a few questions and let us build your dream itinerary. ₱1,000 per personalized plan.
          </p>
          <Link to="/questionnaire" className="inline-block px-8 py-3 rounded-full bg-white text-foreground font-semibold shadow-lg hover:opacity-90 transition-opacity">
            Start Your Emotion Quiz
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 border-t border-border/60 bg-muted/25">
        <div className="container mx-auto max-w-2xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-center text-muted-foreground mb-10 text-sm md:text-base">
            Quick answers about how SurpreSaFeel plans trips around how you want to feel.
          </p>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border/80">
                <AccordionTrigger className="text-left font-heading text-base md:text-lg hover:no-underline py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-[0.95rem]">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Still unsure?{" "}
            <Link to="/contact" className="font-medium text-primary underline-offset-2 hover:underline">
              Contact us
            </Link>{" "}
            or{" "}
            <Link to="/questionnaire" className="font-medium text-primary underline-offset-2 hover:underline">
              take the Emotion Quiz
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
