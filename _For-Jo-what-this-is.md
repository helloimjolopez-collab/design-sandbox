# My widget versions, side by side with yours

Hi Jo,

Short version: I've built my own versions of the widgets inside a copy of your
demo, sitting right next to yours, so you can look at them together and tell me
what you think. Nothing of yours has been changed.

## What I have and have not touched

**Not touched:** your widgets. They are exactly as you left them, same code,
same look, same behaviour. I did not edit, replace or delete any of them.

**Added:** my versions, alongside yours. Mine are labelled **(OC)** so you can
always tell whose is whose at a glance.

There is one exception, and I want to be upfront about it. I found a bug in the
shared code that meant the little pop-up panels were not opening anywhere in the
app, including on your widgets. I fixed that. It is a genuine fix rather than a
design opinion, so it is worth keeping whatever you decide about the rest.

## Where to look

Open the demo and go to the **Comparison tab**. That page puts your version and
my version of each widget next to each other, one row per widget. That tab is
the whole point of this, so please start there rather than anywhere else.

If you want the reasoning rather than the pictures, there is a written document
listing every difference widget by widget, and why each one is the way it is.
It is in the folder **Design Differences (Jo vs Oisin)**. There is a version
formatted to paste straight into Confluence if that is useful.

## How to open it

The work is on a branch called **OisinBranch**. In GitHub Desktop:

1. Click **Fetch origin** at the top.
2. Click the **Current branch** dropdown and pick **OisinBranch**.
3. Open `Widget Container Demo/index.html` in your browser.
4. Go to the Comparison tab.

When you want to get back to your own work, use the same dropdown and switch
back to **phase-2**. Your work is untouched and waiting there.

## Nothing is being merged into your work

I have opened this as a **draft** pull request, which is GitHub's way of saying
"please look, do not merge". It cannot be merged by accident while it is in that
state.

To be clear about what I am and am not asking for: I am not proposing that all
of this replaces your version. I want your eyes on it. Once you have been
through the Comparison tab we can go widget by widget and agree what, if
anything, actually moves across into your `phase-2`. That decision is yours to
be part of, not something I am doing quietly in the background.

## Timing

I am still editing this over the next few days, so expect it to keep changing.
I will let you know when it is settled and worth a proper look. Comments on the
pull request are the easiest place to leave feedback, but a message works just
as well if that is quicker for you.

Thanks,
Oisin
