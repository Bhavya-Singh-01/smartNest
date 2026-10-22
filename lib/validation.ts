// Input validation for auth and profile forms. Runs on the server (Server
// Actions); the same rules are mirrored by HTML attributes for instant feedback.

export type FieldErrors = Partial<Record<string, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9 ()-]{7,20}$/;
export const PASSWORD_MIN = 8;

const text = (form: FormData, key: string) => String(form.get(key) ?? "").trim();

export function validateEmail(email: string): string | undefined {
  if (!email) return "Enter your email address.";
  if (email.length > 254 || !EMAIL_RE.test(email)) return "Enter a valid email address.";
}

export function validateNewPassword(password: string): string | undefined {
  if (!password) return "Enter a password.";
  if (password.length < PASSWORD_MIN) return `Use at least ${PASSWORD_MIN} characters.`;
  if (password.length > 72) return "Use 72 characters or fewer.";
  if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) return "Use both letters and numbers.";
}

function validateName(name: string): string | undefined {
  if (!name) return "Enter your name.";
  if (name.length > 100) return "Use 100 characters or fewer.";
}

export function parseSignUp(form: FormData) {
  const values = { fullName: text(form, "fullName"), email: text(form, "email").toLowerCase(), password: String(form.get("password") ?? "") };
  const errors: FieldErrors = {
    fullName: validateName(values.fullName),
    email: validateEmail(values.email),
    password: validateNewPassword(values.password),
  };
  if (values.password && String(form.get("confirmPassword") ?? "") !== values.password) {
    errors.confirmPassword = errors.confirmPassword ?? "Passwords don't match.";
  }
  return { values, errors: clean(errors) };
}

export function parseSignIn(form: FormData) {
  const values = { email: text(form, "email").toLowerCase(), password: String(form.get("password") ?? "") };
  const errors: FieldErrors = {
    email: validateEmail(values.email),
    password: values.password ? undefined : "Enter your password.",
  };
  return { values, errors: clean(errors) };
}

export function parseNewPassword(form: FormData) {
  const values = { password: String(form.get("password") ?? "") };
  const errors: FieldErrors = { password: validateNewPassword(values.password) };
  if (values.password && String(form.get("confirmPassword") ?? "") !== values.password) {
    errors.confirmPassword = "Passwords don't match.";
  }
  return { values, errors: clean(errors) };
}

export function parseProfile(form: FormData) {
  const values = { fullName: text(form, "fullName"), phone: text(form, "phone") };
  const errors: FieldErrors = {
    fullName: validateName(values.fullName),
    phone: values.phone && !PHONE_RE.test(values.phone) ? "Enter a valid phone number, e.g. +91 98765 43210." : undefined,
  };
  return { values, errors: clean(errors) };
}

// Only allow redirects to paths on this site (blocks open redirects like //evil.com).
export function safeNextPath(next: unknown, fallback = "/app"): string {
  if (typeof next !== "string" || !next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) return fallback;
  return next;
}

function clean(errors: FieldErrors): FieldErrors {
  return Object.fromEntries(Object.entries(errors).filter(([, v]) => v)) as FieldErrors;
}

// ---------- Phase 2: homes, rooms, devices, plans ----------
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const HOME_TYPE_VALUES = ["apartment", "house", "studio"];
const CATEGORY_VALUES = ["hub", "lighting", "plug", "lock", "camera", "door_sensor", "motion_sensor", "speaker", "climate", "energy", "other"];
export const PLAN_PRIORITIES = ["lighting", "security", "energy", "climate", "voice"];

export const isUuid = (v: unknown): v is string => typeof v === "string" && UUID_RE.test(v);

function isRealDate(v: string): boolean {
  if (!DATE_RE.test(v)) return false;
  const d = new Date(v + "T00:00:00Z");
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === v;
}

function lengthError(value: string, max: number, label: string, required = true): string | undefined {
  if (required && !value) return `Enter ${label}.`;
  if (value.length > max) return `Use ${max} characters or fewer.`;
}

export function parseHome(form: FormData) {
  const values = { name: text(form, "name"), homeType: text(form, "homeType"), city: text(form, "city") };
  const errors: FieldErrors = {
    name: lengthError(values.name, 80, "a name for your home"),
    homeType: HOME_TYPE_VALUES.includes(values.homeType) ? undefined : "Choose a home type.",
    city: lengthError(values.city, 80, "a city", false),
  };
  return { values, errors: clean(errors) };
}

export function parseRoomName(form: FormData) {
  const values = { name: text(form, "name") };
  return { values, errors: clean({ name: lengthError(values.name, 60, "a room name") }) };
}

export function parseDevice(form: FormData, today: string) {
  const values = {
    name: text(form, "name"),
    category: text(form, "category"),
    catalogId: text(form, "catalogId"),
    roomId: text(form, "roomId"),
    brand: text(form, "brand"),
    model: text(form, "model"),
    purchaseDate: text(form, "purchaseDate"),
    warrantyExpiry: text(form, "warrantyExpiry"),
    notes: text(form, "notes"),
    manualUrl: text(form, "manualUrl"),
  };
  const errors: FieldErrors = {
    name: lengthError(values.name, 80, "a device name"),
    manualUrl: values.manualUrl && (!/^https:\/\/\S+$/.test(values.manualUrl) || values.manualUrl.length > 500) ? "Use a full https:// link." : undefined,
    category: CATEGORY_VALUES.includes(values.category) ? undefined : "Choose a category.",
    catalogId: values.catalogId && !isUuid(values.catalogId) ? "Choose a device from the list." : undefined,
    roomId: values.roomId && !isUuid(values.roomId) ? "Choose a room from the list." : undefined,
    brand: lengthError(values.brand, 60, "a brand", false),
    model: lengthError(values.model, 60, "a model", false),
    notes: lengthError(values.notes, 1000, "notes", false),
  };
  if (values.purchaseDate) {
    if (!isRealDate(values.purchaseDate)) errors.purchaseDate = "Enter a valid date.";
    else if (values.purchaseDate > today) errors.purchaseDate = "Purchase date can't be in the future.";
  }
  if (values.warrantyExpiry) {
    if (!isRealDate(values.warrantyExpiry)) errors.warrantyExpiry = "Enter a valid date.";
    else if (values.purchaseDate && isRealDate(values.purchaseDate) && values.warrantyExpiry < values.purchaseDate) {
      errors.warrantyExpiry = "Warranty can't end before the purchase date.";
    }
  }
  return { values, errors: clean(errors) };
}

export const PLAN_OWNED = ["hub", "speaker", "lighting", "lock", "camera", "sensors", "plug", "climate"];

export type PlanInput = {
  planId: string | null;
  name: string;
  homeType: string;
  rooms: number;
  priorities: string[];
  budget: number;
  existing: string[];
};

export function validatePlanInput(input: PlanInput): FieldErrors {
  const name = (input.name ?? "").trim();
  const errors: FieldErrors = {
    planId: input.planId !== null && !isUuid(input.planId) ? "Unknown plan." : undefined,
    name: lengthError(name, 80, "a plan name"),
    homeType: HOME_TYPE_VALUES.includes(input.homeType) ? undefined : "Choose a home type.",
    rooms: Number.isInteger(input.rooms) && input.rooms >= 1 && input.rooms <= 10 ? undefined : "Rooms must be between 1 and 10.",
    priorities:
      Array.isArray(input.priorities) && input.priorities.length > 0 && input.priorities.every((p) => PLAN_PRIORITIES.includes(p))
        ? undefined
        : "Choose at least one priority.",
    budget: Number.isInteger(input.budget) && input.budget >= 5000 && input.budget <= 100000 ? undefined : "Budget must be between ₹5,000 and ₹1,00,000.",
    existing: Array.isArray(input.existing) && input.existing.every((e) => PLAN_OWNED.includes(e)) ? undefined : "Unknown device type.",
  };
  return clean(errors);
}

// ---------- Phase 3: SmartNest Care ----------
const TICKET_CATEGORY_VALUES = ["device_offline", "connectivity", "installation", "automation", "malfunction", "security_privacy", "other"];
const TICKET_PRIORITY_VALUES = ["low", "normal", "high", "urgent"];
const PHOTO_MIME = ["image/jpeg", "image/png", "image/webp"];
const PHOTO_LIMIT = 5 * 1024 * 1024;

export function parseTicket(form: FormData) {
  const values = {
    deviceId: text(form, "deviceId"),
    roomId: text(form, "roomId"),
    category: text(form, "category"),
    priority: text(form, "priority") || "normal",
    title: text(form, "title"),
    description: text(form, "description"),
  };
  const photo = form.get("photo");
  const file = photo instanceof File && photo.size > 0 ? photo : null;
  const errors: FieldErrors = {
    deviceId: values.deviceId && !isUuid(values.deviceId) ? "Choose one of your devices." : undefined,
    roomId: values.roomId && !isUuid(values.roomId) ? "Choose one of your rooms." : undefined,
    category: TICKET_CATEGORY_VALUES.includes(values.category) ? undefined : "Choose what kind of problem this is.",
    priority: TICKET_PRIORITY_VALUES.includes(values.priority) ? undefined : "Choose a priority.",
    title:
      values.title.length < 3 ? "Give the problem a short title (at least 3 characters)." : values.title.length > 120 ? "Use 120 characters or fewer." : undefined,
    description:
      values.description.length < 10
        ? "Describe what's happening (at least 10 characters)."
        : values.description.length > 4000
          ? "Use 4,000 characters or fewer."
          : undefined,
    photo: file && !PHOTO_MIME.includes(file.type) ? "Photos must be JPG, PNG or WebP." : file && file.size > PHOTO_LIMIT ? "Photos must be 5 MB or smaller." : undefined,
  };
  return { values, file, errors: clean(errors) };
}

export function parseMessage(form: FormData, required = true) {
  const message = text(form, "message");
  const error = required && !message ? "Write a message first." : message.length > 4000 ? "Use 4,000 characters or fewer." : undefined;
  return { message, errors: clean({ message: error }) };
}

const PLANNER_SLOTS = ["hub", "bulb", "switch", "speaker", "speaker2", "lock", "camera_out", "camera_in", "sensor", "motion_sec", "eplug", "motion_energy", "acctrl", "thermostat"];

export function parseCatalogItem(form: FormData) {
  const values = {
    name: text(form, "name"),
    slug: text(form, "slug").toLowerCase(),
    category: text(form, "category"),
    brand: text(form, "brand"),
    model: text(form, "model"),
    connectivity: text(form, "connectivity"),
    price: text(form, "price"),
    sourceUrl: text(form, "sourceUrl"),
    isSample: form.get("isSample") === "on" ? "on" : "",
    plannerSlot: text(form, "plannerSlot"),
    needsHub: form.get("needsHub") === "on" ? "on" : "",
  };
  const price = values.price ? Number(values.price) : null;
  const errors: FieldErrors = {
    name: lengthError(values.name, 120, "a product name"),
    slug: /^[a-z0-9-]{2,60}$/.test(values.slug) ? undefined : "Use 2–60 lowercase letters, numbers and dashes.",
    category: CATEGORY_VALUES.includes(values.category) ? undefined : "Choose a category.",
    brand: lengthError(values.brand, 60, "a brand", false),
    model: lengthError(values.model, 60, "a model", false),
    connectivity: lengthError(values.connectivity, 60, "connectivity", false),
    price: price !== null && (!Number.isInteger(price) || price < 0 || price > 10000000) ? "Enter a whole number of rupees." : undefined,
    sourceUrl: values.sourceUrl && !/^https:\/\/[^\s]+$/.test(values.sourceUrl) ? "Use a full https:// link." : undefined,
    plannerSlot: values.plannerSlot && !PLANNER_SLOTS.includes(values.plannerSlot) ? "Choose a planner recommendation." : undefined,
  };
  if (!values.isSample && !values.sourceUrl) errors.sourceUrl = "Verified entries need a source link. Otherwise mark it as a sample.";
  return { values, price, errors: clean(errors) };
}

// ---------- Phase 5: maintenance reminders ----------
export const REMINDER_REPEATS = ["", "1", "3", "6", "12"];

export function parseReminder(form: FormData) {
  const values = { title: text(form, "title"), dueDate: text(form, "dueDate"), repeat: text(form, "repeat") };
  const errors: FieldErrors = {
    title: values.title.length < 2 ? "Name the task (e.g. Replace batteries)." : values.title.length > 80 ? "Use 80 characters or fewer." : undefined,
    dueDate: isRealDate(values.dueDate) ? undefined : "Choose a due date.",
    repeat: REMINDER_REPEATS.includes(values.repeat) ? undefined : "Choose how often it repeats.",
  };
  return { values, errors: clean(errors) };
}
