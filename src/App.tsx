import { useState } from 'react'
import Board from "./components/Board";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Kanban Board</h1>
      <Board />
    </div>
  );
}


export default App;