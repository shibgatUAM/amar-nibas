import React from 'react';
import { Button } from './components/ui/button';

const App = () => {
  return (
    <div>
      <h1 className="font-extrabold text-indigo-700 text-5xl">Shibgat</h1>
      <Button variant="outline" className="bg-indigo-600 text-white">
        Click me
      </Button>
    </div>
  );
};

export default App;
