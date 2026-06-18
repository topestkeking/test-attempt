# "Cars & Cannons" Physics: The Fun-First Approach

In our game, physics serves the **Gameplay**, not the other way around. We aren't building a simulator; we're building a high-octane PvP arena where cars with gun turrets blow each other up.

## 1. The "Arcade-Competitive" Model
Instead of literal mass calculations, we use **Weight Classes**:
- **Light:** Fast, fragile, high acceleration. (e.g., Buggies)
- **Medium:** Balanced, the "standard" combat vehicle.
- **Heavy:** Slow, tank-like, can carry the biggest guns.

## 2. Scaling for Fun
When a player resizes a part:
- **Don't** worry about cubic mass laws.
- **Do** adjust the part's health and its "Weight Class Impact."
- **Center of Mass (CoM):** Keep the CoM artificially low for all vehicles. This prevents frustrating rollovers and keeps the focus on driving and shooting.

## 3. The Chaos Vehicle Setup
- **Suspension:** Set to "Stiff & Responsive." We want the cars to feel grounded but capable of huge jumps.
- **Tire Friction:** High grip on most surfaces. Drifting should be a conscious player choice, not a constant struggle.
- **Simplified Aero:** Constant top speed caps based on Engine power, ignoring complex drag math.

## 4. Competitive Combat Physics
- **Impact Impulses:** When a cannon hits a car, it should *push* the car. This adds "Juice" and allows for tactical knockbacks.
- **Part Detachment:** Parts fly off with exaggerated velocity when destroyed. It should look spectacular.
- **Fixed Turret Stability:** Weapons do not affect vehicle physics when they rotate or fire, unless we explicitly want a "Recoil" mechanic for heavy cannons.

## 5. AI Prompting for Feel
*"Adjust the vehicle's turn rate to feel snappier. Increase the tire friction by 20% and lower the center of mass so it feels like it's glued to the road during high-speed combat."*
