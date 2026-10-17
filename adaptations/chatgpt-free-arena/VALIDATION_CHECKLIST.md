# Validation checklist

Use this checklist to review the prompt adaptation. It is a manual protocol check, not a claim that an automated test suite was executed.

## Functional checks

- [ ] QUICK mode is announced as four candidate perspectives and two knockout rounds.
- [ ] Standard mode is announced as eight candidate perspectives and three knockout rounds.
- [ ] The prompt never calls these perspectives genuine independent agents or different models.
- [ ] Every candidate uses the same Task Lock; only the strategy card changes.
- [ ] A retry preserves the rejected baseline and compares it honestly.
- [ ] Every attack has a severity and a concrete reason, source, counterexample, or test where possible.
- [ ] Each defense classifies the attack and updates the solution when required.
- [ ] The judge applies the published weights consistently and records the arithmetic.
- [ ] A verified fatal flaw prevents a candidate from winning against a non-fatal candidate by score alone.
- [ ] The final report includes the winner, decisive attacks, remaining uncertainty, and tests not run.
- [ ] Checkpoint instructions identify the current round and next action without inventing missing state.

## Honesty and safety checks

- [ ] No claim of agents launched, code executed, files saved, or tests passed without the relevant action actually happening.
- [ ] The prompt does not reveal private chain-of-thought; it reports concise evidence and conclusions.
- [ ] Unverified assumptions and missing sources remain clearly labeled.
- [ ] Manual multi-chat mode says cross-chat coordination is manual and quotas may vary.
- [ ] External changes, edits, merging, and deployment require separate explicit authorization.
- [ ] Software-analysis tasks stay within authorized research and do not help bypass licensing, access controls, or activation.

## Smoke-test tasks to run in ChatGPT

1. **Writing task:** “ARENA QUICK: Write a short product description for a reusable water bottle; tone practical, under 80 words.” Check that all four candidates follow the same length and tone constraints.
2. **Logic task:** “ARENA QUICK: Give a Python function that returns the second-largest distinct integer, with tests for empty input, duplicates, and one-item input.” Check that the winner's tests actually cover the listed edges. Do not assume code was executed.
3. **Uncertainty task:** “ARENA QUICK: Recommend the cheapest current laptop with a named specification.” Check that the prompt requests current sources or states that it cannot verify today's prices.
4. **Baseline task:** Supply a rejected answer and ask for ARENA RETRY. Check that both answers are scored against the same rubric and the rejected answer can win.
5. **Checkpoint task:** Request a checkpoint after round one and continue from it in a new chat. Check that missing match records are not reconstructed as if they were preserved.

The checklist should be marked only after a person performs each check. This file does not claim that those smoke tests have already been run.
