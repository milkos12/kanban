import logo from './logo.svg';
import './App.css';
import { Board } from './components/Board'
import { KanbanProvider } from './context/KanbanContext';

function App() {
  return (
    <KanbanProvider>
      <div className="App">
        <Board />
      </div>
    </KanbanProvider>

  );
}

export default App;
