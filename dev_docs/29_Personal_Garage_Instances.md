# Personal Garage Zone: The Build Space

Every player needs a personal, private space to build their car before heading to the wasteland.

## 1. The Instance Logic
We use **Level Instances** or **Sub-levels** to create the Garage.
- Each player is spawned into their own copy of the `L_Garage_Base` map.
- **Privacy:** Other players cannot see or enter your garage unless invited.

## 2. The Build Volume
- A specific box in the garage where building is allowed.
- **The "Ghost" Car:** A visual guide showing the standard car preset. You attach your junk parts onto this base.

## 3. Garage Tools (Standard Unreal)
- **Gizmos:** Use Unreal's standard Move/Rotate/Scale gizmos for placing parts.
- **The Library UI:** A simple scroll box showing your available junk (Stop signs, fridge doors, etc.).

## 4. Saving/Loading
- We use the standard **SaveGame** system in Unreal.
- The "Build" is saved as a list of Part IDs and their relative transforms.

## 5. AI Task for Garage
- *"Claude, set up a 'Save' function that loops through all actors attached to the Car Pawn and records their Name, Position, and Scale into a SaveGame object."*
