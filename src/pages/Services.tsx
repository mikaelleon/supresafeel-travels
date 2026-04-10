import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const moods = [
  { emoji: "😌", name: "Stress Relief", desc: "Perfect for when you need to breathe again", dest: "Tagaytay, Batangas" },
  { emoji: "🌊", name: "Relaxation", desc: "Slow down, feel the sea, reset your mind", dest: "Zambales, La Union" },
  { emoji: "❤️", name: "Romance", desc: "Intimate escapes for two", dest: "Cebu, Palawan" },
  { emoji: "🧗", name: "Adventure", desc: "Chase thrills and new experiences", dest: "Baguio, Ilocos" },
  { emoji: "👨‍👩‍👧", name: "Bonding", desc: "Create memories with the people you love", dest: "Batangas, Tagaytay" },
  { emoji: "🎒", name: "Solo Discovery", desc: "Find yourself on the road alone", dest: "Vigan, Batad" },
];

const included = [
  "Emotional assessment review",
  "Custom destination recommendation",
  "Day-by-day itinerary",
  "Budget breakdown",
  "Activity and food suggestions",
  "Local tips and reminders",
];

const timeline = [
  { step: "1", title: "Fill out the emotion quiz", desc: "Tell us how you want to feel" },
  { step: "2", title: "We review and plan", desc: "Our team crafts your itinerary" },
  { step: "3", title: "Receive your plan", desc: "Within 24-48 hours in your inbox" },
];

const Services = () => {
  return (
    <div className="page-fade-in pt-20">
      {/* Header */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-2xl">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">What We Offer</h1>
          <p className="text-muted-foreground text-lg">Every plan is built around your emotion, not a template.</p>
        </div>
      </section>

      {/* Mood Cards */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {moods.map((m, i) => (
            <div key={i} className="bg-card rounded-2xl p-6 shadow-md border border-border hover:shadow-lg transition-shadow">
              <span className="text-4xl block mb-3">{m.emoji}</span>
              <h3 className="font-heading text-xl font-semibold mb-1">{m.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{m.desc}</p>
              <p className="text-xs text-primary font-semibold">{m.dest}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-lg">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">Simple, Transparent Pricing</h2>
          <div className="bg-card rounded-2xl p-8 shadow-lg border-2 border-primary/30 text-center">
            <p className="text-sm text-muted-foreground mb-2">Per Personalized Itinerary</p>
            <p className="font-heading text-5xl font-bold text-primary mb-6">₱1,000</p>
            <ul className="text-left space-y-3 mb-8">
              {included.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/questionnaire" className="inline-block w-full px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-md hover:opacity-90 transition-opacity">
              Get Your Itinerary
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {timeline.map((t, i) => (
              <div key={i} className="text-center relative">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {t.step}
                </div>
                <h3 className="font-heading text-lg font-semibold mb-1">{t.title}</h3>
                <p className="text-sm text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
