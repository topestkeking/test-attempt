# 📖 THE DEVELOPER HANDBOOK: Project "Cars & Cannons"

Welcome to the team. This handbook is the definitive guide to our development philosophy, our AI-human workflow, and our technical architecture for Unreal Engine 5.8.

---

## 1. The Core Vision: "Cars with Guns"
We are building a **AAA+++ High-Octane Vehicle Combat Game**.
- **Aesthetic:** Grimy, rusted, "Mad Max" junkyard industrial.
- **Gameplay:** Minecraft-style modular building meets competitive PvP physics.
- **Philosophy:** **Fun > Reality**. If the physics is boring, simplify it. If the gun isn't loud enough, crank it.

---

## 2. The AI-Human Collaboration Workflow (The "Secret Sauce")
This project is designed to be built by a tiny team (2 people) with a massive output, powered by **Claude Code** and the **Unreal MCP (Model Context Protocol)**.

### How We Work with Claude:
- **Claude is your Technical Architect:** Don't write boilerplate code. Describe the logic and let Claude implement it via the MCP connection to Unreal.
- **Claude is your QA Lead:** Use Claude to run automated physics stress tests in "The Gauntlet" arena.
- **Claude is your Asset Estimator:** Refer to `Asset_Analysis.md` and ask Claude to generate material instances or PCG rules to hit those targets.

### The "Prompt-First" Strategy:
Before you click anything in the editor, ask yourself: *"Can I describe this to Claude?"*
- *Example:* "Claude, look at `BP_Vehicle_Base`. Add a socket for a roof-mounted turret and link it to the 'Fire' input action."

---

## 3. Navigating the Repository
We have 24+ specialized guides located in the `dev_docs/` directory. For a full breakdown of every file and the mindset needed for each, see the **[DOCUMENTATION_MAP.md](DOCUMENTATION_MAP.md)**.

### Quick Reference:
- **Getting Started:** Read `MCP_AI_Setup_Guide.md` first.
- **Driving & Feel:** See `Physics_Deep_Dive.md` (Arcade-Competitive focus).
- **The Building System:** See `dev_docs/02_Modular_Systems.md`.
- **Legacy Knowledge:** If you are coming from old-school/primitive coding, read `dev_docs/24_Legacy_Rosetta_Stone.md`.

---

## 4. The 3 Action Streams
We organize our work into three parallel tracks:
1. **Action Stream A (The Heart):** Physics, Building Logic, Network Sync, Combat.
2. **Action Stream B (The Frontier):** Environments, Tech Art, VFX, Lighting, Audio.
3. **Action Stream C (The Command Center):** UI/UX, Backend, Economy, Legal, QA.

---

## 5. Your First 24 Hours: Onboarding Checklist
1. [ ] **Bootstrap the Engine:** Follow the **[PROJECT_BOOTSTRAP_GUIDE.md](PROJECT_BOOTSTRAP_GUIDE.md)** to set up the C++ Vehicle Template.
2. [ ] **Connect Claude:** Run `claude config add-mcp` as detailed in `MCP_AI_Setup_Guide.md`.
3. [ ] **Enter the Garage:** Load the `L_Garage_Hub` level. Spend time with the snapping logic.
4. [ ] **The Gauntlet Run:** Load `L_Testing_Arena` and spawn a default vehicle. Ensure driving and shooting feels "snappy."
5. [ ] **First AI Task:** Pick a "Grimy" asset and ask Claude to create 3 material variants using the Substrate Master Material.

---

## 6. Communication & Flow
- **Keep it modular:** Every part you build should be a "Block" that can be reused.
- **Stay in the Loop:** Always run your logic past the "Physics Architect" (Claude or your teammate) to ensure it doesn't break the competitive balance.

*Good luck, Scavenger. Let's make some noise.* 🏎️💨
