# Python Course Star Achievement Portfolio ⭐

An interactive, modern student achievement portfolio built for **Dharma** to showcase real Python course milestones, verified handwritten notebook star awards, Sharmila Banu Mam's commendations, and curriculum progression.

Developed using **React**, **Vite**, **Tailwind CSS**, **Lucide React**, **Recharts**, and **LocalStorage**.

---

## 📸 Real Notebook Photographs Reference

This portfolio is anchored to authentic handwritten notebook evaluations:

1. **Page 1: Semester Star Log & Sharmila Banu Mam Commendation** (`/evidence/notebook_stars_page1.png`):
   - **6 Star Entries** signed by **Sharmila Banu Mam (JSh)** in red, blue, and black ink.
   - **5 Physical Gem Star Stickers**: 3 pink faceted stickers (19/08/2026) and 2 green faceted stickers (09/09/2026).
   - **Handwritten Commendation from Sharmila Banu Mam**: `"Good Job DHARMA!"` written in bold blue ink alongside 2 stars on 09/09/2026.
   - **Total Stars on Page 1**: 11 Stars (1 + 1 + 1 + 3 + 3 + 2).

2. **Page 2: Pandas Cartesian Product & Tech Speech Podcast** (`/evidence/notebook_notes_page2.png`):
   - **Handwritten Technical Notes**:
     - `Cartesian Product - when no column_ID is mentiond in 'merge' -> Pandas / Cross join / JOIN -> DB`
     - Awarded `2 ★s` with the evaluation note: `"Good!"`.
   - **Tech Speech**:
     - `: Tech Speech 'Podcast'` awarded `1 ★`.
   - Signed by **Sharmila Banu Mam (JSh)** on `16/10/2026`.
   - **Total Stars on Page 2**: 3 Stars (2 + 1).

### Grand Totals (Calculated from Real Records):
- **Total Confirmed Stars**: **14 ⭐**
- **Total Achievement Records**: **8 Records**
- **Physical Gem Stickers Awarded**: **5 Stickers** (3 Pink + 2 Green)
- **Verified Commendations**: `"Good Job DHARMA!"` & `"Good!"` (from Sharmila Banu Mam)

---

## 🌟 Key Application Features

### 1. Hero & Dashboard Statistics
- **Total Confirmed Stars**: Live calculated tally excluding unverified records.
- **Achievement Records**: Number of documented assignments.
- **Star Stickers Awarded**: Highlights the physical gem stickers visible in notebook photos.
- **Pending Verification**: Instantly flags any records needing student review.
- **Python Topics Learned**: Progress tracker across semester competencies.
- **Profile Customization**: Student name (default **Dharma**), institution, and semester.

### 2. My Notebook Photographs (Photo Gallery)
- High-resolution display of both original notebook photographs.
- **Full-Screen Interactive Inspection Modal** with zoom in, zoom out, and pan controls.
- Detailed captions linking each photo to its corresponding entries.

### 3. Star Achievement Gallery
- Individual glassmorphism cards for all 8 records.
- Visual gold star display (1 to 5 stars).
- Gem sticker badges (`✨ 3 Pink Stickers`, `✨ 2 Green Stickers`).
- Faculty reason callouts and personal commendations.
- Search by keyword, category filter, star count filter, and sorting (newest/oldest/highest stars).
- Direct **"Approve / Verified"** toggle button.

### 4. Notebook-Inspired Chronological Timeline
- Vertical glowing milestone timeline sorted chronologically from `20/07/2026` to `16/10/2026`.
- Filter by time period (All Time, Last 30, 60, 90 Days).

### 5. "Why My Faculty Awarded Me These Stars"
- Detailed breakdown of evaluation criteria (Problem-Solving, Excellent Coding, Technical Understanding, Active Participation, etc.).
- **Interactive Recharts Bar Chart** showing star distribution across skill areas.

### 6. Python Learning Journey & Notes
- Incorporates the exact topics from Notebook Page 2:
  - **Cartesian Product & Cross Joins in Pandas** (merging without `column_ID`).
  - **Tech Speech: Python Podcast Presentation**.
  - Plus core curriculum: Fundamentals, Control Flow, Functions, OOP, File Handling, and Data Analysis.
- Code snippet viewer with one-click copy and syntax highlighting.
- Status tracker: *Not Started*, *In Progress*, *Completed*, *Mastered*.

### 7. Dedicated Faculty Recognition
- Spotlight card celebrating the handwritten note: **“Good Job DHARMA!”**.
- Highlights evaluation notes and direct link to notebook evidence.

### 8. Quantitative Analytics
- **Cumulative Star Growth** over time (AreaChart).
- **Category Distribution** (Donut / PieChart).
- **Star Magnitude Frequency** (BarChart).
- **Syllabus Mastery Breakdown** progress bars.

### 9. Data Management & Persistence
- **LocalStorage Persistence**: All edits, additions, and verifications persist across browser refreshes.
- **JSON Export / Import**: Download a full JSON backup or restore it with schema validation (choice to merge or replace).
- **CSV Summary Export**: Export gradebook-compatible spreadsheet for review.
- **Printable Dossier Report**: Clean, high-contrast `@media print` layout ready for saving as PDF or physical printout.
- **Restore Notebook Records**: Instant button to reset back to the authentic notebook records extracted from the photographs.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm

### Installation & Running Locally

1. Open your terminal in the project directory:
   ```bash
   cd e:\Py_portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173/` in your browser.

5. To build for production deployment:
   ```bash
   npm run build
   ```
   The optimized production bundle will be generated in `dist/`.

---

## 🛠️ Project Architecture

```
Py_portfolio/
├── public/
│   ├── evidence/
│   │   ├── notebook_stars_page1.png  # Photo 1: Star log & "Good Job DHARMA!"
│   │   └── notebook_notes_page2.png  # Photo 2: Cartesian product & Podcast
├── src/
│   ├── components/
│   │   ├── about/
│   │   │   ├── AboutMeSection.jsx     # Personal statement, strengths & goals
│   │   │   └── ProfileModal.jsx       # Student profile edit modal
│   │   ├── achievements/
│   │   │   ├── AchievementCard.jsx    # Card with star display & verify badge
│   │   │   ├── AchievementDetailModal.jsx # Full inspection modal
│   │   │   ├── AchievementGallery.jsx # Filter, search, and records grid
│   │   │   └── AchievementModal.jsx   # Add/Edit record with validation
│   │   ├── analytics/
│   │   │   └── AnalyticsSection.jsx   # Recharts trend & distribution charts
│   │   ├── common/
│   │   │   ├── Badge.jsx              # Status, category & gem badges
│   │   │   ├── ConfirmDialog.jsx      # Accessible delete confirmation
│   │   │   ├── ParticleBackground.jsx # Subtle twinkling starfield canvas
│   │   │   └── StarDisplay.jsx        # Gold glowing star SVG component
│   │   ├── evidence/
│   │   │   └── PhotoEvidenceGallery.jsx # Full-screen zoomable notebook photos
│   │   ├── faculty/
│   │   │   └── FacultyRecognitionSection.jsx # "Good Job DHARMA!" spotlight
│   │   ├── layout/
│   │   │   ├── Footer.jsx             # Navigation & restore defaults
│   │   │   ├── Hero.jsx               # Dashboard with 5 live stat cards
│   │   │   └── Navbar.jsx             # Sticky glassmorphism header
│   │   ├── learning/
│   │   │   ├── LearningJourneySection.jsx # Syllabus & notebook topics
│   │   │   └── TopicModal.jsx         # Edit topic progress and snippet
│   │   ├── reports/
│   │   │   ├── ExportImportModal.jsx  # JSON/CSV export & validated import
│   │   │   └── PrintableReport.jsx    # Print-friendly dossier layout
│   │   ├── timeline/
│   │   │   └── StarTimeline.jsx       # Chronological milestone timeline
│   │   └── why-stars/
│   │       └── WhyStarsSection.jsx    # Faculty evaluation reasons breakdown
│   ├── utils/
│   │   ├── confetti.js                # Canvas confetti celebration effects
│   │   ├── constants.js               # Categories & default configurations
│   │   ├── exportImport.js            # JSON/CSV parser, validator & downloader
│   │   ├── realNotebookData.js        # Data extracted from notebook photos
│   │   └── storage.js                 # Safe LocalStorage persistence
│   ├── App.jsx                        # Root application coordinator
│   ├── index.css                      # Tailwind v4, glassmorphism & typography
│   └── main.jsx                       # Entry point
├── index.html                         # HTML template & Google Fonts
├── package.json
└── vite.config.js
```

---

## 📝 How to Update Records

1. **Verify or Adjust an Achievement**:
   - In the **Star Achievements** section, click the **"Verified / Approve"** button on any card to update its status.
   - Click the pencil icon to edit the date, star count, physical sticker count, faculty note, or related task.
2. **Inspect Evidence**:
   - Click the **"Inspect"** button on either notebook photo in the **My Achievement Evidence** section to view handwritten entries with full-screen zoom.
3. **Backup Your Data**:
   - Click the **Download** icon in the navbar to export your records as JSON or CSV anytime.
