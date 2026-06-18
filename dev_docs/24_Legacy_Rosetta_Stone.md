# The Rosetta Stone: Legacy Syntax to UE 5.8 Modern logic

This guide bridges your 10+ years of "primitive" experience to the modern UE 5.8 AI-assisted workflow.

## 1. Logic Translation

| Old School Concept | Modern UE 5.8 Equivalent | Why? |
| :--- | :--- | :--- |
| `GOTO / Labels` | **State Trees / Behavior Trees** | Labels are messy. UE5 uses visual state machines that the AI can read and debug easily. |
| `Direct Memory Pointers` | **Soft Object References** | Never point to a raw memory address. Use Soft Refs to allow the engine to load/unload assets only when needed. |
| `Global Variable Bloat` | **Data Assets & Structs** | Instead of `Global_Int_Health`, use a `UDataAsset`. It’s easier to balance (via AI) and sync over the network. |
| `Hardcoded Loop Timers` | **Timer Handles & Delays** | Don't use "For" loops for timed events. Use `Set Timer by Event`. It’s thread-safe and more efficient. |

## 2. The "MCP Coding" Shift
In the past, you wrote the code. Now, you **Architect the Data** and let the AI write the boilerplate.

### Old Way:
```c++
// Manually calculating attachment
if (partA.pos == partB.pos) { weld(partA, partB); }
```

### Modern Way (MCP Prompt):
*"Connect to the Unreal MCP. Look at the `Vehicle_Assembly` function. Using the `Auto_Weld_Sockets` tool, ensure that any part placed within 0.5 units of an existing socket is automatically snapped and its mass added to the `Total_Vehicle_Mass` variable."*

## 3. The "Chaos" Mindset
Chaos is a **Solver**, not a set of rigid rules.
- **Don't** try to manually calculate velocity every frame.
- **Do** apply "Forces" and "Impulses." Let the Chaos Engine handle the sub-stepping and collision reconciliation.

## 4. Key Modern Keywords to Learn
- **Nanite:** Infinite triangles (forget about poly-count budgets).
- **Lumen:** Real-time lights (forget about "Baking" lightmaps).
- **Substrate:** Layered materials (forget about flat texture maps).
- **ReplicatedUsing:** Automated network syncing (forget about manual packet building).
