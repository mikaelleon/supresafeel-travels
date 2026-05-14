/**
 * SurpreSaFeel Travels — Emotion Travel Survey webhook
 *
 * 1. Create a Google Sheet. Copy its ID from the URL:
 *    https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
 * 2. Set SPREADSHEET_ID below (keep the quotes).
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Run setupSheetHeaders() once from the editor (optional but recommended),
 *    or let the first POST create headers if row 1 is empty.
 *
 * The React app POSTs JSON matching Questionnaire.tsx FormData + consultationRequested.
 * Body: JSON in postData.contents, or CORS-safe form field payload (urlencoded) from the website.
 */

const SPREADSHEET_ID = "1N7b8rl8t_P3ogEbFJzf5oA1-tInA_yuoor7FO1ZENW8";

/** Tab name; leave null or "" to use the first sheet. */
const SHEET_NAME = "Responses";

const HEADER_ROW = [
  "timestamp",
  "name",
  "email",
  "age",
  "gender",
  "occupation",
  "travelFrequency",
  "moods",
  "moodOther",
  "travelTypes",
  "travelTypesOther",
  "budget",
  "consultationRequested",
  "additionalNotes",
  "heardOfEmotionTravel",
  "expectedFeatures",
  "expectedFeaturesOther",
  "destinationTypes",
  "destinationTypesOther",
  "destinationScope",
  "activities",
  "activitiesOther",
  "travelDistance",
  "travelWith",
  "travelWithOther",
  "openToNew",
  "transport",
  "transportOther",
  "tripLength",
  "destinationVibe",
];

function getTargetSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  if (SHEET_NAME && String(SHEET_NAME).trim() !== "") {
    let sh = ss.getSheetByName(String(SHEET_NAME).trim());
    if (!sh) {
      sh = ss.insertSheet(String(SHEET_NAME).trim());
    }
    return sh;
  }
  return ss.getSheets()[0];
}

function joinList_(value, delimiter) {
  if (value == null) return "";
  if (Array.isArray(value)) {
    return value.map(function (x) { return String(x); }).join(delimiter);
  }
  return String(value);
}

function ensureHeaders_(sheet) {
  var first = sheet.getRange(1, 1, 1, HEADER_ROW.length).getValues()[0];
  var empty = first.every(function (c) { return c === "" || c == null; });
  if (empty) {
    sheet.getRange(1, 1, 1, HEADER_ROW.length).setValues([HEADER_ROW]);
    sheet.setFrozenRows(1);
  }
}

/**
 * Run once from the Apps Script editor after setting SPREADSHEET_ID.
 * Creates the tab if needed and writes the header row.
 */
function setupSheetHeaders() {
  var sheet = getTargetSheet_();
  ensureHeaders_(sheet);
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, service: "feelgood-travels-survey", message: "POST JSON to submit" })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Pull JSON string from urlencoded body (payload=...). Web Apps often omit or truncate e.parameter.payload.
 */
function extractPayloadJsonFromUrlEncoded_(raw) {
  var key = "payload=";
  var idx = raw.indexOf(key);
  if (idx === -1) {
    return null;
  }
  var encoded = raw.substring(idx + key.length);
  encoded = encoded.replace(/\+/g, " ");
  return decodeURIComponent(encoded);
}

function parsePayload_(e) {
  if (!e) {
    throw new Error("Missing event");
  }
  if (e.parameter && e.parameter.payload) {
    try {
      return JSON.parse(e.parameter.payload);
    } catch (ignore) {
      // Large forms: parameter may be truncated — use postData.contents
    }
  }
  if (!e.postData || !e.postData.contents) {
    throw new Error("Missing POST body");
  }
  var raw = String(e.postData.contents).replace(/^\s+|\s+$/g, "");
  var ct = String(e.postData.type || "").toLowerCase();
  var looksForm =
    ct.indexOf("application/x-www-form-urlencoded") !== -1 ||
    raw.indexOf("payload=") === 0;
  if (looksForm) {
    var jsonStr = extractPayloadJsonFromUrlEncoded_(raw);
    if (jsonStr) {
      return JSON.parse(jsonStr);
    }
  }
  return JSON.parse(raw);
}

function doPost(e) {
  try {
    var body = parsePayload_(e);
    var sheet = getTargetSheet_();
    ensureHeaders_(sheet);

    var row = [
      new Date(),
      body.name || "",
      body.email || "",
      body.age || "",
      body.gender || "",
      body.occupation || "",
      body.travelFrequency || "",
      joinList_(body.moods, "; "),
      body.moodOther || "",
      joinList_(body.travelTypes, "; "),
      body.travelTypesOther || "",
      body.budget || "",
      body.consultationRequested || "",
      body.additionalNotes || "",
      body.heardOfEmotionTravel || "",
      joinList_(body.expectedFeatures, "; "),
      body.expectedFeaturesOther || "",
      joinList_(body.destinationTypes, "; "),
      body.destinationTypesOther || "",
      joinList_(body.destinationScope, "; "),
      joinList_(body.activities, "; "),
      body.activitiesOther || "",
      body.travelDistance || "",
      joinList_(body.travelWith, "; "),
      body.travelWithOther || "",
      body.openToNew || "",
      joinList_(body.transport, "; "),
      body.transportOther || "",
      body.tripLength || "",
      body.destinationVibe || "",
    ];

    sheet.appendRow(row);
    return jsonResponse_(200, { ok: true });
  } catch (err) {
    return jsonResponse_(500, { ok: false, error: String(err) });
  }
}

function jsonResponse_(status, obj) {
  var out = ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
  // Note: Apps Script Web App cannot set true HTTP status codes for all clients;
  // body still carries ok: true / false for your debugging.
  return out;
}
