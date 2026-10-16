# Widget demo, decision log

Running record of design + data decisions for the Ministry Brands accounting widget demo
(`index.html`). Grounded in the Confluence DR briefs (the research of record), production (beta1),
and Jo's direction. Newest sections may supersede older notes; each entry says its basis.

## 2026-10-16 LIVE vs LEGACY implementations (edit trap — read before touching a widget)

The demo carries **two generations** of several widgets: an older one and a newer **`-mb`** rewrite (prefixes `insF`, `penF`, `prF`, `remF`, `depF`, plus `budget-mb`, `receivables-mb`). The registry mounts the **newer** ones; the older functions are largely dead. Insurance is the sharpest trap: the rendered widget is **`insF*` / `kind:"insurance-mb"`** (class `insf-scope`), while `ins*` / `kind:"insurance"` is a near-dead legacy copy (1 stray registry entry). Editing `ins*` changes nothing on the widgets Jo reviews. **Rule: before editing a widget, confirm which function the registry's `kind` dispatches to, and verify the change by RENDER (the element appears on screen), not by reading the first matching function.** Same applies to pension (`penF`/`pension-mb` is live, `pen*`/`pension` legacy), remittance (`remF` live), payroll (`prF` live). Loans, Gifts, Fixed Assets, PTO, Bank, Purchasing, My Status have a single implementation.

## 2026-10-16 design pass (not brief-ticking) — improvements made

Held each widget to the real bar (usability, accessibility, clarity, glance discipline, canonical structure, tokens, JTBD within data constraints). Concrete changes this pass, each verified live:

- **My Status** — rebuilt to a grouped, prioritised list (group by module, detail + explore), Configure in the header toolbar, shared `.pto-card` tiles, count as a quiet value.
- **Accounts Payable** (`payables`) — added the date-ordered **cash-outflow chart that doubles as the filter** (overdue emphasised).
- **Fixed Assets** (`fixedassets`) — surfaced **% depreciated** in the header (was computed, hidden) with a Cost/Accumulated/Net tooltip card.
- **Insurance** (`insurance-mb`, live `insF*`) — the glance was a bare "Enrolled N" count; added a compact **by-type distribution bar** as the glance signal (parity with Pension/Loans glances). [First attempt wrongly edited the dead `ins*`; redone on `insF*`.]
- **Accessibility (WCAG 2.2 target size)** — `cc-btn` (18px), `ap-cash-row` (22px) and interactive `badge`s (22px) now carry >=24px hit areas; audit shows 0 remaining sub-target controls.

Cross-widget consistency sweep (second pass) — fixed two real drifts: **Remittance's KPI eyebrow** (`.remF-kpi-eye` "Paid to date") was uppercase / 11px / 0.1px tracking / colour 84, diverging from the canonical `.kpi-eyebrow` every other widget uses; realigned to sentence case / 10px / 0.6px / neutral-subtle. **Loans aging bar** (`.loan-stack`) used a 5px radius + lighter track vs the pill (999px) + neutral-base track every other progress/share/aging bar uses; realigned. Eyebrows and bar tracks now consistent across all widgets (verified in computed styles).

## 2026-10-16 brief-verification pass (the 8 widgets Jo flagged)

Read each widget's DR brief Part C via the Atlassian connector and checked the build against it. Result,
per widget (brief page id in brackets):

- **My Status (7370375416)** — brief wants a *grouped, prioritised list* (group by area), money/urgency led, count secondary, one predictable click model, plain labels, counts as text. Rebuilt to match: detail + explore now group by module; Configure moved to the header toolbar; shared `.pto-card` tiles; count is a quiet value; semantic tokens.
- **Accounts Payable By Due Date (7371554882)** — brief "Now": aging-band KPI tiles ✓, days-overdue ✓, vendor rollup ✓, inline Schedule-payment ✓, and a **date-ordered cash-outflow chart that doubles as the filter, overdue emphasised** — ADDED (replaces the production amount-labelled pie antipattern; fixes chart-ignores-filter).
- **Fixed Assets Values (7372537857)** — brief "Now": NBV-led KPI ✓, depreciation-story bar ✓, "None" grouping removed ✓, $ currency ✓, synced grouping ✓; **% depreciated surfaced** in the header (was computed, not shown) with a Cost/Accumulated/Net tooltip card — ADDED.
- **Pension Plans (7371030531)** — the brief's own "good synced model" reference; already meets Part C (synced table+donut, district filter carried through the drill, glance KPI with total + plan + appointee counts, appointee counts in table). No change.
- **Loans With Balance Due (7372046373)** — already meets Part C: accurate aging labels (Current / 30-59 / 60-89 / 90+), ordered aging panel (not a pie) reading from filtered data so it **syncs** to the type filter, severity-by-depth (amethyst, per the brief's "depth not alarm" rule), days-past-due, dormancy flag, risk read, drill, positive empty state. No change.
- **Gifts Pledges (7371194449)** — already meets Part C: money-first "Received" headline + behind count, per-purpose progress bars with on-pace/behind status (ahead reads as "Funded", positive), two-panel explore (Progress toward goal + Behind schedule), empty state. No change.
- **Remittance Pledge (7371980844)** — already meets Part C: money-first "Paid to date" headline, per-fund pacing bars with expected-by-now tick markers, on-track/behind status badges + pace tiles, church drill, purposeful empty state. (Header compacted earlier this session.) No change.
- **Insurance Billing Plans (7370113044)** — meets the craft items (synced type filter, share bars + pie toggle, expandable type→plan, enrolled KPI, empty state). Remaining brief gaps — employee/dependent split, premium/cost, enrollee drill — are all flagged **TO CONFIRM / product decision** in the brief (data availability unconfirmed), so NOT built (would require fabricating data, which the skill forbids).

Net: the widgets meet their briefs where the data supports it; the open items are data/product dependencies the briefs themselves mark to-confirm.

Confluence space DR, cloudId `6fe5b757-34b7-4f9c-a5c5-88454c5640f4`. Production: beta1.accounting.myamplify.io.

---

## Cross-cutting

### Information priority (how we decide what shows where)
Every datum is classified PRIMARY / SECONDARY / TERTIARY against the widget's primary job for its
persona, before placement. Primary leads the face; secondary only if there's room, else one step away;
tertiary (provenance, caveats, definitions, second datasets) lives in the widget info popover, a
tooltip, a hover, or the drill, never on the face by default. Lineage: Shneiderman's visual-information
mantra, Nielsen progressive disclosure, McGovern Top Tasks, Hay priority guides, JTBD, Few. Encoded in
the `mb-widget-builder` skill.

### Accessibility / UAT (acceptance bar)
No overlapping touch targets, no clipped/cropped content, no sub-minimum targets, readable contrast,
accessible names. Verified by an automated sweep across all widgets at 1920 and 1280 wide. Status
2026-10-13: 0 real overlaps, 0 real clips, 0 WCAG-AA contrast failures. All standalone controls raised
to the WCAG 2.2 24px minimum (`.vt` toggles, `.wt-sort`, `.leg`, `.tr-lg-row`, `.pto-chk`, the search
inputs `.dep-q`/`.mct-q`, and any focusable icon glyph). Inline row/name links keep the WCAG inline
exception; hover-reveal controls meet 24px when revealed.

### Chart colour
Sequential/categorical charts use the amethyst primitive token ramp (`blueRamp()` now emits
`--primitive-color-amethyst-*`, largest share darkest). Semantic colours (positive/negative/alert/
severe) are reserved for charts that encode those meanings. Loan aging severity stays amethyst.

### Badges (done, core pass 2026-10-13)
Figma Badge component = Status (Positive, Negative, Neutral, Attention, Info, Severe, Accent 2,
Accent 3) x Size (Small/Medium/Large) x Style (Fill, Naked, Outline, Outline & Fill), CornerRadius/
Large = 12px (NOT a full pill). Every badge/pill in the demo was converged onto this: the family base
(`.delta-pill,.bank-pill,.bank-odpill,.ap-pill,.fa-count-badge,.pto-count-badge,.rem-st,.gft-goalpill,
.pto-pill,.mys-hpill` + `.arF-badge` + `.badge`) now uses radius 12 and the Pathway static status
tokens (`fill-static-<status>-subtle` / `stroke-static-<status>-subtle` /
`foreground-static-<status>-on-subtle`). Bespoke red-10/red-100/green-350/saffron swatches replaced.
Verified: 76 badges all at radius 12, 0 overlaps/clips/contrast failures. Colored statuses render Fill
or Outline & Fill; neutral carries a stroke so it stays visible on white. NOT treated as badges (kept
as their own components): `.type-badge` (interactive category chip), `.pr-dbadge` (distribution dot),
`.pur-tile`/pace tiles (KPI tiles).

### Eyebrow / type tokens
Glance eyebrow uses the Figma token `Foreground/Static/Neutral/Subtle` (#484848), 10px / 500 / 0.6px
(`❇️ Text/Supporting/XSmall/Medium`). Glance frame padding from the shell node 40009622:39701:
bottom 8 (`Padding/XTight`), horizontal 12 (`Padding/Tight`), header left 12. Detail/Explore/Focus:
content h-pad 16 (`Padding/Base`), v-pad 12, gap 8, header left 16.

### Terminology
We do not say "group by" (that's reporting/DB language). In the UI we have filters, sort-bys, and
"broken down by / view by" controls tied to a documented job.

---

## Per widget

### Bank Balances
- The figure is the ending balance carried from the last reconciliation plus activity entered since;
  some of that recent activity may not be reconciled yet. Provenance lives in the info popover
  (`aboutOf`), worded accurately, NOT as a face tag.
- Glance eyebrow: "Cash on hand" (all accounts) / "Ending balance" (single). No "Unreconciled" face tag.
- Status column ("In balance" / "Overdrawn") shows at EVERY size of the all-accounts table, on every row.
- DATA (verified in production 2026-10-12): NO structured account Type field; NO prior-period delta;
  NO balance time-series.
- Glance face (CORRECTED 2026-10-14): "Cash on hand" / balance / a quiet **info icon beside the KPI**,
  plus the **"N overdrawn" alarm** when one applies. The since-last-reconciliation figure is TERTIARY
  provenance, so it lives on the info icon's **hover tooltip** ("Since the last reconciliation: up/down
  $X (beginning $Y). Some recent activity may not be reconciled yet."), NOT on the face. This REPLACES
  an earlier mistake where I put an invented "$X since reconciliation" delta pill on the face next to the
  overdrawn pill: two chips side by side, which Jo never asked for and which clipped at the true 275px
  glance width. No sparkline/trend: the feed has no balance history, so an interactive "evolution since
  reconciliation" chart would require fabricating data (open data-layer dependency, not shipped).
  Verified: info icon 24x24, tooltip fires on hover, 0 overflow at 275px and wider.

### Deposits On Hand
- Has a real Account Type field (verified production) — by-type distribution is grounded.
- All accounts, by individual account: shows EVERY account's share of total (no premature "Others").
- Single account selected: shows that account's share of all deposits and share of its type (two rings),
  not a sibling distribution.
- Inception date is tertiary: move out of its prime table column into detail (pending).
- DATA dependency: per-row Trend / balance-over-time needs period-end history that may not exist;
  find out at implementation.

### Budget Compared to Actual
- Variance is a dollar amount (Actual − Budget); the percentage is a secondary share-of-budget read,
  shown once in the favourability pill, not duplicated. Dollar leads.

### Payroll Distributions
- Single pay type shows that pay type's share OF EACH distribution (independent ratios, not summing to
  100): "% of distribution" header. "All pay types" keeps "% of total". This is intentional, not a bug.
- DATA dependency (verified via brief Part A 2026-10-13): the live widget breaks down by DISTRIBUTION
  only. A per-line pay-type key (`PR_HistoryCompensation` SubType) is UNVERIFIED (a source doc claims no
  schema change needed, but "not verified live"; open Value Labs question). Pay-type toggle kept as a
  proposed capability, flagged as a data dependency.

### Payroll Scheduled Time Off
- No reject exists in the model (only Pending / Approved). The "Dismiss" button and its handler have
  been REMOVED, we do not invent a disposition for a lapsed/stale request. Whether a real dismiss/lapse
  action should exist is an open SME question (Ben/Feargal), not something to fake.

### Pension Plans
- Replace the glance mini-pie with an accessible, interactive, tokenised by-plan horizontal bar, placed
  per the shell glance configurations (node 40009622:39702). (In progress.)

### Purchasing Management
- SETTLED, do not revisit: For-me / All scope toggle + three status KPI tiles (All / Pending /
  Approved), each drilling. This intentionally replaces production's 4-way status; it answers "how much
  is on me now" far better. Final.

### Accounts Payable By Due Date
- Organised by due date; the demo's date-ordered timeline view is a deliberate improvement over
  production's "By Due Date" pie.

### Receivable Invoices Outstanding
- Aging severity uses the amethyst ramp. The ordered aging bar (`arFBar`) should replace the persisting
  donut, and the overdue amount/% should show on the glance (both pending).

### Remittance Pledge
- DONE 2026-10-14: pacing realigned to CALENDAR YTD (brief-mandated; a pledge's own begin/end dates are
  informational only, never used to pace or total). `remFCompute` now sets pace = pctYear =
  (selected date - 1 Jan) / full year, expected = pledge total x pctYear, status bands key off
  gap = pctPaid - pctYear (ahead >= +5pts / on pace +-5 / behind -5..-15 / well behind < -15). Old
  pledge-term fields (termDays/elapsedDays/daysAhead) and day-based bands removed; copy, tooltips and
  REMF_ABOUT reworded. Verified: every pledge's "Expected by now" is the same share of the year (~58%
  at 31 Jul), 0 overlaps, no errors. Still mock / data questions: member-church rosters and the
  per-activity "Behind" counts, and pagination at real scale (500-800 churches per fund).

### Insurance Billing Plans
- DATA dependencies (verified via brief Part A 2026-10-13): production is COUNTS-ONLY today.
  (1) Premium / cost per plan is NOT shown live and is "TO CONFIRM" with product, not confirmed in the
  data model. (2) Employee vs dependent split is bundled today; the source tables (IBEmployeePlans,
  IBEmployeeDependents) likely exist but the clean split is "TO CONFIRM". Both kept in the demo as
  proposed capability, clearly labelled as data dependencies. Still to do: confirm against the data
  layer (engineering / Value Labs, or via the app's Ad Hoc Reports) and re-confirm counts-only in prod.

### Loans With Balance Due
- FOUR aging buckets, not five. Production's verified ranges (brief Part A §3): Current (under 30) /
  30-59 / 60-89 / 90+. 90+ is a distinct bucket because recovery drops sharply after 90 days
  (brief §8/§9/§10). A 5th "61-90" band was removed, it overstated granularity the data doesn't expose.
  Open: data-layer confirmation that per-loan days-past-due is stored finely enough; exact label choice
  (production "Current (<30)" vs Jo's "1-30" first band) to confirm.

### Fixed Assets Values
- DONE 2026-10-14: reinstated the flexible breakdown dimension the brief's Direction says to preserve
  (it was hardcoded to Class in iteration "W11 (G10)"). Reframed in product terms as a **"View by"**
  breakdown control (Class / Building / Room / Asset Account / Accum. Deprec. Account), NOT a "group by":
  it re-pivots the synced chart + table by the chosen classification, serving the documented job "break
  the register down by class, location or account." `faDim` now respects the saved `faGroupBy`; the
  "Specific Group" filter sits beside it ("All <dimension>" / one group). NBV stays the lead measure and
  the depreciation-story bar (cost/accumulated/net per group) already satisfies "tell the story in one
  view," so no single-measure picker was reinstated. Latent bug fixed: `faGroup` checked only the Class
  catalog, so the seeded "Annex" (Building) instance silently fell back to All classes; it now shows
  View by Building / Annex correctly. Verified: switching re-pivots chart+table, 0 overlaps/tiny targets.
  "None" grouping option stays dropped (brief). Still per brief, not yet built: a % depreciated read in
  the table, and the measure-picker-vs-story-bar question (story bar chosen).

### Main Content Tasks / My Status
- Main Content Tasks: customisation (pin/hide/reorder) is a data-layer build Jo is adding; keep the
  star affordance wired.
- My Status: keep minimal and functional, matching production; no urgency sort.
- DONE 2026-10-15: redesigned to canonical structure. The per-row **Status column was a stack of
  identical badges** (the active filter tile already states the status) carrying no information, so it
  was replaced with the item's **module/Area** as a quiet neutral tag (`type-badge`), the genuinely
  useful per-row dimension (tells you where to act). Count moved from a colour-coded pill to a plain
  right-aligned tabular value, matching the gold-standard tables; category is carried by the selected
  tile, not re-encoded by colour. **Explore now discloses more than detail instead of stretching it**:
  items grouped by module in a two-column layout with quiet subheads, rather than the same flat table
  widened. Header padding brought to the canonical `.dep-hd` rhythm; primitive aliases
  (`--red-130`/`--wn-100`/`--brand-400`) replaced with semantic tokens; aria-labels include the area.

---

## 2026-10-15 craft + consistency pass (cross-cutting)

Basis: Jo direction + `mb-widget-builder` conventions (canonical structure, inner padding, hierarchy,
tokens, accessibility). Applies demo-wide, not per widget.

### Type / Class / category cells are a quiet neutral TAG, not a field or a status badge
The shared `type-badge` (account Type columns in Bank/Deposits drills + account picker, Fixed Assets
**Class**) previously wore a field costume (field border + corner radius + `cursor:pointer`) and a
repeated `category` glyph, so a static label read as an interactive control, "badges or buttons?".
Redefined as one quiet non-interactive tag: `fill-static-neutral-base` + `foreground-static-neutral-base`,
6px radius, no border, no pointer, icon removed (redundant in a column already headed Type/Class).
Figma Badge stays reserved for STATUS (varies per row); a category is a tag, never a status badge.

### Tooltips are designed hierarchical cards, never a paragraph
New `tipCard` engine (reuses the `.bgt-pop` card vocabulary: title + aligned label/value rows + divider
+ emphasised foot), triggered by `data-tipcard` (listeners match `[data-tip],[data-tipcard]`). The
multi-clause paragraph tooltips were converted: Remittance pace badges (On track / Behind pace) and the
Purchasing budget-fit read. Short hint tooltips stay plain `.tip`.

### Remittance detail/explore header compacted
The stacked chip-row + KPI + 3 pace tiles made a 231px header that squeezed the table to ~1 row. KPI and
the pace tiles now sit in one band (`.remF-kpipace`), header ~160px, so the table breathes. Header and
total regions are `flex:0 0 auto` and body regions scroll within the fixed 416 (no spill/clip).

### Type family + canvas
Removed `Red Hat Display` from the Google Fonts `<link>`; the only family is `Red Hat Text` via
`--semantic-type-family-brand` (there is no Display family in Figma). Canvas is
`--semantic-color-fill-surface-canvas` on `body`.

### Still open (named by Jo 2026-10-15, not yet done)
- Full craft pass on the remaining status/table widgets (AP by due date, Gift Pledges, Fixed Assets,
  Insurance Billing, Pension Plans, Remittance, Loans) to the My Status bar: hierarchy, explore
  disclosure, consistency, a11y.
- Colour tokenization: ~578 primitive-alias usages (`--wn/brand/am/red/cn/pos/green-NN`) to map to
  semantic tokens, keeping the documented chart-palette exception (amethyst ramp, trend red/green).

---

## Open data-layer confirmations (need engineering / Value Labs or populated production)
- Payroll Distributions: per-line pay-type key (`PR_HistoryCompensation` SubType).
- Insurance Billing Plans: premium/cost per plan; clean employee/dependent split.
- Deposits On Hand: period-end balance history for a trend.
- Loans With Balance Due: per-loan days-past-due granularity.
- Bank Balances: available/unrestricted (fund) cash alongside the raw total.
