# PNG/SVG Export via Playwright

## Overview

Export `.excalidraw` files to PNG and SVG using Playwright MCP tools and `@excalidraw/utils`.

**Requires:** Playwright MCP tools available in the session.

## Export Procedure

### Step 1: Create Export Script

Write a temporary HTML file that loads `@excalidraw/utils` from CDN:

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import { exportToSvg, exportToBlob } from 
      'https://esm.sh/@excalidraw/utils@0.1.2';
    window.exportToSvg = exportToSvg;
    window.exportToBlob = exportToBlob;
    window.READY = true;
  </script>
</head>
<body><div id="status">Loading...</div></body>
</html>
```

### Step 2: Navigate Browser

```
browser_navigate → file:///path/to/export.html
```

Wait for `window.READY === true`.

### Step 3: Load Excalidraw Data

```javascript
// Read the .excalidraw file content
const data = JSON.parse(EXCALIDRAW_JSON_STRING);
window.excalidrawData = data;
```

### Step 4: Export to SVG

```javascript
const svg = await window.exportToSvg({
  elements: window.excalidrawData.elements,
  appState: {
    ...window.excalidrawData.appState,
    exportWithDarkMode: false,
    exportBackground: true,
  },
  files: window.excalidrawData.files || {},
});
// Get SVG string
const svgString = new XMLSerializer().serializeToString(svg);
document.getElementById('status').textContent = svgString;
```

Read the SVG string from the page and write to `.svg` file.

### Step 5: Export to PNG

```javascript
const blob = await window.exportToBlob({
  elements: window.excalidrawData.elements,
  appState: {
    ...window.excalidrawData.appState,
    exportWithDarkMode: false,
    exportBackground: true,
  },
  files: window.excalidrawData.files || {},
  getDimensions: () => ({ width: 1920, height: 1080, scale: 2 }),
});

// Convert to base64
const reader = new FileReader();
reader.onload = () => {
  document.getElementById('status').textContent = reader.result;
};
reader.readAsDataURL(blob);
```

Read the base64 data URL and decode to `.png` file.

### Step 6: Cleanup

```
browser_close
```

Delete the temporary HTML file.

## Alternative: CLI Export

If Playwright MCP tools are not available, suggest the user install `@excalidraw/cli`:

```bash
npx @excalidraw/cli export --format svg input.excalidraw -o output.svg
npx @excalidraw/cli export --format png input.excalidraw -o output.png
```

## Alternative: Manual Export

If neither method is available, instruct user:
1. Open `.excalidraw` in https://excalidraw.com
2. Menu → Export Image
3. Choose PNG or SVG
4. Download

## Output Files

```
docs/architecture/
├── system-architecture.excalidraw    # Source (always created)
├── system-architecture.svg           # Vector export (optional)
└── system-architecture.png           # Raster export (optional)
```

## Export Options

| Option | Default | Description |
|--------|---------|-------------|
| Format | svg | svg, png, or both |
| Background | true | Include white background |
| Dark mode | false | Dark theme export |
| Scale | 2 | PNG resolution multiplier |
| Width | auto | Override canvas width |
| Height | auto | Override canvas height |
