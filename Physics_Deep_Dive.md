# Physics: Leveraging the Unreal Car Template

We are using the **Unreal Engine 5.8 Vehicle Template** as our foundation. We don't need custom physics code; we will simply configure what the engine already provides.

## 1. The Chaos Vehicle Component
Every vehicle in the game is an instance of the `WheeledVehiclePawn` class.
- **Physics:** Handled automatically by the **Chaos Vehicle Movement Component**.
- **The "Feel":** Adjusted via the standard `Torque Curve`, `Steering Curve`, and `Suspension` settings in the Blueprint editor.

## 2. Attaching "Junk" Parts
We use Unreal's built-in **Actor Attachment** system.
- **Parent:** The Vehicle Chassis (The Template car).
- **Children:** Refrigerator doors, stop signs, scrap metal blocks.
- **Logic:** `AttachActorToComponent` using standard sockets.

## 3. Handling Mass & Balance (Unreal Way)
Unreal Engine handles mass automatically based on the physics asset of the attached parts.
- **To Balance:** If the car is too heavy or tips over, we simply adjust the `Mass` override or the `Center of Mass Offset` in the vehicle's Details panel.
- **Resizing:** When we scale a part (e.g., a stop sign), Unreal automatically scales the **Collision Hull** and adjusts the mass accordingly.

## 4. Competitive Logic
Since we are using the engine-native physics:
- **Fair Play:** Use the built-in **Chaos Collision** events to determine when a part should break off.
- **Optimization:** Use **Nanite** for all junk parts so performance stays high even with 100+ attached objects.
