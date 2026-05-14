import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  Annoyed,
  Armchair,
  Banknote,
  Brain,
  Briefcase,
  Building2,
  Bus,
  BusFront,
  Calendar,
  CalendarDays,
  Camera,
  Car,
  Check,
  CheckCircle2,
  Circle,
  ClipboardList,
  CloudSun,
  Coins,
  Compass,
  Drama,
  Frown,
  Flame,
  Footprints,
  Gem,
  Globe,
  Headphones,
  Heart,
  Home,
  HelpCircle,
  Landmark,
  Lightbulb,
  Map,
  MapPin,
  MapPinned,
  Moon,
  Mountain,
  PencilLine,
  Plane,
  Scale,
  School,
  Ship,
  ShoppingBag,
  Shuffle,
  Smile,
  Sparkles,
  Stethoscope,
  Sun,
  Trees,
  User,
  UserPlus,
  UserRound,
  Users,
  UsersRound,
  Utensils,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import BrandLogo from "@/components/BrandLogo";

const totalSteps = 4;

const ageOptions = ["Below 18", "18-24", "25-34", "35-44", "45 and above"];
const ageIcons: Record<string, LucideIcon> = {
  "Below 18": School,
  "18-24": Sparkles,
  "25-34": Briefcase,
  "35-44": Home,
  "45 and above": Trees,
};

const genderOptions = ["Male", "Female", "Prefer not to say"];
const genderIcons: Record<string, LucideIcon> = {
  Male: User,
  Female: UserRound,
  "Prefer not to say": HelpCircle,
};

const heardIcons: Record<string, LucideIcon> = { Yes: Lightbulb, No: HelpCircle };

const travelFrequency = ["Once a year", "2-3 times a year", "More than 3 times a year"];
const travelFrequencyIcons: Record<string, LucideIcon> = {
  "Once a year": Calendar,
  "2-3 times a year": Plane,
  "More than 3 times a year": Globe,
};

const moodOptions = [
  "Happy",
  "Sad",
  "Excited",
  "Inspired",
  "Peaceful",
  "Adventurous",
  "Relaxed",
  "Angry",
  "Other",
];
const moodIcons: Record<string, LucideIcon> = {
  Happy: Smile,
  Sad: Frown,
  Excited: Zap,
  Inspired: Lightbulb,
  Peaceful: CloudSun,
  Adventurous: Compass,
  Relaxed: Armchair,
  Angry: Annoyed,
  Other: PencilLine,
};

const travelTypes = ["Relaxation", "Adventure", "Cultural", "Romantic trips", "Family trips", "Solo travel", "Other"];
const travelTypeIcons: Record<string, LucideIcon> = {
  Relaxation: Armchair,
  Adventure: Mountain,
  Cultural: Landmark,
  "Romantic trips": Heart,
  "Family trips": Users,
  "Solo travel": User,
  Other: PencilLine,
};

const budgetOptions = [
  { label: "Below ₱5,000", value: "below5000" },
  { label: "₱5,000 - ₱10,000", value: "5000-10000" },
  { label: "₱10,000 - ₱20,000", value: "10000-20000" },
  { label: "Above ₱20,000", value: "above20000" },
];
const budgetIcons: Record<string, LucideIcon> = {
  "Below ₱5,000": Banknote,
  "₱5,000 - ₱10,000": Coins,
  "₱10,000 - ₱20,000": Gem,
  "Above ₱20,000": Sparkles,
};

const featureOptions = [
  "Personalized itinerary",
  "Mood-based destination suggestions",
  "Budget-friendly options",
  "Flexible schedule",
  "24/7 assistance",
  "Other",
];
const featureIcons: Record<string, LucideIcon> = {
  "Personalized itinerary": Map,
  "Mood-based destination suggestions": Brain,
  "Budget-friendly options": Coins,
  "Flexible schedule": Calendar,
  "24/7 assistance": Headphones,
  Other: PencilLine,
};

const destinationTypeOptions = [
  "Beach destinations",
  "Mountains",
  "Cities",
  "Countryside/Rural areas",
  "Historical/Cultural sites",
  "Other",
];
const destinationTypeIcons: Record<string, LucideIcon> = {
  "Beach destinations": Waves,
  Mountains: Mountain,
  Cities: Building2,
  "Countryside/Rural areas": Trees,
  "Historical/Cultural sites": Landmark,
  Other: PencilLine,
};

const destinationScopeOptions = [
  "Local (within your province)",
  "Domestic (within the Philippines)",
  "International",
];
const destinationScopeIcons: Record<string, LucideIcon> = {
  "Local (within your province)": MapPin,
  "Domestic (within the Philippines)": Home,
  International: Plane,
};

const activityOptions = [
  "Swimming / Beach activities",
  "Hiking / Trekking",
  "Food trips",
  "Shopping",
  "Sightseeing",
  "Cultural experiences",
  "Nightlife",
  "Other",
];
const activityIcons: Record<string, LucideIcon> = {
  "Swimming / Beach activities": Waves,
  "Hiking / Trekking": Footprints,
  "Food trips": Utensils,
  Shopping: ShoppingBag,
  Sightseeing: Camera,
  "Cultural experiences": Drama,
  Nightlife: Moon,
  Other: PencilLine,
};

const travelDistanceOptions = [
  "1–3 hours travel time",
  "4–6 hours",
  "1 day travel",
  "Willing to travel long distances",
];
const travelDistanceIcons: Record<string, LucideIcon> = {
  "1–3 hours travel time": Car,
  "4–6 hours": BusFront,
  "1 day travel": Sun,
  "Willing to travel long distances": Plane,
};

const travelWithOptions = ["Alone", "Friends", "Family", "Partner", "Other"];
const travelWithIcons: Record<string, LucideIcon> = {
  Alone: User,
  Friends: UserPlus,
  Family: UsersRound,
  Partner: Heart,
  Other: PencilLine,
};

const openToNewOptions = ["Yes", "Maybe", "No"];
const openToNewIcons: Record<string, LucideIcon> = { Yes: Sparkles, Maybe: HelpCircle, No: Home };

const transportOptions = ["Land (bus, car)", "Airplane", "Boat/ferry", "Mix of all", "Other"];
const transportIcons: Record<string, LucideIcon> = {
  "Land (bus, car)": Bus,
  Airplane: Plane,
  "Boat/ferry": Ship,
  "Mix of all": Shuffle,
  Other: PencilLine,
};

const tripLengthOptions = ["Day trip", "2–3 days", "4–7 days", "More than a week"];
const tripLengthIcons: Record<string, LucideIcon> = {
  "Day trip": Sun,
  "2–3 days": Calendar,
  "4–7 days": CalendarDays,
  "More than a week": Globe,
};

const destinationVibeOptions = ["Trending/popular", "Balanced (popular + peaceful)", "Hidden/undiscovered"];
const destinationVibeIcons: Record<string, LucideIcon> = {
  "Trending/popular": Flame,
  "Balanced (popular + peaceful)": Scale,
  "Hidden/undiscovered": MapPinned,
};

const occupationPresets = [
  "Student",
  "Employee (private sector)",
  "Employee (government)",
  "Freelancer / Self-employed",
  "Business owner",
  "Homemaker",
  "Retired",
  "Unemployed",
  "Other",
];

interface FormData {
  name: string;
  email: string;
  age: string;
  gender: string;
  occupationDropdown: string;
  occupationOther: string;
  travelFrequency: string;
  moods: string[];
  moodOther: string;
  travelTypes: string[];
  travelTypesOther: string;
  budget: string;
  consultationRequested: "" | "yes" | "no";
  additionalNotes: string;
  heardOfEmotionTravel: string;
  expectedFeatures: string[];
  expectedFeaturesOther: string;
  destinationTypes: string[];
  destinationTypesOther: string;
  destinationScope: string;
  activities: string[];
  activitiesOther: string;
  travelDistance: string;
  travelWith: string[];
  travelWithOther: string;
  openToNew: string;
  transport: string[];
  transportOther: string;
  tripLength: string;
  destinationVibe: string;
}

const consultationCardOptions: { value: "yes" | "no"; label: string; LeadIcon: LucideIcon }[] = [
  {
    value: "yes",
    label: "Yes, I would like to include a mental health consultation (with additional fee)",
    LeadIcon: Stethoscope,
  },
  {
    value: "no",
    label: "No, I will proceed with the standard emotional assessment only",
    LeadIcon: ClipboardList,
  },
];

/** Default production Apps Script Web App (override with VITE_GOOGLE_APPS_SCRIPT_URL). */
const DEFAULT_SURVEY_GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby1NioDwcdhb1pg80K2z0L4Lqi8Y2lerpGOthoNzeJlbzJJtmk_zNDJPgkFzMccng/exec";

function isValidEmail(value: string): boolean {
  const t = value.trim();
  if (!t) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
}

function getInvalidSurveyGroups(step: number, form: FormData): Set<string> {
  const invalid = new Set<string>();
  const occInvalid = form.occupationDropdown === "Other" && form.occupationOther.trim() === "";
  if (step === 1) {
    if (form.name.trim() === "") invalid.add("name");
    if (!isValidEmail(form.email)) invalid.add("email");
    if (form.age === "") invalid.add("age");
    if (form.gender === "") invalid.add("gender");
    if (occInvalid) invalid.add("occupation");
    if (form.heardOfEmotionTravel === "") invalid.add("heard");
    return invalid;
  }
  if (step === 2) {
    if (form.travelTypes.length === 0) invalid.add("travelTypes");
    if (form.travelTypes.includes("Other") && form.travelTypesOther.trim() === "") invalid.add("travelTypes");
    if (form.expectedFeatures.length === 0) invalid.add("expectedFeatures");
    if (form.expectedFeatures.includes("Other") && form.expectedFeaturesOther.trim() === "") {
      invalid.add("expectedFeatures");
    }
    if (form.openToNew === "") invalid.add("openToNew");
    if (form.destinationVibe === "") invalid.add("destinationVibe");
    if (form.travelFrequency === "") invalid.add("travelFrequency");
    if (form.moods.length === 0) invalid.add("moods");
    if (form.moods.includes("Other") && form.moodOther.trim() === "") invalid.add("moods");
    return invalid;
  }
  if (step === 3) {
    if (form.budget === "") invalid.add("budget");
    if (form.travelDistance === "") invalid.add("travelDistance");
    if (form.tripLength === "") invalid.add("tripLength");
    if (form.travelWith.length === 0) invalid.add("travelWith");
    if (form.travelWith.includes("Other") && form.travelWithOther.trim() === "") invalid.add("travelWith");
    if (form.transport.length === 0) invalid.add("transport");
    if (form.transport.includes("Other") && form.transportOther.trim() === "") invalid.add("transport");
    return invalid;
  }
  if (step === 4) {
    if (form.destinationTypes.length === 0) invalid.add("destinationTypes");
    if (form.destinationTypes.includes("Other") && form.destinationTypesOther.trim() === "") {
      invalid.add("destinationTypes");
    }
    if (form.destinationScope === "") invalid.add("destinationScope");
    if (form.activities.length === 0) invalid.add("activities");
    if (form.activities.includes("Other") && form.activitiesOther.trim() === "") invalid.add("activities");
    if (form.consultationRequested !== "yes" && form.consultationRequested !== "no") invalid.add("consultation");
    return invalid;
  }
  return invalid;
}

function SurveyQuestionBlock({
  groupId,
  sectionLabel,
  showDivider,
  invalid,
  triedNext,
  shakeKey,
  errorMessage = "Please select an option to continue.",
  children,
}: {
  groupId: string;
  sectionLabel: string;
  showDivider: boolean;
  invalid: boolean;
  triedNext: boolean;
  shakeKey: number;
  errorMessage?: string;
  children: ReactNode;
}) {
  const showErr = invalid && triedNext;
  return (
    <div className={cn("flex flex-col gap-4", showDivider && "border-t border-gray-100 pt-4")}>
      <p className="font-semibold text-gray-700 text-sm uppercase tracking-wide">{sectionLabel}</p>
      <div
        key={showErr ? `${groupId}-${shakeKey}` : groupId}
        className={cn("rounded-xl", showErr && "border-2 border-red-400 p-3 survey-shake")}
      >
        {children}
        {showErr ? <p className="text-red-500 text-sm mt-2">{errorMessage}</p> : null}
      </div>
    </div>
  );
}

function VisualOptionCards({
  options,
  iconMap,
  mode,
  value,
  selected,
  onSelect,
  onToggle,
  columnsClass = "grid-cols-1 sm:grid-cols-2",
}: {
  options: string[];
  iconMap: Record<string, LucideIcon>;
  mode: "single" | "multi";
  value?: string;
  selected?: string[];
  onSelect?: (v: string) => void;
  onToggle?: (v: string) => void;
  columnsClass?: string;
}) {
  return (
    <div className={cn("grid gap-3 auto-rows-fr items-stretch", columnsClass)}>
      {options.map((opt) => {
        const isOn = mode === "single" ? value === opt : (selected ?? []).includes(opt);
        const LeadIcon = iconMap[opt] ?? Circle;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => (mode === "single" ? onSelect?.(opt) : onToggle?.(opt))}
            className={cn(
              "relative rounded-xl p-4 min-h-[72px] h-full w-full text-left transition-all duration-200",
              "flex items-center gap-3 self-stretch hover:shadow-md hover:scale-[1.02]",
              isOn
                ? "bg-amber-50 border-2 border-amber-400"
                : "bg-white border border-gray-200 shadow-sm",
            )}
          >
            {mode === "multi" && isOn ? (
              <span className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white shadow-sm">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
            ) : null}
            {mode === "single" && isOn ? (
              <span className="absolute top-2 right-2 h-3 w-3 rounded-full bg-amber-500 ring-2 ring-amber-200" aria-hidden />
            ) : null}
            <LeadIcon
              className={cn("h-6 w-6 shrink-0", isOn ? "text-amber-800" : "text-muted-foreground")}
              strokeWidth={1.75}
              aria-hidden
            />
            <span className={cn("text-sm font-medium leading-snug pr-7", isOn && "text-foreground")}>{opt}</span>
          </button>
        );
      })}
    </div>
  );
}

const Questionnaire = () => {
  const [step, setStep] = useState(0);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [triedNext, setTriedNext] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    age: "",
    gender: "",
    occupationDropdown: "",
    occupationOther: "",
    travelFrequency: "",
    moods: [],
    moodOther: "",
    travelTypes: [],
    travelTypesOther: "",
    budget: "",
    consultationRequested: "",
    additionalNotes: "",
    heardOfEmotionTravel: "",
    expectedFeatures: [],
    expectedFeaturesOther: "",
    destinationTypes: [],
    destinationTypesOther: "",
    destinationScope: "",
    activities: [],
    activitiesOther: "",
    travelDistance: "",
    travelWith: [],
    travelWithOther: "",
    openToNew: "",
    transport: [],
    transportOther: "",
    tripLength: "",
    destinationVibe: "",
  });

  const progressPercent = step === 0 ? 0 : (step / totalSteps) * 100;
  const percentLabel = `${Math.round(progressPercent)}% complete`;
  const invalidGroups = getInvalidSurveyGroups(step, form);

  const updateText = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArray = (field: keyof FormData, value: string) => {
    setForm((prev) => {
      const arr = prev[field] as string[];
      return { ...prev, [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
    });
  };

  const occupationForPayload = () => {
    if (form.occupationDropdown === "Other") return form.occupationOther.trim();
    return form.occupationDropdown;
  };

  const canNext = () => {
    if (step === 1) {
      const occOk =
        form.occupationDropdown === "" ||
        (form.occupationDropdown !== "Other" || form.occupationOther.trim() !== "");
      return (
        form.name.trim() !== "" &&
        isValidEmail(form.email) &&
        form.age !== "" &&
        form.gender !== "" &&
        occOk &&
        form.heardOfEmotionTravel !== ""
      );
    }
    if (step === 2) {
      return (
        form.travelTypes.length > 0 &&
        (!form.travelTypes.includes("Other") || form.travelTypesOther.trim() !== "") &&
        form.expectedFeatures.length > 0 &&
        (!form.expectedFeatures.includes("Other") || form.expectedFeaturesOther.trim() !== "") &&
        form.openToNew !== "" &&
        form.destinationVibe !== "" &&
        form.travelFrequency !== "" &&
        form.moods.length > 0 &&
        (!form.moods.includes("Other") || form.moodOther.trim() !== "")
      );
    }
    if (step === 3) {
      return (
        form.budget !== "" &&
        form.travelDistance !== "" &&
        form.tripLength !== "" &&
        form.travelWith.length > 0 &&
        (!form.travelWith.includes("Other") || form.travelWithOther.trim() !== "") &&
        form.transport.length > 0 &&
        (!form.transport.includes("Other") || form.transportOther.trim() !== "")
      );
    }
    if (step === 4) {
      return (
        form.destinationTypes.length > 0 &&
        (!form.destinationTypes.includes("Other") || form.destinationTypesOther.trim() !== "") &&
        form.destinationScope !== "" &&
        form.activities.length > 0 &&
        (!form.activities.includes("Other") || form.activitiesOther.trim() !== "") &&
        (form.consultationRequested === "yes" || form.consultationRequested === "no")
      );
    }
    return true;
  };

  const buildPayload = () => ({
    name: form.name,
    email: form.email.trim(),
    age: form.age,
    gender: form.gender,
    occupation: occupationForPayload(),
    travelFrequency: form.travelFrequency,
    moods: form.moods,
    moodOther: form.moodOther,
    travelTypes: form.travelTypes,
    travelTypesOther: form.travelTypesOther.trim(),
    budget: form.budget,
    consultationRequested:
      form.consultationRequested === "yes" || form.consultationRequested === "no"
        ? form.consultationRequested
        : "no",
    additionalNotes: form.additionalNotes,
    heardOfEmotionTravel: form.heardOfEmotionTravel,
    expectedFeatures: form.expectedFeatures,
    expectedFeaturesOther: form.expectedFeaturesOther.trim(),
    destinationTypes: form.destinationTypes,
    destinationTypesOther: form.destinationTypesOther.trim(),
    destinationScope: form.destinationScope ? [form.destinationScope] : [],
    activities: form.activities,
    activitiesOther: form.activitiesOther.trim(),
    travelDistance: form.travelDistance,
    travelWith: form.travelWith,
    travelWithOther: form.travelWithOther.trim(),
    openToNew: form.openToNew,
    transport: form.transport,
    transportOther: form.transportOther.trim(),
    tripLength: form.tripLength,
    destinationVibe: form.destinationVibe,
  });

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const payload = buildPayload();
      const scriptUrl = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL?.trim() || DEFAULT_SURVEY_GOOGLE_SCRIPT_URL;
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

  if (submitted) {
    const firstName = form.name.split(" ")[0];
    return (
      <div className="page-fade-in pt-20 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center flex flex-col items-center">
          <BrandLogo variant="compact" className="mb-6" />
          <h1 className="font-heading text-3xl font-bold mb-4">Your response has been received!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you, {firstName}! Your answers will help us understand how emotions shape travel. We appreciate your
            time!
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
        <p className="text-center text-muted-foreground mb-2">
          {step === 0 ? "Privacy notice" : `Step ${step} of ${totalSteps}`}
        </p>
        <div className="mb-8">
          <Progress value={progressPercent} className="mb-2 h-2" />
          <p className="text-center text-sm text-muted-foreground">{percentLabel}</p>
        </div>

        {error && (
          <div className="bg-accent/10 border border-accent text-accent rounded-xl p-4 mb-6 text-sm">{error}</div>
        )}

        <div className="bg-card flex min-h-[300px] flex-col rounded-2xl border border-border p-6 shadow-md md:p-8">
          {/* Step 0 — Privacy notice */}
          {step === 0 && (
            <div className="flex flex-1 flex-col gap-5 text-sm leading-relaxed text-foreground">
              <h2 className="font-heading text-xl font-semibold text-foreground">Your Privacy Matters to Us</h2>
              <div className="max-h-[min(55vh,520px)] space-y-4 overflow-y-auto pr-1 text-muted-foreground">
                <p>
                  Before you begin, SurpreSaFeel Travels would like to inform you that the personal and emotional
                  information you share through this questionnaire is collected solely for the purpose of crafting your
                  personalized travel itinerary. This includes your name, contact details, travel preferences, budget
                  range, and emotional assessment responses.
                </p>
                <p>
                  In compliance with the Republic Act No. 10173, also known as the Data Privacy Act of 2012 of the
                  Philippines, we are committed to collecting only the information necessary to deliver our service,
                  storing your data securely and limiting access strictly to authorized members of our team, using your
                  information exclusively for travel planning purposes and never selling or sharing it with third parties
                  without your explicit consent, and retaining your data only for as long as it is needed to complete and
                  fulfill your requested itinerary.
                </p>
                <p>
                  By clicking &quot;I Agree and Continue&quot;, you acknowledge that you have read and understood this
                  notice and you voluntarily consent to the collection and processing of your personal information by
                  SurpreSaFeel Travels for the purpose stated above.
                </p>
                <p>
                  If you have any questions or concerns regarding your data, you may reach us at{" "}
                  <a
                    href="mailto:SurpreSaFeelTravels@gmail.com"
                    className="font-medium text-primary underline-offset-2 hover:underline"
                  >
                    SurpreSaFeelTravels@gmail.com
                  </a>
                  .
                </p>
                <p className="font-medium text-foreground">SurpreSaFeel Travels — Where Emotion Leads, We Follow.</p>
              </div>
              <div
                key={triedNext && !privacyConsent ? `privacy-${shakeKey}` : "privacy"}
                className={cn(
                  "rounded-xl border border-border bg-muted/30 p-4",
                  triedNext && !privacyConsent && "survey-shake border-red-400",
                )}
              >
                <div className="flex gap-3">
                  <Checkbox
                    id="privacy-consent"
                    checked={privacyConsent}
                    onCheckedChange={(c) => setPrivacyConsent(c === true)}
                    className="mt-0.5"
                  />
                  <label htmlFor="privacy-consent" className="cursor-pointer text-sm leading-snug text-foreground">
                    I have read the notice above and voluntarily consent to the collection and processing of my personal
                    information as described. *
                  </label>
                </div>
                {triedNext && !privacyConsent ? (
                  <p className="mt-2 text-sm text-red-500">Please check the box to continue.</p>
                ) : null}
              </div>
            </div>
          )}

          {/* Step 1 — About You */}
          {step === 1 && (
            <div className="flex flex-1 flex-col gap-4">
              <h2 className="font-heading text-xl font-semibold">About You</h2>
              <SurveyQuestionBlock
                groupId="name"
                sectionLabel="Your name"
                showDivider={false}
                invalid={invalidGroups.has("name")}
                triedNext={triedNext}
                shakeKey={shakeKey}
              >
                <label className="mb-1 block text-sm font-medium">Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateText("name", e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Your full name"
                />
              </SurveyQuestionBlock>
              <SurveyQuestionBlock
                groupId="email"
                sectionLabel="Email"
                showDivider
                invalid={invalidGroups.has("email")}
                triedNext={triedNext}
                shakeKey={shakeKey}
                errorMessage="Please enter a valid email address."
              >
                <label className="mb-1 block text-sm font-medium">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateText("email", e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </SurveyQuestionBlock>
              <SurveyQuestionBlock
                groupId="age"
                sectionLabel="Age range"
                showDivider
                invalid={invalidGroups.has("age")}
                triedNext={triedNext}
                shakeKey={shakeKey}
              >
                <label className="mb-2 block text-sm font-medium">Age *</label>
                <VisualOptionCards
                  options={ageOptions}
                  iconMap={ageIcons}
                  mode="single"
                  value={form.age}
                  onSelect={(v) => updateText("age", v)}
                  columnsClass="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                />
              </SurveyQuestionBlock>
              <SurveyQuestionBlock
                groupId="gender"
                sectionLabel="Gender"
                showDivider
                invalid={invalidGroups.has("gender")}
                triedNext={triedNext}
                shakeKey={shakeKey}
              >
                <label className="mb-2 block text-sm font-medium">Gender *</label>
                <VisualOptionCards
                  options={genderOptions}
                  iconMap={genderIcons}
                  mode="single"
                  value={form.gender}
                  onSelect={(v) => updateText("gender", v)}
                  columnsClass="grid-cols-1 sm:grid-cols-3"
                />
              </SurveyQuestionBlock>
              <SurveyQuestionBlock
                groupId="occupation"
                sectionLabel="Occupation"
                showDivider
                invalid={invalidGroups.has("occupation")}
                triedNext={triedNext}
                shakeKey={shakeKey}
              >
                <label className="mb-2 block text-sm font-medium">Occupation</label>
                <Select
                  value={form.occupationDropdown === "" ? undefined : form.occupationDropdown}
                  onValueChange={(v) => setForm((prev) => ({ ...prev, occupationDropdown: v }))}
                >
                  <SelectTrigger className="w-full rounded-lg border-input">
                    <SelectValue placeholder="e.g. Student, Nurse, Freelancer" />
                  </SelectTrigger>
                  <SelectContent>
                    {occupationPresets.map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.occupationDropdown === "Other" ? (
                  <input
                    type="text"
                    value={form.occupationOther}
                    onChange={(e) => updateText("occupationOther", e.target.value)}
                    className="mt-3 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Please specify your occupation"
                  />
                ) : null}
              </SurveyQuestionBlock>
              <SurveyQuestionBlock
                groupId="heard"
                sectionLabel="Awareness"
                showDivider
                invalid={invalidGroups.has("heard")}
                triedNext={triedNext}
                shakeKey={shakeKey}
              >
                <h2 className="mb-2 font-heading text-xl font-semibold">
                  Have you ever heard of emotion-based travel planning?
                </h2>
                <VisualOptionCards
                  options={["Yes", "No"]}
                  iconMap={heardIcons}
                  mode="single"
                  value={form.heardOfEmotionTravel}
                  onSelect={(v) => updateText("heardOfEmotionTravel", v)}
                  columnsClass="grid-cols-1 sm:grid-cols-2"
                />
              </SurveyQuestionBlock>
            </div>
          )}

          {/* Step 2 — Your Travel Personality (+ travel frequency & mood preserved) */}
          {step === 2 && (
            <div className="flex flex-1 flex-col gap-4">
              <h2 className="font-heading text-xl font-semibold">Your Travel Personality</h2>
              <SurveyQuestionBlock
                groupId="travelTypes"
                sectionLabel="Travel style"
                showDivider={false}
                invalid={invalidGroups.has("travelTypes")}
                triedNext={triedNext}
                shakeKey={shakeKey}
                errorMessage="Select at least one option. If you chose Other, add a short description."
              >
                <h3 className="mb-2 font-heading text-lg font-semibold">What type of travel do you usually prefer?</h3>
                <p className="mb-3 text-sm text-muted-foreground">Check all that apply</p>
                <VisualOptionCards
                  options={travelTypes}
                  iconMap={travelTypeIcons}
                  mode="multi"
                  selected={form.travelTypes}
                  onToggle={(v) => {
                    setForm((prev) => {
                      const arr = prev.travelTypes;
                      const on = arr.includes(v);
                      const next = on ? arr.filter((x) => x !== v) : [...arr, v];
                      return {
                        ...prev,
                        travelTypes: next,
                        ...(v === "Other" && on ? { travelTypesOther: "" } : {}),
                      };
                    });
                  }}
                  columnsClass="grid-cols-1 sm:grid-cols-2"
                />
                {form.travelTypes.includes("Other") ? (
                  <div className="mt-3">
                    <label className="mb-1 block text-sm font-medium">Please specify (Other) *</label>
                    <input
                      type="text"
                      value={form.travelTypesOther}
                      onChange={(e) => updateText("travelTypesOther", e.target.value)}
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Describe your travel style"
                    />
                  </div>
                ) : null}
              </SurveyQuestionBlock>
              <SurveyQuestionBlock
                groupId="expectedFeatures"
                sectionLabel="Service expectations"
                showDivider
                invalid={invalidGroups.has("expectedFeatures")}
                triedNext={triedNext}
                shakeKey={shakeKey}
                errorMessage="Select at least one option. If you chose Other, add a short description."
              >
                <h3 className="mb-2 font-heading text-lg font-semibold">
                  What features would you expect from an emotion-based travel service?
                </h3>
                <p className="mb-3 text-sm text-muted-foreground">Check all that apply</p>
                <VisualOptionCards
                  options={featureOptions}
                  iconMap={featureIcons}
                  mode="multi"
                  selected={form.expectedFeatures}
                  onToggle={(v) => {
                    setForm((prev) => {
                      const arr = prev.expectedFeatures;
                      const on = arr.includes(v);
                      const next = on ? arr.filter((x) => x !== v) : [...arr, v];
                      return {
                        ...prev,
                        expectedFeatures: next,
                        ...(v === "Other" && on ? { expectedFeaturesOther: "" } : {}),
                      };
                    });
                  }}
                  columnsClass="grid-cols-1 sm:grid-cols-2"
                />
                {form.expectedFeatures.includes("Other") ? (
                  <div className="mt-3">
                    <label className="mb-1 block text-sm font-medium">Please specify (Other) *</label>
                    <input
                      type="text"
                      value={form.expectedFeaturesOther}
                      onChange={(e) => updateText("expectedFeaturesOther", e.target.value)}
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Describe other features you expect"
                    />
                  </div>
                ) : null}
              </SurveyQuestionBlock>
              <SurveyQuestionBlock
                groupId="openToNew"
                sectionLabel="Destination openness"
                showDivider
                invalid={invalidGroups.has("openToNew")}
                triedNext={triedNext}
                shakeKey={shakeKey}
              >
                <h3 className="mb-2 font-heading text-lg font-semibold">
                  Are you open to trying new or less popular destinations?
                </h3>
                <VisualOptionCards
                  options={openToNewOptions}
                  iconMap={openToNewIcons}
                  mode="single"
                  value={form.openToNew}
                  onSelect={(v) => updateText("openToNew", v)}
                  columnsClass="grid-cols-1 sm:grid-cols-3"
                />
              </SurveyQuestionBlock>
              <SurveyQuestionBlock
                groupId="destinationVibe"
                sectionLabel="Destination vibe"
                showDivider
                invalid={invalidGroups.has("destinationVibe")}
                triedNext={triedNext}
                shakeKey={shakeKey}
              >
                <h3 className="mb-2 font-heading text-lg font-semibold">Would you prefer a destination that is:</h3>
                <VisualOptionCards
                  options={destinationVibeOptions}
                  iconMap={destinationVibeIcons}
                  mode="single"
                  value={form.destinationVibe}
                  onSelect={(v) => updateText("destinationVibe", v)}
                  columnsClass="grid-cols-1 sm:grid-cols-3"
                />
              </SurveyQuestionBlock>
              <SurveyQuestionBlock
                groupId="travelFrequency"
                sectionLabel="Travel frequency"
                showDivider
                invalid={invalidGroups.has("travelFrequency")}
                triedNext={triedNext}
                shakeKey={shakeKey}
              >
                <h3 className="mb-2 font-heading text-lg font-semibold">How often do you travel?</h3>
                <VisualOptionCards
                  options={travelFrequency}
                  iconMap={travelFrequencyIcons}
                  mode="single"
                  value={form.travelFrequency}
                  onSelect={(v) => updateText("travelFrequency", v)}
                  columnsClass="grid-cols-1 sm:grid-cols-3"
                />
              </SurveyQuestionBlock>
              <SurveyQuestionBlock
                groupId="moods"
                sectionLabel="Current mood"
                showDivider
                invalid={invalidGroups.has("moods")}
                triedNext={triedNext}
                shakeKey={shakeKey}
                errorMessage="Select at least one option. If you chose Other, add a short description."
              >
                <h3 className="mb-2 font-heading text-lg font-semibold">What is your mood/feeling/emotions?</h3>
                <p className="mb-3 text-sm text-muted-foreground">Check all that apply</p>
                <VisualOptionCards
                  options={moodOptions}
                  iconMap={moodIcons}
                  mode="multi"
                  selected={form.moods}
                  onToggle={(v) => {
                    setForm((prev) => {
                      const arr = prev.moods;
                      const on = arr.includes(v);
                      const next = on ? arr.filter((x) => x !== v) : [...arr, v];
                      return {
                        ...prev,
                        moods: next,
                        ...(v === "Other" && on ? { moodOther: "" } : {}),
                      };
                    });
                  }}
                  columnsClass="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                />
                {form.moods.includes("Other") ? (
                  <div className="mt-3">
                    <label className="mb-1 block text-sm font-medium">Please specify (Other) *</label>
                    <input
                      type="text"
                      value={form.moodOther}
                      onChange={(e) => updateText("moodOther", e.target.value)}
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Describe your mood or feeling"
                    />
                  </div>
                ) : null}
              </SurveyQuestionBlock>
            </div>
          )}

          {/* Step 3 — Your Trip Blueprint */}
          {step === 3 && (
            <div className="flex flex-1 flex-col gap-4">
              <h2 className="font-heading text-xl font-semibold">Your Trip Blueprint</h2>
              <SurveyQuestionBlock
                groupId="budget"
                sectionLabel="Budget"
                showDivider={false}
                invalid={invalidGroups.has("budget")}
                triedNext={triedNext}
                shakeKey={shakeKey}
              >
                <h3 className="mb-2 font-heading text-lg font-semibold">What is your travel budget?</h3>
                <VisualOptionCards
                  options={budgetOptions.map((b) => b.label)}
                  iconMap={budgetIcons}
                  mode="single"
                  value={form.budget}
                  onSelect={(v) => updateText("budget", v)}
                  columnsClass="grid-cols-1 sm:grid-cols-2"
                />
              </SurveyQuestionBlock>
              <SurveyQuestionBlock
                groupId="travelDistance"
                sectionLabel="Distance"
                showDivider
                invalid={invalidGroups.has("travelDistance")}
                triedNext={triedNext}
                shakeKey={shakeKey}
              >
                <h3 className="mb-2 font-heading text-lg font-semibold">How far are you willing to travel?</h3>
                <VisualOptionCards
                  options={travelDistanceOptions}
                  iconMap={travelDistanceIcons}
                  mode="single"
                  value={form.travelDistance}
                  onSelect={(v) => updateText("travelDistance", v)}
                  columnsClass="grid-cols-1 sm:grid-cols-2"
                />
              </SurveyQuestionBlock>
              <SurveyQuestionBlock
                groupId="tripLength"
                sectionLabel="Trip length"
                showDivider
                invalid={invalidGroups.has("tripLength")}
                triedNext={triedNext}
                shakeKey={shakeKey}
              >
                <h3 className="mb-2 font-heading text-lg font-semibold">How long do you prefer your trips?</h3>
                <VisualOptionCards
                  options={tripLengthOptions}
                  iconMap={tripLengthIcons}
                  mode="single"
                  value={form.tripLength}
                  onSelect={(v) => updateText("tripLength", v)}
                  columnsClass="grid-cols-1 sm:grid-cols-2"
                />
              </SurveyQuestionBlock>
              <SurveyQuestionBlock
                groupId="travelWith"
                sectionLabel="Travel companions"
                showDivider
                invalid={invalidGroups.has("travelWith")}
                triedNext={triedNext}
                shakeKey={shakeKey}
                errorMessage="Select at least one option. If you chose Other, add a short description."
              >
                <h3 className="mb-2 font-heading text-lg font-semibold">Who do you usually travel with?</h3>
                <p className="mb-3 text-sm text-muted-foreground">Check all that apply</p>
                <VisualOptionCards
                  options={travelWithOptions}
                  iconMap={travelWithIcons}
                  mode="multi"
                  selected={form.travelWith}
                  onToggle={(v) => {
                    setForm((prev) => {
                      const arr = prev.travelWith;
                      const on = arr.includes(v);
                      const next = on ? arr.filter((x) => x !== v) : [...arr, v];
                      return {
                        ...prev,
                        travelWith: next,
                        ...(v === "Other" && on ? { travelWithOther: "" } : {}),
                      };
                    });
                  }}
                  columnsClass="grid-cols-1 sm:grid-cols-2"
                />
                {form.travelWith.includes("Other") ? (
                  <div className="mt-3">
                    <label className="mb-1 block text-sm font-medium">Please specify (Other) *</label>
                    <input
                      type="text"
                      value={form.travelWithOther}
                      onChange={(e) => updateText("travelWithOther", e.target.value)}
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="e.g. colleagues, tour group"
                    />
                  </div>
                ) : null}
              </SurveyQuestionBlock>
              <SurveyQuestionBlock
                groupId="transport"
                sectionLabel="Transportation"
                showDivider
                invalid={invalidGroups.has("transport")}
                triedNext={triedNext}
                shakeKey={shakeKey}
                errorMessage="Select at least one option. If you chose Other, add a short description."
              >
                <h3 className="mb-2 font-heading text-lg font-semibold">What type of transportation do you prefer?</h3>
                <p className="mb-3 text-sm text-muted-foreground">Check all that apply</p>
                <VisualOptionCards
                  options={transportOptions}
                  iconMap={transportIcons}
                  mode="multi"
                  selected={form.transport}
                  onToggle={(v) => {
                    setForm((prev) => {
                      const arr = prev.transport;
                      const on = arr.includes(v);
                      const next = on ? arr.filter((x) => x !== v) : [...arr, v];
                      return {
                        ...prev,
                        transport: next,
                        ...(v === "Other" && on ? { transportOther: "" } : {}),
                      };
                    });
                  }}
                  columnsClass="grid-cols-1 sm:grid-cols-2"
                />
                {form.transport.includes("Other") ? (
                  <div className="mt-3">
                    <label className="mb-1 block text-sm font-medium">Please specify (Other) *</label>
                    <input
                      type="text"
                      value={form.transportOther}
                      onChange={(e) => updateText("transportOther", e.target.value)}
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="e.g. train, motorcycle"
                    />
                  </div>
                ) : null}
              </SurveyQuestionBlock>
            </div>
          )}

          {/* Step 4 — Your Destination & Final Details */}
          {step === 4 && (
            <div className="flex flex-1 flex-col gap-4">
              <h2 className="font-heading text-xl font-semibold">Your Destination &amp; Final Details</h2>
              <SurveyQuestionBlock
                groupId="destinationTypes"
                sectionLabel="Destination types"
                showDivider={false}
                invalid={invalidGroups.has("destinationTypes")}
                triedNext={triedNext}
                shakeKey={shakeKey}
                errorMessage="Select at least one option. If you chose Other, add a short description."
              >
                <h3 className="mb-2 font-heading text-lg font-semibold">
                  What type of destinations are you most interested in?
                </h3>
                <p className="mb-3 text-sm text-muted-foreground">Check all that apply</p>
                <VisualOptionCards
                  options={destinationTypeOptions}
                  iconMap={destinationTypeIcons}
                  mode="multi"
                  selected={form.destinationTypes}
                  onToggle={(v) => {
                    setForm((prev) => {
                      const arr = prev.destinationTypes;
                      const on = arr.includes(v);
                      const next = on ? arr.filter((x) => x !== v) : [...arr, v];
                      return {
                        ...prev,
                        destinationTypes: next,
                        ...(v === "Other" && on ? { destinationTypesOther: "" } : {}),
                      };
                    });
                  }}
                  columnsClass="grid-cols-1 sm:grid-cols-2"
                />
                {form.destinationTypes.includes("Other") ? (
                  <div className="mt-3">
                    <label className="mb-1 block text-sm font-medium">Please specify (Other) *</label>
                    <input
                      type="text"
                      value={form.destinationTypesOther}
                      onChange={(e) => updateText("destinationTypesOther", e.target.value)}
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Describe destination types you prefer"
                    />
                  </div>
                ) : null}
              </SurveyQuestionBlock>
              <SurveyQuestionBlock
                groupId="destinationScope"
                sectionLabel="Destination scope"
                showDivider
                invalid={invalidGroups.has("destinationScope")}
                triedNext={triedNext}
                shakeKey={shakeKey}
              >
                <h3 className="mb-2 font-heading text-lg font-semibold">Which destinations do you prefer?</h3>
                <VisualOptionCards
                  options={destinationScopeOptions}
                  iconMap={destinationScopeIcons}
                  mode="single"
                  value={form.destinationScope}
                  onSelect={(v) => updateText("destinationScope", v)}
                  columnsClass="grid-cols-1 sm:grid-cols-3"
                />
              </SurveyQuestionBlock>
              <SurveyQuestionBlock
                groupId="activities"
                sectionLabel="Activities"
                showDivider
                invalid={invalidGroups.has("activities")}
                triedNext={triedNext}
                shakeKey={shakeKey}
                errorMessage="Select at least one option. If you chose Other, add a short description."
              >
                <h3 className="mb-2 font-heading text-lg font-semibold">
                  What activities do you want included in your trip?
                </h3>
                <p className="mb-3 text-sm text-muted-foreground">Check all that apply</p>
                <VisualOptionCards
                  options={activityOptions}
                  iconMap={activityIcons}
                  mode="multi"
                  selected={form.activities}
                  onToggle={(v) => {
                    setForm((prev) => {
                      const arr = prev.activities;
                      const on = arr.includes(v);
                      const next = on ? arr.filter((x) => x !== v) : [...arr, v];
                      return {
                        ...prev,
                        activities: next,
                        ...(v === "Other" && on ? { activitiesOther: "" } : {}),
                      };
                    });
                  }}
                  columnsClass="grid-cols-1 sm:grid-cols-2"
                />
                {form.activities.includes("Other") ? (
                  <div className="mt-3">
                    <label className="mb-1 block text-sm font-medium">Please specify (Other) *</label>
                    <input
                      type="text"
                      value={form.activitiesOther}
                      onChange={(e) => updateText("activitiesOther", e.target.value)}
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Describe activities you want included"
                    />
                  </div>
                ) : null}
              </SurveyQuestionBlock>
              <SurveyQuestionBlock
                groupId="consultation"
                sectionLabel="Consultation"
                showDivider
                invalid={invalidGroups.has("consultation")}
                triedNext={triedNext}
                shakeKey={shakeKey}
              >
                <h3 className="mb-2 font-heading text-lg font-semibold">Would you like to include a consultation?</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  We offer an optional session with a licensed mental health professional to help identify the emotional
                  needs behind your ideal travel experience. This service comes with an additional fee.
                </p>
                <div className="grid auto-rows-fr grid-cols-1 items-stretch gap-3 sm:grid-cols-2">
                  {consultationCardOptions.map((opt) => {
                    const isOn = form.consultationRequested === opt.value;
                    const isYes = opt.value === "yes";
                    const LeadIcon = opt.LeadIcon;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, consultationRequested: opt.value }))}
                        className={cn(
                          "relative flex min-h-[72px] h-full w-full self-stretch items-center gap-3 rounded-xl p-4 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-md",
                          isYes && "border border-amber-300 bg-amber-50",
                          isYes && isOn && "border-2 border-amber-500 shadow-sm",
                          !isYes && "border border-gray-200 bg-gray-50",
                          !isYes && isOn && "border-2 border-gray-500 shadow-sm",
                        )}
                      >
                        {isOn ? (
                          <span
                            className={cn(
                              "absolute right-2 top-2 h-3 w-3 rounded-full ring-2",
                              isYes ? "bg-amber-500 ring-amber-200" : "bg-gray-500 ring-gray-200",
                            )}
                            aria-hidden
                          />
                        ) : null}
                        <LeadIcon
                          className={cn(
                            "h-6 w-6 shrink-0",
                            isYes ? "text-amber-800" : "text-muted-foreground",
                          )}
                          strokeWidth={1.75}
                          aria-hidden
                        />
                        <span
                          className={cn(
                            "pr-6 text-sm font-medium leading-snug",
                            isYes ? "text-amber-950" : "text-gray-700",
                          )}
                        >
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  Note: Our team will reach out to you with consultation details and pricing after your form submission.
                </p>
              </SurveyQuestionBlock>
              <SurveyQuestionBlock
                groupId="notes"
                sectionLabel="Additional notes"
                showDivider
                invalid={false}
                triedNext={false}
                shakeKey={0}
              >
                <p className="mb-3 text-sm text-muted-foreground">Anything else you would like us to know? (optional)</p>
                <textarea
                  value={form.additionalNotes}
                  onChange={(e) => updateText("additionalNotes", e.target.value)}
                  rows={6}
                  className="min-h-[140px] w-full resize-y rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Share preferences, accessibility needs, special occasions, or questions for our team."
                />
              </SurveyQuestionBlock>
            </div>
          )}

          <div className="mt-6 flex flex-shrink-0 items-center justify-between gap-4 border-t border-gray-100 pt-6">
            <button
              type="button"
              disabled={step <= 0}
              onClick={() => {
                if (step <= 0) return;
                setTriedNext(false);
                setStep((s) => s - 1);
              }}
              className={cn(
                "rounded-full border border-gray-300 bg-transparent px-8 py-3 font-medium text-gray-500 transition-colors",
                step <= 0 && "opacity-40",
                step > 0 && "hover:bg-gray-50",
              )}
            >
              Back
            </button>
            {step < totalSteps ? (
              <button
                type="button"
                onClick={() => {
                  if (step === 0) {
                    if (!privacyConsent) {
                      setTriedNext(true);
                      setShakeKey((k) => k + 1);
                      return;
                    }
                    setTriedNext(false);
                    setStep(1);
                    return;
                  }
                  if (!canNext()) {
                    setTriedNext(true);
                    setShakeKey((k) => k + 1);
                    return;
                  }
                  setTriedNext(false);
                  setStep((s) => s + 1);
                }}
                className="rounded-full bg-amber-400 px-8 py-3 font-medium text-white transition-opacity hover:bg-amber-500"
              >
                {step === 0 ? "I Agree and Continue" : "Next"}
              </button>
            ) : (
              <button
                type="button"
                disabled={submitting}
                onClick={() => {
                  if (!canNext()) {
                    setTriedNext(true);
                    setShakeKey((k) => k + 1);
                    return;
                  }
                  setTriedNext(false);
                  void handleSubmit();
                }}
                className="rounded-full bg-amber-400 px-8 py-3 font-medium text-white transition-opacity hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
