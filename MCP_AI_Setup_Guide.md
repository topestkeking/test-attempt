# UE 5.8 Model Context Protocol (MCP) AI Setup Guide

This guide details how to configure Unreal Engine 5.8 to work with Claude Code and other MCP-compatible AI agents. This allows the AI to "drive" the editor, spawn actors, and modify your project logic directly.

## 1. Unreal Editor Configuration

### Enable the Plugin
1. Open your project in **Unreal Engine 5.8**.
2. Go to **Edit > Plugins**.
3. Search for **"Model Context Protocol"** (Identifier: `ModelContextProtocol`).
4. Enable the plugin and restart the editor.

### Start the MCP Server
By default, the server runs inside the editor process and listens on a local HTTP connection.
1. Open the **Output Log** (`Window > Output Log`).
2. Verify the server is running. You should see a log entry: `LogModelContextProtocol: MCP Server started on http://127.0.0.1:XXXX`.
3. Note the port number (default is often `3000` or `5555`).

## 2. Connecting Claude Code

Claude Code acts as the **MCP Client**. You must tell it how to talk to the Unreal server.

### Configuration Command
Run the following in your terminal where Claude Code is installed:

```bash
claude config add-mcp unreal-editor http://127.0.0.1:3000/mcp
```
*(Replace `3000` with the actual port shown in your Unreal Output Log)*.

### Verifying the Connection
In your Claude Code session, ask:
> "List the tools available from the unreal-editor MCP server."

The AI should return a list of tools like `spawn_actor`, `get_editor_state`, `set_actor_property`, etc.

## 3. Recommended Prompts for "Hand-free" Dev

To get the most out of the AI integration for your "Crossout" style project, use these high-level instructions:

### Logic & Blueprinting
*"Connect to the Unreal MCP. Look at the `BP_Vehicle_Base` blueprint. Add a new component for a 'Scrap Armor' block and ensure its mass is calculated based on its scale."*

### Physics Calibration
*"Run an automation test on the current vehicle. If the center of mass is higher than 50 units, suggest a relocation of the battery module to the undercarriage."*

## 4. Troubleshooting
- **Firewall:** Ensure your local firewall allows connections on the specified port.
- **Game Thread Sync:** The MCP server executes tools on the game thread. If the editor is frozen or in a modal dialog, the AI might timeout.
- **Experimental Status:** UE 5.8 MCP is in early access. Some complex property types (like nested Structs) might require manual C++ exposure if they aren't visible to the MCP server.
