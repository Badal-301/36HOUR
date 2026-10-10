import type { ScheduleItem } from "@/types/event";

/**
 * The exact 36-hour schedule: Day 1 at 9:00 AM → Day 2 at 9:00 PM.
 * `hourMarker` values are relative to Hour 0 = 9:00 AM Day 1.
 * Breaks/meals use type "break" and render visually distinct.
 */
export const schedule: ScheduleItem[] = [
  /* ── DAY 1 — THE BUILD BEGINS ─────────────────────────── */
  {
    id: "d1-checkin",
    day: 1,
    time: "8:00 AM – 9:00 AM",
    title: "Check-in & Breakfast",
    description:
      "Participant arrival, badge pickup and breakfast. Pre-event arrival time — it does not count toward the 36 hours.",
    hourMarker: "Pre-event",
    type: "checkin",
  },
  {
    id: "d1-opening",
    day: 1,
    time: "9:00 AM – 10:00 AM",
    title: "Opening Ceremony",
    description:
      "Welcome, challenge reveal, rules walkthrough and the official start of the sprint.",
    hourMarker: "Hour 0–1",
    type: "milestone",
  },
  {
    id: "d1-ideation",
    day: 1,
    time: "10:00 AM – 12:00 PM",
    title: "Team Formation & Ideation",
    description:
      "Find teammates, validate your problem, and plan the first build cycle.",
    hourMarker: "Hour 1–3",
    type: "build",
  },
  {
    id: "d1-lunch",
    day: 1,
    time: "12:00 PM – 1:00 PM",
    title: "Lunch & Networking",
    description: "Refuel and meet fellow builders across tracks.",
    hourMarker: "Hour 3–4",
    type: "break",
  },
  {
    id: "d1-sprint1",
    day: 1,
    time: "1:00 PM – 5:00 PM",
    title: "Build Sprint 1",
    description:
      "Initial development and prototype setup — repos scaffolded, core flows taking shape.",
    hourMarker: "Hour 4–8",
    type: "build",
  },
  {
    id: "d1-mentors",
    day: 1,
    time: "5:00 PM – 6:00 PM",
    title: "Mentor Office Hours",
    description:
      "Technical guidance and honest feedback from mentors circulating the floor.",
    hourMarker: "Hour 8–9",
    type: "build",
  },
  {
    id: "d1-dinner",
    day: 1,
    time: "6:00 PM – 7:00 PM",
    title: "Dinner Break",
    description: "Hot meal before the night sprint begins.",
    hourMarker: "Hour 9–10",
    type: "break",
  },
  {
    id: "d1-night",
    day: 1,
    time: "7:00 PM – 12:00 AM",
    title: "Night Sprint",
    description:
      "Deep-focus implementation and experimentation while energy is high.",
    hourMarker: "Hour 10–15",
    type: "build",
  },

  /* ── DAY 2 — FROM PROTOTYPE TO DEMO ───────────────────── */
  {
    id: "d2-overnight",
    day: 2,
    time: "12:00 AM – 7:00 AM",
    title: "Overnight Build",
    description:
      "Overnight building with team rest rotations and optional mentor support.",
    hourMarker: "Hour 15–22",
    type: "build",
  },
  {
    id: "d2-breakfast",
    day: 2,
    time: "7:00 AM – 8:00 AM",
    title: "Breakfast & Refresh Break",
    description: "Coffee, breakfast and a well-earned reset before the final push.",
    hourMarker: "Hour 22–23",
    type: "break",
  },
  {
    id: "d2-sprint2",
    day: 2,
    time: "8:00 AM – 12:00 PM",
    title: "Build Sprint 2",
    description: "Core features and integrations — locking in the demo path.",
    hourMarker: "Hour 23–27",
    type: "build",
  },
  {
    id: "d2-lunch",
    day: 2,
    time: "12:00 PM – 1:00 PM",
    title: "Lunch",
    description: "Final proper meal before submissions and demos.",
    hourMarker: "Hour 27–28",
    type: "break",
  },
  {
    id: "d2-final",
    day: 2,
    time: "1:00 PM – 5:00 PM",
    title: "Final Development & Testing",
    description:
      "Final development, testing, bug-fixing and user-experience improvements.",
    hourMarker: "Hour 28–32",
    type: "build",
  },
  {
    id: "d2-submission",
    day: 2,
    time: "5:00 PM – 6:00 PM",
    title: "Final Submission Deadline",
    description:
      "Project submissions close, README preparation and demo setup. Hard deadline — no extensions.",
    hourMarker: "Hour 32–33",
    type: "milestone",
  },
  {
    id: "d2-demos",
    day: 2,
    time: "6:00 PM – 8:00 PM",
    title: "Project Demos & Judging",
    description:
      "Teams demonstrate working prototypes to the judging panel.",
    hourMarker: "Hour 33–35",
    type: "judging",
  },
  {
    id: "d2-deliberation",
    day: 2,
    time: "8:00 PM – 8:30 PM",
    title: "Judges' Deliberation",
    description:
      "Judges deliberate while participants network and share what they built.",
    hourMarker: "Hour 35–35.5",
    type: "judging",
  },
  {
    id: "d2-closing",
    day: 2,
    time: "8:30 PM – 9:00 PM",
    title: "Awards & Closing Ceremony",
    description:
      "Winners announced, acknowledgements, and the official close of DEVSPRINT 36.",
    hourMarker: "Hour 35.5–36",
    type: "ceremony",
  },
];

/** Highlight notice rendered with the schedule. */
export const scheduleNotice =
  "The 36-hour event runs from Day 1 at 9:00 AM to Day 2 at 9:00 PM. Final project submissions close at 5:00 PM on Day 2 so judges can evaluate and review demos before the closing ceremony.";
