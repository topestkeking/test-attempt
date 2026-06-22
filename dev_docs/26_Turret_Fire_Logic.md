# Technical Spec: Turret & Fire-Point Logic

Since the core gameplay is "Cars with Gun Turrets," we need a robust, automated system for aiming and firing.

## 1. The Turret Component (`UAimableTurret`)
A modular component that can be added to any part with a "Weapon-Mount" socket.

| Property | Default Value | Description |
| :--- | :--- | :--- |
| `RotationSpeed` | 45.0 | How fast the gun can track a target. |
| `PitchLimits` | [-10, 80] | Prevents the gun from shooting through the vehicle chassis. |
| `FireRate` | 0.5s | Time between shots. |
| `MuzzleSocket` | "Muzzle_01" | The exact point where projectiles spawn. |

## 2. Aiming Modes
1. **Manual:** The turret follows the player's crosshair.
2. **Auto-Aim (Bots/Modules):** The turret finds the nearest actor with a `Damageable` tag and tracks it.
3. **Smart Gimbal:** The gun only fires if it has a clear line of sight to the target (prevents friendly fire on your own car).

## 3. Weapon Naming Convention (For the 629 Assets)
To keep the library organized, all weapons must follow this naming pattern:
`WPN_[Tier]_[Type]_[Style]`
- *Example:* `WPN_T1_AutoCannon_Rusted`
- *Example:* `WPN_T3_PlasmaRay_Scavenger`

## 4. AI Task for Combat
- *"Claude, look at the `WPN_Base_Class`. Implement a Raycast from the `MuzzleSocket` to detect hits. If it hits an actor, apply damage based on the `Damage_Value` variable and spawn the 'Metal_Spark' Niagara effect."*
