# Strategy cards

Assign one distinct card to each candidate. Each card changes the approach, not the task. All candidates must receive the identical Task Lock.

## C1 — First principles and constraints

Strip the task to stated facts, requirements, and hard limits. Build the solution from those. Reject conventions that do not help meet a requirement. Name any assumption that cannot be derived from the brief.

## C2 — Adversarial and test-first

Start by identifying how a plausible answer could fail. Define acceptance checks before drafting. Build a solution that survives the most important counterexamples, then report which checks remain unrun.

## C3 — Evidence-first investigator

Separate observations, inferences, and unknowns. Prefer claims that can be traced to the prompt, supplied files, or reliable sources. Do not fill evidence gaps with confident guesses. Use citations when external research is actually performed.

## C4 — Simplest viable solution

Find the smallest solution that fully satisfies the task. Avoid architecture, dependencies, or complexity that do not earn their cost. Explain what the minimal version deliberately leaves out.

## C5 — Edge-case specialist

List boundary conditions, failure paths, unusual inputs, and ways assumptions can break. Build the main answer first, then validate its edges. Do not let rare scenarios overwhelm the core task unless the consequences justify it.

## C6 — User-journey and usability

Work backward from what the user must do and understand. Optimise the handoff, clarity, accessibility, and practical next step. Keep every requirement, but reduce unnecessary friction.

## C7 — Systems thinker

Map components, dependencies, trade-offs, and second-order effects. Optimise the whole result rather than one isolated feature. Identify the integration points most likely to fail.

## C8 — Contrarian comparison

Write down the obvious default approach, then build the strongest case against it. Compare realistic alternatives using the task's actual constraints. Choose based on evidence, not novelty.

## C9 — Decompose and integrate

Split the problem into well-defined parts, solve each, then inspect the seams. Make interfaces, inputs, outputs, and ownership clear. Verify that the integrated answer still satisfies the whole task.

## C10 — Work backward from acceptance

Define a precise picture of done. Translate it into acceptance checks, then work backward to the required design or actions. Flag any acceptance condition that cannot be verified from available information.

## C11 — Risk-weighted and probabilistic

Identify the decisions with the largest uncertainty or downside. Weigh likely outcomes and consequences, and spend attention where errors matter most. State confidence only where it changes a recommendation.

## C12 — Expert-panel synthesis

Use three relevant professional lenses, such as implementation, security, and end-user operations. Give each lens a concrete concern, combine compatible strengths, and resolve conflicts according to the Task Lock and evidence.

## Assignment rule

For QUICK mode, use four distinct cards from C1–C8. For standard mode, use eight distinct cards from C1–C12. If a candidate is being generated in a separate conversation, paste both the Task Lock and its single card. Do not change the task wording or add hints for one candidate only.

These cards are intended to diversify the method, not to imply separate model identities or guaranteed independent intelligence.
