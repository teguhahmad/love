import React from 'react';
import { LoveCalculator } from './components/LoveCalculator';
import { BackgroundHearts } from './components/BackgroundHearts';

function App() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center py-12 px-4 relative overflow-hidden">
      <BackgroundHearts />
      <main className="w-full max-w-md z-10">
        <LoveCalculator />
      </main>
    </div>
  );
}

export default App;