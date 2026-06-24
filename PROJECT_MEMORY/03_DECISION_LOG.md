# 📜 03_DECISION_LOG.md: Architectural Decision Record (ADR)

This log tracks why the project is built the way it is.

## Decision Log

### ADR-001: Fun-First Physics vs. Realistic Simulation
- **Status**: Accepted.
- **Reasoning**: Two-person team needs to prioritize gameplay "Juice" and arcade feel. Unreal-native Chaos is sufficient.
- **Impact**: Removes need for custom sub-stepping math.

### ADR-002: C++ Hybrid Foundation
- **Status**: Accepted.
- **Reasoning**: Allows AI agents to create custom MCP bridges while keeping human workflow in Blueprints.
- **Impact**: Increases initial bootstrap complexity but provides long-term flexibility.

### ADR-003: Minecraft-style Modular Sockets
- **Status**: Accepted.
- **Reasoning**: Enables "Infinite combinations" using standard Unreal socket/attachment logic.
- **Impact**: Requires a strict naming convention for meshes (`dev_docs/26`).
