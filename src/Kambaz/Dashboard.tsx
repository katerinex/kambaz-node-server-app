// src/Kambaz/Dashboard.tsx
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { courses as dbCourses } from './Database';
import './styles.css';

// Define the database course structure
interface DBCourse {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
  author?: string;
}

// Define the display course structure
interface Course {
  _id: string;
  name: string;
  description: string;
  image: string;
}

// Type guard for database response
interface DBResponse {
  courses?: DBCourse[];
  data?: DBCourse[];
}

// Convert database course to display course
function convertToDisplayCourse(dbCourse: DBCourse): Course {
  return {
    _id: dbCourse._id,
    name: dbCourse.name,
    description: dbCourse.description,
    // Generate a default image name based on the department or use a placeholder
    image: `${dbCourse.department?.toLowerCase() || 'default'}-course.jpg`
  };
}

function isCourse(obj: any): obj is DBCourse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj._id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.description === 'string'
  );
}

export default function Dashboard() {
  let courses: Course[] = [];
  
  if (Array.isArray(dbCourses)) {
    courses = dbCourses.filter(isCourse).map(convertToDisplayCourse);
  } else if (typeof dbCourses === 'object' && dbCourses !== null) {
    const response = dbCourses as DBResponse;
    
    if (response.courses && Array.isArray(response.courses)) {
      courses = response.courses.filter(isCourse).map(convertToDisplayCourse);
    } else if (response.data && Array.isArray(response.data)) {
      courses = response.data.filter(isCourse).map(convertToDisplayCourse);
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
                  <Card.Img 
                    src={`/images/${course.image}`} 
                    variant="top" 
                    width="100%" 
                    height={160} 
                    alt={course.name} 
                  />
                  <Card.Body className="card-body">
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </Card.Title>
                    <Card.Text 
                      className="wd-dashboard-course-description overflow-hidden" 
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </Card.Text>
                    <Button variant="primary">Go</Button>
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