import type { FilterType } from '../types.ts';

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function TaskFilter({ currentFilter, onFilterChange }: TaskFilterProps) {
  // This component ONLY cares about filtering.
  // We removed the task counting logic that used to be in Summary!
  return (
    <div className="filter-container">
      <button 
        className={`filter-btn ${currentFilter === 'All' ? 'active' : ''}`}
        onClick={() => onFilterChange('All')}
      >
        All
      </button>

      <button 
        className={`filter-btn ${currentFilter === 'Pending' ? 'active' : ''}`}
        onClick={() => onFilterChange('Pending')}
      >
        Pending
      </button>

      <button 
        className={`filter-btn ${currentFilter === 'Completed' ? 'active' : ''}`}
        onClick={() => onFilterChange('Completed')}
      >
        Completed
      </button>
    </div>
  );
}
