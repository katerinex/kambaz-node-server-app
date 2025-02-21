// src/Kambaz/Account/Signin.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import { users } from '../Database/users';
import NEU2Image from "/Users/katerineosorio/2025/spring/webdev/kambaz-react-web-app/src/assets/NEU2.jpg"; // Replace with your actual path

export default function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      // In a real app, you'd set up proper session management
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/Kambaz/Dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4} style={{ maxWidth: '400px' }}> {/* Add maxWidth to Col */}
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <img
                  src={NEU2Image}
                  alt="Northeastern University"
                  style={{ width: '200px' }}
                />
              </div>

              <h4 className="text-center mb-4">Sign In to Canvas</h4>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSignin}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="danger" type="submit" className="w-100 mb-3">
                  Sign In
                </Button>

                <div className="text-center">
                  <Button
                    variant="link"
                    onClick={() => navigate('/Kambaz/Account/Signup')}
                  >
                    Need an account? Sign up
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
