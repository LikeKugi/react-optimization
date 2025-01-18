import { Unoptimized } from './unoptimized/Unoptimized';
import { Optimized } from './optimized/Optimized';
import { useState } from 'react';

function App() {

  const [view, setView] = useState<'task' | 'completed'>('task');

  return (
    <main className="main">
      <header>
        <button onClick={() => setView('task')} disabled={view === 'task'}>Task</button>
        <button onClick={() => setView('completed')} disabled={view === 'completed'}>Completed</button>
      </header>
      <h1>{view === 'task' ? 'Unoptimized' : 'Optimized'}</h1>
      {view === 'task' && <Unoptimized/>}
      {view === 'completed' && <Optimized/>}
    </main>
  );
}

export default App;
