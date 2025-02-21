// src/Kambaz/Account/Signup.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import { UserRole } from '../types/User'; 
export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    verifyPassword: '',
    firstName: '',
    lastName: '',
    email: '',
    role: 'STUDENT' as UserRole,
    dateOfBirth: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.verifyPassword) {
      setError('Passwords do not match');
      return;
    }
    // In a real app, you'd make an API call to create the user
    console.log('Creating user:', formData);
    navigate('/Kambaz/Account/Signin');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <img 
                  src="/images/NEU.png" 
                  alt="Northeastern University" 
                  style={{ width: '200px' }}
                />
              </div>
              
              <h4 className="text-center mb-4">Create New Account</h4>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleChange('lastName', e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleChange('username', e.target.value)}
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Verify Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={formData.verifyPassword}
                        onChange={(e) => handleChange('verifyPassword', e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    value={formData.role}
                    onChange={(e) => handleChange('role', e.target.value)}
                    required
                  >
                    <option value="STUDENT">Student</option>
                    <option value="FACULTY">Faculty</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="danger" type="submit" className="w-100 mb-3">
                  Create Account
                </Button>

                <div className="text-center">
                  <Button 
                    variant="link" 
                    onClick={() => navigate('/Kambaz/Account/Signin')}
                  >
                    Already have an account? Sign in
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

