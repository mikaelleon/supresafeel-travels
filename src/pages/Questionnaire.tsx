import { useState } from "react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const moodOptions = [
  { emoji: "😌", label: "Stress Relief" },
  { emoji: "🌊", label: "Relaxed & Peaceful" },
  { emoji: "❤️", label: "Romantic" },
  { emoji: "🧗", label: "Adventurous" },
  { emoji: "👨‍👩‍👧", label: "Bonding with Loved Ones" },
  { emoji: "🎒", label: "Solo & Reflective" },
];

const budgetOptions = [
  { emoji: "💸", label: "Budget", desc: "Under ₱3,000" },
  { emoji: "💰", label: "Standard", desc: "₱3,000 - ₱7,000" },
  { emoji: "💎", label: "Premium", desc: "₱7,000 - ₱15,000" },
  { emoji: "🌟", label: "Luxury", desc: "₱15,000 and above" },
];

const destTypes = ["Beach", "Mountains", "City", "Countryside", "Cultural/Heritage", "Surprise Me"];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const groupTypes = [
  { label: "Solo", emoji: "🧑" },
  { label: "Couple", emoji: "💑" },
  { label: "Friends (Barkada)", emoji: "👫" },
  { label: "Family", emoji: "👨‍👩‍👧‍👦" },
];

interface FormData {
  name: string;
  email: string;
  contact: string;
  mood: string;
  destinationType: string;
  travelMonth: string;
  numberOfDays: number;
  groupType: string;
  budget: string;
  additionalNotes: string;
  consent: boolean;
}

const Questionnaire = () => {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormData>({
    name: "", email: "", contact: "", mood: "", destinationType: "",
    travelMonth: "", numberOfDays: 3, groupType: "", budget: "",
    additionalNotes: "", consent: false,
  });

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const update = (field: keyof FormData, value: string | number | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const canNext = () => {
    if (step === 1) return form.name.trim() !== "" && form.email.trim() !== "";
    if (step === 2) return form.mood !== "";
    if (step === 3) return form.destinationType !== "" && form.travelMonth !== "" && form.groupType !== "";
    if (step === 4) return form.budget !== "";
    if (step === 5) return form.consent;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("YOUR_APPS_SCRIPT_URL_HERE", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, email: form.email, contact: form.contact,
          mood: form.mood, destinationType: form.destinationType,
          travelMonth: form.travelMonth, numberOfDays: form.numberOfDays,
          groupType: form.groupType, budget: form.budget,
          additionalNotes: form.additionalNotes,
        }),
      });
      if (!res.ok) throw new Error("Failed");
    } catch {
      // Allow submission to show success for demo since URL is placeholder
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    const firstName = form.name.split(" ")[0];
    return (
      <div className="page-fade-in pt-20 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <span className="text-6xl block mb-4">💛</span>
          <h1 className="font-heading text-3xl font-bold mb-4">Your emotion has been received!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you, {firstName}! We'll craft your personalized itinerary and send it to {form.email} within 24–48 hours. In the meantime, follow us on Facebook and TikTok for travel inspo!
          </p>
          <Link to="/" className="inline-block px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-fade-in pt-20 min-h-screen">
      <div className="container mx-auto max-w-2xl px-4 py-12">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-center mb-2">Emotion Quiz</h1>
        <p className="text-center text-muted-foreground mb-8">Step {step} of {totalSteps}</p>
        <Progress value={progress} className="mb-10 h-2" />

        {error && (
          <div className="bg-accent/10 border border-accent text-accent rounded-xl p-4 mb-6 text-sm">
            {error}
          </div>
        )}

        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-md border border-border min-h-[300px]">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="font-heading text-xl font-semibold mb-4">Personal Information</h2>
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input type="text" value={form.name} onChange={e => update("name", e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Juan dela Cruz" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address *</label>
                <input type="email" value={form.email} onChange={e => update("email", e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="juan@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contact Number <span className="text-muted-foreground">(optional)</span></label>
                <input type="text" value={form.contact} onChange={e => update("contact", e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="0912-345-6789" />
              </div>
            </div>
          )}

          {/* Step 2: Mood */}
          {step === 2 && (
            <div>
              <h2 className="font-heading text-xl font-semibold mb-2">How do you want to FEEL on this trip?</h2>
              <p className="text-sm text-muted-foreground mb-6">Select one mood</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {moodOptions.map((m) => (
                  <button key={m.label} onClick={() => update("mood", m.label)}
                    className={`rounded-xl p-4 border-2 text-center transition-all ${
                      form.mood === m.label ? "border-primary bg-primary/10 shadow-md" : "border-border hover:border-primary/50"
                    }`}>
                    <span className="text-3xl block mb-2">{m.emoji}</span>
                    <span className="text-xs font-semibold">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Travel Details */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="font-heading text-xl font-semibold mb-4">Travel Details</h2>
              <div>
                <label className="block text-sm font-medium mb-1">Preferred Destination Type</label>
                <select value={form.destinationType} onChange={e => update("destinationType", e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="">Select...</option>
                  {destTypes.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Travel Month</label>
                <select value={form.travelMonth} onChange={e => update("travelMonth", e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="">Select...</option>
                  {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Number of Days</label>
                <input type="number" min={1} max={14} value={form.numberOfDays}
                  onChange={e => update("numberOfDays", parseInt(e.target.value) || 1)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Travel Group</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {groupTypes.map(g => (
                    <button key={g.label} onClick={() => update("groupType", g.label)}
                      className={`rounded-xl p-3 border-2 text-center transition-all text-sm ${
                        form.groupType === g.label ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                      }`}>
                      <span className="text-xl block mb-1">{g.emoji}</span>
                      <span className="text-xs font-medium">{g.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Budget */}
          {step === 4 && (
            <div>
              <h2 className="font-heading text-xl font-semibold mb-2">What's your travel budget?</h2>
              <p className="text-sm text-muted-foreground mb-6">Select your range</p>
              <div className="grid grid-cols-2 gap-4">
                {budgetOptions.map(b => (
                  <button key={b.label} onClick={() => update("budget", b.label)}
                    className={`rounded-xl p-5 border-2 text-center transition-all ${
                      form.budget === b.label ? "border-primary bg-primary/10 shadow-md" : "border-border hover:border-primary/50"
                    }`}>
                    <span className="text-3xl block mb-2">{b.emoji}</span>
                    <span className="text-sm font-semibold block">{b.label}</span>
                    <span className="text-xs text-muted-foreground">{b.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Notes */}
          {step === 5 && (
            <div className="space-y-5">
              <h2 className="font-heading text-xl font-semibold mb-4">Anything else?</h2>
              <textarea value={form.additionalNotes} onChange={e => update("additionalNotes", e.target.value)}
                rows={4} placeholder="Dietary restrictions, mobility concerns, special occasions, specific places you want to visit..."
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={form.consent} onChange={e => update("consent", e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-input accent-primary" />
                <span className="text-sm text-muted-foreground">
                  I agree to share my travel preferences with SurpreSaFeel Travels for itinerary planning purposes.
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)}
              className="px-6 py-2.5 rounded-full border border-border text-sm font-medium hover:bg-muted transition-colors">
              Back
            </button>
          ) : <div />}
          {step < totalSteps ? (
            <button onClick={() => setStep(step + 1)} disabled={!canNext()}
              className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity">
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={!canNext() || submitting}
              className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity">
              {submitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
