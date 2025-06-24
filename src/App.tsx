// src/App.tsx

import { Board } from './components/Board';

function App() {
  // In future stories, we will manage gameState here using useState or useReducer
  
  return (
    <main className="bg-gray-100 min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-blue-700">అష్టా చమ్మా</h1>
      </div>
      <Board />
    </main>
  );
}

export default App;