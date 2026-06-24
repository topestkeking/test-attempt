# 📋 02_TASK_PROTOCOL.md: Standard Agent Task Format

To maintain order in a multi-agent system, all tasks must follow this protocol.

## 1. Task Definition
Agents must receive or generate a task in this format:
- **Task ID**: `TASK-XXX`
- **Goal**: Clear, single-sentence objective.
- **Acceptance Criteria**: Checkable list of "Done."
- **Affected Files**: Predicted paths.

## 2. Implementation Cycle
1. **Context Check**: Read `01_PROJECT_STATE.md`.
2. **Execution**: Perform edits/tool calls.
3. **Verification**: Run `dev_docs/13_QA_Automation.md` procedures.
4. **Handoff**: Fill out the `04_AGENT_HANDOFF_FORMAT.md`.

## 3. Rollback Strategy
If a task results in a build failure or critical physics instability:
1. **Revert**: Undo changes using Git.
2. **Log**: Document the failure in `03_DECISION_LOG.md`.
3. **Escalate**: Request human input.
