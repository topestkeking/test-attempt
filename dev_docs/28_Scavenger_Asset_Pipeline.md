# Scavenger Asset Pipeline: From Junk to Game-Ready

Our game is made of refrigerator doors, stop signs, and scrap. This pipeline ensures any 3D object can become a modular car part using standard Unreal tools.

## 1. Asset Preparation (Blender/3ds Max)
1. **Pivot Point:** Set the pivot to the center-back of the object (where it will "stick" to the car).
2. **Nanite:** Export as High-Poly. UE 5.8 will handle the geometry automatically.
3. **Collision:** Use standard `UCX_` collision hulls or generate them inside the Unreal Editor.

## 2. Unreal Editor Import
1. **Enable Nanite:** Check the Nanite box on import.
2. **Socket Creation:** Add a `Mount_Socket` to the mesh. This is the "Female" connection point.
3. **Materials:** Apply the "Grimy Substrate" master material.

## 3. The "Junk" Data Asset
Each piece of scrap needs a **Data Asset** so the game knows what it is:
- **Name:** "Stop Sign Armor"
- **Health:** 50 HP
- **Weight:** 5kg
- **Power Score:** 10

## 4. Resizing Logic
- We use the standard **Scale** tool.
- Unreal automatically scales the collision.
- The AI (Claude) can assist by adjusting the "Weight" in the Data Asset if the scale changes significantly (e.g., a 2x larger fridge door should probably be heavier).

## 5. AI Prompt for Assets
- *"Claude, take this 'Fridge_Door' static mesh. Create a Data Asset for it with 100 HP and a weight of 20kg. Assign it the 'Armor' tag."*
