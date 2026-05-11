import { Eye, Heart, Fingerprint, Shield, Target } from "lucide-react";

const team: { name: string; role: string; photo: string | null }[] = [
  { name: "Rieza F. Husmillo", role: "Owner / Founder", photo: "/members/husmillo.jpg" },
  { name: "John Jovenn R. Matibag", role: "Operations", photo: "/members/matibag.jpg" },
  { name: "Jhasmine D. Maralit", role: "Travel Planner", photo: "/members/maralit.jpg" },
  { name: "Zyna Daisyrey A. Mecolita", role: "Marketing Manager", photo: "/members/mecolita.jpg" },
  { name: "Hanna Rose D. Perez", role: "Customer Support", photo: "/members/perez.jpg" },
  { name: "Richmoon A. Sandro", role: "Finance & Admin", photo: "/members/sandro.jpg" },
  { name: "Sarah Faye S. Selmo", role: "Creative Strategist", photo: null },
];

const values = [
  { icon: Heart, title: "Emotion First", desc: "Every itinerary starts with how you feel" },
  { icon: Fingerprint, title: "Personalized Always", desc: "No two travelers are the same" },
  { icon: Shield, title: "Reliable & Honest", desc: "We partner only with trusted providers" },
];

const About = () => {
  return (
    <div className="page-fade-in pt-20">
      {/* Our Story */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">We Started With a Feeling</h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            SurpreSaFeel Travels was born from a simple question: what if your next trip was planned around how you feel, not just where you want to go? We are a digital-first travel planning service based in the Philippines, dedicated to turning your emotions into meaningful journeys.
          </p>
          <blockquote className="bg-primary/10 border-l-4 border-primary rounded-r-xl p-6 text-left italic text-foreground/80">
            "To deliver tailor-made travel experiences that are heart-to-heart, with an emphasis on bringing in emotions, reliability, quality, and individuality."
          </blockquote>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 bg-muted/50 border-y border-border/60">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-5">
            <Target className="w-7 h-7 text-primary" aria-hidden />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Mission</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Help Filipino travelers plan trips rooted in emotional clarity—through thoughtful questions, honest recommendations, and itineraries that respect budget, time, and how they want to feel when they return home.
          </p>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="w-14 h-14 rounded-full bg-secondary/15 flex items-center justify-center mx-auto mb-5">
            <Eye className="w-7 h-7 text-secondary" aria-hidden />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Vision</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Become the most trusted emotion-first travel brand in the Philippines—where feeling leads, planning follows, and every journey reflects the traveler&apos;s real life, not a generic template.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {team.map(m => (
              <div key={m.name} className="bg-card rounded-2xl p-6 text-center shadow-md border border-border">
                {m.photo ? (
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-2 border-primary/20 shadow-sm"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center text-2xl font-heading font-bold text-primary border-2 border-primary/25">
                    {m.name.charAt(0)}
                  </div>
                )}
                <h3 className="font-heading text-sm font-semibold leading-snug">{m.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-card rounded-2xl p-8 text-center shadow-md border border-border">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
