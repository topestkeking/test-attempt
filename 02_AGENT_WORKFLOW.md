# 🤖 02_AGENT_WORKFLOW.md: MCP & AI Setup

This guide details how to configure and work with AI agents in Unreal Engine 5.8.

## 1. Technical Setup
1. **Enable Plugin**: Enable "Model Context Protocol" in UE 5.8.
2. **Start Server**: Ensure the editor is running and the MCP server is active on the local port.
3. **Connect Claude**:
   ```bash
   claude config add-mcp unreal-editor http://127.0.0.1:3000/mcp
   ```

## 2. Mandatory Agent Protocol
All agents MUST follow these steps (detailed in `PROJECT_MEMORY/02_TASK_PROTOCOL.md`):
1. **Read Project State**: `PROJECT_MEMORY/01_PROJECT_STATE.md`.
2. **Check Budgets**: Adhere to performance limits in `dev_docs/18_Optimization.md`.
3. **Execute Task**: Use MCP tools for spawning, editing, and testing.
4. **Handoff**: Document the session in `PROJECT_MEMORY/04_AGENT_HANDOFF_FORMAT.md`.

## 3. Tooling
The AI has access to Unreal-specific tools via JSON-RPC. Use these for:
- Spawning modular blocks.
- Recalculating mass/center-of-mass.
- Applying "Grimy" vertex paint.
- Running Gauntlet automation tests.
