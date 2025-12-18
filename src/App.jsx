import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'; 
import { useAuth } from './hooks/UseAuth'; 
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage'; 


// Already logged in, we need profile and ability to sign out

/**
 * Routes requiring user auth beforehand, redirects back to login otherwise
 * 
 * @param {*} param0 
 * @returns component children if user is authenticated
 */
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

/**
 * Routes not requiring user auth beforehand
 * 
 * @param {*} param0 
 * @returns login component for user to authenticate themselves
 */
function PublicRoute({ children }) {
  const {user, loading} = useAuth(); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  // Already signed in -> reroute to dashboard
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
