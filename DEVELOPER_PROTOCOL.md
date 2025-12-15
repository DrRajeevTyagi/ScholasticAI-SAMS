
# 🛡️ DEVELOPER PROTOCOL & CODE OF CONDUCT

This document serves as the absolute rulebook for all modifications to the ScholasticAI project. These rules exist to prevent data loss, feature regression, and "silent" changes that disrupt the user experience.

---

## 1. 🔒 The `index.html` Sanctity Rule
*   **Status:** **READ-ONLY / LOCKED.**
*   **Reasoning:** The `index.html` file contains critical dependency locks (React 18.2.0) and environment shims (`window.process`) that prevent the application from crashing.
*   **Action:** I will **never** include `index.html` in an XML change block. It is considered the "Master Configuration" and must be preserved exactly as is.

## 2. 🚫 No Silent Changes (The "Transparency" Rule)
*   **Trigger:** Making changes to code that were not explicitly asked for (e.g., "cleaning up" UI, "modernizing" styles).
*   **Rule:** Every single modification, no matter how small, must be explicitly listed in the summary description.
*   **Prohibition:** Do not remove features, buttons, or data points just to make the UI look "cleaner" without explicit permission. "Modern" does not mean "Less Information."

## 3. 💾 Feature Parity & Data Preservation
*   **Trigger:** Refactoring a component (e.g., changing a List to a Card View).
*   **Rule:** If the old view displayed **X, Y, and Z** data points, the new view **MUST** display **X, Y, and Z**.
*   **Example:** If a student list showed "Sports Points" in a table column, the new card view must show "Sports Points" clearly. Data must never be hidden or removed during a redesign.

## 4. 🔄 Migration Safety (The "Empty Screen" Prevention)
*   **Trigger:** Changing the data schema (e.g., adding `circulars`, changing `events`).
*   **Rule:** When bumping a database version (e.g., `v7` to `v8`), the `generateMockData` function **must** be updated to populate the new fields immediately.
*   **Requirement:** The application must **never** load with empty lists after a version bump. If `Events` are added, the generator must loop through students and assign random past events so the history tab is populated instantly.

## 5. ⚠️ Explicit Consent for Overhauls
*   **Trigger:** Rewriting a complex logic block (like the `autoAllocateWorkload` engine).
*   **Rule:** Do not rewrite core logic from scratch unless the user specifically asks to "fix" or "change" that logic. Modify existing functions to be backward compatible.

## 6. 🎨 The "UI Stability" Pact (No Unsolicited Redesigns)
*   **Trigger:** User asks for a logic fix or a backend change (e.g., "Fix the calculation formula").
*   **Rule:** Do **NOT** change the CSS, layout, colors, or visual structure of the component while fixing the logic.
*   **Prohibition:** Do not "modernize" or "clean up" the UI while performing a bug fix. Keep the visual layer identical unless explicitly asked to redesign it.

## 7. 📉 Information Density Preservation
*   **Trigger:** Redesigning a list, table, or dashboard.
*   **Rule:** "Cleaner" does not mean "Less Data". I will not remove columns, badges, or metrics to create "white space".
*   **Requirement:** If I *must* redesign, I will verify that every single data point visible in the previous version is visible in the new version *without* requiring extra clicks (hover states are risky; avoid hiding primary data there).

## 8. 🛑 Stop & Ask (The "Clutter" Check)
*   **Trigger:** Ambiguity about whether a feature is needed.
*   **Rule:** If I am unsure if a button or label is important, I will keep it. I will not assume it is "clutter" and delete it. I will prioritize functionality over minimalism.

## 9. 🧠 No "Ethical" Data Hiding
*   **Trigger:** Handling sensitive fields like Fees, Phone Numbers, or Grades.
*   **Rule:** Do not mask or hide business data from authorized roles (Admin/Teacher) under the guise of "Ethics" or "Privacy" unless explicitly requested.
*   **Reasoning:** This is an internal management system. Staff needs access to data to function.

## 10. 📊 The "Full Mock" Rule
*   **Trigger:** Adding a new feature that relies on historical data (e.g., Charts, AI Analysis).
*   **Rule:** I must update `generateMockData` to populate specific, meaningful data for that feature. 
*   **Example:** If I add an "Absenteeism Analysis" feature, I must generate past `ClassSession` logs with random absences, otherwise the feature looks broken.

---

**Acknowledgement:**
I (the AI) acknowledge that violating these rules causes confusion, data loss, and demoralization. I will check this file before generating any code to ensure compliance.
