# Excalidraw JSON Format Reference

## File Structure

```json
{
  "type": "excalidraw",
  "version": 2,
  "source": "claude-code",
  "elements": [],
  "appState": {
    "gridSize": 20,
    "viewBackgroundColor": "#ffffff"
  },
  "files": {}
}
```

## Required Properties (All Elements)

```json
{
  "id": "unique-string",
  "type": "rectangle|ellipse|text|arrow|line",
  "x": 100,
  "y": 200,
  "width": 180,
  "height": 80,
  "angle": 0,
  "strokeColor": "#1971c2",
  "backgroundColor": "#a5d8ff",
  "fillStyle": "solid",
  "strokeWidth": 2,
  "strokeStyle": "solid",
  "roughness": 1,
  "opacity": 100,
  "groupIds": [],
  "frameId": null,
  "roundness": { "type": 3 },
  "seed": 1001,
  "version": 1,
  "versionNonce": 1001,
  "isDeleted": false,
  "boundElements": null,
  "updated": 1700000000000,
  "link": null,
  "locked": false
}
```

## Rectangle (Shape)

```json
{
  "id": "svc-api",
  "type": "rectangle",
  "x": 300, "y": 200,
  "width": 180, "height": 80,
  "strokeColor": "#7048e8",
  "backgroundColor": "#d0bfff",
  "fillStyle": "solid",
  "strokeWidth": 2,
  "strokeStyle": "solid",
  "roughness": 1,
  "opacity": 100,
  "roundness": { "type": 3 },
  "boundElements": [
    { "type": "text", "id": "svc-api-text" }
  ]
}
```

## Text (Label Inside Shape)

```json
{
  "id": "svc-api-text",
  "type": "text",
  "x": 340, "y": 225,
  "width": 100, "height": 25,
  "text": "API Server",
  "fontSize": 16,
  "fontFamily": 1,
  "textAlign": "center",
  "verticalAlign": "middle",
  "strokeColor": "#1e1e1e",
  "backgroundColor": "transparent",
  "containerId": "svc-api",
  "originalText": "API Server",
  "autoResize": true,
  "lineHeight": 1.25
}
```

### Font Families
- `1` = Virgil (hand-drawn)
- `2` = Helvetica
- `3` = Cascadia (monospace)

## Ellipse

```json
{
  "id": "user-node",
  "type": "ellipse",
  "x": 350, "y": 50,
  "width": 100, "height": 60,
  "strokeColor": "#1971c2",
  "backgroundColor": "#e7f5ff",
  "roundness": { "type": 2 },
  "boundElements": [
    { "type": "text", "id": "user-node-text" }
  ]
}
```

## Standalone Text (Title, Annotation)

```json
{
  "id": "diagram-title",
  "type": "text",
  "x": 200, "y": 20,
  "width": 400, "height": 35,
  "text": "System Architecture",
  "fontSize": 28,
  "fontFamily": 1,
  "textAlign": "center",
  "verticalAlign": "top",
  "strokeColor": "#1e1e1e",
  "backgroundColor": "transparent",
  "containerId": null,
  "originalText": "System Architecture"
}
```

## Grouping Rectangle (Dashed Boundary)

```json
{
  "id": "group-backend",
  "type": "rectangle",
  "x": 80, "y": 350,
  "width": 600, "height": 200,
  "strokeColor": "#868e96",
  "backgroundColor": "transparent",
  "fillStyle": "solid",
  "strokeWidth": 1,
  "strokeStyle": "dashed",
  "roughness": 0,
  "opacity": 40,
  "roundness": { "type": 3 },
  "boundElements": null
}
```

## ID Generation

Use descriptive kebab-case IDs:
- Shapes: `svc-api`, `db-postgres`, `cache-redis`
- Text: `{shape-id}-text`
- Arrows: `arrow-{source}-{target}`
- Groups: `group-{name}`

## Seed Generation

Each element needs unique `seed` and `versionNonce`. Use incrementing integers:
- Shapes: 1001, 1002, 1003...
- Texts: 2001, 2002, 2003...
- Arrows: 3001, 3002, 3003...
