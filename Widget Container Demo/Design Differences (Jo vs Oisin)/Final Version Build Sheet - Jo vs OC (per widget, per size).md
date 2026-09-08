# Final Version Build Sheet — Jo vs OC, per widget, per size

**Status: scaffold. Content is added widget by widget, dictated by the owner.**

This is a **working build sheet**, not the finished difference doc. It exists to drive the code
change for the `(OC)` widgets. Once it is complete and implemented, a separate **true diff doc**
will be written from the resulting code. The existing pair in this folder
(`Jo vs Oisin - Design Differences.md` / `.html`) is untouched by this document.

---

## The end state this sheet builds toward

Every `(OC)` widget **starts as Jo's exact code** — her current live block, copied byte for byte
into the `(OC)` namespace. Nothing of ours is carried across by default.

The final version is then produced by applying **only** the differences marked `Adopt` below, one
at a time. So:

- The default for every row is **Keep Jo**.
- Each row marked `Adopt ours` is an explicit, itemised opt-in.
- For every aspect **not** listed as adopted, the `(OC)` code must stay byte-identical to hers.

This inverts the current state of the file, where the `(OC)` widgets hold our V2 re-port wholesale.

---

## What "Jo" and "Ours" mean here

**Jo** always means **her current live widget** — what her GitHub Pages phase-2 site serves today.
Never a retired or superseded version of hers.

For W01–W07 she adopted our August port as *the* widget in her own commit `faa6507` and has evolved
it since, so her live widget is the `*-mb` kind. For W09–W17 she never adopted ours, so her own
kinds are her live widgets. Verified against the file:

| Widget | Name | **Jo** = her live kind | **Ours** = kind |
|---|---|---|---|
| W01 | Budget Compared to Actual | `budget-mb` | `budget-oc` |
| W02 | Pension Plans | `pension-mb` | `pension-oc` |
| W03 | Payroll Distributions | `payroll-mb` | `payroll-oc` |
| W04 | Remittance Pledges | `remittance-mb` | `remittance-oc` |
| W05 | Receivable Invoices Outstanding | `receivables-mb` | `receivables-oc` |
| W06 | Insurance Billing Plans | `insurance-mb` | `insurance-oc` |
| W07 | Deposits on Hand | `deposits-mb` | `deposits-oc` |
| W09 | Payroll Scheduled Time Off | `pto` | `pto-mb` |
| W10 | Loans With Balance Due | `loans` | `loans-mb` |
| W11 | Fixed Asset Values | `fixedassets` | `fixedassets-mb` |
| W13 | Purchasing Management | `purchasing` | `purchasing-mb` |
| W15 | Bank Balances | `bank` | `bank-mb` |
| W16 | Accounts Payable By Due Date | `payables` | `payables-mb` |
| W17 | Gifts Pledges | `gifts` | `gifts-mb` |

Not in scope: **W08** (My Status) and **W14** (Main Content Tasks) are hers alone, and **W12** is an
empty slot in the widget list.

Baseline: Jo's `a548419` ("widget demo update 2026-09-08 11:23:16"), branch `oisin-v2-rebuild`.

---

## How to read a row

Each widget gets four subsections, in this order:

1. **Glance** (`kpi` tier)
2. **Explore** (`wide` tier)
3. **Detail** (`xwide` tier)
4. **Other states** — empty, loading, no-data, single-band, and any other demo state that widget carries

Every difference is one row with a stable ID:

| Prefix | Meaning |
|---|---|
| `Wnn-GL-nn` | Glance |
| `Wnn-EX-nn` | Explore |
| `Wnn-DE-nn` | Detail |
| `Wnn-ST-nn` | Other states |
| `Wnn-AL-nn` | Applies at **all** sizes — data rules, maths, sort/paging logic that is not size-specific |

IDs are **stable and never reused**. If a row is dropped, its ID is retired, not recycled.

### Decision values

| Value | Meaning for the code phase |
|---|---|
| **Keep Jo** | *(default)* `(OC)` keeps her exact code for this aspect. Ours is not carried across. |
| **Adopt ours** | Bring our version across into the `(OC)` widget as built. |
| **Adopt modified** | Bring ours across with a change, described in Notes. |
| **New** | Neither side is right. Build something that exists in neither version, described in Notes. |

### Row template

```
### Glance

| ID | Aspect | Jo (current live) | Ours | Decision | Notes |
|---|---|---|---|---|---|
| W01-GL-01 | Headline figure | unsigned $5,900 | signed +$5,900 with arrow and quiet 1.9% | Keep Jo | why / source / open question |
```

Notes carries the reason, the source where there is one (Step 4 design decision, Step 5 API spec,
codebase trace), and any open question. A row with nothing to say in Notes leaves it blank.

---

## Progress

| Widget | Documented | Decisions made | Implemented |
|---|---|---|---|
| W01 Budget Compared to Actual | 2026-09-08 | 3 adopt, rest base = Jo | **2026-09-08, verified** |
| W02 Pension Plans | 2026-09-08 | 1 adopt, rest base = Jo | **2026-09-08, verified** |
| W03 Payroll Distributions | 2026-09-08 | 1 adopt, 1 adopt-modified, 1 new | **2026-09-08, verified** |
| W04 Remittance Pledges | — | — | — |
| W05 Receivable Invoices Outstanding | — | — | — |
| W06 Insurance Billing Plans | — | — | — |
| W07 Deposits on Hand | — | — | — |
| W09 Payroll Scheduled Time Off | — | — | — |
| W10 Loans With Balance Due | — | — | — |
| W11 Fixed Asset Values | — | — | — |
| W13 Purchasing Management | — | — | — |
| W15 Bank Balances | — | — | — |
| W16 Accounts Payable By Due Date | — | — | — |
| W17 Gifts Pledges | — | — | — |

---

<!-- Widget sections are appended below, one per widget, as they are dictated. -->

## W01 — Budget Compared to Actual

**Base: Jo's exact code.** The only thing carried across from our version is the **percentage after the
headline amount**, at all three sizes. Everything else stays hers.

### The figure being added

> Are you **above or below budget**, and by how much **as a percentage**, over the **selected time frame**.

| Property | Value |
|---|---|
| Meaning | The window's variance expressed as a percent of that window's budget |
| Scope | The selected time frame, start to end (the window chosen in the header: This month / period / quarter / year / fiscal year) |
| Maths | `abs(variance) / posted budget for the window * 100`, rounded to one decimal |
| Periods counted | Only **posted** periods. Unposted months are excluded from both the actual and the budget totals, so a part-year window is not diluted by months that have not happened. |
| No-budget case | When the window has no posted budget, no percent renders at all |
| Sign | Unsigned. Above vs below is already carried by the sign on her dollar amount (`+$5,900` / `−$5,900`) |
| Colour | Quiet grey, fixed. It does **not** take the favourability colour; only the dollar amount does |

This is the same figure and the same maths as the Step 3 Final (`Dashboard Widget Mockups.html`,
`bgtFHeadlineInner`), so our version is adopted as built rather than reworked. Both of Jo's render
sites already compute and pass the window totals it needs, so nothing upstream has to change.

### Glance

| ID | Aspect | Jo (current live) | Ours | Decision | Notes |
|---|---|---|---|---|---|
| W01-GL-01 | Headline percent | None. Her headline builder returns an empty percent | Quiet percent after the amount, e.g. `+$5,900  1.9%` | **Adopt ours** | The figure defined above |
| W01-GL-02 | Headline arrow glyph | No glyph. Direction reads from the signed amount and the Favourable pill | A filled up/down triangle before the sign | Keep Jo | **Not** adopted. Trap: the glyph and the percent are built in the same one-line return, so the percent must be taken without it |
| W01-GL-03 | Sparkline | Sparkline in the KPI row (her 2026-09-08 addition) | None | Keep Jo | Hers is newer than our version, which simply predates it |
| W01-GL-04 | Window caption | `This fiscal year` | `vs. budget, This fiscal year` | Keep Jo | The `vs. budget,` prefix is not adopted; she dropped it deliberately |

### Explore

| ID | Aspect | Jo (current live) | Ours | Decision | Notes |
|---|---|---|---|---|---|
| W01-EX-01 | Headline percent | None | Quiet percent after the amount | **Adopt ours** | Same figure and maths as Glance, so the headline reads identically at every size |
| W01-EX-02 | Headline arrow glyph | No glyph | Up/down triangle | Keep Jo | Same trap as W01-GL-02 |

### Detail

| ID | Aspect | Jo (current live) | Ours | Decision | Notes |
|---|---|---|---|---|---|
| W01-DE-01 | Headline percent | None | Quiet percent after the amount | **Adopt ours** | Same figure. Explore and Detail share one render site, so this is the same code edit as W01-EX-01, not a second one |
| W01-DE-02 | Headline arrow glyph | No glyph | Up/down triangle | Keep Jo | Same trap as W01-GL-02 |

### Other states

| ID | Aspect | Jo (current live) | Ours | Decision | Notes |
|---|---|---|---|---|---|
| W01-ST-01 | No budget set up / nothing posted | Headline reads zero, no percent | Identical: our builder also returns an empty percent when there is no variance, and suppresses the percent when the window has no posted budget | Keep Jo | No behaviour change in these states. Adopting the percent does not alter them |

---

## W02 — Pension Plans

**Base: Jo's exact code.** The only thing carried across from our version is the **context line under
the total, at Glance only**. Explore, Detail and the states stay hers.

### Glance

| ID | Aspect | Jo (current live) | Ours | Decision | Notes |
|---|---|---|---|---|---|
| W02-GL-01 | Context line under the total | Nothing rendered. Her Glance has an empty slot exactly where this line sits | `contributed a year across 5 plans, all districts` | **Adopt ours** | How many plans, then the district scope. When no district filter is applied it reads `all districts`; otherwise it names the selected district. `plan` singularises at one |

**Open question on W02-GL-01:** when a *single* district is selected, our line names that district
rather than giving a count. So it reads `across 5 plans, north district`, not `1 district`. That is
what our build does and what the screenshot shows, so it is adopted as built, but say the word if you
want a count instead.

Her Glance already computes every value this line needs (the plan count and the district label) for
the screen-reader sentence she renders underneath. Nothing new has to be calculated.

### Explore

No differences adopted. Base is Jo's code, unchanged.

### Detail

No differences adopted. Base is Jo's code, unchanged.

### Other states

| ID | Aspect | Jo (current live) | Ours | Decision | Notes |
|---|---|---|---|---|---|
| W02-ST-01 | No appointments | Her own empty Glance readout | Same | Keep Jo | The adopted line lives in the has-data branch only, so this state is untouched either way |

---

## W03 — Payroll Distributions

**Base: Jo's exact code.** Her Glance is taken whole. Three things change: her distribution drill
modal gains our employee list, her single scope chip becomes our three separate filters, and the
Detail pie legend moves to the right of the donut, which is wrong in **both** versions today.

### All sizes

| ID | Aspect | Jo (current live) | Ours | Decision | Notes |
|---|---|---|---|---|---|
| W03-AL-01 | Export control | Export sits **only** behind the card's 3-dot overflow menu, as Export as CSV / Excel / PDF | Same 3-dot entries, **plus** an extra export button inside the widget on its own caption row | **Keep Jo** | Export belongs behind the 3 dots. Our in-widget button is not adopted. The 3-dot entries already exist and are display-only; the intent to record for the devs is that they export **the table's contents**. Nothing to build here, only our button to leave behind |

### Glance

| ID | Aspect | Jo (current live) | Ours | Decision | Notes |
|---|---|---|---|---|---|
| W03-GL-01 | Whole Glance card | Her Glance, including the within-period composition bar under the total | Chip and total only. Our version deliberately deleted her composition bar | **Keep Jo** | Take hers completely, as-is. Nothing from ours is carried across at this size. Rebasing restores the composition bar our version removed |

### Explore

| ID | Aspect | Jo (current live) | Ours | Decision | Notes |
|---|---|---|---|---|---|
| W03-EX-01 | Clicking a Distribution in the table view | Opens **her** modal: period and distribution chips, the total, a pay-type table (% of total and Amount) with a Total row, a donut with its legend to the right, and Done. No employee detail anywhere | Employee-level drill: an employee table, sortable by Employee or Total pay, each row expanding to that employee's pay breakdown | **Adopt modified** | Keep **her modal exactly as it is** and add our employee table into the empty area beneath the pay-type table, in the left column below the Total row, where the box is drawn on the screenshot. Columns Employee and Total pay, both sortable; a chevron per row expanding that employee's pay breakdown; a `Total, N employees` footer row. The employee table gets **its own scroll container**, so the modal itself does not grow |

**Refined 2026-09-08 (owner):** the employee list is no longer inside her left column. It spans the
**full width across the bottom of the modal, below both columns**, as its own panel with the house
weak border and radius used by the other popups, and a **Breakdown** subheading. Everything else
about the row is unchanged.
| W03-EX-02 | Filter chips | Two chips: the period, plus one combined scope chip | Three chips: the period, plus **Distribution** and **Pay type** as two independent filters that combine freely | **Adopt ours** | Distributions and pay types must be separately filterable |

### Detail

| ID | Aspect | Jo (current live) | Ours | Decision | Notes |
|---|---|---|---|---|---|
| W03-DE-01 | Pie chart legend position | Legend sits **under** the donut | Legend sits **under** the donut — identical, ours is no better | **New** | Wrong in both. The legend must sit to the **right** of the donut, the way it already does at Explore. Cause is known: a single CSS rule forces the donut and legend into a column at Detail only. See the implementation notes for why the fix has to be namespaced |
| W03-DE-02 | Clicking a Distribution in the table view | As W03-EX-01 | As W03-EX-01 | **Adopt modified** | Same behaviour and the same code as W03-EX-01. The modal is shared across sizes, so this is one implementation, not two |

### Other states

| ID | Aspect | Jo (current live) | Ours | Decision | Notes |
|---|---|---|---|---|---|
| W03-ST-01 | No pay history, and zero-in-range | Her empty state, with the header kept so the period chip is the way back | Same | Keep Jo | Untouched by everything above |

---

# Implementation notes — code phase

Working notes for whoever makes the code change. **Not part of the difference record**, and not for
Confluence or for Jo. Kept separate on purpose so the tables above stay a clean decision record.

Nothing in this section has been implemented yet.

## W01 — implementation notes

### Step 1: rebase the `(OC)` widget onto her exact code

Today `bgtO` holds our V2 re-port. Replace the whole block with her live `bgtF` block taken from
`a548419`, renaming only the namespace: `bgtF` to `bgtO`, `BGTF_` to `BGTO_`,
`budget-mb` to `budget-oc`. Take her CSS block the same way. Also replace the `bgtO` registry card's
state with **her** state, which differs in one key: her second Explore panel defaults to
`iB: "period"`, ours to `iB: "month"`.

Three things return with her code that our V2 had deleted, and that is correct now:

- her Detail chart/table toggle and its handler, plus the `bdetail` state it reads (3 references)
- the Glance sparkline
- her `trend-range` caption, replacing our `bgt-caption` variant

### Step 2: apply the one adopted difference — two edits, nothing else

Both of her render sites already receive the window's budget total, so no signature or upstream
change is needed.

**Edit 1 — the headline builder.** In `bgtOHeadlineInner`, compute the percent and return it, while
leaving her `html` string **byte-identical**. Her version returns an empty percent and no arrow; the
arrow must not come across (W01-GL-02). Concretely: add the percent calculation from the Step 3
Final, and return it wrapped in a `bgtO-hl-pct` span, keeping her signed-amount `html` exactly as it
is.

**Edit 2 — the two render sites.** Append the percent to the headline in:

1. `bgtOHeaderBlock` — serves **both** Explore and Detail, so this single edit satisfies W01-EX-01
   and W01-DE-01
2. `bgtOGlance` — satisfies W01-GL-01

That is the entire code change for W01: one function body, two render sites.

### CSS

No new CSS. Her CSS block already declares the percent class, left over from the August port she
adopted, even though her code never emits it — so after the namespace rename the class exists and is
correctly styled (quiet grey, 13px, 7px left margin). Do not reintroduce the arrow class in the
markup.

### Verification

- `w01-budget-mb.driver.js` currently asserts **our V2** behaviour (140 assertions covering the Time
  Window Module, the absence of `bdetail`, our caption). Once `bgtO` is her code plus the percent,
  most of those assertions become wrong. The driver has to be rewritten to assert *her* behaviour
  plus the percent. Treat this as required work in the same change, not a follow-up.
- After the rebase, assert the `(OC)` block is byte-identical to her block except the namespace
  rename and the two percent edits. That is the strongest guard that nothing of ours leaked in.
- The comparison tab should then show the Jo and OC columns differing **only** by the percent.
- Re-run all 15 drivers and the popover regression guard.

## W02 — implementation notes

### Step 1: rebase the `(OC)` widget onto her exact code

Replace the whole `penO` block with her live `penF` block from `a548419`, renaming only the
namespace: `penF` to `penO`, `PENF_` to `PENO_`, `pension-mb` to `pension-oc`. Take her CSS block and
her registry state the same way.

Lower risk than W01: the two blocks have **identical function structure**, the same 35 functions with
none added or removed on either side, so our V2's W02 changes are all inside function bodies. The
rebase therefore cannot orphan a call or leave a dangling reference.

### Step 2: apply the one adopted difference — a single edit

In `penOGlance`, the caption slot is currently an **empty string literal** sitting between the metric
row and the screen-reader sentence. Replace that empty literal with the caption element from our
version. Both the plan count and the district label are already computed at the top of her function
for her screen-reader sentence, so the edit reuses them and adds no new calculation.

That is the entire code change for W02: one empty string, in one function.

### CSS

No new CSS. The caption class is declared **once**, globally, outside both the `penF` and `penO`
blocks, so it is already available and correctly styled at 11px subtle grey. The namespace rename
does not touch it, because the class name carries no namespace letter.

### Leave alone

Her screen-reader sentence under the metric already states the plans, the appointee count and the
district. The new visible line partly duplicates it. Leave the sentence exactly as she wrote it: it
is hers, it is correct, and changing it is not in scope.

### Verification

- `w02-pension-mb.driver.js` currently asserts **our V2** behaviour (159 assertions). It must be
  rewritten to assert *her* behaviour plus the Glance caption.
- Assert the `(OC)` block is byte-identical to hers except the namespace rename and the single
  caption edit.
- The comparison tab should then show the Jo and OC columns differing **only** by that line, and only
  at Glance.

### Flag for the owner

The rebase discards our other V2 W02 changes, which are body-level rather than structural and are not
listed above because everything outside the Glance caption was ruled "same as Jo". If you want them
enumerated before the code change so nothing is dropped unknowingly, say so and I will list them.

### Implemented 2026-09-08 — what was actually done

Backup: `index.BACKUP-W01W02-oc-rebase-*.html`. Rebased `bgtO` onto her `bgtF` block from
`a548419` (14 CSS + 287 JS lines) and took her registry state, which restored her Detail
chart/table toggle, her Glance sparkline and her `trend-range` caption. Then the percent: the
calculation added to `bgtOHeadlineInner` and `hv.pct` appended at the two render sites, exactly as
planned. Her `html` string was left byte-identical, so the arrow did not come across.

No new CSS was needed, as predicted: her block already declared the percent class.

**One thing the plan missed.** The rebase restored her Detail toggle's *markup* but not its click
handler, because that handler lives in the shell's listener and our V2 had deleted it, so there was
no `bgtO` copy to restore. The toggle rendered but did nothing. Its twin has been added. The new
driver asserts it, so this cannot regress.

Verification: **`w01-budget-oc.driver.js`**, 38 assertions, replacing
`w01-budget-mb.driver.js` (kept as `.superseded.bak`). It pins the percent's maths against the
widget's own window totals, asserts the arrow is absent at all three sizes, asserts her sparkline and
caption survive, and checks every one of her `bgtF` functions still exists.

### Implemented 2026-09-08 — what was actually done

Rebased `penO` onto her `penF` block from `a548419` (20 CSS + 342 JS lines) and took her
registry state. Then the one edit: her empty caption slot now renders the context line, reusing the
plan count and district label she already computes. No new CSS, and her screen-reader sentence was
left exactly as she wrote it.

Verification: **`w02-pension-oc.driver.js`**, 25 assertions, replacing
`w02-pension-mb.driver.js` (kept as `.superseded.bak`). It checks the line uses the widget's live
plan count rather than a hardcoded number, that a chosen district is named instead of claiming
"all districts", that the line does not leak into Explore or Detail, and that her `penF`
functions all survive.

**Worth noting:** she uses the same caption class in her empty state for her own wording
("no active pension appointments"), so the driver asserts the *text*, not the class.

## W03 — implementation notes

The largest of the three so far, and the only one needing new CSS and a new markup wrapper.

### Step 1: rebase the `(OC)` widget onto her exact code

Replace the whole `prO` block with her live `prF` block from `a548419`, renaming only the namespace:
`prF` to `prO`, `PRF_` to `PRO_`, `payroll-mb` to `payroll-oc`. Take her CSS block and her registry
state the same way. Her state uses the single combined scope key; ours uses the two split keys, so
the registry card's state changes with the rebase and is then changed again by W03-EX-02.

Unlike W01 and W02, the two blocks differ **structurally**: hers has 33 functions, ours 43. The
rebase brings back eight of her functions our version had deleted, including her Glance composition
bar (which is exactly what W03-GL-01 asks for) and her single scope chip. It also drops nineteen of
ours. Four of those have to come back for the adopted rows, and they are listed below.

### Step 2: W03-GL-01 — Glance

Nothing to do. Her Glance arrives whole with the rebase, composition bar included. Do **not** port
our chip-and-total Glance back over it.

### Step 3: W03-AL-01 — export

Nothing to build. The shell's 3-dot menu already renders Export as CSV / Excel / PDF for any card
carrying an `actions` array, and her registry card carries one. The work is purely **not** bringing
our in-widget export button and its caption row back after the rebase. Leave the two functions that
build them behind, and leave the CSS rule that right-aligns that button behind with them.

### Step 4: W03-EX-02 — three filters

Re-add our two chip builders for Distribution and Pay type, and the two filter-state keys they read,
replacing her single combined scope chip in the header block. Her popover branches for the combined
chip go; ours for the two chips come back. The popover plumbing for these already exists in the
shell dispatchers from the earlier merge, so check what is already wired before adding branches.

### Step 5: W03-EX-01 and W03-DE-02 — employee list inside her modal

One implementation covering both sizes, because her modal is shared.

Keep her modal builder as the shell: her chips, total, pay-type table, donut, legend and Done button
all stay untouched. Re-add our employee functions — the employee lookup, the employee block builder,
its filtering and its row-key helper — and render the employee block into the **left column, beneath
her pay-type table's Total row**, which is the empty area boxed on the screenshot.

Requirements that are ours to honour, not hers:

- columns Employee and Total pay, both sortable, Total pay descending by default
- a chevron per row that expands that employee's pay breakdown in place
- a `Total, N employees` footer row with the summed pay
- the employee block sits in **its own scroll container**, so a long list scrolls inside the modal
  rather than growing it. Her modal has a fixed height and a Done button pinned at the bottom; that
  must not move

### Step 6: W03-DE-01 — Detail pie legend to the right

This is the only genuinely new work, and it has a trap.

The donut already emits the row-direction wrapper that puts the legend to its right, which is why
Explore looks correct. At Detail the chart is nested inside the split-layout column, and **one CSS
rule** in that layout overrides the direction to a column, dropping the legend underneath. Removing
that override is the whole fix.

**The trap:** that rule is written as a plain global selector, and the same selector is used by Jo's
**own original payroll widget**, which also renders a split Detail layout. Editing or deleting the
rule in place would change her widget's appearance. It is also declared twice, once in her CSS block
and once again in our clone's copy, so deleting one copy achieves nothing.

So the fix must be **namespaced to the `(OC)` widget only**, and there is currently no namespaced
wrapper to hang it on: the `(OC)` markup has no root class, and the two root-class mentions in the
file are both comments, not markup. Therefore:

1. add a namespaced root wrapper element around the `(OC)` widget's rendered content, and
2. write the override under it, restoring the row direction and undoing the full-width legend column
   that the same rule block forces

Then confirm Jo's original payroll widget and her adopted one both still stack the legend underneath
at Detail, unchanged. That check is the point of the whole exercise.

### Verification

- `w03-payroll-mb.driver.js` currently asserts **our V2** behaviour across 277 assertions, including
  a block that asserts her composition bar and her scope chip are *absent*. Those assertions invert
  under this plan. It needs a substantial rewrite, not a tweak.
- Assert her modal's own markup is unchanged by the employee insertion, and that the employee block
  is inside a scroll container.
- Assert the legend is row-direction for the `(OC)` widget at Detail **and** still column-direction
  for both of Jo's payroll widgets at Detail.
- Re-run all 15 drivers and the popover regression guard.

### Implemented 2026-09-08 — what was actually done

All six rows are in. Backup taken first as `index.BACKUP-W03-oc-rebase-20260908-172951.html`.

1. **Rebase.** The `prO` CSS and JS blocks were replaced with her `prF` blocks from `a548419`,
   renamed into the `prO` namespace. Her block was checked first for tokens that a naive rename
   would corrupt (things like her date formatter and the shell's focus id); there were none in the
   region, and only her namespaced classes carry the lowercase prefix. Function count went from our
   43 to her 32.
2. **Two wiring fixes the rebase exposed.** The shell's scoped-modal body only knew her kind, so an
   `(OC)` drill fell through to the deposits renderer; it now routes `payroll-oc` to `prOContent`.
   This is the **fourth** line of hers the branch extends, and the comparison driver's integrity
   allowlist was widened to name it. The registry card also had to take her state, since her code
   reads her keys.
3. **W03-GL-01** needed no work beyond not porting ours back: her composition bar returned with the
   rebase, as predicted.
4. **W03-AL-01** needed no work either. The shell's 3-dot menu already offers CSV / Excel / PDF from
   the card's actions array. Our in-widget export button and its caption row were simply left behind.
5. **W03-EX-02.** Her single scope chip became our Distribution and Pay type chips. Because her
   aggregation is a distribution-to-pay-type map, the pay-type filter was applied at the boundary:
   her row builders now sum only the selected pay types, so her sorting, donut and totals are
   untouched and everything still cross-foots. The pay-type list offers only pay types actually paid
   in the period. Verified: filtering to Overtime moved the total from $86,109 to $3,630, and
   choosing Pastoral Staff gave $24,593 with her own pay-type breakdown.
6. **W03-EX-01 / W03-DE-02.** Our employee table was grafted into her modal's left column, beneath
   her total, with its own scroll container capped so the dialog never grows and Done stays put. Her
   chrome, chips, table, donut and Done button are untouched. The footer cross-foots to the penny
   against the distribution total. Expanding a person shows only that person's pay types. The
   handlers resolve the widget through the modal's scoped clone, which is not in the registry, so
   expanding works inside the dialog.
7. **W03-DE-01.** Fixed by adding a namespaced marker class to the existing split element rather than
   a new wrapper, so no DOM nesting changed and the flex layout was not disturbed. The override is
   scoped under that marker, which only this widget emits, so Jo's own two payroll widgets keep
   their stacked legend. It reaches the drill modal as well, because the modal renders the same
   branch.

**Verification.** `w03-payroll-mb.driver.js` asserted our V2 and could not be salvaged; it is
retained as `w03-payroll-mb.driver.superseded.bak` and replaced by **`w03-payroll-oc.driver.js`**,
66 assertions, each traceable to a row ID above, including the cross-foot, the scoping of the legend
fix, and a check that all of her own `prF` functions still exist verbatim. Full suite: 15 drivers,
**7,167 assertions, 0 failures**. Confirmed in the browser at all three sizes and in the drill modal.
