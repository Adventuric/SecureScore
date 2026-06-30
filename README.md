# 🛡️ SecureScore — Breach Exposure Checker

[![Next.js](https://img.shields.io/badge/Next.js-16.2-000000.svg?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb.svg?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-brightgreen.svg?style=for-the-badge)](LICENSE)

---

## 📖 Overview

**SecureScore** is a production-ready web application that checks if your email address or username has been exposed in known data breaches. It scans billions of records using the LeakCheck public intelligence database, computes a personalized security score out of 100, and delivers actionable recommendations — all without storing any personal data.

> **Privacy-first** — your email, username, and scan results are never stored on any server. Results live only in your browser's session storage.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| **Real-Time Breach Scanning** | Searches billions of records across known data breaches via the LeakCheck public API |
| **SecureScore™ Algorithm** | Proprietary scoring engine (0–100) with dynamic risk assessment and severity-weighted penalties |
| **Interactive Dashboard** | Animated score circle, breach timeline, data-type exposure grid, and security health breakdown |
| **Smart Recommendations** | Prioritized, actionable security advice tailored to your specific exposure profile |
| **PDF Report Export** | Download a professional, dark-themed PDF report of your scan results — no server needed |
| **Share & Recent Searches** | One-click score sharing and persistent recent searches in local storage |
| **Zero Data Retention** | All processing is ephemeral — no accounts, no sign-up, no server-side storage |

---

## 🖥️ Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 16, React 19, TypeScript |
| **Styling** | Tailwind CSS 4, Framer Motion, shadcn/ui |
| **Forms** | React Hook Form, Zod |
| **Charts** | Recharts |
| **PDF** | jsPDF |
| **Backend** | Next.js API Routes (server-side proxy) |
| **Data Source** | LeakCheck Public API (free, no key) |

---

## 🏛️ How It Works

```
User Input (Email / Username)
        │
        ▼
  Next.js API Route ─────► LeakCheck Public API
        │                        │
        │                  Breach records found?
        │                        │
        │              ┌─────────┴─────────┐
        │              │                   │
        │              ▼                   ▼
        │        Parse fields      Return empty
        │      & breach dates      result set
        │              │
        ▼              ▼
   SecureScore™ Algorithm
        │
   ┌────┴────┬────┬────┐
   │         │    │    │
   ▼         ▼    ▼    ▼
 Score   Risk   Recs  Data
(0–100)  Level        Types
        │
        ▼
  Results stored in sessionStorage
        │
        ▼
  Interactive Dashboard ←── PDF Export
```

---

## 📁 Project Structure

```
securescore/
├── src/
│   ├── app/
│   │   ├── api/check-breaches/    # Server-side breach API proxy
│   │   ├── results/               # Results dashboard page
│   │   ├── globals.css            # Tailwind v4 config & dark theme
│   │   ├── layout.tsx             # Root layout with theme provider
│   │   └── page.tsx               # Landing page
│   ├── components/
│   │   ├── dashboard/             # ScoreCircle, BreachTimeline, etc.
│   │   ├── landing/               # HeroSection, SearchCard, AnimatedBackground
│   │   ├── shared/                # ThemeToggle, PageTransition, DisclaimerBanner
│   │   └── ui/                    # shadcn/ui primitives (button, input, etc.)
│   ├── hooks/
│   │   ├── useBreachCheck.ts      # Scan orchestration hook
│   │   ├── useSecureScore.ts      # Score computation hook
│   │   ├── useLocalStorage.ts     # Persistent storage hook
│   │   └── useTypewriter.ts       # Loading animation hook
│   ├── lib/
│   │   ├── algorithm/             # SecureScore scoring engine
│   │   ├── api/                   # LeakCheck, mock-data, breach-api
│   │   ├── pdf-report.ts          # Programmatic PDF generator
│   │   └── recommendations.ts     # Recommendation engine
│   ├── data/                      # Static breach details & security tips
│   └── types/                     # TypeScript interfaces
├── public/                        # Static assets
├── .env.local                     # Local env (no keys required)
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js 18+**
- **pnpm** (preferred) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Adventuric/SecureScore.git
cd SecureScore

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — no API key or sign-up required. The app uses the free LeakCheck public API with automatic mock-data fallback.

### Production Build

```bash
pnpm build
pnpm start
```

---

## 📡 API Reference

### POST `/api/check-breaches`

Scans an email and optional username against known data breaches.

**Request Body**

```json
{
  "email": "user@example.com",
  "username": "optional_user"
}
```

**Response**

```json
{
  "email": "user@example.com",
  "breaches": [
    {
      "name": "Adobe",
      "date": "2013-10-04",
      "dataClasses": ["Emails", "Passwords"],
      "severity": "high"
    }
  ],
  "score": 72,
  "rating": "Fair",
  "riskLevel": "Moderate Risk",
  "recommendations": [...]
}
```

---

## 🔒 Privacy & Security

- **Zero Retention** — All processing happens in memory. Scan results are stored only in your browser's `sessionStorage` and cleared when the tab closes.
- **Recent Searches** — Only email addresses and scores are stored locally in `localStorage` for convenience. You can clear this at any time.
- **No API Key Required** — The app uses the free LeakCheck public API. No personal data is sent to third parties beyond the breach lookup.
- **No Accounts** — No sign-up, no authentication, no server-side persistence of any kind.

---

## 🗺️ Roadmap

| Version | Status | Highlights |
|---|---|---|
| **v1.0** | ✅ Released | Landing page, breach scanning, SecureScore, dashboard, PDF export |
| **v1.1** | 🔄 Planned | Breach monitoring alerts, email digest, export formats (CSV, JSON) |
| **v2.0** | 🚧 Planned | Additional breach APIs (HIBP, Firefox Monitor), passkey support, dark-web scanning |

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 👤 Project

Built by [Adventuric](https://github.com/Adventuric).  
Powered by the [LeakCheck](https://leakcheck.io) public breach intelligence API.
