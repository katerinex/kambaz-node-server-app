// src/Labs/TOC.tsx
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function TOC() {
  return (
    <Nav variant="pills">
      <Nav.Item>
        <Nav.Link as={Link} to="Lab1"> 
          Lab 1
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="Lab2"> 
          Lab 2
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="Lab3"> 
          Lab 3
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/Kambaz"> 
          Kambaz
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="https://github.com/katerinex/kambaz-react-web-app" target="_blank" rel="noopener noreferrer">
          My GitHub
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
