import { Heart, Fingerprint, Shield } from "lucide-react";

const team = [
  { name: "Rieza F. Husmillo", role: "Owner / Founder" },
  { name: "John Jovenn R. Matibag", role: "Operations" },
  { name: "Jhasmine D. Maralit", role: "Travel Planner" },
  { name: "Zyna Daisyrey A. Mecolita", role: "Marketing Manager" },
  { name: "Hanna Rose D. Perez", role: "Customer Support" },
  { name: "Richmoon A. Sandro", role: "Finance & Admin" },
  { name: "Sarah Faye S. Selmo", role: "Creative Strategist" },
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

      {/* Team */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">Meet the Team</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <div key={i} className="bg-card rounded-2xl p-6 text-center shadow-md border border-border">
                <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto mb-3 flex items-center justify-center text-2xl font-heading font-bold text-primary">
                  {m.name.charAt(0)}
                </div>
                <h3 className="font-heading text-sm font-semibold">{m.name}</h3>
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
