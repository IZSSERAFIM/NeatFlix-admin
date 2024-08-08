import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminDashboard from './page/home';
import LoginPage from './page/login';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<AdminDashboard />} />
        <Route path="/*" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
