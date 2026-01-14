// types.ts

export interface RowData {
  id: number;
  name: string;
  date: string;
  company: string;
  website: string;
  linkedin: string;
  email: string;
  status: 'found' | 'missing' | 'pending';
  isLoading?: boolean;
}

export interface Sheet {
  id: number;
  name: string;
}

export interface SortConfig {
  key: keyof RowData | null;
  direction: 'asc' | 'desc';
}

export interface VisibleColumns {
  name: boolean;
  date: boolean;
  company: boolean;
  website: boolean;
  linkedin: boolean;
  email: boolean;
}

export type FilterStatus = 'all' | 'found' | 'missing';
export type RunStatus = 'idle' | 'running' | 'stopped' | 'completed';