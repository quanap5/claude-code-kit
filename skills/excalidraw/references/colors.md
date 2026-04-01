# Color Palettes Reference

## Default Palette

| Component | Background | Stroke | Text |
|-----------|------------|--------|------|
| Frontend | `#a5d8ff` | `#1971c2` | `#1e1e1e` |
| Backend/API | `#d0bfff` | `#7048e8` | `#1e1e1e` |
| Database | `#b2f2bb` | `#2f9e44` | `#1e1e1e` |
| Storage/S3 | `#ffec99` | `#f08c00` | `#1e1e1e` |
| AI/ML | `#e599f7` | `#9c36b5` | `#1e1e1e` |
| External APIs | `#ffc9c9` | `#e03131` | `#1e1e1e` |
| Orchestration | `#ffa8a8` | `#c92a2a` | `#1e1e1e` |
| Message Queue | `#fff3bf` | `#fab005` | `#1e1e1e` |
| Cache | `#ffe8cc` | `#fd7e14` | `#1e1e1e` |
| Users/Clients | `#e7f5ff` | `#1971c2` | `#1e1e1e` |
| Gateway/LB | `#d3f9d8` | `#37b24d` | `#1e1e1e` |
| Auth/Security | `#fcc2d7` | `#c2255c` | `#1e1e1e` |
| Monitoring | `#dee2e6` | `#495057` | `#1e1e1e` |

## AWS Palette

| Service | Background | Stroke |
|---------|------------|--------|
| Lambda | `#ffec99` | `#f08c00` |
| EC2 | `#ffe8cc` | `#fd7e14` |
| S3 | `#b2f2bb` | `#2f9e44` |
| RDS/DynamoDB | `#a5d8ff` | `#1971c2` |
| SQS/SNS | `#e599f7` | `#9c36b5` |
| API Gateway | `#d0bfff` | `#7048e8` |
| CloudFront | `#ffc9c9` | `#e03131` |
| ECS/EKS | `#ffe8cc` | `#fd7e14` |
| ElastiCache | `#96f2d7` | `#087f5b` |

## Azure Palette

| Service | Background | Stroke |
|---------|------------|--------|
| Functions | `#ffec99` | `#f08c00` |
| App Service | `#a5d8ff` | `#1971c2` |
| Blob Storage | `#b2f2bb` | `#2f9e44` |
| SQL/Cosmos | `#d0bfff` | `#7048e8` |
| Service Bus | `#e599f7` | `#9c36b5` |
| API Management | `#96f2d7` | `#087f5b` |
| AKS | `#ffe8cc` | `#fd7e14` |

## GCP Palette

| Service | Background | Stroke |
|---------|------------|--------|
| Cloud Functions | `#ffec99` | `#f08c00` |
| Cloud Run | `#a5d8ff` | `#1971c2` |
| Cloud Storage | `#b2f2bb` | `#2f9e44` |
| Cloud SQL/Firestore | `#d0bfff` | `#7048e8` |
| Pub/Sub | `#e599f7` | `#9c36b5` |
| GKE | `#ffe8cc` | `#fd7e14` |

## Kubernetes Palette

| Resource | Background | Stroke |
|----------|------------|--------|
| Pod | `#a5d8ff` | `#1971c2` |
| Service | `#d0bfff` | `#7048e8` |
| Deployment | `#b2f2bb` | `#2f9e44` |
| Ingress | `#ffc9c9` | `#e03131` |
| ConfigMap/Secret | `#ffec99` | `#f08c00` |
| PV/PVC | `#dee2e6` | `#495057` |
| Namespace boundary | `transparent` | `#868e96` (dashed) |

## SCADA/Industrial Palette

| Component | Background | Stroke |
|-----------|------------|--------|
| PLC/RTU | `#a5d8ff` | `#1971c2` |
| HMI/SCADA | `#d0bfff` | `#7048e8` |
| Sensor/Transmitter | `#b2f2bb` | `#2f9e44` |
| Actuator/Valve | `#ffec99` | `#f08c00` |
| Network/Switch | `#dee2e6` | `#495057` |
| Database/Historian | `#96f2d7` | `#087f5b` |
| Alarm/Safety | `#ffc9c9` | `#e03131` |
| OPC UA Server | `#e599f7` | `#9c36b5` |

## Grouping Boundaries

```json
{
  "strokeColor": "#868e96",
  "backgroundColor": "transparent",
  "strokeStyle": "dashed",
  "strokeWidth": 1,
  "opacity": 40
}
```

## Dark Theme (Alternative)

Set `appState.viewBackgroundColor: "#1e1e1e"` and use lighter stroke colors:
- Text: `#e0e0e0`
- Borders: Use lighter variants of stroke colors
- Backgrounds: Use darker variants with higher opacity
