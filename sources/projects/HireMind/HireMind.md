Viewed README.md:1-571
Ran command: `git remote -v`
Viewed package.json:1-19
Viewed package.json:1-35
Viewed package.json:1-34
Viewed render.yaml:1-51

Here is the complete portfolio profile for **HireMind**, compiled directly from your repository's files and codebase:

***

# 🧠 HireMind — Portfolio Profile

### Project Name
**HireMind**

### Status
✅ **Completed** *(Developed for Summer Hackathon 2026)*

### One-line Tagline
> **HireMind** — Transform hiring from blind resume screening to explainable, multi-source talent intelligence.

---

### Short Description
HireMind is an AI-powered Explainable Hiring Intelligence Platform designed to help recruiters, hiring managers, and organizations make faster, fairer, and data-driven candidate evaluations. Built for **Summer Hackathon 2026 — Problem Statement 3 (AI-Powered Resume Screening & Candidate Ranking System)**, it extracts candidate data from resumes, analyzes live coding profiles (GitHub and LeetCode), maps skill-gap heatmaps, and provides transparent, streaming AI explanations for its rankings.

* **What problem it solves:** Eliminates the lack of transparency in traditional black-box Applicant Tracking Systems (ATS) and prevents recruiters from having to manually cross-reference resumes with GitHub/LeetCode profiles.
* **Who it's built for:** Recruitment teams, engineering managers, and technical organizations looking for a bias-reduced, data-dense hiring suite.

#### Tech Stack
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)

*React 18 • TypeScript • Tailwind CSS • Vite • Zustand • Express.js • Firebase (Auth, Firestore, Storage) • Featherless.ai (LLM Inference) • Socket.io • pdf-parse • mammoth*

---

### Key Features
1. **🔍 Explainable AI Ranking:** HireMind does not just output scores. It uses Featherless.ai models to live-stream detailed reasoning explaining exactly why Candidate A is ranked above Candidate B, including experience relevance, strengths, and weaknesses.
2. **🔥 Multi-Source Portfolio Analyzer:** Evaluates technical depth beyond the resume by automatically fetching and parsing live GitHub repository activity (commits, language breakdown, contribution frequency) and LeetCode statistics (problems solved, contest ratings, global rank).
3. **📊 Skill-Gap Heatmap:** Displays an interactive, color-coded comparison grid (🟢 Match, 🟡 Partial, 🔴 Missing) highlighting where candidates fall short of the required Job Description skills.
4. **👁️ Blind Screening Mode:** Reduces unconscious bias in recruitment by scrubbing identifying information (names, emails, phone numbers, genders, university names) so selectors evaluate candidates solely on skills and capabilities.
5. **🔄 Recruiter Feedback Loop:** Captures human intervention by allowing recruiters to override AI rankings (e.g., changing AI 'Reject' to 'Hire'), logging override reasons to monitor AI accuracy and human alignment.
6. **📈 Screening Analytics Dashboard:** Built-in charts and metrics monitoring total resumes reviewed, average candidate scores, recruiter override frequency, screening throughput, and overall recruiter time saved.

---

### Your Role
**Full-Stack Developer & AI Integrator**
* Engineered the frontend from scratch using React, TypeScript, Vite, Tailwind CSS, and Framer Motion for responsive, data-dense layouts.
* Designed the Node.js / Express backend server handling file parsing (`pdf-parse` for PDF resumes and `mammoth` for DOCX files).
* Integrated the **Featherless.ai** serverless model endpoint using OpenAI's API SDK, mapping reasoning calls to models like `meta-llama/Llama-3.1-8B-Instruct`.
* Configured real-time, streaming AI summaries and rankings using WebSockets (`Socket.io`) and structured Firestore schemas for Jobs, Profiles, and Recruiter Override actions.

---

### Impact
* **Solved a Real Hackathon Problem Statement:** Developed a production-grade, functional solution addressing the bias and limitations of current keyword-based resume screening systems.
* **Explainable Hiring Outcomes:** Replaced typical black-box AI ranking scores with highly detailed, streaming written justifications, building developer trust in AI decision-making.
* **Unified Technical Profiling:** Saved recruiters time by consolidating candidate resume files, GitHub contribution history, and algorithmic practice ratings into a single screen.
* **Ethical Recruiting Guardrails:** Blind screening toggles and recruiter-override audits introduce transparent, compliant mechanisms into automated screening pipelines.

---

### Links
* 📂 [**GitHub Repository**](https://github.com/krishnasahoo11156/HireMind)
* 🚀 [**Live Demo App**](https://hire-mind-client.vercel.app/) *(Hosted as a static frontend pointing to Render backend)*

---

### Optional Details
* **Timeline:** June – July 2026 (Summer Hackathon 2026)
* **Design Philosophy:** Professional, enterprise-grade, data-dense layout (inspired by platforms like Linear, Notion, and Ashby) focusing on readability and explainability rather than neon aesthetics.