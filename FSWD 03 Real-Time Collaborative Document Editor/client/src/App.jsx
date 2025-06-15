import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NewDocument from './pages/NewDocument';
import TextEditor from './pages/TextEditor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/new" />} />
        <Route path="/new" element={<NewDocument />} />
        <Route path="/doc/:id" element={<TextEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
