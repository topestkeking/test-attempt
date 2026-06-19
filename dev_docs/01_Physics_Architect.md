# Role: Physics Systems Architect (Chaos Vehicles)

## Overview
Responsible for the core driving feel, weight distribution, and mechanical integrity of modular vehicles.

## UE 5.8 Specifics
- **Chaos Vehicles:** Utilize the enhanced Chaos solver in 5.8.
- **MCP Integration:** Use the AI to run real-time "Center of Mass" simulations.
- **Dynamic Inertia:** Since vehicles are resized, the AI must recalculate the Inertia Tensor at runtime.

## Key Tasks
1. Implement a system to sum the mass of all attached "Blocks."
2. Adjust suspension stiffness based on real-time vehicle weight.
3. Handle "Breakable" joints between modules using Chaos Clusters.

## AI Prompt Examples
- *"Calculate the torque needed for a 5000kg vehicle with 6 wheels to reach 60km/h in 4 seconds."*
- *"Check if this vehicle build will tip over during a 45-degree turn at 50mph."*
