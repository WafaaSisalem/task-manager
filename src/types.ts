export interface Task {
  id: number;
  todo: string;
  completed: boolean;
}

export type FilterType = 'All' | 'Pending' | 'Completed';
