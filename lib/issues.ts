// Placeholder editorial copy — replace with approved text before publishing.

export type IssueSlug = "issue-01" | "issue-02" | "issue-03";

export type Issue = {
  slug: IssueSlug;
  label: string;
  number: number;
  title: string;
  season: string;
  pageCount: number;
  summary: string;
  intro: string;
  coverAlt: string;
  isLatest?: boolean;
};

export const issues: Issue[] = [
  {
    slug: "issue-01",
    label: "Issue 01",
    number: 1,
    title: "Cast Light, Soft Edges",
    season: "Spring 2024",
    pageCount: 52,
    summary:
      "A first look at poured forms and morning light in coastal cities. Walk through concrete stairwells, quiet courtyards, and the craftspeople shaping softer modern rooms.",
    intro:
      "Issue 01 opens Concrete Curve with cast surfaces and patient light. From waterfront housing to small public plazas, contributors follow how material meets climate and daily use. Photographers linger on edges and thresholds; writers sit with builders, landscape designers, and residents who live inside these curves. Begin at page one, or jump into any spread that catches your eye.",
    coverAlt:
      "Cover of Concrete Curve Issue 01, featuring a soft concrete stair catching morning light.",
  },
  {
    slug: "issue-02",
    label: "Issue 02",
    number: 2,
    title: "Rooms Between Buildings",
    season: "Autumn 2024",
    pageCount: 37,
    summary:
      "Alleys, arcades, and pocket parks take the lead. This issue traces how overlooked outdoor rooms give neighborhoods their rhythm — and who keeps them alive.",
    intro:
      "Issue 02 turns toward the spaces between buildings: covered walkways, laneways, and small squares that hold conversation and shade. Stories from three cities explore how these outdoor rooms are designed, occupied, and sometimes nearly lost. The gallery rewards slow looking — each page holds texture, seating, planting, and the people who use them.",
    coverAlt:
      "Cover of Concrete Curve Issue 02, featuring an arched outdoor passageway lined with stone and vines.",
  },
  {
    slug: "issue-03",
    label: "Issue 03",
    number: 3,
    title: "Weight and Warmth",
    season: "Spring 2025",
    pageCount: 74,
    summary:
      "Mass and comfort share the frame. From thick walls that hold heat to furniture scaled for gathering, Issue 03 asks how heavy materials can still feel welcoming.",
    intro:
      "Issue 03, our latest release, balances structural mass with lived warmth. Essays and image essays follow thick envelopes, timber and clay pairings, and civic interiors meant for long stays. Notable visits include a hillside library, a renovated market hall, and a studio where concrete furniture is cast by hand. Seventy-four pages invite wandering — open any thumbnail and stay as long as you like.",
    coverAlt:
      "Cover of Concrete Curve Issue 03, featuring a thick concrete wall beside a warm timber interior.",
    isLatest: true,
  },
];

export const totalPages = issues.reduce((sum, issue) => sum + issue.pageCount, 0);

export function getIssue(slug: string): Issue | undefined {
  return issues.find((issue) => issue.slug === slug);
}

export function getAdjacentIssues(slug: IssueSlug): {
  previous: Issue | null;
  next: Issue | null;
} {
  const index = issues.findIndex((issue) => issue.slug === slug);
  return {
    previous: index > 0 ? issues[index - 1] : null,
    next: index >= 0 && index < issues.length - 1 ? issues[index + 1] : null,
  };
}

export function getIssuePages(issue: Issue): number[] {
  return Array.from({ length: issue.pageCount }, (_, i) => i + 1);
}

export function padPage(page: number): string {
  return String(page).padStart(3, "0");
}
