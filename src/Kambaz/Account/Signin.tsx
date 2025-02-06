// src/Kambaz/Account/Signin.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import '../styles.css';

export default function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await fetch('/api/auth/signin', { // Replace with your actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.role);

        navigate('/Kambaz/Dashboard'); // Redirect to the dashboard
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Sign-in failed');
        console.error('Sign-in error:', errorData);
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      alert('A network error occurred.');
    }
  };

  return (
    <div id="wd-signin-screen-container">
      <div id="wd-account-navigation">
        <Link to="/Kambaz/Account/Signin">Signin</Link>
        <Link to="/Kambaz/Account/Signup">Signup</Link>
        <Link to="/Kambaz/Account/Profile">Profile</Link>
        <Link to="/Kambaz/Dashboard">Dashboard</Link>
      </div>
      <div id="wd-signin-screen" className="p-4">
        <h1>Sign in</h1>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="username"
              className="wd-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="password"
              className="wd-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" className="w-100 mb-3" onClick={handleSignIn} id="wd-signin-btn">
            Sign in
          </Button>
          <div className="text-center">
            <Link to="/Kambaz/Account/Signup" id="wd-signup-link">
              Sign up
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}