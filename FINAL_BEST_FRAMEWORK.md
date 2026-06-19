# THE "CARS & CANNONS" MASTER FRAMEWORK

This is the "Fun-First" iteration of our UE 5.8 development strategy. We are making a competitive PvP game about building the most badass car with the biggest guns.

## 1. The Core Loop: Build -> Battle -> Scrap
1. **Build:** Infinite combinations of blocks, frames, and weapons.
2. **Battle:** High-speed 5v5 or FFA matches in grimy wasteland arenas.
3. **Scrap:** Earn currency to unlock bigger guns and weirder parts.

## 2. Streamlined Action Streams (For the 2-Person Team)

### Stream A: "The Mechanical Heart"
- Focus: Making the car driving feel "snappy" and the turrets feel "powerful."
- Goal: Create a standard `BP_Vehicle_Base` that handles resizing without breaking the fun.

### Stream B: "The Grimy Wasteland"
- Focus: Mad Max aesthetic. Rust, scrap, and dust.
- Goal: Use PCG to make arenas that look AAA+++ but are optimized for 60fps combat.

### Stream C: "The Matchmaker"
- Focus: Getting players into games and saving their custom builds.
- Goal: A clean, easy-to-use Garage UI and stable server networking.

## 3. Simplified MCP Workflow
The AI (Claude) is your "Technical Assistant."
- **Task:** *"Claude, add a swivel-turret to this Cabin and make sure it auto-aims at the nearest Target Drone."*
- **Task:** *"Claude, make this engine sound louder and more 'growly' as the car speeds up."*

## 4. The Competitive Standard
- **Power Score (PS):** The only stat that matters for matchmaking. Each gun and block adds to the PS.
- **Fair Play:** No "impossible" physics. If it has 4 wheels and a motor, it drives. If it has a gun, it shoots.
