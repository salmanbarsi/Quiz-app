import { BrowserRouter,  Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Quizguide from './components/Quizguide';
import Qusetionans from './components/Qusetionans';
import Result from './components/Result';
import Error from './components/Error';
import { QueryClientProvider,QueryClient } from '@tanstack/react-query';

function App() {
  const queryclint = new QueryClient();
  return (
    <>
    <QueryClientProvider client={queryclint}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Quizguide" element={<Quizguide />} />
        <Route path="/Qusetionans/:category/:difficulty" element={<Qusetionans />} />
        <Route path="/Qusetionans/Result/:scoreper" element={<Result />} />
        <Route path="*" element={<Error />} />
        <Route path="../src/components/Error.tsx" element={<Error />} />
      </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    </>
  );
}

export default App;
