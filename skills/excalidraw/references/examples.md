# Layout Patterns & Examples

## Layout Patterns

### Vertical Flow (Top-Down)

Best for: API request flows, data pipelines, deployment stacks.

```
       [Users]           y: 100
          |
    [API Gateway]        y: 250
      /       \
  [Svc A]  [Svc B]      y: 400
      \       /
     [Database]          y: 550
```

**Spacing:**
- Row gap: 130-150px
- Column gap: 200-220px
- Element size: 180x80

### Horizontal Flow (Left-Right)

Best for: data pipelines, ETL processes, CI/CD.

```
[Source] → [Transform] → [Load] → [Store]
  x:100      x:350        x:600    x:850
```

### Hub-and-Spoke

Best for: microservices with central orchestrator.

```
              [Svc A]
                |
  [Svc B] ← [Gateway] → [Svc C]
                |
              [Svc D]
```

**Center:** x:400, y:350
**Spokes:** 200px offset in each direction

### Layered Architecture

Best for: MVC, clean architecture, OSI model.

```
┌─────────────────────────┐
│  Presentation Layer      │  y: 100, height: 120
├─────────────────────────┤
│  Business Logic Layer    │  y: 250, height: 120
├─────────────────────────┤
│  Data Access Layer       │  y: 400, height: 120
└─────────────────────────┘
```

Use grouping rectangles (dashed) for each layer.

## Minimal Complete Example

3-node diagram: User → API → Database

```json
{
  "type": "excalidraw",
  "version": 2,
  "source": "claude-code",
  "elements": [
    {
      "id": "user",
      "type": "ellipse",
      "x": 350, "y": 80,
      "width": 100, "height": 60,
      "angle": 0,
      "strokeColor": "#1971c2",
      "backgroundColor": "#e7f5ff",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": { "type": 2 },
      "seed": 1001,
      "version": 1,
      "versionNonce": 1001,
      "isDeleted": false,
      "boundElements": [
        { "type": "text", "id": "user-text" },
        { "type": "arrow", "id": "arrow-user-api" }
      ],
      "updated": 1700000000000,
      "link": null,
      "locked": false
    },
    {
      "id": "user-text",
      "type": "text",
      "x": 375, "y": 97,
      "width": 50, "height": 25,
      "angle": 0,
      "strokeColor": "#1e1e1e",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 2001,
      "version": 1,
      "versionNonce": 2001,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1700000000000,
      "link": null,
      "locked": false,
      "text": "User",
      "fontSize": 16,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "containerId": "user",
      "originalText": "User",
      "autoResize": true,
      "lineHeight": 1.25
    },
    {
      "id": "api",
      "type": "rectangle",
      "x": 310, "y": 230,
      "width": 180, "height": 80,
      "angle": 0,
      "strokeColor": "#7048e8",
      "backgroundColor": "#d0bfff",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": { "type": 3 },
      "seed": 1002,
      "version": 1,
      "versionNonce": 1002,
      "isDeleted": false,
      "boundElements": [
        { "type": "text", "id": "api-text" },
        { "type": "arrow", "id": "arrow-user-api" },
        { "type": "arrow", "id": "arrow-api-db" }
      ],
      "updated": 1700000000000,
      "link": null,
      "locked": false
    },
    {
      "id": "api-text",
      "type": "text",
      "x": 355, "y": 257,
      "width": 90, "height": 25,
      "angle": 0,
      "strokeColor": "#1e1e1e",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 2002,
      "version": 1,
      "versionNonce": 2002,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1700000000000,
      "link": null,
      "locked": false,
      "text": "API Server",
      "fontSize": 16,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "containerId": "api",
      "originalText": "API Server",
      "autoResize": true,
      "lineHeight": 1.25
    },
    {
      "id": "db",
      "type": "rectangle",
      "x": 310, "y": 400,
      "width": 180, "height": 80,
      "angle": 0,
      "strokeColor": "#2f9e44",
      "backgroundColor": "#b2f2bb",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": { "type": 3 },
      "seed": 1003,
      "version": 1,
      "versionNonce": 1003,
      "isDeleted": false,
      "boundElements": [
        { "type": "text", "id": "db-text" },
        { "type": "arrow", "id": "arrow-api-db" }
      ],
      "updated": 1700000000000,
      "link": null,
      "locked": false
    },
    {
      "id": "db-text",
      "type": "text",
      "x": 355, "y": 427,
      "width": 90, "height": 25,
      "angle": 0,
      "strokeColor": "#1e1e1e",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 2003,
      "version": 1,
      "versionNonce": 2003,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1700000000000,
      "link": null,
      "locked": false,
      "text": "PostgreSQL",
      "fontSize": 16,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "containerId": "db",
      "originalText": "PostgreSQL",
      "autoResize": true,
      "lineHeight": 1.25
    },
    {
      "id": "arrow-user-api",
      "type": "arrow",
      "x": 400, "y": 140,
      "width": 0, "height": 90,
      "angle": 0,
      "strokeColor": "#7048e8",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "strokeStyle": "solid",
      "roughness": 0,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "elbowed": true,
      "seed": 3001,
      "version": 1,
      "versionNonce": 3001,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1700000000000,
      "link": null,
      "locked": false,
      "points": [[0, 0], [0, 90]],
      "startBinding": { "elementId": "user", "focus": 0, "gap": 5 },
      "endBinding": { "elementId": "api", "focus": 0, "gap": 5 },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "arrow-api-db",
      "type": "arrow",
      "x": 400, "y": 310,
      "width": 0, "height": 90,
      "angle": 0,
      "strokeColor": "#2f9e44",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "strokeStyle": "solid",
      "roughness": 0,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "elbowed": true,
      "seed": 3002,
      "version": 1,
      "versionNonce": 3002,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1700000000000,
      "link": null,
      "locked": false,
      "points": [[0, 0], [0, 90]],
      "startBinding": { "elementId": "api", "focus": 0, "gap": 5 },
      "endBinding": { "elementId": "db", "focus": 0, "gap": 5 },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    }
  ],
  "appState": {
    "gridSize": 20,
    "viewBackgroundColor": "#ffffff"
  },
  "files": {}
}
```

## Size Guidelines

| Diagram Size | Elements | Canvas |
|-------------|----------|--------|
| Small (3-5 nodes) | 180x80 shapes | 800x600 |
| Medium (6-12 nodes) | 160x70 shapes | 1200x900 |
| Large (13-25 nodes) | 140x60 shapes | 1600x1200 |

## Spacing Cheat Sheet

| Between | Gap |
|---------|-----|
| Rows (vertical) | 130-150px |
| Columns (horizontal) | 200-220px |
| Shape and label text | Centered in shape |
| Arrow gap from shape | 5px |
| Group boundary padding | 30px |
