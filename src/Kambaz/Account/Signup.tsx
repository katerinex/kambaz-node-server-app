// src/Kambaz/Account/Signup.tsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { Form, Button, FormControl, Container, Row, Col, Card, Alert } from "react-bootstrap";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const signup = async () => {
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      navigate("/Kambaz/Account/Profile");
    } catch (error: any) {
      setError(error.response.data.message);
    }
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
                  style={{ width: "200px" }}
                />
              </div>

              <h4 className="text-center mb-4">Create New Account</h4>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={(e) => { e.preventDefault(); signup(); }}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <FormControl
                    value={user.username || ""}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="username"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <FormControl
                    type="password"
                    value={user.password || ""}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="password"
                    required
                  />
                </Form.Group>
                <Button variant="danger" type="submit" className="w-100 mb-3">
                  Create Account
                </Button>
                <div className="text-center">
                  <Button
                    variant="link"
                    onClick={() => navigate("/Kambaz/Account/Signin")}
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