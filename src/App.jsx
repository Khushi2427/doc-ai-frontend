import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Home from './pages/Home'
import Plans from './pages/Plans'
import Dashboard from './pages/Dashboard'
import Feedback from './pages/Feedback'
import UserDashboard from "./pages/dashboard/UserDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import BusinessDashboard from "./pages/dashboard/BusinessDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuthStore } from "./store/authStore";
import Queries from './pages/Queries'
import Docs from './pages/Docs'
import Experience from './pages/Experience'
import Api from './pages/Api'
const App = () => {
  const { user } = useAuthStore();
  return (
    <div >
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api-key" element={<Api />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/queries" element={<Queries />} />
        <Route path="/experience" element={<Experience />} />
        <Route
          path="/feedback"
         element={<Feedback/>}/>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user", "admin", "business"]}>
              {user?.role === "user" && <UserDashboard />}
              {user?.role === "admin" && <AdminDashboard />}
              {user?.role === "business" && <BusinessDashboard />}
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div>404 Not Found</div>} />

      </Routes>
    </div>
  )
}

export default App
