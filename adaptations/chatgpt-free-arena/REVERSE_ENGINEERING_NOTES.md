# Source-level reverse-engineering notes

This document records the evidence used to adapt the Arena workflow and distinguishes observed source facts from design decisions made for ChatGPT Free.

## Target inspected

Target: [Jakeschincariol/arena-skill](https://github.com/Jakeschincariol/arena-skill), public repository with an MIT license.

The repository tree contains the Claude plugin metadata, a README, the Arena skill instructions, a Python tournament manager, strategy cards, a rubric, and unit tests. Primary sources inspected:

- [README.md](https://github.com/Jakeschincariol/arena-skill/blob/main/README.md)
- [skills/arena/SKILL.md](https://github.com/Jakeschincariol/arena-skill/blob/main/skills/arena/SKILL.md)
- [skills/arena/bracket.py](https://github.com/Jakeschincariol/arena-skill/blob/main/skills/arena/bracket.py)
- [skills/arena/strategies.json](https://github.com/Jakeschincariol/arena-skill/blob/main/skills/arena/strategies.json)
- [skills/arena/rubric.md](https://github.com/Jakeschincariol/arena-skill/blob/main/skills/arena/rubric.md)
- [tests/test_bracket.py](https://github.com/Jakeschincariol/arena-skill/blob/main/tests/test_bracket.py)

## Observed facts

1. The README and skill metadata describe a Claude Code skill that uses Claude Code's sub-agent capability and Python 3.8 or newer. The slash-command interface is part of that host environment, not a generic ChatGPT chat command.
2. The default competition size is 100; the quick mode uses 16. The README gives a single-elimination progression from 100 candidates to one winner and calculates a large number of sub-agent calls for the full run.
3. Each candidate receives the task plus a different card. The source describes 15 reasoning modes, 12 workflows, and 12 strategies, or 2,160 combinations before assignment constraints.
4. The tournament phases include initial candidate generation, attacks, defenses/revisions, judging, collection of verdicts, and advancement to the next bracket round.
5. The source rubric weights correctness at 30, completeness at 25, robustness at 20, specificity at 15, and clarity at 10, with a fatal-flaw override.
6. The Python script maintains tournament state and generates job briefs. The tests exercise the bookkeeping and phase transitions with stand-in outputs. Those tests validate the script's workflow; they do not prove that the model's chosen winner is correct.
7. The README explicitly explains that its many candidates are sub-agents of the same underlying model, not 100 different models, and that a tournament winner is not proof of correctness.

## Adaptation decisions

| Original design element | Host dependency or risk | ChatGPT Free adaptation |
|---|---|---|
| Slash skill invocation | Claude Code plugin/skill loader | Paste one reusable prompt into a normal chat; use natural-language commands |
| 16/100 actual sub-agent calls | Host Agent tool and Python state machine | Four or eight candidate perspectives in one conversation, or manually supplied drafts from separate chats |
| Python bracket and disk state | Local runtime and file system | Explicit match records and a portable text checkpoint |
| Different strategy cards | Candidate prompt design | Twelve compact cards, with unique assignments per run |
| Attack, defend, judge | Sub-agent phases and separate judging jobs | Structured stages in the conversation, with an explicit disclosure that single-chat judging is not independent or truly blind |
| Persistent JSON history | Files saved under an arena directory | User-controlled checkpoint that can be copied into a later conversation |

## REA-inspired investigation discipline

The public [REA repository](https://github.com/morluto/rea) and its documentation emphasize recording evidence, preserving limitations, and keeping observations, inferences, and unknowns distinct. That discipline informs the notes above and the prompt's honesty rules.

This was a source-level analysis of the public GitHub files. The REA CLI was not run against a local clone of Arena Skill in this session, and the Arena project's Python test suite was not executed here. No claim of runtime instrumentation or dynamic testing is being made.

## License and attribution

The inspected Arena Skill repository lists the MIT License and says it may be taken, changed, and shipped. This adaptation preserves attribution and links to the upstream project. The documents here are newly written; the original Python tournament engine is not copied into this folder. Keep the upstream copyright and license notices when reusing upstream material.
