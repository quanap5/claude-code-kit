/**
 * Unit tests for TabTable component
 */

import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import { TabTable } from './tabtable';
import type { TabConfig, TabTableData } from './tabtable.types';

expect.extend(toHaveNoViolations);

// Test data
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

const mockUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' }
];

const mockProducts: Product[] = [
  { id: 1, name: 'Laptop', price: 999, stock: 10 },
  { id: 2, name: 'Mouse', price: 29, stock: 50 },
  { id: 3, name: 'Keyboard', price: 79, stock: 30 }
];

const mockTabs: TabConfig[] = [
  { id: 'users', label: 'Users', icon: '👤' },
  { id: 'products', label: 'Products', icon: '📦' },
  { id: 'disabled', label: 'Disabled', disabled: true }
];

const mockTablesData: TabTableData<User | Product>[] = [
  {
    tabId: 'users',
    columns: [
      { id: 'name', header: 'Name', accessor: 'name', sortable: true },
      { id: 'email', header: 'Email', accessor: 'email', sortable: true },
      { id: 'role', header: 'Role', accessor: 'role', align: 'center' }
    ],
    data: mockUsers
  },
  {
    tabId: 'products',
    columns: [
      { id: 'name', header: 'Product', accessor: 'name' },
      {
        id: 'price',
        header: 'Price',
        accessor: 'price',
        cell: (value) => `$${value}`,
        align: 'right'
      },
      { id: 'stock', header: 'Stock', accessor: 'stock', align: 'right' }
    ],
    data: mockProducts
  }
];

describe('TabTable', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<TabTable tabs={mockTabs} tablesData={mockTablesData} />);
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('renders all tabs', () => {
      render(<TabTable tabs={mockTabs} tablesData={mockTablesData} />);

      expect(screen.getByRole('tab', { name: /users/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /products/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /disabled/i })).toBeInTheDocument();
    });

    it('renders tab icons', () => {
      render(<TabTable tabs={mockTabs} tablesData={mockTablesData} />);

      const usersTab = screen.getByRole('tab', { name: /users/i });
      expect(usersTab).toHaveTextContent('👤');
    });

    it('renders table with correct columns', () => {
      render(<TabTable tabs={mockTabs} tablesData={mockTablesData} />);

      expect(screen.getByRole('columnheader', { name: /name/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /email/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /role/i })).toBeInTheDocument();
    });

    it('renders table data correctly', () => {
      render(<TabTable tabs={mockTabs} tablesData={mockTablesData} />);

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('Admin')).toBeInTheDocument();
    });

    it('marks first tab as active by default', () => {
      render(<TabTable tabs={mockTabs} tablesData={mockTablesData} />);

      const usersTab = screen.getByRole('tab', { name: /users/i });
      expect(usersTab).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('Tab Switching', () => {
    it('switches tabs on click', async () => {
      const user = userEvent.setup();
      render(<TabTable tabs={mockTabs} tablesData={mockTablesData} />);

      const productsTab = screen.getByRole('tab', { name: /products/i });
      await user.click(productsTab);

      expect(productsTab).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Laptop')).toBeInTheDocument();
    });

    it('calls onTabChange callback when tab is clicked', async () => {
      const user = userEvent.setup();
      const onTabChange = jest.fn();
      render(
        <TabTable
          tabs={mockTabs}
          tablesData={mockTablesData}
          onTabChange={onTabChange}
        />
      );

      const productsTab = screen.getByRole('tab', { name: /products/i });
      await user.click(productsTab);

      expect(onTabChange).toHaveBeenCalledWith('products');
    });

    it('does not switch to disabled tab', async () => {
      const user = userEvent.setup();
      const onTabChange = jest.fn();
      render(
        <TabTable
          tabs={mockTabs}
          tablesData={mockTablesData}
          onTabChange={onTabChange}
        />
      );

      const disabledTab = screen.getByRole('tab', { name: /disabled/i });
      await user.click(disabledTab);

      expect(onTabChange).not.toHaveBeenCalled();
      expect(disabledTab).toHaveAttribute('aria-selected', 'false');
    });

    it('respects controlled activeTabId prop', () => {
      render(
        <TabTable
          tabs={mockTabs}
          tablesData={mockTablesData}
          activeTabId="products"
        />
      );

      const productsTab = screen.getByRole('tab', { name: /products/i });
      expect(productsTab).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Laptop')).toBeInTheDocument();
    });
  });

  describe('Row Interaction', () => {
    it('calls onRowClick when row is clicked', async () => {
      const user = userEvent.setup();
      const onRowClick = jest.fn();
      render(
        <TabTable
          tabs={mockTabs}
          tablesData={mockTablesData}
          onRowClick={onRowClick}
        />
      );

      const row = screen.getByText('John Doe').closest('tr');
      await user.click(row!);

      expect(onRowClick).toHaveBeenCalledWith(mockUsers[0], 'users');
    });

    it('handles keyboard navigation on rows', async () => {
      const user = userEvent.setup();
      const onRowClick = jest.fn();
      render(
        <TabTable
          tabs={mockTabs}
          tablesData={mockTablesData}
          onRowClick={onRowClick}
        />
      );

      const row = screen.getByText('John Doe').closest('tr');
      row?.focus();
      await user.keyboard('{Enter}');

      expect(onRowClick).toHaveBeenCalledWith(mockUsers[0], 'users');
    });
  });

  describe('Sorting', () => {
    it('sorts data when column header is clicked', async () => {
      const user = userEvent.setup();
      render(
        <TabTable
          tabs={mockTabs}
          tablesData={mockTablesData}
          sortable={true}
        />
      );

      const nameHeader = screen.getByRole('columnheader', { name: /name/i });
      await user.click(nameHeader);

      const rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent('Bob Johnson');
    });

    it('toggles sort direction on repeated clicks', async () => {
      const user = userEvent.setup();
      render(
        <TabTable
          tabs={mockTabs}
          tablesData={mockTablesData}
          sortable={true}
        />
      );

      const nameHeader = screen.getByRole('columnheader', { name: /name/i });

      await user.click(nameHeader);
      expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');

      await user.click(nameHeader);
      expect(nameHeader).toHaveAttribute('aria-sort', 'descending');

      await user.click(nameHeader);
      expect(nameHeader).toHaveAttribute('aria-sort', 'none');
    });

    it('calls onSortChange callback', async () => {
      const user = userEvent.setup();
      const onSortChange = jest.fn();
      render(
        <TabTable
          tabs={mockTabs}
          tablesData={mockTablesData}
          sortable={true}
          onSortChange={onSortChange}
        />
      );

      const nameHeader = screen.getByRole('columnheader', { name: /name/i });
      await user.click(nameHeader);

      expect(onSortChange).toHaveBeenCalledWith('users', {
        columnId: 'name',
        direction: 'asc'
      });
    });
  });

  describe('Loading and Empty States', () => {
    it('displays loading state', () => {
      render(
        <TabTable
          tabs={mockTabs}
          tablesData={mockTablesData}
          loading={true}
        />
      );

      expect(screen.getByRole('status')).toHaveTextContent(/loading/i);
    });

    it('displays custom loading component', () => {
      render(
        <TabTable
          tabs={mockTabs}
          tablesData={mockTablesData}
          loading={true}
          loadingComponent={<div>Custom Loading...</div>}
        />
      );

      expect(screen.getByText('Custom Loading...')).toBeInTheDocument();
    });

    it('displays empty state when no data', () => {
      render(
        <TabTable
          tabs={mockTabs}
          tablesData={[
            { tabId: 'users', columns: mockTablesData[0].columns, data: [] }
          ]}
        />
      );

      expect(screen.getByText(/no data available/i)).toBeInTheDocument();
    });

    it('displays custom empty component', () => {
      render(
        <TabTable
          tabs={mockTabs}
          tablesData={[
            { tabId: 'users', columns: mockTablesData[0].columns, data: [] }
          ]}
          emptyComponent={<div>No items found</div>}
        />
      );

      expect(screen.getByText('No items found')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('displays error state', () => {
      render(
        <TabTable
          tabs={mockTabs}
          tablesData={mockTablesData}
          error="Something went wrong"
        />
      );

      expect(screen.getByRole('alert')).toHaveTextContent(/something went wrong/i);
    });

    it('displays custom error component', () => {
      render(
        <TabTable
          tabs={mockTabs}
          tablesData={mockTablesData}
          error="Error occurred"
          errorComponent={<div role="alert">Custom Error</div>}
        />
      );

      expect(screen.getByText('Custom Error')).toBeInTheDocument();
    });
  });

  describe('Custom Cell Rendering', () => {
    it('renders custom cell content', async () => {
      const user = userEvent.setup();
      render(<TabTable tabs={mockTabs} tablesData={mockTablesData} />);

      const productsTab = screen.getByRole('tab', { name: /products/i });
      await user.click(productsTab);

      expect(screen.getByText('$999')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <TabTable tabs={mockTabs} tablesData={mockTablesData} />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper ARIA attributes', () => {
      render(<TabTable tabs={mockTabs} tablesData={mockTablesData} />);

      expect(screen.getByRole('region')).toHaveAttribute('aria-label');
      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    });

    it('manages focus correctly', async () => {
      const user = userEvent.setup();
      render(<TabTable tabs={mockTabs} tablesData={mockTablesData} />);

      const usersTab = screen.getByRole('tab', { name: /users/i });
      const productsTab = screen.getByRole('tab', { name: /products/i });

      expect(usersTab).toHaveAttribute('tabindex', '0');
      expect(productsTab).toHaveAttribute('tabindex', '-1');

      await user.click(productsTab);

      expect(usersTab).toHaveAttribute('tabindex', '-1');
      expect(productsTab).toHaveAttribute('tabindex', '0');
    });
  });
});
