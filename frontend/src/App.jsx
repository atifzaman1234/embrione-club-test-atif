import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Navbar from './components/Navbar';
import Teams from './teams';
import { Register } from './register';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/team" replace />} />
            <Route path="/team" element={<Teams />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
