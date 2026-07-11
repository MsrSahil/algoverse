import { Route, Routes } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout.jsx'
import ProtectedRoute from '../components/common/ProtectedRoute.jsx'

// Import pages
import Home from '../pages/Home/index.jsx'
import Login from '../pages/Login/index.jsx'
import Register from '../pages/Register/index.jsx'
import Dashboard from '../pages/Dashboard/index.jsx'
import Algorithms from '../pages/Algorithms/index.jsx'
import AlgorithmDetails from '../pages/AlgorithmDetails/index.jsx'
import Profile from '../pages/Profile/index.jsx'
import NotFound from '../pages/NotFound/index.jsx'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Public Routes - Accessible to anyone */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/algorithms" element={<Algorithms />} />
        <Route path="/algorithm/:slug" element={<AlgorithmDetails />} />

        {/* Protected Routes - Only accessible to logged-in users */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Catch-all 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes