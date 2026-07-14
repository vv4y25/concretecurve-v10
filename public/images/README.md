# Magazine images

Place real cover and page assets using these stable paths. When a file is present, the site serves it through `next/image`. When missing, SVG placeholders are shown automatically.

## Path convention

```text
public/images/issues/issue-01/cover.webp
public/images/issues/issue-01/pages/page-001.webp
public/images/issues/issue-01/pages/page-002.webp
…
public/images/issues/issue-01/pages/page-052.webp

public/images/issues/issue-02/cover.webp
public/images/issues/issue-02/pages/page-001.webp … page-037.webp

public/images/issues/issue-03/cover.webp
public/images/issues/issue-03/pages/page-001.webp … page-074.webp
```

## Naming rules

- Zero-pad page numbers to three digits: `page-017.webp`
- Prefer AVIF or WebP; JPEG also works if you update the helper extension later
- Keep URLs stable once published — do not rename files after launch

## Thumbnail sizing guidance

Suggested intrinsic thumbnail size: `153 × 108` (or proportional). Full viewer frames may be larger (e.g. `1224 × 864`).
