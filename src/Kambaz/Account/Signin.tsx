//src/Kambaz/Account/Signin.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Hook for navigation

  const handleSignIn = async () => {
    try {
      const response = await fetch('/api/auth/signin', { // Your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store the token (or user data) in local storage or context
        localStorage.setItem('token', data.token); // Example: storing a token
        localStorage.setItem('userRole', data.role) // Example: storing a role

        // Redirect *after* successful sign-in
        navigate('/Kambaz/Dashboard'); // Or /profile, as needed
      } else {
        // Handle error (e.g., display error message)
        const errorData = await response.json();
        alert(errorData.message || 'Sign-in failed'); // Display error to the user.
        console.error('Sign-in error:', errorData); // Log the error for debugging.
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      alert('A network error occurred.'); // Display network error to the user.
    }
  };

  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      <input
        placeholder="username"
        className="wd-username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        placeholder="password"
        type="password"
        className="wd-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleSignIn} id="wd-signin-btn">Sign in</button> {/* Button for action */}
      <br />
      <Link to="/Kambaz/Account/Signup" id="wd-signup-link">Sign up</Link>
    </div>
  );
}