# ⚖️ 00_AGENT_RULES.md: Project Governance

This document defines the constraints and permissions for all AI agents working on Project "Cars & Cannons".

## 1. Source of Truth Hierarchy
1.  **Project Memory (`PROJECT_MEMORY/`)**: Current status and decision logs.
2.  **Core Specs**: `Physics_Deep_Dive.md`, `Asset_Analysis.md`.
3.  **Governance**: This file.
4.  **Specialized Docs**: `dev_docs/`.

## 2. Agent Permissions
- **READ**: Full access to all files.
- **WRITE**: Permitted for `.uasset` metadata, `.cpp`, `.h`, `.md`, and `.json`.
- **DELETE**: **PROHIBITED** for existing project assets without human approval.
- **EXECUTE**: Permitted for Unreal MCP tools, automation tests, and build commands.

## 3. Forbidden Actions
- **No Engine Modifications**: Do not modify UE 5.8 source code.
- **No External Dependencies**: Do not add marketplace plugins without human review.
- **No Budget Breaking**: Do not exceed performance/memory budgets defined in `dev_docs/18_Optimization.md`.

## 4. Reporting Format
Every agent task completion must include:
- **Files Modified**: List of paths.
- **Logic Added**: Summary of changes.
- **Tests Run**: Result of Gauntlet or Unit tests.
- **Memory Update**: Required changes to `01_PROJECT_STATE.md`.

## 5. Architecture Override Rules
- If an agent identifies a flaw in the core architecture, it must raise an **Architectural Conflict Issue** in the `DECISION_LOG.md` and wait for human/Lead Agent resolution before proceeding.
