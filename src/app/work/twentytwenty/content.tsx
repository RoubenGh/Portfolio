"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  BackButton,
  MountReveal,
  ProjectMeta,
  TableOfContents,
  SectionHeading,
  SectionBody,
  VisualFrame,
  StatBlock,
  PrincipleCards,
  ConstraintList,
  NextProject,
  PipelineFlow,
} from "@/components/CaseStudy";

const tocSections = [
  { id: "overview", label: "Overview" },
  { id: "why", label: "Why It Matters" },
  { id: "problem", label: "The Problem" },
  { id: "screen-time", label: "Real Screen Time" },
  { id: "break", label: "The Break" },
  { id: "platforms", label: "Three Platforms" },
  { id: "proving", label: "Proving It Works" },
  { id: "caught", label: "What It Caught" },
  { id: "unverified", label: "Not Verified" },
  { id: "retrospective", label: "Retrospective" },
];

export default function TwentyTwentyContent() {
  return (
    <>
      <Nav />
      <main className="pt-28 md:pt-32">
        <div className="mx-auto max-w-[960px] px-5 md:px-10">
          <div className="mb-10"><BackButton /></div>

          <MountReveal y={30}>
            <h1 className="text-[36px] md:text-[52px] font-medium tracking-[-1.5px] leading-[1.05] text-[var(--text-primary)]">
              TwentyTwenty
            </h1>
            <p className="mt-3 text-[16px] md:text-[18px] leading-[1.5] text-[var(--text-body)] max-w-[600px]">
              A cross-platform desktop app that enforces the 20-20-20 eye strain rule by measuring genuine screen time, not by running a timer.
            </p>
          </MountReveal>

          {/* Hero: the break overlay */}
          <MountReveal y={40} delay={0.2} className="mt-10 md:mt-12 block">
            <div
              className="relative rounded-[16px] overflow-hidden"
              style={{
                boxShadow: "0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(242,242,242,0.04)",
                border: "1px solid rgba(242,242,242,0.05)",
              }}
            >
              <img
                src="/images/twentytwenty/overlay.png"
                alt="The TwentyTwenty break overlay dimming a code editor, with a countdown ring and the instruction to look 20 feet away"
                className="w-full h-auto block"
              />
              <div
                className="absolute inset-0 pointer-events-none rounded-[16px]"
                style={{ boxShadow: "inset 0 0 60px rgba(0,0,0,0.5)" }}
              />
            </div>
          </MountReveal>

          <div className="mt-8">
            <ProjectMeta items={[
              { label: "Role", value: "Sole Engineer" },
              { label: "Timeline", value: "2026" },
              { label: "Stack", value: "Rust, Tauri v2, TypeScript, GitHub Actions" },
              { label: "Type", value: "Open Source Desktop App" },
            ]} />
          </div>

          {/* Download call to action */}
          <MountReveal
            y={20}
            delay={0.35}
            className="mt-8 rounded-[14px] p-5 md:p-6 block"
            style={{
              background: "linear-gradient(190deg, rgba(110,231,183,0.055), rgba(242,242,242,0.012))",
              border: "1px solid rgba(110,231,183,0.14)",
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div>
                <span className="block text-[15px] md:text-[16px] font-medium text-[var(--text-primary)] leading-[1.4]">
                  Free and open source. Install it in about a minute.
                </span>
                <span className="block mt-1.5 text-[13px] leading-[1.6] text-[var(--text-body)]">
                  Linux (.deb, .rpm, .AppImage) &nbsp;·&nbsp; Windows (.msi, .exe) &nbsp;·&nbsp; macOS (universal .dmg)
                </span>
              </div>

              <div className="flex items-center gap-3 flex-none">
                <a
                  href="https://github.com/RoubenGh/twentytwenty/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[10px] px-5 py-2.5 text-[13.5px] font-medium tracking-[0.2px] transition-all duration-300 hover:brightness-110"
                  style={{
                    background: "rgba(110,231,183,0.92)",
                    color: "#0a0c10",
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M12 4v12m0 0l-5-5m5 5l5-5M4 20h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Download</span>
                </a>

                <a
                  href="https://github.com/RoubenGh/twentytwenty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[10px] px-4 py-2.5 text-[13.5px] font-medium tracking-[0.2px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300"
                  style={{
                    background: "rgba(242,242,242,0.05)",
                    border: "1px solid rgba(242,242,242,0.08)",
                  }}
                >
                  <span>Source</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H10M17 7v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>

            <p className="mt-4 pt-4 text-[12px] leading-[1.6] text-[var(--text-body)]" style={{ borderTop: "1px solid rgba(242,242,242,0.05)" }}>
              Builds are unsigned, because code signing certificates cost money this project does not spend. Windows will show a SmartScreen prompt (More info, then Run anyway) and macOS needs one command to clear the quarantine flag. The README covers both.
            </p>
          </MountReveal>

          <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-[160px_1fr] gap-12 lg:gap-16">
            <TableOfContents sections={tocSections} />

            <div>
              {/* 01 OVERVIEW */}
              <section id="overview" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="01"
                  title="Overview"
                  subtitle="A tray app that interrupts you every 20 minutes of actual screen use, and knows the difference between you being at your desk and you being gone."
                />
                <SectionBody>
                  <p>
                    Every 20 minutes, look at something 20 feet away for 20 seconds. That is the whole rule, and almost every app that implements it gets it wrong in the same way: it sets a repeating 20 minute alarm and calls it done. That app will interrupt you during lunch, during a meeting, and thirty seconds after you sat back down from a long break.
                  </p>
                  <p>
                    TwentyTwenty measures screen time instead of wall clock time. It reads how long it has been since you touched the keyboard, and whether anything is holding your display awake, which is what every video player does while it plays. Those two signals together tell it whether you are actually looking at a screen. Walk away and the counter stops. Watch a film without touching anything and it keeps counting, because your eyes are still working.
                  </p>
                </SectionBody>

                <StatBlock items={[
                  { value: "3", label: "Platforms from one codebase" },
                  { value: "35", label: "Tests, green on all three" },
                  { value: "9", label: "Defects caught before release" },
                  { value: "$0", label: "Total cost to build and run" },
                ]} />
              </section>

              {/* 02 WHY IT MATTERS */}
              <section id="why" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="02"
                  title="Why It Matters"
                  subtitle="Digital eye strain is not a myth and it is not vanity. It is a mechanical problem with a mechanical fix."
                />
                <SectionBody>
                  <p>
                    Focusing on something close requires active muscular work. A ring of muscle inside your eye contracts to thicken the lens and hold near focus, and it stays contracted for as long as you keep looking at your screen. Hold any muscle in one position for hours and it fatigues. That is the ache behind your eyes at the end of a working day, and it is why the discomfort eases within minutes of looking out a window.
                  </p>
                  <p>
                    The second half is blinking. People blink markedly less while concentrating on a screen than during ordinary conversation, and incomplete blinks become more common. Blinking is what resurfaces the tear film that keeps the front of your eye optically clear, so blinking less leaves it patchy. That is the grittiness, the burning, and the blur that clears for a second when you finally blink hard.
                  </p>
                  <p>
                    Twenty feet is not arbitrary. Beyond roughly that distance the light reaching your eye is close enough to parallel that the lens can relax to near its resting state. Closer targets still demand work. Twenty seconds is roughly how long the muscle needs to actually let go rather than briefly loosen, and looking away without waiting is most of why people feel the rule does nothing for them.
                  </p>
                  <p>
                    None of this causes permanent damage, which is exactly why it goes unaddressed. It just quietly makes every afternoon worse. The fix costs twenty seconds and the only hard part is remembering, which is a job for software.
                  </p>
                </SectionBody>
              </section>

              {/* 03 THE PROBLEM */}
              <section id="problem" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="03"
                  title="The Problem With Timers"
                  subtitle="A repeating alarm is not a reminder, it is an interruption that happens to be periodic."
                />
                <SectionBody>
                  <p>
                    The requirement that shaped this project was stated plainly at the start: it should not be a masked simple 20 minute reminder. That constraint rules out the easy implementation and forces a real question. What counts as screen time?
                  </p>
                  <p>
                    A plain timer has no idea whether you are there. It fires while you are in the kitchen, and its counter is already half spent when you return, so it fires again almost immediately. Users learn within a day that the prompt carries no information, and they start dismissing it reflexively. An eye strain reminder that gets reflexively dismissed is worse than none, because it consumes attention and returns nothing.
                  </p>
                </SectionBody>

                <PrincipleCards items={[
                  {
                    number: "01",
                    title: "Count real use",
                    description: "Screen time accrues only while you are actually at the machine. Step away and the counter holds.",
                  },
                  {
                    number: "02",
                    title: "Credit real breaks",
                    description: "An absence of two minutes or more counts as a break and clears the counter. Coming back from lunch does not earn you an immediate interruption.",
                  },
                  {
                    number: "03",
                    title: "Never ambush",
                    description: "The overlay refuses to appear while you are presenting or screen sharing, and defers until it is safe.",
                  },
                ]} />
              </section>

              {/* 04 REAL SCREEN TIME */}
              <section id="screen-time" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="04"
                  title="Measuring Real Screen Time"
                  subtitle="Two signals, one rule, and the one insight the whole product rests on."
                />
                <SectionBody>
                  <p>
                    Every operating system will tell you how long it has been since the user last touched an input device. That single number gets you most of the way, and it is what a naive implementation would stop at. It has one serious hole: watching a video means sitting perfectly still. Pure idle detection concludes you left the room, stops counting, and the feature fails precisely when your eyes are working hardest.
                  </p>
                  <p>
                    The fix came from asking what a video player does that a screensaver would otherwise interrupt. It asks the operating system to keep the display awake. That request is readable, on every platform, without special permission. So the rule becomes: you are at the screen if you gave input recently, or if something is holding your display awake.
                  </p>
                </SectionBody>

                <PipelineFlow stages={[
                  { label: "Idle time", sub: "Seconds since last input" },
                  { label: "Display held awake", sub: "Something is playing" },
                  { label: "Session locked", sub: "Never counts" },
                  { label: "Active?", sub: "One boolean" },
                  { label: "Bank a second", sub: "Or credit a break" },
                ]} />

                <SectionBody>
                  <p>
                    This was verified before any of it was built. A probe ran for two minutes while a video played and the keyboard went untouched. The idle counter climbed past 89 seconds without a break while an inhibition from the browser stayed visible the entire time. A plain idle check would have declared the user gone after 60 seconds. The measurement proved the product was possible, and it took twenty minutes.
                  </p>
                  <p>
                    It also exposed a limitation that shipped, documented rather than hidden. The signal for a playing video is indistinguishable from the signal for background music. Two candidate filters were tested against real data and both failed, one of them by breaking the exact case that proves the feature works. So leaving music on while you walk away will keep the counter running. That is a real cost of the approach and the app says so in its README rather than pretending otherwise.
                  </p>
                </SectionBody>
              </section>

              {/* 05 THE BREAK */}
              <section id="break" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="05"
                  title="The Break Itself"
                  subtitle="Insistent enough to work, escapable enough to keep."
                />
                <SectionBody>
                  <p>
                    When the twenty minutes are spent, a dimmed overlay covers every monitor. It is deliberately see-through, so your work stays faintly visible behind it and the interruption reads as a pause rather than a takeover.
                  </p>
                  <p>
                    The countdown has one unusual property: it only advances while you have actually stopped. Keep typing and it holds, showing a quiet hint rather than counting down to nothing while you ignore it. A twenty second timer you can type through is decoration. Escape snoozes for five minutes, Skip resets the full interval, and both exist because an app you cannot dismiss during a crisis is an app you uninstall.
                  </p>
                  <p>
                    Snooze is measured in active minutes, not wall clock minutes, for the same reason the main interval is. Snoozing and then walking away should not burn the snooze.
                  </p>
                </SectionBody>

                <VisualFrame
                  bg="linear-gradient(135deg, #11131a 0%, #0c0e14 100%)"
                  label="Overlay"
                  imageSrc="/images/twentytwenty/overlay.png"
                  caption="The break overlay over an editor. The dim is transparent by design, so the work underneath stays visible."
                  zoomable
                  wide
                />

                <SectionBody>
                  <p>
                    Between breaks the app is a tray icon and nothing else. Right-clicking it shows a live countdown to the next break alongside the controls, which turned out to be the only way to surface it: the tray backend on KDE Wayland exposes no tooltip property at all, so the hover text the app sets is silently discarded there.
                  </p>
                </SectionBody>

                <figure className="my-10 md:my-12 flex flex-col items-center">
                  <img
                    src="/images/twentytwenty/tray-menu.png"
                    alt="The TwentyTwenty tray menu, showing a live countdown reading Next break in 17:40 above the break, snooze, pause and quit controls"
                    width={187}
                    className="block rounded-[8px]"
                    style={{
                      width: "187px",
                      boxShadow: "0 20px 45px rgba(0,0,0,0.55)",
                      border: "1px solid rgba(242,242,242,0.06)",
                    }}
                  />
                  <figcaption className="mt-4 text-[12.5px] leading-[1.6] text-[var(--text-muted)] text-center max-w-[420px]">
                    The tray menu, counting down in real time. Captured at 17:40 remaining.
                  </figcaption>
                </figure>
              </section>

              {/* 06 THREE PLATFORMS */}
              <section id="platforms" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="06"
                  title="One App, Three Operating Systems"
                  subtitle="Every platform reduces to the same four facts, and the logic never learns which one it is running on."
                />
                <SectionBody>
                  <p>
                    The three operating systems expose this information through completely unrelated interfaces. Linux needs a Wayland protocol and a DBus property. Windows has two Win32 calls. macOS has a Core Graphics function and a command line tool. Left unchecked, that difference spreads through a codebase until every feature has three versions.
                  </p>
                  <p>
                    Instead, each platform implements one small file that answers four questions. How long since input? Is something holding the display awake? Is the user presenting? Is the session locked? Everything above that boundary is platform agnostic and never branches on the operating system.
                  </p>
                </SectionBody>

                <ConstraintList items={[
                  { title: "Linux", description: "Idle from the ext-idle-notify Wayland protocol, inhibitions and lock state over DBus. The only platform fully verified by hand." },
                  { title: "Windows", description: "GetLastInputInfo for idle, the shell notification state for fullscreen and presentation, desktop access for lock detection." },
                  { title: "macOS", description: "Core Graphics for idle and power assertions for display wake, read through pmset rather than raw FFI for legibility." },
                  { title: "Fallback", description: "If any platform probe fails at runtime the app degrades to input-idle only rather than propagating a bad reading." },
                ]} />

                <SectionBody>
                  <p>
                    That boundary earned its keep during development. The Linux idle source the plan called for turned out not to exist on the target compositor, and replacing it touched exactly one file. Nothing above it changed.
                  </p>
                </SectionBody>
              </section>

              {/* 07 PROVING IT WORKS */}
              <section id="proving" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="07"
                  title="Proving It Works"
                  subtitle="How do you test twenty minute behavior without waiting twenty minutes?"
                />
                <SectionBody>
                  <p>
                    The decision that made this project testable was keeping the engine pure. It never reads a clock and never touches the operating system. Time arrives as a number, and readings arrive as plain data. Everything interesting lives there: the counter, the break rule, snooze arithmetic, deferral while presenting, and what happens when a laptop lid closes.
                  </p>
                  <p>
                    Because none of it does any real work, a full twenty minute interval runs in microseconds against synthetic input. So the test suite asserts the actual product requirements by name. A video with no input still accumulates. A real absence clears the counter. A locked session never counts. The countdown completes only when input stops. An hour of sleep counts as rest, not as an hour of staring.
                  </p>
                  <p>
                    Two questions were too risky to assume, so both were answered before any real code was written. Would the compositor allow a fullscreen always-on-top overlay at all? Does a playing video really register as holding the display awake? Both were settled by throwaway probes in an afternoon. If the second one had come back negative, the entire product concept would have needed rethinking, and it would have been better to learn that on day one than at the end.
                  </p>
                </SectionBody>
              </section>

              {/* 08 WHAT IT CAUGHT */}
              <section id="caught" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="08"
                  title="What The Process Caught, And What It Missed"
                  subtitle="Nine defects found before release. The one that mattered most got through anyway."
                />
                <SectionBody>
                  <p>
                    The interesting failures were not the ones the tests caught. They were the ones that passed everything and were still broken.
                  </p>
                  <p>
                    <strong className="text-[var(--text-secondary)]">The app quit forever after the first break.</strong> This is a tray app that opens no window at startup, and the framework treats zero open windows as an instruction to exit. So the moment the first break overlay closed, the process ended. A user would have installed it, received exactly one reminder, and watched it vanish from the tray permanently. No test detects this. It was found by running the app and instrumenting the event loop.
                  </p>
                  <p>
                    <strong className="text-[var(--text-secondary)]">The overlay was completely invisible.</strong> The fade-in set transparency on both the document and the body element but only ever restored it on one of them. Opacity multiplies down the tree, so the result was a fullscreen window that rendered nothing while still swallowing every click. Every automated signal was green: the window was created, events flowed, the keyboard shortcut worked, 35 tests passed. The bug surfaced when a human looked at the screen and reported that something kept covering it with nothing on it.
                  </p>
                  <p>
                    The rest were ordinary but would have shipped: an idle check that would have downgraded itself to a dumb timer the first time the user touched the mouse, a session lookup that fails specifically when the app is launched at login, a macOS parser that would have reported the display permanently awake, and a wrong Win32 call for closing a handle.
                  </p>
                  <p>
                    And then one got out. On a packaged build the overlay came up completely blank and swallowed the keyboard and mouse with it. Every control that dismisses it lives in that page, so when the page failed to draw, Escape, Snooze and Skip ceased to exist at the same moment. There was no way out of the session.
                  </p>
                  <p>
                    The first fix addressed the cause: a build that resolved the page against a development server that is not running in a shipped app. It was the right diagnosis, it was verified, and it was not enough. Within the hour the same symptom returned from an unrelated cause. The AppImage carries its own graphics libraries, and against a driver that disagrees with them the renderer dies before its first frame. Same blank window, same trap, nothing in common with the first bug.
                  </p>
                  <p>
                    <strong className="text-[var(--text-secondary)]">The second fix stopped chasing causes.</strong> The overlay no longer captures anything on the strength of having been created. It opens click-through, unfocused and not on top, and is promoted to a real overlay only once the page reports that a frame was actually composited. If that report does not arrive in two and a half seconds, the window is destroyed and the break arrives as a notification explaining why. Both known causes now land in the same safe place, as will the next one, because the check asks whether the page drew rather than why it did not.
                  </p>
                  <p>
                    The lesson was not about graphics drivers. It was that the verification had been shaped for convenience: the overlay was tested with its fullscreen and always-on-top flags removed so it would not hijack the screen under test, and launched directly rather than through the installer. Those were exactly the four variables that turn a blank window into a trap. A test made safe had been made incapable of finding the bug.
                  </p>
                </SectionBody>

                <PrincipleCards items={[
                  {
                    number: "01",
                    title: "Spikes before code",
                    description: "The riskiest unknowns were settled with throwaway probes before anything was built on top of them.",
                  },
                  {
                    number: "02",
                    title: "Fresh eyes per change",
                    description: "Every change was reviewed against its requirements by someone who had not written it, which caught three defects the author had reasoned past.",
                  },
                  {
                    number: "03",
                    title: "Design for the failure, not the cause",
                    description: "The worst bug had two unrelated causes and the same symptom. What fixed it was refusing to let the overlay capture input until it proved it had drawn something.",
                  },
                ]} />
              </section>

              {/* 09 NOT VERIFIED */}
              <section id="unverified" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="09"
                  title="What Is Not Verified"
                  subtitle="Three platforms build and pass their tests. That is not the same as three platforms working."
                />
                <SectionBody>
                  <p>
                    Continuous integration produces installers for Linux, Windows and macOS, and the suite is green on all three. It would be easy to present that as three supported platforms. It is not, and the README says so.
                  </p>
                </SectionBody>

                <ConstraintList items={[
                  { title: "Linux is genuinely verified", description: "It runs against a live session, and a person confirmed the overlay, the countdown hold, both dismiss paths and a clean quit by hand." },
                  { title: "Windows compiles and tests pass", description: "Nobody has ever installed or launched it. The probe is small and boring on purpose, because no one can debug it interactively." },
                  { title: "macOS has never been run", description: "Its first compile anywhere happened on a CI runner. Whether a locked Mac still reports display assertions is genuinely unknown, and the README documents how someone with a Mac could find out." },
                  { title: "Multi-monitor is untested", description: "The overlay creates one window per display, but the only development machine has a single screen. This is the configuration that matters most and the one nobody has watched work." },
                ]} />

                <SectionBody>
                  <p>
                    Writing this down was a deliberate choice. Any reader can check it against the repository, and a claim that survives checking is worth more than a claim that avoids it.
                  </p>
                </SectionBody>
              </section>

              {/* 10 RETROSPECTIVE */}
              <section id="retrospective" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="10"
                  title="Retrospective"
                  subtitle="What held up, and what I would do differently."
                />
                <SectionBody>
                  <p>
                    The two decisions that paid for themselves repeatedly were keeping the engine free of I/O, which turned twenty minute behavior into microsecond tests, and reducing every operating system to the same four facts, which kept a compositor level surprise confined to one file.
                  </p>
                  <p>
                    The lesson I did not expect concerns where risk actually lives. Enormous care went into the macOS code because nobody could run it. That code compiled on its first real attempt. The build broke instead on a single line in the shared overlay, which had been working on Linux for hours, because one platform hides transparent windows behind an opt-in flag. The risk was in the code nobody was worried about.
                  </p>
                  <p>
                    Next time I would put a human in front of the running app earlier. Verification was thorough and it was still possible to have a completely invisible interface while every indicator read green. The gap between what a test can assert and what a person can see is where the embarrassing bugs live.
                  </p>
                </SectionBody>
              </section>

              <NextProject
                title="AI Ticketing System"
                meta="Lead Engineer - 2024"
                href="/work/ai-ticketing"
                previewBg="linear-gradient(135deg, #1a1424 0%, #120e1c 40%, #0a0812 100%)"
                previewLabel="AI"
                previewLabelColor="rgba(210,168,255,0.6)"
                previewImageSrc="/images/ai-ticketing/dashboard.png"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
