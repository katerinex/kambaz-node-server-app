// src/Kambaz/Courses/Assignments/index.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa"; // Import icons
import { Button, Form, InputGroup } from 'react-bootstrap'; // Import Bootstrap components
//import '../../styles.css';

export default function Assignments() {
  const assignments = [
    { id: 1, title: "A1 - ENV + HTML", modules: "Multiple Modules", available: "May 6 at 12:00am", due: "May 13 at 11:59pm", points: "100 pts" },
    { id: 2, title: "A2 - JavaScript Basics", modules: "Multiple Modules", available: "May 13 at 12:00am", due: "May 20 at 11:59pm", points: "100 pts" },
    { id: 3, title: "A3 - React Introduction", modules: "Multiple Modules", available: "May 20 at 12:00am", due: "May 27 at 11:59pm", points: "100 pts" },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="wd-assignments" className="p-4"> {/* Add padding */}

      <div className="d-flex justify-content-between align-items-center mb-3"> {/* Flexbox for header */}
        <h2>Assignments</h2>
        <div> {/* Button group */}
          <Button variant="light" className="me-2">+ Group</Button>
          <Button variant="danger">+ Assignment</Button>
        </div>
      </div>

       <InputGroup className="mb-3"> {/* Search input */}
        <Form.Control
          placeholder="Search for Assignment"
          aria-label="Search"
          aria-describedby="basic-addon1"
          value={searchQuery}
          onChange={handleSearch}
        />
        <InputGroup.Text id="basic-addon1">
          <FaSearch />
        </InputGroup.Text>
      </InputGroup>

      <ul className="list-group">
        {filteredAssignments.map((assignment) => (
          <li key={assignment.id} className="list-group-item">
            <div className="wd-assignment-item">
              <h3>{assignment.title}</h3>
              <p>
                {assignment.modules} | Not available until {assignment.available} | Due {assignment.due} | {assignment.points}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}