import { Toaster } from 'sonner';
import HomePage from './pages/HomePage.jsx';
import NotFound from './pages/NotFound.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
