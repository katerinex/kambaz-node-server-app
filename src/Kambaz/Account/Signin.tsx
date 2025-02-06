// src/Kambaz/Account/Signin.tsx
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import React from 'react'; 
import '../styles.css'; // Import your CSS file

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <div className="wd-account-sidebar">
            <div className="wd-account-logo">
              <img src="/path/to/your/logo.png" alt="Logo" /> 
            </div>
            <ul className="list-unstyled">
              <li><Link to="/Kambaz/Account/Signin">Sign in</Link></li>
              <li><Link to="/Kambaz/Account/Signup">Sign up</Link></li>
              <li><Link to="/Kambaz/Account/Profile">Profile</Link></li>
              <li><Link to="/Kambaz/Account/Dashboard">Dashboard</Link></li>
            </ul>
          </div>
        </div>
        <div className="col-md-9">
          <div className="wd-signin-form">
            <h1>Sign in</h1>
            <Form>
              <Form.Control 
                id="wd-username"
                placeholder="username"
                className="mb-3" 
              />
              <Form.Control 
                id="wd-password"
                placeholder="password" 
                type="password"
                className="mb-3"
              />
              <button 
                id="wd-signin-btn"
                className="btn btn-primary w-100 mb-3" 
                type="submit"
              >
                Sign in
              </button>
            </Form>
            <Link id="wd-signup-link" to="/Kambaz/Account/Signup">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  ); 
}