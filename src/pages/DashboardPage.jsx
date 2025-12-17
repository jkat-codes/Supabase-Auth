import { useAuth } from "../hooks/UseAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export function DashboardPage() {
  const {profile, signOut} = useAuth(); 
  
  const navigate = useNavigate(); 

  function handleGoToTransactions() {
    navigate('/transactions'); 
  }
  
  return (
    <div className="">
      <h1>Dashboard</h1>
      <p>Welcome, {profile?.display_name || 'User'}</p>
      <p>Role: {profile?.role}</p>
      <button onClick={signOut}>Sign Out</button>
      <button onClick={handleGoToTransactions}>Transactions</button>
    </div>
  )
}
