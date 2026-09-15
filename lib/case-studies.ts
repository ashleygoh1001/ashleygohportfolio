import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "clinic-check-in",
    title: "Clinic check-in redesign",
    subtitle: "Regional health network · UX research lead",
    category: "work",
    image: "/case-clinic.jpg",
    summary:
      "Patients arrived early but still waited. Leadership blamed staffing; the data pointed to a broken check-in sequence.",
    stats: [
      { label: "Interviews", value: "22" },
      { label: "Site visits", value: "4 clinics" },
      { label: "Prototype rounds", value: "4" },
    ],
    sections: {
      situation:
        "A regional clinic network asked for a digital check-in kiosk to reduce front-desk load. Leadership assumed patients wanted self-service speed. Front-desk staff reported a different story: people were confused before they reached the desk, and the kiosk often made things worse.",
      discovery:
        "I ran 22 contextual interviews across four clinics—12 patients, 6 front-desk staff, 4 nurses—plus two half-day observation shifts per site. I mapped every touchpoint from parking lot to exam room. I also audited 140 kiosk sessions from existing security camera footage (with consent signage) to quantify where people stalled.",
      insight:
        "The problem was not check-in speed—it was orientation. Patients did not know which line, desk, or screen applied to them. The insight that reframed the project: people needed a spatial story before they needed a form. We shifted from \"faster kiosk\" to \"legible arrival sequence\" and built a journey map that became the shared artifact across clinical ops and IT.",
      made:
        "Four prototype iterations: (1) paper floor-flow mockups tested in situ, (2) low-fi mobile \"am I in the right place?\" guide, (3) kiosk flow with progressive disclosure, (4) combined environmental signage + digital flow. We cut insurance verification from the lobby entirely—it moved to the exam room where staff already had context.",
      outcome:
        "Pilot clinics saw median lobby time drop 18% without adding staff. Kiosk abandonment fell from 34% to 12%. The network is rolling out the signage system network-wide. I would run a longitudinal diary study next—our snapshot missed seasonal flu surge behavior.",
    },
  },
  {
    slug: "transit-wayfinding",
    title: "Transit wayfinding study",
    subtitle: "City Transit Authority · Design fellow",
    category: "code",
    image: "/case-transit.jpg",
    summary:
      "Riders could navigate the app but got lost in the station. The gap was architectural, not informational.",
    stats: [
      { label: "Participants", value: "18" },
      { label: "Station audits", value: "6" },
      { label: "Co-design sessions", value: "3" },
    ],
    sections: {
      situation:
        "The transit authority had a well-rated trip-planning app, yet complaint logs showed persistent wayfinding failures at interchange stations. Product assumed the fix was better maps in-app. Facilities pointed to decades-old signage. Neither team owned the full journey.",
      discovery:
        "Eighteen accompanied journeys with riders transferring at six major stations. Task: reach a specified platform without asking for help. I recorded success, hesitations, and gaze direction. I supplemented with a signage inventory—1,240 signs photographed and coded for consistency.",
      insight:
        "App users failed at the same architectural choke points as people without phones. The reframing: wayfinding is a spatial system problem, not a content problem. Riders needed \"decision nodes\" at forks—short, high-contrast prompts tied to physical landmarks, not route numbers alone.",
      made:
        "An opportunity map organized by decision node rather than by sign type. Three co-design sessions with riders and station agents produced prototype placards tested with eye-tracking on a VR station model (n=12). We recommended a modular sign family synced to app landmark IDs—a systems fix, not a one-off campaign.",
      outcome:
        "Authority funded a pilot at two interchange stations. Early metrics show 23% fewer agent-assisted directions requests. The app team adopted landmark IDs in the next release. I would push harder for agent workflow research—they're informal wayfinding infrastructure.",
    },
  },
  {
    slug: "museum-audio-guide",
    title: "Museum audio guide research",
    subtitle: "Community Museum · Contract researcher",
    category: "art",
    image: "/case-museum.jpg",
    summary:
      "Visitors wanted depth without fatigue. The winning pattern was choose-your-own attention, not more content.",
    stats: [
      { label: "Participants", value: "16" },
      { label: "Sessions observed", value: "32" },
      { label: "Artifact tests", value: "5" },
    ],
    sections: {
      situation:
        "A community museum planned a new audio guide for a permanent collection refresh. Curators wanted every object to have a three-minute story. Previous guides had low completion rates. The brief assumed more narration would mean more engagement.",
      discovery:
        "Sixteen visitors—mix of members, first-timers, and access-needs participants—used a prototype guide during real visits. I ran post-visit interviews and analyzed pause/skip/replay logs. I also tested with visitors who use hearing aids and with a low-vision participant using VoiceOver.",
      insight:
        "Visitors did not want shorter stories—they wanted clearer permission to skip. The insight: engagement is controlled by attention budgeting, not content length. People wanted \"depth on demand\"—a default lightweight layer with explicit opt-in to go deeper at objects they chose, not a sequential playlist.",
      made:
        "Five artifact iterations: linear playlist (baseline), card-based picker, proximity-triggered snippets, layered \"stay/go deeper\" pattern (winner), and a tactile booklet hybrid for accessibility. The layered pattern cut average listening fatigue scores by 40% while increasing objects engaged per visit.",
      outcome:
        "Museum adopted the layered pattern for launch. Replay rates on opted-in deep tracks exceeded old full-tour completion rates. Access advisory board approved the tactile supplement. I'd instrument dwell time at physical objects earlier—our log data came late.",
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getCaseStudySlugs(): string[] {
  return caseStudies.map((c) => c.slug);
}
