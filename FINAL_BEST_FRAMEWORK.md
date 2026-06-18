# THE ULTIMATE MASTER FRAMEWORK: Project "Wasteland MCP"

This document is the result of 10 iterative refinement cycles. It consolidates the 23+ roles into 3 "Action Streams" tailored for a 2-person team using Claude Code as a force multiplier.

## 1. Action Stream A: The Core Engine (Physics & Systems)
*Combines: Physics, Modular Systems, Network, Combat, Optimization.*

### The "Golden Rule" of Scaling
To ensure competitive balance with freeform resizing, use the **Cubic Mass Law**:
- `Mass = Base_Mass * (Scale^3)`
- `Engine_Power_Req = Base_Power * (Scale^2)`
- This ensures that as parts get bigger, they get significantly heavier, requiring more wheels/engines, preventing "giant tank" dominance without trade-offs.

### The "Snapshot" Replication
Instead of replicating 100+ part transforms, replicate a **Single Bitmask** of the vehicle's state and use the client-side "Build Reconstruction" to render the mesh. This is the only way to achieve "AAA++" performance in 16-player physics battles.

## 2. Action Stream B: The World & Aesthetic (Art & Narrative)
*Combines: Tech Art, Environment, VFX, Lighting, Audio, Narrative.*

### The "Substrate-Rust" Workflow
Use a single **Master Material Stack** in UE 5.8 Substrate.
- **AI Task:** Instead of making 100 materials, the AI uses a script to "Randomize Rust Seed" on every part during the spawn phase. This creates infinite visual variety with 0 extra memory cost.

### PCG-V2 Logic
Use "Bi-Directional PCG": The terrain reacts to the vehicle paths. High-traffic areas on the map dynamically swap to "Dusty" or "Muddy" textures using Runtime Virtual Textures (RVT).

## 3. Action Stream C: The Platform (UI, Backend, Economy, QA)
*Combines: UI/UX, Backend, Economy, QA, Localization, Legal.*

### The "AI-QA" Loop
The Testing Arena is now an **Automated Headless Client**.
- Every time you save a vehicle blueprint, the AI spawns it in a "hidden" arena, runs it through a 30-second physics stress test, and returns a "Stability Score" (0-100) to the player.

## 4. Enhanced MCP Tooling (The "Hands" of the AI)
We move beyond prompts to **Custom JSON-RPC Tools** in UE 5.8:

| Tool Name | Action | Result |
| :--- | :--- | :--- |
| `Sync_Vehicle_Physics` | Recalculates CoM and Inertia Tensor. | Returns a `Physics_Stability_Report`. |
| `Auto_Weld_Sockets` | Snaps all nearby parts to the nearest grid. | Returns `Weld_Success_Boolean`. |
| `Apply_Aesthetic_Wear` | Procedurally adds rust/scratches via Vertex Paint. | Returns `Visual_Delta_Map`. |
| `Analyze_Network_Cost` | Measures the replication bit-rate of a build. | Returns `Bandwidth_KBps`. |

## 5. Implementation Roadmap (The 3-Month Vertical Slice)
- **Month 1:** The "Builder" & Physics Root (Action Stream A).
- **Month 2:** The "Arena" & Core Combat (Action Stream B + A).
- **Month 3:** The "Economy" & Multiplayer Sync (Action Stream C).
