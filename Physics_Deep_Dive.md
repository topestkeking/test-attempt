# Technical Deep-Dive: Physics of Modular Freeform Vehicles

Handling "Minecraft-style" building in a competitive physics game like *Crossout* requires a sophisticated approach to mass, balance, and the Chaos Vehicle solver.

## 1. The Core Architecture: The "Compound Body"

In UE 5.8, we do not want 200 separate actors simulating physics. Instead:
1. **The Cabin is the Root:** All parts are attached to the Cabin.
2. **Merge on Build:** When the player leaves the "Garage," we merge all static parts into a single **Physics Body**.
3. **Chaos Clusters:** Use Chaos Clustering to allow parts to break off. When a part's health reaches zero, it is "un-clustered" and becomes its own physics actor (scrap).

## 2. Dynamic Scaling & Inertia Tensors

Since you want **Resizing**, we must recalculate the vehicle's physical properties at runtime:

### Mass Calculation
- Each part has a `BaseMass`.
- `PartMass = BaseMass * (Scale.X * Scale.Y * Scale.Z)`.
- `TotalMass = Sum(PartMass)`.

### Center of Mass (CoM)
- This is the most critical factor for "Competitive Feel."
- **Calculation:** `CoM = Sum(PartMass * LocalOffset) / TotalMass`.
- **Gameplay Effect:** If the CoM is too high, the vehicle will flip in turns. If it's too far back, the front wheels will lose traction.

### Inertia Tensor
- The Inertia Tensor defines how hard it is to rotate the vehicle.
- Scaling a part up increases its inertia significantly.
- **AI Task:** Ask the MCP AI to *"Recalculate the Inertia Tensor for the current BP_Vehicle_Base based on its component bounds."*

## 3. The "Chaos Vehicle" Constraint

The Chaos Vehicle component expects a specific bone structure. For a modular game:
- **Virtual Bones:** We must dynamically assign "Wheels" to the Chaos Vehicle component.
- **Suspension Tuning:** Scaling a vehicle up requires increasing the `SuspensionMaxForce`. If you double the size/mass, the springs must be twice as stiff.

## 4. Competitive Balance (The "Meta")

To keep it fair:
- **Drag Coefficient:** Larger vehicles should have higher aerodynamic drag.
- **Power-to-Weight Ratio:** The Engine provides a fixed `Torque`. As players add more armor (mass), the top speed and acceleration must decrease linearly.
- **Scaling Limits:** We should cap resizing to prevent "Invisible" (too small) or "Map-Breaking" (too large) vehicles.

## 5. Network Reconciliation

- **The Server is the Source of Truth:** The server calculates the "Clustered Physics."
- **Client Prediction:** The client predicts where the vehicle *should* be. If a part falls off, the client might show it a frame early, but the server confirms the "Detachment" event.
- **Bandwidth Optimization:** Do not replicate the scale of every part every frame. Scale is only sent once during the "Vehicle Load" phase.
