import type { Issue } from "@/lib/issues";

const coverPalettes = [
  { bg: "#e8dfd2", band: "#8b5e3c", ink: "#2c2824", soft: "#c4a882" },
  { bg: "#e4e6d8", band: "#6b6f4a", ink: "#2c2824", soft: "#a8ab8e" },
  { bg: "#ebe0d6", band: "#9a6b4f", ink: "#2c2824", soft: "#d4b48c" },
] as const;

type CoverPlaceholderProps = {
  issue: Pick<Issue, "label" | "title" | "number" | "season">;
  className?: string;
  priority?: boolean;
};

export function CoverPlaceholder({
  issue,
  className = "",
}: CoverPlaceholderProps) {
  const palette = coverPalettes[(issue.number - 1) % coverPalettes.length];

  return (
    <svg
      viewBox="0 0 400 560"
      role="img"
      aria-hidden="true"
      className={`h-full w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="400" height="560" fill={palette.bg} />
      <rect x="0" y="0" width="400" height="18" fill={palette.band} />
      <rect x="0" y="542" width="400" height="18" fill={palette.band} />
      <circle cx="310" cy="150" r="72" fill={palette.soft} opacity="0.55" />
      <path
        d="M40 420 C120 360, 200 480, 280 400 S380 360, 360 320"
        fill="none"
        stroke={palette.band}
        strokeWidth="18"
        strokeLinecap="round"
        opacity="0.45"
      />
      <text
        x="36"
        y="72"
        fill={palette.ink}
        fontFamily="Georgia, serif"
        fontSize="18"
        letterSpacing="0.12em"
      >
        CONCRETE CURVE
      </text>
      <text
        x="36"
        y="120"
        fill={palette.band}
        fontFamily="Georgia, serif"
        fontSize="28"
        fontWeight="600"
      >
        {issue.label}
      </text>
      <text
        x="36"
        y="200"
        fill={palette.ink}
        fontFamily="Georgia, serif"
        fontSize="26"
        fontWeight="600"
      >
        {issue.title.length > 22
          ? `${issue.title.slice(0, 20)}…`
          : issue.title}
      </text>
      <text
        x="36"
        y="500"
        fill={palette.ink}
        fontFamily="system-ui, sans-serif"
        fontSize="14"
        opacity="0.7"
      >
        {issue.season}
      </text>
    </svg>
  );
}

type PagePlaceholderProps = {
  issueLabel: string;
  page: number;
  pageCount: number;
  className?: string;
};

export function PagePlaceholder({
  issueLabel,
  page,
  pageCount,
  className = "",
}: PagePlaceholderProps) {
  return (
    <svg
      viewBox="0 0 1224 864"
      role="img"
      aria-hidden="true"
      className={`h-full w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="1224" height="864" fill="#f3ece3" />
      <rect
        x="48"
        y="48"
        width="1128"
        height="768"
        fill="#fbf9f6"
        stroke="#ddd4c8"
        strokeWidth="2"
      />
      <text
        x="80"
        y="110"
        fill="#6b635a"
        fontFamily="system-ui, sans-serif"
        fontSize="28"
        letterSpacing="0.08em"
      >
        CONCRETE CURVE · {issueLabel.toUpperCase()}
      </text>
      <text
        x="612"
        y="420"
        textAnchor="middle"
        fill="#8b5e3c"
        fontFamily="Georgia, serif"
        fontSize="96"
        fontWeight="600"
      >
        {page}
      </text>
      <text
        x="612"
        y="490"
        textAnchor="middle"
        fill="#6b635a"
        fontFamily="system-ui, sans-serif"
        fontSize="28"
      >
        of {pageCount}
      </text>
      <rect x="80" y="720" width="280" height="10" fill="#d4b48c" opacity="0.7" />
      <rect x="80" y="748" width="420" height="8" fill="#cfc5b8" opacity="0.55" />
      <rect x="80" y="772" width="360" height="8" fill="#cfc5b8" opacity="0.4" />
    </svg>
  );
}

type ThreeCoverCompositionProps = {
  issues: Array<Pick<Issue, "label" | "title" | "number" | "season">>;
  className?: string;
};

export function ThreeCoverComposition({
  issues: issueList,
  className = "",
}: ThreeCoverCompositionProps) {
  return (
    <div
      className={`relative mx-auto grid max-w-lg grid-cols-3 items-end gap-2 sm:gap-3 ${className}`}
      aria-hidden="true"
    >
      {issueList.map((issue, index) => (
        <div
          key={issue.number}
          className={`overflow-hidden rounded-sm border border-border shadow-sm ${
            index === 1 ? "-translate-y-3 sm:-translate-y-5" : ""
          } ${index === 2 ? "translate-y-1" : ""}`}
        >
          <CoverPlaceholder issue={issue} />
        </div>
      ))}
    </div>
  );
}
