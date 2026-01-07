/**
 * Type definitions for the TabTable component
 */

/**
 * Configuration for a single tab in the TabTable
 */
export interface TabConfig {
  /** Unique identifier for the tab */
  id: string;
  /** Display label for the tab */
  label: string;
  /** Optional icon component or icon name */
  icon?: React.ReactNode;
  /** Whether the tab is disabled */
  disabled?: boolean;
}

/**
 * Configuration for table columns
 */
export interface ColumnConfig<T = any> {
  /** Unique identifier for the column */
  id: string;
  /** Column header label */
  header: string;
  /** Accessor function or key path to get cell value */
  accessor: keyof T | ((row: T) => any);
  /** Optional custom cell renderer */
  cell?: (value: any, row: T) => React.ReactNode;
  /** Column width (CSS value) */
  width?: string;
  /** Whether column is sortable */
  sortable?: boolean;
  /** Alignment of column content */
  align?: 'left' | 'center' | 'right';
}

/**
 * Data structure for each tab's table content
 */
export interface TabTableData<T = any> {
  /** Tab identifier matching TabConfig.id */
  tabId: string;
  /** Array of data rows for this tab's table */
  data: T[];
  /** Column configuration for this tab's table */
  columns: ColumnConfig<T>[];
}

/**
 * Sort configuration
 */
export interface SortConfig {
  /** Column ID being sorted */
  columnId: string;
  /** Sort direction */
  direction: 'asc' | 'desc';
}

/**
 * Props for the TabTable component
 */
export interface TabTableProps<T = any> {
  /** Array of tab configurations */
  tabs: TabConfig[];
  /** Array of table data for each tab */
  tablesData: TabTableData<T>[];
  /** Currently active tab ID */
  activeTabId?: string;
  /** Callback when tab changes */
  onTabChange?: (tabId: string) => void;
  /** Callback when row is clicked */
  onRowClick?: (row: T, tabId: string) => void;
  /** Whether to show loading state */
  loading?: boolean;
  /** Custom loading component */
  loadingComponent?: React.ReactNode;
  /** Custom empty state component */
  emptyComponent?: React.ReactNode;
  /** Custom error component */
  errorComponent?: React.ReactNode;
  /** Error message to display */
  error?: string | null;
  /** Additional CSS class name */
  className?: string;
  /** Whether tables are sortable */
  sortable?: boolean;
  /** Callback when sort changes */
  onSortChange?: (tabId: string, sortConfig: SortConfig | null) => void;
  /** ARIA label for the component */
  ariaLabel?: string;
}

/**
 * Internal state for TabTable component
 */
export interface TabTableState {
  /** Currently active tab ID */
  activeTab: string;
  /** Sort configuration per tab */
  sortConfigs: Map<string, SortConfig | null>;
}
