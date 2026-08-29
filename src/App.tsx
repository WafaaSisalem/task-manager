import React, { useState, useEffect } from 'react';
import type { Task, FilterType } from './types.ts';
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskFilter } from './components/TaskFilter';
import { ChartSummary } from './components/ChartSummary';

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTasks() {
      try {
        const response = await fetch('https://dummyjson.com/todos?limit=5');
        if (!response.ok) throw new Error('Failed to fetch tasks');

        const data = await response.json();
        const mappedTasks = data.todos.map((t: any) => ({
          id: t.id,
          todo: t.todo,
          completed: t.completed
        }));

        setTasks(mappedTasks);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    loadTasks();
  }, []); // Empty array means this only runs once when the app starts

  const addTask = (todo: string) => {
    const newTask: Task = {
      id: Date.now(), // Generate a unique ID
      todo,
      completed: false
    };
    // Spread operator puts the new task at the top, just like we fixed earlier!
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Derive the filtered list
  const filteredTasks = tasks.filter(task => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Pending') return !task.completed;
    return true; // 'All'
  });

  return (
    <React.Fragment>
      <Header />
      <main className="app-layout">
        <div className="main-content">

          <TaskForm onAddTask={addTask} />

          <TaskFilter
            currentFilter={filter}
            onFilterChange={setFilter}
          />

          {isLoading && <p style={{ textAlign: 'center' }}>Loading tasks...</p>}
          {error && <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>}

          {!isLoading && !error && (
            <TaskList
              tasks={filteredTasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          )}
        </div>

        <aside className="sidebar">
          <ChartSummary 
            total={tasks.length} 
            completed={tasks.filter(t => t.completed).length} 
          />
        </aside>
      </main>
    </React.Fragment>
  );
}
