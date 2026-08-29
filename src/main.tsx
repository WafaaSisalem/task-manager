import { createRoot } from 'react-dom/client';
import { App } from './App';
import './style.css';

// 1. Find the #app div in the HTML
const container = document.getElementById('app');

if (container) {
  // 2. Create a React Root
  const root = createRoot(container);

  // 3. Render our <App /> component into the root
  root.render(<App />);
}
