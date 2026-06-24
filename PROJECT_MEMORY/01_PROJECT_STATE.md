# 🧠 01_PROJECT_STATE.md: Persistent Project Memory

This is the living document that tracks the current state of the project. Every agent must read this before starting a task.

## 1. Current High-Level Goals
- [ ] Bootstrap the UE 5.8 C++ Vehicle Template.
- [ ] Implement the base "Scrap Attachment" socket logic.
- [ ] Create a vertical slice of the "Iron Flats" biome.

## 2. Current Systems Status
- **Physics**: Unreal-Native Chaos (Baseline configured).
- **Building**: Data-driven structure defined (`dev_docs/25`).
- **Combat**: Turret logic specced (`dev_docs/26`).
- **Networking**: Not started.

## 3. Known Constraints
- Target 60 FPS on mid-range hardware.
- Limit of 100 modular parts per vehicle for initial PvP tests.

## 4. Active Risks & Technical Debt
- **Risk**: High part counts causing physics sub-stepping lag.
- **Debt**: Placeholder meshes for "Junk" parts need Nanite optimization.

## 5. Last Agent Action
- *Action*: Framework Synthesis and Onboarding Suite creation.
- *Status*: Complete.
- *Date*: Current.
