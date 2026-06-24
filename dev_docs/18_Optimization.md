# Role: Optimization & Performance (The AAA+ Polish)

## Overview
Ensuring the game runs at 60 FPS on consoles and high-end PCs.

## 🚨 Performance Budgets (MANDATORY)
To maintain AAA performance with 100+ modular parts, agents must adhere to:
- **Triangle Count**: Max 2M triangles per vehicle (Nanite handles this, but keep it sane).
- **Draw Calls**: Use Auto-Instancing; target < 100 draw calls per vehicle.
- **Memory**: Max 512MB VRAM per active car in combat.
- **Network**: Max 2KB/s per vehicle replication.

## Key Tasks
1. Profile "Draw Calls" in the Garage.
2. Optimize the "PhysX/Chaos" budget per frame.
3. Setup "Scalability Settings" (Low, Medium, High, Ultra).
