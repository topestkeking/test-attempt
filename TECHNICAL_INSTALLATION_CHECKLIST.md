# 🛠️ TECHNICAL INSTALLATION CHECKLIST (Step -1)

Before you open Unreal Engine, you must ensure your environment is configured with the correct dependencies for a C++ UE 5.8 project with AI (MCP) integration.

---

## 1. Operating System & Core Runtimes
- **Windows 10/11 (64-bit):** Ensure you are fully updated.
- **Visual C++ Redistributables:** Install the latest "All-in-One" pack (2015-2022).
- **DirectX End-User Runtimes:** Ensure DX12 is supported by your GPU.

## 2. Visual Studio 2022 (Required for C++ Foundation)
Even if you work in Blueprints, the engine needs the VS compiler to handle the MCP bridges.
- **Version:** Visual Studio 2022 (Community, Professional, or Enterprise).
- **Workloads (Essential):**
    - [ ] **Game development with C++**
    - [ ] **Desktop development with C++**
- **Individual Components:**
    - [ ] **MSVC v143 - VS 2022 C++ x64/x86 build tools (Latest)**
    - [ ] **Windows 10 or 11 SDK (Latest)**
    - [ ] **Unreal Engine installer** (Inside the VS Installer)

## 3. Unreal Engine 5.8 (Epic Games Launcher)
- **Installation Components (Check these in the "Options" menu):**
    - [ ] **Engine Source** (Essential for Claude to read engine headers).
    - [ ] **Editor symbols for debugging** (Highly recommended for crash logs).
    - [ ] **Target Platforms:** Windows (and any others you intend to support).

## 4. AI & MCP Environment (The "Brain" Setup)
To allow Claude Code or other agents to talk to UE 5.8:
- **Node.js (LTS Version):** Required for running MCP client scripts.
- **Git & Git LFS:** Required for version control and handling large 3D assets.
- **Claude Code (MCP Client):** Installed via NPM (`npm install -g @anthropic-ai/claude-code`).

## 5. Additional Tools
- **Rider for Unreal (Optional but Highly Recommended):** Better C++/Blueprint integration than VS for many devs.
- **PlasticSCM or Perforce:** If you scale beyond 2 people for better large-file handling.

---

## ✅ The "Ready to Work" Test
1. Open a terminal and type `node -v` (Should return a version number).
2. Open Visual Studio 2022 and ensure no "Update" or "Repair" flags are visible.
3. Open Unreal Engine 5.8 and create a **Blank C++ Project**. If it compiles and opens, you are ready.

---
**Next Step:** Proceed to **[01_HUMAN_GUIDE.md](01_HUMAN_GUIDE.md)** to understand the workflow, then to **[PROJECT_BOOTSTRAP_GUIDE.md](PROJECT_BOOTSTRAP_GUIDE.md)** to create the actual game project.
