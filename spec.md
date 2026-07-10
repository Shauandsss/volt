VOLT — Landing Page Spec v3

Supersedes v2 (volt-site-redesign-spec.md). The v2 build on Astro is the base —
this is a revision pass, not a rebuild. Site copy stays in English.

Changelog from v2 (what to touch)


Section 02 (Tally) is replaced entirely — scroll-scrubbed mechanical odometer. The
time-based counter is dead. Never bring back a counter the visitor waits for.
Night palette corrected — current build is loud mustard; night must be dimmer than day.
Hero recomposed — manual line breaks, two-axis type sizing, blinking period.
Chaos cards redesigned — real card anatomy, contained in 04, no leaking into 03.
Ghost widget removed — the fixed tray peeking at bottom-center of every viewport dies.
Receipt gains physicality; CTA button becomes solid.
New page-wide behaviors (§3): tab-title trap, cursor light, doomscroll refusal,
page sleep, crown navigation, live batch, session receipt, hold-to-see ritual.
Debug override: ?theme=day / ?theme=night forces mode regardless of clock.
Grain: pre-baked PNG tile ONLY. feTurbulence / mix-blend-mode grain crashed
Chrome GPU in earlier builds — permanently banned.



0. Concept

The site does not describe the product. It behaves like the product — and it uses
the visitor's own behavior as material, kindly.

Mystery is high contrast, rationed: one crisp edge, one rare color, one moment of chaos.

Rules that govern everything:


Two voices. Serif = human manifesto. Mono = the watch firmware speaking
(all-lowercase). No third voice.
Amber is what the watch allows. Monochrome bone-on-black. Amber appears in ONE
day-mode moment (the receipt) and takes over at night. Never for links or hovers.
One verb per element. Sweep, ignite, print, cut, stamp, tick. Fade-in is banned
except where a section explicitly allows it.
Scrub, not timer. Every animation the visitor might wait on must be driven by
their scroll or action. If they rush, it completes instantly. Nothing gates scroll.
Restraint budget. Each personality moment fires ONCE per visit. Never two
personality stamps within 30s of each other (see §3 priority order). A page with
ten gimmicks firing at once is a slot machine — the thing we're against.



1. Design tokens

Color — day

TokenValueUse--bg#0C0E0Bpage background--ink#E8E4DAprimary text (bone)--ink-dimink @ 45%secondary--ink-ghostink @ 22%museum labels, markers--amber#FFB000receipt section ONLY

Color — night (21:00–07:00 local) — CORRECTED

Night is darker and quieter than day, not brighter. The current mustard build is wrong.

TokenValueNote--bg#0A0908deepens--ink#C9B99Awarm bone — LOW chroma, ~70% luminance of day ink. NOT amber.--ink-dim / --ink-ghostsame ink @ 40% / 18%--amber#B87E0Adimmed amber, reserved for: night stamp, firmware verdicts, receipt

Poster headlines NEVER carry full amber in either mode. Headline = ink. Amber is an
accent voice, not a display color. Images dim a further 20% at night and get a warm
duotone pass (§5).

Typography


Display serif (EB Garamond, current): poster scale min(8.5vw, 15vh) — two-axis clamp
so composed headlines always fit the viewport height. Leading 0.95. Italic ONLY on
venom words (2–4 per headline) and the "Or not." moment.
IBM Plex Mono: labels 0.7rem / ghost, firmware 0.85rem lowercase, markers UPPERCASE.
Manual line breaks on every poster headline. No auto-wrap at display size, ever.
Breaks are content, decided in the markup:

Hero: They put a slot machine / on your wrist. / You called it an upgrade.
Refusal: Something is coming / that refuses to behave.
Conviction: We left nothing / for you to configure.



Scale contrast rule stands: each viewport has something ≥ 6vw and nothing 2–6vw.


Texture


Grain: one pre-baked PNG tile (~128px, 3–4% opacity, background-repeat), layered
over everything including images. No SVG filters, no blend modes.
Section markers 01 — THE TALLY … top-left, mono ghost, must never collide with
content (min 12vh clearance below marker before first text block).



2. Page structure

00 Boot stamp   01 Hero   02 The Tally (NEW)   03 The Cost   04 The Noise
05 The Refusal  06 The Conviction  07 The Bench (+ hold ritual)
08 The Receipt  09 The List (+ session receipt)  10 The Batch + The Pulse

00 — Boot stamp (unchanged from v2)

First visit only, ≤ 0.8s, mono types on: unit #001 — drawn by hand before it was ever a file, one tick, hard cut to hero.

01 — Hero (recomposed)


Three composed lines (above), full statement inside the first viewport at any ratio.
The period after upgrade. blinks at 1Hz — same pulse as the footer dot. The page
opens and closes on the same heartbeat.
Slot reel window: keep the concept, fix the render — 1-bit dithered glyphs, phosphor
green-on-dark like the watch LCD, thin bone border at 25%. Anchor it to the grid
(top-right third), not floating. It is the only non-type light source.
Delete the fixed bottom-center tray/dock. Whatever it is, it reads as debug debris
on every screen.
Sub-line in roman (not italic): "Every buzz is a bet placed on your attention.
The house always wins."


02 — The Tally — REPLACED: the machine you crank

Pinned section, ~150vh of scroll scrub. The visitor's scroll IS the time of day.


Odometer drums: two mechanical drums (serif digits on rolling cylinders, like a
watch date window — visible digit above/below at 15% opacity, hairline frame, subtle
cylinder shading). Scroll rolls 0 → 96. Driven ONLY by scroll position.
Day strip: below the drums, 96 thin ticks spanning 07:00 — 23:00 (mono end labels).
Each increment lights one tick (quick flicker, then held dim-lit).
Header serif: You checked your wrist — drums — times. Clock readout top-right
(mono) advances 07:00→23:00 with the scrub.
The lock: at 96 / 23:00 — drums clunk (4px vertical snap, 100ms), strip
extinguishes to 18% EXCEPT three ticks that rise and turn amber (day: the one amber
exception outside the receipt is NOT granted — use bright ink day / amber night...
correction: these three ticks ARE part of the receipt family; amber is allowed here
in both modes at the dimmed night value #B87E0A), with micro-labels:
09:12 — her call · 14:30 — the reminder · 21:00 — day, closed
Verdict prints on lock, mono: 96 glances. 3 mattered. volt shows you those.
Then serif, quiet: "How many were worth it?"
Scroll past fast → state completes instantly at section exit. Reversing scroll
rewinds the day (drums roll back — this is delightful, keep it live).
Reduced motion: static composition at end-state with all copy.


03 — The Cost (composition fixes)

Content unchanged (four regrets, replace-dim behavior, glowing 11:47 PM,
teaser-screen macro + caption). Fixes: marker clearance; each regret is ONE composed
line (break manually if needed, no widows like "two."); section fully contains its
elements — nothing from 04 may render here.

04 — The Noise (rebuilt cards)


Cards get real anatomy: rounded-rect 8px, dark surface #15140F, 1px border ink@8%,
16px icon glyph, bold-ish title line + body line in a neutral UI sans (the ONLY place
a third font appears — it plays "everyone else's design"), slight shadow. They must
look like the notifications everyone knows.
Buildup ≤ 1.2s scroll-triggered once: cards stack, overlap, brightness rises to
near-white, grain intensifies. HARD CUT to black. 700ms nothing. Serif italic poster:
Or not. Then mono: this page will not do that again. neither does volt.
Cards are absolutely contained: overflow hidden, zero bleed into 03/05.
Night: no buildup. Cards lie inert at 25%, tidy, slightly scattered but not
overlapping text-on-text. Stamp: not tonight.
Reduced motion: static collage at 30% + same copy.


05 — The Refusal (composition fixes)

Content unchanged (button macro, Nevers ledger with ✕ stamps, allowlist paragraph).
Fixes: headline enters in the upper third of the pinned viewport, not at the fold;
two composed lines; image-left bleed kept, button highlight aligned to ledger.

06 — The Conviction (minor)

Unchanged copy, image-free rest beat, ≥140vh. The three mono statements distribute
asymmetrically. no settings screen to get lost in. returns here (it was displaced
by the Bench headline).

07 — The Bench + the hold ritual


Overhead flat-lay asset per v2 §5 (sketches, calipers, loose machined button, spring,
strap, chalk outline where the watch should be). Until the photo exists, the section
ships HIDDEN — no placeholder rectangles, no visible seams. Container black must
match --bg.
Cursor is a pool of light (page-wide behavior §3, but it lives strongest here):
within this section and 05, a soft warm radial reveal (~180px) follows the cursor;
outside it, image and labels sit at 30%. Touch devices: slow automatic light drift.
Museum labels near objects: button, third attempt. · the spring that says no. ·
not a render.
Hold to see it: the chalk outline is interactive. Label: hold to see it.
Press-and-hold 3 full seconds — a thin ring engraves around the outline as progress
(ratchet feel: 12 discrete steps, not smooth). At 100%: 0.4s glimpse of a NEW
fragment (not the full watch — e.g. the strap lug or case back edge), then black:
unit #001 exists. that's all you get.
Release early → ring un-engraves with a slip. Fires max once per visit; after that
the label reads you've seen enough.


08 — The Receipt (physicality pass)

Content unchanged (WEEK 27 lines). Upgrades:


Bigger: receipt occupies ~55vh height, rotated 0.6°, paper texture tile (subtle),
real perforated edges (triangle teeth, not dashed borders), thermal fade on the
two oldest lines (ink at 55%).
Print-on-scrub: lines print as the section scrolls in (scrub, not timer), with
1px feed jitter.
Day mode: this is the ONLY amber on the page. Night: receipt stays at the same
dimmed amber as the rest of the firmware voice — its specialness at night comes
from paper texture + rotation (the only non-flat object).


09 — The List (CTA) + your session receipt


Input on receipt paper (bone ink), typing appears in mono.
CUT THE LEASH: solid machined block. Bone fill, --bg text, hard 90° corners,
no radius, no outline style. Press: translate 2px down, zero easing, instant return.
Submit → the receipt line tears (jagged clip, strip slides off) → confirmation
prints: unit #418 in line. you'll see it before anyone. (server-side count if
available, else omit the number, never fake it).
Then the session receipt prints below (also on exit-intent if the visitor never
reached the CTA — once per visit, whichever comes first):


  VOLT · YOUR VISIT
  ─────────────────────────
  time here            3m12s
  scrolls                 41
  tab escapes              1
  interruptions from us    0
  ─────────────────────────
  felt good, didn't it?

All values computed client-side, session-only, nothing stored or sent — the footer
privacy claim must remain literally true. Button beside it: keep it — downloads
a PNG render of the receipt (client-side canvas).

10 — The Batch + The Pulse


The live batch lands here, before the footer. During the visit the page held its
own would-be nags (see §3.6). A tidy stack of 3–7 cards drops in at once — the same
card anatomy as 04, but calm, aligned, delivered:
while you read, we held 7 interruptions. here they are, together, where they belong.
One beat later they desaturate and crumble to grain. If the counter never passed 0
(short visit), the section renders a single line instead: nothing worth holding.
Footer: black, 2px bone dot pulsing 1Hz (same beat as the hero period), VOLT · built to last, and the two ghost claims:
no cookie banner. we don't track you.
this page weighs less than your attention.



3. Page-wide behaviors

3.1 Tab-title trap (once per visit)

Visitor leaves the tab → after 2s, title becomes (1) VOLT — new notification (favicon
gains a dot if cheap). On return → title restores and a mono stamp slides in under the
top edge for 6s: you came back for a notification that doesn't exist. that's the reflex.
Night mode: the stamp still fires (it's quiet), title trick identical.

3.2 Cursor pool of light

Active in 05 and 07 only (not page-wide — rationed). ~180px warm radial reveal,
imagery/labels at 30% outside it. Desktop only; touch gets a slow autonomous drift.

3.3 Doomscroll refusal (once per visit)

If scroll velocity stays above a frantic threshold for >1.5s, a ghost mono line fixes
mid-viewport for 4s: no rush. nothing here refreshes. Never during the Tally pin
(scrubbing fast there is legitimate — it's the point).

3.4 Page sleep — wake on move (repeatable)

60s with zero input → everything dims to 8% over 2s, one mono line at center:
resting. move to wake. Any input wakes it in 300ms. The pulse dot keeps beating
while asleep. (This is the watch's wake-on-move, ported. If the visitor left the tab,
the tab trap takes priority and sleep resets.)

3.5 Crown navigation

A small knurled circle (18px, bone at 30%) fixed at the right edge, vertically centered.
Drag up/down spins it and travels the page with ratchet detents — one detent per
section, current marker shown beside it in mono while dragging (04 — the noise).
Native scroll unaffected. Keyboard: arrow keys already do this via detents. Hide on touch.

3.6 The held-interruptions counter

The page generates its own suppressed nags at organic moments (once per section
milestone, max 7): entering 03 (○ 20% off — today only), finishing 04
(○ don't miss our newsletter), etc. Each suppression bumps a discreet mono counter
fixed bottom-left: held: 3. No animation on the counter beyond the number swap.
Payoff is §2.10. Counter hidden until first hold.

Priority order (conflict resolution)

Only one personality voice may speak at a time. Priority when eligible simultaneously:
tab trap > hold-ritual payoff > doomscroll refusal > sleep > held-counter bump.
Global rule: ≥30s between any two personality stamps; each fires once per visit
except sleep (repeatable).


4. Night mode (21:00–07:00)


Corrected palette (§1). Whole page quieter than day — that is the proof of concept.
Arrival stamp with live local time: it's 10:14 pm. this page won't glow in your bedroom.
Chaos buildup disabled (not tonight.), reel window dims to 40%, no edge flashes
anywhere, hold-ritual glimpse renders 30% dimmer.
Meta theme-color follows.
No toggle. ?theme=day|night is the only override — for dev/QA and screenshots.


5. Images


Regrade all macros: crush mud, ONE hard specular blade per image, blacks matched to
--bg (verify: no visible rectangles against flood-filled bg).
Night: warm duotone pass (shadows to #0A0908, highlights toward #C9B99A) so photos
stop fighting the palette. Day keeps the current cool steel — the cold light IS the
villain glow story in 03; do not warm the day images.
Bench flat-lay per v2 spec §5. Section hidden until asset ships.


6. Performance & conduct


Weight < 1.2MB total incl. fonts/images/grain tile. Lighthouse ≥ 95/95.
No third-party scripts, no cookies, no storage beyond: boot-stamp flag, fired-once
flags (sessionStorage). Session receipt data never leaves the page.
prefers-reduced-motion: every scrub renders end-state compositions; drums show 96
static; no pulse blink (steady dot); no sleep dim (would disorient).
All pinned sections release cleanly on mobile Safari (test rubber-banding).
404: black, serif Nothing here., mono feels good, doesn't it?


7. Guardrails — do NOT


No nav bar, feature grids, testimonials, FAQ, social icons, chat widgets.
Never show the full watch — including the hold-ritual glimpse and OG image.
No amber outside receipt/firmware accents (day) — headlines never amber, ever.
No time-based counters or forced waits. If the visitor can outrun it, it must finish.
No crossfade on the chaos cut. No sound anywhere (ticks are visual).
No feTurbulence / mix-blend-mode grain (GPU crash). PNG tile only.
Personality moments respect the budget (§3 priority). When in doubt, fire nothing.


8. Acceptance checklist


 Hero: 3 composed lines fit first viewport at 16:9, 16:10, ultrawide, 1366×768;
period blinks 1Hz; sub-line roman; ghost tray gone.
 Tally: drums scrub with scroll both directions; lock clunk at 96; 3 amber ticks
+ labels; verdict on lock; instant-complete on fast exit; rewind works.
 Night palette: page measurably dimmer than day (spot-check ink luminance);
headlines never full amber; ?theme=day|night overrides clock.
 Chaos: real card anatomy; zero bleed into 03; night = inert + not tonight.
 Receipt: perforated teeth, rotation, thermal fade, print-on-scrub.
 CTA: solid bone button, 2px hard press; tear on submit; real or no queue number.
 Session receipt: correct live values; PNG download; fires once (CTA or exit).
 Batch: held counter increments; delivery stack before footer; crumble; short-visit
fallback line.
 Tab trap once; stamp 6s; title restores.
 Sleep at 60s idle; wake 300ms; pulse keeps beating.
 Crown: detents per section, mono label while dragging, hidden on touch.
 Hold ritual: 12-step engrave, 0.4s glimpse (never full watch), once per visit.
 Priority order enforced; ≥30s between personality stamps.
 Grain PNG tile everywhere; no GPU crash on Chrome; weight < 1.2MB; LH ≥ 95/95.