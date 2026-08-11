# Widget Container Demo — collaborator setup (phase-2)

Active work happens on the **`phase-2`** branch. Your edits publish to the
**phase-2 preview**:
https://helloimjolopez-collab.github.io/design-sandbox/phase-2/Widget%20Container%20Demo/

`main` is frozen and serves the original demo at the root URL — **do not edit `main`.**

You edit the same way the owner does: tell Claude what you want, Claude edits
one local file, and a watcher auto-pushes your change to the phase-2 preview.
**No web UI, no manual git.**

## One-time setup (about 3 minutes)

1. **Accept both invites** — the public `design-sandbox` repo and the private
   standards repo (`widget-demo-context`). Read the private repo's `README.md` first.

2. **Configure git once**, if you never have:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "you@example.com"
   ```

3. **Clone and switch to the `phase-2` branch:**
   ```bash
   git clone https://github.com/helloimjolopez-collab/design-sandbox.git
   cd design-sandbox
   git checkout phase-2
   ```

4. **Install the watcher (once):**
   ```bash
   bash "Widget Container Demo/install-watcher.sh"
   ```
   The watcher is branch-aware — because you're on `phase-2`, it publishes to the
   phase-2 preview (never to `main`).

That's it. From now on:

- Tell Claude what to change in `Widget Container Demo/index.html`.
- On save, the watcher commits, pulls in anyone else's phase-2 changes, and pushes to `phase-2`.
- A GitHub Action redeploys the phase-2 preview automatically (~1 min).

## Good habit: avoid collisions

You and the owner edit the **same** `index.html` on `phase-2`. Before a big
editing session, pull first:
```bash
git -C /path/to/design-sandbox pull --rebase
```

If two people edit the exact same region at once, git can't auto-merge. The
watcher logs a conflict to `/tmp/widget-container-deploy.log` and does NOT push —
your change stays committed locally until you run `git pull --rebase` and resolve
it. In practice, coordinate who's editing when.
