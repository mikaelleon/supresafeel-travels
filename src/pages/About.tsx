import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Eye, Heart, Fingerprint, Shield, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const team: {
  name: string;
  role: string;
  photo: string | null;
  motto: string;
  bio: string;
}[] = [
  {
    name: "Rieza F. Husmillo",
    role: "Owner / Founder",
    photo: "/members/husmillo.jpg",
    motto: "Believes every trip should end with good food.",
    bio: "Started SurpreSaFeel to prove planning can feel human, not transactional. Still sketches itineraries by hand when a trip needs extra soul.",
  },
  {
    name: "John Jovenn R. Matibag",
    role: "Operations",
    photo: "/members/matibag.jpg",
    motto: "Calm logistics, zero drama.",
    bio: "Keeps flights, transfers, and timelines airtight so you never have to think about the spreadsheet side of travel.",
  },
  {
    name: "Jhasmine D. Maralit",
    role: "Travel Planner",
    photo: "/members/maralit.jpg",
    motto: "Packs curiosity before packing clothes.",
    bio: "Builds day-by-day flows that match your pace—whether you want slow mornings or sunrise-to-midnight adventure.",
  },
  {
    name: "Zyna Daisyrey A. Mecolita",
    role: "Marketing Manager",
    photo: "/members/mecolita.jpg",
    motto: "Stories sell; feelings stick.",
    bio: "Shapes how we talk about emotion-led travel online. Loves turning client wins into content that actually helps someone choose rest over rush.",
  },
  {
    name: "Hanna Rose D. Perez",
    role: "Customer Support",
    photo: "/members/perez.jpg",
    motto: "Replies fast, listens slower.",
    bio: "First voice many travelers hear. Turns worries into clear next steps so nobody feels lost before departure day.",
  },
  {
    name: "Richmoon A. Sandro",
    role: "Finance & Admin",
    photo: "/members/sandro.jpg",
    motto: "Numbers quiet, trips loud.",
    bio: "Guards budgets and receipts so planners can stay creative. Thinks transparency builds trust faster than any slogan.",
  },
  {
    name: "Sarah Faye S. Selmo",
    role: "Creative Strategist",
    photo: null,
    motto: "Designs for the feeling between photos.",
    bio: "Crafts visual language and campaign ideas that match the brand’s warmth. Big on mood boards and tiny human details.",
  },
];

const values: { icon: typeof Heart; title: string; lines: [string, string] }[] = [
  {
    icon: Heart,
    title: "Emotion First",
    lines: [
      "We ask how you want to feel on the trip—not only which stamps you want in your passport.",
      "That emotional anchor becomes the filter for destinations, pacing, and the kind of memories we aim for.",
    ],
  },
  {
    icon: Fingerprint,
    title: "Personalized Always",
    lines: [
      "Templates get tossed. Your story, budget, and bandwidth shape every suggestion we make.",
      "Two travelers with the same city on their list can still get wildly different days because their reasons for going differ.",
    ],
  },
  {
    icon: Shield,
    title: "Reliable & Honest",
    lines: [
      "We work with operators we would send our own families to, and we say no when something is a bad fit.",
      "If a route is unrealistic or a season is wrong for the vibe you want, you will hear it early—not at the airport.",
    ],
  },
];

function ScrollReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            obs.disconnect();
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`about-reveal ${className}`}>
      {children}
    </div>
  );
}

const About = () => {
  return (
    <div className="page-fade-in">
      {/* Hero */}
      <section className="relative min-h-[42vh] md:min-h-[48vh] flex items-end overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80)",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to top right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 100%)",
          }}
          aria-hidden
        />
        <div className="relative z-10 container mx-auto px-4 pb-14 md:pb-20 max-w-4xl">
          <p className="text-primary-foreground/90 text-sm font-medium tracking-wide uppercase mb-2 [text-shadow:0_2px_12px_rgba(0,0,0,0.4)]">
            About us
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 [text-shadow:0_2px_12px_rgba(0,0,0,0.4)]">
            Heart-to-heart travel
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground max-w-2xl leading-relaxed [text-shadow:0_2px_12px_rgba(0,0,0,0.4)]">
            Filipino planners who build trips around how you want to feel—then sweat the details so you do not have to.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">
            We Started With a Feeling
          </h2>
          <div className="space-y-6 text-muted-foreground text-lg leading-[1.85] text-left">
            <p>
              SurpreSaFeel Travels was born from a simple question: what if your next trip was planned around how you feel, not just where you want to go?
            </p>
            <p>
              We are a digital-first travel planning service based in the Philippines, dedicated to turning your emotions into meaningful journeys—so the itinerary matches the person you are this season, not a generic checklist.
            </p>
          </div>
          <blockquote className="mt-10 relative overflow-hidden rounded-2xl border-2 border-primary/35 bg-gradient-to-br from-primary/25 via-primary/15 to-secondary/10 p-8 md:p-10 shadow-lg ring-1 ring-primary/20">
            <span className="absolute left-4 top-4 font-serif text-6xl md:text-7xl text-primary/25 leading-none select-none" aria-hidden>
              &ldquo;
            </span>
            <p className="relative z-10 pl-2 md:pl-6 font-serif text-xl md:text-2xl lg:text-[1.65rem] italic text-foreground leading-[1.65] text-center md:text-left">
              To deliver tailor-made travel experiences that are heart-to-heart, with an emphasis on bringing in emotions, reliability, quality, and individuality.
            </p>
          </blockquote>
        </div>
      </section>

      {/* Why emotion-based travel */}
      <section className="py-14 px-4 bg-muted/40 border-y border-border/50">
        <div className="container mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-5 md:gap-10 items-center">
            <div className="md:col-span-3">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Why Emotion-Based Travel?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Most travelers return wishing the trip matched their mood—not just their Instagram feed. When plans align with how you actually want to feel (rested, brave, reconnected), the same budget buys a deeper payoff.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We use that emotional read as the compass: it decides pacing, geography, and where we splurge versus simplify—before we touch flights or hotels.
              </p>
            </div>
            <div className="md:col-span-2 rounded-2xl bg-card border border-border/80 p-6 md:p-8 text-center shadow-sm">
              <p className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">72%</p>
              <p className="text-sm text-muted-foreground leading-snug">
                of travelers in recent leisure surveys say their last trip did not fully match what they needed emotionally—only the places they ticked off.
              </p>
              <p className="text-xs text-muted-foreground/70 mt-4">Illustrative composite; not a single-study claim. Point: vibe-first planning matters.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision — split, distinct */}
      <section className="py-16 md:py-20 px-0">
        <ScrollReveal>
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="font-heading text-3xl font-bold text-center mb-10 md:mb-12">Mission &amp; Vision</h2>
            <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-border/70 shadow-md">
              <div className="bg-gradient-to-br from-primary/20 via-primary/8 to-background p-8 md:p-12 text-left border-b md:border-b-0 md:border-r border-border/60">
                <div className="w-14 h-14 rounded-xl bg-primary/25 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary" aria-hidden />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To provide personalized travel planning services that prioritize emotional connection, cultural sensitivity, and unforgettable experiences for every traveler.
                </p>
              </div>
              <div className="bg-gradient-to-bl from-secondary/25 via-secondary/10 to-muted/30 p-8 md:p-12 text-left md:text-right">
                <div className="w-14 h-14 rounded-xl bg-secondary/35 flex items-center justify-center mb-6 md:ml-auto">
                  <Eye className="w-7 h-7 text-secondary-foreground" aria-hidden />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed md:ml-auto md:max-w-md">
                  To be the leading travel planning brand in the Philippines—recognized for heartfelt service, innovation, and genuine care for each client&apos;s journey.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Team */}
      <section className="py-16 md:py-20 px-4 bg-muted/30">
        <ScrollReveal>
          <div className="container mx-auto max-w-6xl">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">Meet the Team</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              Real people behind your plans—hover a card to read a little more.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {team.map((m) => (
                <div
                  key={m.name}
                  className="group rounded-2xl border border-border/70 bg-card text-center overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="aspect-square overflow-hidden bg-muted">
                    {m.photo ? (
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm px-4">
                        Photo coming soon
                      </div>
                    )}
                  </div>
                  <div className="p-5 text-left">
                    <h3 className="font-heading font-semibold text-lg">{m.name}</h3>
                    <p className="text-sm text-primary font-medium">{m.role}</p>
                    <p className="text-sm italic text-muted-foreground mt-2 leading-snug border-l-2 border-primary/40 pl-3">
                      {m.motto}
                    </p>
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                      <div className="overflow-hidden min-h-0">
                        <p className="text-xs text-muted-foreground leading-relaxed pt-4 border-t border-border/60 mt-4">
                          {m.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Values */}
      <section className="py-20 md:py-24 px-4">
        <ScrollReveal>
          <div className="container mx-auto max-w-6xl">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-14 md:mb-16">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8 md:gap-10">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl border border-border/60 bg-card/80 p-10 md:p-12 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 md:w-[4.5rem] md:h-[4.5rem] rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-8">
                    <v.icon className="w-8 h-8 md:w-10 md:h-10 text-primary" strokeWidth={1.75} aria-hidden />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-5">{v.title}</h3>
                  <div className="space-y-3 text-muted-foreground text-left text-[0.95rem] leading-relaxed">
                    <p>{v.lines[0]}</p>
                    <p>{v.lines[1]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-r from-primary/90 via-primary to-secondary/90 text-primary-foreground">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Ready to plan your trip?</h2>
          <p className="text-primary-foreground/90 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Take the Emotion Quiz so we can match your next journey to how you want to feel—not just where you want to land.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="font-semibold shadow-lg"
          >
            <Link to="/questionnaire">Take the Emotion Quiz</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
