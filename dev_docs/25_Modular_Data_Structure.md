# Technical Spec: The Modular Block Data Structure

To ensure the "Minecraft-style" building works without you writing manual code, we use a **Data-Driven Architecture**.

## 1. The `FModularPart` Struct
Every block in the game is defined by this structure. Claude can use the `Sync_Vehicle_Physics` tool to update this in the engine.

| Property | Type | Description |
| :--- | :--- | :--- |
| `PartID` | Name | Unique ID (e.g., `Armor_Plate_2x2`). |
| `Mesh` | StaticMesh | The Nanite-enabled visual model. |
| `SocketType` | Enum | Determines what can attach (e.g., Small, Large, Weapon-Mount). |
| `WeightClass` | Enum | Light, Med, Heavy (for arcade physics). |
| `Durability` | Float | Health points of the part. |
| `PowerScore` | Int | Impact on matchmaking. |

## 2. The Attachment Logic (Sockets)
- **Parent-Child Relationship:** Every vehicle starts with a **Cabin**. Every other part is a child of the Cabin or another part.
- **Socket Snapping:** Parts have "Male" and "Female" sockets. When a part is dragged near a valid socket, it snaps to the location and rotation.
- **AI Task:** *"Claude, generate a CSV file with 50 variations of this Struct for different rusted metal blocks."*

## 3. Serialization (Saving the Build)
We save vehicles as a **JSON String**.
- **Format:** `[ {PartID: X, RelativePos: Y, RelativeRot: Z, Scale: S}, ... ]`
- This makes it extremely easy to share builds in the "Blueprint Gallery" or sync them over the network.
