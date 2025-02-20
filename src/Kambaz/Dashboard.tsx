// src/Kambaz/Dashboard.tsx
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { courses as dbCourses } from './Database';
import './styles.css';

interface Course {
  _id: string;
  name: string;
  description: string;
  image: string;
}

function isCourse(obj: any): obj is Course {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj._id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.description === 'string' &&
    typeof obj.image === 'string'
  );
}

export default function Dashboard() {
  let courses: Course[] = [];

  if (Array.isArray(dbCourses)) {
    courses = dbCourses.filter(isCourse);
  } else if (typeof dbCourses === 'object' && dbCourses !== null) {
    if (dbCourses.courses && Array.isArray(dbCourses.courses)) {
      courses = dbCourses.courses.filter(isCourse);
    } else if (dbCourses.data && Array.isArray(dbCourses.data)) {
      courses = dbCourses.data.filter(isCourse);
    }
  }

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course: Course) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  to={`/Kambaz/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img src={`/images/${course.image}`} variant="top" width="100%" height={160} alt={course.name} />
                  <Card.Body className="card-body">
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </Card.Title>
                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description}
                    </Card.Text>
                    <Button variant="primary"> Go </Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}