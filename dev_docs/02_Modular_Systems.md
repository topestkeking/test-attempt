# Role: Modular Systems Engineer (The "Building" System)

## Overview
Develops the "Minecraft-like" placement logic. This is the heart of the "Crossout" experience.

## UE 5.8 Specifics
- **Actor Merging:** Use the 5.8 improved procedural mesh merging to combine blocks into a single physics body for performance.
- **Grid Snapping:** Implement 3D grid logic that allows for "Illegal" parts (colliding) to be flagged.

## Key Tasks
1. Create the `BP_Part_Base` with standardized attachment points (sockets).
2. Develop the "Build Mode" UI and camera system.
3. Handle the "Resizing" logic: updating collision boxes and mesh scales.

## AI Prompt Examples
- *"Write a function that finds the nearest valid grid socket within 50 units of the cursor."*
- *"Create a list of all attached modules and their relative offsets to the Cabin."*
