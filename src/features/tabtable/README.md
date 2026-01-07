# TabTable Component

A powerful React component that combines tabbed navigation with data tables. Each tab displays its own table with configurable columns, sorting, and custom rendering.

## Features

- **Tabbed Navigation**: Switch between multiple data tables
- **Sortable Columns**: Built-in sorting with customizable behavior
- **Custom Rendering**: Custom cell renderers and formatters
- **Accessibility**: Full ARIA support and keyboard navigation
- **Responsive**: Mobile-friendly with overflow handling
- **TypeScript**: Fully typed with comprehensive type definitions
- **Error Handling**: Built-in error boundary and error states
- **Loading States**: Customizable loading and empty state components
- **Row Interaction**: Click handlers with keyboard support

## Installation

```bash
# The component is already part of this project
# Import from the features directory
import { TabTable } from '@/features/tabtable';
```

## Basic Usage

```tsx
import { TabTable } from '@/features/tabtable';

const MyComponent = () => {
  const tabs = [
    { id: 'users', label: 'Users', icon: '👤' },
    { id: 'products', label: 'Products', icon: '📦' }
  ];

  const tablesData = [
    {
      tabId: 'users',
      columns: [
        { id: 'name', header: 'Name', accessor: 'name' },
        { id: 'email', header: 'Email', accessor: 'email' }
      ],
      data: users
    },
    {
      tabId: 'products',
      columns: [
        { id: 'name', header: 'Product', accessor: 'name' },
        { id: 'price', header: 'Price', accessor: 'price' }
      ],
      data: products
    }
  ];

  return <TabTable tabs={tabs} tablesData={tablesData} />;
};
```

## Props Documentation

### TabTableProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `TabConfig[]` | Required | Array of tab configurations |
| `tablesData` | `TabTableData[]` | Required | Array of table data for each tab |
| `activeTabId` | `string` | First tab | Currently active tab ID (controlled) |
| `onTabChange` | `(tabId: string) => void` | - | Callback when tab changes |
| `onRowClick` | `(row: T, tabId: string) => void` | - | Callback when row is clicked |
| `loading` | `boolean` | `false` | Show loading state |
| `loadingComponent` | `ReactNode` | Default spinner | Custom loading component |
| `emptyComponent` | `ReactNode` | Default message | Custom empty state component |
| `errorComponent` | `ReactNode` | Default error | Custom error component |
| `error` | `string \| null` | `null` | Error message to display |
| `className` | `string` | - | Additional CSS class |
| `sortable` | `boolean` | `false` | Enable sorting |
| `onSortChange` | `(tabId: string, sort: SortConfig \| null) => void` | - | Callback when sort changes |
| `ariaLabel` | `string` | 'Tabbed data tables' | ARIA label for component |

### TabConfig

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | ✓ | Unique tab identifier |
| `label` | `string` | ✓ | Display label |
| `icon` | `ReactNode` | - | Optional icon |
| `disabled` | `boolean` | - | Disable tab |

### ColumnConfig

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | ✓ | Unique column identifier |
| `header` | `string` | ✓ | Column header text |
| `accessor` | `keyof T \| (row: T) => any` | ✓ | Data accessor |
| `cell` | `(value: any, row: T) => ReactNode` | - | Custom cell renderer |
| `width` | `string` | - | Column width (CSS) |
| `sortable` | `boolean` | - | Override sortable setting |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Content alignment |

### TabTableData

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `tabId` | `string` | ✓ | Tab identifier |
| `data` | `T[]` | ✓ | Array of data rows |
| `columns` | `ColumnConfig<T>[]` | ✓ | Column configuration |

## Advanced Examples

### Custom Cell Rendering

```tsx
const columns = [
  {
    id: 'price',
    header: 'Price',
    accessor: 'price',
    cell: (value) => `$${value.toFixed(2)}`,
    align: 'right'
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (value) => (
      <Badge color={value === 'active' ? 'green' : 'red'}>
        {value}
      </Badge>
    )
  }
];
```

### Sortable Tables

```tsx
const [sortConfig, setSortConfig] = useState<Map<string, SortConfig | null>>(
  new Map()
);

<TabTable
  tabs={tabs}
  tablesData={tablesData}
  sortable={true}
  onSortChange={(tabId, sort) => {
    console.log(`Tab ${tabId} sorted by ${sort?.columnId} ${sort?.direction}`);
  }}
/>
```

### Controlled Tab State

```tsx
const [activeTab, setActiveTab] = useState('users');

<TabTable
  tabs={tabs}
  tablesData={tablesData}
  activeTabId={activeTab}
  onTabChange={setActiveTab}
/>
```

### Row Click Handling

```tsx
<TabTable
  tabs={tabs}
  tablesData={tablesData}
  onRowClick={(row, tabId) => {
    console.log('Clicked row:', row);
    console.log('In tab:', tabId);
    // Navigate to detail page, open modal, etc.
  }}
/>
```

### Custom Loading State

```tsx
<TabTable
  tabs={tabs}
  tablesData={tablesData}
  loading={isLoading}
  loadingComponent={
    <div style={{ padding: '48px', textAlign: 'center' }}>
      <Spinner size="large" />
      <p>Loading your data...</p>
    </div>
  }
/>
```

### Error Handling

```tsx
<TabTable
  tabs={tabs}
  tablesData={tablesData}
  error={errorMessage}
  errorComponent={
    <div role="alert">
      <h3>Failed to load data</h3>
      <p>{errorMessage}</p>
      <button onClick={retry}>Retry</button>
    </div>
  }
/>
```

### Function Accessors

```tsx
const columns = [
  {
    id: 'fullName',
    header: 'Full Name',
    accessor: (row) => `${row.firstName} ${row.lastName}`
  },
  {
    id: 'age',
    header: 'Age',
    accessor: (row) => new Date().getFullYear() - row.birthYear
  }
];
```

## Styling

The component uses styled-components with CSS variables for theming:

```css
:root {
  --background-primary: #ffffff;
  --background-secondary: #f5f5f5;
  --background-hover: rgba(0, 0, 0, 0.04);
  --border-color: #e0e0e0;
  --text-primary: #212121;
  --text-secondary: #757575;
  --text-disabled: #9e9e9e;
  --accent-color: #1976d2;
  --focus-color: #1976d2;
  --error-color: #d32f2f;
  --scrollbar-thumb: #c0c0c0;
}
```

### Custom Styling

```tsx
import { TabTableContainer } from '@/features/tabtable';
import styled from 'styled-components';

const CustomTabTable = styled(TabTableContainer)`
  border: 2px solid blue;
  border-radius: 16px;
`;

<TabTable className="my-custom-class" {...props} />
```

## Accessibility

The component follows WAI-ARIA best practices:

- **Keyboard Navigation**: Full keyboard support with Tab, Enter, Space
- **ARIA Attributes**: Proper roles, labels, and states
- **Focus Management**: Logical tab order and focus indicators
- **Screen Reader Support**: Meaningful labels and announcements

### Keyboard Shortcuts

- `Tab`: Navigate between interactive elements
- `Enter` or `Space`: Activate tab or clickable row
- `Arrow Keys`: Navigate within tab list (recommended pattern)

## Performance Considerations

- **Memoization**: Component uses `useMemo` for expensive operations
- **Virtual Scrolling**: Consider adding for large datasets (>1000 rows)
- **Lazy Loading**: Implement pagination for very large datasets
- **Controlled Sorting**: Handle sorting externally for better performance

## Testing

The component includes comprehensive tests:

```bash
# Run tests
npm test tabtable.test.tsx

# Run with coverage
npm test -- --coverage tabtable.test.tsx
```

Test coverage includes:
- ✓ Rendering and basic functionality
- ✓ Tab switching and interaction
- ✓ Row click handling
- ✓ Sorting functionality
- ✓ Loading and empty states
- ✓ Error handling
- ✓ Custom cell rendering
- ✓ Accessibility compliance (axe-core)

## Known Limitations

1. **No Built-in Pagination**: Implement pagination externally if needed
2. **No Virtual Scrolling**: Performance may degrade with >1000 rows per table
3. **No Column Resizing**: Columns use fixed widths only
4. **No Row Selection**: Implement selection state externally
5. **No Filtering**: Implement filtering logic externally
6. **No Export**: Implement data export functionality externally
7. **Single-level Tabs**: Does not support nested tab groups

## Future Enhancements

Potential improvements for future versions:

- [ ] Built-in pagination support
- [ ] Virtual scrolling for large datasets
- [ ] Column resizing and reordering
- [ ] Row selection with checkboxes
- [ ] Built-in filtering UI
- [ ] CSV/Excel export functionality
- [ ] Column visibility toggles
- [ ] Responsive mobile view (card layout)
- [ ] Sticky headers
- [ ] Expandable rows

## Contributing

When modifying this component:

1. Update TypeScript types in `tabtable.types.ts`
2. Add comprehensive tests in `tabtable.test.tsx`
3. Update this README with new features
4. Ensure accessibility compliance
5. Follow the existing code style

## License

Part of the claude-code-kit project.
