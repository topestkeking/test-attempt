# Production Spec: Platform Deployment & Merging

For a 2-person team, keeping the project organized is a matter of survival.

## 1. Branch Management (Git)
- **Main:** The stable, playable build. Never push directly here.
- **Feature/Role:** Each of you works on a feature branch (e.g., `feat/cabin-physics`).
- **Claude-Sync:** A dedicated branch for AI-generated boilerplate to be reviewed before merging.

## 2. Large Asset Handling (Git LFS)
Unreal assets (`.uasset`) are binary.
- You **MUST** use Git LFS for all `.uasset`, `.umap`, and `.png` files.
- **Locking:** Enable "File Locking" so you don't edit the same Map at the same time.

## 3. Deployment Checklist (Launch Day)

### Steam / Epic Games Store (PC)
- [ ] **Achievements:** Integrate via the EOS (Epic Online Services) plugin.
- [ ] **Cloud Saves:** Ensure vehicle blueprints are synced to the player's account.
- [ ] **Anti-Cheat:** Enable EAC (Easy Anti-Cheat) for competitive PvP.

### Console (PS5/Xbox)
- [ ] **Gamepad Mapping:** Ensure "Build Mode" is intuitive with a controller.
- [ ] **Performance Profile:** Maintain 60 FPS using 5.8 HLODs and dynamic scaling.
- [ ] **Certification:** Ensure all "Legal" files from `dev_docs/20` are visible in the credits.

## 4. AI-Driven Maintenance
- *"Claude, run a project audit. Find any assets that aren't being used in a level and move them to the 'Legacy' folder to reduce project size."*
