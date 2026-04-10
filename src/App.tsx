import { useState } from 'react'
import Board from "./components/Board";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Kanban Board</h1>
      <Board />
    </div>
  );
}


export default App;