# PR handoff: OisinBranch -> phase-2

## Why one branch, not two

`OisinBranch` is an ANCESTOR of your current `oisin-v2-rebuild` work: 0 commits
on it that you don't already have, 355 the other way. So it fast-forwards
cleanly, needs no `--force`, and loses nothing.

That means `OisinBranch` can be both the backup AND the PR source. One push
does both jobs. A second remote branch would only be extra bookkeeping.

There's also a reason to use that exact NAME locally. `deploy.sh` runs
`git pull --rebase origin $(current branch name)` before it pushes. While
you're on `oisin-v2-rebuild` (which doesn't exist on origin) that pull fails,
the script aborts and exits before the push. It has been auto-committing
locally and never publishing. Rename the local branch to `OisinBranch` and the
watcher's full commit -> pull -> push flow works, so your edits back themselves
up and the PR refreshes itself.

## 1. Rename the local branch and push (in the repo root)

```
cd /d "C:\Users\ocurran\Desktop\For Dashboard\Jo\repo\design-sandbox"
git branch -d OisinBranch
git branch -m oisin-v2-rebuild OisinBranch
git push -u origin OisinBranch
```

(`cd /d` is Command Prompt. In PowerShell, drop the `/d`.)

Line by line: the old local `OisinBranch` pointer is deleted first because the
name is taken. `-d` (lower case, safe) will only succeed if it's fully merged
into your current work, which it is, so if that command errors STOP and tell me
rather than reaching for `-D`. Then your working branch takes over the name,
and the push fast-forwards origin to it.

### If you'd rather keep the names separate

Leave the local branch alone and push it onto `OisinBranch` explicitly:

```
git push origin oisin-v2-rebuild:OisinBranch
```

Also a fast-forward. Trade-off: the watcher still won't be able to push, so
every backup and every PR update is a manual re-run of that command. You get
tighter control over what Jo sees, at the cost of doing it yourself.

## 2. Create the PR from the command line

Needs the GitHub CLI. Check it's there and authenticated:

```
gh --version
gh auth status
```

If `gh` is missing: `winget install --id GitHub.cli -e`, open a NEW terminal,
then `gh auth login` (choose GitHub.com -> HTTPS -> login with a web browser).

Then, still in the repo root, one command:

```
gh pr create --base phase-2 --head OisinBranch --draft --title "(OC) widget versions rebuilt on Jo's code, side by side for comparison" --body-file "_PR-body.md"
```

It prints the PR URL. To open it in the browser:

```
gh pr view --web
```

Why each flag:

- `--base phase-2` - NOT main. Main is 56 commits behind; a PR into it would
  show a nonsense diff.
- `--head OisinBranch` - explicit, so it works even if you've switched branches
  since.
- `--draft` - nobody can merge it while you're still editing this weekend.
- `--body-file "_PR-body.md"` - the description lives in that file next to this
  one. Avoids fighting Windows quoting rules with a multi-line body. Edit that
  file and re-run if you want different wording before creating it.

### Later, as you keep working

Once the local branch is named `OisinBranch` with an upstream set, the watcher
commits, pulls and pushes on every save, so the backup and the PR both keep
themselves current. Useful follow-ups:

```
gh pr view              # state, and Jo's comments
gh pr diff --name-only  # what the PR currently touches
gh pr ready             # take it out of draft when you're done editing
```

### If you'd rather not install gh

Push the branch, then open this URL and tick "Create draft pull request",
pasting the title and the contents of `_PR-body.md`:

https://github.com/helloimjolopez-collab/design-sandbox/compare/phase-2...OisinBranch?expand=1

---

## Notes

- Untracked scratch left out of the branch on purpose: `.sed-test`,
  `.write-test`, `Widget Container Demo/_write-test.txt`,
  `Widget Container Demo/_port-drivers/`. The last one holds the verification
  drivers and PORT-MANIFEST ledger - say the word if you want the manifest
  committed so Jo can read it.
- No live preview URL: her Pages workflow only builds `main` (root) and
  `phase-2` (`/phase-2`), so a feature branch gets no hosted page. That's why
  the PR description tells her to check out the branch. If she'd rather click a
  link, the fix is adding an `/oisin` subpath to `.github/workflows/pages.yml`,
  but she has to merge that workflow change before any preview exists.
- Delete this file and `_PR-body.md` whenever; both are untracked and won't
  reach the PR.
