/**
 * Styled components for TabTable
 */

import styled from 'styled-components';

export const TabTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: var(--background-primary, #ffffff);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const TabList = styled.div`
  display: flex;
  gap: 4px;
  padding: 8px 16px 0;
  background: var(--background-secondary, #f5f5f5);
  border-bottom: 2px solid var(--border-color, #e0e0e0);
  overflow-x: auto;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb, #c0c0c0);
    border-radius: 2px;
  }
`;

export const Tab = styled.button<{ $active: boolean; $disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 8px 8px 0 0;
  background: ${props => props.$active
    ? 'var(--background-primary, #ffffff)'
    : 'transparent'};
  color: ${props => props.$disabled
    ? 'var(--text-disabled, #9e9e9e)'
    : props.$active
      ? 'var(--text-primary, #212121)'
      : 'var(--text-secondary, #757575)'};
  font-size: 14px;
  font-weight: ${props => props.$active ? '600' : '400'};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  white-space: nowrap;
  position: relative;

  ${props => props.$active && `
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--accent-color, #1976d2);
    }
  `}

  &:hover:not(:disabled) {
    background: ${props => props.$active
      ? 'var(--background-primary, #ffffff)'
      : 'var(--background-hover, rgba(0, 0, 0, 0.04))'};
  }

  &:focus-visible {
    outline: 2px solid var(--focus-color, #1976d2);
    outline-offset: -2px;
  }
`;

export const TabIcon = styled.span`
  display: flex;
  align-items: center;
  font-size: 18px;
`;

export const TableContainer = styled.div`
  flex: 1;
  overflow: auto;
  padding: 16px;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb, #c0c0c0);
    border-radius: 4px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

export const TableHead = styled.thead`
  background: var(--background-secondary, #f5f5f5);
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const TableRow = styled.tr<{ $clickable?: boolean }>`
  border-bottom: 1px solid var(--border-color, #e0e0e0);
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  transition: background-color 0.2s ease;

  &:hover {
    background: ${props => props.$clickable
      ? 'var(--background-hover, rgba(0, 0, 0, 0.04))'
      : 'transparent'};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const TableHeader = styled.th<{ $align?: 'left' | 'center' | 'right'; $sortable?: boolean }>`
  padding: 12px 16px;
  text-align: ${props => props.$align || 'left'};
  font-weight: 600;
  color: var(--text-primary, #212121);
  cursor: ${props => props.$sortable ? 'pointer' : 'default'};
  user-select: none;
  white-space: nowrap;

  &:hover {
    background: ${props => props.$sortable
      ? 'var(--background-hover, rgba(0, 0, 0, 0.04))'
      : 'transparent'};
  }
`;

export const TableCell = styled.td<{ $align?: 'left' | 'center' | 'right' }>`
  padding: 12px 16px;
  text-align: ${props => props.$align || 'left'};
  color: var(--text-secondary, #757575);
`;

export const SortIndicator = styled.span<{ $direction?: 'asc' | 'desc' }>`
  display: inline-block;
  margin-left: 8px;
  font-size: 12px;
  color: var(--accent-color, #1976d2);

  ${props => props.$direction === 'asc' && `
    &::after {
      content: '↑';
    }
  `}

  ${props => props.$direction === 'desc' && `
    &::after {
      content: '↓';
    }
  `}
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  color: var(--text-secondary, #757575);
`;

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  color: var(--text-secondary, #757575);
  text-align: center;
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  color: var(--error-color, #d32f2f);
  text-align: center;
`;
