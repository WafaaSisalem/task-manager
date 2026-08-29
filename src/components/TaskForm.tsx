import { useState, type FormEvent } from 'react';

interface TaskFormProps {
  onAddTask: (text: string) => void;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text.trim());
      setText('');
    }
  };

  return (
    <form id="add-task-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="What needs to be done?" 
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}
