# Arena scoring rubric

Use this rubric for every match. Score each criterion from 0 to 10, then apply the weights. The total is from 0 to 100.

| Criterion | Weight | What to assess |
|---|---:|---|
| Correctness | 30 | Factual accuracy, logical validity, executable correctness where relevant, and no misleading central claim. |
| Completeness | 25 | Coverage of every requirement in the locked task and respect for every hard constraint. |
| Robustness | 20 | Whether material attacks are fixed or correctly rebutted, edge cases are handled, and the fixes avoid regressions. |
| Specificity and usability | 15 | Whether the user can act on the answer without guessing; concrete steps, values, examples, code, or acceptance checks where needed. |
| Clarity | 10 | Whether the answer is easy to understand and use at an appropriate length. |

## Calculation

For scores C, M, R, S, and L from 0 to 10:

**Total = (30C + 25M + 20R + 15S + 10L) / 10**

Keep the raw criterion scores and the arithmetic visible in the match record. Do not adjust a score merely to make a preferred candidate win.

## Score anchors

- **9–10:** Strong and well-supported; only trivial limitations remain.
- **7–8:** Useful and mostly sound, with a limited weakness.
- **4–6:** Material gap, uncertainty, or missing requirement.
- **1–3:** Serious problems across important parts of the task.
- **0:** Missing or fundamentally unusable for the criterion.

Use the full scale. Do not give high scores as encouragement.

## Fatal-flaw rule

Mark FATAL only when the evidence verifies a failure that makes the answer unusable for the stated task, violates a hard requirement, or invalidates a central claim. A candidate with a verified fatal flaw cannot beat a candidate without one solely on total score.

If both candidates have verified fatal flaws, numeric totals decide, but the final report must highlight that neither candidate is ready to use. If a supposed fatal flaw cannot be verified, record it as a risk or unknown and score the available evidence.

## Tie-breakers

There are no unresolved ties. Apply these in order:

1. Fewer verified fatal flaws.
2. Fewer material attacks still standing.
3. Higher correctness score.
4. Higher completeness score.
5. The answer most directly usable for the user's stated goal; explain the deciding reason in one sentence.

## Judge's checklist

Before deciding a winner, check:

- Did the candidate answer the actual task rather than an easier substitute?
- Does each hard requirement have clear coverage?
- Are important factual claims supported or properly marked as uncertain?
- Were critical attacks fixed in the revised version, not merely acknowledged?
- Did a proposed fix introduce a new defect?
- Are test results and external actions represented truthfully?
- Is the score based on deliverable quality rather than length, confidence, or personal taste?

A high score is not proof of correctness. Report what was checked and what remains unchecked.
