import React, { FC } from 'react';
import './App.css';

import Example, { ExampleHello, ExampleWithPreset, ExampleGoodbye } from "./Example";

const App: FC = () => {
  return (
    <div className="App">
      <Example bindings={({ text: "provided" })} />
      <ExampleHello />
      <ExampleWithPreset preset="hello" />
      <ExampleGoodbye bindings={({ text: "boof" })} />
      <ExampleGoodbye bindings={({})} />
      <ExampleGoodbye />
    </div>
  );
}

export default App;
