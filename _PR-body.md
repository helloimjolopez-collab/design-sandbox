Additive branch off `phase-2`. Nothing of Jo's is edited, replaced or deleted - her widgets stay verbatim and mine sit alongside them as `(OC)` clones under their own prefixes and their own `kind`. Draft on purpose: I'm still editing.

### How to look at it

Don't read the `index.html` diff, it's ~10k lines and won't tell you anything. Instead:

    git fetch origin
    git checkout OisinBranch

then open `Widget Container Demo/index.html` and go to the **Comparison tab** - Jo vs OC per widget, side by side, which is what this branch is for.

Written-up reasoning for every difference is in `Widget Container Demo/Design Differences (Jo vs Oisin)/` (Markdown + Confluence-pasteable HTML), and per-widget/per-size detail is in the Build Sheet.

### One thing that is NOT additive - please look at this

`6a768fc` fixes `triggerSelector` branch ordering. Every popover in the app was dead, including in your widgets. It's a real bug fix on shared code, not a design change, so it's worth cherry-picking regardless of what you make of the rest of this branch.

### What's on the branch

| Commit | |
|---|---|
| `097ba29` | Side-by-side resolution: Jo's widgets restored verbatim, V2 added as `(OC)` clones |
| `6a768fc` | Fix `triggerSelector` branch order (see above) |
| `0b59673` | Comparison tab: Jo column now shows her CURRENT LIVE widget, not the retired v1 |
| `f303ef9` | W03 Payroll: `(OC)` widget rebuilt on Jo's exact code + 3 approved changes |
| `d3b5028` | W01 + W02: both `(OC)` widgets rebuilt on Jo's exact code + 1 approved change each |
| `8d3c4db` | W03 drill modal: employee breakdown becomes a full-width bordered panel |
| `9365ba2` | W03 drill modal: subheading renamed "Employee Break Down" |

Files: `Widget Container Demo/index.html`, the two Jo-vs-Oisin difference docs, the Build Sheet, and `.gitignore` (backup-file patterns only).

### Not merging this as-is

This is for comparison and comment. Once you've picked what you want, we decide per widget what actually lands on `phase-2`.
