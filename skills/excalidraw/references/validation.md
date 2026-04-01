# Validation Checklist & Bug Fixes

## Pre-Write Validation Algorithm

Run these checks before writing the `.excalidraw` file:

### 1. Label Binding Check
```
For each element where type = "rectangle" or "ellipse":
  If element should have a label:
    ASSERT boundElements contains { type: "text", id: "<id>-text" }
    ASSERT elements array contains text element with:
      - id = "<id>-text"
      - containerId = element.id
      - originalText matches text
```

### 2. No Diamond Check
```
For each element:
  ASSERT type != "diamond"
  If semantic meaning is "decision":
    Use rectangle with strokeStyle: "dashed", backgroundColor: "#ffd8a8"
```

### 3. Arrow Integrity Check
```
For each arrow element:
  ASSERT points[0] = [0, 0]
  ASSERT points.length >= 2
  If points.length > 2:
    ASSERT elbowed = true
    ASSERT roundness = null
    ASSERT roughness = 0
  ASSERT startBinding.elementId exists in elements
  ASSERT endBinding.elementId exists in elements
  
  # Verify source shape references this arrow
  source = find(elements, startBinding.elementId)
  ASSERT source.boundElements contains { type: "arrow", id: arrow.id }
  
  # Verify target shape references this arrow
  target = find(elements, endBinding.elementId)
  ASSERT target.boundElements contains { type: "arrow", id: arrow.id }
```

### 4. Edge Point Check
```
For each arrow:
  source = find(elements, startBinding.elementId)
  
  # Arrow x,y should be on source shape edge (±5px tolerance)
  ASSERT arrow.x is near source edge point
  ASSERT arrow.y is near source edge point
  
  # Final point should reach target edge
  target = find(elements, endBinding.elementId)
  final_x = arrow.x + points[-1][0]
  final_y = arrow.y + points[-1][1]
  ASSERT (final_x, final_y) is near target edge point
```

### 5. Unique ID Check
```
ids = collect all element.id values
ASSERT len(ids) == len(set(ids))  # No duplicates
```

### 6. Width/Height Check
```
For each arrow:
  xs = [p[0] for p in points]
  ys = [p[1] for p in points]
  expected_width = max(xs) - min(xs)
  expected_height = max(ys) - min(ys)
  ASSERT arrow.width == expected_width (or abs diff)
  ASSERT arrow.height == expected_height (or abs diff)
```

## Common Bugs & Fixes

### Labels Not Visible
**Symptom:** Shapes appear but text is missing.
**Cause:** Using `label` property instead of separate text element.
**Fix:**
```json
// WRONG - label property doesn't work
{ "id": "box", "type": "rectangle", "label": "My Text" }

// CORRECT - two elements
{ "id": "box", "type": "rectangle", 
  "boundElements": [{ "type": "text", "id": "box-text" }] }
{ "id": "box-text", "type": "text", "containerId": "box", "text": "My Text" }
```

### Arrows Curved Instead of Angular
**Symptom:** Arrows take smooth curves instead of 90° turns.
**Fix:** Add all three properties:
```json
{ "roughness": 0, "roundness": null, "elbowed": true }
```

### Arrows Floating in Space
**Symptom:** Arrows start/end at wrong positions.
**Cause:** Using shape center instead of edge for x,y.
**Fix:** Calculate edge point:
```
Bottom edge: (shape.x + shape.width/2, shape.y + shape.height)
Right edge:  (shape.x + shape.width, shape.y + shape.height/2)
```

### Arrows Overlapping
**Symptom:** Multiple arrows from same node stack on top of each other.
**Fix:** Stagger start positions across edge width:
```
2 arrows: 35%, 65% across edge
3 arrows: 25%, 50%, 75% across edge
```

### Text Clipped Inside Shape
**Symptom:** Long text gets cut off.
**Fix:** Either increase shape width or reduce fontSize:
```
Rule of thumb: shape.width >= text.length * fontSize * 0.6
```

### Diamond Shapes Broken
**Symptom:** Arrows don't connect to diamond corners properly.
**Fix:** Replace with styled rectangle:
```json
{
  "type": "rectangle",
  "strokeStyle": "dashed",
  "backgroundColor": "#ffd8a8",
  "strokeColor": "#e8590c"
}
```

## Post-Write Testing

1. Open file in https://excalidraw.com
2. Verify all labels visible
3. Verify arrows connect correctly
4. Verify no floating elements
5. Zoom to fit (`Ctrl+Shift+1`) and check layout balance
