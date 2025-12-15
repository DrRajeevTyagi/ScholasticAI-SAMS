
# 🚀 ScholasticAI - Comprehensive Feature List

A detailed breakdown of all features currently implemented in the ScholasticAI system, categorized by module and user role.

---

## 1. Core Architecture & Authentication
*   **Deterministic Data Engine:** Generates a full school ecosystem using a fixed seed (`12345`). Ensures every demo looks identical.
    *   **Realism:** Generates Delhi addresses, diverse subject faculties (Science, Commerce, Humanities), and realistic staff tenure (2015-2024).
*   **Cache-Busting Deployment:** Uses versioned storage keys (`school_data_v10`) to ensure deployed updates immediately reflect on client devices without manual clearing.
*   **Client-Side Persistence:** Uses `IndexedDB` and `localStorage` to save all changes without a backend.
*   **Role-Based Access Control (RBAC):** Distinct views/permissions for `Admin`, `Teacher`, and `Student`.
*   **Crash Prevention:** Integrated `ErrorBoundary` to handle React rendering errors gracefully.

---

## 2. Dashboard (Role-Specific)
### Admin View
*   **School-Wide Metrics:** Total Students, Total Teachers, Average Attendance %, Pending Fee Count.
*   **Visuals:** Student Distribution Chart (by Grade).
*   **Calendar:** School Calendar showing holidays, events, and exam schedules.

### Teacher View
*   **Workload Metrics:** "My Classes" count, "Weekly Load" (Periods/40), "Students Taught" count.
*   **Task Prompt:** "Next Task" indicator (e.g., Log Daily Class).
*   **Visuals:** "My Workload Distribution" chart showing periods per class.

### Student View
*   **Personal Metrics:** Attendance %, House Points, Next Exam Subject/Date, Fee Status.
*   **Wellness Widget:** A daily mental health check-in tool.

---

## 3. Student Management
*   **Student Directory:** Searchable list with filters for Class and Name.
*   **Admission System (Admin Only):**
    *   **Dynamic Form:** Fields can be added/removed via Settings.
    *   **Office Use Panel:** Auto-generates Admission Number, assigns Class/Stream/House.
*   **360° Student Profile:**
    *   **Overview:** Contact details, Guardian info, Class/Stream history.
    *   **Academic Tab:** Exam results visualization.
    *   **Co-Curricular Tab:** History of activities and achievements.
    *   **AI Factor Analysis:** AI analyzes the correlation between missed classes, activity load, and exam results.
    *   **Disciplinary Record:** Tracks Yellow/Pink/Red cards issued.

---

## 4. Staff Management
*   **Staff Directory:** List of all teachers with qualifications, contact info, and current load indicators.
    *   **Data Visibility:** Authorized roles see actual phone numbers; others see masked data.
*   **Teacher Profile:**
    *   **Workload:** Detailed table of classes/subjects taught.
    *   **Duties:** List of events where the teacher is "In-Charge".
    *   **House Status:** Indicates if they are a House Master.
*   **Appoint Staff:** Add new teachers manually.

---

## 5. Academic Console (Admin)
*   **Class Structure:** Create new classes/sections.
*   **Curriculum Manager:** Define subject-wise period allocation. Support for "Copy Curriculum" between classes.
*   **Workload Manager:** 
    *   **Two-Pass Allocation Engine:** 
        1.  **Specialist Phase:** Assigns Core subjects (Math/Physics/Accounts) to experts. Auto-hires new staff *only* if necessary.
        2.  **Optimization Phase:** Assigns Duties (Library/Games) to **underloaded existing teachers** to save costs.
    *   **Visual Feedback:** Green (Underloaded), Yellow (Optimal), Red (Overloaded) indicators.
*   **Date Sheet Generator:** Create exam schedules (e.g., Term End March 2026).

---

## 6. Operations & Logistics
*   **Daily Class Logs (Teacher):**
    *   **Filtered Access:** Teachers can only log data for classes they are assigned to.
    *   **Topic Tracking:** Record specifically *what* was taught (e.g., "Biot-Savart Law").
    *   **Absenteeism:** Mark specific students absent for that specific topic.
*   **Event Management:**
    *   **Smart Declaration:** Create events with auto-filled categories (Sports, Literary).
    *   **Results Sync:** Recording a "Winner" here updates the student's profile.
    *   **House Integration:** Automatically calculates House Championship points.

---

## 7. House System
*   **Scoreboard:** Real-time calculation of House Points based on Sports, Cultural, and Discipline (negative points).
*   **Roster Management:** View students/staff by House.
*   **House Master:** Designate specific teachers as Masters.

---

## 8. Community & Communication
*   **Messaging System:** Internal inbox for Staff-to-Staff or Admin-to-Student communication.
*   **Polls:** Create school-wide or group-specific polls (e.g., "Canteen Menu", "Winter Timings").
*   **Circulars:** Publish official notices for Parents, Staff, or Students.

---

## 9. Artificial Intelligence (Gemini Integrated)
*   **Circular Generator:** Generates professional school notices.
*   **Causal Factor Analysis:** Explains *why* a student is performing the way they are based on their specific attendance and activity logs.

---

## 10. System Settings
*   **Data Backup:** Download/Import the entire school state as a JSON file.
*   **Form Builder:** Customize Admission Form fields.
*   **Factory Reset:** Wipes local storage to restore the clean demo state.
