# AAA Asset Count & Aesthetic Analysis

To reach a "Competitive AAA" standard similar to Crossout at launch, we need a variety of parts that allow for strategic depth and visual diversity.

## 1. Estimated Part Counts (Launch Target)

| Category | Unique Models | Variants (Skins/Rust) | Total Assets |
| :--- | :--- | :--- | :--- |
| **Cabins** | 15 (Light, Med, Heavy) | 3 per cabin | 45 |
| **Frames** | 10 (Different Sizes) | N/A (Standard) | 10 |
| **Movement** | 12 (Wheels, Tracks, Hovers) | 2 per type | 24 |
| **Weapons** | 25 (Machine Guns, Cannons, etc) | 2 per type | 50 |
| **Armor Blocks** | 40 (Slopes, Plates, Grilles) | 4 per block | 160 |
| **Modules** | 10 (Engines, Coolers, Radars) | 1 per type | 10 |
| **VFX (Niagara)** | 30 (Explosions, Smoke, Muzzle) | N/A | 30 |
| **Environment Props**| 100 (Scrap, Rocks, Structures) | 3 per prop | 300 |
| **TOTAL** | **242** | **-** | **~629** |

## 2. The "Grimy Mad Max" Aesthetic Checklist

### Materials (Substrate in UE 5.8)
- **Base Metal:** Scratched, oxidized iron.
- **Top Layer:** Flaking paint (Yellow, Red, Black).
- **Secondary Layer:** Rust (High-detail texture with normal maps for "pitting").
- **Detail Layer:** Oil leaks, dust buildup, and welding seams.

### Modeling Standards
- **Nanite Enabled:** High poly counts allowed (10k-50k per armor block).
- **Socket System:** Every part MUST have a standard "Attachment Point" mesh that looks like a weld or a bolt.
- **Damage States:** Every part needs a "Damaged" visual state (geometry change or swapping to a charred mesh).

## 3. Tech Requirements for "AAA++"
- **Physics Geometry:** Simplified collision hulls for every part to keep Chaos calculations fast.
- **LODs:** Even with Nanite, we need distance-based texture streaming to keep memory low in 16-player matches.
- **Audio Assets:** 5 unique engine loops, 10 unique weapon firing sounds, 50 impact sounds.

## 4. AI-Assisted Asset Production
- **Prompt:** *"Use the current Master Material to generate 5 variants of a 2x4 Steel Plate with varying degrees of rust and bullet holes."*
- **Prompt:** *"Generate a LOD-0 and LOD-1 for a rusted V12 engine block with 10 connection sockets."*
