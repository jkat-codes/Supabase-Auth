import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'; 
import { useAuth } from './hooks/UseAuth'; 
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage'; 


// Already logged in, we need profile and ability to sign out

// Protects routes that require authentication
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth(); 

  console.log("Protected Route Check: ", {user, loading});

  if (loading) {
    console.log("Loading...");
    return <div className="">Loading...</div>; 
  }

  if (!user) {
    return <Navigate to="/login" replace></Navigate>
  }

  return children; 
}

// Redirects to dashboard if user is already signed in
function PublicRoute({ children }) {
  const {user, loading} = useAuth(); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (user) {
    return <Navigate to="/" replace></Navigate>; 
  }

  return children; 
}

function App() {
  return (
    <Routes>
      <Route path="/login"
      element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      <Route path="/"
      element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      }/>
    </Routes>
  )
}

export default App; 
