# 🏗️ 03_TECHNICAL_ARCHITECTURE.md: Consolidated Core

The technical foundation for "Cars & Cannons" leverages Unreal's native strengths with a modular, data-driven approach.

## 1. The Engine Foundation
- **Version**: UE 5.8 (C++ Project for MCP capability).
- **Template**: Wheeled Vehicle (Chaos).
- **Primary Systems**: Nanite, Lumen, Substrate, World Partition.

## 2. Modular Building (Minecraft-style)
- **Data-Driven**: Every part is defined by a Data Asset (`FModularPart` struct).
- **Attachment**: Standard Unreal Socket-to-Socket snapping.
- **Serialization**: Saved as JSON strings in standard SaveGame objects.

## 3. The "Fun-First" Physics
- **Preset**: Standard Chaos Vehicle preset.
- **Classes**: Light, Medium, Heavy (configured via Torque/Suspension settings).
- **Limits**: 100 parts per vehicle (initial budget).

## 4. Combat & Turrets
- **Components**: `UAimableTurret` for auto-aim and manual tracking.
- **Damage**: Collision-based part detachment using Chaos Destruction.
- **VFX**: Niagara smoke, sparks, and fire trails.
