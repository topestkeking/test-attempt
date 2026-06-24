# ⚖️ 04_PROJECT_GOVERNANCE.md: Rules & Budgets

Project governance ensures consistency and performance in a multi-agent, 2-person environment.

## 1. The Rulebook
All development must follow the rules defined in **[PROJECT_MEMORY/00_AGENT_RULES.md](PROJECT_MEMORY/00_AGENT_RULES.md)**.

### Unreal Reality Rules:
- **Engine Version**: UE 5.8 (Strict).
- **Allowed**: Blueprint, C++, Data Assets.
- **Forbidden**: Engine Source modifications, Unapproved Marketplace plugins, Experimental features without ADR.
- **Source of Truth**: The `PROJECT_MEMORY/` directory.

## 2. Performance Budgets
See `dev_docs/18_Optimization.md` for full details:
- **Frame Rate**: Target 60 FPS.
- **Triangles**: 2M per vehicle max.
- **Draw Calls**: < 100 per vehicle.
- **Network**: < 2KB/s per vehicle.

## 3. Task Lifecycle
Tasks move through:
**Idea** -> **Design** (Decision Log) -> **Implementation** (Agent/Human) -> **QA** (Gauntlet) -> **Merge**.

## 4. Technical Debt
Managed in `PROJECT_MEMORY/01_PROJECT_STATE.md`. Prioritize stability over visual polish in early milestones.
