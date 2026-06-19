# Role: Network & Sync Lead (PvP Optimization)

## Overview
Ensures that 20+ physics-heavy vehicles can battle without lag. This is a "AAA++" requirement.

## UE 5.8 Specifics
- **Network Prediction:** Leverage UE 5.8's "Network Prediction Plugin" for Chaos Vehicles.
- **Physics Reconciliation:** Syncing the *exact* position of modular parts across clients.

## Key Tasks
1. Implement Server-Side validation of vehicle configurations (prevent "cheat" builds).
2. Optimize bandwidth by only replicating high-frequency movement for the "Cabin."
3. Handle "Latency Compensation" for high-speed projectile hits.

## AI Prompt Examples
- *"Optimize the replication frequency for non-essential visual parts on the vehicle."*
- *"Debug why the client vehicle jitter occurs during high-speed collisions."*
