/**
 * TabTable Component
 *
 * A compound component that combines tabbed navigation with data tables.
 * Each tab displays its own table with configurable columns and data.
 *
 * @example
 * ```tsx
 * <TabTable
 *   tabs={[
 *     { id: 'users', label: 'Users' },
 *     { id: 'products', label: 'Products' }
 *   ]}
 *   tablesData={[
 *     {
 *       tabId: 'users',
 *       columns: [
 *         { id: 'name', header: 'Name', accessor: 'name' },
 *         { id: 'email', header: 'Email', accessor: 'email' }
 *       ],
 *       data: users
 *     }
 *   ]}
 * />
 * ```
 */

import React, { useState, useMemo, useCallback, ErrorInfo } from 'react';
import type {
  TabTableProps,
  TabConfig,
  TabTableData,
  SortConfig,
  ColumnConfig
} from './tabtable.types';
import * as S from './tabtable.styles';

/**
 * Error Boundary for TabTable
 */
class TabTableErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('TabTable Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <S.ErrorContainer role="alert">
          <strong>Something went wrong</strong>
          <p>{this.state.error?.message || 'Unknown error'}</p>
        </S.ErrorContainer>
      );
    }

    return this.props.children;
  }
}

/**
 * Default loading component
 */
const DefaultLoading: React.FC = () => (
  <S.LoadingContainer role="status" aria-live="polite">
    <span>Loading...</span>
  </S.LoadingContainer>
);

/**
 * Default empty state component
 */
const DefaultEmpty: React.FC = () => (
  <S.EmptyContainer role="status">
    <span>No data available</span>
  </S.EmptyContainer>
);

/**
 * Main TabTable Component
 */
export const TabTable = <T extends Record<string, any>>({
  tabs,
  tablesData,
  activeTabId,
  onTabChange,
  onRowClick,
  loading = false,
  loadingComponent,
  emptyComponent,
  errorComponent,
  error = null,
  className,
  sortable = false,
  onSortChange,
  ariaLabel = 'Tabbed data tables'
}: TabTableProps<T>) => {
  // State management
  const [internalActiveTab, setInternalActiveTab] = useState<string>(
    activeTabId || tabs[0]?.id || ''
  );
  const [sortConfigs, setSortConfigs] = useState<Map<string, SortConfig | null>>(
    new Map()
  );

  const currentActiveTab = activeTabId || internalActiveTab;

  // Get current tab's data
  const currentTableData = useMemo(
    () => tablesData.find(td => td.tabId === currentActiveTab),
    [tablesData, currentActiveTab]
  );

  // Handle tab change
  const handleTabChange = useCallback(
    (tabId: string) => {
      const tab = tabs.find(t => t.id === tabId);
      if (tab?.disabled) return;

      setInternalActiveTab(tabId);
      onTabChange?.(tabId);
    },
    [tabs, onTabChange]
  );

  // Handle sort
  const handleSort = useCallback(
    (columnId: string) => {
      if (!sortable) return;

      const currentSort = sortConfigs.get(currentActiveTab);
      let newSort: SortConfig | null = null;

      if (!currentSort || currentSort.columnId !== columnId) {
        newSort = { columnId, direction: 'asc' };
      } else if (currentSort.direction === 'asc') {
        newSort = { columnId, direction: 'desc' };
      } else {
        newSort = null;
      }

      const newSortConfigs = new Map(sortConfigs);
      newSortConfigs.set(currentActiveTab, newSort);
      setSortConfigs(newSortConfigs);
      onSortChange?.(currentActiveTab, newSort);
    },
    [sortable, sortConfigs, currentActiveTab, onSortChange]
  );

  // Sort data
  const sortedData = useMemo(() => {
    if (!currentTableData || !sortable) return currentTableData?.data || [];

    const sortConfig = sortConfigs.get(currentActiveTab);
    if (!sortConfig) return currentTableData.data;

    const column = currentTableData.columns.find(col => col.id === sortConfig.columnId);
    if (!column) return currentTableData.data;

    const sorted = [...currentTableData.data].sort((a, b) => {
      const aValue = typeof column.accessor === 'function'
        ? column.accessor(a)
        : a[column.accessor];
      const bValue = typeof column.accessor === 'function'
        ? column.accessor(b)
        : b[column.accessor];

      if (aValue === bValue) return 0;

      const comparison = aValue > bValue ? 1 : -1;
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [currentTableData, sortable, sortConfigs, currentActiveTab]);

  // Get cell value
  const getCellValue = useCallback(
    (row: T, column: ColumnConfig<T>) => {
      const value = typeof column.accessor === 'function'
        ? column.accessor(row)
        : row[column.accessor as keyof T];

      return column.cell ? column.cell(value, row) : value;
    },
    []
  );

  // Render error state
  if (error) {
    return (
      <TabTableErrorBoundary fallback={errorComponent}>
        <S.TabTableContainer className={className}>
          <S.ErrorContainer role="alert">
            <strong>Error</strong>
            <p>{error}</p>
          </S.ErrorContainer>
        </S.TabTableContainer>
      </TabTableErrorBoundary>
    );
  }

  // Render loading state
  if (loading) {
    return (
      <TabTableErrorBoundary>
        <S.TabTableContainer className={className}>
          {loadingComponent || <DefaultLoading />}
        </S.TabTableContainer>
      </TabTableErrorBoundary>
    );
  }

  return (
    <TabTableErrorBoundary>
      <S.TabTableContainer className={className} role="region" aria-label={ariaLabel}>
        {/* Tab List */}
        <S.TabList role="tablist" aria-label="Data tables">
          {tabs.map(tab => (
            <S.Tab
              key={tab.id}
              role="tab"
              aria-selected={currentActiveTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              aria-disabled={tab.disabled}
              id={`tab-${tab.id}`}
              $active={currentActiveTab === tab.id}
              $disabled={tab.disabled}
              disabled={tab.disabled}
              onClick={() => handleTabChange(tab.id)}
              tabIndex={currentActiveTab === tab.id ? 0 : -1}
            >
              {tab.icon && <S.TabIcon>{tab.icon}</S.TabIcon>}
              {tab.label}
            </S.Tab>
          ))}
        </S.TabList>

        {/* Table Content */}
        <S.TableContainer
          role="tabpanel"
          id={`tabpanel-${currentActiveTab}`}
          aria-labelledby={`tab-${currentActiveTab}`}
        >
          {!currentTableData || sortedData.length === 0 ? (
            emptyComponent || <DefaultEmpty />
          ) : (
            <S.Table role="table">
              <S.TableHead>
                <S.TableRow>
                  {currentTableData.columns.map(column => (
                    <S.TableHeader
                      key={column.id}
                      $align={column.align}
                      $sortable={sortable && column.sortable !== false}
                      onClick={() =>
                        sortable && column.sortable !== false && handleSort(column.id)
                      }
                      role="columnheader"
                      aria-sort={
                        sortable && sortConfigs.get(currentActiveTab)?.columnId === column.id
                          ? sortConfigs.get(currentActiveTab)?.direction === 'asc'
                            ? 'ascending'
                            : 'descending'
                          : 'none'
                      }
                    >
                      {column.header}
                      {sortable && column.sortable !== false && (
                        <S.SortIndicator
                          $direction={
                            sortConfigs.get(currentActiveTab)?.columnId === column.id
                              ? sortConfigs.get(currentActiveTab)?.direction
                              : undefined
                          }
                        />
                      )}
                    </S.TableHeader>
                  ))}
                </S.TableRow>
              </S.TableHead>
              <tbody>
                {sortedData.map((row, rowIndex) => (
                  <S.TableRow
                    key={rowIndex}
                    $clickable={!!onRowClick}
                    onClick={() => onRowClick?.(row, currentActiveTab)}
                    role="row"
                    tabIndex={onRowClick ? 0 : undefined}
                    onKeyDown={(e) => {
                      if (onRowClick && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        onRowClick(row, currentActiveTab);
                      }
                    }}
                  >
                    {currentTableData.columns.map(column => (
                      <S.TableCell
                        key={column.id}
                        $align={column.align}
                        role="cell"
                      >
                        {getCellValue(row, column)}
                      </S.TableCell>
                    ))}
                  </S.TableRow>
                ))}
              </tbody>
            </S.Table>
          )}
        </S.TableContainer>
      </S.TabTableContainer>
    </TabTableErrorBoundary>
  );
};

export default TabTable;
