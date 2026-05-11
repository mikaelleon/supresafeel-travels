import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, CheckCircle2, XCircle, type LucideIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import BrandLogo from "@/components/BrandLogo";

const ageOptions = ["Below 18", "18-24", "25-34", "35-44", "45 and above"];
const genderOptions = ["Male", "Female", "Prefer not to say"];
const travelFrequency = ["Once a year", "2-3 times a year", "More than 3 times a year"];

const moodOptions = [
  "Happy", "Sad", "Excited", "Inspired", "Peaceful", "Adventurous", "Relaxed", "Angry",
];
const travelTypes = ["Relaxation", "Adventure", "Cultural", "Romantic trips", "Family trips", "Solo travel"];
const budgetOptions = [
  { label: "Below ₱5,000", value: "below5000" },
  { label: "₱5,000 - ₱10,000", value: "5000-10000" },
  { label: "₱10,000 - ₱20,000", value: "10000-20000" },
  { label: "Above ₱20,000", value: "above20000" },
];
const featureOptions = [
  "Personalized itinerary", "Mood-based destination suggestions", "Budget-friendly options",
  "Flexible schedule", "24/7 assistance",
];
const destinationTypeOptions = [
  "Beach destinations", "Mountains", "Cities", "Countryside/Rural areas", "Historical/Cultural sites",
];
const destinationScopeOptions = [
  "Local (within your province)", "Domestic (within the Philippines)", "International",
];
const activityOptions = [
  "Swimming / Beach activities", "Hiking / Trekking", "Food trips", "Shopping",
  "Sightseeing", "Cultural experiences", "Nightlife",
];
const travelDistanceOptions = [
  "1–3 hours travel time", "4–6 hours", "1 day travel", "Willing to travel long distances",
];
const travelWithOptions = ["Alone", "Friends", "Family", "Partner"];
const openToNewOptions = ["Yes", "Maybe", "No"];
const transportOptions = ["Land (bus, car)", "Airplane", "Boat/ferry", "Mix of all"];
const tripLengthOptions = ["Day trip", "2–3 days", "4–7 days", "More than a week"];
const destinationVibeOptions = ["Trending/popular", "Balanced (popular + peaceful)", "Hidden/undiscovered"];

interface FormData {
  name: string;
  age: string;
  gender: string;
  occupation: string;
  travelFrequency: string;
  moods: string[];
  moodOther: string;
  travelTypes: string[];
  budget: string;
  consultationRequested: "" | "yes" | "no";
  additionalNotes: string;
  heardOfEmotionTravel: string;
  expectedFeatures: string[];
  destinationTypes: string[];
  destinationScope: string[];
  activities: string[];
  travelDistance: string;
  travelWith: string[];
  openToNew: string;
  transport: string[];
  tripLength: string;
  destinationVibe: string;
}

const consultationCardOptions: { value: "yes" | "no"; label: string; Icon: LucideIcon }[] = [
  {
    value: "yes",
    label: "Yes, I would like to include a mental health consultation (with additional fee)",
    Icon: CheckCircle2,
  },
  {
    value: "no",
    label: "No, I will proceed with the standard emotional assessment only",
    Icon: XCircle,
  },
];

/** Default production Apps Script Web App (override with VITE_GOOGLE_APPS_SCRIPT_URL). */
const DEFAULT_SURVEY_GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby1NioDwcdhb1pg80K2z0L4Lqi8Y2lerpGOthoNzeJlbzJJtmk_zNDJPgkFzMccng/exec";

const totalSteps = 9;

const Questionnaire = () => {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormData>({
    name: "", age: "", gender: "", occupation: "", travelFrequency: "",
    moods: [], moodOther: "", travelTypes: [], budget: "",
    consultationRequested: "", additionalNotes: "",
    heardOfEmotionTravel: "", expectedFeatures: [], destinationTypes: [],
    destinationScope: [], activities: [], travelDistance: "",
    travelWith: [], openToNew: "", transport: [], tripLength: "", destinationVibe: "",
  });

  const progress = (step / totalSteps) * 100;

  const updateText = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const toggleArray = (field: keyof FormData, value: string) => {
    setForm(prev => {
      const arr = prev[field] as string[];
      return { ...prev, [field]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] };
    });
  };

  const canNext = () => {
    if (step === 1) return form.name.trim() !== "" && form.age !== "" && form.gender !== "";
    if (step === 2) return form.travelFrequency !== "" && form.moods.length > 0;
    if (step === 3) return form.travelTypes.length > 0;
    if (step === 4) return form.budget !== "";
    if (step === 5) return form.consultationRequested === "yes" || form.consultationRequested === "no";
    if (step === 6) return true;
    if (step === 7) return form.heardOfEmotionTravel !== "" && form.expectedFeatures.length > 0;
    if (step === 8) return form.destinationTypes.length > 0 && form.destinationScope.length > 0 && form.activities.length > 0;
    if (step === 9) return form.travelDistance !== "" && form.travelWith.length > 0 && form.openToNew !== "" && form.transport.length > 0 && form.tripLength !== "" && form.destinationVibe !== "";
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const payload = {
        ...form,
        consultationRequested: form.consultationRequested === "yes" || form.consultationRequested === "no"
          ? form.consultationRequested
          : "no",
      };
      const scriptUrl = (import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL?.trim() || DEFAULT_SURVEY_GOOGLE_SCRIPT_URL);
      // urlencoded is a CORS-simple Content-Type (no preflight). Script reads e.parameter.payload.
      const formBody = `payload=${encodeURIComponent(JSON.stringify(payload))}`;
      const res = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody,
      });
      const raw = (await res.text()).trim();
      let data: { ok?: boolean; error?: string } = {};
      try {
        data = raw ? (JSON.parse(raw) as { ok?: boolean; error?: string }) : {};
      } catch {
        const looksLikeEchoedRequest = raw.startsWith("payload=");
        setError(
          looksLikeEchoedRequest
            ? "Server returned raw form data instead of JSON. Redeploy Apps Script with the latest survey-webhook.gs (parsePayload_ must decode the payload= field from postData.contents)."
            : "Could not read server response. Confirm the Web App URL and that the script returns JSON.",
        );
        return;
      }
      if (data.ok === true) {
        setSubmitted(true);
        return;
      }
      const serverMsg = typeof data.error === "string" && data.error.trim() !== "" ? data.error.trim() : null;
      setError(serverMsg ?? `Submission failed (HTTP ${res.status}). Try again or contact support.`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Network error";
      setError(`${msg}. Check your connection and try again.`);
    } finally {
      setSubmitting(false);
    }
  };

  // Reusable UI helpers
  const RadioCards = ({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {options.map(opt => (
        <button key={opt} type="button" onClick={() => onChange(opt)}
          className={`rounded-xl px-4 py-3 border-2 text-sm font-medium text-left transition-all ${value === opt ? "border-primary bg-primary/10 shadow-sm" : "border-border hover:border-primary/50"}`}>
          {opt}
        </button>
      ))}
    </div>
  );

  const LargeChoiceCards = ({
    options,
    value,
    onChange,
  }: {
    options: { value: "yes" | "no"; label: string; Icon: LucideIcon }[];
    value: "" | "yes" | "no";
    onChange: (v: "yes" | "no") => void;
  }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map(opt => {
        const Icon = opt.Icon;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`rounded-xl px-4 py-5 border-2 text-sm font-medium text-left transition-all min-h-[5.5rem] flex items-start gap-3 ${
              value === opt.value ? "border-primary bg-primary/10 shadow-sm" : "border-border hover:border-primary/50"
            }`}
          >
            <Icon className={`w-6 h-6 shrink-0 mt-0.5 ${value === opt.value ? "text-primary" : "text-muted-foreground"}`} />
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );

  const CheckboxCards = ({ options, selected, onToggle }: { options: string[]; selected: string[]; onToggle: (v: string) => void }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map(opt => (
        <button key={opt} type="button" onClick={() => onToggle(opt)}
          className={`rounded-xl px-4 py-3 border-2 text-sm font-medium text-left transition-all flex items-center gap-3 ${selected.includes(opt) ? "border-primary bg-primary/10 shadow-sm" : "border-border hover:border-primary/50"}`}>
          <span className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${selected.includes(opt) ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40"}`}>
            {selected.includes(opt) ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : null}
          </span>
          {opt}
        </button>
      ))}
    </div>
  );

  if (submitted) {
    const firstName = form.name.split(" ")[0];
    return (
      <div className="page-fade-in pt-20 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center flex flex-col items-center">
          <BrandLogo variant="compact" className="mb-6" />
          <h1 className="font-heading text-3xl font-bold mb-4">Your response has been received!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you, {firstName}! Your answers will help us understand how emotions shape travel. We appreciate your time!
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
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-center mb-2">Emotion Travel Survey</h1>
        <p className="text-center text-muted-foreground mb-8">Step {step} of {totalSteps}</p>
        <Progress value={progress} className="mb-10 h-2" />

        {error && (
          <div className="bg-accent/10 border border-accent text-accent rounded-xl p-4 mb-6 text-sm">{error}</div>
        )}

        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-md border border-border min-h-[300px]">
          {/* Step 1: Demographics */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="font-heading text-xl font-semibold mb-4">About You</h2>
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input type="text" value={form.name} onChange={e => updateText("name", e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Your full name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Age *</label>
                <RadioCards options={ageOptions} value={form.age} onChange={v => updateText("age", v)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Gender *</label>
                <RadioCards options={genderOptions} value={form.gender} onChange={v => updateText("gender", v)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Occupation</label>
                <input type="text" value={form.occupation} onChange={e => updateText("occupation", e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. Student, Nurse, Freelancer" />
              </div>
            </div>
          )}

          {/* Step 2: Travel frequency + Mood */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-xl font-semibold mb-2">How often do you travel?</h2>
                <RadioCards options={travelFrequency} value={form.travelFrequency} onChange={v => updateText("travelFrequency", v)} />
              </div>
              <div>
                <h2 className="font-heading text-xl font-semibold mb-2">What is your mood/feeling/emotions?</h2>
                <p className="text-sm text-muted-foreground mb-3">Check all that apply</p>
                <CheckboxCards options={moodOptions} selected={form.moods} onToggle={v => toggleArray("moods", v)} />
                <div className="mt-3">
                  <input type="text" value={form.moodOther} onChange={e => updateText("moodOther", e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Others (please specify)" />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Travel type */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-xl font-semibold mb-2">What type of travel do you usually prefer?</h2>
                <p className="text-sm text-muted-foreground mb-3">Check all that apply</p>
                <CheckboxCards options={travelTypes} selected={form.travelTypes} onToggle={v => toggleArray("travelTypes", v)} />
              </div>
            </div>
          )}

          {/* Step 4: Budget */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-xl font-semibold mb-2">What is your travel budget?</h2>
                <RadioCards options={budgetOptions.map(b => b.label)} value={form.budget} onChange={v => updateText("budget", v)} />
              </div>
            </div>
          )}

          {/* Step 5: Optional consultation add-on */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-xl font-semibold mb-2">Would you like to include a consultation?</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  We offer an optional session with a licensed mental health professional to help identify the emotional needs behind your ideal travel experience. This service comes with an additional fee.
                </p>
                <LargeChoiceCards
                  options={consultationCardOptions}
                  value={form.consultationRequested}
                  onChange={v => setForm(prev => ({ ...prev, consultationRequested: v }))}
                />
                <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                  Note: Our team will reach out to you with consultation details and pricing after your form submission.
                </p>
              </div>
            </div>
          )}

          {/* Step 6: Additional notes */}
          {step === 6 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-xl font-semibold mb-2">Additional notes</h2>
                <p className="text-sm text-muted-foreground mb-3">
                  Anything else you would like us to know? (optional)
                </p>
                <textarea
                  value={form.additionalNotes}
                  onChange={e => updateText("additionalNotes", e.target.value)}
                  rows={6}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y min-h-[140px]"
                  placeholder="Share preferences, accessibility needs, special occasions, or questions for our team."
                />
              </div>
            </div>
          )}

          {/* Step 7: Emotion-based travel awareness + Features */}
          {step === 7 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-xl font-semibold mb-2">Have you ever heard of emotion-based travel planning?</h2>
                <RadioCards options={["Yes", "No"]} value={form.heardOfEmotionTravel} onChange={v => updateText("heardOfEmotionTravel", v)} />
              </div>
              <div>
                <h2 className="font-heading text-xl font-semibold mb-2">What features would you expect from an emotion-based travel service?</h2>
                <p className="text-sm text-muted-foreground mb-3">Check all that apply</p>
                <CheckboxCards options={featureOptions} selected={form.expectedFeatures} onToggle={v => toggleArray("expectedFeatures", v)} />
              </div>
            </div>
          )}

          {/* Step 8: Destinations + Activities */}
          {step === 8 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-xl font-semibold mb-2">What type of destinations are you most interested in?</h2>
                <p className="text-sm text-muted-foreground mb-3">Check all that apply</p>
                <CheckboxCards options={destinationTypeOptions} selected={form.destinationTypes} onToggle={v => toggleArray("destinationTypes", v)} />
              </div>
              <div>
                <h2 className="font-heading text-xl font-semibold mb-2">Which destinations do you prefer?</h2>
                <CheckboxCards options={destinationScopeOptions} selected={form.destinationScope} onToggle={v => toggleArray("destinationScope", v)} />
              </div>
              <div>
                <h2 className="font-heading text-xl font-semibold mb-2">What activities do you want included in your trip?</h2>
                <p className="text-sm text-muted-foreground mb-3">Check all that apply</p>
                <CheckboxCards options={activityOptions} selected={form.activities} onToggle={v => toggleArray("activities", v)} />
              </div>
            </div>
          )}

          {/* Step 9: Logistics */}
          {step === 9 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-xl font-semibold mb-2">How far are you willing to travel?</h2>
                <RadioCards options={travelDistanceOptions} value={form.travelDistance} onChange={v => updateText("travelDistance", v)} />
              </div>
              <div>
                <h2 className="font-heading text-xl font-semibold mb-2">Who do you usually travel with?</h2>
                <CheckboxCards options={travelWithOptions} selected={form.travelWith} onToggle={v => toggleArray("travelWith", v)} />
              </div>
              <div>
                <h2 className="font-heading text-xl font-semibold mb-2">Are you open to trying new or less popular destinations?</h2>
                <RadioCards options={openToNewOptions} value={form.openToNew} onChange={v => updateText("openToNew", v)} />
              </div>
              <div>
                <h2 className="font-heading text-xl font-semibold mb-2">What type of transportation do you prefer?</h2>
                <CheckboxCards options={transportOptions} selected={form.transport} onToggle={v => toggleArray("transport", v)} />
              </div>
              <div>
                <h2 className="font-heading text-xl font-semibold mb-2">How long do you prefer your trips?</h2>
                <RadioCards options={tripLengthOptions} value={form.tripLength} onChange={v => updateText("tripLength", v)} />
              </div>
              <div>
                <h2 className="font-heading text-xl font-semibold mb-2">Would you prefer a destination that is:</h2>
                <RadioCards options={destinationVibeOptions} value={form.destinationVibe} onChange={v => updateText("destinationVibe", v)} />
              </div>
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
