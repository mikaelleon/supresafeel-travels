# Connect the Emotion Survey to Google Sheets

This document describes how responses from the website questionnaire reach a Google Sheet, and how to wire everything up using the **SurpreSaFeel Travels** Google account (owner email: `surpresafeeltravels@gmail.com`).

**Security:** Never put Google passwords, API keys, or Apps Script tokens in git, in the frontend bundle, or in public docs. Sign in through Google normally in the browser. If any credential was ever pasted into chat or committed by mistake, **change the Google account password immediately** and review Google account security activity.

---

## How it works (high level)

1. User completes the survey in the React app and taps **Submit**.
2. The app sends one **HTTP POST** with **JSON** in the body to a **Google Apps Script** URL (Web App deployment).
3. The script runs on Google servers, validates the payload, and **appends one row** to a spreadsheet owned by your Google account.
4. Optional: the same pattern can be reused for a newsletter signup form (POST to a second Web App or a second handler in the same project with a `type` field in JSON).

```text
Browser (Vite app)  --POST JSON-->  Apps Script Web App  --appendRow-->  Google Sheet
```

The Web App URL is the only secret-adjacent value the **frontend** needs. It is not as sensitive as a password, but anyone with the URL could spam rows—mitigate with rate limits, a simple token in the body, or Google Cloud alternatives if abuse appears.

---

## Prerequisites

- Google account: `surpresafeeltravels@gmail.com` (used to create the Sheet and deploy the script).
- Access to [Google Sheets](https://sheets.google.com) and [Google Apps Script](https://script.google.com).

---

## Step 1: Create the spreadsheet

1. Sign in to Google as `surpresafeeltravels@gmail.com`.
2. Open Google Sheets and create a new spreadsheet, e.g. **Emotion Travel Survey Responses**.
3. On the first row, add **headers** that match what you want to store. Example (adjust names to match your Apps Script):

   - `timestamp`
   - `name`
   - `age`
   - `gender`
   - `occupation`
   - `travelFrequency`
   - `moods` (store as comma-separated or JSON string)
   - `moodOther`
   - `travelTypes`
   - `budget`
   - `consultationRequested`
   - `additionalNotes`
   - `heardOfEmotionTravel`
   - `expectedFeatures`
   - `destinationTypes`
   - `destinationScope`
   - `activities`
   - `travelDistance`
   - `travelWith`
   - `openToNew`
   - `transport`
   - `tripLength`
   - `destinationVibe`

4. Copy the **Spreadsheet ID** from the URL:

   `https://docs.google.com/spreadsheets/d/`**`SPREADSHEET_ID_HERE`**`/edit`

---

## Step 2: Create the Apps Script project

1. Open [script.google.com](https://script.google.com) while signed in as the same account.
2. **New project**.
3. Rename the project (e.g. **FeelGood Survey Webhook**).
4. Replace the default `Code.gs` with a `doPost` implementation that reads JSON and appends a row. Example skeleton (paste and then set `SPREADSHEET_ID`):

   ```javascript
   const SPREADSHEET_ID = "PASTE_YOUR_SPREADSHEET_ID";

   function doPost(e) {
     try {
       const body = JSON.parse(e.postData.contents);
       const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];

       const row = [
         new Date(),
         body.name || "",
         body.age || "",
         body.gender || "",
         body.occupation || "",
         body.travelFrequency || "",
         Array.isArray(body.moods) ? body.moods.join("; ") : "",
         body.moodOther || "",
         Array.isArray(body.travelTypes) ? body.travelTypes.join("; ") : "",
         body.budget || "",
         body.consultationRequested || "",
         body.additionalNotes || "",
         body.heardOfEmotionTravel || "",
         Array.isArray(body.expectedFeatures) ? body.expectedFeatures.join("; ") : "",
         Array.isArray(body.destinationTypes) ? body.destinationTypes.join("; ") : "",
         Array.isArray(body.destinationScope) ? body.destinationScope.join("; ") : "",
         Array.isArray(body.activities) ? body.activities.join("; ") : "",
         body.travelDistance || "",
         Array.isArray(body.travelWith) ? body.travelWith.join("; ") : "",
         body.openToNew || "",
         Array.isArray(body.transport) ? body.transport.join("; ") : "",
         body.tripLength || "",
         body.destinationVibe || "",
       ];

       sheet.appendRow(row);
       return ContentService.createTextOutput(JSON.stringify({ ok: true }))
         .setMimeType(ContentService.MimeType.JSON);
     } catch (err) {
       return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
         .setMimeType(ContentService.MimeType.JSON);
     }
   }
   ```

5. **Save** the project.

---

## Step 3: Authorize the script

1. In the editor, choose a function to run once if prompted, or use **Run** on `doPost` after a test—Google will ask for permission to access the spreadsheet.
2. Accept scopes for **Google Sheets** (and any others shown). This ties execution to `surpresafeeltravels@gmail.com`.

---

## Step 4: Deploy as a Web App

1. Click **Deploy** → **New deployment**.
2. Type: **Web app**.
3. Settings:
   - **Execute as:** Me (`surpresafeeltravels@gmail.com`)
   - **Who has access:** Anyone (required for public form POST from the website without per-user Google login). For stricter setups, consider tokens, IP limits, or a tiny backend proxy.
4. **Deploy**, then **Authorize** if prompted.
5. Copy the **Web app URL** (ends with `/exec`). This is what the Vite app calls.

### Production deployment (this project)

The live questionnaire is wired to this Web App by default in `src/pages/Questionnaire.tsx`:

- **Deployment ID:** `AKfycbz4bvDe7Y_f06SJZmsbK9p9zyJGES3p_WLXa2EXdJoXFRpL5Qh6yvt0lhe7G6cT8oU`
- **Web App URL:** `https://script.google.com/macros/s/AKfycbz4bvDe7Y_f06SJZmsbK9p9zyJGES3p_WLXa2EXdJoXFRpL5Qh6yvt0lhe7G6cT8oU/exec`

If you create a **new** deployment in Apps Script, update that constant (or use the env override below) and redeploy the site.

---

## Step 5: Connect the website (environment variable, optional override)

The app **POSTs JSON to the production Web App URL above** even when no env file exists. To point at a different script (staging, second spreadsheet, etc.):

1. In the project root, create `.env.local` (this file must stay out of git; it is usually gitignored).
2. Add:

   ```env
   VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_OTHER_DEPLOYMENT_ID/exec
   ```

3. Restart `pnpm dev` / `npm run dev` after changing env files.

If this variable is set, it **replaces** the default URL in code.

---

## Step 6: CORS and POST behavior

Apps Script Web Apps respond to **POST** from browsers. If you see CORS errors:

- Ensure deployment is **Web app** (not only API executable).
- Return JSON with `ContentService` and `MimeType.JSON` as in the example.
- Some teams use `no-cors` mode—avoid that; prefer standard JSON POST and correct deployment.

---

## Step 7: Verify end-to-end

1. Open the site locally or on your host.
2. Complete the survey and submit.
3. Refresh the Google Sheet: a new row should appear with a timestamp and answers.

---

## Newsletters (same account)

- **Option A:** Second sheet tab + second `doPost` path or `body.formType === "newsletter"` branch in the same script.
- **Option B:** Separate Apps Script project and second `VITE_` URL for the newsletter form only.

Store only email and consent fields in the sheet; never store passwords.

---

## Troubleshooting

| Symptom | What to check |
|--------|----------------|
| 401 / 403 from script | Redeploy Web App after code changes; confirm **Execute as** user owns the Sheet. |
| Row not appended | Spreadsheet ID wrong; sheet name or column count mismatch; check **Executions** in Apps Script. |
| Empty cells | Property names in JSON must match what `doPost` reads (`consultationRequested`, arrays, etc.). |
| Spam rows | Add a shared secret field in JSON checked in script; rotate if leaked. |

---

## Reference: JSON body from the app

The survey POST body matches the `FormData` shape in `src/pages/Questionnaire.tsx`, including `consultationRequested` as the string `yes` or `no`, and array fields as JSON arrays (flattened in the example script with `join`).

---

## Maintenance

- After editing the script, use **Deploy** → **Manage deployments** → **Edit** → new version, so the URL stays stable.
- Back up the Sheet periodically (File → Download, or copy tab).
