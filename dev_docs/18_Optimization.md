# Role: Optimization & Performance (The AAA+ Polish)

## Overview
Ensuring the game runs at 60 FPS on consoles and high-end PCs.

## UE 5.8 Specifics
- **Lumen/Nanite Profiler:** Use the new 5.8 tools to find bottleneck meshes.
- **HLODs:** Generate Hierarchical Levels of Detail for the arena.

## Key Tasks
1. Profile "Draw Calls" in the Garage.
2. Optimize the "PhysX/Chaos" budget per frame.
3. Setup "Scalability Settings" (Low, Medium, High, Ultra).

## AI Prompt Examples
- *"Identify the 5 actors with the highest poly count currently in view."*
- *"Reduce the texture resolution for all parts that are smaller than 10cm."*
