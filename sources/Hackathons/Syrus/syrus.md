# Team Name: AlgoMinds

## Problem Statement
**Problem Statement 3: Autonomous Developer Onboarding Agent**

## Demo Video
https://drive.google.com/drive/folders/1f5uDXGoUeDgz4zbZQjtp_dPNcljTUiS-?usp=drive_link

## Presentation (PPT)
https://drive.google.com/drive/folders/1f5uDXGoUeDgz4zbZQjtp_dPNcljTUiS-?usp=drive_link

# AI-Powered Employee Onboarding Platform

A modern, AI-driven onboarding platform designed to provide a seamless onboarding experience for new employees and an efficient management dashboard for HR teams.

## Features

- **AI Assistant** — Gemini-powered conversational onboarding guide
- **Dynamic Checklists** — Role-based onboarding tasks with deadlines and progress tracking
- **HR Dashboard** — Real-time employee onboarding analytics and roster management
- **Knowledge Base** — Curated resources, playbooks, and architecture docs
- **Mail System** — Automated onboarding and task-completion emails
- **Starter Tasks** — Guided initial tickets for new hires
- **Settings** — Theme, notification preferences, AI response detail, and timezone work-hour calculator

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| AI | Google Generative AI (Gemini) |
| Auth | bcryptjs, NextAuth |
| Email | Nodemailer |
| Charts | Chart.js + react-chartjs-2 |
| Animations | Framer Motion |
| Icons | Lucide React |

## Project Structure

```
Syrus2026_AlgoMinds/
├── public/                  # Static assets
├── scripts/                 # Test & utility scripts
├── src/
│   ├── app/
│   │   ├── api/             # API routes (auth, chat, email, onboarding, tickets)
│   │   ├── auth/            # Authentication page
│   │   ├── dashboard/       # Dashboard page & view components
│   │   ├── onboarding/      # Onboarding flow page
│   │   ├── globals.css      # Global styles & design tokens
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Landing page
│   ├── components/ui/       # Reusable UI components
│   ├── data/                # Static data (checklists, personas, knowledge base, tickets)
│   └── lib/                 # Shared utilities (AI client, database, email service)
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run agent` | Start the local agent |
| `npm run dev:full` | Start both dev server and local agent |

## Local Environment Agent

Enables automatic tool verification during onboarding.

### Start the agent:
node local-agent.js

### Or start everything together:
npm run dev:full

### What it verifies:
- Python
- Node.js
- Git
- npm
- pnpm
- Docker

### How it works:
The agent runs on port 3001 and checks your installed tools every 60 seconds (or 15 seconds during onboarding for snappier experience). When a tool is detected, the corresponding checklist task is auto-completed.

## License

This project was built for Syrus 2026 by Team AlgoMinds.

### GITHuB REPO LINK - https://github.com/krishnasahoo11156/crisissync