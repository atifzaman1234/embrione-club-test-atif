import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Navbar from './components/Navbar';
import Teams from './teams';
import { Register } from './register';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/team" replace />} />
            <Route path="/team" element={<Teams />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/login" element={<AdminLogin onLogin={() => setIsLoggedIn(true)} />} />
            <Route path="/admin" element={<AdminDashboard isAuthenticated={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
