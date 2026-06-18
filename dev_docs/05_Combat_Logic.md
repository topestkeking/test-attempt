# Role: Combat & Damage Logic

## Overview
How vehicles take damage. Not just "Health Bars," but parts falling off.

## UE 5.8 Specifics
- **Chaos Destruction:** Use "Field System" to apply radial damage that shears off specific modules.
- **Dynamic Weak Points:** AI-assisted detection of exposed Cabins or Fuel Tanks.

## Key Tasks
1. Map "Damage Types" (Explosive, Kinetic, Heat) to part resistances.
2. Implement the "Detachment" logic when a part's health hits zero.
3. Handle the "Explosion Chain" (e.g., fuel tank igniting nearby ammo racks).

## AI Prompt Examples
- *"When this module is destroyed, spawn a physics-active scrap mesh and apply an impulse of 500 units."*
- *"Calculate the damage drop-off for an autocannon projectile over 500 meters."*
