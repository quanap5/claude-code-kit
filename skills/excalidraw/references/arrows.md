# Arrow Routing Reference

## Arrow Element Structure

```json
{
  "id": "arrow-api-db",
  "type": "arrow",
  "x": 490,
  "y": 285,
  "width": 200,
  "height": 145,
  "strokeColor": "#2f9e44",
  "backgroundColor": "transparent",
  "fillStyle": "solid",
  "strokeWidth": 2,
  "strokeStyle": "solid",
  "roughness": 0,
  "roundness": null,
  "elbowed": true,
  "points": [[0, 0], [0, 145]],
  "startBinding": { "elementId": "svc-api", "focus": 0, "gap": 5 },
  "endBinding": { "elementId": "db-postgres", "focus": 0, "gap": 5 },
  "startArrowhead": null,
  "endArrowhead": "arrow"
}
```

## Critical Properties

| Property | Value | Purpose |
|----------|-------|---------|
| `roughness` | `0` | Clean lines |
| `roundness` | `null` | Sharp corners |
| `elbowed` | `true` | 90-degree routing |
| `startArrowhead` | `null` | No arrowhead at source |
| `endArrowhead` | `"arrow"` | Arrow at target |

## Edge Point Calculations

Arrow `x,y` = starting point on source shape edge.

### From Bottom Edge
```
arrow.x = shape.x + shape.width/2
arrow.y = shape.y + shape.height
```

### From Right Edge
```
arrow.x = shape.x + shape.width
arrow.y = shape.y + shape.height/2
```

### From Top Edge
```
arrow.x = shape.x + shape.width/2
arrow.y = shape.y
```

### From Left Edge
```
arrow.x = shape.x
arrow.y = shape.y + shape.height/2
```

## Points Array Patterns

Points are relative offsets from arrow `x,y`. First point is always `[0,0]`.

### Straight Down
```json
"points": [[0, 0], [0, 130]]
```
`width: 0, height: 130`

### Straight Right
```json
"points": [[0, 0], [200, 0]]
```
`width: 200, height: 0`

### L-Shape (Down then Right)
```json
"points": [[0, 0], [0, 60], [200, 60]]
```
`width: 200, height: 60`

### L-Shape (Right then Down)
```json
"points": [[0, 0], [200, 0], [200, 130]]
```
`width: 200, height: 130`

### L-Shape (Left then Down)
```json
"points": [[0, 0], [-200, 0], [-200, 130]]
```
`width: 200, height: 130`

### Z-Shape (Down, Right, Down)
```json
"points": [[0, 0], [0, 50], [200, 50], [200, 130]]
```
`width: 200, height: 130`

### U-Turn (Right, Up, Left)
```json
"points": [[0, 0], [50, 0], [50, -120], [-20, -120]]
```

## Width/Height Calculation

Arrow `width` and `height` = bounding box of all points:
```
width  = max(points.x) - min(points.x)
height = max(points.y) - min(points.y)
```

Example: `points [[0,0], [-325,0], [-325,125]]`
- width = 0 - (-325) = 325
- height = 125 - 0 = 125

## Staggering Multiple Arrows

When multiple arrows leave the same edge, stagger their start positions:

### 2 arrows from bottom
```
Arrow 1: x = shape.x + shape.width * 0.35
Arrow 2: x = shape.x + shape.width * 0.65
```

### 3 arrows from bottom
```
Arrow 1: x = shape.x + shape.width * 0.25
Arrow 2: x = shape.x + shape.width * 0.50
Arrow 3: x = shape.x + shape.width * 0.75
```

### 5 arrows from bottom
```
Positions: 20%, 35%, 50%, 65%, 80% across width
```

## Binding

`startBinding` and `endBinding` reference connected shapes:

```json
"startBinding": {
  "elementId": "source-shape-id",
  "focus": 0,
  "gap": 5
}
```

- `focus`: -1 to 1, position along edge (0 = center)
- `gap`: pixels between arrow endpoint and shape edge

The bound shape must also reference the arrow in its `boundElements`:
```json
{
  "id": "source-shape-id",
  "boundElements": [
    { "type": "text", "id": "source-shape-id-text" },
    { "type": "arrow", "id": "arrow-source-target" }
  ]
}
```

## Arrow Color Convention

Match arrow stroke color to the **destination** component type:
- To database → `#2f9e44` (green)
- To API → `#7048e8` (purple)
- To frontend → `#1971c2` (blue)
- To external → `#e03131` (red)
