import ErrorBoundary from './ErrorBoundary';
import TodoApp from './components/TodoApp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoApp />} />
          <Route path="/active" element={<TodoApp />} />
          <Route path="/completed" element={<TodoApp />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
