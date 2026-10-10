# DEVSPRINT 36 — Hackathon Website

> **36 Hours. One Big Idea. Infinite Possibilities.**

A complete, production-quality website for **DEVSPRINT 36**, a 36-hour student innovation hackathon organized by a GDG on Campus community. Built to look and feel like a real, thoughtfully designed university hackathon experience — with a functional registration flow, live countdown, exact 36-hour schedule, and honest handling of every piece of unconfirmed event data.

---

## Project Overview

The site is a single-page experience with anchored navigation, plus an accessible multi-step registration wizard in a dialog. Every piece of event information — dates, venue, contacts, prize amounts, schedules, FAQ — is driven from centralized configuration and data files, so organizers can update the site without touching any component code.

Unconfirmed information (event date, venue, sponsors, mentors, judges, contact channels) is **never faked**. The site renders honest "Coming Soon / To Be Announced" states until organizers fill in the real values.

## Major Website Features

| Feature | Details |
| --- | --- |
| Sticky navigation | Active-section highlighting, smooth scrolling, functional mobile menu (auto-closes after navigation) |
| Hero | Oversized editorial typography, CSS/SVG terminal visual, event info chips, scroll indicator |
| Live countdown | Derives from configured start date; updates each second; handles *upcoming / live (elapsed timer) / ended / unconfigured* states; timezone-safe ISO input |
| Add to Calendar | Downloadable `.ics` file + Google Calendar template link — auto-enabled only when a valid date is configured |
| About | Three staggered editorial pillars + "Who should participate?" section |
| Tracks | 5 color-coded track cards with icons, example challenges and starter ideas; each opens an accessible detail dialog with a "Register for this track" shortcut (pre-selects the track in the form) |
| Schedule | The exact 36 hours (Day 1, 9:00 AM → Day 2, 9:00 PM) as a vertical timeline with Day 1 / Day 2 filters, relative hour markers, and visually distinct breaks, milestones, judging and ceremony items |
| Prizes | Podium layout with Grand Champion emphasis; pool labeled *illustrative* until confirmed; non-monetary benefits; hidden sponsor-award slots ready to populate |
| Judging | Five weighted criteria with accessible progress bars; total computed from data (must equal 100%); "proposed guidelines" disclaimer |
| Rules | Expandable accordion categories (Eligibility, Projects, AI Tools, Submissions, Conduct) |
| Community | Mentors / judges / sponsors blocks that render honest "coming soon" states while empty — never fabricated profiles |
| FAQ | 12 questions, live search filter with count + empty state, keyboard-accessible accordions |
| Registration | 4-step wizard (Personal → Participation → Team → Review) with progress stepper, conditional team fields, teammate sync, review with edit-jumps, consent gate, loading state, duplicate protection, and success screen with generated reference |
| Sharing | Native Web Share API with copy-to-clipboard fallback + toast feedback |
| Accessibility | Semantic landmarks, skip link, visible focus styles, labeled inputs, ARIA states on tabs/accordions/dialogs, reduced-motion support |

## Technology Stack

- **React 19 + TypeScript** (strict)
- **Next.js 16** (App Router)
- **Tailwind CSS 4** with a custom DEVSPRINT 36 dark theme
- **shadcn/ui** component library (Radix primitives)
- **lucide-react** icons
- **Framer Motion** for restrained, reduced-motion-aware animations
- **React Hook Form + Zod** for form state and validation
- **Zustand** for the registration dialog UI state

No backend is required to run the site. The registration flow ships with a clearly-labeled **demo mode** (see below).

## Prerequisites

- Node.js 20+ (or Bun 1.1+)
- npm / pnpm / bun

## Getting Started

```bash
# 1. Install dependencies
npm install        # or: bun install

# 2. Start the development server
npm run dev        # or: bun run dev

# 3. Open the site
#    http://localhost:3000
```

### All Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server on port 3000 |
| `npm run lint` | Run ESLint (code quality + Next.js rules) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |

> Environment variables: none required. The site runs entirely client-side; there is no server secret to configure in demo mode.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Fonts (Space Grotesk, Inter, Geist Mono), SEO/OG metadata
│   ├── page.tsx            # Page assembly: navbar → sections → footer → registration dialog
│   └── globals.css         # DEVSPRINT 36 theme: palette, grid backdrop, utilities
├── components/
│   ├── layout/             # Navbar (sticky, active section, mobile menu), Footer
│   ├── sections/           # Hero, Countdown, About, Tracks, Schedule, Prizes,
│   │                       # Judging, Rules, Mentors/Community, FAQ, Contact, FinalCTA
│   ├── registration/       # RegistrationDialog (wizard shell), RegistrationSteps,
│   │                       # RegistrationSuccess
│   └── shared/             # Logo, SectionHeading, Reveal (scroll animation)
├── config/
│   ├── event.ts            # ★ ALL event details (date, venue, contacts, links, format)
│   └── site.ts             # Brand + SEO metadata (title, description, share image)
├── data/
│   ├── tracks.ts           # 5 innovation tracks
│   ├── schedule.ts         # The exact 36-hour schedule
│   ├── prizes.ts           # Prize breakdown + benefits + (empty) special prizes
│   ├── judging.ts          # Judging criteria + weights
│   ├── rules.ts            # Rule categories
│   ├── faqs.ts             # 12 FAQ items
│   └── people.ts           # Mentors / judges / sponsors (empty until verified)
├── hooks/
│   └── use-countdown.ts    # Live countdown state machine
├── lib/
│   ├── validation.ts       # Zod schemas + per-step field groups
│   ├── registrationService.ts  # Registration adapter (demo: localStorage)
│   ├── registration-store.ts   # Zustand store for the dialog
│   ├── calendar.ts         # ICS generation + Google Calendar URL
│   └── share.ts            # Web Share API + clipboard helpers
└── types/
    └── event.ts            # All shared domain types
```

## Where to Edit Event Details

**`src/config/event.ts` is the single file organizers need.**

| What | Where |
| --- | --- |
| Event date (activates countdown + calendar) | `eventConfig.startDate` — ISO string **with timezone offset**, e.g. `"2026-11-14T09:00:00+05:30"`. Leave `null` until announced. |
| Venue / city / college | `eventConfig.location` |
| Registration deadline | `eventConfig.registrationDeadline` |
| Format (In-Person / Online / Hybrid) | `eventConfig.format` |
| Contact email | `eventConfig.contactEmail` |
| Instagram / LinkedIn / GitHub / Discord | `eventConfig.socials` (each `null` hides the link) |
| Rulebook + privacy policy URLs | `eventConfig.links` |
| Prize pool confirmed? | `eventConfig.prizePoolConfirmed` (flips "Illustrative" label) |
| Schedule | `src/data/schedule.ts` |
| Prizes / special sponsor awards | `src/data/prizes.ts` |
| Mentors / judges / sponsors | `src/data/people.ts` (add only **verified** entries) |
| SEO title / description / share image | `src/config/site.ts` |

## How the Countdown Works

`src/hooks/use-countdown.ts` reads `eventConfig.startDate` (must be a valid ISO 8601 string including timezone offset) and derives four states:

1. **Unconfigured** (`null` or invalid) → renders "Event date coming soon" with muted tiles. No fake countdown is ever shown.
2. **Upcoming** → live `DD : HH : MM : SS` countdown, updating once per second.
3. **Live** (start ≤ now < start + 36h) → "The build sprint has started" + an elapsed timer.
4. **Ended** → "The event has ended."

The interval is created on mount and **cleaned up on unmount**. The first client render matches the server render (no hydration mismatch), then the clock starts via `requestAnimationFrame` + `setInterval`.

The same date powers the **Add to Calendar** features in `src/lib/calendar.ts`:
- `.ics` download with a 60-minute reminder alarm
- Google Calendar template link (both convert the date to UTC correctly)

Both buttons stay **disabled** until a valid date is configured.

## How the Registration Form Works

The wizard lives in `src/components/registration/`:

- **Step 1 — Personal**: name, email, **mandatory 10-digit contact number**, college, academic year, optional portfolio URL
- **Step 2 — Participation**: Individual / Team mode cards; team name + size (2–4) appear only for teams; preferred track; optional idea description
- **Step 3 — Teammates**: shown only for teams; teammate fields stay in sync with the chosen team size; individuals skip this step entirely (forward *and* back navigation)
- **Step 4 — Review**: grouped summary with per-section **Edit** jump buttons; consent checkbox linking to the rules; backend notice explaining where the data goes

Validation (`src/lib/validation.ts`, Zod + React Hook Form — the **same schema is re-applied server-side** in `src/app/api/register/route.ts`):

- Each step validates only its own fields before continuing
- **Phone number is mandatory and must be exactly 10 digits** (Indian mobile format). The input only accepts digits, caps at 10 characters, and auto-unwraps pasted values like `+91 98765 43210` or `098765 43210` into a clean `9876543210`
- Field-specific, friendly error messages (invalid email/URL, required fields, team-size limits)
- Teammate emails must be valid **and different from the lead participant's email**
- Enter key advances the wizard instead of submitting early
- Submit button shows a spinner and is disabled while processing (no double submissions)
- Data is preserved when navigating between steps and when the dialog is closed without submitting

### Registration Backend & Confirmation Emails

Registrations POST to `/api/register` (`src/app/api/register/route.ts`), which:

1. **Re-validates the payload** with the same Zod schema used in the browser (defense in depth), including the 10-digit phone rule and `+91` normalization
2. **Rejects duplicates** — one registration per email address (case-insensitive, enforced by a unique index in SQLite)
3. **Persists the record** to SQLite via Prisma (`Registration` model in `prisma/schema.prisma`) with a generated reference like `DS36-K7QM4T`
4. **Composes a branded confirmation email** containing the *complete* registration info — reference, name, email, phone, college, academic year, portfolio, participation mode, team name/size, track, idea, teammates, event details and the consent timestamp (`src/lib/email-template.ts`; every user value is HTML-escaped)
5. **Delivers it via SMTP** (nodemailer) when credentials are configured; otherwise the email is stored in the `EmailOutbox` table so it can be previewed and delivered later

The success screen reports the email status honestly — `sent`, `outbox` (awaiting SMTP), `failed` (registration saved; delivery errored) or `demo` — and links to `/api/register/email-preview/[token]`, which renders the exact composed email.

#### Enabling real email delivery

Set these in `.env` (see the commented block there):

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=registrations@yourdomain.edu
SMTP_PASS=your-app-password
MAIL_FROM="DEVSPRINT 36 <registrations@yourdomain.edu>"
```

No code changes are needed — `src/lib/mailer.ts` detects the credentials and switches from outbox mode to live sending. For Gmail, use an App Password (not your login password).

#### Offline fallback

If the backend is unreachable (e.g. the dev server is down), the client falls back to storing the registration in the browser's `localStorage` so the site keeps working; the success screen then says so clearly and no email is claimed. Duplicate checking in fallback mode applies to that browser's local records.

## Deployment

The site is a standard Next.js App Router project and deploys to any Node-compatible host:

- **Vercel** (recommended): import the repository, defaults work out of the box
- **Netlify**: use the Next.js runtime preset
- **Static hosts** (if you strip the few client-only features): not recommended — the App Router setup expects a Node server

Before going live, set `siteConfig.seo.canonicalUrl` and `siteConfig.seo.shareImageUrl` in `src/config/site.ts` so Open Graph metadata is complete.

## Accessibility & Responsive Design Notes

- Tested from **320 px** up to **1440 px+**: no horizontal overflow at any tested width (320 / 375 / 768 / 1024 / 1440)
- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), skip-to-content link
- Full keyboard navigation: visible acid-green focus rings, focus moves to each wizard step heading, dialogs trap and restore focus (Radix)
- All form inputs have visible labels and programmatic associations; errors are announced
- Status conveyed by text + color (never color alone)
- `prefers-reduced-motion`: CSS animations disabled globally and Framer Motion reveals skipped
- Touch targets ≥ 44 px for mobile controls
- Color palette checked for contrast on the dark background

## Known Limitations

- Confirmation emails are **composed and stored but not delivered** until SMTP credentials are set in `.env` (outbox mode — preview link provided in the meantime)
- Email previews are guarded by an unguessable per-registration token; treat the URL as semi-private
- SQLite is fine for a single-instance deployment; switch the Prisma `datasource` to Postgres for hosted/multi-instance setups
- Rate limiting on `/api/register` is not implemented — add middleware before a public launch
- Mentors, judges and sponsors sections intentionally render "coming soon" states until verified data is added
- The prize pool is labeled *illustrative* until `prizePoolConfirmed` is set
- Add-to-Calendar requires a configured `startDate`
- The site is a single route (`/`); the registration experience is a dialog, not a separate page (by design)

---

**Designed for builders. Built for impact.**
