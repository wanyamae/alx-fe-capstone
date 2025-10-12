
# alx-fe-capstone

## Updated Tasks & Progress


### ✅ Completed

1. **Project Initialization**
	- Vite, React, TypeScript setup
	- Git repo and folder structure

2. **Styling Setup**
	- TailwindCSS installed/configured
	- Global styles and responsive layout

3. **State Management**
	- Redux Toolkit for global state
	- Slices for UI, theme, page, user, quiz

4. **Component Structure**
	- Sidebar (desktop, collapsible, dark mode)
	- MobileNavbar (mobile, toggles, closes)
	- TopBar, Footer, HomeDashboard
	- Quiz component (Redux-powered)
	- UserHome (quizzes table)

5. **Quiz Workflow**
	- Quiz state managed via Redux
	- Sample questions in `data.json`
	- Quiz navigation, answer selection, scoring
	- Analogue SVG countdown timer next to questions

6. **Sidebar & Navigation**
	- Sidebar uses `<ul>`, `<li>`, `<a>` for nav
	- "Take Quiz" nav item triggers quiz workflow
	- Indentation and hover color fixes

7. **Icons and UI Enhancements**
	- Heroicons for navigation and actions

8. **Testing and Linting**
	- ESLint and TypeScript configured
	- Lint errors fixed after major changes

---

#### 🗓️ Week 2 Progress

- **Quiz API Integration:**
	- Set up API calls to fetch quiz questions and categories from OpenTDB.
	- Created `opentdb.ts` and `opentdbCategories.ts` in `src/api/` for modular API logic.
	- Wired up quiz start to use real API data (not just local `data.json`).

- **User Authentication (WIP):**
	- Built out `Login` and `LoginForm` components (UI, validation, Redux wiring).
	- Added `RequireAuth` wrapper for protected routes (basic version).

- **Dashboard Enhancements:**
	- Improved `HomeDashboard` and `UserDashboard` with more stats and charts.
	- Added `PerformanceChart` for quiz analytics (dummy data for now).

- **Quiz Review/Feedback Prep:**
	- Started groundwork for quiz review feature (UI placeholders, Redux slice updates).

- **General Fixes & Refactoring:**
	- Cleaned up folder structure for clarity (moved/renamed some components).
	- Improved TypeScript types in `interface/`.
	- Minor UI polish and bugfixes across the board.

### ⏳ Pending / Next Up

- **Review and Optimize API Fetching:**
	- Refactor API logic for efficiency and error handling
	- Ensure quiz fetching supports all assignment requirements (topics, difficulty, amount)

- **Quiz Topic & Difficulty Selection:**
	- Let users choose topic, number of questions, and difficulty before starting
	- Display available topics from OpenTDB dynamically

- **Quiz Interface Enhancements:**
	- Show one question at a time with navigation
	- Indicate correct/incorrect answers after submission
	- Add question timer (stretch goal)

- **Final Score & Review:**
	- Show summary of correct/incorrect answers at end
	- Display explanations for answers if available
	- Allow quiz retake or topic change

- **Quiz History & Performance Tracking:**
	- Track and display quiz history (scores, topics)
	- Show user progress over time (average/best score)

- **Search Functionality:**
	- Add search bar for quiz topics/keywords
	- Handle no results with user-friendly messages

- **Responsive UI & Accessibility:**
	- Polish mobile/tablet/desktop layouts
	- Improve keyboard navigation, ARIA, and color contrast

- **Error Handling:**
	- Handle network/API errors and invalid responses
	- Show clear, user-friendly error messages

- **User Authentication:**
	- Finalize login/logout flow and error handling
	- Add user roles (admin, regular user)

- **General Polish & Deployment:**
	- UI/UX tweaks, bugfixes, and code cleanup
	- Deploy to Netlify/Vercel and test accessibility/performance

## Technology Stack

- **Framework:** React
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **State Management:** Redux Toolkit
- **HTTP Client:** Axios
- **Icons:** Heroicons

## Addons & Libraries

- `@reduxjs/toolkit` & `react-redux` for state management
- `axios` for API calls
- `@heroicons/react` for icons
- `tailwindcss` for styling

---
This project follows a modular, stepwise approach for maintainability and scalability.