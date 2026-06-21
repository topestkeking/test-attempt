# 🚀 PROJECT BOOTSTRAP: Starting "Cars & Cannons"

This guide answers your "Day 1" technical questions: Which template to use, and whether to choose C++ or Blueprints.

---

## 1. The Template: Start with "Vehicle"
**YES, use the Vehicle Template.**
- **Why?** It comes pre-configured with the **Chaos Vehicle** plugin, the default sports car physics, and (crucially) the Input Mapping for throttle, steering, and braking.
- **Action:** Select the "Vehicle" template under the **Games** tab when creating your project.

## 2. Project Type: Choose C++ (The "Hybrid" Strategy)
Even if you don't want to write C++ yourself, **choose the C++ project type.**
- **Why?** A C++ project allows the AI (Claude) to create custom "Bridges" between the engine and the MCP server. If you choose "Blueprint Only," you limit the AI's ability to help you with deep engine optimizations or custom tool creation later.
- **The Workflow:** You will work **90% in Blueprints** for the "fun" stuff (building cars, gun logic), but the project will have a C++ foundation that Claude can use for the "heavy" stuff.

## 3. Step-by-Step Initial Setup

### Step A: The Creation Screen
1. Open **Unreal Engine 5.8**.
2. Select **Games > Vehicle**.
3. Choose **C++** (not Blueprint).
4. **Target Platform:** Desktop.
5. **Quality Preset:** Scalable (You can turn on the "AAA" settings later once the core is stable).
6. **Starter Content:** OFF (We will use our "Grimy" assets instead).

### Step B: Essential Plugins (Enable immediately)
Once the editor opens, enable these:
1. **Model Context Protocol:** (Essential for AI communication).
2. **Chaos Vehicles:** (Should be on by default).
3. **Procedural Content Generation (PCG):** (For world building).
4. **Common UI:** (For cross-platform menus).
5. **Substrate:** (For our high-end grimy materials).

### Step C: The "Empty Car" Cleanup
1. Open the default `BP_ChaosVehicle`.
2. Keep the **Chaos Vehicle Movement Component**.
3. **Delete** the mesh of the sports car.
4. This is now your **Chassis Root**. You will begin attaching your "Scrap Blocks" to this.

## 4. Why not "Blueprint Only"?
If you ever want to "Edit the binaries" (or rather, have the AI do it for you) to optimize physics for 16 players, you *need* a C++ project. It is much easier to start with C++ than to try and convert a Blueprint project later.

---
**Next Step:** Connect Claude via the instructions in `MCP_AI_Setup_Guide.md` and tell it: *"I have started the Vehicle C++ project. Help me define the base attachment logic for modular blocks."*
