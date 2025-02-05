// src/Kambaz/Dashboard.tsx
import { Row, Col, Card, Button } from 'react-bootstrap'; // Import React Bootstrap components
import { Link } from 'react-router-dom'; // For navigating to individual courses

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      {/* Title and Subtitle */}
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2>
      <hr />

      {/* Grid layout for courses */}
      <div id="wd-dashboard-courses">
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
          {/* 1st Course */}
          <Col className="wd-dashboard-course">
            <Card>
              <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">CS1234 React JS</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Full Stack Software Development
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          {/* 2nd Course */}
          <Col className="wd-dashboard-course">
            <Card>
              <Link to="/Kambaz/Courses/5678/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/nodejs.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">CS5678 Node JS</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Backend Development with Node.js
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          {/* 3rd Course */}
          <Col className="wd-dashboard-course">
            <Card>
              <Link to="/Kambaz/Courses/9101/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/expressjs.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">CS9101 Express JS</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Building REST APIs with Express.js
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          {/* 4th Course */}
          <Col className="wd-dashboard-course">
            <Card>
              <Link to="/Kambaz/Courses/1122/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/angular.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">CS1122 Angular</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Frontend Development with Angular
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          {/* 5th Course */}
          <Col className="wd-dashboard-course">
            <Card>
              <Link to="/Kambaz/Courses/3345/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/vuejs.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">CS3345 Vue.js</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Building Interactive UIs with Vue.js
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          {/* 6th Course */}
          <Col className="wd-dashboard-course">
            <Card>
              <Link to="/Kambaz/Courses/7789/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/python.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">CS7789 Python</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Programming with Python for Beginners
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          {/* 7th Course */}
          <Col className="wd-dashboard-course">
            <Card>
              <Link to="/Kambaz/Courses/2233/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/django.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">CS2233 Django</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Web Development with Django and Python
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
